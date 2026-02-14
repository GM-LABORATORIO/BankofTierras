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
    Loader2,
    User,
    Globe,
    ShoppingCart,
    Zap,
    Store,
    Activity,
    Hexagon,
    Award
} from 'lucide-react';

import { useWeb3 } from '../context/Web3Context';
import OriginatorPanel from './OriginatorPanel';
import CorporatePanel from './CorporatePanel';
import TechnicalPanel from './TechnicalPanel';
import CarbonMarketplace from './CarbonMarketplace';
import GreenBusinessCenter from './GreenBusinessCenter';
import GlobalRankings from './GlobalRankings';
import AdminPanel from './AdminPanel';
import UserProfile from './UserProfile';
import EcoTokenPurchase from './EcoTokenPurchase';
import logoBot from '../assets/logo_bot.png';
import { supabaseService } from '../services/supabaseService';
import ImpactPassport from './ImpactPassport';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = ({ onBack }) => {
    const { isDark, toggleTheme } = useTheme();
    const { t, language, setLanguage } = useLanguage();
    const ADMIN_WALLET = "0xA583f0675a2d6f01ab21DEA98629e9Ee04320108";
    const { account, connectWallet, isConnecting, carbonBalance, botBalance } = useWeb3();
    const [activeTab, setActiveTab] = useState('passport');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRTL, setIsRTL] = useState(false); // Language support

    // Persistence Logic with Supabase
    const [projects, setProjects] = useState([]);
    const [myForest, setMyForest] = useState([]);
    const [totalRetired, setTotalRetired] = useState(0);
    const [userProfile, setUserProfile] = useState(null);
    const [reputation, setReputation] = useState({ total_score: 0, total_actions: 0 });

    // Function to load projects from Supabase
    const loadProjects = async () => {
        try {
            const dbProjects = await supabaseService.getProjects();
            const normalizedProjects = dbProjects.map(p => ({
                id: p.id,
                tokenId: p.token_id,
                name: p.name,
                location: p.location,
                area: p.area,
                regid: (p.regid && p.regid !== "") ? p.regid : (p.regId && p.regId !== "" ? p.regId : null),
                status: p.status,
                image: p.image,
                reportipfs: (p.reportipfs && p.reportipfs !== "") ? p.reportipfs : (p.reportIpfs && p.reportIpfs !== "" ? p.reportIpfs : null),
                coordinates: p.coordinates,
                owner_wallet: p.owner_wallet,
                total_quota: p.total_quota || 0,
                sold_tokens: p.sold_tokens || 0
            }));
            setProjects(normalizedProjects);
        } catch (error) {
            console.error("Error loading projects:", error);
        }
    };

    // Function to load profile from Supabase
    const loadProfile = async () => {
        if (!account) return;
        try {
            const profile = await supabaseService.getProfile(account);
            if (profile) {
                setUserProfile(profile);
            }
            const repSummary = await supabaseService.getReputationSummary(account);
            if (repSummary) {
                setReputation(repSummary);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    // Initial Data Fetch
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dbProjects = await supabaseService.getProjects();

                const normalizedProjects = dbProjects.map(p => ({
                    id: p.id,
                    tokenId: p.token_id,
                    name: p.name,
                    location: p.location,
                    area: p.area,
                    regid: (p.regid && p.regid !== "") ? p.regid : (p.regId && p.regId !== "" ? p.regId : null),
                    status: p.status,
                    image: p.image,
                    reportipfs: (p.reportipfs && p.reportipfs !== "") ? p.reportipfs : (p.reportIpfs && p.reportIpfs !== "" ? p.reportIpfs : null),
                    coordinates: p.coordinates,
                    owner_wallet: p.owner_wallet, // Wallet del dueño del proyecto
                    total_quota: p.total_quota || 0, // Cuota total de tokens
                    sold_tokens: p.sold_tokens || 0  // Tokens ya vendidos
                }));

                setProjects(normalizedProjects); // NO MOCK PROJECTS

                if (account) {
                    const [dbAdoptions, dbCompensations, profile] = await Promise.all([
                        supabaseService.getAdoptions(account),
                        supabaseService.getCompensations(account),
                        supabaseService.getProfile(account)
                    ]);

                    if (profile) {
                        setUserProfile(profile);
                    }

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

    const allTabs = [
        {
            id: 'passport',
            label: userProfile?.type === 'corporate' ? 'Strategy' : t('dashboard.passport'),
            icon: <Globe size={24} />,
            component: <ImpactPassport />,
            roles: ['citizen', 'corporate', 'commerce']
        },
        {
            id: 'carbon-market',
            label: userProfile?.type === 'corporate' ? 'Liquidity' : t('dashboard.market'),
            icon: <ShoppingCart size={24} />,
            component: <CarbonMarketplace projects={projects} />,
            roles: ['citizen', 'corporate']
        },
        {
            id: 'rankings',
            label: 'Global Score',
            icon: <Award size={24} />,
            component: <GlobalRankings />,
            roles: ['citizen', 'corporate', 'commerce']
        },
        {
            id: 'corporate',
            label: userProfile?.type === 'corporate' ? 'Command' : t('dashboard.compliance_hub'),
            icon: <Building2 size={24} />,
            component: <CorporatePanel projects={projects} myForest={myForest} totalRetired={totalRetired} userProfile={userProfile} />,
            roles: ['citizen', 'corporate']
        },
        {
            id: 'green-business',
            label: userProfile?.type === 'commerce' ? 'Business Node' : t('dashboard.hub'),
            icon: <Store size={24} />,
            component: <GreenBusinessCenter />,
            roles: ['citizen', 'commerce']
        },
        {
            id: 'profile',
            label: t('dashboard.identity_id'),
            icon: <User size={24} />,
            component: <UserProfile myForest={myForest} onProfileUpdate={loadProfile} />,
            roles: ['citizen', 'corporate', 'commerce']
        },
        {
            id: 'originator',
            label: t('dashboard.originator'),
            icon: <Users size={24} />,
            component: <OriginatorPanel projects={projects} onProjectsChange={setProjects} />,
            roles: ['originator']
        },
        {
            id: 'technical',
            label: t('dashboard.settlement_info'),
            icon: <Settings size={24} />,
            component: <TechnicalPanel />,
            roles: ['corporate', 'originator']
        },
        ...(account?.toLowerCase() === ADMIN_WALLET.toLowerCase() ? [{
            id: 'admin',
            label: t('dashboard.admin'),
            icon: <ShieldCheck size={24} className="text-emerald-500" />,
            component: <AdminPanel />,
            roles: ['admin', 'citizen', 'corporate', 'commerce', 'originator']
        }] : [])
    ];

    const userRole = userProfile?.type || 'citizen';
    const tabs = allTabs.filter(tab => tab.roles.includes(userRole) || account?.toLowerCase() === ADMIN_WALLET.toLowerCase());

    return (
        <div className="flex h-screen bg-slate-50 text-slate-800 font-inter overflow-hidden relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* 1. Sidebar (New Aesthetic: Clean & Icon-Focused) */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-[110] 
                w-24 lg:w-32 border-r border-slate-200 bg-white flex flex-col 
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-4 flex items-center justify-center border-b border-slate-100 h-20">
                    <button onClick={onBack} className="p-3 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
                        <Hexagon size={24} fill="currentColor" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-8 space-y-6 flex flex-col items-center custom-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setIsMenuOpen(false);
                            }}
                            className={`
                                flex flex-col items-center gap-2 p-3 rounded-2xl transition-all group
                                ${activeTab === tab.id
                                    ? 'text-emerald-500'
                                    : 'text-slate-400 hover:text-emerald-500'}
                            `}
                        >
                            <div className={`p-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-emerald-50' : 'group-hover:bg-slate-50'}`}>
                                {tab.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-100">
                    <button className="w-full flex justify-center text-slate-400 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </aside>

            {/* Main Wrapper (TopBar + Viewport + SignalBar) */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* 2. Top Bar (Institutional & Balanced) */}
                <header className="h-20 border-b border-slate-200 px-8 flex items-center justify-between bg-white z-[100] sticky top-0">
                    <div className="flex items-center gap-8">
                        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-emerald-500">
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center gap-3 border-r border-slate-100 pr-8">
                            <span className="text-xl font-black text-slate-800 tracking-tighter">CLIMATE PASS EXCHANGE <span className="text-emerald-500">(CPX)</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        {/* Clean Language Switcher */}
                        <div className="flex gap-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                            {['ES', 'EN', 'AR'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang.toLowerCase())}
                                    className={`hover:text-emerald-500 transition-colors ${language === lang.toLowerCase() ? 'text-emerald-500' : ''}`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        {/* Climate Score Radial Widget (Institutional V3) */}
                        <div className="flex items-center gap-4 py-2 px-6 bg-slate-50 border border-slate-200 rounded-full">
                            <div className="relative w-12 h-12">
                                <svg className="w-full h-full transform -rotate-90 scale-110">
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-200" />
                                    <circle
                                        cx="24" cy="24" r="20"
                                        stroke="currentColor" strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={126}
                                        strokeDashoffset={126 - (126 * (reputation.total_score % 100)) / 100}
                                        className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm font-black text-slate-800 tracking-tight leading-none">{reputation.total_score}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Action Trajectory</span>
                                <span className="text-sm font-black text-slate-800 uppercase tracking-tight italic">CLIMATE ACTION SCORE™</span>
                            </div>
                        </div>

                        {/* Account Chip */}
                        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-emerald-500 text-black rounded-full shadow-lg shadow-emerald-500/10">
                            <User size={14} />
                            <span className="text-xs font-black uppercase tracking-widest">{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'DISCONNECTED'}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* 3. Main Content (Viewport) */}
                    <main className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12 relative">
                        <div className="max-w-6xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
                                            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Decoding Climate Signals...</span>
                                        </div>
                                    ) : (
                                        tabs.find(t => t.id === activeTab)?.component
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>

                    {/* 4. Signal Bar (Right - Only B2B Context Mock) */}
                    <aside className="hidden xl:flex w-64 border-l border-slate-200 bg-white flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                <Activity size={12} className="text-emerald-500" />
                                {t('marketplace.signals')}
                            </h4>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                            <div className="flex flex-col gap-10">
                                {[
                                    { biz: 'Shell PLC', amount: '5,000 t', zone: 'Amazonas' },
                                    { biz: 'Delta Air', amount: '1,200 t', zone: 'Meta' },
                                    { biz: 'Google ESG', amount: '12,500 t', zone: 'Global' }
                                ].map((signal, i) => (
                                    <div key={i} className="flex-shrink-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-black text-slate-800 italic tracking-tighter uppercase">{signal.biz}</span>
                                            <span className="text-[9px] font-black text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100">{signal.amount}</span>
                                        </div>
                                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Network Node: {signal.zone}</div>
                                        <div className="mt-2 h-0.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500/20 animate-pulse" style={{ width: '60%' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 border-t border-slate-100 bg-emerald-50/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-12 -mt-12" />
                            <div className="relative z-10">
                                <div className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.25em] mb-2 leading-none">Liquidez de Mercado ($80M)</div>
                                <div className="text-2xl font-black text-slate-800 italic tracking-tighter leading-none">2,000,000 <span className="text-emerald-500">t</span></div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
