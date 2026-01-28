import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Book, Map as MapIcon, X, Globe, Star, Compass } from 'lucide-react';
import { getCulturalIcon } from './CulturalIcons';

const AdventurePassport = ({ isOpen, onClose, collectedStamps = [], collectedSpecies = [] }) => {
    const [activeTab, setActiveTab] = useState('stamps');

    // Calcular estadísticas
    const totalMonuments = 100; // Aproximado
    const progress = Math.round((collectedStamps.length / totalMonuments) * 100);

    // Determinar Rango de Explorador
    const getRank = () => {
        if (progress >= 50) return { title: "Explorador Legendario", color: "text-yellow-400" };
        if (progress >= 25) return { title: "Viajero Experto", color: "text-emerald-400" };
        if (progress >= 10) return { title: "Aventurero Curioso", color: "text-blue-400" };
        return { title: "Turista Novato", color: "text-gray-400" };
    };

    const rank = getRank();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, rotateY: 90 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    exit={{ scale: 0.9, rotateY: 90 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="relative w-full max-w-4xl h-[600px] bg-[#1a1b1e] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#2e2f33]"
                    onClick={(e) => e.stopPropagation()}
                    style={{ perspective: '1000px' }}
                >
                    {/* 📕 Cubierta / Panel Izquierdo (Perfil) */}
                    <div className="w-full md:w-1/3 bg-[#111215] p-8 border-r border-[#2e2f33] flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 blur-3xl rounded-full"></div>

                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/40 relative z-10 border-4 border-[#1a1b1e]">
                            <Globe size={40} className="text-white" />
                        </div>

                        <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-1">Pasaporte</h2>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${rank.color}`}>{rank.title}</h3>

                        <div className="w-full bg-[#1a1b1e] rounded-xl p-4 mb-6 border border-[#2e2f33]">
                            <div className="flex justify-between text-xs text-gray-400 font-bold mb-2 uppercase">
                                <span>Progreso Global</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                                />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                                <div className="bg-[#25262b] p-2 rounded-lg">
                                    <div className="text-xl font-black text-white">{collectedStamps.length}</div>
                                    <div className="text-[9px] uppercase text-gray-500 font-bold tracking-wider">Sellos</div>
                                </div>
                                <div className="bg-[#25262b] p-2 rounded-lg">
                                    <div className="text-xl font-black text-white">0</div>
                                    <div className="text-[9px] uppercase text-gray-500 font-bold tracking-wider">Países</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto w-full">
                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <X size={14} /> Cerrar Pasaporte
                            </button>
                        </div>
                    </div>

                    {/* 📄 Páginas / Panel Derecho (Contenido) */}
                    <div className="flex-1 bg-[#16171a] flex flex-col overflow-hidden relative">
                        {/* Pattern de fondo sutil */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        {/* Tabs */}
                        <div className="flex border-b border-[#2e2f33] p-4 gap-4 z-10 bg-[#16171a]/90 backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab('stamps')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === 'stamps' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Award size={14} /> Mis Sellos
                            </button>
                            <button
                                onClick={() => setActiveTab('biodiversidad')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === 'biodiversidad' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Book size={14} /> Biodiversidad
                            </button>
                        </div>

                        {/* Contenido Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent active:cursor-grabbing">

                            {activeTab === 'stamps' && (
                                <div>
                                    {collectedStamps.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center pt-20 opacity-40">
                                            <Compass size={64} className="mb-4 text-gray-500" />
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Tu pasaporte está vacío</p>
                                            <p className="text-gray-500 text-xs mt-2">¡Explora el mapa y visita monumentos para obtener sellos!</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {collectedStamps.map((stamp, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ scale: 0, rotate: -20 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="aspect-square bg-[#25262b] border-2 border-dashed border-[#3e4047] rounded-xl p-3 flex flex-col items-center justify-center text-center group hover:border-emerald-500/50 hover:bg-[#25262b] transition-all cursor-pointer relative overflow-hidden"
                                                >
                                                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                        <Award size={60} />
                                                    </div>
                                                    <div className="text-2xl mb-2 flex justify-center items-center h-12 w-12">
                                                        {getCulturalIcon(stamp.type, 0, 0, 30) || '🏛️'}
                                                    </div>
                                                    <div className="text-[10px] font-black text-gray-300 uppercase leading-tight line-clamp-2">{stamp.name}</div>
                                                    <div className="text-[8px] font-mono text-emerald-500 mt-1 opacity-60 group-hover:opacity-100">{stamp.date}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'biodiversidad' && (
                                <div className="space-y-6">
                                    {/* Ejemplo de Colección */}
                                    <div className="bg-[#1a1b1e] rounded-xl p-5 border border-[#2e2f33]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                                                    <Star size={14} className="text-yellow-500" fill="currentColor" />
                                                    Maravillas de América
                                                </h4>
                                                <p className="text-[10px] text-gray-500 font-medium mt-1">Explora los tesoros del nuevo mundo.</p>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-gray-400">0/20</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
                                            <div className="w-[0%] h-full bg-yellow-500"></div>
                                        </div>
                                        <div className="grid grid-cols-5 gap-2 opacity-30">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="aspect-square rounded-full bg-white/5 border border-white/10"></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#1a1b1e] rounded-xl p-5 border border-[#2e2f33]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                                                    <Star size={14} className="text-blue-500" fill="currentColor" />
                                                    Tesoros Europeos
                                                </h4>
                                                <p className="text-[10px] text-gray-500 font-medium mt-1">Historia antigua y castillos medievales.</p>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-gray-400">0/15</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
                                            <div className="w-[0%] h-full bg-blue-500"></div>
                                        </div>
                                    </div>

                                    <div className="text-center py-6">
                                        <p className="text-[10px] text-gray-600 font-mono uppercase">Más colecciones se desbloquearán pronto</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdventurePassport;
