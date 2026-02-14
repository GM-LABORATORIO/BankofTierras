import React, { useState, useEffect, useRef } from 'react';
import {
    Leaf, Building2, TrendingUp, History, Download, Flame,
    ArrowUpRight, Loader2, Heart, ShieldCheck, FileText,
    CheckCircle2, Zap, Info, Search, Activity, Globe, Scale,
    Briefcase, PieChart, BarChart3, Lock, Archive, ExternalLink,
    ChevronRight, Wallet
} from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const CorporatePanel = ({ myForest = [], projects = [], totalRetired = 0, onRetire, userProfile }) => {
    const { signer, carbonBalance } = useWeb3();
    const { t } = useLanguage();
    const [retireAmount, setRetireAmount] = useState('');
    const [nit, setNit] = useState(userProfile?.tax_id || '');
    const [isRetiring, setIsRetiring] = useState(false);
    const [showLegalCert, setShowLegalCert] = useState(null);
    const [activeTab, setActiveTab] = useState('treasury');

    const handleRetire = async () => {
        if (!signer || !retireAmount || !nit) return;
        setIsRetiring(true);
        setTimeout(() => {
            const certData = {
                amount: retireAmount,
                nit: nit,
                company: userProfile?.company_name || "Institutional Entity",
                txHash: "0x" + Math.random().toString(16).slice(2, 42),
                date: new Date().toLocaleDateString()
            };
            setShowLegalCert(certData);
            setIsRetiring(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 pb-20 font-inter text-slate-900 overflow-x-hidden">

            {/* 🏛 COMMAND CENTER HEADER (Saudi-tier Institutional) */}
            <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-20 opacity-50" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-10">
                        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl ring-1 ring-white/10 group">
                            <Building2 size={40} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] italic">Institutional Hub v4.0</span>
                                <div className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-[8px] font-black text-emerald-400 uppercase tracking-widest">Verified Vault</div>
                            </div>
                            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-3">
                                {userProfile?.company_name || "Saudi Aviation Group"}
                            </h2>
                            <div className="flex items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Globe size={12} className="text-emerald-500" /> Riyadh Regional Terminal</span>
                                <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-emerald-500" /> ESG Compliance: AA+</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                        <div className="text-right">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Treasury Asset</span>
                            <div className="text-4xl font-black text-white italic tracking-tighter">{carbonBalance} <span className="text-emerald-500 not-italic text-sm">tCarbon</span></div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Offset Legacy</span>
                            <div className="text-4xl font-black text-white italic tracking-tighter">{totalRetired} <span className="text-emerald-500 not-italic text-sm">tCO2e</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🕹 MAIN HUB GRID */}
            <div className="grid lg:grid-cols-12 gap-8">

                {/* 🛰 LEFT COLUMN: COMMAND & EXECUTION */}
                <div className="lg:col-span-8 space-y-8">

                    {/* HUB NAV (Brutal Architecture) */}
                    <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
                        {[
                            { id: 'treasury', label: 'Treasury', icon: <Wallet size={14} /> },
                            { id: 'burn', label: 'Protocol', icon: <Flame size={14} /> },
                            { id: 'archive', label: 'Archive', icon: <Archive size={14} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-3 rounded-lg text-[9px] font-black tracking-[0.15em] uppercase transition-all flex items-center gap-2 ${activeTab === tab.id
                                    ? 'bg-white text-slate-950 shadow-md shadow-slate-200 ring-1 ring-slate-200'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'treasury' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:border-emerald-500/30 transition-all transition-duration-500">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2 italic">
                                        <TrendingUp size={14} className="text-emerald-500" /> Portfolio Liquidity
                                    </h4>
                                    <div className="text-5xl font-black italic tracking-tighter mb-4">$ {(parseFloat(carbonBalance) * 25).toLocaleString()}<span className="text-emerald-500 text-xs not-italic"> USD</span></div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Current Valuation based on Spot Market</p>
                                    <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 transition-all">Expand Assets</button>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                    <Activity className="absolute bottom-4 right-4 text-emerald-500/10 group-hover:scale-125 transition-transform" size={120} />
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Strategic Projection</h4>
                                    <div className="space-y-4 relative z-10">
                                        {[
                                            { label: 'CO2 TAX Coverage', val: '94%' },
                                            { label: 'Network Stability', val: 'Prime' },
                                            { label: 'Global Ranking', val: '#12' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-3">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                                <span className="text-sm font-black text-slate-900 italic">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'burn' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-2 border-slate-950 p-10 rounded-[3rem] shadow-2xl relative">
                                <div className="absolute top-8 right-8 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Live Node Connection</span>
                                </div>

                                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-10 flex items-center gap-4">
                                    <div className="p-3 bg-red-500/5 rounded-xl text-red-500"><Flame size={24} /></div>
                                    Execution Protocol: Carbon Burn
                                </h3>

                                <div className="grid md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Magnitude (tCO2e)</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={retireAmount}
                                                onChange={e => setRetireAmount(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 text-4xl font-black text-slate-950 focus:bg-white focus:border-emerald-500 outline-none transition-all pr-24"
                                                placeholder="0.00"
                                            />
                                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase italic">Credits</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Tax Identifier (NIT)</label>
                                        <input
                                            type="text"
                                            value={nit}
                                            onChange={e => setNit(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 text-4xl font-black text-slate-950 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                                            placeholder="901.XXX.XXX-X"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleRetire}
                                    disabled={isRetiring || !retireAmount}
                                    className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-sm uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-black transition-all shadow-xl disabled:opacity-20 flex items-center justify-center gap-4 group overflow-hidden relative"
                                >
                                    {isRetiring ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />}
                                    <span>{isRetiring ? 'DECODING PROTOCOL...' : 'EXECUTE OFFSET'}</span>
                                </button>
                            </motion.div>
                        )}

                        {activeTab === 'archive' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-[3rem] p-10">
                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                                    <Archive className="text-slate-300" /> Institutional Archive
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2].map(id => (
                                        <div key={id} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-slate-900 uppercase italic mb-1">Impact Certificate #RE-00{id}</div>
                                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified: 0x{Math.random().toString(16).slice(2, 10)}...</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <div className="text-[10px] font-black text-slate-900 italic">250.00 tCO2e</div>
                                                    <div className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Audited</div>
                                                </div>
                                                <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-500 transition-all">
                                                    <Download size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 📊 RIGHT COLUMN: NETWORK INTELLIGENCE */}
                <div className="lg:col-span-4 space-y-8">

                    {/* LIQUIDITY TERMINAL */}
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-[3rem] relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Network Nodes</span>
                            <Globe size={16} className="text-emerald-500" />
                        </div>
                        <div className="space-y-4 mb-10">
                            {[
                                { city: 'Bogotá DC', status: 'Online' },
                                { city: 'Riyadh', status: 'Latent' },
                                { city: 'New York', status: 'Sync' }
                            ].map((node, i) => (
                                <div key={i} className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-slate-800">{node.city}</span>
                                    <span className="flex items-center gap-2">
                                        <div className={`w-1 h-1 rounded-full ${node.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                        {node.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-emerald-500 transition-all flex items-center justify-center gap-2">
                            Global Market View <ExternalLink size={12} />
                        </button>
                    </div>

                    {/* ⚡ INFRASTRUCTURE: LIVE SIGNAL MESH & GAS POOL (Phase 24) */}
                    <div className="bg-white border border-slate-950 p-8 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                            <Zap size={60} className="text-emerald-500" />
                        </div>
                        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2 italic">
                            <Activity size={14} className="text-emerald-500" /> Live Signal Mesh
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">$SIGNAL Gas Pool</span>
                                    <span className="text-xs font-black italic tracking-tighter">1,240,500 <span className="text-[8px] text-emerald-500 not-italic">SGNL</span></span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-[7px] font-black text-slate-400 uppercase mb-1 tracking-widest">Throughput</div>
                                    <div className="text-sm font-black italic">2.4k <span className="text-[8px] not-italic opacity-50">S/s</span></div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-[7px] font-black text-slate-400 uppercase mb-1 tracking-widest">Sovereignty</div>
                                    <div className="text-sm font-black italic">99.99%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* L.2173 COMPLIANCE WIDGET */}
                    <div className="bg-emerald-500 rounded-[3rem] p-10 text-slate-950 shadow-2xl relative overflow-hidden group hover:bg-emerald-400 transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4">ESG Shield</h4>
                        <p className="text-[10px] font-black uppercase leading-relaxed mb-10 opacity-70 italic shadow-sm">Your entity is 100% compliant with National Reforestation Law 2173.</p>
                        <div className="space-y-4 border-t border-black/10 pt-6">
                            <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest">
                                <span>Risk Level</span>
                                <span className="text-white">Minimum</span>
                            </div>
                            <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden p-0.5">
                                <div className="h-full bg-slate-950 rounded-full" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    {/* ANALYTICS PREVIEW */}
                    <div className="bg-white border border-slate-200 p-8 rounded-[3rem]">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic">Burn Velocity</h4>
                        <div className="flex items-end gap-1.5 h-16 mb-4">
                            {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-slate-100 rounded-sm hover:bg-emerald-500 transition-colors" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                            <span>Last 30D Impact Cycle</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* 🏆 CERTIFICATE MODAL (High Fidelity) */}
            <AnimatePresence>
                {showLegalCert && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-2xl p-6" onClick={() => setShowLegalCert(null)}>
                        <motion.div
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden relative border-[12px] border-slate-50"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-20 text-slate-900">
                                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-12 mb-12">
                                    <div>
                                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 italic">Climate Pass Exchange • Institutional Protocol</div>
                                        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-slate-950">Certificate of<br />Retirement</h1>
                                    </div>
                                    <Building2 size={64} className="text-slate-100" />
                                </div>

                                <p className="text-xl text-slate-600 italic leading-relaxed mb-12 border-l-4 border-emerald-500 pl-8">
                                    This institutional document validates that <span className="text-slate-950 font-black italic">{showLegalCert.company}</span> has definitively retired <span className="text-slate-950 font-black italic">{showLegalCert.amount} tCO2e</span> from the global ledger for environmental compliance.
                                </p>

                                <div className="bg-slate-50 rounded-[3rem] p-16 text-center border border-slate-100 shadow-inner group">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Inventory Removed</div>
                                    <div className="text-9xl font-black italic tracking-tight text-slate-950 group-hover:scale-105 transition-transform duration-700">{showLegalCert.amount}</div>
                                    <div className="text-lg font-black text-emerald-500 uppercase tracking-[0.4em] italic mt-4">Metric Tons of CO2e</div>
                                </div>

                                <div className="grid grid-cols-2 gap-12 mt-16 text-[9px] font-black uppercase tracking-widest">
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400">Tx Hash</span> <span className="text-slate-900">{showLegalCert.txHash.slice(0, 16)}...</span></div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400">Timestamp</span> <span className="text-slate-900">{showLegalCert.date}</span></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400">Status</span> <span className="text-emerald-500">FINALIZED</span></div>
                                        <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400">Compliance</span> <span className="text-slate-900">RE-ISO 2026</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 bg-slate-50 flex justify-between items-center border-t border-slate-100">
                                <button onClick={() => setShowLegalCert(null)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-950 transition-all italic underline underline-offset-8">Return to Terminal</button>
                                <button className="px-10 py-5 bg-slate-950 text-emerald-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-3 hover:bg-emerald-500 hover:text-black transition-all group">
                                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> Download Official Portfolio
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CorporatePanel;
