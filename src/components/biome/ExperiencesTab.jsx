import { motion } from 'framer-motion';
import { Plane, Video, Activity, Camera, ExternalLink, Gift, Sparkles } from 'lucide-react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

const ExperiencesTab = ({ loadingExperiences, premiumExperiences }) => {
    return (
        <div className="space-y-6">
            <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Experiencias Disponibles
            </div>

            {loadingExperiences ? (
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] space-y-4">
                            <Skeleton className="h-40 -mx-6 -mt-6 rounded-none rounded-t-[2rem]" />
                            <div className="flex gap-4 items-center">
                                <Skeleton className="w-12 h-12 rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="w-32 h-4" />
                                    <Skeleton className="w-24 h-3" />
                                </div>
                            </div>
                            <Skeleton className="w-full h-12 rounded-2xl" />
                        </div>
                    ))}
                </div>
            ) : premiumExperiences.length > 0 ? (
                <div className="grid gap-6">
                    {premiumExperiences.map((exp, idx) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative p-6 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
                        >
                            {exp.image_url && (
                                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                                    <img
                                        src={exp.image_url}
                                        alt={exp.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/90 backdrop-blur-xl rounded-full text-[10px] font-black text-white uppercase flex items-center gap-1.5 shadow-lg">
                                        <Sparkles size={10} /> Tier {exp.requires_tier}+
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 group-hover:border-emerald-500/50 transition-colors shadow-inner">
                                        {exp.experience_type === 'trip' && <Plane size={24} />}
                                        {exp.experience_type === 'webinar' && <Video size={24} />}
                                        {exp.experience_type === 'workshop' && <Activity size={24} />}
                                        {exp.experience_type === 'tour' && <Camera size={24} />}
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1">
                                            {exp.title}
                                        </h5>
                                        <p className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest flex items-center gap-2">
                                            {exp.experience_type === 'trip' && '✈️ Expedición Científica'}
                                            {exp.experience_type === 'webinar' && '🎓 Masterclass VIP'}
                                            {exp.experience_type === 'workshop' && '🛠️ Taller Regenerativo'}
                                            {exp.experience_type === 'tour' && '📷 Safari de Conservación'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
                                {exp.description}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
                            >
                                {exp.included_in_tier ? 'ACCEDER AHORA' : `RESERVAR POR $${exp.price_usd}`}
                                <ExternalLink size={14} />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 px-10 bg-white/[0.02] border border-white/10 border-dashed rounded-[3rem]"
                >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Gift className="w-10 h-10 text-white/20" />
                    </div>
                    <h5 className="text-xl font-black text-white uppercase mb-2">Próximamente</h5>
                    <p className="text-gray-500 text-sm font-medium">
                        Estamos diseñando experiencias únicas para este bioma. <br />Vuelve pronto para descubrir nuevas aventuras.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ExperiencesTab;
