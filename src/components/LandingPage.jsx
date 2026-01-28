import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Leaf, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X, Rocket, Lock, Zap, Download, Heart, ShieldAlert, Check, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import logoBot from '../assets/logo_bot.png';
import LifeMap from './LifeMap';

const LandingPage = ({ onEnter, onDiscovery }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showCert, setShowCert] = useState(null);

    const certificateMockups = {
        carbon: {
            title: "Certificado de Mitigación",
            id: "RET-NFT-BoT-2024-8D2",
            company: "Tu Empresa S.A.S",
            nit: "900.000.000-0",
            amount: "150.00 tCO2e",
            type: "Carbon Offset",
            desc: "Este activo digital representa la liquidación permanente de créditos de carbono verificados bajo el estándar Bank of Tierras."
        },
        tree: {
            title: "Certificado Siembra Vida",
            id: "LEY-2173-PROOF-X91",
            company: "Tu Empresa S.A.S",
            nit: "900.000.000-0",
            amount: "300 Árboles Nativos",
            type: "Ley 2173 Compliance",
            desc: "Acredita el cumplimiento de la obligación legal de siembra empresarial de especies nativas en zonas de restauración ecológica."
        }
    };

    const features = [
        {
            icon: <Shield className="w-8 h-8 text-emerald-500" />,
            title: "Auditoría en Tiempo Real",
            desc: "Blockchain permite verificar la existencia y estado de cada hectárea sin intermediarios, eliminando el riesgo de doble conteo."
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
            title: "Trazabilidad NFT",
            desc: "Cada adopción genera un NFT único vinculado a coordenadas GPS y registros legales inmutables en IPFS."
        },
        {
            icon: <Globe className="w-8 h-8 text-emerald-500" />,
            title: "Transparencia de Impacto",
            desc: "Flujo de capital rastreable desde la billetera corporativa hasta la comunidad indígena protectora de la selva."
        }
    ];

    const stats = [
        { label: "Área Protegida", value: "50,000 Ha" },
        { label: "CO2 Capturado", value: "1.2M Tons" },
        { label: "Comunidades", value: "24+" },
        { label: "Auditoría On-Chain", value: "100%" }
    ];

    const steps = [
        { title: "Originación NFT", desc: "Comunidades registran áreas de conservación como activos digitales únicos.", icon: <Leaf /> },
        { title: "Auditoría Digital", desc: "Verificación satelital y de biomasa registrada de forma inmutable.", icon: <Shield /> },
        { title: "Tokenización", desc: "Emisión de créditos $CARBON auditables y líquidos en la red.", icon: <Zap /> },
        { title: "Compensación NFT", desc: "Retiro de créditos que genera un certificado digital permanente en la billetera.", icon: <Lock /> }
    ];

    return (
        <div className="relative bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={logoBot}
                            alt="Bank of Tierras"
                            className="h-12 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="flex items-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <a href="#impacto" className="hover:text-emerald-500 transition-colors">Impacto</a>
                            <a href="#como-funciona" className="hover:text-emerald-500 transition-colors">Proceso</a>
                            <a href="#tokens" className="hover:text-emerald-500 transition-colors">Tecnología</a>
                            <button onClick={onDiscovery} className="px-4 py-1.5 border border-emerald-500/30 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Explorar Globo</button>
                        </div>
                        <button
                            onClick={onEnter}
                            className="px-6 py-3 bg-white text-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 font-black uppercase text-xs tracking-widest shadow-xl shadow-white/5 hover:shadow-emerald-500/20"
                        >
                            Lanzar DApp
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden p-2 text-gray-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed inset-0 z-[60] bg-[#050505] pt-24 px-6 lg:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col gap-8 text-3xl font-black uppercase">
                            <a href="#impacto" onClick={() => setIsMenuOpen(false)}>Impacto</a>
                            <a href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Proceso</a>
                            <a href="#tokens" onClick={() => setIsMenuOpen(false)}>Tecnología</a>
                            <button
                                onClick={() => { onEnter(); setIsMenuOpen(false); }}
                                className="w-full py-6 bg-emerald-500 text-white rounded-2xl font-black tracking-widest"
                            >
                                Lanzar DApp
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-100 scale-110 contrast-125 saturate-150 brightness-75"
                    >
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
                                FINANCIA LA <br />
                                <span className="text-emerald-500 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]">NATURALEZA.</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mb-12 leading-relaxed font-semibold drop-shadow-md">
                                Transformamos la conservación en activos digitales. Nuestra plataforma utiliza <span className="text-white border-b border-emerald-500/50">tecnología blockchain</span> para garantizar trazabilidad radical y transparencia absoluta en cada hectárea protegida.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <button
                                    onClick={onEnter}
                                    className="group px-10 py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-[1.05] active:scale-[0.95]"
                                >
                                    LANZAR CONSOLA
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={onDiscovery}
                                    className="group px-10 py-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl font-black text-xl hover:bg-emerald-500 hover:text-white transition-all backdrop-blur-xl flex items-center justify-center gap-3 shadow-2xl"
                                >
                                    MERCADO DE M² <Globe className="group-hover:rotate-12 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-12 bg-white/5 backdrop-blur-sm border-y border-white/10 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-2 font-black text-lg"><Globe size={20} /> AVALANCHE</div>
                        <div className="flex items-center gap-2 font-black text-lg"><Shield size={20} /> RENARE</div>
                        <div className="flex items-center gap-2 font-black text-lg italic">GM HOLDING</div>
                        <div className="flex items-center gap-2 font-black text-lg italic">GM BANK</div>
                        <div className="flex items-center gap-2 font-black text-lg"><Lock size={20} /> DIAN PKI</div>
                        <div className="flex items-center gap-2 font-black text-lg"><Leaf size={20} /> ASOCRIPTON</div>
                    </div>
                </div>
            </section>

            {/* Problem vs Solution Section */}
            <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <ShieldAlert size={120} className="text-white" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black mb-8 text-white italic tracking-tighter uppercase opacity-80">La Problemática</h3>
                            <ul className="space-y-6">
                                {[
                                    { t: "Falta de Transparencia", d: "Los créditos de carbono tradicionales operan en mercados opacos sin visibilidad real del destino final del capital." },
                                    { t: "Doble Contabilidad", d: "La ausencia de registros inmutables permite que un mismo beneficio ambiental sea vendido múltiples veces." },
                                    { t: "Baja Trazabilidad", d: "Es imposible verificar si la hectárea protegida hace 2 años sigue en pie hoy sin una auditoría on-chain." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white uppercase text-sm mb-1">{item.t}</h4>
                                            <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-emerald-500/5 border border-emerald-500/10 p-10 md:p-16 rounded-[3rem] relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <CheckCircle2 size={120} className="text-emerald-500" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black mb-8 text-emerald-500 italic tracking-tighter uppercase">Solución BoT</h3>
                            <ul className="space-y-6">
                                {[
                                    { t: "Inmutabilidad Blockchain", d: "Cada transacción y certificado es un registro público irreversible que garantiza la propiedad única." },
                                    { t: "Auditoría Satelital Inmediata", d: "Conectamos datos de biomasa reales con smart contracts, validando el impacto en tiempo real." },
                                    { t: "Trazabilidad Radical", d: "Desde la adopción inicial hasta la liquidación NFT, cada centavo tiene un rastro digital auditable." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1 text-emerald-500">
                                            <Check size={14} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white uppercase text-sm mb-1">{item.t}</h4>
                                            <p className="text-gray-400 text-xs font-bold leading-relaxed">{item.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section id="impacto" className="relative z-20 -mt-10 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="text-4xl md:text-5xl font-black text-emerald-500">{stat.value}</div>
                                    <div className="text-[10px] md:text-xs text-gray-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="como-funciona" className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">El Ecosystema</h2>
                        <h3 className="text-4xl md:text-7xl font-black">¿Cómo Funciona?</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-[#0a0a0a]/50 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] hover:border-emerald-500/50 transition-all group shadow-2xl"
                            >
                                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                                <h4 className="text-2xl font-black mb-4">{step.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-black text-white/20">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Life Map Discovery Section: Inmersive Design */}
            <section id="mapa-vida" className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
                        <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.5em] italic">Precision Geodata Visualizer</h2>
                        <h3 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">
                            MAPA DE <span className="text-emerald-500">VIDA.</span>
                        </h3>
                        <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed max-w-2xl mx-auto">
                            Tu portal de usabilidad para el eco-token $BoT. Conecta con biomas estratégicos para desbloquear experiencias únicas, NFTs de colección, certificados de impacto y productos de las comunidades protectoras.
                        </p>
                    </div>

                    <div className="relative group p-1 bg-white/5 rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,1)] hover:border-emerald-500/30 transition-all duration-700">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[4rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative bg-black rounded-[3.8rem] overflow-hidden">
                            <LifeMap onDiscovery={onDiscovery} />
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: "Nodos de Red", val: "64,800", sub: "Píxeles Globales" },
                            { label: "Resolución", val: "1.0°", sub: "Grilla Táctica" },
                            { label: "Malla Inmutable", val: "100%", sub: "Auditoría On-Chain" },
                            { label: "Nivel de Impacto", val: "Premium", sub: "Beneficios de Vida" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center space-y-1">
                                <div className="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest">{item.label}</div>
                                <div className="text-3xl font-black text-white italic">{item.val}</div>
                                <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{item.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="legal" className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Seguridad Jurídica & Fiscal</h2>
                            <h3 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Blindaje Legal para tu Empresa</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                                Operamos bajo el marco legal colombiano para transformar tus compensaciones ambientales en beneficios tributarios reales y cumplimiento de ley.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Ley 2173 (Ley del Árbol)", desc: "Cumplimiento automático de la obligación de siembra de 2 árboles por empleado.", law: "Ley 2173 de 2021" },
                                    { title: "Neutralidad de Carbono", desc: "No causación de hasta el 50% del Impuesto Nacional al Carbono.", law: "Decreto 926 de 2017" },
                                    { title: "Descuento de Renta (25%)", desc: "Deducciones fiscales directas por aportes en control y mejoramiento ambiental.", law: "Art. 255/257 Estatuto Tributario" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                            <CheckCircle2 className="text-emerald-400" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-500 font-medium mb-1">{item.desc}</p>
                                            <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">{item.law}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[150px] rounded-full" />
                            <div className="relative bg-[#0a0a0a] border border-white/10 p-12 rounded-[3rem] shadow-2xl">
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                        <div className="text-2xl font-black italic tracking-tighter uppercase">Bóveda Inmutable</div>
                                        <Lock className="text-emerald-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                        Cada liquidación genera un registro permanente en la billetera corporativa, actuando como un Certificado NFT de mitigación.
                                    </p>
                                    <div className="space-y-4">
                                        <div
                                            onClick={() => setShowCert(certificateMockups.carbon)}
                                            className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer"
                                        >
                                            <div className="text-xs font-bold font-mono">RET-NFT-BoT-2024.cert</div>
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        </div>
                                        <div
                                            onClick={() => setShowCert(certificateMockups.tree)}
                                            className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer"
                                        >
                                            <div className="text-xs font-bold font-mono">LEY-2173-PROOF.cert</div>
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between opacity-40">
                                            <div className="text-xs font-bold font-mono">FUTURE_ASSET_VAULT.cert</div>
                                            <Lock size={16} />
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all">Ver mi Registro On-Chain →</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 text-center">Nuestra Hoja de Ruta</h2>
                    <h3 className="text-4xl md:text-7xl font-black mb-12 italic tracking-tighter uppercase max-w-5xl mx-auto">
                        Más allá del Carbono: <span className="text-emerald-500">Créditos de Naturaleza</span>
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Bio-Créditos", desc: "Unidades de biodiversidad que financian la protección de especies en peligro como el Jaguar y el Delfín Rosado.", icon: <Zap className="text-emerald-500" /> },
                            { title: "Santuarios de Vida", desc: "Refugios en predios originadores para animales rescatados, integrando proyectos productivos éticos que financian hogares dignos y regeneración biológica.", icon: <Heart className="text-emerald-500" /> },
                            { title: "Habilitación Hídrica", desc: "Tokenización de cuencas protegidas para garantizar agua limpia y seguridad alimentaria a comunidades locales.", icon: <Globe className="text-emerald-500" /> }
                        ].map((v, i) => (
                            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all text-center group">
                                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform">{v.icon}</div>
                                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">{v.title}</h4>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 container mx-auto px-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_30px_60px_rgba(16,185,129,0.2)]">
                    <div className="absolute inset-0 opacity-10 blur-3xl bg-white rounded-full scale-150 rotate-45 -translate-y-1/2" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">Protege la Selva Hoy</h2>
                        <p className="text-lg md:text-2xl mb-12 font-bold text-emerald-100">
                            Únete a las empresas líderes que ya están transformando su impacto ambiental en activos digitales de valor real.
                        </p>
                        <button
                            onClick={onEnter}
                            className="px-12 py-6 bg-white text-emerald-700 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 mx-auto"
                        >
                            INGRESAR A LA CONSOLA
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Oficial Bank of Tierras */}
            <footer className="border-t border-white/5 py-20 bg-[#0a0a0a]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        {/* Columna 1: Descripción */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <img src={logoBot} className="h-10 brightness-0 invert opacity-90" alt="Bank of Tierras" />
                            </div>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                Únete a nuestra plataforma y compensa el daño que causamos al planeta adoptando árboles y metros cuadrados de tierra; juntos protegeremos cualquier forma de vida. ¡Haz parte TÚ también!
                            </p>
                        </div>

                        {/* Columna 2: Registros Legales */}
                        <div className="space-y-4">
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Estamos Constituidos Por</h4>
                            <ul className="space-y-3 text-gray-500 text-xs font-medium">
                                <li>• ESCRITURA PÚBLICA No.6476 de la Notaria Segunda de Manizales – Caldas</li>
                                <li>• MATRÍCULA DE CÁMARA DE COMERCIO No.142382 de Manizales – Caldas</li>
                                <li>• MATRÍCULA DE INDUSTRIA Y COMERCIO No.50853 de Manizales – Caldas</li>
                                <li>• REGISTRO ISBN 93877</li>
                                <li>• REGISTRO DNDA 10-366.478</li>
                                <li>• REGISTRO DE LA DIAN (Dirección de Impuestos y Aduana Nacionales) con NIT No.900384867-0</li>
                                <li>• REGISTRO Superintendencia de Industria Y comercio 708495 Marca Mixta BANK OF TIERRAS DE COLOMBIA</li>
                                <li>• REGISTRO Protección Internacional del derecho de autor y de los derechos conexos 10629</li>
                            </ul>
                        </div>

                        {/* Columna 3: Enlaces y Redes */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-white font-black text-sm uppercase tracking-widest">Modelos de Negocios</h4>
                                <div className="flex flex-col gap-3 text-gray-400 text-sm font-medium">
                                    <a href="#" className="hover:text-emerald-500 transition-colors">MI ECOTOKEN</a>
                                    <a href="#" className="hover:text-emerald-500 transition-colors">FUNAC</a>
                                    <a href="#" className="hover:text-emerald-500 transition-colors">PENSILVANIA</a>
                                    <a href="#" className="hover:text-emerald-500 transition-colors">BLOG</a>
                                    <a href="#" className="hover:text-emerald-500 transition-colors">CONTACTO</a>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <h4 className="text-white font-black text-sm uppercase tracking-widest">Síguenos</h4>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/bankoftierrasdecolombia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 transition-all group">
                                        <Instagram className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                                    </a>
                                    <a href="https://x.com/BANKOFTIERRAS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 transition-all group">
                                        <Twitter className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                                    </a>
                                    <a href="https://www.facebook.com/bankoftierras.decolombia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 transition-all group">
                                        <Facebook className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                                    </a>
                                    <a href="https://www.youtube.com/@bankoftierrasdecolombia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 transition-all group">
                                        <Youtube className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selector de Idioma / País */}
                    <div className="py-8 border-t border-white/5">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="space-y-2">
                                <h4 className="text-white font-black text-xs uppercase tracking-widest">Descarga la App Bank of Tierras</h4>
                                <div className="flex gap-3">
                                    <a href="#" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-xs font-bold">
                                        App Store
                                    </a>
                                    <a href="#" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-xs font-bold">
                                        Google Play
                                    </a>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-black text-xs uppercase tracking-widest text-center md:text-right">Seleccione el País</h4>
                                <select className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all">
                                    <option value="co">🇨🇴 Colombia</option>
                                    <option value="us">🇺🇸 United States</option>
                                    <option value="mx">🇲🇽 México</option>
                                    <option value="es">🇪🇸 España</option>
                                    <option value="br">🇧🇷 Brasil</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-600 text-xs font-medium">
                            © 2025 Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Modal Certificate */}
            <AnimatePresence>
                {showCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
                        onClick={() => setShowCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            className="bg-white text-black p-10 md:p-12 rounded-[2rem] max-w-xl w-full relative shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-gray-100"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-8">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Blockchain Asset</div>
                                    <div className="text-xl font-black italic tracking-tighter">BANK OF TIERRAS</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">ID Certificado</div>
                                    <div className="text-sm font-mono font-bold">{showCert.id}</div>
                                </div>
                            </div>

                            <div className="text-center mb-10">
                                <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="text-emerald-600" size={40} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 leading-none">{showCert.title}</h2>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{showCert.type}</p>
                            </div>

                            <div className="space-y-6 mb-10 bg-gray-50 p-6 rounded-2xl">
                                <div>
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Sujeto Pasivo / Empresa</div>
                                    <div className="font-bold text-lg uppercase leading-none">{showCert.company}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Cantidad</div>
                                        <div className="font-black text-xl text-emerald-600 leading-none">{showCert.amount}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Estado On-Chain</div>
                                        <div className="font-black text-sm uppercase text-gray-600 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Verificado
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] uppercase font-black text-gray-400 mb-8 leading-relaxed text-center">
                                {showCert.desc}
                            </p>

                            <button
                                onClick={() => setShowCert(null)}
                                className="w-full py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
                            >
                                Descargar Modelo PDF
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LandingPage;
