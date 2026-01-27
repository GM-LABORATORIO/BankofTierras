import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Graticule } from "react-simple-maps";
import { Play, Heart, Shield, Radio, MapPin, Zap, Info, X, Camera, Droplets, Trees, Search, ExternalLink, Users, Globe, TrendingUp, DollarSign, Lock, Maximize2, Minimize2, Settings, List, Activity, Anchor, Bird, Wind, CloudSun, ShieldAlert, Mountain, Palmtree, Waves, Book } from 'lucide-react';
import { GLOBAL_BIOMES, detectBiomeByLocation } from '../data/globalBiomes';
import EnhancedBiomeModal from './EnhancedBiomeModal';
import BiomeParticles from './BiomeParticles';
import { getBiomeIconComponent } from './BiomeIconsSVG';
import { getCulturalIcon } from './CulturalIcons';
import { CULTURAL_MONUMENTS, BIOME_ICONS } from '../data/monumentsData';
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

const LifeMap = ({ onDiscovery, isFullscreenDefault = false, zoom: externalZoom }) => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [hoveredData, setHoveredData] = useState(null);
    const [internalZoom, setInternalZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(isFullscreenDefault);
    const [viewMode, setViewMode] = useState('biologic');
    const [selectedMonument, setSelectedMonument] = useState(null);
    const [isMonumentModalOpen, setIsMonumentModalOpen] = useState(false);

    // 🛂 Adventure Passport State
    const [isPassportOpen, setIsPassportOpen] = useState(false);
    const [collectedStamps, setCollectedStamps] = useState([]);

    const svgRef = useRef(null);
    const groupRef = useRef(null);
    const lastUpdateTime = useRef(0);

    // Cargar sellos del localStorage al montar
    useEffect(() => {
        const savedStamps = localStorage.getItem('bot_adventure_stamps');
        if (savedStamps) {
            setCollectedStamps(JSON.parse(savedStamps));
        }
    }, []);

    // Desbloquear Sello al Visitar Monumento
    const handleUnlockStamp = (monument) => {
        if (!monument) return;

        setCollectedStamps(prev => {
            const exists = prev.some(stamp => stamp.name === monument.name);
            if (exists) return prev;

            const newStamp = {
                name: monument.name,
                date: new Date().toLocaleDateString(),
                type: monument.type,
                // Guardamos solo datos serializables. El icono se genera en el UI del pasaporte.
            };

            const updatedStamps = [...prev, newStamp];
            localStorage.setItem('bot_adventure_stamps', JSON.stringify(updatedStamps));
            return updatedStamps;
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
            roi: zoneData.tier?.level === 1 ? '25%' : '12%',
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
                setHoveredData(data);
                if (isClick && data) setSelectedCell(data);
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
                                        <div className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Z: x{currentZoom.toFixed(1)}</div>
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
                        <ZoomableGroup
                            center={[0, 0]}
                            zoom={currentZoom}
                            minZoom={0.5}
                            maxZoom={12}
                            onMoveEnd={({ zoom }) => setInternalZoom(zoom)}
                        >
                            <g ref={groupRef}>
                                <Graticule stroke="rgba(34,197,94,0.15)" strokeWidth={0.4 / currentZoom} strokeDasharray="2,2" step={[GRID_STEP, GRID_STEP]} />

                                {/* ⚡️ OPTIMIZACIÓN: Memoización de Capas Estáticas */}
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
                                                                stroke="rgba(34, 197, 94, 0.5)" strokeWidth={0.8 / currentZoom}
                                                                onMouseMove={(e) => { handleInteraction(e, projection, true); e.stopPropagation(); }}
                                                                onClick={(e) => { handleInteraction(e, projection, true, true); e.stopPropagation(); }}
                                                                style={{
                                                                    default: { outline: "none" },
                                                                    hover: { fill: "rgba(34, 197, 94, 0.6)", outline: "none" },
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </>
                                            )}
                                        </Geographies>

                                        {/* 🌊 CAPA DE PARTÍCULAS (LOD: Zoom > 2) */}
                                        {viewMode === 'biologic' && currentZoom > 2 && (
                                            <>
                                                <BiomeParticles biomeType="océano" />
                                                <BiomeParticles biomeType="selva tropical" />
                                                <BiomeParticles biomeType="tundra" />
                                            </>
                                        )}

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

                                        {/* 🌳 ICONOS DE BIOMA (LOD: Zoom > 2.5) */}
                                        {viewMode === 'biologic' && currentZoom > 2.5 && BIOME_ICONS.map((icon, idx) => (
                                            <Marker key={`biome-${idx}`} coordinates={icon.coords}>
                                                <g>
                                                    {getBiomeIconComponent(icon.type, 0, 0, icon.size)}
                                                </g>
                                            </Marker>
                                        ))}
                                    </>
                                ), [currentZoom, viewMode])}  {/* ⚡️ Fin del bloque memorizado */}

                                {/* 🔥 INTERACTIVE LAYER: Solo esto se re-renderiza con hover */}
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
                                            <rect
                                                x={-pixelSize / 2} y={-pixelSize / 2}
                                                width={pixelSize} height={pixelSize}
                                                fill="none"
                                                stroke={hoveredData.tier?.level === 1 ? "#fbbf24" : "#fff"}
                                                strokeWidth={0.8 / currentZoom}
                                                className="opacity-90"
                                                style={{ filter: hoveredData.tier?.level === 1 ? 'drop-shadow(0 0 4px #fbbf24)' : 'none' }}
                                            />
                                            {/* Smart Hover Label */}
                                            <foreignObject x={pixelSize / 2 + 5} y={-45} width={180} height={100}>
                                                <div
                                                    className="p-4 rounded-2xl shadow-2xl backdrop-blur-3xl flex flex-col gap-1.5 transform scale-[0.6] origin-left"
                                                    style={{
                                                        background: hoveredData.tier?.level === 1 ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(217, 119, 6, 0.15))' :
                                                            hoveredData.tier?.level === 2 ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(147, 51, 234, 0.15))' :
                                                                'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(10, 14, 39, 0.95))',
                                                        border: hoveredData.tier?.level === 1 ? '1px solid rgba(251, 191, 36, 0.4)' :
                                                            hoveredData.tier?.level === 2 ? '1px solid rgba(168, 85, 247, 0.4)' :
                                                                '1px solid rgba(255, 255, 255, 0.2)',
                                                        boxShadow: hoveredData.tier?.level === 1 ? '0 0 20px rgba(251, 191, 36, 0.3)' :
                                                            hoveredData.tier?.level === 2 ? '0 0 15px rgba(168, 85, 247, 0.3)' :
                                                                '0 0 10px rgba(0, 0, 0, 0.5)'
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-[0.2em] border-b pb-1.5"
                                                        style={{
                                                            color: hoveredData.tier?.level === 1 ? '#fbbf24' :
                                                                hoveredData.tier?.level === 2 ? '#a855f7' : '#22c55e',
                                                            borderColor: 'rgba(255, 255, 255, 0.1)'
                                                        }}
                                                    >
                                                        <span>{hoveredData.tier?.name || "GRID NODE"}</span>
                                                        <Zap
                                                            size={10}
                                                            fill={hoveredData.tier?.level < 3 ? "currentColor" : "none"}
                                                            className={hoveredData.tier?.level === 1 ? "animate-pulse" : ""}
                                                        />
                                                    </div>
                                                    <div className="text-sm font-black text-white italic tracking-tighter"
                                                        style={{
                                                            color: hoveredData.tier?.level === 1 ? "#fbbf24" :
                                                                hoveredData.tier?.level === 2 ? "#a855f7" :
                                                                    (hoveredData.type === 'land' ? '#22c55e' : '#06b6d4')
                                                        }}
                                                    >
                                                        {hoveredData.label}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-[10px] font-black text-white italic leading-none">${hoveredData.price} USD</div>
                                                        {hoveredData.tier?.level === 1 && <span className="text-[6px] bg-yellow-400/30 text-yellow-400 px-1 rounded-sm font-black animate-pulse">ULTRA RARE</span>}
                                                        {hoveredData.tier?.level === 2 && <span className="text-[6px] bg-purple-400/30 text-purple-400 px-1 rounded-sm font-black">RARE</span>}
                                                    </div>
                                                    <div className="text-[9px] font-bold text-white/40">{hoveredData.id}</div>
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
                                    <span className="text-white opacity-40 italic">ECONOMÍA</span>
                                    <span className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">PLANETARIA.</span>
                                </h2>
                                <p className="text-gray-400 font-bold leading-relaxed text-[10px] uppercase tracking-widest opacity-60">
                                    Valuación en tiempo real basada en servicios ecosistémicos del $BoT.
                                </p>
                            </div>

                            {hoveredData?.zone ? (
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
                                </div>
                            ) : (
                                <div className="p-12 bg-white/5 border border-white/10 rounded-[4rem] text-center space-y-6">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Radio className="text-emerald-500 animate-pulse" size={40} /></div>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed px-4">Detectando coordenadas geodésicas... Evalua el valor de los m² terrestres.</p>
                                </div>
                            )}

                            <button className="w-full py-9 bg-emerald-500 text-white rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] hover:bg-emerald-600 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-4">
                                ADOPTAR AHORA <Zap size={18} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Enhanced Modal with Gallery + Live Stream */}
            <EnhancedBiomeModal
                selectedCell={selectedCell}
                onClose={() => setSelectedCell(null)}
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
            />

            <style>{`
                @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
                .animate-pulse-slow { animation: pulse-slow 8s infinite; }

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
        </div>
    );
};

export default LifeMap;
