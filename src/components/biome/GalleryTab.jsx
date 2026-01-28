import { motion } from 'framer-motion';
import { Camera, Heart, Share2, ZoomIn } from 'lucide-react';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

const GalleryTab = ({ loadingGallery, galleryPhotos }) => {
    return (
        <div className="space-y-6">
            <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                Galería de la Comunidad
            </div>

            <div className="grid grid-cols-2 gap-4">
                {loadingGallery ? (
                    [1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="aspect-square rounded-3xl" />
                    ))
                ) : galleryPhotos.length > 0 ? (
                    galleryPhotos.map((photo, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all shadow-2xl"
                        >
                            <img
                                src={photo.photo_url}
                                alt={photo.caption}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-end">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    className="flex flex-col gap-3"
                                >
                                    <p className="text-xs text-white font-black uppercase tracking-tight">{photo.caption}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 backdrop-blur-md rounded-full">
                                                <Heart size={12} className="text-red-500 fill-red-500" />
                                                <span className="text-[10px] text-white font-black">{photo.likes_count || 0}</span>
                                            </div>
                                            <button className="p-1.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:text-cyan-400 transition-colors">
                                                <Share2 size={12} />
                                            </button>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                                            <ZoomIn size={14} />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            {/* User Badge */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/20" />
                                <span className="text-[8px] font-black text-white uppercase bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                                    Guardian #{(idx + 128).toString(16)}
                                </span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 px-10 bg-white/[0.02] border border-white/10 border-dashed rounded-[3rem] col-span-2"
                    >
                        <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Camera className="w-10 h-10 text-cyan-500/50" />
                        </div>
                        <h5 className="text-xl font-black text-white uppercase mb-2">Galería Vacía</h5>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                            Aún no hay registros visuales. <br />Sé el primero en compartir la belleza de este ecosistema.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GalleryTab;
