import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, QrCode, Cpu } from 'lucide-react';

const GreenIdentityCard = ({ userProfile, reputation }) => {
    const rank = reputation?.total_score > 1000 ? 'Apex Guardian' :
        reputation?.total_score > 500 ? 'Veteran' :
            reputation?.total_score > 100 ? 'Sentinel' : 'Canopy';

    return (
        <div className="card-3d-container w-full max-w-[400px] h-[240px] cursor-pointer group font-inter">
            <div className="card-3d-inner shadow-2xl">
                {/* Front: Institutional Identity */}
                <div className="card-3d-front bg-white p-8 flex flex-col justify-between overflow-hidden relative border border-slate-200 rounded-[2rem]">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Globe size={180} className="text-slate-900" />
                    </div>

                    {/* Decorative Chip-like element */}
                    <div className="absolute top-1/2 left-0 w-12 h-16 bg-slate-50 border-y border-r border-slate-200 rounded-r-lg -translate-y-1/2 opacity-50 flex items-center justify-center">
                        <Cpu className="text-slate-200" size={20} />
                    </div>

                    <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2 leading-none italic">Asset Steward Card</span>
                            <h3 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter truncate max-w-[220px] leading-none mb-1">
                                {userProfile?.company_name?.toUpperCase() || 'INDIVIDUAL STEWARD'}
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{userProfile?.name || 'CPX Verified User'}</span>
                            </div>
                        </div>
                        <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
                            <ShieldCheck size={24} className="text-white" />
                        </div>
                    </div>

                    <div className="mt-auto z-10 flex items-end justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="px-3 py-1 bg-slate-800 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-lg">
                                    RANK: {rank}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-emerald-500" />
                                    <span className="text-sm font-black text-slate-800 tracking-tighter italic">{reputation?.total_score || 0} CSU</span>
                                </div>
                            </div>
                            <div className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em] font-mono">
                                ID: CPX-{userProfile?.id?.slice(0, 8) || 'GLOBAL-01'}
                            </div>
                        </div>
                        <div className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 border border-slate-200 rounded-full flex items-center justify-center opacity-30">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back: Secure Verification */}
                <div className="card-3d-back bg-slate-900 p-8 flex flex-col items-center justify-center border border-slate-800 rounded-[2rem] overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]" />
                    </div>
                    <div className="relative z-10 bg-white p-4 rounded-[2rem] shadow-2xl mb-6">
                        <QrCode size={100} className="text-slate-900" />
                    </div>
                    <div className="relative z-10 text-center">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-1 block">Proof of Legitimacy</span>
                        <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest block opacity-50">COL-RENARE-VERIFIED-NODE-12</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GreenIdentityCard;
