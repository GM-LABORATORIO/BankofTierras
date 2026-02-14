import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Star, Award, MapPin, Gift, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { merchantService } from '../services/merchantService';
import { useLanguage } from '../context/LanguageContext';

const GreenBusinessCenter = ({ userScore = 1250 }) => {
    const { t } = useLanguage();
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMerchants = async () => {
            const data = await merchantService.getCertifiedBusinesses();
            setMerchants(data);
            setLoading(false);
        };
        fetchMerchants();
    }, []);

    return (
        <div className="space-y-12 pb-20 font-inter">
            {/* Page Header: Institutional Alignment */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">
                        B2B Discovery Hub
                    </h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-3">
                        Certified Green Ecosystem • Network Nodes
                    </p>
                </div>

                <div className="bg-white border border-slate-200 px-8 py-5 rounded-[2rem] flex items-center gap-6 shadow-sm">
                    <div className="text-right">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Retail Impact</span>
                        <div className="text-xl font-black text-slate-800 italic">{userScore} <span className="text-emerald-500">CPX</span></div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                        <Award size={24} />
                    </div>
                </div>
            </div>

            {/* Merchant Grid: Clean Modular Style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {merchants.map((merchant) => (
                    <motion.div
                        key={merchant.id}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                                <Store size={32} />
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1.5 text-emerald-500 font-black italic">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-lg">{merchant.impact_score}</span>
                                </div>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Impact Rank</span>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{merchant.name}</h3>
                            <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                <MapPin size={10} className="text-emerald-500" /> {merchant.type} • Active Verified Node
                            </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl p-5 mb-8 border border-slate-100">
                            <div className="flex items-center gap-3 text-emerald-500 mb-3">
                                <Gift size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest italic">Co2Pay™ Benefits</span>
                            </div>
                            <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase pr-4">{merchant.perk}</p>
                        </div>

                        <button className="w-full py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2">
                            View Transactional Data <ArrowUpRight size={14} />
                        </button>
                    </motion.div>
                ))}

                {/* Institutional Onboarding CTA */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-800 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden group shadow-lg"
                >
                    <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="relative z-10 w-full">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <TrendingUp size={40} className="text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-3">
                            Business Onboarding
                        </h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                            Certified your business as a Climate Recovery Node.
                        </p>
                        <div className="h-0.5 w-12 bg-emerald-500/30 mx-auto my-8" />
                        <button className="w-full py-5 bg-white text-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all shadow-xl">
                            Register Corporate Node
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GreenBusinessCenter;
