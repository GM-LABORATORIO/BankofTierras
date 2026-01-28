import { motion } from 'framer-motion';
import { Users, Calendar, Award, ShieldCheck } from 'lucide-react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

const CommunityTab = ({ loadingCommunity, pixelHolders, upcomingEvents }) => {
    return (
        <div className="space-y-6">
            <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Comunidad Global
            </div>

            {loadingCommunity ? (
                <div className="space-y-4">
                    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-[2.5rem] space-y-4">
                        <Skeleton className="w-32 h-4" />
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="w-8 h-8 rounded-full" />
                                        <Skeleton className="w-24 h-4" />
                                    </div>
                                    <Skeleton className="w-16 h-4 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Community Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Impacto Total</div>
                            <div className="text-2xl font-black text-white">{pixelHolders.length}m²</div>
                        </div>
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Guardianes</div>
                            <div className="text-2xl font-black text-white">{new Set(pixelHolders.map(h => h.user_id)).size}</div>
                        </div>
                    </div>

                    {pixelHolders.length > 0 && (
                        <div className="p-1">
                            <div className="text-xs font-black text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Award size={14} className="text-blue-400" /> Ranking de Guardianes
                            </div>
                            <div className="space-y-3">
                                {pixelHolders.slice(0, 5).map((holder, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.06] transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-black border border-blue-500/20">
                                                    {idx + 1}
                                                </div>
                                                {idx === 0 && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border-2 border-[#080808]">
                                                        <ShieldCheck size={8} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-white uppercase tracking-tight">
                                                    {holder.profiles?.name || `Holder #${(holder.user_id || holder.wallet_address)?.slice(0, 6)}`}
                                                </div>
                                                <div className="text-[10px] text-gray-500 font-medium">Protegiendo el Amazonas</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-black text-blue-400">1m²</span>
                                            <span className="text-[8px] text-gray-600 uppercase font-black">Adopción Directa</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {upcomingEvents.length > 0 && (
                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-[2.5rem]">
                            <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                                📅 Próximos Eventos
                            </div>
                            <div className="space-y-4">
                                {upcomingEvents.map((event, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white uppercase group-hover:text-emerald-400 transition-colors">{event.title}</div>
                                            <div className="text-[10px] text-gray-500 font-medium">{new Date(event.event_date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {upcomingEvents.length === 0 && pixelHolders.length === 0 && (
                        <div className="text-center py-20 px-8 bg-white/[0.02] border border-white/10 border-dashed rounded-[3rem]">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-blue-400" />
                            </div>
                            <h5 className="text-xl font-black text-white uppercase mb-2">Comunidad de Holders</h5>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Este píxel aún no tiene holders registrados. <br />Sé el primero en unirte a la red de protección.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CommunityTab;
