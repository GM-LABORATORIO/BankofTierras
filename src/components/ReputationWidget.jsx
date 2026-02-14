import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Star, Trophy, ArrowUpRight } from 'lucide-react';

const B2C_RANGES = [
    { name: 'Nebulous', min: 0, color: 'text-slate-400', bg: 'bg-slate-400/10' },
    { name: 'Rooted', min: 100, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Canopy', min: 500, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { name: 'Emergent', min: 1500, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { name: 'Apex Guardian', min: 5000, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
];

const B2B_RANGES = [
    { name: 'Catalyst', min: 0, color: 'text-slate-400', bg: 'bg-slate-400/10' },
    { name: 'Restorer', min: 1000, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { name: 'Biosphere Architect', min: 5000, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { name: 'Terra Legacy', min: 25000, color: 'text-amber-400', bg: 'bg-amber-400/10' }
];

const ReputationWidget = ({ score = 0, role = 'guardian', entityType = 'individual' }) => {
    const isB2B = entityType === 'company';
    const ranges = isB2B ? B2B_RANGES : B2C_RANGES;

    const currentRange = [...ranges].reverse().find(r => score >= r.min) || ranges[0];
    const nextRange = ranges[ranges.indexOf(currentRange) + 1];

    const progress = nextRange
        ? ((score - currentRange.min) / (nextRange.min - currentRange.min)) * 100
        : 100;

    return (
        <div className="bg-[#0a0f1e] border border-white/5 rounded-[2rem] p-6 lg:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield size={120} className={currentRange.color} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl ${currentRange.bg} ${currentRange.color}`}>
                        <Zap size={20} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 leading-none mb-1">CPX reputation score</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white italic">{score.toLocaleString()}</span>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12% vs last month</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-end mb-3">
                        <div>
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Rango Actual</span>
                            <span className={`text-xl font-black uppercase tracking-tighter italic ${currentRange.color}`}>
                                {currentRange.name}
                            </span>
                        </div>
                        {nextRange && (
                            <div className="text-right">
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Próximo Rango</span>
                                <span className="text-xs font-black text-gray-400 uppercase">{nextRange.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]`}
                        />
                    </div>
                    {nextRange && (
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest text-center">
                            Faltan {(nextRange.min - score).toLocaleString()} puntos para alcanzar {nextRange.name}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-emerald-500/30 transition-all cursor-pointer group/item">
                        <div className="flex items-center justify-between mb-2">
                            <Target size={16} className="text-emerald-500" />
                            <ArrowUpRight size={14} className="text-gray-600 group-hover/item:text-emerald-500 transition-colors" />
                        </div>
                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Impacto Real</div>
                        <div className="text-sm font-black text-white italic">0.12% GLOBAL</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer group/item">
                        <div className="flex items-center justify-between mb-2">
                            <Star size={16} className="text-blue-500" />
                            <Trophy size={14} className="text-gray-600 group-hover/item:text-blue-500 transition-colors" />
                        </div>
                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Logros</div>
                        <div className="text-sm font-black text-white italic">14 DESBLOQUEADOS</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReputationWidget;
