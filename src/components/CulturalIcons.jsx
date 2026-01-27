import React from 'react';

/**
 * 🗿 Iconos de Monumentos Culturales e Históricos
 * Celebrando la belleza y diversidad del planeta
 */

// 🗼 Torre (Torre Eiffel, Big Ben)
export const TowerIcon = ({ x = 0, y = 0, size = 10, color = "#a8a29e" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Base */}
        <rect x={-size * 0.3} y={size * 0.3} width={size * 0.6} height={size * 0.15} fill={color} />
        {/* Cuerpo */}
        <path
            d={`M${-size * 0.25},${size * 0.3} L${-size * 0.1},${-size * 0.4} L${size * 0.1},${-size * 0.4} L${size * 0.25},${size * 0.3} Z`}
            fill={color}
        />
        {/* Punta */}
        <path
            d={`M${-size * 0.05},${-size * 0.4} L0,${-size * 0.6} L${size * 0.05},${-size * 0.4} Z`}
            fill={color}
        />
    </g>
);

// 🔺 Pirámide (Egipto, México)
export const PyramidIcon = ({ x = 0, y = 0, size = 12, color = "#d4a574" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Pirámide principal */}
        <path
            d={`M0,${-size * 0.5} L${-size * 0.5},${size * 0.3} L${size * 0.5},${size * 0.3} Z`}
            fill={color}
        />
        {/* Sombra lateral */}
        <path
            d={`M0,${-size * 0.5} L${size * 0.5},${size * 0.3} L0,${size * 0.3} Z`}
            fill="#000"
            opacity="0.2"
        />
    </g>
);

// 🏛️ Templo/Ruinas (Machu Picchu, Coliseo, Acrópolis)
export const TempleIcon = ({ x = 0, y = 0, size = 10, color = "#9ca3af" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Techo triangular */}
        <path
            d={`M${-size * 0.4},${-size * 0.2} L0,${-size * 0.5} L${size * 0.4},${-size * 0.2} Z`}
            fill={color}
        />
        {/* Columnas */}
        <rect x={-size * 0.35} y={-size * 0.2} width={size * 0.15} height={size * 0.5} fill={color} opacity="0.9" />
        <rect x={-size * 0.08} y={-size * 0.2} width={size * 0.15} height={size * 0.5} fill={color} opacity="0.9" />
        <rect x={size * 0.2} y={-size * 0.2} width={size * 0.15} height={size * 0.5} fill={color} opacity="0.9" />
        {/* Base */}
        <rect x={-size * 0.45} y={size * 0.3} width={size * 0.9} height={size * 0.1} fill={color} opacity="0.9" />
    </g>
);

// 🗿 Estatua (Cristo Redentor, Moai, Libertad)
export const StatueIcon = ({ x = 0, y = 0, size = 12, color = "#cbd5e1" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Cabeza */}
        <circle cx="0" cy={-size * 0.35} r={size * 0.15} fill={color} />
        {/* Cuerpo */}
        <rect x={-size * 0.1} y={-size * 0.2} width={size * 0.2} height={size * 0.4} fill={color} />
        {/* Brazos extendidos (Cristo) */}
        <rect x={-size * 0.4} y={-size * 0.1} width={size * 0.8} height={size * 0.12} fill={color} />
        {/* Base */}
        <rect x={-size * 0.15} y={size * 0.2} width={size * 0.3} height={size * 0.2} fill={color} opacity="0.8" />
    </g>
);

// ⛪ Iglesia/Catedral (Sagrada Familia, Catedral de Sal)
export const ChurchIcon = ({ x = 0, y = 0, size = 10, color = "#f3f4f6" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Torre central */}
        <rect x={-size * 0.1} y={-size * 0.5} width={size * 0.2} height={size * 0.8} fill={color} />
        {/* Punta de la torre */}
        <path
            d={`M${-size * 0.1},${-size * 0.5} L0,${-size * 0.7} L${size * 0.1},${-size * 0.5} Z`}
            fill={color}
        />
        {/* Cuerpo de la iglesia */}
        <rect x={-size * 0.3} y={-size * 0.1} width={size * 0.6} height={size * 0.4} fill={color} />
        {/* Techo */}
        <path
            d={`M${-size * 0.3},${-size * 0.1} L0,${-size * 0.3} L${size * 0.3},${-size * 0.1} Z`}
            fill={color}
            opacity="0.9"
        />
    </g>
);

