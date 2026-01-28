import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Globe,
    TrendingUp,
    Calendar,
    Gift,
    Layers,
    ShieldCheck
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
            label: 'Regiones',
            icon: <Globe size={18} />,
            component: <AdminRegionManager />
        },
        {
            id: 'impact',
            label: 'Impacto',
            icon: <TrendingUp size={18} />,
            component: <AdminImpactEditor />
        },
        {
            id: 'experiences',
            label: 'Experiencias',
            icon: <Calendar size={18} />,
            component: <AdminExperiencesManager />
        },
        {
            id: 'benefits',
            label: 'Beneficios Tier',
            icon: <Gift size={18} />,
            component: <TierBenefitsManager />
        },
        {
            id: 'bulk',
            label: 'Herramientas Pro',
            icon: <Layers size={18} />,
            component: <AdminBulkTools />
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] p-6 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                            <ShieldCheck className="text-emerald-500" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                                Central Admin
                            </h1>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
                                Bank of Tierras Protocol • Governance Suite
                            </p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
                        {adminTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === tab.id
                                    ? 'bg-emerald-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />

                        <div className="relative z-10">
                            {adminTabs.find(t => t.id === activeTab)?.component}
                        </div>
                    </div>
                </motion.div>

                {/* Footer Disclaimer */}
                <div className="text-center py-6">
                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.3em]">
                        Admin Access Restricted • High-Level Ecosystem Management
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
