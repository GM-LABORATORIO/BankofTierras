import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Graticule } from "react-simple-maps";
import { Play, Heart, Shield, Radio, MapPin, Zap, Info, X, Camera, Droplets, Trees, Search, ExternalLink, Users, Globe, TrendingUp, DollarSign, Lock, Maximize2, Minimize2, Settings, List, Activity, Anchor, Bird, Wind, CloudSun, ShieldAlert, Mountain, Palmtree, Waves, Book, Compass, Award } from 'lucide-react';
import { calculateAdjacencyBonus } from '../utils/adjacencyLogic';
import { GLOBAL_BIOMES, detectBiomeByLocation } from '../data/globalBiomes';
import EnhancedBiomeModal from './EnhancedBiomeModal';
import BiomeParticles from './BiomeParticles';
import { getBiomeIconComponent } from './BiomeIconsSVG';
import { getCulturalIcon } from './CulturalIcons';
import { CULTURAL_MONUMENTS, BIOME_ICONS, BIODIVERSITY_DATA } from '../data/monumentsData';
import MonumentModal from './MonumentModal';
import AdventurePassport from './AdventurePassport';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Configuración de Malla Táctica
const GRID_STEP = 1.0;

// Generador de números pseudoaleatorios determinista basado en coordenadas
const getStableSeed = (lon, lat) => {
    const x = Math.sin(lon * 12.9898 + lat * 78.233) * 43758.5453;
    return x - Math.floor(x);
};

// Base de Datos de Inteligencia Biogeográfica Expandida (Variedad y Realidad)
const ZONE_INTELLIGENCE = {
    GUAJIRA: {
        coords: { lon: [-73, -71], lat: [11, 13] },
        name: "LA GUAJIRA: DESIERTO SAGRADO",
        species: ["Phoenicopterus roseus", "Stenocereus griseus"],
        health: 78,
        status: "Vulnerable (UICN)",
        funFact: "Ecosistema de dunas y vientos constantes. Territorio ancestral de la nación Wayúu.",
        liveTag: "Santuario Los Flamencos",
        icon: <Bird className="text-orange-400" />,
        basePrice: 320 // Hotspot Premium
    },
    AMAZONAS: {
        coords: { lon: [-75, -65], lat: [-5, 5] },
        name: "AMAZONÍA: PULMÓN DEL MUNDO",
        species: ["Panthera onca", "Inia geoffrensis"],
        health: 95,
        status: "Protección Crítica",
        funFact: "Concentra el 10% de la biodiversidad conocida. Cada hectárea captura 200t de CO2.",
        liveTag: "Reserva Biológica BoT",
        icon: <Trees className="text-emerald-500" />,
        basePrice: 350 // Valor Máximo
    }
};

// Motor de Biomas con Economía Dinámicas y Sistema de Tiers
const getProceduralBiome = (lon, lat, isLand) => {
    const seed = getStableSeed(lon, lat);

    // 🌍 PASO 1: Buscar en base de datos de biomas reales
    const realBiome = detectBiomeByLocation(lon, lat);
    if (realBiome) {
        // Determinar tier para biomas reales
        let tier = { name: "BASIC", level: 4, multiplier: 1.0 };
        if (seed > 0.99) tier = { name: "EPIC", level: 1, multiplier: 10.0 };
        else if (seed > 0.90) tier = { name: "RARE", level: 2, multiplier: 3.0 };
        else if (seed > 0.70) tier = { name: "COMMON", level: 3, multiplier: 1.5 };

        return { ...realBiome, tier };
    }

    // 🎲 PASO 2: Lógica procedural para zonas no catalogadas
    const absLat = Math.abs(lat);
    const healthBase = 80 + Math.floor(seed * 19);

    // Determinación de Rareza (Tier) determinista
    let tier = { name: "BASIC", level: 4, multiplier: 1.0 };

    if (seed > 0.99) tier = { name: "EPIC", level: 1, multiplier: 10.0 };
    else if (seed > 0.90) tier = { name: "RARE", level: 2, multiplier: 3.0 };
    else if (seed > 0.70) tier = { name: "COMMON", level: 3, multiplier: 1.5 };

    if (!isLand) {
        if (absLat < 20) return {
            name: "ARRECIFE DE CORAL",
            species: ["Eretmochelys imbricata", "Millepora complanata"],
            health: healthBase - 15,
            status: "Amenazado",
            funFact: "Barreras naturales de protección costera.",
            icon: <Droplets className="text-blue-300" />,
            basePrice: 180,
            tier: tier
        };
        return {
            name: "ABISMO MARINO",
            species: ["Vampyroteuthis infernalis", "Teuthogetone"],
            health: 98,
            status: "Prístino",
            funFact: "Zonas de alta presión donde la luz no llega.",
            icon: <Anchor className="text-blue-700" />,
            basePrice: 100,
            tier: tier
        };
    }

    if (absLat > 65) return { name: "TUNDRA Y PERMAFROST", species: ["Rangifer tarandus", "Salix arctica"], health: 84, status: "Riesgo Térmico", funFact: "Suelo congelado que almacena metano.", icon: <CloudSun className="text-blue-100" />, basePrice: 125, tier };
    if (absLat > 45) return { name: "TAIGA BOREAL", species: ["Ursus arctos", "Abies sibirica"], health: 90, status: "Reserva de Carbono", funFact: "Filtro de aire gigante del hemisferio norte.", icon: <Trees className="text-emerald-700" />, basePrice: 175, tier };
    if (absLat > 25 && absLat < 35 && (lon > -20 && lon < 50)) return { name: "DESIERTO ÁRIDO", species: ["Camelus dromedarius", "Varanus griseus"], health: 82, status: "Sensible", funFact: "Zonas de alta irradiancia solar.", icon: <Wind className="text-orange-200" />, basePrice: 220, tier };
    if (absLat < 15) return { name: "SELVA ECUATORIAL", species: ["Ateles hybridus", "Hevea brasiliensis"], health: healthBase, status: "Hotspot Biótico", funFact: "Zonas de humedad extrema y alta densidad biológica.", icon: <Trees className="text-emerald-500" />, basePrice: 300, tier };

    return { name: "SABANA Y ESTEPA", species: ["Panthera leo", "Adansonia"], health: 86, status: "Estable", funFact: "Ecosistemas de transición vitales.", icon: <Wind className="text-orange-300" />, basePrice: 150, tier };
};

