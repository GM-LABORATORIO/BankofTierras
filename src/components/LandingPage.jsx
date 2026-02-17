import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useScroll, useTransform } from 'framer-motion';
import {
    Leaf,
    ArrowRight,
    CheckCircle2,
    Globe,
    Menu,
    X,
    Activity,
    ShieldCheck,
    Hexagon,
    TrendingUp,
    Zap,
    Lock,
    Eye,
    ChevronRight,
    Search,
    CreditCard,
    Cpu,
    Database,
    Store,
    ArrowUpRight,
    Users,
    Building2
} from 'lucide-react';

const Card3DFlippable = ({ scrollYProgress }) => {
    // Rotation maps from 0 to 180 degrees based on scroll
    const rotateY = useTransform(scrollYProgress, [0.2, 0.8], [0, 180]);
    // Perspective and tilt for realism
    const perspective = 2000;

    return (
        <div className="relative w-full max-w-xl aspect-[1.58/1] perspective-[2000px] pointer-events-auto cursor-pointer group">
            <motion.div
                style={{
                    rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "2000px"
                }}
                className="relative w-full h-full duration-500 ease-out"
            >
                {/* FRONT FACE */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] overflow-hidden border border-white/10"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <img
                        src="/assets/co2pay_front.png"
                        alt="CO2Pay Card Front"
                        className="w-full h-full object-cover"
                    />
                    {/* Gloss Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* BACK FACE */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] overflow-hidden border border-white/10"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: "rotateY(180deg)"
                    }}
                >
                    <img
                        src="/assets/co2pay_back.png"
                        alt="CO2Pay Card Back"
                        className="w-full h-full object-cover"
                    />
                    {/* Gloss Effect */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            </motion.div>
        </div>
    );
};

