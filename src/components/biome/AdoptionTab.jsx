import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, ShieldAlert, TrendingUp, Check, Gift, Plane,
    Heart, ExternalLink, Loader2, CheckCircle2, Play, Camera,
    Download, Share2, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

const AdoptionTab = ({
    regionalData,
    selectedCell,
    selectedPlan,
    setSelectedPlan,
    tierBenefits,
    finalPrice,
    hasTravelBenefit,
    handleAdoptPixel,
    isProcessing,
    isAdopted,
    adoptionTx,
    ADOPTION_PLANS,
    dynamicTier,
    loadingRegion
}) => {
    useEffect(() => {
        if (isAdopted) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isAdopted]);
    if (loadingRegion) {
        return (
            <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                    <div className="flex justify-between">
                        <Skeleton className="w-24 h-3" />
                        <Skeleton className="w-16 h-3" />
                    </div>
                    <Skeleton className="w-full h-2" />
                    <Skeleton className="w-full h-10" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-16" />
            </div>
        );
    }
    if (isAdopted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-8 py-10"
            >
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)]"
                    >
                        <Check size={64} className="text-white" strokeWidth={4} />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 border-2 border-dashed border-emerald-500/30 rounded-full"
                    />
                </div>

                <div className="space-y-4">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-black text-white uppercase tracking-tight"
                    >
                        ¡Adopción Exitosa!
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-400 max-w-xs mx-auto text-sm font-medium leading-relaxed"
                    >
                        Has asegurado <span className="text-emerald-400 font-bold">1m²</span> de {selectedCell.zone?.biome || 'este ecosistema'}. Tu impacto está siendo registrado en la blockchain.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="w-full grid grid-cols-2 gap-4"
                >
                    <button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
                        <div className="p-3 bg-emerald-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                            <Download size={24} className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Descargar Título</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
                        <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform">
                            <Share2 size={24} className="text-blue-400" />
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Compartir Impacto</span>
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="w-full p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] flex items-center gap-6"
                >
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                        <Award size={32} className="text-emerald-400" />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">Nuevo Badge Desbloqueado</div>
                        <div className="text-white font-black uppercase text-lg tracking-tight">Guardian del Amazonas</div>
                    </div>
                </motion.div>

                {adoptionTx && (
                    <motion.a
                        href={`https://snowtrace.io/tx/${adoptionTx}`}
                        target="_blank"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-[10px] font-bold text-gray-500 hover:text-emerald-400 flex items-center gap-2 transition-colors"
                    >
                        HASH: {adoptionTx.substring(0, 10)}...{adoptionTx.substring(adoptionTx.length - 10)}
                        <ExternalLink size={12} />
                    </motion.a>
                )}
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Health Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-white/5 border border-white/10 rounded-xl"
            >
                <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-wider mb-2">
                    <span>Estado Conservación</span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-[8px]">CV: {regionalData?.conservation_score || 5}/10</span>
                        <span className="text-emerald-500 text-lg">
                            {regionalData?.conservation_status || selectedCell.zone?.status}
                        </span>
                    </div>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedCell.zone?.health || 85}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                    />
                </div>
                <div className="mt-2 text-[10px] text-gray-400 font-medium leading-tight">
                    {regionalData?.description || "Cargando datos regionales del ecosistema..."}
                </div>
            </motion.div>

            {/* Endangered Species */}
            {(regionalData?.endemic_species || selectedCell.zone?.endangeredSpecies) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl"
                >
                    <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-wider mb-3">
                        <ShieldAlert size={16} /> Especies Endémicas & Clave
                    </div>
                    <div className="text-sm text-gray-300 font-medium leading-relaxed">
                        {(regionalData?.endemic_species || selectedCell.zone.endangeredSpecies).join(' • ')}
                    </div>
                </motion.div>
            )}

            {/* Main Threats */}
            {regionalData?.main_threats && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl"
                >
                    <div className="flex items-center gap-2 text-xs font-black text-orange-400 uppercase tracking-wider mb-3">
                        <TrendingUp size={16} /> Amenazas Principales
                    </div>
                    <div className="text-sm text-gray-300 font-medium leading-relaxed">
                        {regionalData.main_threats.join(' • ')}
                    </div>
                </motion.div>
            )}

            {/* Adoption Plans */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                    <Calendar size={16} /> Plan de Adopción
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ADOPTION_PLANS.map((plan, idx) => (
                        <motion.button
                            key={plan.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 + 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedPlan(plan)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center ${selectedPlan.id === plan.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'} ${plan.id === 'plan_perpetual' ? 'col-span-2 md:col-span-1 border-cyan-500/30 bg-cyan-500/5' : ''}`}
                        >
                            <div className="text-xl mb-1">{plan.badge.split(' ')[0]}</div>
                            <div className="text-xs font-black text-white uppercase tracking-tighter">{plan.name}</div>
                            {plan.discount > 0 ? (
                                <div className="text-[10px] text-emerald-400 font-bold mt-1">
                                    -{plan.discount}% OFF
                                </div>
                            ) : plan.id === 'plan_perpetual' && (
                                <div className="text-[10px] text-cyan-400 font-black mt-1">
                                    META-OWNER
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Tangible Impact Benefits */}
                <AnimatePresence>
                    {tierBenefits.filter(b => b.benefit_type === 'physical' || b.benefit_type === 'digital').length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-3 overflow-hidden"
                        >
                            <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
                                Beneficios de Impacto Real
                            </div>
                            {tierBenefits.filter(b => b.benefit_type === 'physical' || b.benefit_type === 'digital').map((benefit, idx) => (
                                <div key={idx} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
                                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                                        {benefit.benefit_type === 'physical' ? <Gift size={20} className="text-emerald-400" /> : <Camera size={20} className="text-cyan-400" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-white uppercase tracking-tighter">{benefit.name}</div>
                                        <div className="text-xs text-gray-400 leading-tight mt-0.5">{benefit.description}</div>
                                        <div className={`text-[10px] font-black uppercase mt-2 ${benefit.benefit_type === 'physical' ? 'text-amber-400' : 'text-cyan-400'}`}>
                                            {benefit.benefit_type === 'physical' ? '🎁 Producto Físico' : '💎 Activo Digital'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Plan Benefits */}
                <div className="mt-4 p-4 bg-white/5 rounded-xl">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                        Servicios del Ecosistema ({tierBenefits.filter(b => b.benefit_type !== 'physical' && b.benefit_type !== 'digital').length})
                    </div>
                    <div className="space-y-2">
                        {tierBenefits.filter(b => b.benefit_type !== 'physical' && b.benefit_type !== 'digital').map((benefitItem, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                                <Check size={14} className="text-emerald-500" />
                                <span className="opacity-60">{benefitItem.benefit?.icon}</span>
                                {benefitItem.benefit?.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price */}
            <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                    Aporte de Conservación ({selectedPlan.duration} meses)
                </div>
                <div className="text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                    ${finalPrice} <span className="text-sm text-gray-500">USD</span>
                </div>
                <AnimatePresence>
                    {hasTravelBenefit && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center gap-3"
                        >
                            <Plane className="text-cyan-400" size={18} />
                            <div>
                                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">Beneficio Desbloqueado</div>
                                <div className="text-xs font-bold text-white uppercase">Boleto de Exploración Regional Incluido</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {selectedPlan.discount > 0 && (
                    <div className="mt-2 text-xs text-emerald-400 font-bold">
                        Ahorras ${((selectedCell.price * selectedPlan.duration / 12) * (selectedPlan.discount / 100)).toFixed(2)} USD
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto pb-6">
                {selectedCell.zone?.donationLink && (
                    <a
                        href={selectedCell.zone.donationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl hover:bg-blue-500/20 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <Heart className="text-blue-400" size={18} />
                            <span className="text-sm font-black text-blue-400 uppercase tracking-wider">
                                Donar Ahora
                            </span>
                        </div>
                        <ExternalLink className="text-blue-400 group-hover:translate-x-1 transition-transform" size={14} />
                    </a>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdoptPixel}
                    disabled={isProcessing || isAdopted}
                    className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3 ${isAdopted ? 'bg-blue-500 text-white cursor-default' : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-emerald-500/25'}`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Procesando...
                        </>
                    ) : isAdopted ? (
                        <>
                            <CheckCircle2 />
                            Píxel Adoptado
                        </>
                    ) : (
                        <>
                            Adoptar Ahora
                            <Play size={24} />
                        </>
                    )}
                </motion.button>

                {isAdopted && adoptionTx && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                    >
                        <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Registro Blockchain Exitoso</div>
                        <div className="text-[10px] text-gray-400 font-mono truncate">{adoptionTx}</div>
                        <a
                            href={`https://snowtrace.io/tx/${adoptionTx}`}
                            target="_blank"
                            className="mt-2 text-[9px] font-bold text-blue-400 hover:underline flex items-center gap-1"
                        >
                            Ver en Snowtrace <ExternalLink size={10} />
                        </a>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdoptionTab;
