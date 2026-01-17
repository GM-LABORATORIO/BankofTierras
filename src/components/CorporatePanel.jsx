import React, { useState, useEffect } from 'react';
import { Leaf, Building2, TrendingUp, History, Download, Flame, ArrowUpRight, Loader2, Heart, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_CERTIFICATE_TEMPLATE } from '../constants/mockData';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';

const CorporatePanel = ({ myForest = [], projects = [], totalRetired = 0, onRetire }) => {
    const { signer, contractAddresses, CARBON_TOKEN_ABI, account, carbonBalance, refreshBalance } = useWeb3();
    const [retireAmount, setRetireAmount] = useState('');
    const [nit, setNit] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isRetiring, setIsRetiring] = useState(false);
    const [showLegalCert, setShowLegalCert] = useState(null);

    const getImageUrl = (image) => {
        if (!image) return "https://images.unsplash.com/photo-1546272446-615729161cb9?auto=format&fit=crop&q=80&w=800";
        if (image.startsWith('http')) return image;
        if (image.includes('/')) return image;
        return `https://gateway.pinata.cloud/ipfs/${image}`;
    };

    // El balance ahora se maneja globalmente en Web3Context

    const handleRetire = async () => {
        if (!signer || !retireAmount || !nit || !companyName) {
            alert("Completa todos los campos (Monto, NIT y Nombre de Empresa)");
            return;
        }

        setIsRetiring(true);
        try {
            const tokenContract = new ethers.Contract(
                contractAddresses.carbonToken,
                CARBON_TOKEN_ABI,
                signer
            );

            const amount = ethers.parseEther(retireAmount);
            const tx = await tokenContract.retireForTaxExemption(amount, nit);
            await tx.wait();

            setShowLegalCert({
                amount: retireAmount,
                nit: nit,
                company: companyName,
                txHash: tx.hash,
                date: new Date().toLocaleDateString()
            });

            if (onRetire) onRetire(retireAmount);
            refreshBalance();
            setRetireAmount('');
            setNit('');
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        } finally {
            setIsRetiring(false);
        }
    };

    // Función simulada para comprar (pide al dueño mintear tokens)
    const handleBuy = async (project) => {
        const tonAmount = Math.floor(Math.random() * 50) + 10;
        alert(`Simulación de Compra: Has adquirido ${tonAmount} tCO2 del proyecto "${project.name}". En una implementación real, esto ejecutaría un swap de tokens o una transferencia directa. Para propósitos de este demo, puedes mintear tokens $CARBON desde el Auditor Panel.`);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { label: "Saldo CO2", value: `${carbonBalance} t`, icon: <CustomLeaf className="text-emerald-500" />, sub: `≈ $${(parseFloat(carbonBalance) * 27000).toLocaleString()} COP` },
                    { label: "Compensado", value: `${totalRetired} t`, icon: <Flame className="text-red-500" />, sub: "Impacto Circular" },
                    { label: "Impacto Vida", value: `${myForest.length}`, icon: <Heart className="text-pink-500" />, sub: "Especies Protegidas" },
                    { label: "Certificados", value: "12", icon: <Building2 className="text-blue-500" />, sub: "Verificados" }
                ].map((stat) => (
                    <div key={stat.label} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/20 transition-all">
                        <div className="relative z-10 flex flex-col gap-2">
                            <div className="p-3 w-fit rounded-xl bg-white/5 mb-1 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <div className="text-2xl font-black text-white">{stat.value}</div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            <div className="text-[10px] text-emerald-400 mt-1 font-bold">{stat.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Retirement Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#0c0c0c] shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                        <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white italic uppercase tracking-tighter relative z-10">
                            <Flame className="text-red-500 animate-pulse" />
                            Liquidación Legal de Créditos
                        </h3>

                        <div className="space-y-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest leading-none">Toneladas a Mitigar</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={retireAmount}
                                            onChange={(e) => setRetireAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-black focus:border-emerald-500 outline-none transition-all pr-16 text-white"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-500 text-xs uppercase tracking-widest leading-none">tCO2</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest leading-none">NIT del Contribuyente</label>
                                    <input
                                        type="text"
                                        value={nit}
                                        onChange={(e) => setNit(e.target.value)}
                                        placeholder="900.000.000-0"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-black focus:border-emerald-500 outline-none transition-all text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest leading-none">Nombre o Razón Social</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Amazonas S.A.S"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-black focus:border-emerald-500 outline-none transition-all text-white"
                                />
                            </div>

                            <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl">
                                <p className="text-[10px] text-red-300 font-bold leading-relaxed flex gap-3">
                                    <span className="shrink-0 bg-red-500/20 p-1 rounded-md h-fit">🚨</span>
                                    ADVERTENCIA: Esta acción es IRREVERSIBLE. Los tokens se quemarán permanentemente en Avalanche y se generará un certificado para la DIAN bajo la Resolución 1447.
                                </p>
                            </div>

                            <button
                                onClick={handleRetire}
                                disabled={isRetiring}
                                className="w-full py-6 bg-white text-black rounded-[1.5rem] font-black text-lg hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-tighter"
                            >
                                {isRetiring ? <Loader2 className="animate-spin" /> : <Flame />}
                                {isRetiring ? "PROCESANDO..." : "Ejecutar Compensación Voluntaria"}
                            </button>
                        </div>
                    </div>

                    {/* Portafolio de Biodiversidad */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-[100px] -mr-32 -mb-32" />

                        <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white italic uppercase tracking-tighter relative z-10">
                            <Heart className="text-pink-500" />
                            Portafolio de Responsabilidad Social (ESG)
                        </h3>

                        {myForest.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                {myForest.map((item) => (
                                    <div key={`forest-${item.id}`} className="flex items-center gap-4 p-4 bg-black border border-white/5 rounded-2xl group hover:border-pink-500/30 transition-all">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                            <img src={getImageUrl(item.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-black text-white truncate uppercase tracking-widest">{item.name}</div>
                                            <div className="text-[10px] text-gray-500 font-bold truncate italic mb-1">{item.scientific}</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[8px] bg-pink-500/10 text-pink-500 px-2 py-0.5 rounded font-black uppercase">NFT ADOPTADO</span>
                                                <span className="text-[8px] text-gray-600 font-mono">{item.adoptionDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 px-8 border-2 border-dashed border-white/5 rounded-3xl relative z-10">
                                <Heart className="mx-auto text-gray-700 mb-4" size={32} />
                                <p className="text-sm text-gray-500 font-bold italic">No hay adopciones activas en este portafolio corporativo.</p>
                                <button className="mt-4 text-[10px] text-emerald-500 font-black uppercase tracking-[.2em]">Visitar Marketplace →</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vertical Column with Projects & Certificates */}
                <div className="space-y-8">
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem]">
                        <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6">Proyectos de Inversión Sugeridos</h3>
                        <div className="space-y-4">
                            {/* Proyectos reales del usuario que ya están tokenizados */}
                            {projects.filter(p => p.status === 'Tokenizado').map(p => (
                                <div key={`real-${p.id}-${p.regId}`} className="group cursor-pointer">
                                    <div className="relative h-40 rounded-3xl overflow-hidden mb-3 border border-emerald-500/30">
                                        <img src={getImageUrl(p.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest">REAL: {p.regId}</div>
                                        <div className="absolute bottom-4 left-4">
                                            <div className="text-xs font-black text-white uppercase tracking-widest mb-1 leading-none">{p.name}</div>
                                            <div className="text-[10px] text-emerald-400 font-black tracking-[0.2em] leading-none">Activo en {p.location}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleBuy(p)}
                                        className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        Invertir en Créditos
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            ))}

                            {/* Muestras del catálogo global */}
                            {MOCK_PROJECTS.filter(p => p.status === 'Verificado').slice(0, 1).map(p => (
                                <div key={`mock-${p.id}`} className="group cursor-pointer">
                                    <div className="relative h-40 rounded-3xl overflow-hidden mb-3 border border-white/5">
                                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <div className="text-xs font-black text-white uppercase tracking-widest mb-1 leading-none">{p.name}</div>
                                            <div className="text-[10px] text-emerald-400 font-black tracking-[0.2em] leading-none">$23,500 COP / t</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleBuy(p)}
                                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
                                    >
                                        Comprar Créditos
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2.5rem]">
                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[.3em] mb-4 text-center">Auditoría en Tiempo Real</div>
                        <div className="flex flex-col items-center gap-4 py-4">
                            <div className="w-20 h-20 bg-black rounded-2xl border border-white/10 flex items-center justify-center p-3">
                                <Download className="text-gray-500 hover:text-emerald-500 transition-colors" size={32} />
                            </div>
                            <div className="text-center">
                                <div className="text-xs font-black text-white uppercase tracking-widest">Reporte GRI 2026</div>
                                <div className="text-[9px] text-gray-500 font-bold italic">Listo para exportar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal Certificate Modal (The Tax Benefit Receipt) */}
            <AnimatePresence>
                {showLegalCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
                        onClick={() => setShowLegalCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white text-black p-12 rounded-[2rem] max-w-2xl w-full relative shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh] custom-scrollbar"
                            onClick={e => e.stopPropagation()}
                            id="legal-certificate"
                        >
                            <div className="flex justify-between items-start mb-8 border-b-2 border-black pb-8">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Entidad Emisora</div>
                                    <div className="text-xl font-black italic tracking-tighter">AMAZONAS CERO PROTOCOL</div>
                                    <div className="text-[8px] font-bold text-gray-500 uppercase">Blockchain-Native Carbon Offset Standard</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Certificado No.</div>
                                    <div className="text-lg font-mono font-bold leading-none">AMZ-RET-{showLegalCert.txHash.substring(2, 10).toUpperCase()}</div>
                                </div>
                            </div>

                            <div className="text-center mb-12">
                                <CheckCircle2 className="mx-auto text-emerald-600 mb-6" size={64} />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Certificado de Compensación Ambiental</h2>
                                <p className="text-gray-500 text-sm italic italic">Documento soporte para beneficios tributarios bajo Decreto 926 de 2017</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <div>
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Nombre / Razón Social</div>
                                    <div className="font-bold text-lg uppercase">{showLegalCert.company}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Identificación (NIT)</div>
                                    <div className="font-bold text-lg">{showLegalCert.nit}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Toneladas Mitigadas</div>
                                    <div className="font-bold text-2xl text-emerald-600 font-black">{showLegalCert.amount} tCO2e</div>
                                </div>
                                <div>
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Fecha de Liquidación</div>
                                    <div className="font-bold text-lg">{showLegalCert.date}</div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-12 text-[11px] leading-relaxed text-gray-600">
                                <p>
                                    El portador de este certificado ha procedido con la **Liquidación Voluntaria (Burn)** de los tokens $CARBON correspondientes a la cantidad mencionada arriba. Esta acción es irreversible en la **Avalanche Mainnet** y garantiza que las unidades de reducción de emisiones no serán transadas nuevamente en el mercado.
                                </p>
                                <p>
                                    Este documento es válido como soporte de no-causación del impuesto al carbono y cumple con los requisitos técnicos exigidos por el Ministerio de Ambiente y la DIAN en Colombia para la mitigación climática certificada.
                                </p>
                            </div>

                            <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Transaction Hash (Blockchain Receipt)</div>
                                        <div className="text-[9px] font-mono break-all text-gray-400 line-clamp-1">{showLegalCert.txHash}</div>
                                    </div>
                                    <button
                                        onClick={() => window.print()}
                                        className="px-6 py-3 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2"
                                    >
                                        <FileText size={14} />
                                        Descargar Certificado DIAN
                                    </button>
                                </div>
                                <div className="w-24 h-24 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-2">
                                    {/* Simulated QR */}
                                    <div className="grid grid-cols-4 gap-1 w-full h-full opacity-20">
                                        {[...Array(16)].map((_, i) => <div key={i} className="bg-black rounded-sm" />)}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowLegalCert(null)}
                                className="mt-8 w-full py-4 text-gray-400 font-bold text-xs hover:text-black uppercase tracking-widest"
                            >
                                Cerrar Ventana
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CustomLeaf = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2C18.4 17 14.5 20 11 20Z" />
        <path d="M11 20v-5.5" />
        <path d="M9 11c.5-1 1.5-1 2.5-1" />
    </svg>
);

export default CorporatePanel;
