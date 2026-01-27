import React, { useMemo } from 'react';

/**
 * 🌊 Componente de Partículas Oceánicas
 * Peces y estrellas flotando en zonas de océano
 */
export const OceanParticles = ({ density = 15 }) => {
    const particles = useMemo(() => {
        const items = [];
        for (let i = 0; i < density; i++) {
            items.push({
                id: i,
                x: -180 + Math.random() * 360, // Longitud
                y: -90 + Math.random() * 180,  // Latitud
                size: 1.5 + Math.random() * 2,
                delay: Math.random() * 5,
                duration: 8 + Math.random() * 4,
                type: Math.random() > 0.6 ? 'fish' : 'star'
            });
        }
        return items;
    }, [density]);

    return (
        <g className="ocean-particles" opacity="0.7">
            {particles.map(p => (
                p.type === 'fish' ? (
                    // 🐠 Pez
                    <g key={p.id}>
                        <ellipse
                            cx={p.x}
                            cy={p.y}
                            rx={p.size * 1.5}
                            ry={p.size}
                            fill="#06b6d4"
                            opacity="0.8"
                            style={{
                                animation: `swim ${p.duration}s ease-in-out ${p.delay}s infinite`
                            }}
                        />
                        <circle
                            cx={p.x + p.size}
                            cy={p.y - p.size * 0.3}
                            r={p.size * 0.3}
                            fill="#000"
                            opacity="0.6"
                        />
                    </g>
                ) : (
                    // ⭐ Estrella
                    <circle
                        key={p.id}
                        cx={p.x}
                        cy={p.y}
                        r={p.size * 0.4}
                        fill="#fff"
                        style={{
                            animation: `twinkle ${p.duration * 0.5}s ease-in-out ${p.delay}s infinite`
                        }}
                    />
                )
            ))}
        </g>
    );
};

/**
 * 🍃 Componente de Hojas Cayendo
 * Hojas verdes cayendo en zonas de selva
 */
export const FallingLeaves = ({ density = 12 }) => {
    const leaves = useMemo(() => {
        const items = [];
        for (let i = 0; i < density; i++) {
            items.push({
                id: i,
                x: -180 + Math.random() * 360,
                startY: -100 + Math.random() * 20,
                size: 2 + Math.random() * 2,
                delay: Math.random() * 8,
                duration: 10 + Math.random() * 5,
                color: ['#22c55e', '#16a34a', '#84cc16'][Math.floor(Math.random() * 3)]
            });
        }
        return items;
    }, [density]);

    return (
        <g className="falling-leaves" opacity="0.6">
            {leaves.map(leaf => (
                <ellipse
                    key={leaf.id}
                    cx={leaf.x}
                    cy={leaf.startY}
                    rx={leaf.size * 1.2}
                    ry={leaf.size * 0.8}
                    fill={leaf.color}
                    style={{
                        animation: `fall ${leaf.duration}s linear ${leaf.delay}s infinite, sway ${leaf.duration * 0.3}s ease-in-out ${leaf.delay}s infinite`,
                        transformOrigin: `${leaf.x}px ${leaf.startY}px`
                    }}
                />
            ))}
        </g>
    );
};

/**
 * ❄️ Componente de Efecto de Nieve
 * Copos de nieve cayendo en zonas polares
 */
export const SnowEffect = ({ density = 20 }) => {
    const snowflakes = useMemo(() => {
        const items = [];
        for (let i = 0; i < density; i++) {
            items.push({
                id: i,
                x: -180 + Math.random() * 360,
                startY: -100 + Math.random() * 20,
                size: 1 + Math.random() * 1.5,
                delay: Math.random() * 6,
                duration: 12 + Math.random() * 6,
                opacity: 0.5 + Math.random() * 0.4
            });
        }
        return items;
    }, [density]);

    return (
        <g className="snow-effect">
            {snowflakes.map(flake => (
                <g key={flake.id}>
                    {/* Copo de nieve - forma de asterisco */}
                    <line
                        x1={flake.x}
                        y1={flake.startY - flake.size}
                        x2={flake.x}
                        y2={flake.startY + flake.size}
                        stroke="#e0f2fe"
                        strokeWidth="0.3"
                        opacity={flake.opacity}
                        style={{
                            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`
                        }}
                    />
                    <line
                        x1={flake.x - flake.size}
                        y1={flake.startY}
                        x2={flake.x + flake.size}
                        y2={flake.startY}
                        stroke="#e0f2fe"
                        strokeWidth="0.3"
                        opacity={flake.opacity}
                        style={{
                            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`
                        }}
                    />
                    <line
                        x1={flake.x - flake.size * 0.7}
                        y1={flake.startY - flake.size * 0.7}
                        x2={flake.x + flake.size * 0.7}
                        y2={flake.startY + flake.size * 0.7}
                        stroke="#e0f2fe"
                        strokeWidth="0.3"
                        opacity={flake.opacity}
                        style={{
                            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`
                        }}
                    />
                    <line
                        x1={flake.x - flake.size * 0.7}
                        y1={flake.startY + flake.size * 0.7}
                        x2={flake.x + flake.size * 0.7}
                        y2={flake.startY - flake.size * 0.7}
                        stroke="#e0f2fe"
                        strokeWidth="0.3"
                        opacity={flake.opacity}
                        style={{
                            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`
                        }}
                    />
                </g>
            ))}
        </g>
    );
};

/**
 * 🎨 Componente Maestro de Partículas por Bioma
 */
export const BiomeParticles = ({ biomeType }) => {
    if (!biomeType) return null;

    const type = biomeType.toLowerCase();

    // Océanos
    if (type.includes('océano') || type.includes('marino') || type.includes('abismo')) {
        return <OceanParticles density={15} />;
    }

    // Selvas
    if (type.includes('selva') || type.includes('tropical') || type.includes('amazonía')) {
        return <FallingLeaves density={12} />;
    }

    // Polos/Tundra
    if (type.includes('tundra') || type.includes('permafrost') || type.includes('polo')) {
        return <SnowEffect density={20} />;
    }

    return null;
};

export default BiomeParticles;
