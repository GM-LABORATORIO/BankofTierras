import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Info, Globe, ShieldAlert, Award, ChevronLeft, ChevronRight, Zap, Share2, Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const IMPACT_CARDS = [
    {
        id: 1,
        title: "Amazonas Node #204",
        sub: "Primary Forest Conservation • ColCX certified",
        image: "https://images.unsplash.com/photo-1546272446-615729161cb9?auto=format&fit=crop&q=80&w=800",
        category: "Stewardship"
    },
    {
        id: 2,
        title: "Global Biodiversity",
        sub: "Jaguar Corridor Monitoring • Real-time Data",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
        category: "Monitoring"
    },
    {
        id: 3,
        title: "Cloud Forest Regeneration",
        sub: "Water Sequestration Node #045",
        image: "https://images.unsplash.com/photo-1558389186-438424b00a32?auto=format&fit=crop&q=80&w=800",
        category: "Wildlife"
    },
    {
        id: 4,
        title: "Social Impact Anchor",
        sub: "Local Communities Empowerment Program",
        image: "https://images.unsplash.com/photo-1627941094354-949449f9024c?auto=format&fit=crop&q=80&w=800",
        category: "Social"
    }
];

const ImpactPassport = () => {
    const { t } = useLanguage();

    return (
        <div className="space-y-8 pb-20 font-inter">
            {/* Header: Institutional Alignment */}
            <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">Green Citizenship™ Passport</h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-3">Memory of your Climate Action Trajectory</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-xl font-black text-slate-800 italic tracking-tighter">1,240,000 g</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Verified Compensation</div>
                    </div>
                    <div className="text-right border-l border-slate-100 pl-4">
                        <div className="text-xl font-black text-slate-800 italic tracking-tighter">12 Active Nodes</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Global Coverage</div>
                    </div>
                </div>
            </div>

            {/* Photographic Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {IMPACT_CARDS.map((card) => (
                    <motion.div
                        key={card.id}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                    >
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative">
                            <img
                                src={card.image}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                alt={card.title}
                            />
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-slate-800 shadow-sm hover:bg-emerald-500 hover:text-white transition-all">
                                    <ExternalLink size={14} />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[8px] font-black text-emerald-500 uppercase rounded-full border border-emerald-500/20">
                                    ColCX Certified
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{card.title}</h4>
                                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">{card.category}</span>
                            </div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase leading-relaxed italic pr-4">
                                {card.sub}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footnote / Action Section */}
            <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">Radical Transparency Protocol</h5>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Every impact signal is backed by a certified ColCX asset in smart contract custody.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all group shadow-sm relative z-10">
                    <Share2 size={16} className="text-emerald-500 group-hover:text-black" /> Share Trajectory
                </button>
            </div>
        </div>
    );
};

export default ImpactPassport;
