import { motion } from 'framer-motion';
import { Shrub as Tree, Wind, Droplets, Heart, Zap, ShieldCheck, Activity } from 'lucide-react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

const ImpactTab = ({ loadingImpact, pixelImpact }) => {
    return (
        <div className="space-y-6">
            <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Huella de Regeneración
            </div>

            {loadingImpact ? (
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                    <Skeleton className="col-span-2 h-40" />
                </div>
            ) : pixelImpact && (pixelImpact.co2_captured_kg > 0 || pixelImpact.trees_planted > 0) ? (
                <>
                    {/* Impact Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-3xl group hover:border-emerald-500/40 transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                                    <Wind size={20} />
                                </div>
                                <div className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">CO2</div>
                            </div>
                            <div className="text-2xl font-black text-white">
                                {(pixelImpact.co2_captured_kg / 1000).toFixed(2)}
                                <span className="text-xs text-gray-400 ml-1 font-bold">ton</span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Captura Estimada</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="p-5 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-3xl group hover:border-green-500/40 transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-green-500/20 rounded-xl text-green-400">
                                    <Tree size={20} />
                                </div>
                                <div className="text-[10px] font-black text-green-500/50 uppercase tracking-widest">Flora</div>
                            </div>
                            <div className="text-2xl font-black text-white">
                                {pixelImpact.trees_planted}
                                <span className="text-xs text-gray-400 ml-1 font-bold">und</span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Sustento Arbóreo</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-3xl group hover:border-blue-500/40 transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                                    <Zap size={20} />
                                </div>
                                <div className="text-[10px] font-black text-blue-500/50 uppercase tracking-widest">Finanzas</div>
                            </div>
                            <div className="text-2xl font-black text-white">
                                <span className="text-sm mr-0.5">$</span>{pixelImpact.funds_raised_usd?.toLocaleString() || 0}
                            </div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Impacto Directo</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-3xl group hover:border-purple-500/40 transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                                    <Activity size={20} />
                                </div>
                                <div className="text-[10px] font-black text-purple-500/50 uppercase tracking-widest">Biota</div>
                            </div>
                            <div className="text-2xl font-black text-white">
                                {pixelImpact.species_protected || 0}
                                <span className="text-xs text-gray-400 ml-1 font-bold">spp</span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Biodiversidad</div>
                        </motion.div>
                    </div>

                    {/* Impact Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="text-xs font-black text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <ShieldCheck size={14} className="text-emerald-500" /> Cronología de Conservación
                        </div>
                        <div className="space-y-8 relative">
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/5" />
                            {[
                                { date: 'Abril 2024', event: 'Monitoreo Satelital de Alta Resolución activado.', type: 'tech' },
                                { date: 'Marzo 2024', event: 'Establecimiento de brigada contra incendios.', type: 'action' },
                                { date: 'Enero 2024', event: 'Restauración de micro-cuencas andinas iniciada.', type: 'nature' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                    className="flex gap-6 relative"
                                >
                                    <div className={`w-6 h-6 rounded-full border-4 border-[#080808] flex items-center justify-center z-10 ${idx === 0 ? 'bg-emerald-500' : 'bg-white/10'}`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white transition-all scale-100" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{item.date}</div>
                                        <div className="text-sm text-white font-medium max-w-xs">{item.event}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 px-10 bg-white/[0.02] border border-white/10 border-dashed rounded-[3rem]"
                >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Tree className="w-10 h-10 text-emerald-500/50" />
                    </div>
                    <h5 className="text-xl font-black text-white uppercase mb-2">Impacto en Proceso</h5>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        Aún no se ha reportado impacto directo para esta celda. <br />Tu contribución iniciará el ciclo de regeneración.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ImpactTab;
