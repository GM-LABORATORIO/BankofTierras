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
        if (typeof window.avalanche === 'undefined' && typeof window.ethereum === 'undefined') {
            alert("Por favor instala Core Wallet de Avalanche");
            return;
        }

        setIsConnecting(true);
        try {
            // Prioritize window.avalanche (Core Wallet)
            const ethProvider = window.avalanche || window.ethereum;
            const browserProvider = new ethers.BrowserProvider(ethProvider);

            const accounts = await ethProvider.request({ method: 'eth_requestAccounts' });
            const network = await browserProvider.getNetwork();

            setAccount(accounts[0]);
            setProvider(browserProvider);
            setSigner(await browserProvider.getSigner());
            setChainId(network.chainId);

            fetchCarbonBalance(accounts[0], browserProvider);

            // Listen for changes
            ethProvider.on('accountsChanged', (accounts) => {
                setAccount(accounts[0] || null);
                if (accounts[0]) fetchCarbonBalance(accounts[0], browserProvider);
            });

            ethProvider.on('chainChanged', (chainId) => {
                window.location.reload();
            });

        } catch (error) {
            console.error("Error connecting wallet:", error);
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
