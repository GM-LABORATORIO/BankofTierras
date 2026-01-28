import React, { useState, useEffect } from 'react';
import { Leaf, Building2, TrendingUp, History, Download, Flame, ArrowUpRight, Loader2, Heart, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_CERTIFICATE_TEMPLATE } from '../constants/mockData';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { certificateService } from '../services/certificateService';

const CorporatePanel = ({ myForest = [], projects = [], totalRetired = 0, onRetire, userProfile }) => {
    const { signer, contractAddresses, CARBON_TOKEN_ABI, account, carbonBalance, refreshBalance } = useWeb3();
    const [retireAmount, setRetireAmount] = useState('');
    const [nit, setNit] = useState(userProfile?.tax_id || '');
    const [isRetiring, setIsRetiring] = useState(false);
    const [showLegalCert, setShowLegalCert] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [activeTab, setActiveTab] = useState('inventory'); // inventory, history, compliance

    // Sync nit state if userProfile loads late
    useEffect(() => {
        if (userProfile?.tax_id) {
            setNit(userProfile.tax_id);
        }
    }, [userProfile]);

    const getImageUrl = (image) => {
        if (!image) return "https://images.unsplash.com/photo-1546272446-615729161cb9?auto=format&fit=crop&q=80&w=800";
        if (image.startsWith('http')) return image;

        // Handle IPFS variants
        let cid = image;
        if (image.startsWith('ipfs://')) {
            cid = image.split('//')[1];
        } else if (image.includes('ipfs/')) {
            cid = image.split('ipfs/')[1];
        }

        return `https://gateway.pinata.cloud/ipfs/${cid}`;
    };

    const employeeCount = userProfile?.employee_count || 0;
    const ley2173Goal = employeeCount * 2;
    const treesPlanted = myForest.length;
    const compliancePercent = ley2173Goal > 0 ? Math.min(100, (treesPlanted / ley2173Goal) * 100) : 0;

    // El balance ahora se maneja globalmente en Web3Context

    const handleRetire = async () => {
        const currentCompanyName = userProfile?.company_name || "Tu Empresa S.A.S";
        if (!signer || !retireAmount || !nit || !currentCompanyName) {
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

            const certData = {
                amount: retireAmount,
                nit: nit,
                company: currentCompanyName,
                txHash: tx.hash,
                date: new Date().toLocaleDateString()
            };

            setShowLegalCert(certData);

            if (onRetire) onRetire(retireAmount, certData);
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
            {/* 1. Corporate Identity Header */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-40 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden p-3">
                            {userProfile?.company_logo ? (
                                <img src={getImageUrl(userProfile.company_logo)} className="max-w-full max-h-full object-contain" alt="Corporate Logo" />
                            ) : (
                                <Building2 className="text-gray-400 w-10 h-10" />
                            )}
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Perfil Corporativo & ESG</div>
                            <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">
                                {userProfile?.company_name || "Tu Empresa S.A.S"}
                            </h2>
                            <p className="text-gray-500 text-sm font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                Estado: En Transición a Carbono Neutro
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-right">
                            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Compensación Total</div>
                            <div className="text-3xl font-black text-emerald-500">{totalRetired} <span className="text-sm text-gray-500">tCO2e</span></div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-right">
                            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Certificados DIAN</div>
                            <div className="text-3xl font-black text-white">12</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex gap-4 border-b border-white/5 pb-4">
                {[
                    { id: 'inventory', label: 'Inventario de Impacto', icon: <Building2 size={16} /> },
                    { id: 'compliance', label: 'Cumplimiento Ley 2173', icon: <CheckCircle2 size={16} /> },
                    { id: 'history', label: 'Bóveda de Certificados', icon: <History size={16} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 2. Main Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'inventory' && (
                    <motion.div
                        key="inventory"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column (2/3): Operations & Portfolio */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Retirement Form (Compliance Engine) */}
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
                                                value={userProfile?.company_name || ''}
                                                disabled
                                                placeholder="Amazonas S.A.S"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-black focus:border-emerald-500 outline-none transition-all text-white opacity-50 cursor-not-allowed"
                                            />
                                            <p className="px-1 text-[8px] text-gray-600 font-bold uppercase italic mt-1">
                                                Modificable en la pestaña "Mi Perfil"
                                            </p>
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

                                {/* Portafolio de Responsabilidad Social */}
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

                            {/* Right Column (1/3): Stats & Projects */}
                            <div className="space-y-8">
                                {/* Metrics Vertical Stack */}
                                <div className="space-y-4">
                                    {[
                                        { label: "Saldo Disponible", value: `${carbonBalance}`, unit: "tCO2", icon: <Leaf className="text-emerald-500" />, sub: "Listo para retirar" },
                                        { label: "Inversión Verde", value: "$45.2M", unit: "COP", icon: <TrendingUp className="text-blue-500" />, sub: "Capital Catalítico" },
                                        { label: "Especies Protegidas", value: `${myForest.length}`, unit: "Ud", icon: <Heart className="text-pink-500" />, sub: "Biodiversidad" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500/20 transition-all">
                                            <div className="p-3 bg-white/5 rounded-2xl">
                                                {stat.icon}
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                                <div className="text-2xl font-black text-white">{stat.value} <span className="text-xs text-gray-500">{stat.unit}</span></div>
                                                <div className="text-[9px] text-gray-600 font-bold">{stat.sub}</div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl text-center">
                                        <Download className="mx-auto text-emerald-500 mb-2" />
                                        <div className="text-xs font-black text-white uppercase mb-1">Reporte de Sostenibilidad</div>
                                        <div className="text-[9px] text-emerald-500/70 mb-3">Compatible con GRI / SASB</div>
                                        <button className="w-full py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors">
                                            Generar PDF
                                        </button>
                                    </div>
                                </div>

                                {/* Projects Column */}
                                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem]">
                                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6">Proyectos de Inversión Sugeridos</h3>
                                    <div className="space-y-4">
                                        {projects.filter(p => p.status === 'Verificado' || p.status === 'Tokenizado').map(p => (
                                            <div key={`real-${p.id}-${p.regid}`} className="group cursor-pointer">
                                                <div className="relative h-40 rounded-3xl overflow-hidden mb-3 border border-emerald-500/30">
                                                    <img src={getImageUrl(p.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                                    <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest">REAL: {p.regid || "PEND"}</div>
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
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'compliance' && (
                    <motion.div
                        key="compliance"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 italic">Marco Legal Colombia</div>
                                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Ley 2173 de 2021</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                                            Establece la obligación para medianas y grandes empresas de sembrar <span className="text-white font-bold">mínimo 2 árboles por cada empleado</span> vinculado laboralmente, de forma anual. Bank of Tierras facilita este cumplimiento mediante la adopción verificada de especies nativas.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                                            <div className="text-[9px] font-black text-gray-500 uppercase mb-1">Empleados</div>
                                            <div className="text-2xl font-black text-white">{employeeCount}</div>
                                        </div>
                                        <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                                            <div className="text-[9px] font-black text-emerald-500/50 uppercase mb-1">Meta Anual</div>
                                            <div className="text-2xl font-black text-emerald-500">{ley2173Goal} <span className="text-xs text-gray-500">árboles</span></div>
                                        </div>
                                        <div className="bg-black/40 border border-white/5 p-5 rounded-2xl col-span-2 md:col-span-1">
                                            <div className="text-[9px] font-black text-pink-500/50 uppercase mb-1">Plantados</div>
                                            <div className="text-2xl font-black text-pink-500">{treesPlanted}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Progreso de Cumplimiento Legal</span>
                                            <span className="text-lg font-black text-emerald-500">{Math.round(compliancePercent)}%</span>
                                        </div>
                                        <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${compliancePercent}%` }}
                                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-80 bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 rounded-[2rem] text-center space-y-6">
                                    <ShieldCheck className="mx-auto text-emerald-500" size={48} />
                                    <div>
                                        <div className="text-xs font-black text-white uppercase mb-2">Estado de Auditoría</div>
                                        <div className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full inline-block ${compliancePercent >= 100 ? 'bg-emerald-500 text-white' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                                            {compliancePercent >= 100 ? "CUMPLIMIENTO TOTAL" : "PENDIENTE DE SIEMBRA"}
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold italic leading-relaxed">
                                        {compliancePercent >= 100
                                            ? "Excelente. Tu empresa ha cumplido con la Ley 2173 por el periodo vigente."
                                            : `Te faltan ${ley2173Goal - treesPlanted} árboles para cumplir con el requisito legal de este año.`}
                                    </p>
                                    <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                                        Adquirir Árboles Faltantes
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                                <h4 className="text-sm font-black text-white uppercase mb-4 flex items-center gap-3 italic">
                                    <Download size={18} className="text-emerald-500" />
                                    Certificado Siembra Vida
                                </h4>
                                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                                    Genera el documento oficial exigido por las entidades territoriales para acreditar la ejecución de tu programa de restauración ecológica.
                                </p>
                                <button disabled={compliancePercent < 100} className="w-full py-4 bg-white/5 border border-white/10 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-30">
                                    Descargar Certificado Anual
                                </button>
                            </div>
                            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                                <h4 className="text-sm font-black text-white uppercase mb-4 flex items-center gap-3 italic">
                                    <FileText size={18} className="text-blue-500" />
                                    Beneficios de la Ley
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Uso del Sello de Siembra Vida Empresarial.",
                                        "Puntaje adicional en procesos de licitación pública.",
                                        "Preferencias en líneas de crédito verde.",
                                        "Mención honorífica por protección de biodiversidad."
                                    ].map((item, i) => (
                                        <li key={i} className="text-[10px] text-gray-400 flex gap-2 font-bold italic">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'history' && (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem]"
                    >
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white italic uppercase tracking-tighter">
                            <History size={24} className="text-blue-500" />
                            Bóveda de Certificados Legales
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-black/50 border border-white/5 rounded-2xl p-6 text-center">
                                <FileText className="mx-auto text-gray-700 mb-4" size={48} />
                                <p className="text-gray-500 font-bold italic text-sm mb-4">No se encontraron certificados previos vinculados a esta wallet.</p>
                                <div className="text-[10px] text-gray-700 uppercase font-black tracking-widest">
                                    Las compensaciones de $CARBON aparecerán aquí una vez procesadas.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legal Certificate Modal */}
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
                                    <div className="text-xl font-black italic tracking-tighter">BANK OF TIERRAS PROTOCOL</div>
                                    <div className="text-[8px] font-bold text-gray-500 uppercase">Blockchain-Native Carbon Offset Standard</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Certificado No.</div>
                                    <div className="text-lg font-mono font-bold leading-none">BoT-RET-{showLegalCert.txHash.substring(2, 10).toUpperCase()}</div>
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
                                        onClick={async () => {
                                            setIsDownloading(true);
                                            try {
                                                const fileName = `Certificado-DIAN-${showLegalCert.company.replace(/\s+/g, '-')}.pdf`;
                                                await certificateService.generatePDF('legal-certificate', fileName);
                                            } catch (err) {
                                                alert("Error al descargar: " + err.message);
                                            } finally {
                                                setIsDownloading(false);
                                            }
                                        }}
                                        disabled={isDownloading}
                                        className="px-6 py-3 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {isDownloading ? <Loader2 className="animate-spin" size={14} /> : <FileText size={14} />}
                                        {isDownloading ? "Generando..." : "Descargar Certificado DIAN"}
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
        </div >
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
