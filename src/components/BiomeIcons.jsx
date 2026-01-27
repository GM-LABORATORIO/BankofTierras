import React from 'react';

/**
 * 🎨 BiomeIcons - Componente de iconografía visual por bioma
 * Inspirado en pixel art isométrico para dar vida al mapa
 */

// 🌳 Árbol Tropical (Selvas)
export const TreeIcon = ({ size = 12, color = "#22c55e" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L8 8H10V14H8L12 22L16 14H14V8H16L12 2Z" fill={color} opacity="0.8" />
        <circle cx="12" cy="6" r="4" fill={color} opacity="0.6" />
    </svg>
);

// 🏔️ Montaña (Andes, Himalaya)
export const MountainIcon = ({ size = 12, color = "#94a3b8" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 20L12 4L21 20H3Z" fill={color} opacity="0.7" />
        <path d="M8 20L12 12L16 20H8Z" fill="#e0f2fe" opacity="0.9" />
        <circle cx="12" cy="8" r="2" fill="#fff" opacity="0.8" />
    </svg>
);

// 🐠 Pez (Océanos)
export const FishIcon = ({ size = 12, color = "#06b6d4" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="14" cy="12" rx="8" ry="4" fill={color} opacity="0.7" />
        <path d="M6 12L2 10V14L6 12Z" fill={color} opacity="0.8" />
        <circle cx="18" cy="11" r="1.5" fill="#fff" />
    </svg>
);

// 🌵 Cactus (Desiertos)
export const CactusIcon = ({ size = 12, color = "#f59e0b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="10" y="8" width="4" height="12" rx="2" fill="#84cc16" opacity="0.8" />
        <rect x="6" y="12" width="4" height="6" rx="2" fill="#84cc16" opacity="0.7" />
        <rect x="14" y="10" width="4" height="8" rx="2" fill="#84cc16" opacity="0.7" />
        <circle cx="11" cy="10" r="1" fill={color} />
        <circle cx="13" cy="14" r="1" fill={color} />
    </svg>
);

// 🦁 Animal (Sabana)
export const AnimalIcon = ({ size = 12, color = "#d97706" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="14" rx="6" ry="4" fill={color} opacity="0.7" />
        <circle cx="12" cy="10" r="3" fill={color} opacity="0.8" />
        <circle cx="9" cy="8" r="1.5" fill={color} opacity="0.9" />
        <circle cx="15" cy="8" r="1.5" fill={color} opacity="0.9" />
    </svg>
);

// 🌲 Pino (Bosque Templado)
export const PineIcon = ({ size = 12, color = "#059669" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L8 10H10L7 16H9L6 22H18L15 16H17L14 10H16L12 2Z" fill={color} opacity="0.8" />
        <rect x="11" y="18" width="2" height="4" fill="#78350f" />
    </svg>
);

// 🐚 Coral (Arrecifes)
export const CoralIcon = ({ size = 12, color = "#ec4899" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 20C12 20 8 16 8 12C8 10 10 8 12 8C14 8 16 10 16 12C16 16 12 20 12 20Z" fill={color} opacity="0.6" />
        <circle cx="10" cy="10" r="2" fill={color} opacity="0.7" />
        <circle cx="14" cy="10" r="2" fill={color} opacity="0.7" />
        <circle cx="12" cy="14" r="2" fill={color} opacity="0.8" />
    </svg>
);

// ❄️ Copo de Nieve (Tundra)
export const SnowflakeIcon = ({ size = 12, color = "#e0f2fe" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2V22M2 12H22M6 6L18 18M18 6L6 18" stroke={color} strokeWidth="2" opacity="0.8" />
        <circle cx="12" cy="12" r="3" fill={color} opacity="0.6" />
    </svg>
);

// 🌾 Pasto (Praderas)
export const GrassIcon = ({ size = 12, color = "#84cc16" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M8 20C8 20 6 16 6 12C6 10 8 8 10 10C12 12 10 20 8 20Z" fill={color} opacity="0.6" />
        <path d="M12 20C12 20 10 15 10 11C10 9 12 7 14 9C16 11 14 20 12 20Z" fill={color} opacity="0.7" />
        <path d="M16 20C16 20 14 16 14 12C14 10 16 8 18 10C20 12 18 20 16 20Z" fill={color} opacity="0.6" />
    </svg>
);

/**
 * Función helper para obtener el icono según el bioma
 */
export const getBiomeIcon = (biomeName, size = 12) => {
    const name = biomeName?.toLowerCase() || '';

    if (name.includes('selva') || name.includes('amazonía') || name.includes('tropical')) {
        return <TreeIcon size={size} color="#22c55e" />;
    }
    if (name.includes('andes') || name.includes('montaña') || name.includes('nevado')) {
        return <MountainIcon size={size} color="#94a3b8" />;
    }
    if (name.includes('océano') || name.includes('marino') || name.includes('abismo')) {
        return <FishIcon size={size} color="#06b6d4" />;
    }
    if (name.includes('desierto') || name.includes('árido')) {
        return <CactusIcon size={size} color="#f59e0b" />;
    }
    if (name.includes('sabana') || name.includes('estepa')) {
        return <AnimalIcon size={size} color="#d97706" />;
    }
    if (name.includes('taiga') || name.includes('boreal') || name.includes('bosque')) {
        return <PineIcon size={size} color="#059669" />;
    }
    if (name.includes('arrecife') || name.includes('coral')) {
        return <CoralIcon size={size} color="#ec4899" />;
    }
    if (name.includes('tundra') || name.includes('permafrost') || name.includes('polo')) {
        return <SnowflakeIcon size={size} color="#e0f2fe" />;
    }
    if (name.includes('pradera') || name.includes('pampa')) {
        return <GrassIcon size={size} color="#84cc16" />;
    }

    // Default: árbol genérico
    return <TreeIcon size={size} color="#10b981" />;
};

export default {
    TreeIcon,
    MountainIcon,
    FishIcon,
    CactusIcon,
    AnimalIcon,
    PineIcon,
    CoralIcon,
    SnowflakeIcon,
    GrassIcon,
    getBiomeIcon
};
