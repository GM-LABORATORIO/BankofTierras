import React from 'react';

/**
 * 🎨 Iconos de Bioma en SVG Puro
 * Sin foreignObject para evitar errores de React
 */

// 🌳 Árbol para Selvas
export const TreeIconSVG = ({ x = 0, y = 0, size = 8, color = "#22c55e" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Copa del árbol */}
        <circle cx="0" cy="-3" r={size * 0.5} fill={color} opacity="0.9" />
        {/* Tronco */}
        <rect x={-size * 0.15} y="-1" width={size * 0.3} height={size * 0.6} fill="#78350f" opacity="0.95" />
    </g>
);

// 🏔️ Montaña para Andes
export const MountainIconSVG = ({ x = 0, y = 0, size = 8, color = "#94a3b8" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Montaña */}
        <path
            d={`M0,${size * 0.3} L${-size * 0.5},${-size * 0.3} L${size * 0.5},${-size * 0.3} Z`}
            fill={color}
            opacity="0.9"
        />
        {/* Nieve en la cima */}
        <path
            d={`M0,${size * 0.3} L${-size * 0.25},${-size * 0.1} L${size * 0.25},${-size * 0.1} Z`}
            fill="#e0f2fe"
            opacity="0.95"
        />
    </g>
);

// 🐠 Pez para Océanos
export const FishIconSVG = ({ x = 0, y = 0, size = 6, color = "#06b6d4" }) => (
    <g transform={`translate(${x}, ${y})`} className="animate-swim">
        {/* Cuerpo */}
        <ellipse cx="0" cy="0" rx={size * 0.6} ry={size * 0.4} fill={color} opacity="0.9" />
        {/* Cola */}
        <path
            d={`M${-size * 0.6},0 L${-size * 0.9},${-size * 0.3} L${-size * 0.9},${size * 0.3} Z`}
            fill={color}
            opacity="0.85"
        />
        {/* Ojo */}
        <circle cx={size * 0.3} cy={-size * 0.1} r={size * 0.1} fill="#000" />
    </g>
);

// 🌵 Cactus para Desiertos
export const CactusIconSVG = ({ x = 0, y = 0, size = 8, color = "#84cc16" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Tronco principal */}
        <rect x={-size * 0.15} y={-size * 0.4} width={size * 0.3} height={size * 0.8} rx={size * 0.1} fill={color} />
        {/* Brazo izquierdo */}
        <rect x={-size * 0.45} y={-size * 0.1} width={size * 0.2} height={size * 0.4} rx={size * 0.08} fill={color} opacity="0.9" />
        {/* Brazo derecho */}
        <rect x={size * 0.25} y={-size * 0.2} width={size * 0.2} height={size * 0.5} rx={size * 0.08} fill={color} opacity="0.9" />
    </g>
);

// 🌲 Pino para Taiga
export const PineIconSVG = ({ x = 0, y = 0, size = 8, color = "#059669" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Copa triangular */}
        <path
            d={`M0,${-size * 0.5} L${-size * 0.4},${size * 0.1} L${size * 0.4},${size * 0.1} Z`}
            fill={color}
            opacity="0.9"
        />
        <path
            d={`M0,${-size * 0.3} L${-size * 0.35},${size * 0.25} L${size * 0.35},${size * 0.25} Z`}
            fill={color}
            opacity="0.85"
        />
        {/* Tronco */}
        <rect x={-size * 0.1} y={size * 0.2} width={size * 0.2} height={size * 0.3} fill="#78350f" />
    </g>
);

// ❄️ Copo de Nieve para Polos
export const SnowflakeIconSVG = ({ x = 0, y = 0, size = 6, color = "#e0f2fe" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Cruz principal */}
        <line x1="0" y1={-size * 0.5} x2="0" y2={size * 0.5} stroke={color} strokeWidth="0.5" opacity="0.9" />
        <line x1={-size * 0.5} y1="0" x2={size * 0.5} y2="0" stroke={color} strokeWidth="0.5" opacity="0.9" />
        {/* Diagonales */}
        <line x1={-size * 0.35} y1={-size * 0.35} x2={size * 0.35} y2={size * 0.35} stroke={color} strokeWidth="0.5" opacity="0.8" />
        <line x1={-size * 0.35} y1={size * 0.35} x2={size * 0.35} y2={-size * 0.35} stroke={color} strokeWidth="0.5" opacity="0.8" />
    </g>
);

// 🐚 Coral para Arrecifes
export const CoralIconSVG = ({ x = 0, y = 0, size = 6, color = "#ec4899" }) => (
    <g transform={`translate(${x}, ${y})`} className="animate-float">
        {/* Ramas de coral */}
        <circle cx={-size * 0.2} cy={-size * 0.2} r={size * 0.25} fill={color} opacity="0.9" />
        <circle cx={size * 0.2} cy={-size * 0.2} r={size * 0.25} fill={color} opacity="0.9" />
        <circle cx="0" cy={size * 0.1} r={size * 0.3} fill={color} opacity="0.95" />
    </g>
);

// 🌾 Pasto para Praderas
export const GrassIconSVG = ({ x = 0, y = 0, size = 6, color = "#84cc16" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Hojas de pasto */}
        <path d={`M${-size * 0.3},${size * 0.3} Q${-size * 0.3},${-size * 0.3} ${-size * 0.2},${-size * 0.4}`} stroke={color} strokeWidth="0.8" fill="none" opacity="0.7" />
        <path d={`M0,${size * 0.3} Q0,${-size * 0.4} ${size * 0.1},${-size * 0.5}`} stroke={color} strokeWidth="0.8" fill="none" opacity="0.8" />
        <path d={`M${size * 0.3},${size * 0.3} Q${size * 0.3},${-size * 0.3} ${size * 0.2},${-size * 0.4}`} stroke={color} strokeWidth="0.8" fill="none" opacity="0.7" />
    </g>
);

/**
 * Función para obtener el icono apropiado según el bioma
 */
export const getBiomeIconComponent = (biomeName, x, y, size = 8) => {
    const name = biomeName?.toLowerCase() || '';

    if (name.includes('selva') || name.includes('amazonía') || name.includes('tropical')) {
        return <TreeIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size} color="#22c55e" />;
    }
    if (name.includes('andes') || name.includes('montaña') || name.includes('nevado')) {
        return <MountainIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size} color="#94a3b8" />;
    }
    if (name.includes('océano') || name.includes('marino') || name.includes('abismo')) {
        return <FishIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size * 0.8} color="#06b6d4" />;
    }
    if (name.includes('desierto') || name.includes('árido')) {
        return <CactusIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size} color="#84cc16" />;
    }
    if (name.includes('taiga') || name.includes('boreal') || name.includes('bosque')) {
        return <PineIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size} color="#059669" />;
    }
    if (name.includes('arrecife') || name.includes('coral')) {
        return <CoralIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size * 0.8} color="#ec4899" />;
    }
    if (name.includes('tundra') || name.includes('permafrost') || name.includes('polo')) {
        return <SnowflakeIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size * 0.8} color="#e0f2fe" />;
    }
    if (name.includes('pradera') || name.includes('pampa')) {
        return <GrassIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size * 0.8} color="#84cc16" />;
    }

    // Default: árbol genérico
    return <TreeIconSVG key={`icon-${x}-${y}`} x={x} y={y} size={size} color="#10b981" />;
};

export default {
    TreeIconSVG,
    MountainIconSVG,
    FishIconSVG,
    CactusIconSVG,
    PineIconSVG,
    SnowflakeIconSVG,
    CoralIconSVG,
    GrassIconSVG,
    getBiomeIconComponent
};