// 🕌 Cúpula (Taj Mahal)
export const DomeIcon = ({ x = 0, y = 0, size = 10, color = "#fef3c7" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Cúpula */}
        <ellipse cx="0" cy={-size * 0.3} rx={size * 0.35} ry={size * 0.25} fill={color} />
        {/* Punta */}
        <path
            d={`M${-size * 0.05},${-size * 0.55} L0,${-size * 0.7} L${size * 0.05},${-size * 0.55} Z`}
            fill={color}
        />
        {/* Edificio */}
        <rect x={-size * 0.35} y={-size * 0.05} width={size * 0.7} height={size * 0.35} fill={color} />
        {/* Torres laterales */}
        <rect x={-size * 0.45} y={-size * 0.2} width={size * 0.08} height={size * 0.5} fill={color} opacity="0.9" />
        <rect x={size * 0.37} y={-size * 0.2} width={size * 0.08} height={size * 0.5} fill={color} opacity="0.9" />
    </g>
);

// 💧 Cascada (Niágara, Salto Ángel, Victoria Falls)
export const WaterfallIcon = ({ x = 0, y = 0, size = 10, color = "#67e8f9" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Agua cayendo */}
        <path
            d={`M${-size * 0.3},${-size * 0.4} Q${-size * 0.2},${size * 0.1} ${-size * 0.25},${size * 0.4}`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
        />
        <path
            d={`M0,${-size * 0.4} Q${size * 0.05},${size * 0.1} 0,${size * 0.4}`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.9"
        />
        <path
            d={`M${size * 0.3},${-size * 0.4} Q${size * 0.2},${size * 0.1} ${size * 0.25},${size * 0.4}`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
        />
        {/* Base de agua */}
        <ellipse cx="0" cy={size * 0.4} rx={size * 0.4} ry={size * 0.1} fill={color} opacity="0.6" />
    </g>
);

// 🗻 Volcán (Monte Fuji)
export const VolcanoIcon = ({ x = 0, y = 0, size = 12, color = "#78716c" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Montaña */}
        <path
            d={`M0,${-size * 0.6} L${-size * 0.5},${size * 0.3} L${size * 0.5},${size * 0.3} Z`}
            fill={color}
            opacity="0.9"
        />
        {/* Nieve en la cima */}
        <path
            d={`M0,${-size * 0.6} L${-size * 0.2},${-size * 0.2} L${size * 0.2},${-size * 0.2} Z`}
            fill="#fff"
            opacity="0.95"
        />
    </g>
);

// 🌈 Río Especial (Caño Cristales)
export const RainbowRiverIcon = ({ x = 0, y = 0, size = 10 }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Río con colores */}
        <path
            d={`M${-size * 0.4},${-size * 0.3} Q0,0 ${size * 0.4},${size * 0.3}`}
            stroke="#ec4899"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
        />
        <path
            d={`M${-size * 0.35},${-size * 0.2} Q0,${size * 0.1} ${size * 0.35},${size * 0.4}`}
            stroke="#f59e0b"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
        />
        <path
            d={`M${-size * 0.3},${-size * 0.1} Q0,${size * 0.2} ${size * 0.3},${size * 0.5}`}
            stroke="#22c55e"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
        />
    </g>
);

// 🎭 Edificio Moderno (Ópera de Sídney)
export const ModernBuildingIcon = ({ x = 0, y = 0, size = 10, color = "#f8fafc" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Velas de la ópera */}
        <path
            d={`M${-size * 0.3},${size * 0.3} Q${-size * 0.2},${-size * 0.4} ${-size * 0.1},${size * 0.3} Z`}
            fill={color}
            opacity="0.9"
        />
        <path
            d={`M${-size * 0.05},${size * 0.3} Q0,${-size * 0.5} ${size * 0.15},${size * 0.3} Z`}
            fill={color}
            opacity="0.95"
        />
        <path
            d={`M${size * 0.2},${size * 0.3} Q${size * 0.25},${-size * 0.4} ${size * 0.35},${size * 0.3} Z`}
            fill={color}
            opacity="0.9"
        />
    </g>
);

/**
 * Función para obtener icono cultural según el nombre
 */
export const getCulturalIcon = (monumentName, x, y, size = 10) => {
    const name = monumentName?.toLowerCase() || '';

    // 🗼 TORRES Y FORTIFICACIONES
    if (name.includes('torre') || name.includes('tower') || name.includes('big ben') || name.includes('fort') || name.includes('castillo') || name.includes('castle') || name.includes('muralla') || name.includes('wall') || name.includes('clock') || name.includes('leaning')) {
        return <TowerIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🔺 PIRÁMIDES
    if (name.includes('pirámide') || name.includes('pyramid')) {
        return <PyramidIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🏛️ TEMPLOS Y RUINAS ANTIGUAS
    if (name.includes('templo') || name.includes('temple') || name.includes('ruinas') || name.includes('coliseo') || name.includes('colosseum') || name.includes('acrópolis') || name.includes('petra') || name.includes('angkor') || name.includes('machu') || name.includes('tikal') || name.includes('chichén') || name.includes('palace') || name.includes('palacio') || name.includes('stupa') || name.includes('torii') || name.includes('market') || name.includes('hobbit') || name.includes('bali')) {
        return <TempleIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🗿 ESTATUAS Y ESCULTURAS
    if (name.includes('cristo') || name.includes('estatua') || name.includes('statue') || name.includes('moai') || name.includes('libertad') || name.includes('sphinx') || name.includes('esfinge') || name.includes('guerreros') || name.includes('terracota') || name.includes('geoglyph') || name.includes('líneas') || name.includes('rock_art') || name.includes('rushmore')) {
        return <StatueIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // ⛪ IGLESIAS Y RELIGIÓN OCCIDENTAL
    if (name.includes('iglesia') || name.includes('church') || name.includes('catedral') || name.includes('sagrada') || name.includes('cathedral') || name.includes('basílica') || name.includes('lalibela') || name.includes('lajas')) {
        return <ChurchIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🕌 CÚPULAS Y ORIENTE
    if (name.includes('taj') || name.includes('cúpula') || name.includes('dome') || name.includes('mosque') || name.includes('mezquita') || name.includes('samarkand')) {
        return <DomeIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 💧 CASCADAS Y AGUA
    if (name.includes('cascada') || name.includes('waterfall') || name.includes('falls') || name.includes('salto') || name.includes('victoria') || name.includes('iguazú') || name.includes('niágara') || name.includes('geyser') || name.includes('blue hole') || name.includes('cenote') || name.includes('fjord') || name.includes('milford') || name.includes('gondola') || name.includes('venecia') || name.includes('canal')) {
        return <WaterfallIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🗻 MONTAÑAS Y GEOLOGÍA
    if (name.includes('volcán') || name.includes('volcano') || name.includes('fuji') || name.includes('montaña') || name.includes('mountain') || name.includes('everest') || name.includes('kilimanjaro') || name.includes('andes') || name.includes('glaciar') || name.includes('glacier') || name.includes('perito') || name.includes('cañón') || name.includes('canyon') || name.includes('uluru') || name.includes('rock') || name.includes('stone') || name.includes('piedra') || name.includes('peñol') || name.includes('chiribiquete') || name.includes('table')) {
        return <VolcanoIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🌈 RÍOS Y COLORES NATURALES
    if (name.includes('caño') || name.includes('rainbow') || name.includes('salar') || name.includes('salt') || name.includes('uyuni') || name.includes('coral') || name.includes('barrera')) {
        return <RainbowRiverIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🎭 MODERNO Y ARQUITECTURA
    if (name.includes('ópera') || name.includes('opera') || name.includes('modern') || name.includes('sídney') || name.includes('burj') || name.includes('khalifa') || name.includes('skyscraper') || name.includes('bridge') || name.includes('puente') || name.includes('golden gate') || name.includes('base') || name.includes('antártida')) {
        return <ModernBuildingIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // 🦅 FAUNA Y VIDA
    if (name.includes('pájaro') || name.includes('ave') || name.includes('bird') || name.includes('condor') || name.includes('eagle') || name.includes('lion') || name.includes('león') || name.includes('serengeti') || name.includes('turtle') || name.includes('tortuga') || name.includes('galápagos') || name.includes('whale') || name.includes('ballena')) {
        return <BirdIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
    }

    // Default: Templo genérico (para cualquier cosa no categorizada)
    return <TempleIcon key={`cultural-${x}-${y}`} x={x} y={y} size={size} />;
};

// 🦅 Pájaro (Cóndor, Águila)
export const BirdIcon = ({ x = 0, y = 0, size = 6, color = "#475569" }) => (
    <g transform={`translate(${x}, ${y})`} className="animate-fly">
        {/* Ala izquierda */}
        <path
            d={`M0,0 Q${-size * 0.8},${-size * 0.5} ${-size},0`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
        />
        {/* Ala derecha */}
        <path
            d={`M0,0 Q${size * 0.8},${-size * 0.5} ${size},0`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
        />
        {/* Cuerpo */}
        <circle cx="0" cy="0" r={size * 0.2} fill={color} />
    </g>
);

export default {
    TowerIcon,
    PyramidIcon,
    TempleIcon,
    StatueIcon,
    ChurchIcon,
    DomeIcon,
    WaterfallIcon,
    VolcanoIcon,
    RainbowRiverIcon,
    ModernBuildingIcon,
    BirdIcon,
    getCulturalIcon
};
