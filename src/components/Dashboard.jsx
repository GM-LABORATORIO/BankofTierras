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
    X,
    Loader2
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

import { supabaseService } from '../services/supabaseService';

const Dashboard = ({ onBack }) => {
    const { account, connectWallet, isConnecting, carbonBalance } = useWeb3();
    const [activeTab, setActiveTab] = useState('originator');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Persistence Logic with Supabase
    const [projects, setProjects] = useState([]);
    const [species, setSpecies] = useState([]);
    const [myForest, setMyForest] = useState([]);
    const [totalRetired, setTotalRetired] = useState(0);

    // Initial Data Fetch
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [dbSpecies, dbProjects] = await Promise.all([
                    supabaseService.getSpecies(),
                    supabaseService.getProjects()
                ]);

                if (dbSpecies.length === 0 && INITIAL_SPECIES.length > 0) {
                    await supabaseService.seedSpecies(INITIAL_SPECIES.map(({ id, ...rest }) => rest));
                    const restoredSpecies = await supabaseService.getSpecies();
                    setSpecies(restoredSpecies.length > 0 ? restoredSpecies : INITIAL_SPECIES);
                } else {
                    setSpecies(dbSpecies.length > 0 ? dbSpecies : INITIAL_SPECIES);
                }

                setProjects(dbProjects.length > 0 ? dbProjects : MOCK_PROJECTS);

                if (account) {
                    const [dbAdoptions, dbCompensations] = await Promise.all([
                        supabaseService.getAdoptions(account),
                        supabaseService.getCompensations(account)
                    ]);

                    setMyForest(dbAdoptions.map(a => ({
                        ...a.species,
                        guardianName: a.guardian_name,
                        adoptionDate: a.adoption_date,
                        txHash: a.tx_hash,
                        wallet: a.wallet_address
                    })));

                    const total = dbCompensations.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
                    setTotalRetired(total);
                }
            } catch (error) {
                console.error("Error fetching data from Supabase:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [account]);

    const updateProjects = async (newProjects) => {
        // Find the diff and update Supabase (simplification for the hackathon: state update + db update on action)
        setProjects(newProjects);
    };

    const updateSpecies = (newSpecies) => setSpecies(newSpecies);

    const tabs = [
        {
            id: 'originator',
            label: 'Originador',
            icon: <Users size={20} />,
            component: <OriginatorPanel projects={projects} setProjects={async (newP) => {
                const latest = newP[0]; // Assuming new project is at the top
                if (latest && !latest.id.toString().includes('-')) { // primitive check for new items
                    await supabaseService.addProject({
                        name: latest.name,
                        location: latest.location,
                        area: latest.area,
                        regId: latest.regId,
                        status: latest.status,
                        image: latest.image,
                        reportIpfs: latest.reportIpfs,
                        owner_wallet: account
                    });
                }
                setProjects(newP);
            }} />
        },
        {
            id: 'auditor',
            label: 'Auditor',
            icon: <ShieldCheck size={20} />,
            component: <AuditorPanel projects={projects} setProjects={async (newP) => {
                // Find what changed and update DB
                setProjects(newP);
                // Implementation note: Auditor updates are handled within AuditorPanel for specific IDs
            }} />
        },
        {
            id: 'corporate',
            label: 'Empresa',
            icon: <Building2 size={20} />,
            component: <CorporatePanel
                myForest={myForest}
                projects={projects}
                totalRetired={totalRetired}
                onRetire={async (amount, certData) => {
                    setTotalRetired(prev => prev + parseFloat(amount));
                    await supabaseService.addCompensation({
                        wallet_address: account,
                        company_name: certData.company,
                        nit: certData.nit,
                        amount: parseFloat(amount),
                        tx_hash: certData.txHash,
                        date: certData.date
                    });
                }}
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
                setSpecies={async (newS) => {
                    // Detect changes to sync with Supabase
                    const latestAdded = newS.find(s => s.id && s.id.toString().startsWith('new-'));

                    if (latestAdded) {
                        const { id, ...cleanItem } = latestAdded;
                        const saved = await supabaseService.addSpecies(cleanItem);
                        if (saved) {
                            // Replace the temp 'new-' id with the real DB id
                            setSpecies(newS.map(s => s.id === latestAdded.id ? saved : s));
                        } else {
                            setSpecies(newS);
                        }
                        return;
                    }

                    // Check for updates to existing items
                    const changedItem = newS.find(newItem => {
                        const oldVersion = species.find(oldItem => oldItem.id === newItem.id);
                        return oldVersion && JSON.stringify(oldVersion) !== JSON.stringify(newItem);
                    });

                    if (changedItem) {
                        const { id, created_at, ...updates } = changedItem;
                        await supabaseService.updateSpecies(id, updates);
                    }

                    setSpecies(newS);
                }}
                resetSpecies={() => setSpecies([])} // In DB context, maybe just re-fetch
                myForest={myForest}
                setMyForest={async (newF) => {
                    const latest = newF[newF.length - 1];
                    if (latest && latest.id.toString().startsWith('adoption-')) {
                        await supabaseService.addAdoption({
                            species_id: latest.db_id || latest.id, // Ensure we have the DB UUID
                            wallet_address: account,
                            guardian_name: latest.owner,
                            adoption_date: latest.adoptionDate,
                            tx_hash: latest.txHash
                        });
                    }
                    setMyForest(newF);
                }}
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
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                                    <p className="text-gray-500 font-black uppercase tracking-widest text-xs italic">Sincronizando con Amazonas Cero Cloud...</p>
                                </div>
                            ) : (
                                tabs.find(t => t.id === activeTab)?.component
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
