import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { supabaseService } from '../services/supabaseService';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [carbonBalance, setCarbonBalance] = useState('0');
    const [prices, setPrices] = useState({ avax: 35, usdCop: 4000 });
    const [systemConfig, setSystemConfig] = useState({
        treasury_wallet: '0xA583f0675a2d6f01ab21DEA98629e9Ee04320108',
        platform_fee_percentage: '10'
    });

    // Contract Addresses from .env
    const [contractAddresses] = useState({
        amazonasNFT: import.meta.env.VITE_AMAZONAS_NFT_ADDRESS,
        carbonToken: import.meta.env.VITE_CARBON_TOKEN_ADDRESS
    });

    const AMAZONAS_NFT_ABI = [
        "function mintProject(address to, string memory uri) public returns (uint256)",
        "function verifyProject(uint256 tokenId) public",
        "function isVerified(uint256) public view returns (bool)",
        "function tokenURI(uint256 tokenId) public view returns (string memory)",
        "event ProjectMinted(uint256 indexed tokenId, address indexed owner, string tokenURI)",
        "event ProjectVerified(uint256 indexed tokenId, address indexed auditor)"
    ];

    const CARBON_TOKEN_ABI = [
        "function mint(address to, uint256 amount) public",
        "function transfer(address to, uint256 amount) public returns (bool)",
        "function retireForTaxExemption(uint256 amount, string memory nitEmpresa) public",
        "function balanceOf(address account) public view returns (uint256)",
        "event CarbonRetired(address indexed user, uint256 amount, string nitEmpresa, uint256 timestamp)"
    ];

    useEffect(() => {
        if (window.ethereum) {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            setProvider(browserProvider);
        }
        fetchPrices();
        fetchSystemConfig();
    }, []);

    const fetchPrices = async () => {
        try {
            // AVAX price fallback mechanism
            const avaxRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd').catch(() => null);
            let avaxPrice = 35;
            if (avaxRes && avaxRes.ok) {
                const avaxData = await avaxRes.json();
                avaxPrice = avaxData['avalanche-2']?.usd || 35;
            }

            // COP rate fallback mechanism
            const copRes = await fetch('https://api.exchangerate-api.com/api/v4/latest/USD').catch(() => null);
            let copPrice = 4000;
            if (copRes && copRes.ok) {
                const copData = await copRes.json();
                copPrice = copData.rates?.COP || 4000;
            }

            setPrices({ avax: avaxPrice, usdCop: copPrice });
        } catch (error) {
            console.error("Error fetching price data:", error);
            // Non-blocking error
        }
    };

    const fetchSystemConfig = async () => {
        try {
            const data = await supabaseService.getSystemConfig().catch(() => []);
            const configMap = {};
            if (data && data.length > 0) {
                data.forEach(item => { configMap[item.key] = item.value; });
                setSystemConfig(prev => ({ ...prev, ...configMap }));
            }
        } catch (error) {
            console.warn("Could not load dynamic config, using hardcoded defaults:", error);
        }
    };

    const connectWallet = async () => {
        if (isConnecting) return;
        const ethProvider = window.avalanche || window.ethereum;

        if (!ethProvider) {
            alert("No se detectó ninguna wallet.");
            return;
        }

        setIsConnecting(true);
        try {
            const accounts = await ethProvider.request({ method: 'eth_requestAccounts' });
            const browserProvider = new ethers.BrowserProvider(ethProvider);
            const network = await browserProvider.getNetwork();

            setAccount(accounts[0]);
            setProvider(browserProvider);
            setSigner(await browserProvider.getSigner());
            setChainId(network.chainId);

            fetchCarbonBalance(accounts[0], browserProvider);

            ethProvider.on('accountsChanged', (newAccounts) => {
                setAccount(newAccounts[0] || null);
                if (newAccounts[0]) fetchCarbonBalance(newAccounts[0], browserProvider);
            });
            ethProvider.on('chainChanged', () => window.location.reload());

        } catch (error) {
            console.error("Connection error:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const fetchCarbonBalance = async (userAddress, customProvider = null) => {
        const p = customProvider || provider;
        if (!userAddress || !p) return;
        try {
            const tokenContract = new ethers.Contract(contractAddresses.carbonToken, CARBON_TOKEN_ABI, p);
            const bal = await tokenContract.balanceOf(userAddress);
            setCarbonBalance(ethers.formatEther(bal));
        } catch (error) {
            console.error("Error fetching carbon balance:", error);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setSigner(null);
        setCarbonBalance('0');
    };

    return (
        <Web3Context.Provider value={{
            account,
            provider,
            signer,
            chainId,
            isConnecting,
            connectWallet,
            disconnectWallet,
            contractAddresses,
            AMAZONAS_NFT_ABI,
            CARBON_TOKEN_ABI,
            carbonBalance,
            prices,
            buyTokens: async (projectId, amount, ownerWallet) => {
                if (!signer) throw new Error("Wallet no conectada");
                setIsConnecting(true);
                try {
                    const demoPrice = ethers.parseEther((amount * 0.0001).toString());
                    const platformTreasury = systemConfig.treasury_wallet;
                    const feePercentage = BigInt(systemConfig.platform_fee_percentage);

                    const sellerWallet = ownerWallet || platformTreasury;
                    const platformFee = (demoPrice * feePercentage) / 100n;
                    const sellerAmount = demoPrice - platformFee;

                    alert(`Paso 1/2: Firma el pago al Originador (${100n - feePercentage}%).`);

                    // Transacción 1: Al Originador
                    const tx1 = await signer.sendTransaction({ to: sellerWallet, value: sellerAmount });
                    alert(`Esperando confirmación del primer pago...`);
                    await tx1.wait();

                    alert(`Paso 2/2: Firma el fee de la Plataforma (${feePercentage}%).`);

                    // Transacción 2: A la Tesorería (Fee)
                    const tx2 = await signer.sendTransaction({ to: platformTreasury, value: platformFee });
                    alert(`Esperando confirmación del fee...`);
                    await tx2.wait();

                    alert(`¡Pagos confirmados! Emitiendo tokens $CARBON a tu wallet...`);

                    const tokenContract = new ethers.Contract(contractAddresses.carbonToken, CARBON_TOKEN_ABI, signer);
                    const mintTx = await tokenContract.mint(account, ethers.parseEther(amount.toString()));
                    const receipt = await mintTx.wait();

                    alert(`¡Éxito! Has recibido ${amount} $CARBON.\nHash: ${receipt.hash.substring(0, 10)}...`);
                    fetchCarbonBalance(account);
                    return true;
                } catch (error) {
                    console.error("Purchase error:", error);
                    alert("Error en la compra: " + (error.reason || error.message));
                    return false;
                } finally {
                    setIsConnecting(false);
                }
            },
            refreshBalance: () => fetchCarbonBalance(account)
        }}>
            {children}
        </Web3Context.Provider>
    );
};
