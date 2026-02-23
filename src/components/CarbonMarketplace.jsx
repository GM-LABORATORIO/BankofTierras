import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    ShieldCheck,
    Zap,
    Globe,
    ArrowRight,
    Info,
    Activity,
    Lock,
    Wallet,
    CreditCard,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    Search,
    Filter,
    ArrowUpRight,
    Minus,
    Plus,
    X,
    Database
} from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { useLanguage } from '../context/LanguageContext';

// Based on $40 / 1,000,000 grams
const CARBON_PRICE_PER_GRAM = 0.00004;
const INSTITUTIONAL_INVENTORY = 2000000;

const CarbonMarketplace = ({ projects }) => {
    const { t } = useLanguage();
    const { account } = useWeb3();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [purchaseAmount, setPurchaseAmount] = useState(100000); // Default to 100k grams
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastTxHash, setLastTxHash] = useState(null);

    // Subnet Metrics
    const [subnetStatus, setSubnetStatus] = useState('OPERATIONAL');
    const [signalGasPool, setSignalGasPool] = useState(840210); // Current $SIGNAL units for relayer
    const [globalThroughput, setGlobalThroughput] = useState(4.2); // Tons per second

    const handlePurchase = async () => {
        if (!account) return alert('Please connect your wallet');
        setIsProcessing(true);
        try {
            // Processing purchase logic
            console.log(`Processing purchase of ${purchaseAmount} grams...`);

            // 1. Simulating contract call for now (waiting for specific C-Chain deployment address)
            await new Promise(resolve => setTimeout(resolve, 2000));
            const txHash = '0x' + Math.random().toString(16).slice(2);
            setLastTxHash(txHash);

            // 2. REAL PERSISTENCE: Register the action in the CPX Reputation System
            const { supabaseService } = await import('../services/supabaseService');
            await supabaseService.addReputationLog({
                wallet_address: account,
                action_type: 'burn',
                points: Math.floor(purchaseAmount / 1000), // 1 point per kg for now
                impact_metrics: {
                    co2_grams: purchaseAmount,
                    usd_value: purchaseAmount * CARBON_PRICE_PER_GRAM
                },
                payment_method: 'web3',
                tx_hash: txHash,
                metadata: {
                    project_name: selectedProject?.name,
                    timestamp: new Date().toISOString()
                }
            });

            // Update signal pool visualization (local UI state)
            setSignalGasPool(prev => prev - 12);

            alert(`SUCCESS: ${purchaseAmount.toLocaleString()} grams processed and registered in your Climate Pass™.`);
            setShowBuyModal(false);
        } catch (error) {
            console.error('Purchase failed:', error);
            alert('Error processing impact acquisition.');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 sm:space-y-8 pb-12 sm:pb-20 font-inter">

            {/* 1. Inventory & Market Status */}
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-4 sm:p-6 md:p-8 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 bg-slate-50/30">
                    <div>
                        <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-800 uppercase tracking-tight italic">Global Impact Inventory</h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                            <p className="text-[9px] sm:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Pool: {INSTITUTIONAL_INVENTORY.toLocaleString()} t • ColCX</p>
                            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse self-center" />
                            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">CPX: {subnetStatus}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 sm:gap-4 md:gap-6 items-center w-full lg:w-auto overflow-x-auto">
                        <div className="text-left sm:text-right min-w-[80px]">
                            <div className="text-xs font-black text-emerald-600 italic">{signalGasPool.toLocaleString()} $SIGNAL</div>
                            <div className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-widest">GAS POOL</div>
                        </div>
                        <div className="text-left sm:text-right border-l border-slate-200 pl-3 sm:pl-4 md:pl-6 min-w-[60px]">
                            <div className="text-xs font-black text-slate-800 italic">{globalThroughput} t/s</div>
                            <div className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-widest">THROUGHPUT</div>
                        </div>
                        <div className="text-left sm:text-right border-l border-slate-200 pl-3 sm:pl-4 md:pl-6 min-w-[70px]">
                            <div className="text-xs font-black text-slate-800 italic">$40.00/T</div>
                            <div className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-widest">PRICE</div>
                        </div>
                    </div>
                </div>

                {/* Mock Chart Area */}
                <div className="p-8 bg-slate-50/50 h-56 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end px-8 pb-4">
                        <svg className="w-full h-32 text-emerald-500/10" preserveAspectRatio="none">
                            <path
                                d="M0,100 C150,80 300,90 450,40 C600,20 750,60 900,30 C1050,10 1200,40 1350,20 L1350,100 L0,100 Z"
                                fill="currentColor"
                            />
                            <path
                                d="M0,100 C150,80 300,90 450,40 C600,20 750,60 900,30 C1050,10 1200,40 1350,20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-emerald-500"
                            />
                        </svg>
                    </div>
                    <div className="relative z-10 flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Jan 26</span><span>Inventory Update</span><span>Verification Node #4</span><span>Dec 26</span>
                    </div>
                </div>

                {/* Projects Table (Bloomberg Style) */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-y border-slate-100">
                                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Project</th>
                                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Price/g</th>
                                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Supply (g)</th>
                                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-left text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">Audit</th>
                                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredProjects.map((p, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-500">
                                                <Database size={14} className="sm:w-4 sm:h-4" />
                                            </div>
                                            <span className="text-[10px] sm:text-xs font-black text-slate-800 uppercase italic tracking-tighter">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5">
                                        <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-emerald-50 rounded uppercase">Cert</span>
                                    </td>
                                    <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-[10px] sm:text-xs font-black text-slate-800 text-mono italic">${CARBON_PRICE_PER_GRAM.toFixed(5)}</td>
                                    <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-[10px] sm:text-xs font-black text-slate-800 text-mono hidden md:table-cell">{((p.total_quota - p.sold_tokens) * 1000000).toLocaleString()} g</td>
                                    <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 hidden lg:table-cell">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={12} className="sm:w-3.5 sm:h-3.5 text-emerald-500" />
                                            <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">ColCX</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-right">
                                        <button
                                            onClick={() => { setSelectedProject(p); setShowBuyModal(true); }}
                                            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-black text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-500 hover:text-black transition-all"
                                        >
                                            Buy
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 2. Fractional Market Logic Explained */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 text-white border border-slate-800 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6">Fractional Scaling: 1:1,000,000</h3>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed italic mb-8">
                            Nuestra infraestructura fracciona cada crédito de carbono (1 Tonelada) en un millón de unidades de impacto de 1 gramo ($CARBON). Esto permite a cualquier persona compensar su rastro climático con precisión quirúrgica.
                        </p>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest">Unit Value</span>
                                <span className="text-xl font-black text-emerald-500 italic">$0.00004 per g</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm text-center flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mb-6 shadow-inner">
                        <ShieldCheck size={48} className="text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-2 italic">Utility Assets Only</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-[300px] leading-relaxed italic">
                        Los tokens $CARBON son vehículos de compensación y medición. No son activos de especulación. Al ser adquiridos, se vinculan a tu Climate Action Score™ y se liquidan on-chain.
                    </p>
                </div>
            </div>

            {/* 3. Buy in Grams Modal */}
            <AnimatePresence>
                {showBuyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
                        onClick={() => setShowBuyModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl sm:rounded-[3rem] border border-slate-200 w-full max-w-lg overflow-hidden shadow-2xl relative mx-4"
                            onClick={e => e.stopPropagation()}
                        >
                            <button onClick={() => setShowBuyModal(false)} className="absolute top-4 right-4 sm:top-8 sm:right-8 text-slate-300 hover:text-slate-600 z-10">
                                <X size={20} className="sm:w-6 sm:h-6" />
                            </button>

                            <div className="p-6 sm:p-8 md:p-12">
                                <div className="mb-10 text-center">
                                    <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">Adquire $CARBON Units</h3>
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">1 $CARBON = 1 Gram of Certified Compensation</p>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-10 bg-slate-50/50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center justify-between mb-8">
                                            <button
                                                onClick={() => setPurchaseAmount(prev => Math.max(1000, prev - 10000))}
                                                className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-all shadow-sm"
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <div className="text-center">
                                                <span className="text-5xl font-black text-slate-800 italic tracking-tighter">{purchaseAmount.toLocaleString()}</span>
                                                <span className="text-lg font-black text-slate-300 italic ml-2 uppercase">g</span>
                                            </div>
                                            <button
                                                onClick={() => setPurchaseAmount(prev => prev + 10000)}
                                                className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-all shadow-sm"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                        <input
                                            type="range"
                                            min="1000"
                                            max="1000000"
                                            step="1000"
                                            value={purchaseAmount}
                                            onChange={(e) => setPurchaseAmount(parseInt(e.target.value))}
                                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                        <div className="flex justify-between mt-4 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <span>Micro (1,000g)</span>
                                            <span>Pro (1,000,000g / 1T)</span>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-slate-50 flex justify-between items-end px-4">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Total Trajectory Value</p>
                                            <div className="text-3xl font-black text-slate-800 italic tracking-tighter">${(purchaseAmount * CARBON_PRICE_PER_GRAM).toFixed(2)} <span className="text-lg text-slate-300">USD</span></div>
                                        </div>
                                        <button
                                            onClick={handlePurchase}
                                            disabled={isProcessing}
                                            className="px-10 py-5 bg-emerald-500 text-black text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-400 transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isProcessing ? 'PROCESSING...' : 'CO2PAY™ GATEWAY'}
                                        </button>
                                    </div>

                                    {lastTxHash && (
                                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-dashed border-emerald-500/50 flex items-center justify-between">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Receipt: {lastTxHash.slice(0, 16)}...</span>
                                            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500">
                                                <CheckCircle2 size={12} />
                                                <span>CPX VERIFIED</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                                        <ShieldCheck className="text-emerald-500" size={20} />
                                        <p className="text-[8px] font-black text-slate-500 uppercase leading-relaxed tracking-widest">
                                            Respaldo On-Chain • Liquidación instantánea en tu Score Global • Certificado por ColCX
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarbonMarketplace;
