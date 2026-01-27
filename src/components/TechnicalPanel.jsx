import React from 'react';
import { BookOpen, Scale, Zap, Database, Globe, ShieldCheck, Leaf, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const TechnicalPanel = () => {
    const sections = [
        {
            title: "Metodología IPCC",
            icon: <Leaf className="text-emerald-500" />,
            subtitle: "Absorción Científica",
            content: "Nuestra plataforma utiliza el nivel de referencia de emisiones forestales (FREL) basado en las pautas del IPCC para bosques tropicales.",
            formula: "Hectáreas × 2.5 (tCO2/ha/año) = $CARBON",
            details: [
                "Nivel de Nivel 3 (IPCC Tier 3)",
                "Monitoreo satelital periódico",
                "Buffer de riesgo del 10%"
            ]
        },
        {
            title: "Trazabilidad Web3",
            icon: <Database className="text-blue-500" />,
            subtitle: "Inmutabilidad On-Chain",
            content: "Combinamos Avalanche con IPFS para una transparencia total sobre la procedencia de cada crédito.",
            details: [
                "Metadata inmutable vía CID IPFS",
                "Hash de verificación predial",
                "Contratos auditables públicamente"
            ]
        },
        {
            title: "Marco Legal",
            icon: <Scale className="text-yellow-500" />,
            subtitle: "Cumplimiento Colombia",
            content: "Alineado con la Resolución 1447 del MinAmbiente y el Registro Nacional de Reducción de Emisiones (RENARE).",
            details: [
                "Cumple Ley 1819 Impuesto Carbono",
                "Protocolo de Adiciónalidad",
                "Firmas digitales institucionales"
            ]
        },
        {
            title: "Infraestructura",
            icon: <Cpu className="text-purple-500" />,
            subtitle: "Avalanche C-Chain",
            content: "Operamos en Avalanche por su eficiencia energética (Net Zero) y finalización de sub-segundo.",
            details: [
                "Bajas emisiones de red",
                "Escalabilidad horizontal",
                "Seguros contra doble gasto"
            ]
        }
    ];

    return (
        <div className="space-y-6 lg:space-y-12 pb-20 px-4 md:px-0">
            {/* Header - Improved Responsive */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-white/10 p-8 lg:p-12 rounded-3xl lg:rounded-[3rem] relative overflow-hidden">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/10 border border-white/20 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6">
                        <ShieldCheck size={14} /> Documentation & Transparency
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-black mb-4 text-white uppercase tracking-tighter">Libro Blanco Bank of Tierras</h2>
                    <p className="text-gray-400 max-w-2xl text-base lg:text-lg leading-relaxed antialiased font-medium">
                        Transparencia técnica absoluta sobre los cálculos de carbono y el marco legal que sostiene nuestra economía regenerativa.
                    </p>
                </div>
                <div className="absolute right-[-10%] top-[-20%] opacity-5 hidden lg:block">
                    <Globe className="w-96 h-96 text-white" />
                </div>
            </div>

            {/* Grid - 1 col on mobile, 2 on tablet+ */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 hover:border-emerald-500/30 transition-all group overflow-hidden relative"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors shadow-inner">
                                {React.cloneElement(section.icon, { size: 32 })}
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest">{section.subtitle}</div>
                                <div className="text-2xl font-black text-white italic">{section.title}</div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                            {section.content}
                        </p>

                        {section.formula && (
                            <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl mb-8 font-mono text-xs text-emerald-400 text-center shadow-inner tracking-tight">
                                {section.formula}
                            </div>
                        )}

                        <div className="space-y-4">
                            {section.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-gray-300 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                                    {detail}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Live Data Feed - Responsive Stack */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">
                    <div className="max-w-md">
                        <h4 className="text-2xl font-black text-white mb-3 flex items-center justify-center lg:justify-start gap-3 italic">
                            <Zap className="text-emerald-500 group-hover:animate-pulse" size={24} /> Oráculo Directo
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            Integrando feeds satelitales vía **Chainlink Functions** para auditoría dinámica de biomasa y control de deforestación.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 w-full lg:w-auto">
                        <div className="px-8 py-5 bg-black border border-white/5 rounded-2xl min-w-[160px]">
                            <div className="text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest italic">Status</div>
                            <div className="text-emerald-500 font-black flex items-center gap-2 justify-center text-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> ACTIVO
                            </div>
                        </div>
                        <div className="px-8 py-5 bg-black border border-white/5 rounded-2xl min-w-[160px]">
                            <div className="text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest italic">Confianza</div>
                            <div className="text-white font-black text-sm tracking-widest">99.2%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalPanel;