const LandingPage = ({ onEnter }) => {
    const { t, language, setLanguage } = useLanguage();
    const { isDark, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showWhitepaper, setShowWhitepaper] = useState(false);
    const [activeWhitepaperTab, setActiveWhitepaperTab] = useState('ES');

    const sectionRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"]
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'vision', label: t('landing.nav.vision') },
        { id: 'assets', label: t('landing.nav.assets') },
        { id: 'reputation', label: t('landing.nav.reputation') },
        { id: 'infrastructure', label: t('landing.nav.infrastructure') },
        { id: 'subnet', label: t('landing.nav.sovereignty') }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-inter selection:bg-emerald-500/30 overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>

            {/* 1. Header (Institutional Dark) */}
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
                <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

                    {/* Brand */}
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-11 h-11 bg-emerald-500 flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-105">
                            <Hexagon size={26} className="text-black fill-black/20" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-black text-white tracking-tighter leading-none">CLIMATE PASS EXCHANGE</span>
                            <span className="text-[7px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none mt-1.5 opacity-80">{t('landing.hero.badge')}</span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden xl:flex items-center gap-12">
                        {navItems.map(item => (
                            <button key={item.id} className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-white transition-colors">
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Meta Actions */}
                    <div className="hidden lg:flex items-center gap-8">
                        <button
                            onClick={() => {
                                setActiveWhitepaperTab(language.toUpperCase());
                                setShowWhitepaper(true);
                            }}
                            className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] hover:text-emerald-500 transition-colors border-l border-white/10 pl-8"
                        >
                            {t('landing.nav.whitepaper')}
                        </button>
                        <div className="flex gap-4">
                            {['ES', 'EN', 'AR'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang.toLowerCase())}
                                    className={`text-[10px] font-black tracking-widest w-8 h-8 rounded-full border border-white/5 flex items-center justify-center transition-all ${language === lang.toLowerCase() ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <button onClick={onEnter} className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-emerald-500 transition-all flex items-center gap-2 text-nowrap">
                            {t('landing.hero.cta_terminal')} <Search size={14} />
                        </button>
                    </div>

                    <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] lg:hidden"
                                onClick={() => setIsMenuOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 bottom-0 w-80 bg-black border-l border-white/10 z-[95] lg:hidden overflow-y-auto"
                            >
                                <div className="p-8 space-y-8">
                                    <div className="flex items-center justify-between mb-12">
                                        <span className="text-sm font-black text-white uppercase tracking-widest">Menu</span>
                                        <button onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {/* Language Selector */}
                                    <div className="space-y-3">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Language</span>
                                        <div className="flex gap-3">
                                            {['ES', 'EN', 'AR'].map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => {
                                                        setLanguage(lang.toLowerCase());
                                                        setIsMenuOpen(false);
                                                    }}
                                                    className={`text-xs font-black tracking-widest px-4 py-2 rounded-lg border transition-all ${language === lang.toLowerCase() ? 'bg-emerald-500 text-black border-emerald-500' : 'text-white/60 border-white/10 hover:text-white hover:border-white/30'}`}
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <nav className="space-y-4 pt-8 border-t border-white/10">
                                        {navItems.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                                    setIsMenuOpen(false);
                                                }}
                                                className="block w-full text-left text-sm font-black text-white/60 uppercase tracking-widest hover:text-emerald-500 transition-colors py-2"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Actions */}
                                    <div className="space-y-4 pt-8 border-t border-white/10">
                                        <button
                                            onClick={() => {
                                                setActiveWhitepaperTab(language.toUpperCase());
                                                setShowWhitepaper(true);
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-left text-sm font-black text-white/60 uppercase tracking-widest hover:text-emerald-500 transition-colors py-2"
                                        >
                                            {t('landing.nav.whitepaper')}
                                        </button>
                                        <button
                                            onClick={() => {
                                                onEnter();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full px-6 py-4 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            {t('landing.hero.cta_terminal')} <Search size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>

            {/* 2. Hero Section (Global Impact Terminal) */}
            <section className="relative min-h-[90vh] bg-black flex items-center pt-24 overflow-hidden">
                {/* Background Dynamic Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/hero-v3.png"
                        alt="Global Data Signals"
                        className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-110 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
                </div>

                <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Primary Message */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-8 backdrop-blur-md">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t('landing.hero.badge')}</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-6 sm:mb-8">
                                {t('landing.hero.title_part1')} <br />
                                <span className="text-emerald-500 uppercase">{t('landing.hero.title_part2')}</span><br />
                                <span className="uppercase">{t('landing.hero.title_part3')}</span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-medium max-w-xl mb-8 sm:mb-12 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
                                {t('landing.hero.desc')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button onClick={onEnter} className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-emerald-500 text-black text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-sm hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)]">
                                    {t('landing.hero.cta_terminal')}
                                </button>
                                <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-sm hover:bg-white/10 transition-all backdrop-blur-md">
                                    {t('landing.hero.cta_portfolio')}
                                </button>
                            </div>
                        </motion.div>

                        {/* Right: Live Signal Terminal (Visual Power) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-5 hidden lg:block"
                        >
                            <div className="bg-neutral-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('landing.hero.signals_label')}</span>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { label: t('landing.hero.stats.inventory'), value: "2,000,000.00 T", color: "emerald" },
                                        { label: t('landing.hero.stats.sovereign'), value: "CPX On-Chain", color: "white" },
                                        { label: t('landing.hero.stats.gas'), value: "840,210 $SIGNAL", color: "emerald" },
                                        { label: t('landing.hero.stats.throughput'), value: "4.2 T/sec", color: "emerald" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</span>
                                            <span className={`text-xl font-black italic tracking-tighter text-${stat.color === 'emerald' ? 'emerald-500' : stat.color === 'white' ? 'white' : 'gray-400'}`}>
                                                {stat.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                    <div className="flex items-center gap-4">
                                        <Activity className="text-emerald-500 animate-pulse" size={20} />
                                        <div>
                                            <div className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">{t('landing.hero.stats.latest')}</div>
                                            <div className="text-[10px] font-bold text-white tracking-widest truncate">0x4F...E892 • 25.40kg $CARBON</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Global Ribbon */}
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-white/5 py-3 sm:py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                        <div className="flex gap-4 sm:gap-8 md:gap-12 text-[8px] sm:text-[9px] font-black text-emerald-500/60 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                            <span className="flex items-center gap-1 sm:gap-2 underline underline-offset-4 Decoration-emerald-500/20">{t('landing.hero.ribbon.certified')}</span>
                            <span className="hidden sm:block">{t('landing.hero.ribbon.region')}</span>
                            <span className="hidden lg:block">{t('landing.hero.ribbon.custody')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-[8px] sm:text-[9px] font-black text-white uppercase tracking-widest mr-2 sm:mr-4">{t('landing.hero.ribbon.partner')}</div>
                            <span className="text-xs font-black text-white italic">CO2Pay™</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Partner Marquee */}
            <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 italic">{t('landing.hero.ribbon.partner')} & {t('landing.footer.columns.compliance')}</p>
                    <div className="flex justify-around items-center opacity-40 grayscale group hover:grayscale-0 transition-all gap-12 flex-wrap">
                        <div className="flex flex-col items-center gap-2">
                            <Hexagon size={40} className="text-black" />
                            <span className="text-[10px] font-black tracking-widest">ColCX</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <CreditCard size={40} className="text-black" />
                            <span className="text-[10px] font-black tracking-widest">CO2Pay™</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Globe size={40} className="text-black" />
                            <span className="text-[10px] font-black tracking-widest">AMAZONAS GOV</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 border-r border-slate-200 pr-12 mr-12">
                            <Activity size={40} className="text-black" />
                            <span className="text-[10px] font-black tracking-widest">RECO2NET</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Zap size={40} className="text-black" />
                            <span className="text-[10px] font-black tracking-widest uppercase italic">GM Holding</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <ShieldCheck size={40} className="text-black" />
                            <span className="text-[10px] font-black tracking-widest">VERIFIED ASSET</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Climate Pass™ Infrastructure */}
            <section id="infrastructure" className="py-16 sm:py-24 md:py-32 bg-slate-50/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
                        <div>
                            <div className="mb-8 sm:mb-12">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-6 sm:mb-8">{t('landing.infrastructure.title_part1')}<br /><span className="text-emerald-500">{t('landing.infrastructure.title_part2')}</span></h2>
                                <p className="text-base sm:text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-6 sm:mb-10">
                                    {t('landing.infrastructure.desc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="p-6 sm:p-8 md:p-10 bg-slate-50 rounded-[2rem] sm:rounded-[3rem] border border-slate-200 group hover:border-emerald-500/30 transition-all">
                                    <Cpu className="text-emerald-500 mb-4 sm:mb-6" size={40} />
                                    <h4 className="text-base sm:text-lg font-black uppercase tracking-widest mb-2 sm:mb-3">{t('landing.infrastructure.csu_title')}</h4>
                                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed italic">{t('landing.infrastructure.csu_desc')}</p>
                                </div>
                                <div className="p-6 sm:p-8 md:p-10 bg-black rounded-[2rem] sm:rounded-[3rem] text-white">
                                    <Database className="text-emerald-500 mb-4 sm:mb-6" size={40} />
                                    <h4 className="text-base sm:text-lg font-black uppercase tracking-widest mb-2 sm:mb-3">{t('landing.infrastructure.memory_title')}</h4>
                                    <p className="text-xs sm:text-sm text-gray-400 font-bold leading-relaxed italic">{t('landing.infrastructure.memory_desc')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 bg-slate-50 p-12 rounded-[4rem] border border-slate-200">
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 italic">{t('landing.infrastructure.ecosystem_title')}</h3>
                            {[
                                { title: t('landing.infrastructure.citizenship.title'), role: t('landing.infrastructure.citizenship.role'), desc: t('landing.infrastructure.citizenship.desc') },
                                { title: t('landing.infrastructure.steward.title'), role: t('landing.infrastructure.steward.role'), desc: t('landing.infrastructure.steward.desc') },
                                { title: t('landing.infrastructure.partner.title'), role: t('landing.infrastructure.partner.role'), desc: t('landing.infrastructure.partner.desc') }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-8 group hover:scale-[1.02] transition-all">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                                        <CheckCircle2 className="text-emerald-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black uppercase tracking-tighter mb-1">{item.title}</h4>
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">{item.role}</p>
                                        <p className="text-xs text-slate-500 font-medium italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 💳 CO2PAY SECTION (Restored) */}
            <section ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <Card3DFlippable scrollYProgress={scrollYProgress} />
                        </div>
                        <div className="order-1 lg:order-2">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4 block"
                            >
                                {t('landing.co2pay.badge')}
                            </motion.span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic">
                                {t('landing.co2pay.title_part1')}<br />
                                <span className="text-emerald-500">{t('landing.co2pay.title_part2')}</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 italic border-l-2 border-emerald-500/30 pl-8">
                                {t('landing.co2pay.desc')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                                <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100">
                                    <div className="text-xl sm:text-2xl font-black text-slate-950 mb-2">{t('landing.co2pay.rewards')}</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest italic">{t('landing.co2pay.rewards_desc')}</div>
                                </div>
                                <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100">
                                    <div className="text-xl sm:text-2xl font-black text-slate-950 mb-2">{t('landing.co2pay.access')}</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest italic">{t('landing.co2pay.access_desc')}</div>
                                </div>
                            </div>

                            <button className="w-full lg:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-xl hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-3 sm:gap-4 group shadow-xl">
                                {t('landing.co2pay.cta')} <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            </section>

            {/* 🛡️ ALLIED PERKS & EXCLUSIVE BENEFITS GRID (Phase 35) */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4 block"
                        >
                            {t('landing.benefits.badge')}
                        </motion.span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
                            {t('landing.benefits.title_part1')} <br /><span className="text-emerald-500">{t('landing.benefits.title_part2')}</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                tier: t('landing.benefits.executive.tier'),
                                icon: <Building2 className="text-emerald-500" />,
                                benefits: t('landing.benefits.executive.benefits', { returnObjects: true }),
                                color: "slate-950",
                                textColor: "white"
                            },
                            {
                                tier: t('landing.benefits.merchant.tier'),
                                icon: <Store className="text-emerald-500" />,
                                benefits: t('landing.benefits.merchant.benefits', { returnObjects: true }),
                                color: "white",
                                textColor: "slate-900"
                            },
                            {
                                tier: t('landing.benefits.citizen.tier'),
                                icon: <Users className="text-emerald-500" />,
                                benefits: t('landing.benefits.citizen.benefits', { returnObjects: true }),
                                color: "emerald-500",
                                textColor: "slate-950"
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className={`p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-xl border border-slate-200 bg-${card.color} text-${card.textColor} relative overflow-hidden group`}
                            >
                                {card.color === 'slate-950' && <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10"><Zap size={60} className="sm:w-20 sm:h-20" /></div>}
                                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-${card.color === 'white' ? 'slate-50' : 'white/5'} border border-${card.color === 'white' ? 'slate-100' : 'white/10'}`}>
                                        {card.icon}
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-black uppercase tracking-tighter italic">{card.tier}</h4>
                                </div>
                                <ul className="space-y-4 sm:space-y-6">
                                    {Array.isArray(card.benefits) && card.benefits.map((b, j) => (
                                        <li key={j} className="flex items-start gap-2 sm:gap-3">
                                            <CheckCircle2 size={14} className="sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0 mt-1" />
                                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-80">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/20">
                                    <button className={`w-full py-3 sm:py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${card.color === 'slate-950' ? 'bg-emerald-500 text-black hover:bg-white' : 'bg-slate-900 text-white hover:bg-emerald-500 hover:text-black'}`}>
                                        {t('landing.benefits.cta')}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Sovereign Grid Architecture: CPX ON-CHAIN */}
            <section id="subnet" className="py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-12 text-center mb-16">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 uppercase">{t('landing.sovereignty.title_part1')}<br /><span className="text-emerald-500">{t('landing.sovereignty.title_part2')}</span></h2>
                            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto italic leading-relaxed">
                                {t('landing.sovereignty.desc')}
                            </p>
                        </div>

                        <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
                            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md hover:border-emerald-500/30 transition-all">
                                <Zap className="text-emerald-500 mb-6" size={40} />
                                <h4 className="text-lg font-black uppercase tracking-widest mb-3">{t('landing.sovereignty.token_title')}</h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic pr-4">{t('landing.sovereignty.token_desc')}</p>
                            </div>
                            <div className="p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-[3rem] backdrop-blur-md hover:border-emerald-500/40 transition-all">
                                <ShieldCheck className="text-emerald-500 mb-6" size={40} />
                                <h4 className="text-lg font-black uppercase tracking-widest mb-3">{t('landing.sovereignty.compliance_title')}</h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic pr-4">{t('landing.sovereignty.compliance_desc')}</p>
                            </div>
                            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md hover:border-emerald-500/30 transition-all">
                                <Globe className="text-emerald-500 mb-6" size={40} />
                                <h4 className="text-lg font-black uppercase tracking-widest mb-3">{t('landing.sovereignty.mesh_title')}</h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic pr-4">{t('landing.sovereignty.mesh_desc')}</p>
                            </div>
                            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md hover:border-emerald-500/30 transition-all">
                                <Cpu className="text-emerald-500 mb-6" size={40} />
                                <h4 className="text-lg font-black uppercase tracking-widest mb-3">{t('landing.sovereignty.ux_title')}</h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic pr-4">{t('landing.sovereignty.ux_desc')}</p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-[4rem] p-12 relative group overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">{t('landing.sovereignty.bridge_title')}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-bold italic mb-10">
                                {t('landing.sovereignty.bridge_desc')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest py-3 border-b border-white/5">
                                    <span>{t('landing.sovereignty.stats.speed')}</span>
                                    <span className="text-emerald-500">{"< 1.0s"}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest py-3 border-b border-white/5">
                                    <span>{t('landing.sovereignty.stats.guarantee')}</span>
                                    <span className="text-emerald-500">{t('landing.sovereignty.stats.atomic')}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest py-3">
                                    <span>{t('landing.sovereignty.stats.structure')}</span>
                                    <span className="text-emerald-500">Global Mesh</span>
                                </div>
                            </div>
                            <div className="mt-12 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. The Exponential Model (Silent Onboarding & Retail) */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl relative">
                                <div className="absolute top-8 right-8 text-emerald-500/20"><Activity size={64} /></div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-10 italic">{t('landing.model.step_title')}</h3>

                                <div className="space-y-12">
                                    {[
                                        { step: "01", title: t('landing.model.steps.0.title'), desc: t('landing.model.steps.0.desc') },
                                        { step: "02", title: t('landing.model.steps.1.title'), desc: t('landing.model.steps.1.desc') },
                                        { step: "03", title: t('landing.model.steps.2.title'), desc: t('landing.model.steps.2.desc') }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <span className="text-2xl font-black text-emerald-500 italic leading-none">{item.step}</span>
                                            <div>
                                                <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h4>
                                                <p className="text-sm text-slate-500 font-bold italic leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">{t('landing.model.main_title_part1')} <br /> <span className="text-emerald-500">{t('landing.model.main_title_part2')}</span></h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 italic">
                                {t('landing.model.main_desc')}
                            </p>
                            <div className="flex gap-4">
                                <div className="px-6 py-4 bg-black text-white rounded-2xl flex items-center gap-4 border border-white/10 group cursor-pointer hover:bg-emerald-500 hover:text-black transition-all">
                                    <Store size={24} />
                                    <div>
                                        <div className="text-xs font-black uppercase">{t('landing.model.cta_merchant')}</div>
                                        <div className="text-[10px] font-bold text-gray-500 group-hover:text-black italic uppercase">{t('landing.model.cta_badge')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Fractional Market (1:1,000,000) */}
            <section id="assets" className="py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute left-0 top-0 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{t('landing.fractional.title')}</h2>
                        <p className="text-xl text-emerald-500 font-black italic uppercase tracking-[0.2em]">{t('landing.fractional.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-10">
                            <div className="flex gap-8">
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex-shrink-0 flex items-center justify-center text-black">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-3">{t('landing.fractional.item1_title')}</h4>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed italic pr-12">
                                        {t('landing.fractional.item1_desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-3">{t('landing.fractional.item2_title')}</h4>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed italic pr-12">
                                        {t('landing.fractional.item2_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 flex flex-col items-center text-center">
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">{t('landing.fractional.stock_badge')}</div>
                            <div className="text-7xl font-black italic tracking-tighter leading-none mb-4">2,000,000</div>
                            <div className="text-2xl font-black text-white italic tracking-tighter uppercase mb-10">{t('landing.fractional.stock_title')}</div>
                            <div className="flex gap-4">
                                <button onClick={onEnter} className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-md">{t('landing.fractional.cta_buy')}</button>
                                <button className="px-8 py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-md italic">{t('landing.fractional.cta_verify')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Global Leaders Preview */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">{t('landing.leaders.title_part1')} <span className="text-emerald-500">{t('landing.leaders.title_part2')}</span></h2>
                            <p className="text-xl text-slate-500 font-medium italic">{t('landing.leaders.desc')}</p>
                        </div>
                        <button onClick={onEnter} className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-3 group">
                            {t('landing.leaders.cta_all')} <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: t('landing.leaders.categories.0.title'), icon: <Building2 size={24} />, players: t('landing.leaders.categories.0.players', { returnObjects: true }) },
                            { title: t('landing.leaders.categories.1.title'), icon: <Store size={24} />, players: t('landing.leaders.categories.1.players', { returnObjects: true }) },
                            { title: t('landing.leaders.categories.2.title'), icon: <Users size={24} />, players: t('landing.leaders.categories.2.players', { returnObjects: true }) }
                        ].map((category, i) => (
                            <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 italic">
                                        {category.icon}
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-tighter italic">{category.title}</h4>
                                </div>
                                <div className="space-y-4">
                                    {category.players.map((p, j) => (
                                        <div key={j} className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-slate-400 italic">0{j + 1} <span className="text-slate-800 ml-2">{p}</span></span>
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">{t('marketplace.live')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Legal & Purpose */}
            <section className="py-20 bg-slate-50/50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl font-black mb-6 italic tracking-tight uppercase">{t('landing.footer.desc')}</h2>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                            {t('landing.sovereignty.desc')}
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-[40px] font-black text-slate-800 leading-none tracking-tighter">$80,000,000</div>
                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t('landing.hero.badge')}</div>
                    </div>
                </div>
            </section>


            {/* 9. Master Institutional Footer */}
            <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-emerald-500/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                        {/* Brand Column */}
                        <div className="col-span-2 lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                    <Globe className="text-black" size={24} />
                                </div>
                                <span className="text-xl font-black tracking-tighter uppercase italic">Climate Pass <br /><span className="text-emerald-500">Exchange</span></span>
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed italic max-w-sm">
                                {t('landing.footer.desc')}
                            </p>
                            <div className="flex gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-emerald-500/10 cursor-pointer transition-all">
                                    <Users size={18} className="text-emerald-500" />
                                </div>
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-emerald-500/10 cursor-pointer transition-all">
                                    <Store size={18} className="text-emerald-500" />
                                </div>
                            </div>
                        </div>

                        {/* Ecosystem */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">{t('landing.footer.columns.ecosystem')}</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-400 italic">
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.marketplace')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.subnet')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.co2pay')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.score')}</li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">{t('landing.footer.columns.resources')}</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-400 italic">
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.whitepaper')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.devs')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.media')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.registry')}</li>
                            </ul>
                        </div>

                        {/* Regulatory */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">{t('landing.footer.columns.compliance')}</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-400 italic">
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.legal')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.kyc')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.vesting')}</li>
                                <li className="hover:text-white cursor-pointer transition-colors">{t('landing.footer.columns.audit')}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-wrap justify-center gap-6 text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">
                            <span>CPX-PROTOCOL-MAINNET-CORE</span>
                            <span className="text-emerald-500/50">•</span>
                            <span>© 2026 Climate Pass Exchange</span>
                            <span className="text-emerald-500/50">•</span>
                            <span>Powered by Avalanche Evergreen</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{t('landing.footer.status')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* 📄 WHITEPAPER MODAL (Trilingual Phase 25) */}
            <AnimatePresence>
                {showWhitepaper && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[250] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
                        onClick={() => setShowWhitepaper(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white w-full max-w-6xl h-[90vh] rounded-[4rem] overflow-hidden flex flex-col shadow-2xl border-[8px] border-slate-900/10"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="bg-slate-950 text-emerald-500 p-3 rounded-2xl">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tighter italic">{t('landing.whitepaper.modal_title')}</h3>
                                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('landing.whitepaper.date')}</div>
                                    </div>
                                </div>
                                <div className="flex bg-slate-200 p-1 rounded-xl">
                                    {['ES', 'EN', 'AR'].map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                setActiveWhitepaperTab(lang);
                                                setLanguage(lang.toLowerCase());
                                            }}
                                            className={`px-4 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all ${activeWhitepaperTab === lang ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Content Preview */}
                            <div className="flex-1 overflow-y-auto p-12 md:p-20 font-inter">
                                <div className="max-w-3xl mx-auto space-y-12">
                                    <div className="space-y-4">
                                        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                                            {t('landing.whitepaper.manifesto_title')}
                                        </h1>
                                        <p className="text-lg text-slate-500 font-bold italic leading-relaxed border-l-4 border-emerald-500 pl-8">
                                            {t('landing.whitepaper.manifesto_desc')}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 py-10 border-y border-slate-100">
                                        <div className="space-y-2">
                                            <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Protocol Standard</div>
                                            <div className="text-sm font-black italic">Evergreen / Native CPX Signal</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Compliance</div>
                                            <div className="text-sm font-black italic italic">CertiK Audited • ColCX Certified</div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-2xl font-black uppercase tracking-tighter italic">{t('landing.whitepaper.abstract_title')}</h4>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {t('landing.co2pay.desc')}
                                        </p>
                                    </div>

                                    <div className="p-10 bg-slate-50 rounded-[3rem] text-center border border-slate-100 italic">
                                        [Institutional document visualization active. Full PDF available in Terminal Assets]
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50">
                                <button
                                    onClick={() => setShowWhitepaper(false)}
                                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-950 transition-all underline underline-offset-8"
                                >
                                    {t('landing.whitepaper.close')}
                                </button>
                                <button className="px-10 py-5 bg-slate-950 text-emerald-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-3 group">
                                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> {t('landing.whitepaper.cta_download')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-black p-10 pt-24"
                    >
                        <button className="absolute top-10 right-10 text-white" onClick={() => setIsMenuOpen(false)}>
                            <X size={32} />
                        </button>
                        <div className="flex flex-col gap-8 text-center uppercase">
                            {navItems.map(item => (
                                <button key={item.id} className="text-4xl font-black text-white inline-block">{item.label}</button>
                            ))}
                            <button onClick={onEnter} className="mt-10 py-5 bg-emerald-500 text-black font-black uppercase rounded-lg">{t('landing.hero.cta_terminal')}</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LandingPage;
