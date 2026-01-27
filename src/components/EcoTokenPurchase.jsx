import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp, Shield, Zap, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
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

            // ✅ Refresh balance automatically
            setTimeout(() => {
                refreshBalance();
            }, 2000);

            alert(`¡Éxito! Has recibido ${botAmount} EcoToken\nHash: ${tx.hash.substring(0, 10)}...`);
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
        <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] text-white p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto mb-12"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text text-transparent">
                        Compra EcoToken
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        El token que financia la conservación del Amazonas
                    </p>
                </div>
            </motion.div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
                {/* Purchase Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black">Comprar Ahora</h2>
                            <div className="bg-emerald-500/20 px-4 py-2 rounded-full">
                                <span className="text-emerald-400 font-bold text-sm">1 EcoToken = 0.001 AVAX</span>
                            </div>
                        </div>

                        {/* Input Amount */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                Cantidad en AVAX
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={avaxAmount}
                                    onChange={(e) => handleAvaxChange(e.target.value)}
                                    placeholder="0.0"
                                    className="w-full bg-white/5 border border-white/20 rounded-2xl p-6 text-3xl font-black focus:border-emerald-500 outline-none transition-all"
                                    step="0.01"
                                    min="0"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                    <span className="text-gray-500 font-bold">AVAX</span>
                                </div>
                            </div>
                            {avaxAmount && (
                                <div className="text-sm text-gray-400 space-y-1">
                                    <div>≈ ${avaxInUsd.toFixed(2)} USD</div>
                                    <div>≈ ${avaxInCop.toLocaleString('es-CO')} COP</div>
                                </div>
                            )}
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">
                            <div className="bg-emerald-500/20 p-3 rounded-full">
                                <ArrowRight className="text-emerald-400" size={24} />
                            </div>
                        </div>

                        {/* Output Amount */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                Recibirás
                            </label>
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                                <div className="text-4xl font-black text-emerald-400">
                                    {botAmount}
                                </div>
                                <div className="text-sm text-emerald-500/70 mt-2">EcoToken</div>
                            </div>
                        </div>

                        {/* Fee Info */}
                        <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Fee de protocolo</span>
                                <span className="font-bold">{FEE_PERCENT}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Slippage protection</span>
                                <span className="font-bold text-emerald-400">1%</span>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="text-red-400" size={20} />
                                <span className="text-red-400 text-sm">{error}</span>
                            </div>
                        )}

                        {/* Success */}
                        {txHash && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-400" size={20} />
                                <div className="flex-1">
                                    <div className="text-emerald-400 text-sm font-bold">¡Compra exitosa!</div>
                                    <a
                                        href={`https://snowtrace.io/tx/${txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-emerald-500/70 hover:text-emerald-400 transition-colors"
                                    >
                                        Ver en Snowtrace →
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Buy Button */}
                        {!account ? (
                            <button
                                onClick={connectWallet}
                                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black py-6 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20"
                            >
                                Conectar Wallet
                            </button>
                        ) : (
                            <button
                                onClick={handleBuyBot}
                                disabled={isProcessing || !avaxAmount || parseFloat(avaxAmount) <= 0}
                                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-black py-6 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <Coins size={20} />
                                        Comprar EcoToken
                                    </>
                                )}
                            </button>
                        )}

                        {/* Balance */}
                        {account && (
                            <div className="text-center text-sm text-gray-400">
                                Tu balance: <span className="font-bold text-emerald-400">{parseFloat(botBalance).toFixed(2)} EcoToken</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Info Cards */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 rounded-3xl p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-500/20 p-3 rounded-2xl">
                                <Shield size={24} className="text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg mb-2">100% Seguro</h3>
                                <p className="text-gray-400 text-sm">
                                    Contratos auditados y verificados en Snowtrace. Tu inversión está protegida.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-3xl p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/20 p-3 rounded-2xl">
                                <TrendingUp size={24} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg mb-2">Respaldado por AVAX</h3>
                                <p className="text-gray-400 text-sm">
                                    Cada EcoToken está respaldado por AVAX en el Treasury. Precio estable y transparente.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-3xl p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-500/20 p-3 rounded-2xl">
                                <Zap size={24} className="text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg mb-2">Impacto Inmediato</h3>
                                <p className="text-gray-400 text-sm">
                                    Usa tus EcoTokens para adoptar especies, compensar carbono y apoyar proyectos de conservación ambiental.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6"
                    >
                        <h3 className="font-black text-lg mb-4">Estadísticas</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-2xl font-black text-emerald-400">0.001</div>
                                <div className="text-xs text-gray-400">AVAX por token</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-blue-400">3%</div>
                                <div className="text-xs text-gray-400">Fee de protocolo</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-purple-400">1B</div>
                                <div className="text-xs text-gray-400">Supply máximo</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-pink-400">100%</div>
                                <div className="text-xs text-gray-400">Respaldado</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EcoTokenPurchase;