// --- Componentes Internos de HUD (Definidos fuera) ---
const FlashNotification = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl z-[500] pointer-events-none flex items-center gap-3"
        >
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">{message}</span>
        </motion.div>
    );
};

const DiscoveryCinematic = ({ item, type, onClose }) => {
    if (!item) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-xl pointer-events-auto cursor-pointer"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 2, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                className="relative w-full max-w-lg aspect-[3/4] bg-[#f4f1ea] rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-10 border-[12px] border-white/10"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 pointer-events-none"></div>

                {/* Slamming Stamp Effect */}
                <motion.div
                    initial={{ scale: 5, opacity: 0, y: -200 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring", damping: 8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                    <div className="w-80 h-80 border-[12px] border-emerald-600/20 rounded-full flex items-center justify-center rotate-[-25deg]">
                        <span className="text-5xl font-black text-emerald-600/20 uppercase tracking-tighter border-y-8 border-emerald-600/20 py-4 italic">VERIFICADO</span>
                    </div>
                </motion.div>

                <div className="relative z-10 flex-1 flex flex-col items-center text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] mb-6">Discovery Log v.01</div>

                    <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 border-[6px] border-white shadow-2xl rotate-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <h2 className="text-4xl font-black text-gray-900 uppercase italic leading-none mb-3 tracking-tighter">{item.name}</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-8 border-b border-gray-200 pb-4 w-full">
                        {type === 'monument' ? item.country : item.species}
                    </p>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Registro de Bitácora</div>
                        <div className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] px-8 py-3 bg-gray-900 text-white rounded-xl shadow-xl">
                            {type === 'monument' ? 'SELLO CONCEDIDO' : `NIVEL: ${item.rarity?.toUpperCase()}`}
                        </div>
                    </div>

                    <div className="mt-10 text-[9px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                        LOC: {item.coords?.join(', ') || '0.00, 0.00'}
                    </div>
                </div>

                <div className="absolute bottom-6 right-8 opacity-[0.05] rotate-12">
                    <Globe size={180} className="text-gray-900" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                className="absolute bottom-12 text-white/50 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3"
            >
                <Compass size={14} className="animate-spin-slow" /> Haz clic para continuar tu viaje
            </motion.div>
        </motion.div>
    );
};

const ExplorerHUD = ({ collectedStampsCount, collectedSpeciesCount, onOpenPassport }) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[400] flex items-center p-1 bg-black/80 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
            <button
                onClick={onOpenPassport}
                className="flex items-center gap-2 px-1 py-1 rounded-2xl hover:bg-white/5 transition-all group"
            >
                <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-[1.25rem] border border-white/5 group-hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 border-r border-white/10 pr-4">
                        <div className="relative">
                            <Award className="text-emerald-400" size={18} />
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={collectedStampsCount}
                                    initial={{ scale: 2, opacity: 1 }} animate={{ scale: 1, opacity: 0 }}
                                    className="absolute inset-0 bg-emerald-500 rounded-full blur-md"
                                />
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="text-[12px] font-black text-white">{collectedStampsCount}</span>
                            <span className="text-[7px] font-black text-emerald-500/60 uppercase tracking-widest">Sellos</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Book className="text-blue-400" size={18} />
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={collectedSpeciesCount}
                                    initial={{ scale: 2, opacity: 1 }} animate={{ scale: 1, opacity: 0 }}
                                    className="absolute inset-0 bg-blue-500 rounded-full blur-md"
                                />
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="text-[12px] font-black text-white">{collectedSpeciesCount}</span>
                            <span className="text-[7px] font-black text-blue-500/60 uppercase tracking-widest">Especies</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-6 py-3">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">Bitácora Global</span>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                        <Compass size={16} className="group-hover:rotate-45 transition-transform" />
                    </div>
                </div>
            </button>
        </motion.div>
    );
};

