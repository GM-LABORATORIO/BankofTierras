import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ShieldCheck,
    Building2,
    LayoutDashboard,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    X
} from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import OriginatorPanel from './OriginatorPanel';
import AuditorPanel from './AuditorPanel';
import CorporatePanel from './CorporatePanel';
import TechnicalPanel from './TechnicalPanel';
import TreeMarketplace from './TreeMarketplace';

import { MOCK_PROJECTS } from '../constants/mockData';
import { Heart } from 'lucide-react';

const INITIAL_SPECIES = [
    {
        id: 'jaguar-01',
        name: "Jaguar (Otorongo)",
        scientific: "Panthera onca",
        description: "El felino más grande de América. Tu adopción financia corredores biológicos y cámaras trampa.",
        impact: "Protección de 100ha",
        cost: "500 $CARBON",
        category: "Fauna",
        status: "Casi Amenazado",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'delfin-01',
        name: "Delfín Rosado",
        scientific: "Inia geoffrensis",
        description: "Ser mitológico del Amazonas. Protegemos las cuencas hídricas contra la minería de mercurio.",
        impact: "Limpieza de Cuenca",
        cost: "250 $CARBON",
        category: "Fauna",
        status: "En Peligro",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'aguila-01',
        name: "Águila Harpía",
        scientific: "Harpia harpyja",
        description: "La reina del dosel. Protegemos los árboles más altos donde anidan estas majestuosas aves.",
        impact: "Protección de Nidos",
        cost: "350 $CARBON",
        category: "Fauna",
        status: "Vulnerable",
        image: "https://images.unsplash.com/photo-1621533031496-e24c6530324c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'guacamayo-01',
        name: "Guacamayo Rojo",
        scientific: "Ara macao",
        description: "Dispersor de semillas vital para el Amazonas. Protegemos sus nidos en los huecos de los árboles.",
        impact: "Reforestación Natural",
        cost: "150 $CARBON",
        category: "Fauna",
        status: "Protegido",
        image: "https://images.unsplash.com/photo-1552728089-57bdde30fc3b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'lupuna-01',
        name: "Lupuna Gigante",
        scientific: "Ceiba pentandra",
        description: "El gigante sagrado del Amazonas. Estos árboles son refugio para cientos de especies.",
        impact: "450kg CO2 / año",
        cost: "50 $CARBON",
        category: "Flora",
        status: "Protegido",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'orquidea-01',
        name: "Orquídea Amazónica",
        scientific: "Cattleya luteola",
        description: "Símbolo de la biodiversidad floral. Tu apoyo financia viveros de especies nativas.",
        impact: "Conservación Genética",
        cost: "75 $CARBON",
        category: "Flora",
        status: "Vulnerable",
        image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800"
    }
];

const Dashboard = ({ onBack }) => {
    const { account, connectWallet, isConnecting, carbonBalance } = useWeb3();
    const [activeTab, setActiveTab] = useState('originator');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Persistence Logic
    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('amz_projects');
        return saved ? JSON.parse(saved) : MOCK_PROJECTS;
    });

    const [species, setSpecies] = useState(() => {
        const saved = localStorage.getItem('amz_species');
        return saved ? JSON.parse(saved) : INITIAL_SPECIES;
    });

    const [myForest, setMyForest] = useState(() => {
        const saved = localStorage.getItem('amz_forest');
        return saved ? JSON.parse(saved) : [];
    });

    const [totalRetired, setTotalRetired] = useState(() => {
        const saved = localStorage.getItem('amz_retired');
        return saved ? parseFloat(saved) : 0;
    });

    // Save to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('amz_projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('amz_species', JSON.stringify(species));
    }, [species]);

    useEffect(() => {
        localStorage.setItem('amz_forest', JSON.stringify(myForest));
    }, [myForest]);

    useEffect(() => {
        localStorage.setItem('amz_retired', totalRetired.toString());
    }, [totalRetired]);

    const updateProjects = (newProjects) => setProjects(newProjects);
    const updateSpecies = (newSpecies) => setSpecies(newSpecies);

    const tabs = [
        {
            id: 'originator',
            label: 'Originador',
            icon: <Users size={20} />,
            component: <OriginatorPanel projects={projects} setProjects={updateProjects} />
        },
        {
            id: 'auditor',
            label: 'Auditor',
            icon: <ShieldCheck size={20} />,
            component: <AuditorPanel projects={projects} setProjects={updateProjects} />
        },
        {
            id: 'corporate',
            label: 'Empresa',
            icon: <Building2 size={20} />,
            component: <CorporatePanel
                myForest={myForest}
                projects={projects}
                totalRetired={totalRetired}
                onRetire={(amount) => setTotalRetired(prev => prev + parseFloat(amount))}
            />
        },
        {
            id: 'technical',
            label: 'Info Técnica',
            icon: <Settings size={20} />,
            component: <TechnicalPanel />
        },
        {
            id: 'marketplace',
            label: 'Adopción',
            icon: <Heart size={20} />,
            component: <TreeMarketplace
                species={species}
                setSpecies={updateSpecies}
                resetSpecies={() => updateSpecies(INITIAL_SPECIES)}
                myForest={myForest}
                setMyForest={setMyForest}
            />
        },
    ];

    return (
        <div className="flex h-screen bg-[#050505] relative overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-[110] 
                w-72 border-r border-white/5 bg-[#0a0a0a] flex flex-col 
                transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <ChevronLeft size={20} className="text-gray-400" />
                        </button>
                        <span className="font-black tracking-tighter text-emerald-500 italic uppercase">AmazonasCero</span>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 lg:hidden text-gray-500 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-4">Roles de Impacto</div>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all group ${activeTab === tab.id
                                ? 'bg-emerald-500 text-white shadow-[0_10px_25px_rgba(16,185,129,0.3)]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={activeTab === tab.id ? 'text-white' : 'text-emerald-500/50 group-hover:text-emerald-500 transition-colors'}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    {account ? (
                        <div className="space-y-3">
                            <div className="px-5 py-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                                <div className="text-[9px] text-emerald-500/50 font-black uppercase mb-1 tracking-[0.2em]">Wallet Activa</div>
                                <div className="text-[10px] font-mono text-white truncate font-bold">{account}</div>
                            </div>

                            <div className="px-5 py-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-emerald-500/30 transition-all">
                                <div className="text-[9px] text-gray-500 font-black uppercase mb-1 tracking-[0.3em]">Saldo $CARBON</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-black text-white italic tracking-tighter">{parseFloat(carbonBalance).toLocaleString()}</span>
                                    <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase mb-1">tCO2</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            disabled={isConnecting}
                            className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                        >
                            {isConnecting ? "Conectando..." : "Conectar Wallet"}
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
                <header className="h-20 lg:h-24 border-b border-white/5 px-6 lg:px-10 flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-3xl sticky top-0 z-[50]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-3 bg-white/5 rounded-xl lg:hidden text-emerald-500 border border-white/10"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-lg lg:text-xl font-black text-white flex items-center gap-3 italic uppercase tracking-tighter">
                            <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                {tabs.find(t => t.id === activeTab)?.icon}
                            </span>
                            <span className="hidden sm:inline">{tabs.find(t => t.id === activeTab)?.label}</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Red</span>
                            <span className="text-[10px] text-emerald-400 font-black font-mono leading-none tracking-tighter">AVALANCHE MAINNET</span>
                        </div>
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group cursor-pointer hover:border-emerald-500/50 transition-all">
                            <LogOut size={18} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {tabs.find(t => t.id === activeTab)?.component}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
