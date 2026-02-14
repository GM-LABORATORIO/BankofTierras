import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Maximize2,
    Minimize2,
    Layers,
    Settings,
    Info,
    Radio,
    Target,
    Zap,
    Heart,
    Globe,
    Users,
    Search,
    Play,
    X,
    Camera,
    ExternalLink,
    Shield,
    CheckCircle2
} from 'lucide-react';
import LifeMap from './LifeMap';

export default function LifeMapPage({ onBack }) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [hudVisible, setHudVisible] = useState(true);
    const [selectedLayer, setSelectedLayer] = useState('biodiversity');

    return (
        <div className="fixed inset-0 bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
            {/* HUD Header */}
            <AnimatePresence>
                {hudVisible && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className="absolute top-0 w-full z-50 p-6 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <button
                                onClick={onBack}
                                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-2xl transition-all"
                            >
                                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">Back to Protocol</span>
                            </button>
                            <div className="h-10 w-[1px] bg-white/10" />
                            <div>
                                <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Discovery Earth</h1>
                                <p className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-1 italic">Voxelized Planetary Explorer • v2.0</p>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/5 p-2 rounded-2xl">
                            {['biodiversity', 'carbon', 'sanctuaries', 'hydric'].map((layer) => (
                                <button
                                    key={layer}
                                    onClick={() => setSelectedLayer(layer)}
                                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedLayer === layer
                                        ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                        : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {layer}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
                                <Radio className="text-emerald-500 animate-pulse" size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">1,242 Live Nodes</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Interactive Map Container */}
            <div className="relative flex-1 flex flex-col bg-black">
                {/* The Map Component - Direct Inmersive Access */}
                <LifeMap isFullscreenDefault={true} onDiscovery={onBack} zoom={zoomLevel} />
            </div>

            {/* UI Bottom Controls */}
            <AnimatePresence>
                {hudVisible && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="absolute bottom-0 w-full z-50 p-8 flex items-end justify-between pointer-events-none"
                    >
                        {/* Left Side: Real-Time Telemetry Dashboard */}
                        <div className="space-y-4 pointer-events-auto">
                            <div className="bg-black/80 backdrop-blur-3xl border border-emerald-500/20 p-8 rounded-[3rem] min-w-[320px] shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/50" />
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Sector Amazonas 04</div>
                                            <div className="text-2xl font-black italic tracking-tighter text-white uppercase">Telemetry Hub</div>
                                        </div>
                                        <Radio className="text-emerald-500 animate-pulse" size={20} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'CO2 Offset', val: '4.2t', unit: 'P/Day' },
                                            { label: 'Bio-Sync', val: '98%', unit: 'Active' }
                                        ].map((m, i) => (
                                            <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{m.label}</div>
                                                <div className="flex items-end gap-1">
                                                    <span className="text-lg font-black text-white">{m.val}</span>
                                                    <span className="text-[8px] font-black text-emerald-500 mb-1">{m.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-5 pt-4">
                                        {[
                                            { label: 'Ecosystem Health', value: 84, color: 'bg-emerald-500' },
                                            { label: 'Cloud Density', value: 12, color: 'bg-blue-400' },
                                            { label: 'Sensor Connectivity', value: 92, color: 'bg-emerald-500' }
                                        ].map((stat, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-gray-400">
                                                    <span>{stat.label}</span>
                                                    <span className="text-white">{stat.value}%</span>
                                                </div>
                                                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stat.value}%` }}
                                                        transition={{ duration: 2, delay: i * 0.2 }}
                                                        className={`h-full ${stat.color} shadow-[0_0_10px_rgba(16,185,129,0.5)]`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Satellite Link: Stable</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Center: Branding (mimicking the bottom label in sketch) */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 text-center pointer-events-auto">
                            <div className="group relative px-10 py-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl backdrop-blur-xl">
                                <div className="text-xs font-black tracking-[0.5em] uppercase text-emerald-500">Mapamundi Voxelizado</div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                            </div>
                        </div>

                        {/* Right Side: NFT Discovery & Tactical Controls */}
                        <div className="flex flex-col gap-6 pointer-events-auto items-end">
                            {/* Animated NFT Certificate Mockup */}
                            <motion.div
                                animate={{ y: [0, -10, 0], rotateY: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-48 h-64 bg-gradient-to-br from-emerald-500/20 to-black border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col justify-between relative overflow-hidden hidden xl:flex"
                            >
                                <div className="absolute -inset-10 bg-emerald-500/10 blur-3xl rounded-full" />
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                                            <Shield className="text-emerald-500" size={14} />
                                        </div>
                                        <CheckCircle2 className="text-emerald-500" size={14} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[6px] font-black text-emerald-500/50 uppercase tracking-widest">Digital Asset Proof</div>
                                        <div className="text-xs font-black text-white leading-tight">PROTECTOR CERTIFICATE</div>
                                        <div className="w-full h-[1px] bg-emerald-500/20" />
                                        <div className="text-[10px] font-mono font-bold text-gray-500">ID: SEC-2025-092</div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 8))}
                                    className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500 transition-all text-white group"
                                >
                                    <Maximize2 size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
                                    className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500 transition-all text-white group"
                                >
                                    <Minimize2 size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <div className="h-[1px] w-full bg-white/10 my-2" />
                                <button
                                    onClick={() => setHudVisible(!hudVisible)}
                                    className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                                >
                                    <Target size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Indicators (Radar Style) */}
            <div className="absolute top-0 left-0 p-4 pointer-events-none opacity-40">
                <div className="w-32 h-32 border-t border-l border-emerald-500/30 rounded-tl-3xl" />
            </div>
            <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-40">
                <div className="w-32 h-32 border-t border-r border-emerald-500/30 rounded-tr-3xl" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 pointer-events-none opacity-40">
                <div className="w-32 h-32 border-b border-l border-emerald-500/30 rounded-bl-3xl" />
            </div>
            <div className="absolute bottom-0 right-0 p-4 pointer-events-none opacity-40">
                <div className="w-32 h-32 border-b border-r border-emerald-500/30 rounded-br-3xl" />
            </div>
        </div>
    );
}
