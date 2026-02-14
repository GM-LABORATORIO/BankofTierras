import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Globe,
    TrendingUp,
    Calendar,
    Gift,
    Layers,
    ShieldCheck,
    Settings,
    Database,
    Activity
} from 'lucide-react';

import AdminRegionManager from './AdminRegionManager';
import AdminImpactEditor from './AdminImpactEditor';
import AdminExperiencesManager from './AdminExperiencesManager';
import TierBenefitsManager from './TierBenefitsManager';
import AdminBulkTools from './AdminBulkTools';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('regions');

    const adminTabs = [
        {
            id: 'regions',
            label: 'Network Regions',
            icon: <Globe size={18} />,
            component: <AdminRegionManager />
        },
        {
            id: 'impact',
            label: 'Impact Audit',
            icon: <TrendingUp size={18} />,
            component: <AdminImpactEditor />
        },
        {
            id: 'experiences',
            label: 'Exp Terminal',
            icon: <Calendar size={18} />,
            component: <AdminExperiencesManager />
        },
        {
            id: 'benefits',
            label: 'Tier Protocol',
            icon: <Gift size={18} />,
            component: <TierBenefitsManager />
        },
        {
            id: 'bulk',
            label: 'Infrastructure',
            icon: <Layers size={18} />,
            component: <AdminBulkTools />
        }
    ];

    return (
        <div className="space-y-12 pb-20 font-inter">
            {/* Admin Header: High-Security Branding */}
            <div className="bg-slate-800 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-20 opacity-50" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-10">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                            <ShieldCheck size={48} className="text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-3 leading-none italic">Governance Suite v3.0</div>
                            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
                                Central <span className="text-emerald-400">Governance</span>
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none">Root Access Active</span>
                                </div>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Protocol: Bank of Tierras</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
                        {adminTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-white text-slate-800 shadow-xl'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area: Institutional Clarity */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
            >
                <div className="bg-white border border-slate-200 rounded-[3rem] p-10 lg:p-16 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full -mr-48 -mt-48 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        {/* Tab Content Header */}
                        <div className="flex items-center justify-between mb-12 pb-8 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl">
                                    {adminTabs.find(t => t.id === activeTab)?.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">
                                        {adminTabs.find(t => t.id === activeTab)?.label}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ecosystem Management Module</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                                    <Settings size={20} />
                                </button>
                                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                                    <Database size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Actual Component */}
                        <div className="min-h-[400px]">
                            {adminTabs.find(t => t.id === activeTab)?.component}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer Disclaimer: High Fidelity */}
            <div className="flex items-center justify-center gap-10 opacity-20 hover:opacity-100 transition-opacity">
                <div className="h-px w-20 bg-slate-200" />
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] italic">
                    Restricted Governance Protocol • CPX.Admin
                </p>
                <div className="h-px w-20 bg-slate-200" />
            </div>
        </div>
    );
};

export default AdminPanel;
