import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp, Shield, Zap, ArrowRight, Loader2, CheckCircle2, AlertCircle, ShoppingCart, Globe, Scale } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const EcoTokenPurchase = () => {
    const { account, signer, contractAddresses, BOT_TREASURY_ABI, botBalance, prices, connectWallet, refreshBalance } = useWeb3();
    const [avaxAmount, setAvaxAmount] = useState('');
    const [botAmount, setBotAmount] = useState('0');
    const [isProcessing, setIsProcessing] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');

    // Price: 1 EcoToken = 0.001 AVAX
    const BOT_PRICE = 0.001;
    const FEE_PERCENT = 3;

    const calculateBotAmount = (avax) => {
        if (!avax || isNaN(avax)) return '0';
        const fee = parseFloat(avax) * (FEE_PERCENT / 100);
        const netAvax = parseFloat(avax) - fee;
        const tokens = netAvax / BOT_PRICE;
        return tokens.toFixed(2);
    };

    const handleAvaxChange = (value) => {
        setAvaxAmount(value);
        setBotAmount(calculateBotAmount(value));
        setError('');
    };

    const handleBuyBot = async () => {
        if (!signer || !account) {
            alert("Por favor, conecta tu wallet primero.");
            return;
        }

        if (!avaxAmount || parseFloat(avaxAmount) <= 0) {
            setError("Ingresa una cantidad válida de AVAX");
            return;
        }

        setIsProcessing(true);
        setError('');
        setTxHash('');

        try {
            const treasuryContract = new ethers.Contract(
                contractAddresses.botTreasury,
                BOT_TREASURY_ABI,
                signer
            );

            // Calculate minimum tokens with 1% slippage protection
            const minTokens = ethers.parseEther((parseFloat(botAmount) * 0.99).toString());

            const tx = await treasuryContract.buyBot(minTokens, {
                value: ethers.parseEther(avaxAmount)
            });

            setTxHash(tx.hash);
            await tx.wait();

            setTimeout(() => {
                refreshBalance();
            }, 2000);

            alert(`¡Éxito! Has recibido ${botAmount} $SIGNAL\nHash: ${tx.hash.substring(0, 10)}...`);
            setAvaxAmount('');
            setBotAmount('0');

        } catch (err) {
            console.error(err);
            setError(err.reason || err.message || "Error en la compra");
        } finally {
            setIsProcessing(false);
        }
    };

    const avaxInUsd = parseFloat(avaxAmount || 0) * prices.avax;
    const avaxInCop = avaxInUsd * prices.usdCop;

    return (
        <div className="space-y-12 pb-20 font-inter">
            {/* Terminal Header */}
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-20 opacity-100" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Coins size={40} className="text-black" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2 leading-none">Liquidity Protocol</div>
                            <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-3">
                                $SIGNAL <span className="text-slate-300">Terminal</span>
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Global Asset Backing • Amazonas Conservation</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Exchange Rate</span>
                        <div className="text-2xl font-black text-slate-800 italic">1 <span className="text-emerald-500">$SIGNAL</span> = 0.001 <span className="text-slate-300">AVAX</span></div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Purchase Matrix */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    <ShoppingCart size={20} className="text-slate-400" />
                                </div>
                                Liquidation Flow
                            </h3>
                            {account && (
                                <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Wallet Connected</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deposit Amount (AVAX)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={avaxAmount}
                                        onChange={(e) => handleAvaxChange(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 text-3xl font-black text-slate-800 focus:bg-white focus:border-emerald-500 outline-none transition-all pr-24"
                                    />
                                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300 uppercase italic">Native</span>
                                </div>
                                {avaxAmount && (
                                    <div className="flex gap-4 px-2">
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">≈ ${avaxInUsd.toFixed(2)} USD</div>
                                        <div className="w-px h-3 bg-slate-200" />
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">≈ ${avaxInCop.toLocaleString('es-CO')} COP</div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center h-4 relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-dashed border-slate-200" />
                                </div>
                                <div className="relative bg-white px-4 z-10">
                                    <ArrowRight className="text-emerald-500" size={20} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Minting Output ($SIGNAL)</label>
                                <div className="bg-slate-800 rounded-2xl px-8 py-8 shadow-inner relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                                    <div className="text-5xl font-black text-white italic tracking-tighter relative z-10">
                                        {botAmount} <span className="text-emerald-500 text-xl uppercase not-italic">SIGNAL</span>
                                    </div>
                                    <Zap className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-500/20" size={40} />
                                </div>
                            </div>
                        </div>

                        {/* Execution Error/Success */}
                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
                                    <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
                                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-relaxed">{error}</span>
                                </motion.div>
                            )}
                            {txHash && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} />
                                    <div className="flex-1">
                                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">Verification Broadcasted</div>
                                        <a href={`https://snowtrace.io/tx/${txHash}`} target="_blank" className="text-[8px] font-bold text-emerald-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors">Explorer Hash: {txHash.slice(0, 20)}...</a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={!account ? connectWallet : handleBuyBot}
                            disabled={isProcessing || (account && (!avaxAmount || parseFloat(avaxAmount) <= 0))}
                            className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${!account
                                ? 'bg-slate-800 text-white hover:bg-emerald-500 hover:text-black shadow-xl'
                                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/20'
                                } disabled:opacity-50`}
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : (!account ? <Globe size={20} /> : <Zap size={20} />)}
                            {isProcessing ? "Transact Flowing..." : (!account ? "Link Institutional Wallet" : "Authorize Asset Minting")}
                        </button>
                    </div>
                </div>
            </div>

            {/* Network Metrics & Proofs */}
            <div className="lg:col-span-5 space-y-8">
                <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 shadow-inner">
                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center justify-between">
                        Protocol Stats
                        <TrendingUp size={14} className="text-emerald-500" />
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: 'Liquidation Fee', val: '3%', color: 'text-slate-800' },
                            { label: 'Slippage Shield', val: '1%', color: 'text-emerald-500' },
                            { label: 'Supply Limit', val: '1B', color: 'text-slate-300' },
                            { label: 'Collateral', val: '100%', color: 'text-emerald-600' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-[8px] font-black text-slate-400 uppercase mb-1">{stat.label}</div>
                                <div className={`text-xl font-black italic tracking-tighter ${stat.color}`}>{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-50 rounded-xl"><Shield size={20} className="text-emerald-500" /></div>
                        <div>
                            <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">Verified Proof</h5>
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">Audited smart contracts following ERC-20 standards for conservation.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-50 rounded-xl"><Scale size={20} className="text-slate-300" /></div>
                        <div>
                            <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">Asset Collateral</h5>
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">Every $SIGNAL is backed by native network architecture.</p>
                        </div>
                    </div>
                </div>

                {account && (
                    <div className="p-8 bg-slate-800 rounded-[2.5rem] text-center text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-emerald-500/5" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Your Portfolio Balance</span>
                        <div className="text-3xl font-black text-emerald-400 italic tracking-tighter mb-4">
                            {parseFloat(botBalance).toFixed(2)} <span className="text-white uppercase text-xs not-italic">SIGNAL</span>
                        </div>
                        <button onClick={() => refreshBalance()} className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-emerald-400 transition-colors">Re-sync signals</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EcoTokenPurchase;
