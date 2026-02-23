import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Award,
    Building2,
    Store,
    User,
    ArrowUpRight,
    Globe,
    ShieldCheck,
    Activity,
    TrendingUp,
    ExternalLink,
    Zap,
    Ticket,
    HeartPulse,
    Scale
} from 'lucide-react';

const GlobalRankings = () => {
    const [activeCategory, setActiveCategory] = useState('institutional');

    const companies = [
        { id: 1, name: "Shell PLC", impact: "125,000 t", score: "850,000", trend: "+12.4%", status: "Audited", country: "GB" },
        { id: 2, name: "Delta Airlines", impact: "85,400 t", score: "620,000", trend: "+8.2%", status: "Verified", country: "US" },
        { id: 3, name: "Google Cloud", impact: "62,000 t", score: "540,000", trend: "+15.1%", status: "Audited", country: "US" },
        { id: 4, name: "Standard Chartered", impact: "45,000 t", score: "410,000", trend: "+5.3%", status: "Verified", country: "GB" },
        { id: 5, name: "GM Holding", impact: "38,000 t", score: "390,000", trend: "+20.0%", status: "Self-Reported", country: "COL" },
    ];

    const commerces = [
        { id: 1, name: "Starbucks Bogotá", registrations: 450, impact: "4.2 t", score: "12,500", footfall: "High" },
        { id: 2, name: "Juan Valdez Global", registrations: 380, impact: "3.8 t", score: "9,800", footfall: "Medium" },
        { id: 3, name: "Avianca Retail", registrations: 310, impact: "3.1 t", score: "8,200", footfall: "High" },
        { id: 4, name: "Crepes & Waffles", registrations: 290, impact: "2.8 t", score: "7,400", footfall: "Very High" },
        { id: 5, name: "Exito S.A.", registrations: 240, impact: "2.1 t", score: "6,800", footfall: "High" },
    ];

    const individuals = [
        { id: 1, name: "Lucas Mantovani", trajectory: "Elite Guardian", score: "15,400", impact: "1.2M g", actions: 142 },
        { id: 2, name: "Elena Rodriguez", trajectory: "Apex Protector", score: "12,800", impact: "980k g", actions: 98 },
        { id: 3, name: "Sebastian Vargas", trajectory: "Canopy Tier", score: "9,200", impact: "750k g", actions: 76 },
        { id: 4, name: "Maria Paula", trajectory: "Canopy Tier", score: "8,500", impact: "710k g", actions: 64 },
        { id: 5, name: "David Kim", trajectory: "Green Citizen", score: "7,800", impact: "680k g", actions: 52 },
    ];

    const benefits = {
        institutional: [
            { icon: <Scale size={20} />, title: "Tax Credits (US 45Q)", desc: "Deducciones directas por cada tonelada de CO2 capturada o compensada vía $CARBON.", label: "Fiscal" },
            { icon: <HeartPulse size={20} />, title: "Green Loan Access", desc: "Reducción de hasta 150bps en tasas de interés comercial para carteras ESG verificadas.", label: "Operativo" },
            { icon: <ShieldCheck size={20} />, title: "Audit Waiver", desc: "Simplificación administrativa en reportes de sostenibilidad anuales ante entes globales.", label: "Compliance" }
        ],
        commerce: [
            { icon: <Globe size={20} />, title: "Supply Chain Priority", desc: "Preferencia en licitaciones y acuerdos de suministro con el ecosistema GM Holding.", label: "Network" },
            { icon: <Zap size={20} />, title: "Grid Incentives", desc: "Subsidios directos en costos energéticos mediante acuerdos de PPA renovables.", label: "Energy" },
            { icon: <TrendingUp size={20} />, title: "Customer Loyalty", desc: "Visibilidad destacada en el Marketplace como 'Establecimiento de Impacto Positivo'.", label: "Branding" }
        ],
        citizen: [
            { icon: <Ticket size={20} />, title: "VIP Summit Access", desc: "Pases exclusivos a las COP y cumbres climáticas regionales (C40, LAC).", label: "Events" },
            { icon: <Store size={20} />, title: "CO2Pay Rewards", desc: "Descuento del 15% en compras mediante red de aliados (Juan Valdez, Avianca).", label: "Lifestyle" },
            { icon: <Award size={20} />, title: "Legacy Status", desc: "Priority Minting de Certificados de Ciudadanía Verde y colecciones NFT RWA.", label: "Reputation" }
        ]
    };

    const categories = [
        { id: 'institutional', label: 'Institutional', icon: <Building2 size={16} /> },
        { id: 'commerce', label: 'Business & Retail', icon: <Store size={16} /> },
        { id: 'citizen', label: 'Citizenship', icon: <User size={16} /> }
    ];

    return (
        <div className="space-y-10 pb-20 font-inter text-slate-900">
            {/* Header: Bloomberg Style */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-10 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-0.5 bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest rounded">Real-Time</div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic tracking-wider">CPX Terminal v2.4</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Global Score Listings</h2>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4 flex items-center gap-2">
                        <Globe size={14} className="text-emerald-500" />
                        Transparencia Radical: Los Líderes del Futuro Climático
                    </p>
                </div>
                <div className="flex bg-slate-100 p-2 rounded-2xl border border-slate-200">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-8 py-4 rounded-xl flex items-center gap-3 transition-all ${activeCategory === cat.id
                                ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50 ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            {cat.icon}
                            <span className="text-xs font-black uppercase tracking-widest">{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bloomberg Grid Body */}
            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 grid grid-cols-12 gap-4">
                            <span className="col-span-1 text-[11px] font-black text-slate-400 uppercase tracking-widest">Rank</span>
                            <span className="col-span-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Entity</span>
                            <span className="col-span-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">Impact Volume</span>
                            <span className="col-span-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">Score</span>
                            <span className="col-span-2 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Trajectory</span>
                        </div>

                        <div className="p-2 space-y-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="divide-y divide-slate-100"
                                >
                                    {activeCategory === 'institutional' && companies.map((co, i) => {
                                        const logoMap = {
                                            "Shell PLC": "/assets/Shell_logo.svg.png",
                                            "Delta Airlines": "/assets/delta.png",
                                            "Google Cloud": "/assets/Google__G__logo.svg.png"
                                        };
                                        return (
                                            <div key={co.id} className="grid grid-cols-12 gap-4 items-center px-6 py-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                                                <span className="col-span-1 text-sm font-black text-slate-300 italic">0{i + 1}</span>
                                                <div className="col-span-4 flex items-center gap-4">
                                                    {logoMap[co.name] && (
                                                        <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-1">
                                                            <img src={logoMap[co.name]} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 uppercase italic group-hover:text-emerald-600 transition-colors">{co.name}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{co.status} · {co.country}</span>
                                                    </div>
                                                </div>
                                                <span className="col-span-3 text-sm font-black text-slate-800 tracking-tighter">{co.impact} compensated</span>
                                                <span className="col-span-2 text-base font-black text-slate-900 italic">{co.score} CPX</span>
                                                <div className="col-span-2 text-right">
                                                    <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-lg">{co.trend}</span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {activeCategory === 'commerce' && commerces.map((comm, i) => (
                                        <div key={comm.id} className="grid grid-cols-12 gap-4 items-center px-6 py-6 hover:bg-slate-50 transition-colors group">
                                            <span className="col-span-1 text-sm font-black text-slate-300 italic">0{i + 1}</span>
                                            <div className="col-span-4 flex flex-col">
                                                <span className="text-sm font-black text-slate-900 uppercase italic group-hover:text-emerald-600 transition-colors">{comm.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Footfall: {comm.footfall}</span>
                                            </div>
                                            <span className="col-span-3 text-sm font-black text-slate-800 tracking-tighter">{comm.registrations} Onboarded Users</span>
                                            <span className="col-span-2 text-base font-black text-slate-900 italic">{comm.score} CPX</span>
                                            <div className="col-span-2 text-right">
                                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter italic">{comm.impact} Vol.</span>
                                            </div>
                                        </div>
                                    ))}

                                    {activeCategory === 'citizen' && individuals.map((person, i) => (
                                        <div key={person.id} className="grid grid-cols-12 gap-4 items-center px-6 py-6 hover:bg-slate-50 transition-colors group">
                                            <span className="col-span-1 text-sm font-black text-slate-300 italic">0{i + 1}</span>
                                            <div className="col-span-4 flex flex-col">
                                                <span className="text-sm font-black text-slate-900 uppercase italic group-hover:text-emerald-600 transition-colors">{person.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{person.trajectory}</span>
                                            </div>
                                            <span className="col-span-3 text-sm font-black text-slate-800 tracking-tighter">{person.actions} Actions Found</span>
                                            <span className="col-span-2 text-base font-black text-slate-900 italic">{person.score} CPX</span>
                                            <div className="col-span-2 text-right truncate">
                                                <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-lg">{person.impact} Removed</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    {/* Benefits Grid (Dynamic based on Category) */}
                    <div className="bg-slate-950 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all" />
                        <h3 className="text-lg font-black uppercase tracking-tighter mb-8 italic flex items-center gap-3">
                            <Award className="text-emerald-500" size={20} />
                            Tier Benefits & Perks
                        </h3>

                        <div className="space-y-8">
                            {benefits[activeCategory].map((perk, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 group/item"
                                >
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-500 border border-white/10 group-hover/item:border-emerald-500/50 transition-all">
                                        {perk.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-xs font-black uppercase italic tracking-tight">{perk.title}</span>
                                            <span className="text-[9px] font-black py-1 px-2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 uppercase tracking-widest">{perk.label}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed italic pr-4">{perk.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <button className="w-full py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10">
                                Verify My Tier Eligibility
                                <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Behavior Data Source Card */}
                    <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] relative group">
                        <Activity className="text-emerald-500 mb-6" size={28} />
                        <h4 className="text-sm font-black uppercase tracking-widest mb-4 italic">Behavioral Data Engine</h4>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase tracking-widest">
                            Recopilamos data real sobre biodiversidad y responsabilidad climática a través de nuestra red de aliados comerciales, validando cada acción on-chain.
                        </p>
                        <div className="mt-8 flex items-center gap-2 text-xs font-black text-emerald-500 uppercase italic">
                            <span>Sourced by GM Holding Infrastructure</span>
                            <ExternalLink size={12} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Insight Overlay */}
            <div className="p-8 bg-slate-950 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-white/5">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black uppercase tracking-tight italic">Consistencia &gt; Volumen</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic leading-relaxed">
                            El Score Global premia la trayectoria ininterrumpida. Acuerdos exclusivos con gobiernos para implementar exenciones por comportamiento sostenible.
                        </p>
                    </div>
                </div>
                <button className="px-10 py-5 bg-white text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all relative z-10 shadow-lg group">
                    <span className="flex items-center gap-2">
                        Become a Climate Leader
                        <TrendingUp size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default GlobalRankings;
