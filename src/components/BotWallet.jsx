import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownCircle, ArrowUpCircle, Loader2, ExternalLink, AlertCircle, TrendingUp } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const BOT_TREASURY_ABI = [
    "function buyBot() external payable",
    "function redeemBot(uint256 botAmount) external",
    "function botPriceInAvax() external view returns (uint256)",
    "function isOriginator(address) external view returns (bool)",
    "function getTreasuryBalance() external view returns (uint256)",
    "function getStats() external view returns (uint256, uint256, uint256, uint256, uint256, uint256)"
];

const BOT_TOKEN_ABI = [
    "function balanceOf(address) external view returns (uint256)",
    "function symbol() external view returns (string)",
    "function decimals() external view returns (uint8)",
    "function totalSupply() external view returns (uint256)",
    "function MAX_SUPPLY() external view returns (uint256)"
];

const BotWallet = () => {
    const { account, signer } = useWeb3();
    const [botBalance, setBotBalance] = useState('0');
    const [avaxBalance, setAvaxBalance] = useState('0');
    const [isOriginator, setIsOriginator] = useState(false);
    const [buyAmount, setBuyAmount] = useState('');
    const [redeemAmount, setRedeemAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [stats, setStats] = useState(null);

    // TODO: Update these after deployment
    const BOT_TOKEN_ADDRESS = "0x...";
    const BOT_TREASURY_ADDRESS = "0x...";
    const AVAX_PRICE_USD = 11.69; // Update from oracle

    useEffect(() => {
        if (account && signer) {
            loadData();
        }
    }, [account, signer]);

    const loadData = async () => {
        try {
            await Promise.all([
                loadBalances(),
                checkOriginatorStatus(),
                loadStats()
            ]);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const loadBalances = async () => {
        const botToken = new ethers.Contract(BOT_TOKEN_ADDRESS, BOT_TOKEN_ABI, signer);
        const balance = await botToken.balanceOf(account);
        setBotBalance(ethers.formatEther(balance));

        const avax = await signer.provider.getBalance(account);
        setAvaxBalance(ethers.formatEther(avax));
    };

    const checkOriginatorStatus = async () => {
        const treasury = new ethers.Contract(BOT_TREASURY_ADDRESS, BOT_TREASURY_ABI, signer);
        const status = await treasury.isOriginator(account);
        setIsOriginator(status);
    };

    const loadStats = async () => {
        const treasury = new ethers.Contract(BOT_TREASURY_ADDRESS, BOT_TREASURY_ABI, signer);
        const [totalSold, totalAvax, totalBurned, originatorCount, treasuryBalance, fees] = await treasury.getStats();

        setStats({
            totalSold: ethers.formatEther(totalSold),
            totalAvax: ethers.formatEther(totalAvax),
            totalBurned: ethers.formatEther(totalBurned),
            originatorCount: originatorCount.toString(),
            treasuryBalance: ethers.formatEther(treasuryBalance),
            fees: ethers.formatEther(fees)
        });
    };

    const handleBuyBot = async () => {
        if (!buyAmount || parseFloat(buyAmount) <= 0) {
            alert("Ingresa un monto válido");
            return;
        }

        setIsLoading(true);
        setTxHash('');

        try {
            const treasury = new ethers.Contract(BOT_TREASURY_ADDRESS, BOT_TREASURY_ABI, signer);
            const tx = await treasury.buyBot({ value: ethers.parseEther(buyAmount) });

            setTxHash(tx.hash);
            await tx.wait();

            await loadData();
            setBuyAmount('');

            const botReceived = (parseFloat(buyAmount) * 0.97 / 0.001).toFixed(2);
            alert(`✅ Compra exitosa! Recibiste ${botReceived} $BoT EcoTokens`);
        } catch (error) {
            console.error("Error buying $BoT:", error);
            alert("Error: " + (error.reason || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    const handleRedeemBot = async () => {
        if (!redeemAmount || parseFloat(redeemAmount) <= 0) {
            alert("Ingresa un monto válido");
            return;
        }

        if (!isOriginator) {
            alert("Solo los Originadores pueden redimir $BoT por AVAX");
            return;
        }

        setIsLoading(true);
        setTxHash('');

        try {
            const treasury = new ethers.Contract(BOT_TREASURY_ADDRESS, BOT_TREASURY_ABI, signer);
            const amount = ethers.parseEther(redeemAmount);
            const tx = await treasury.redeemBot(amount);

            setTxHash(tx.hash);
            await tx.wait();

            await loadData();
            setRedeemAmount('');

            const avaxReceived = (parseFloat(redeemAmount) * 0.001 * 0.98).toFixed(4);
            alert(`✅ Redención exitosa! Recibiste ${avaxReceived} AVAX (Fee 2% aplicado)`);
        } catch (error) {
            console.error("Error redeeming $BoT:", error);
            alert("Error: " + (error.reason || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    const botValueUSD = parseFloat(botBalance) * 0.001 * AVAX_PRICE_USD;
    const avaxValueUSD = parseFloat(avaxBalance) * AVAX_PRICE_USD;

    return (
        <div className="space-y-8">
            {/* Balance Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Balance $BoT EcoToken</div>
                            <Wallet className="text-emerald-500" size={24} />
                        </div>
                        <div className="text-5xl font-black text-white mb-2">{parseFloat(botBalance).toLocaleString()}</div>
                        <div className="text-sm text-gray-500 font-bold">≈ ${botValueUSD.toFixed(2)} USD</div>
                        <div className="text-xs text-gray-600 mt-1">1 $BoT EcoToken = 0.001 AVAX</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Balance AVAX</div>
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                                <span className="text-red-500 font-black">A</span>
                            </div>
                        </div>
                        <div className="text-5xl font-black text-white mb-2">{parseFloat(avaxBalance).toFixed(4)}</div>
                        <div className="text-sm text-gray-500 font-bold">≈ ${avaxValueUSD.toFixed(2)} USD</div>
                        <div className="text-xs text-gray-600 mt-1">1 AVAX = ${AVAX_PRICE_USD}</div>
                    </div>
                </motion.div>
            </div>

            {/* Protocol Stats */}
            {stats && (
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8">
                    <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
                        <TrendingUp className="text-emerald-500" size={20} />
                        Estadísticas del Protocolo
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">$BoT Vendidos</div>
                            <div className="text-2xl font-black text-white">{parseFloat(stats.totalSold).toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">$BoT Quemados</div>
                            <div className="text-2xl font-black text-emerald-500">{parseFloat(stats.totalBurned).toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Treasury</div>
                            <div className="text-2xl font-black text-white">{parseFloat(stats.treasuryBalance).toFixed(2)} AVAX</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Originadores</div>
                            <div className="text-2xl font-black text-white">{stats.originatorCount}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Buy Section */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
                    <ArrowDownCircle className="text-emerald-500" />
                    Comprar $BoT con AVAX
                </h3>

                <div className="space-y-6">
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Precio Fijo EcoToken</div>
                        <div className="text-3xl font-black text-emerald-500">1 $BoT = 0.001 AVAX</div>
                        <div className="text-sm text-gray-600 mt-2">≈ $0.012 USD • Fee: 3%</div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Monto en AVAX</label>
                        <input
                            type="number"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                            placeholder="0.0"
                            step="0.01"
                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-2xl font-black text-white focus:border-emerald-500 outline-none"
                        />
                        {buyAmount && (
                            <div className="text-sm text-gray-500 font-bold">
                                Recibirás: ~{(parseFloat(buyAmount) * 0.97 / 0.001).toFixed(2)} $BoT EcoTokens
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleBuyBot}
                        disabled={isLoading || !buyAmount}
                        className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <ArrowDownCircle />}
                        {isLoading ? "Procesando..." : "Comprar $BoT EcoToken"}
                    </button>
                </div>
            </div>

            {/* Redeem Section */}
            {isOriginator && (
                <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-[2rem] p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-3 py-1 bg-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                            Solo Originadores
                        </div>
                    </div>

                    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
                        <ArrowUpCircle className="text-emerald-500" />
                        Redimir $BoT por AVAX
                    </h3>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Monto en $BoT</label>
                            <input
                                type="number"
                                value={redeemAmount}
                                onChange={(e) => setRedeemAmount(e.target.value)}
                                placeholder="0.0"
                                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-2xl font-black text-white focus:border-emerald-500 outline-none"
                            />
                            {redeemAmount && (
                                <div className="text-sm text-gray-500 font-bold">
                                    Recibirás: {(parseFloat(redeemAmount) * 0.001 * 0.98).toFixed(4)} AVAX
                                    <div className="text-xs text-gray-600 mt-1">Fee 2%: {(parseFloat(redeemAmount) * 0.001 * 0.02).toFixed(4)} AVAX</div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleRedeemBot}
                            disabled={isLoading || !redeemAmount}
                            className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <ArrowUpCircle />}
                            {isLoading ? "Procesando..." : "Redimir por AVAX"}
                        </button>
                    </div>
                </div>
            )}

            {/* Transaction Hash */}
            {txHash && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-4">
                    <AlertCircle className="text-emerald-500" size={24} />
                    <div className="flex-1">
                        <div className="text-sm font-black text-white mb-1">Transacción Enviada</div>
                        <a
                            href={`https://snowtrace.io/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-500 font-mono flex items-center gap-2 hover:underline"
                        >
                            {txHash.slice(0, 10)}...{txHash.slice(-8)}
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotWallet;
