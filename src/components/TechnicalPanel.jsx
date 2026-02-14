import React from 'react';
import { BookOpen, Scale, Zap, Database, Globe, ShieldCheck, Leaf, Cpu, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const TechnicalPanel = () => {
    const sections = [
        {
            title: "IPCC Methodology",
            icon: <Leaf className="text-emerald-500" />,
            subtitle: "Scientific Absorption",
            content: "Our platform uses the forest reference emission level (FREL) based on IPCC guidelines for tropical forests.",
            formula: "Hectares × 2.5 (tCO2/ha/year) = $CARBON",
            details: [
                "IPCC Tier 3 Compliance",
                "Periodic Satellite Monitoring",
                "10% Risk Buffer"
            ]
        },
        {
            title: "Web3 Traceability",
            icon: <Database className="text-emerald-500" />,
            subtitle: "On-Chain Immutability",
            content: "We combine Avalanche with IPFS for total transparency on the provenance of each carbon credit.",
            details: [
                "Immutable Metadata (IPFS CID)",
                "Land Verification Hash",
                "Publicly Auditable Contracts"
            ]
        },
        {
            title: "Legal Framework",
            icon: <Scale className="text-emerald-500" />,
            subtitle: "Institutional Compliance",
            content: "Aligned with MinAmbiente Resolution 1447 and the National Emission Reduction Registry (RENARE).",
            details: [
                "Law 1819 Carbon Tax Compliant",
                "Additionality Protocol",
                "Gov-Grade Digital Signatures"
            ]
        },
        {
            title: "Infrastructure",
            icon: <Cpu className="text-emerald-500" />,
            subtitle: "Avalanche C-Chain",
            content: "We operate on Avalanche for its energy efficiency (Net Zero) and sub-second finality.",
            details: [
                "Net Zero Grid Emissions",
                "Horizontal Scalability",
                "Double-Spend Insurance"
            ]
        }
    ];

    return (
        <div className="space-y-12 pb-20 font-inter">
            {/* Header: Institutional Alignment */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">
                        Technical Whitepaper
                    </h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-3">
                        Documentation & Methodology • Radical Transparency
                    </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 px-8 py-5 rounded-[2rem] flex items-center gap-6 shadow-sm">
                    <div className="text-right">
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Network Trust</span>
                        <div className="text-xl font-black text-slate-800 italic">99.8% <span className="text-emerald-500">Verified</span></div>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500">
                        <ShieldCheck size={24} />
                    </div>
                </div>
            </div>

            {/* Technical Modular Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-emerald-500/10 transition-colors shadow-inner">
                                {React.cloneElement(section.icon, { size: 32 })}
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{section.subtitle}</div>
                                <div className="text-2xl font-black text-slate-800 italic tracking-tighter">{section.title}</div>
                            </div>
                        </div>

                        <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium pr-10">
                            {section.content}
                        </p>

                        {section.formula && (
                            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl mb-8 font-mono text-xs text-emerald-600 text-center shadow-inner tracking-tight">
                                {section.formula}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {detail}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Live Data Feed Overlay style */}
            <div className="bg-slate-800 rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-500">
                                <Activity size={24} className="animate-pulse" />
                            </div>
                            <h4 className="text-2xl font-black uppercase tracking-tighter italic">Live Satellite Oracle</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            Integrating real-time satellite telemetry via **CPX Data Engine** for dynamic biomass auditing and topographical verification.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div className="px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-center">
                            <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1 italic">Network Health</div>
                            <div className="text-emerald-500 font-black text-lg">OPTIMAL</div>
                        </div>
                        <button className="px-10 py-5 bg-emerald-500 text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-3">
                            API Specs <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalPanel;
