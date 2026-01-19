import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [carbonBalance, setCarbonBalance] = useState('0');
    const [prices, setPrices] = useState({
        avax: 0,
        usdCop: 0
    });

    // Contract Addresses from .env
    const [contractAddresses] = useState({
        amazonasNFT: import.meta.env.VITE_AMAZONAS_NFT_ADDRESS,
        carbonToken: import.meta.env.VITE_CARBON_TOKEN_ADDRESS
    });

    // Fetch exchange rates for UI reference
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // Fetch AVAX price from CoinGecko
                const avaxRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd');
                const avaxData = await avaxRes.json();

                // Fetch USD/COP rate (using a representative fixed or public API if available)
                const copRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const copData = await copRes.json();

                setPrices({
                    avax: avaxData['avalanche-2'].usd,
                    usdCop: copData.rates.COP
                });
            } catch (error) {
                console.error("Error fetching price data:", error);
                // Fallback prices if API fails
                setPrices({ avax: 35, usdCop: 4000 });
            }
        };
        fetchPrices();
    }, []);

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

    const connectWallet = async () => {
        if (isConnecting) return;

        // Detection logic
        const isCoreInstalled = typeof window.avalanche !== 'undefined';
        const isEthInstalled = typeof window.ethereum !== 'undefined';

        if (!isCoreInstalled && !isEthInstalled) {
            alert("No se detectó ninguna wallet. Por favor, instala Core Wallet (Avalanche) o MetaMask.");
            window.open('https://core.app/', '_blank');
            return;
        }

        setIsConnecting(true);
        try {
            // Favor window.avalanche for Core
            const ethProvider = window.avalanche || window.ethereum;

            // Check if it's already connecting (some wallets don't allow multiple requests)
            try {
                const accounts = await ethProvider.request({ method: 'eth_requestAccounts' });
                if (!accounts || accounts.length === 0) {
                    throw new Error("No se devolvieron cuentas.");
                }

                const browserProvider = new ethers.BrowserProvider(ethProvider);
                const network = await browserProvider.getNetwork();

                // Force Avalanche Mainnet (43114) if possible
                const AVALANCHE_MAINNET_ID = "0xa86a"; // 43114
                if (network.chainId !== 43114n) {
                    try {
                        await ethProvider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: AVALANCHE_MAINNET_ID }],
                        });
                    } catch (switchError) {
                        // This error code indicates that the chain has not been added to MetaMask.
                        if (switchError.code === 4902) {
                            await ethProvider.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: AVALANCHE_MAINNET_ID,
                                    chainName: 'Avalanche Mainnet',
                                    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
                                    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                                    blockExplorerUrls: ['https://snowtrace.io/']
                                }],
                            });
                        }
                    }
                }

                setAccount(accounts[0]);
                setProvider(browserProvider);
                setSigner(await browserProvider.getSigner());
                setChainId(network.chainId);

                fetchCarbonBalance(accounts[0], browserProvider);

                // Listeners
                ethProvider.on('accountsChanged', (newAccounts) => {
                    setAccount(newAccounts[0] || null);
                    if (newAccounts[0]) fetchCarbonBalance(newAccounts[0], browserProvider);
                });

                ethProvider.on('chainChanged', () => window.location.reload());

            } catch (innerError) {
                if (innerError.code === 4001) {
                    alert("Conexión rechazada por el usuario.");
                } else if (innerError.code === -32002) {
                    alert("Ya hay una solicitud de conexión pendiente en tu wallet. Por favor, ábrela manualmente.");
                } else {
                    alert("Error en la wallet: " + (innerError.message || "Desconocido"));
                }
                throw innerError;
            }

        } catch (error) {
            console.error("Detailed connection error:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const fetchCarbonBalance = async (userAddress, customProvider = null) => {
        const p = customProvider || provider;
        if (!userAddress || !p) return;
        try {
            const tokenContract = new ethers.Contract(
                contractAddresses.carbonToken,
                CARBON_TOKEN_ABI,
                p
            );
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
                    const platformTreasury = "0xA583f0675a2d6f01ab21DEA98629e9Ee04320108"; // Fees

                    // Si no hay wallet del dueño, todo va a la tesorería (fallback)
                    const sellerWallet = ownerWallet || platformTreasury;

                    // Calcular split 90/10
                    const platformFee = (demoPrice * 10n) / 100n;
                    const sellerAmount = demoPrice - platformFee;

                    alert(`Iniciando compra de ${amount} tokens...\nDivisión de pago: 90% Originador / 10% Plataforma.`);

                    // 1. Pago al Originador (90%)
                    const tx1 = await signer.sendTransaction({
                        to: sellerWallet,
                        value: sellerAmount
                    });

                    // 2. Pago a la Plataforma (10% Fee)
                    const tx2 = await signer.sendTransaction({
                        to: platformTreasury,
                        value: platformFee
                    });

                    alert(`Pagos enviados. Procesando emisión de tokens en la blockchain...`);
                    await Promise.all([tx1.wait(), tx2.wait()]);

                    // 3. Emisión de tokens (MINT) al comprador
                    const tokenContract = new ethers.Contract(
                        contractAddresses.carbonToken,
                        CARBON_TOKEN_ABI,
                        signer
                    );

                    const mintTx = await tokenContract.mint(account, ethers.parseEther(amount.toString()));
                    await mintTx.wait();

                    alert(`¡Éxito! Has recibido ${amount} $CARBON. El pago ha sido repartido correctamente.`);
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
