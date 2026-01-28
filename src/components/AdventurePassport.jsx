import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Book, Map as MapIcon, X, Globe, Star, Compass, Zap, ShieldCheck, Camera, Info, ExternalLink } from 'lucide-react';
import { getCulturalIcon } from './CulturalIcons';
import { BIODIVERSITY_DATA, CULTURAL_MONUMENTS } from '../data/monumentsData';

const AdventurePassport = ({ isOpen, onClose, collectedStamps = [], collectedSpecies = [] }) => {
    const [activeTab, setActiveTab] = useState('stamps');
    const [selectedItem, setSelectedItem] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);

    // Definición de Regiones para Monumentos
    const REGIONS = [
        { id: 'colombia', name: 'Colombia', countries: ['Colombia'] },
        { id: 'sa', name: 'América del Sur', countries: ['Brasil', 'Perú', 'Arg/Bra', 'Chile', 'Bolivia', 'Ecuador', 'Venezuela', 'Argentina'] },
        { id: 'na', name: 'América del Norte y Central', countries: ['USA', 'México', 'Guatemala', 'Belice', 'Canadá', 'Canadá/USA'] },
        { id: 'eu', name: 'Europa', countries: ['Francia', 'Italia', 'Grecia', 'España', 'UK', 'Alemania', 'Rusia', 'Croacia', 'Escocia'] },
        { id: 'as', name: 'Asia', countries: ['India', 'China', 'Camboya', 'Japón', 'Jordania', 'UAE', 'Indonesia', 'Vietnam', 'Myanmar', 'Nepal'] },
        { id: 'af', name: 'África', countries: ['Egipto', 'Tanzania', 'Zambia/Zimbabue', 'Botsuana', 'Marruecos', 'Sudáfrica', 'Etiopía'] },
        { id: 'oc', name: 'Oceanía y Polos', countries: ['Australia', 'Nueva Zelanda', 'Polinesia'] }
    ];

    // Definición de Rarezas para Biodiversidad
    const RARITIES = [
        { id: 'legendary', name: 'Especies Legendarias' },
        { id: 'rare', name: 'Especies Raras' },
        { id: 'common', name: 'Especies Comunes' }
    ];

    // Reiniciar página al cambiar de pestaña
    useEffect(() => {
        setPageIndex(0);
    }, [activeTab]);

    // Calcular estadísticas
    const progressStamps = Math.round((collectedStamps.length / CULTURAL_MONUMENTS.length) * 100);
    const progressSpecies = Math.round((collectedSpecies.length / BIODIVERSITY_DATA.length) * 100);
    const progress = Math.round((progressStamps + progressSpecies) / 2);

    // Datos actuales según página
    const getCurrentPageData = () => {
        if (activeTab === 'stamps') {
            const region = REGIONS[pageIndex];
            return {
                title: region.name,
                items: CULTURAL_MONUMENTS.filter(m => region.countries.includes(m.country)),
                total: REGIONS.length
            };
        } else {
            const rarity = RARITIES[pageIndex];
            return {
                title: rarity.name,
                items: BIODIVERSITY_DATA.filter(s => s.rarity === rarity.id),
                total: RARITIES.length
            };
        }
    };

    const currentPageData = getCurrentPageData();

    // Determinar Rango de Explorador
    const getRank = () => {
        if (progress >= 50) return { title: "Explorador Legendario", color: "text-yellow-400" };
        if (progress >= 25) return { title: "Viajero Experto", color: "text-emerald-400" };
        if (progress >= 10) return { title: "Aventurero Curioso", color: "text-blue-400" };
        return { title: "Turista Novato", color: "text-gray-400" };
    };

    const rank = getRank();

    if (!isOpen) return null;

    const DetailView = ({ item, type, onClose }) => {
        if (!item) return null;
        return (
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute inset-0 z-50 bg-[#111215] flex flex-col overflow-hidden"
            >
                {/* Header de Detalle */}
                <div className="p-4 flex justify-between items-center border-b border-[#2e2f33] bg-[#16171a]/90 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                            <Compass size={20} className="rotate-[-45deg]" />
                        </button>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">{item.name}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">{type === 'monument' ? item.country : item.species}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-red-500/10 rounded-full text-gray-500 hover:text-red-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Contenido de Detalle */}
                <div className="flex-1 overflow-y-auto p-0 scrollbar-none">
                    <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover shadow-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/20 shadow-2xl ${type === 'monument' ? 'bg-emerald-500/30 text-emerald-300' :
                                item.rarity === 'legendary' ? 'bg-yellow-500/30 text-yellow-300' :
                                    item.rarity === 'rare' ? 'bg-purple-500/30 text-purple-300' : 'bg-blue-500/30 text-blue-300'
                                }`}>
                                {type === 'monument' ? 'Monumento' : item.rarity}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 max-w-2xl mx-auto space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Info size={12} /> Descripción Histórica
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed font-medium italic">
                                "{item.description || 'Sin descripción disponible.'}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2e2f33]">
                            <div>
                                <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">Datos Curiosos</h4>
                                <ul className="space-y-2">
                                    {(item.facts || [item.habitat || 'Desconocido']).map((fact, i) => (
                                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                            <span>{fact}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[#1a1b1e] p-4 rounded-xl border border-white/5 flex flex-col justify-center text-center">
                                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Localización</div>
                                <div className="text-lg font-black text-white italic">
                                    {type === 'monument' ? item.country : 'Vida Silvestre'}
                                </div>
                                <div className="text-[9px] text-gray-600 font-mono mt-2">
                                    COORD: {item.coords?.join(', ') || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer de Detalle */}
                <div className="p-4 border-t border-[#2e2f33] bg-[#1a1b1e] flex justify-center">
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
                    >
                        Volver a la Bitácora
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="relative w-full max-w-5xl h-[700px] bg-[#1a1b1e] rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-[#2e2f33]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <AnimatePresence>
                        {selectedItem && (
                            <DetailView
                                item={selectedItem.data}
                                type={selectedItem.type}
                                onClose={() => setSelectedItem(null)}
                            />
                        )}
                    </AnimatePresence>

                    {/* 📕 Panel Izquierdo (Perfil) */}
                    <div className="w-full md:w-[30%] bg-[#111215] p-10 border-r border-[#2e2f33] flex flex-col items-center text-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full"></div>
                        <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>

                        <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl relative z-10 border-4 border-[#1a1b1e] rotate-3 hover:rotate-0 transition-transform duration-500">
                            <Globe size={48} className="text-white" />
                        </div>

                        <h2 className="text-3xl font-black text-white uppercase tracking-[0.1em] mb-1 italic">Pasaporte</h2>
                        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-8 py-1 px-3 border border-current rounded-full ${rank.color}`}>{rank.title}</h3>

                        <div className="w-full bg-[#1a1b1e]/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/5 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                    <span>Progreso Total</span>
                                    <span className="text-white">{progress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden p-[2px] border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-2xl font-black text-white">{collectedStamps.length}</div>
                                    <div className="text-[8px] uppercase text-emerald-500/60 font-black tracking-widest">Sellos</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-black text-white">{collectedSpecies.length}</div>
                                    <div className="text-[8px] uppercase text-blue-500/60 font-black tracking-widest">Especies</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto w-full">
                            <button
                                onClick={onClose}
                                className="w-full py-4 rounded-2xl border border-white/5 text-white/40 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                            >
                                <X size={16} /> Cerrar Bitácora
                            </button>
                        </div>
                    </div>

                    {/* 📄 Panel Derecho (Contenido) */}
                    <div className="flex-1 bg-[#16171a] flex flex-col overflow-hidden relative">
                        {/* Tabs Premium */}
                        <div className="flex border-b border-[#2e2f33] p-6 gap-6 z-10 bg-[#16171a]/95 backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab('stamps')}
                                className={`group relative px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === 'stamps' ? 'text-emerald-400 bg-emerald-500/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Award size={16} className={activeTab === 'stamps' ? 'text-emerald-400' : 'text-gray-600'} />
                                Monumentos
                                {activeTab === 'stamps' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('biodiversidad')}
                                className={`group relative px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${activeTab === 'biodiversidad' ? 'text-blue-400 bg-blue-500/5' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Book size={16} className={activeTab === 'biodiversidad' ? 'text-blue-400' : 'text-gray-600'} />
                                Biodiversidad
                                {activeTab === 'biodiversidad' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                            </button>
                        </div>

                        {/* Contenido Paginado */}
                        <div className="flex-1 flex flex-col overflow-hidden p-8">
                            {/* Cabecera de Página */}
                            <div className="flex justify-between items-center mb-8 px-2">
                                <div>
                                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-1">Sección</h4>
                                    <h5 className={`text-lg font-black italic uppercase tracking-wider ${activeTab === 'stamps' ? 'text-emerald-400' : 'text-blue-400'}`}>
                                        {currentPageData.title}
                                    </h5>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        disabled={pageIndex === 0}
                                        onClick={() => setPageIndex(prev => prev - 1)}
                                        className="p-3 rounded-full border border-white/5 hover:bg-white/5 disabled:opacity-20 transition-all text-white"
                                    >
                                        <Compass size={18} className="rotate-[-135deg]" />
                                    </button>
                                    <span className="text-[10px] font-black font-mono text-gray-500 tracking-widest whitespace-nowrap">
                                        PÁG {pageIndex + 1} / {currentPageData.total}
                                    </span>
                                    <button
                                        disabled={pageIndex === currentPageData.total - 1}
                                        onClick={() => setPageIndex(prev => prev + 1)}
                                        className="p-3 rounded-full border border-white/5 hover:bg-white/5 disabled:opacity-20 transition-all text-white"
                                    >
                                        <Compass size={18} className="rotate-[45deg]" />
                                    </button>
                                </div>
                            </div>

                            {/* Grilla de la Página */}
                            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                                <motion.div
                                    key={`${activeTab}-${pageIndex}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid grid-cols-2 sm:grid-cols-3 gap-6 pb-8"
                                >
                                    {currentPageData.items.map((item, idx) => {
                                        const isCollected = activeTab === 'stamps'
                                            ? collectedStamps.some(s => s.name === item.name)
                                            : collectedSpecies.some(s => s.name === item.name);

                                        const type = activeTab === 'stamps' ? 'monument' : 'species';

                                        return (
                                            <motion.div
                                                key={item.id || item.name}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => isCollected && setSelectedItem({ type, data: item })}
                                                className={`group relative aspect-[4/5] rounded-[2rem] overflow-hidden border transition-all duration-500 ${isCollected
                                                    ? `bg-[#25262b] ${activeTab === 'stamps' ? 'border-emerald-500/20' : 'border-blue-500/20'} shadow-xl cursor-pointer hover:scale-[1.05]`
                                                    : 'bg-black/20 border-white/5 grayscale pointer-events-none'
                                                    }`}
                                            >
                                                {isCollected ? (
                                                    <>
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                                        <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                                                            <ExternalLink size={12} className="text-white" />
                                                        </div>
                                                        <div className="absolute bottom-5 left-5 right-5">
                                                            <div className="text-[10px] font-black text-white uppercase tracking-wider truncate mb-1">{item.name}</div>
                                                            <div className="flex items-center gap-2">
                                                                {activeTab === 'stamps' ? (
                                                                    <Award size={10} className="text-emerald-500" />
                                                                ) : (
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.rarity === 'legendary' ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
                                                                        item.rarity === 'rare' ? 'bg-purple-400' : 'bg-blue-400'
                                                                        }`} />
                                                                )}
                                                                <span className={`text-[8px] font-black uppercase tracking-tighter truncate ${activeTab === 'stamps' ? 'text-emerald-500/80' : 'text-white/50'}`}>
                                                                    {activeTab === 'stamps' ? 'Sello Activo' : item.species}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                                        <div className={`w-14 h-14 bg-white/[0.03] rounded-3xl flex items-center justify-center mb-4 ${activeTab === 'stamps' ? 'group-hover:text-emerald-500/40' : 'group-hover:text-blue-500/40'} transition-colors`}>
                                                            {activeTab === 'stamps' ? getCulturalIcon(item.type, 0, 0, 28) : <Compass size={28} className="text-white/10 animate-pulse" />}
                                                        </div>
                                                        <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                                                            {activeTab === 'stamps' ? 'Área Protegida' : 'Especie Oculta'}
                                                        </div>
                                                        <div className="text-[6px] font-bold text-white/10 mt-2 uppercase tracking-widest truncate w-full">
                                                            {activeTab === 'stamps' ? item.country : item.habitat}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className={`absolute inset-0 border-[3px] border-dashed border-white/5 rounded-[2rem] m-2 pointer-events-none transition-colors ${isCollected ? (activeTab === 'stamps' ? 'group-hover:border-emerald-500/20' : 'group-hover:border-blue-500/20') : ''
                                                    }`} />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence >
    );
};

export default AdventurePassport;