const LifeMap = ({ onDiscovery, isFullscreenDefault = false, zoom: externalZoom }) => {
    const [hoveredData, setHoveredData] = useState(null);
    const [internalZoom, setInternalZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(isFullscreenDefault);
    const [viewMode, setViewMode] = useState('biologic');
    const [selectedMonument, setSelectedMonument] = useState(null);
    const [isMonumentModalOpen, setIsMonumentModalOpen] = useState(false);
    const [lastDiscoveryTime, setLastDiscoveryTime] = useState(0);
    const [discoveryNotification, setDiscoveryNotification] = useState(null); // { item, type }

    // 🛒 Estado de Selección Múltiple (Carrito)
    const [selectedCells, setSelectedCells] = useState([]);

    // 🛂 Adventure Passport State
    const [isPassportOpen, setIsPassportOpen] = useState(false);
    const [collectedStamps, setCollectedStamps] = useState(() => {
        const saved = localStorage.getItem('bot_adventure_stamps');
        return saved ? JSON.parse(saved) : [];
    });
    const [collectedSpecies, setCollectedSpecies] = useState(() => {
        const saved = localStorage.getItem('bot_biodiversity_album');
        return saved ? JSON.parse(saved) : [];
    });
    const [flashMsg, setFlashMsg] = useState(null);

    // ✨ Generador de Hotspots (Puntos de Pesca)
    const HOTSPOTS = useMemo(() => {
        const spots = [];
        // Malla de búsqueda para hotspots deterministas
        for (let lon = -175; lon < 180; lon += 8) {
            for (let lat = -85; lat < 90; lat += 8) {
                const seed = getStableSeed(lon, lat);
                if (seed > 0.85) { // ~15% de las zonas son hotspots (Aumentado para facilitar hallazgos)
                    spots.push({ id: `hs-${lon}-${lat}`, coords: [lon, lat], seed });
                }
            }
        }
        return spots;
    }, []);

    const svgRef = useRef(null);
    const groupRef = useRef(null);
    const lastUpdateTime = useRef(0);

    // Desbloquear Sello al Visitar Monumento
    const handleUnlockStamp = (monument) => {
        if (!monument) return;

        setCollectedStamps(prev => {
            const exists = prev.some(stamp => stamp.name === monument.name);
            if (exists) return prev;

            // 🎊 Trigger Cinematic
            setDiscoveryNotification({ item: monument, type: 'monument' });

            const newStamp = {
                name: monument.name,
                date: new Date().toLocaleDateString(),
                type: monument.type,
                image: monument.image,
                coords: monument.coords
            };

            const updatedStamps = [...prev, newStamp];
            localStorage.setItem('bot_adventure_stamps', JSON.stringify(updatedStamps));
            return updatedStamps;
        });
    };

    const handleRandomDrop = (isLand, data) => {
        // 🎣 Lógica de "Pesca": 
        // Si hay un hotspot cerca, la probabilidad es mayor (40%)
        // Si no, es muy baja (2%)
        const isNearHotspot = HOTSPOTS.some(h =>
            Math.abs(h.coords[0] - data.coords[0]) < 2 &&
            Math.abs(h.coords[1] - data.coords[1]) < 2
        );


        const dropProbability = isNearHotspot ? 0.35 : 0.05;

        if (Math.random() > dropProbability) {
            // "Nada picó": Si es un hotspot, damos feedback educativo
            if (isNearHotspot) {
                setFlashMsg("¡Casi! Una especie se escondió... Sigue buscando en los brillos ✨");
                setTimeout(() => setFlashMsg(null), 3000);
            }
            return;
        }

        const speciesList = isLand ?
            BIODIVERSITY_DATA.filter(s => s.habitat !== "Océanos tropicales" && s.habitat !== "Cuencas del Amazonas y Orinoco" || s.id === "jaguar") :
            BIODIVERSITY_DATA.filter(s => s.habitat === "Océanos tropicales" || s.habitat === "Cuencas del Amazonas y Orinoco");

        const drop = speciesList[Math.floor(Math.random() * speciesList.length)];

        setCollectedSpecies(prev => {
            if (prev.some(s => s.name === drop.name)) return prev;

            // 🎊 Trigger Cinematic
            setDiscoveryNotification({ item: drop, type: 'species' });

            const updated = [...prev, drop];
            localStorage.setItem('bot_biodiversity_album', JSON.stringify(updated));
            return updated;
        });
    };
    // Sincronización de Zoom
    const currentZoom = externalZoom || internalZoom;

    // Motor de Detección con Fallback Inteligente y Precios Dinámicos
    const getCellData = (coords, isLand) => {
        const lon = Math.floor(coords[0] / GRID_STEP) * GRID_STEP + GRID_STEP / 2;
        const lat = Math.floor(coords[1] / GRID_STEP) * GRID_STEP + GRID_STEP / 2;
        const cellId = `BoT-PX-${Math.floor(lon)}-${Math.floor(lat)}`;

        let zoneData = null;
        for (const zone in ZONE_INTELLIGENCE) {
            const z = ZONE_INTELLIGENCE[zone];
            if (lon >= z.coords.lon[0] && lon <= z.coords.lon[1] && lat >= z.coords.lat[0] && lat <= z.coords.lat[1]) {
                zoneData = z;
                break;
            }
        }

        if (!zoneData) {
            zoneData = getProceduralBiome(lon, lat, isLand);
        }

        // Lógica de Precios Exponenciales por Tier (DETERMINISTA)
        const seed = getStableSeed(lon, lat);
        const tierMultiplier = zoneData.tier?.multiplier || 1.0;
        const marketVolatility = Math.floor(seed * 30) - 15;
        const finalPrice = Math.round((zoneData.basePrice * tierMultiplier) + marketVolatility);

        return {
            id: cellId,
            coords: [lon, lat],
            type: isLand ? 'land' : 'water',
            label: zoneData.name,
            color: zoneData.tier?.level === 1 ? '#fbbf24' : (isLand ? '#10b981' : '#3b82f6'),
            price: finalPrice,
            impactLevel: zoneData.tier?.level === 1 ? 'Máximo' : 'Normal',
            zone: zoneData,
            tier: zoneData.tier,
            live: !!zoneData.liveTag
        };
    };

    const handleInteraction = (e, projection, isLand, isClick = false) => {
        // Throttle para evitar lag (solo en hover, no en clicks)
        const now = Date.now();
        if (!isClick && now - lastUpdateTime.current < 100) return;
        lastUpdateTime.current = now;

        if (!groupRef.current || !svgRef.current) return;
        try {
            const svg = svgRef.current;
            const ctm = groupRef.current.getScreenCTM();
            if (!ctm) return;

            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;

            const localPoint = pt.matrixTransform(ctm.inverse());
            const coords = projection.invert([localPoint.x, localPoint.y]);

            if (coords) {
                const data = getCellData(coords, isLand);

                if (isClick && data) {
                    // 🎲 Posibilidad de encontrar especie (Ahora inyectamos data para hotspots)
                    handleRandomDrop(isLand, data);

                    // 🖱 Lógica de Selección Múltiple
                    setSelectedCells(prev => {
                        const exists = prev.find(p => p.id === data.id);
                        if (exists) {
                            // Si ya existe, lo quitamos (Toggle)
                            return prev.filter(p => p.id !== data.id);
                        } else {
                            // Si no existe, lo agregamos
                            // Limite opcional: Max 20 celdas para evitar crash
                            if (prev.length >= 20) return prev;
                            return [...prev, data];
                        }
                    });
                } else {
                    setHoveredData(data);
                }
            }
        } catch (err) {
            // Silent catch to prevent UI crash on rapid zoom/render
            console.debug("Interaction matrix stabilizing...");
        }
    };

    const currentScale = isFullscreen ? 450 : 200;
    const pixelSize = (currentScale * Math.PI) / 180;

    return (
        <div className={`relative transition-all duration-700 ease-in-out ${isFullscreen ? 'fixed inset-0 z-[200] bg-[#020202]' : 'py-12 bg-[#050505] rounded-[3rem] overflow-hidden'}`}>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="h-full w-full relative z-10 flex flex-col">

                {/* HUD Táctico Precision */}
                <AnimatePresence>
                    {isFullscreen && (
                        <motion.div
                            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
                            className="absolute top-0 inset-x-0 p-8 flex justify-between items-start z-[250] pointer-events-none"
                        >
                            <div className="flex flex-col gap-4 pointer-events-auto">
                                <div className="bg-black/95 backdrop-blur-3xl border border-white/10 p-6 rounded-3xl flex flex-col gap-2 shadow-[0_30px_60px_rgba(0,0,0,1)] min-w-[320px]">
                                    <div className="flex justify-between items-center text-[7px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-1">
                                        <span>Bio-Synchronized Radar</span>
                                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> STABLE</div>
                                    </div>
                                    <div className="text-sm font-mono text-white flex gap-6 italic border-b border-white/5 pb-2">
                                        <span className="flex items-center gap-2">LON: {hoveredData?.coords[0].toFixed(2) || '0.00'}</span>
                                        <span className="flex items-center gap-2">LAT: {hoveredData?.coords[1].toFixed(2) || '0.00'}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">{hoveredData?.id || 'Scanning...'}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1.5">
                                                <Zap size={10} fill="currentColor" /> {collectedSpecies.length} / {BIODIVERSITY_DATA.length}
                                            </div>
                                            <div className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Z: x{currentZoom.toFixed(1)}</div>
                                        </div>
                                    </div>
                                </div>

                                {hoveredData?.zone && (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                        className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-3xl backdrop-blur-3xl flex items-center gap-4 border-dashed"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">{hoveredData.zone.icon}</div>
                                        <div>
                                            <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Hotspot Detected</div>
                                            <div className="text-xs font-black text-white uppercase italic">{hoveredData.zone.name}</div>
                                            <div className="text-[9px] font-bold text-white/50 italic leading-none pt-1">Valuación: ${hoveredData.price} USD</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                            <button onClick={() => setIsFullscreen(false)} className="pointer-events-auto p-5 bg-white/5 hover:bg-emerald-500/10 rounded-3xl backdrop-blur-3xl border border-white/10 transition-all text-white shadow-2xl group flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Cerrar</span>
                                <Maximize2 size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* VISUALIZER CORE: Stabile Interaction Layer */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center cursor-crosshair" style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #0c1838 50%, #0a0e27 100%)' }}>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: currentScale }}
                        className="w-full h-full relative z-10"
                        ref={svgRef}
                    >
                        <defs>
                            <radialGradient id="sparkleGradient">
                                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <ZoomableGroup
                            center={[0, 0]}
                            zoom={currentZoom}
                            minZoom={0.5}
                            maxZoom={12}
                            onMoveEnd={({ zoom }) => setInternalZoom(zoom)}
                        >
                            <g ref={groupRef}>
                                <Graticule stroke="rgba(34,197,94,0.15)" strokeWidth={0.4 / currentZoom} strokeDasharray="2,2" step={[GRID_STEP, GRID_STEP]} />

                                {/* ⚡️ OPTIMIZACIÓN CRÍTICA: Desacoplamiento de Zoom */}
                                {useMemo(() => (
                                    <>
                                        <Geographies geography={geoUrl}>
                                            {({ geographies, projection }) => (
                                                <>
                                                    <rect
                                                        x="-2000" y="-2000" width="4000" height="4000" fill="transparent"
                                                        onMouseMove={(e) => handleInteraction(e, projection, false)}
                                                        onClick={(e) => handleInteraction(e, projection, false, true)}
                                                    />
                                                    {geographies.map((geo) => {
                                                        const centroid = projection(geo.geometry.coordinates[0][0]);
                                                        const lat = centroid ? projection.invert(centroid)[1] : 0;
                                                        const absLat = Math.abs(lat);

                                                        let geoColor = "rgba(34, 197, 94, 0.4)";
                                                        if (absLat > 65) geoColor = "rgba(224, 242, 254, 0.9)";
                                                        else if (absLat > 45) geoColor = "rgba(16, 185, 129, 0.7)";
                                                        else if (absLat < 15) geoColor = "rgba(34, 197, 94, 0.85)";
                                                        else if (absLat < 25) geoColor = "rgba(132, 204, 22, 0.7)";
                                                        else if (absLat > 25 && absLat < 35) geoColor = "rgba(245, 158, 11, 0.6)";

                                                        return (
                                                            <Geography
                                                                key={geo.rsmKey} geography={geo}
                                                                fill={viewMode === 'biologic' ? geoColor : "rgba(34, 197, 94, 0.08)"}
                                                                stroke="rgba(34, 197, 94, 0.5)"
                                                                strokeWidth={1}
                                                                onMouseMove={(e) => { handleInteraction(e, projection, true); e.stopPropagation(); }}
                                                                onClick={(e) => { handleInteraction(e, projection, true, true); e.stopPropagation(); }}
                                                                style={{
                                                                    default: { outline: "none", vectorEffect: "non-scaling-stroke" },
                                                                    hover: { fill: "rgba(34, 197, 94, 0.6)", outline: "none", vectorEffect: "non-scaling-stroke" },
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </>
                                            )}
                                        </Geographies>

                                        {/* 🗿 MONUMENTOS CULTURALES */}
                                        {viewMode === 'biologic' && CULTURAL_MONUMENTS.map((monument, idx) => (
                                            <Marker
                                                key={`monument-${idx}`}
                                                coordinates={monument.coords}
                                                onClick={() => {
                                                    setSelectedMonument(monument);
                                                    setIsMonumentModalOpen(true);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <ellipse cy={monument.size * 0.4} rx={monument.size * 0.4} ry={monument.size * 0.15} fill="#000" opacity="0.3" />
                                                <g className="hover:scale-110 transition-transform duration-300">
                                                    {getCulturalIcon(monument.type, 0, 0, monument.size)}
                                                </g>
                                            </Marker>
                                        ))}

                                        {/* 🌳 ICONOS DE BIOMA BASE (LOD: Zoom > 1.3) */}
                                        {viewMode === 'biologic' && currentZoom > 1.3 && BIOME_ICONS.map((icon, idx) => (
                                            <Marker key={`biome-${idx}`} coordinates={icon.coords}>
                                                <g>
                                                    {getBiomeIconComponent(icon.type, 0, 0, icon.size)}
                                                </g>
                                            </Marker>
                                        ))}

                                        {/* ✨ DESTELLOS DE BIODIVERSIDAD (Hotspots) - LOD: Zoom > 1.8 */}
                                        {viewMode === 'biologic' && currentZoom > 1.8 && HOTSPOTS.map((hs) => (
                                            <Marker key={hs.id} coordinates={hs.coords}>
                                                <g className="pointer-events-none">
                                                    <circle r={2 / currentZoom} fill="#fff" className="animate-pulse">
                                                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                                                    </circle>
                                                    <path
                                                        d={`M 0 -${4 / currentZoom} L 0 ${4 / currentZoom} M -${4 / currentZoom} 0 L ${4 / currentZoom} 0`}
                                                        stroke="#fff"
                                                        strokeWidth={0.5 / currentZoom}
                                                        opacity="0.8"
                                                        className="animate-spin-slow"
                                                    />
                                                    <circle r={6 / currentZoom} fill="url(#sparkleGradient)" opacity="0.4" />
                                                </g>
                                            </Marker>
                                        ))}
                                    </>
                                ), [viewMode])}  {/* ⚡️ Desacoplado de currentZoom para evitar freeze */}

                                {/* 🌊 CAPA DE EFECTOS DINÁMICOS (LOD: Zoom > 2) */}
                                {viewMode === 'biologic' && currentZoom > 2.0 && (
                                    <g style={{ opacity: internalZoom > 8 ? 0.3 : 1 }}>
                                        <BiomeParticles biomeType="océano" />
                                        <BiomeParticles biomeType="selva tropical" />
                                        <BiomeParticles biomeType="tundra" />
                                    </g>
                                )}

                                {/* 🔥 INTERACTIVE LAYER: Solo esto se re-renderiza con hover */}
                                {/* 🔗 LÍNEAS DE CONEXIÓN (Corredores Biológicos) */}
                                {selectedCells.length > 1 && selectedCells.map((cell, i) => {
                                    return selectedCells.slice(i + 1).map((other) => {
                                        const dx = (cell.coords[0] - other.coords[0]) / GRID_STEP;
                                        const dy = (cell.coords[1] - other.coords[1]) / GRID_STEP;
                                        const distance = Math.sqrt(dx * dx + dy * dy);

                                        if (distance <= 1.5) { // Umbral de adyacencia
                                            return (
                                                <line
                                                    key={`link-${cell.id}-${other.id}`}
                                                    x1={cell.coords[0]} y1={cell.coords[1]}
                                                    x2={other.coords[0]} y2={other.coords[1]}
                                                    stroke="#10b981"
                                                    strokeWidth={0.5 / currentZoom}
                                                    strokeDasharray="1,1"
                                                    className="animate-pulse"
                                                    opacity="0.6"
                                                />
                                            );
                                        }
                                        return null;
                                    });
                                })}

                                {/* ✅ CELDAS SELECCIONADAS (Selección Múltiple) */}
                                {selectedCells.map((cell) => (
                                    <Marker key={cell.id} coordinates={cell.coords}>
                                        <g>
                                            <rect
                                                x={-pixelSize / 2} y={-pixelSize / 2} width={pixelSize} height={pixelSize}
                                                fill={cell.color}
                                                className="opacity-50"
                                            />
                                            <rect
                                                x={-pixelSize / 2} y={-pixelSize / 2}
                                                width={pixelSize} height={pixelSize}
                                                fill="none"
                                                stroke="#ef4444" // Rojo vibrante para selección
                                                strokeWidth={1.5 / currentZoom}
                                                strokeDasharray="1,1" // Borde punteado estilo selección
                                            />
                                            {/* Indicador de Número */}
                                            {selectedCells.length > 1 && (
                                                <text
                                                    textAnchor="middle"
                                                    y={pixelSize * 0.2}
                                                    style={{ fontSize: pixelSize * 0.6, fill: 'white', fontWeight: 'bold' }}
                                                >
                                                    {selectedCells.indexOf(cell) + 1}
                                                </text>
                                            )}
                                        </g>
                                    </Marker>
                                ))}

                                {hoveredData && (
                                    <Marker coordinates={hoveredData.coords}>
                                        <g className="pointer-events-none">
                                            <rect
                                                x={-pixelSize / 2} y={-pixelSize / 2} width={pixelSize} height={pixelSize}
                                                fill={hoveredData.tier?.level === 1 ? "#fbbf24" :
                                                    hoveredData.tier?.level === 2 ? "#a855f7" :
                                                        hoveredData.tier?.level === 3 ? "#10b981" : hoveredData.color}
                                                className="opacity-60 animate-pulse"
                                                style={{
                                                    filter: hoveredData.tier?.level === 1 ? `blur(8px) drop-shadow(0 0 15px #fbbf24) brightness(1.3)` :
                                                        hoveredData.tier?.level === 2 ? `blur(6px) drop-shadow(0 0 12px #a855f7) brightness(1.2)` :
                                                            hoveredData.tier?.level === 3 ? `blur(5px) drop-shadow(0 0 8px #10b981) brightness(1.1)` :
                                                                `blur(5px) drop-shadow(0 0 8px ${hoveredData.color})`
                                                }}
                                            />
                                            {/* Borde brillante */}
                                            <rect
                                                x={-pixelSize / 2} y={-pixelSize / 2}
                                                width={pixelSize} height={pixelSize}
                                                fill="none"
                                                stroke={hoveredData.tier?.level === 1 ? "#fbbf24" : "#fff"}
                                                strokeWidth={0.8 / currentZoom}
                                                className="opacity-90"
                                                style={{ filter: hoveredData.tier?.level === 1 ? 'drop-shadow(0 0 4px #fbbf24)' : 'none' }}
                                            />
                                            {/* Smart Hover Label - Ultra Compact Version */}
                                            <foreignObject x={pixelSize / 2 + 3} y={-30} width={110} height={60}>
                                                <div
                                                    className="p-2 rounded-xl shadow-xl backdrop-blur-3xl flex flex-col gap-0.5 transform scale-[0.6] origin-left"
                                                    style={{
                                                        background: hoveredData.tier?.level === 1 ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(217, 119, 6, 0.2))' :
                                                            hoveredData.tier?.level === 2 ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.2))' :
                                                                'linear-gradient(135deg, rgba(0, 0, 0, 0.98), rgba(10, 14, 39, 0.98))',
                                                        border: hoveredData.tier?.level === 1 ? '1px solid rgba(251, 191, 36, 0.4)' :
                                                            hoveredData.tier?.level === 2 ? '1px solid rgba(168, 85, 247, 0.4)' :
                                                                '1px solid rgba(255, 255, 255, 0.15)',
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center text-[5px] font-black uppercase tracking-widest border-b pb-0.5"
                                                        style={{
                                                            color: hoveredData.tier?.level === 1 ? '#fbbf24' :
                                                                hoveredData.tier?.level === 2 ? '#a855f7' : '#22c55e',
                                                            borderColor: 'rgba(255, 255, 255, 0.08)'
                                                        }}
                                                    >
                                                        <span>{hoveredData.tier?.name || "GRID"}</span>
                                                        <Zap size={6} fill="currentColor" />
                                                    </div>

                                                    <div className="text-[9px] font-black text-white uppercase truncate leading-none mt-1">
                                                        {hoveredData.label?.split(':')[0]}
                                                    </div>

                                                    <div className="flex items-center justify-between mt-0.5">
                                                        <span className="text-[8px] font-black text-white/90">${hoveredData.price}</span>
                                                        <span className="text-[5px] text-white/30 uppercase font-bold">{hoveredData.id.split('-').pop()}</span>
                                                    </div>
                                                </div>
                                            </foreignObject>
                                        </g>
                                    </Marker>
                                )}
                            </g>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>

                {/* Dashboard integral inmersivo */}
                {isFullscreen && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[24rem] z-[250] pointer-events-none space-y-8">
                        {/* Botón del Pasaporte - Flotante y Destacado */}
                        <div className="pointer-events-auto flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsPassportOpen(true)}
                                className="bg-[#1a1b1e] border border-[#2e2f33] p-4 rounded-2xl shadow-xl flex items-center gap-3 group hover:border-emerald-500/50 transition-colors"
                            >
                                <div className="relative">
                                    <Book className="text-emerald-400" size={24} />
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                                        {collectedStamps.length}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-black text-white leading-none">Mi Pasaporte</div>
                                    <div className="text-[9px] font-medium text-gray-500 group-hover:text-emerald-500/80 transition-colors">Ver Colección</div>
                                </div>
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                            className="bg-black/95 backdrop-blur-3xl border border-white/10 p-10 rounded-[4.5rem] pointer-events-auto shadow-[0_50px_100px_rgba(0,0,0,1)] space-y-8"
                        >
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.8] flex flex-col">
                                    <span className="text-white opacity-40 italic">ECOSISTEMA</span>
                                    <span className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">DIGITAL.</span>
                                </h2>
                                <p className="text-gray-400 font-bold leading-relaxed text-[10px] uppercase tracking-widest opacity-60">
                                    Acceso a beneficios y experiencias exclusivas impulsadas por el $BoT.
                                </p>
                            </div>

                            {/* 🛒 SELECCIÓN MULTIPLE SUMMARY */}
                            {selectedCells.length > 0 ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-10 duration-500">
                                    <div className="p-10 bg-emerald-900/20 border border-emerald-500/30 rounded-[3.5rem] space-y-3 relative overflow-hidden backdrop-blur-3xl shadow-xl">

                                        {(() => {
                                            const bonusData = calculateAdjacencyBonus(selectedCells, GRID_STEP);

                                            return (
                                                <>
                                                    <div className="flex justify-between items-center text-[10px] font-black text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                                                        <span>Carrito Activo</span>
                                                        <span>{selectedCells.length} Items</span>
                                                    </div>
                                                    <div className="space-y-1 max-h-[100px] overflow-y-auto custom-scrollbar">
                                                        {selectedCells.map((cell, i) => (
                                                            <div key={cell.id} className="flex justify-between text-[9px] text-gray-300">
                                                                <span>{i + 1}. {cell.label}</span>
                                                                <span>${cell.price}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* BONUS SECTION */}
                                                    {bonusData.discountPercent > 0 && (
                                                        <div className="mt-2 py-2 px-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Zap size={12} className="text-yellow-400 animate-pulse" />
                                                                <span className="text-[9px] font-black text-yellow-400 uppercase">{bonusData.bonusName}</span>
                                                            </div>
                                                            <div className="flex justify-between text-[9px] text-emerald-300">
                                                                <span>Bonus Conexión ({bonusData.connectedCount} cells)</span>
                                                                <span>-{bonusData.discountPercent * 100}% (-${bonusData.discountAmount})</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Total Calculation */}
                                                    <div className="pt-2 border-t border-emerald-500/20 flex justify-between items-center text-lg font-black text-white italic">
                                                        <span>TOTAL</span>
                                                        <div className="flex flex-col items-end leading-none">
                                                            {bonusData.discountPercent > 0 && (
                                                                <span className="text-[10px] text-gray-500 line-through">${bonusData.finalPrice + bonusData.discountAmount}</span>
                                                            )}
                                                            <span>${bonusData.finalPrice}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}

                                    </div>

                                    <button className="w-full py-9 bg-emerald-500 text-white rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] hover:bg-emerald-600 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-4">
                                        PROCESAR ORDEN <Zap size={18} />
                                    </button>
                                </div>
                            ) : hoveredData?.zone ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-10 duration-500">
                                    <div className="p-10 bg-black/50 border border-emerald-500/20 rounded-[3.5rem] space-y-5 relative overflow-hidden backdrop-blur-3xl shadow-xl">
                                        <div className="absolute -right-4 -top-4 opacity-5 rotate-12 shrink-0">{hoveredData.zone.icon || <Trees />}</div>
                                        <div className="flex justify-between items-center text-[9px] font-black text-emerald-500 uppercase tracking-widest"><span>Salud Géo</span><span>{hoveredData.zone.health}%</span></div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${hoveredData.zone.health}%` }} />
                                        </div>
                                        <div className="pt-2">
                                            <div className="text-[11px] font-black text-white uppercase italic">{hoveredData.zone.status || "Estable"}</div>
                                            <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic pt-1">{hoveredData.zone.funFact}</p>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] flex items-center justify-between group hover:bg-emerald-500/10 transition-all cursor-pointer pointer-events-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl"><DollarSign size={20} /></div>
                                            <div className="text-2xl font-black text-white italic tracking-tighter">${hoveredData.price} <span className="text-xs opacity-50">USD</span></div>
                                        </div>
                                        <Zap className="text-emerald-500 group-hover:scale-125 transition-transform" size={24} />
                                    </div>
                                    <button className="w-full py-9 bg-emerald-500 text-white rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] hover:bg-emerald-600 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-4">
                                        AGREGAR AL LOTE <Zap size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="p-12 bg-white/5 border border-white/10 rounded-[4rem] text-center space-y-6">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Radio className="text-emerald-500 animate-pulse" size={40} /></div>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed px-4">Plataforma de usabilidad $BoT. Conéctate con experiencias y beneficios de biomas estratégicos.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Enhanced Modal with Gallery + Live Stream */}
            <EnhancedBiomeModal
                selectedCell={selectedCells.length > 0 ? selectedCells[selectedCells.length - 1] : null}
                onClose={() => setSelectedCells([])}
            />

            {/* 🗿 MODAL EDUCATIVO DE MONUMENTOS - Con Trigger de Sellos */}
            <MonumentModal
                monument={selectedMonument}
                isOpen={isMonumentModalOpen}
                onClose={() => setIsMonumentModalOpen(false)}
                onVisit={handleUnlockStamp}
            />

            {/* 🛂 PASAPORTE DE AVENTURAS */}
            <AdventurePassport
                isOpen={isPassportOpen}
                onClose={() => setIsPassportOpen(false)}
                collectedStamps={collectedStamps}
                collectedSpecies={collectedSpecies}
            />

            {/* 🛂 HUD DE EXPLORADOR */}
            <ExplorerHUD
                collectedStampsCount={collectedStamps.length}
                collectedSpeciesCount={collectedSpecies.length}
                onOpenPassport={() => setIsPassportOpen(true)}
            />

            {/* ⚡ FLASH NOTIFICATION (Near Miss) */}
            <AnimatePresence>
                {flashMsg && <FlashNotification message={flashMsg} />}
            </AnimatePresence>

            {/* 🎊 DISCOVERY CINEMATIC (Stamping Effect) */}
            <AnimatePresence>
                {discoveryNotification && (
                    <DiscoveryCinematic
                        item={discoveryNotification.item}
                        type={discoveryNotification.type}
                        onClose={() => setDiscoveryNotification(null)}
                    />
                )}
            </AnimatePresence>

            <style>{`
                @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-pulse-slow { animation: pulse-slow 8s infinite; }
                .animate-spin-slow { animation: spin-slow 12s linear infinite; }

                /* 🐟 Animación de Nado (Peces) */
                @keyframes swim {
                    0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
                    25% { transform: translateX(3px) translateY(-1px) rotate(2deg); }
                    50% { transform: translateX(0) translateY(0) rotate(0deg); }
                    75% { transform: translateX(-3px) translateY(1px) rotate(-2deg); }
                }

                /* 🌊 Animación de Flote (Barcos, boyas, elementos marinos) */
                @keyframes float-water {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                }

                /* 🦅 Animación de Vuelo (Pájaros) */
                @keyframes fly {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-3px) translateX(2px); }
                }

                .animate-swim { animation: swim 4s ease-in-out infinite; }
                .animate-float { animation: float-water 3s ease-in-out infinite; }
                .animate-fly { animation: fly 5s ease-in-out infinite; }
            `}</style>
        </div >
    );
};

export default LifeMap;
