import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Leaf, BarChart3, ArrowRight, CheckCircle2, Globe, Menu, X, Rocket, Lock, Zap } from 'lucide-react';

const LandingPage = ({ onEnter }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const features = [
        {
            icon: <Shield className="w-8 h-8 text-emerald-500" />,
            title: "Trazabilidad Radical",
            desc: "Cada tonelada está vinculada a un NFT con coordenadas GPS y hash legal inmutable en IPFS."
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
            title: "Optimización Fiscal",
            desc: "Certificados de retiro diseñados para el cumplimiento del Impuesto al Carbono en Colombia."
        },
        {
            icon: <Globe className="w-8 h-8 text-emerald-500" />,
            title: "Impacto Directo",
            desc: "El capital fluye directamente a las comunidades indígenas sin brokers tradicionales."
        }
    ];

    const stats = [
        { label: "Área Protegida", value: "50,000 Ha" },
        { label: "CO2 Capturado", value: "1.2M Tons" },
        { label: "Comunidades", value: "24+" },
        { label: "Transacciones", value: "O.OOs" }
    ];

    const steps = [
        { title: "Originación", desc: "Comunidades locales registran áreas de conservación mediante NFTs.", icon: <Leaf /> },
        { title: "Auditoría", desc: "Expertos verifican la biomasa y emiten certificados digitales.", icon: <Shield /> },
        { title: "Tokenización", desc: "Se emiten créditos de carbono fungibles (ERC-20).", icon: <Zap /> },
        { title: "Compensación", desc: "Empresas retiran créditos para beneficios tributarios.", icon: <Lock /> }
    ];

    return (
        <div className="relative bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                            <Leaf className="text-white w-6 h-6" />
                        </div>
                        <span className="text-lg md:text-xl font-black tracking-tight uppercase">
                            Amazonas<span className="text-emerald-500 font-black">CERO</span>
                        </span>
                    </div>

                    {/* Desktop Menu - Hidden on mobile/tablet */}
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="flex items-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <a href="#impacto" className="hover:text-emerald-500 transition-colors">Impacto</a>
                            <a href="#como-funciona" className="hover:text-emerald-500 transition-colors">Proceso</a>
                            <a href="#tokens" className="hover:text-emerald-500 transition-colors">Tecnología</a>
                        </div>
                        <button
                            onClick={onEnter}
                            className="px-6 py-3 bg-white text-black rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 font-black uppercase text-xs tracking-widest shadow-xl shadow-white/5 hover:shadow-emerald-500/20"
                        >
                            Lanzar DApp
                        </button>
                    </div>

                    {/* Mobile Menu Toggle - Only visible on lg:hidden */}
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
                {/* Hero Video / Visual */}
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
                    {/* Multi-layer Overlays - Adjusted for better visibility */}
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
                            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                                <Rocket size={14} />
                                Avalanche Mainnet • Real-World Assets
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
                                PROTEGE EL <span className="text-emerald-500 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]">AMAZONAS</span> <br />
                                CON WEB3.
                            </h1>
                            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-12 leading-relaxed font-semibold drop-shadow-md">
                                Tokenizamos la conservación. Nuestra plataforma conecta directamente a guardianes de la selva con empresas globales para optimización fiscal y trazabilidad radical.
                            </p>
                            <div className="flex flex-col sm:row gap-6">
                                <button
                                    onClick={onEnter}
                                    className="group px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.4)] hover:scale-[1.05] active:scale-[0.95]"
                                >
                                    EMPEZAR AHORA
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-10 py-5 bg-white/10 border border-white/20 rounded-2xl font-black text-xl hover:bg-white/20 transition-all backdrop-blur-xl">
                                    CONOCER MÁS
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-12 bg-white/5 backdrop-blur-sm border-y border-white/10 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-2 font-black text-xl"><Globe size={24} /> AVALANCHE</div>
                        <div className="flex items-center gap-2 font-black text-xl"><Shield size={24} /> RENARE</div>
                        <div className="flex items-center gap-2 font-black text-xl"><Lock size={24} /> DIAN PKI</div>
                        <div className="flex items-center gap-2 font-black text-xl"><Leaf size={24} /> ASOCRIPTON</div>
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

            {/* Features (Grid) */}
            <section id="tokens" className="py-32 bg-emerald-500/5 border-y border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {features.map((feature, i) => (
                            <div key={i} className="flex flex-col gap-6 items-center text-center">
                                <div className="p-6 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20 shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black mb-4">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm font-medium">{feature.desc}</p>
                                </div>
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
                        <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight">¿LISTO PARA COMPENSAR TU HUELLA?</h2>
                        <button
                            onClick={onEnter}
                            className="px-12 py-6 bg-white text-emerald-600 rounded-2xl font-black text-xl hover:scale-110 active:scale-95 transition-all shadow-2xl"
                        >
                            ACCEDER A LA DAPp
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                <Leaf className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg font-black tracking-tight">AMAZONAS<span className="text-emerald-500">CERO</span></span>
                        </div>
                        <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <a href="#">Privacidad</a>
                            <a href="#">Términos</a>
                            <a href="#">Documentación</a>
                        </div>
                        <div className="text-gray-600 text-[10px] font-bold">
                            © 2026 AMAZONAS CERO • COLOMBIA • BUILT ON AVALANCHE
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default LandingPage;
