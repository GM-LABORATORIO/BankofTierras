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
            refreshBalance: () => fetchCarbonBalance(account)
        }}>
            {children}
        </Web3Context.Provider>
    );
};
