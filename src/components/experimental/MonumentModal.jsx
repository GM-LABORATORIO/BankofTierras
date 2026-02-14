import React from 'react';
import { X, MapPin, Calendar, Info, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MonumentModal = ({ monument, isOpen, onClose, onVisit }) => {
    // 🛂 Auto-trigger de Sello de Pasaporte
    React.useEffect(() => {
        if (isOpen && monument && onVisit) {
            onVisit(monument);
        }
    }, [isOpen, monument, onVisit]);

    if (!isOpen || !monument) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop con blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-gray-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md"
                    >
                        {/* Header con Imagen (o gradiente si no hay imagen) */}
                        <div className="relative h-48 md:h-64 bg-gradient-to-br from-emerald-900 to-slate-900 overflow-hidden">
                            {monument.image ? (
                                <img
                                    src={monument.image}
                                    alt={monument.name}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl">{getMonumentEmoji(monument.type)}</span>
                                </div>
                            )}

                            {/* Botón Cerrar */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Título sobre imagen */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-1">{monument.name}</h2>
                                        <div className="flex items-center text-gray-300 gap-4 text-sm">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={14} className="text-emerald-400" />
                                                {monument.country || "Ubicación desconocida"}
                                            </span>
                                            {monument.year && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} className="text-blue-400" />
                                                    {monument.year}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(monument.type)}`}>
                                            {formatType(monument.type)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenido (Scrollable si es necesario) */}
                        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Columna Principal (Descripción) */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                                            <Info size={18} />
                                            Historia y Significado
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                            {monument.description || "Información histórica próximamente disponible. Este es un punto de interés clave en nuestro mapa de biodiversidad y cultura."}
                                        </p>
                                    </div>

                                    {monument.facts && monument.facts.length > 0 && (
                                        <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                            <h4 className="text-sm font-semibold text-blue-300 mb-3 uppercase tracking-wider">Datos Curiosos</h4>
                                            <ul className="space-y-2">
                                                {monument.facts.map((fact, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                                        <span className="text-emerald-500 mt-1">•</span>
                                                        {fact}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar (Detalles Técnicos) */}
                                <div className="space-y-6">
                                    <div className="bg-emerald-900/10 rounded-xl p-5 border border-emerald-500/20">
                                        <h4 className="text-xs font-semibold text-emerald-400 mb-4 uppercase tracking-wider">Detalles</h4>

                                        <div className="space-y-4">
                                            <DetailItem label="Coordenadas" value={`${monument.coords[1].toFixed(2)}°N, ${monument.coords[0].toFixed(2)}°W`} />
                                            <DetailItem label="Categoría" value={formatType(monument.type)} />
                                            <DetailItem label="Importancia" value="Alta" />
                                        </div>
                                    </div>

                                    <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-900/20">
                                        <ExternalLink size={16} />
                                        Ver en Wikipedia
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const DetailItem = ({ label, value }) => (
    <div>
        <span className="block text-xs text-gray-500 mb-1">{label}</span>
        <span className="block text-sm text-gray-200 font-medium">{value}</span>
    </div>
);

// Helpers
const getMonumentEmoji = (type) => {
    const map = {
        'tower': '🗼', 'pyramid': '🔺', 'temple': '🏛️', 'statue': '🗿',
        'church': '⛪', 'dome': '🕌', 'waterfall': '💧', 'volcano': '🗻',
        'rainbow': '🌈', 'modern': '🎭'
    };
    return map[type] || '📍';
};

const formatType = (type) => {
    const map = {
        'tower': 'Torre Histórica', 'pyramid': 'Pirámide Antigua', 'temple': 'Templo Sagrado',
        'statue': 'Monumento', 'church': 'Arquitectura Religiosa', 'dome': 'Arquitectura Islámica',
        'waterfall': 'Maravilla Natural', 'volcano': 'Formación Geológica',
        'rainbow': 'Fenómeno Natural', 'modern': 'Arquitectura Moderna'
    };
    return map[type] || 'Sitio de Interés';
};

const getTypeColor = (type) => {
    if (['waterfall', 'rainbow', 'volcano'].includes(type)) return 'border-blue-500/30 text-blue-300 bg-blue-500/10';
    if (['temple', 'pyramid', 'statue'].includes(type)) return 'border-amber-500/30 text-amber-300 bg-amber-500/10';
    return 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10';
};

export default MonumentModal;
