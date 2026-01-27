import React, { useState, useEffect } from 'react';
import {
    Settings,
    Globe,
    TrendingUp,
    Users,
    DollarSign,
    Database,
    BarChart3,
    Shield,
    Wallet,
    Percent,
    Save,
    Loader2,
    History,
    Eye,
    EyeOff,
    Gift,
    Calendar
} from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { motion } from 'framer-motion';
import AdminRegionManager from './AdminRegionManager';
import AdminImpactEditor from './AdminImpactEditor';
import AdminBenefitsManager from './AdminBenefitsManager';
import AdminExperiencesManager from './AdminExperiencesManager';
import AdminBulkTools from './AdminBulkTools';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('config');
    const [config, setConfig] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadConfig();
        loadStats();
    }, []);

    const loadConfig = async () => {
        setIsLoading(true);
        try {
            console.log('🔄 AdminPanel: Loading system config...');
            const data = await supabaseService.getSystemConfig();
            console.log('✅ AdminPanel: Config loaded:', data);

            if (!data || data.length === 0) {
                console.warn('⚠️ AdminPanel: No config found');
            }

            setConfig(data || []);

            const initialValues = {};
            (data || []).forEach(item => {
                initialValues[item.key] = item.value;
            });
            setEditValues(initialValues);
        } catch (error) {
            console.error('❌ AdminPanel: Error loading config:', error);
            setConfig([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            console.log('🔄 AdminPanel: Loading global stats...');
            const data = await supabaseService.getGlobalStats();
            console.log('✅ AdminPanel: Stats loaded:', data);
            setStats(data || { totalAdoptions: 0, totalCO2Captured: 0, totalTreesPlanted: 0, totalFundsRaised: 0 });
        } catch (error) {
            console.error('❌ AdminPanel: Error loading stats:', error);
            setStats({ totalAdoptions: 0, totalCO2Captured: 0, totalTreesPlanted: 0, totalFundsRaised: 0 });
        }
    };

    const handleSave = async (key) => {
        setIsSaving(key);
        try {
            await supabaseService.updateSystemConfig(key, editValues[key]);
            await loadConfig();
            alert('✅ Configuration updated successfully!');
        } catch (error) {
            console.error('Error saving config:', error);
            alert('❌ Error: ' + error.message);
        } finally {
            setIsSaving(null);
        }
    };

    const tabs = [
        { id: 'config', label: 'System Config', icon: Settings, color: 'emerald' },
        { id: 'regions', label: 'Regions', icon: Globe, color: 'blue' },
        { id: 'benefits', label: 'Benefits', icon: Gift, color: 'yellow' },
        { id: 'experiences', label: 'Experiences', icon: Calendar, color: 'indigo' },
        { id: 'impact', label: 'Impact', icon: TrendingUp, color: 'green' },
        { id: 'bulk', label: 'Bulk Tools', icon: Zap, color: 'emerald' },
        { id: 'users', label: 'Users', icon: Users, color: 'purple' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'orange' }
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
                <p className="text-gray-500 text-sm uppercase tracking-wider">Loading Admin Panel...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Premium Header */}
            <div className="relative h-56 rounded-[2.5rem] overflow-hidden group">
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
                    alt="Admin header"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-12">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-sm border border-emerald-500/30">
                            <Shield className="text-emerald-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">
                                Admin Control Center
                            </h1>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">
                                Platform Management & Configuration
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    {stats && (
                        <div className="flex gap-6 mt-4">
                            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Adoptions</div>
                                <div className="text-2xl font-black text-white">{stats.totalAdoptions || 0}</div>
                            </div>
                            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">CO2 Captured</div>
                                <div className="text-2xl font-black text-emerald-400">{((stats.totalCO2Captured || 0) / 1000).toFixed(1)}t</div>
                            </div>
                            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Trees Planted</div>
                                <div className="text-2xl font-black text-green-400">{(stats.totalTreesPlanted || 0).toLocaleString()}</div>
                            </div>
                            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Funds Raised</div>
                                <div className="text-2xl font-black text-yellow-400">${(stats.totalFundsRaised || 0).toLocaleString()}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${isActive
                                ? `bg-${tab.color}-500 text-white shadow-lg shadow-${tab.color}-500/20`
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* System Config Tab */}
                {activeTab === 'config' && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Configuration Cards */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 flex items-center gap-2">
                                <Settings size={16} /> Global Settings
                            </h3>

                            {config.map((item) => (
                                <div key={item.key} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/20 transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-white/5 rounded-xl">
                                                {item.key.includes('wallet') ? (
                                                    <Wallet className="text-emerald-400" />
                                                ) : item.key.includes('fee') ? (
                                                    <Percent className="text-blue-400" />
                                                ) : (
                                                    <DollarSign className="text-yellow-400" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                                                    {item.key.replace(/_/g, ' ')}
                                                </div>
                                                <div className="text-sm font-bold text-white">{item.description}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={editValues[item.key] || ''}
                                                onChange={(e) => setEditValues({ ...editValues, [item.key]: e.target.value })}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all font-mono"
                                            />
                                            <button
                                                onClick={() => handleSave(item.key)}
                                                disabled={isSaving === item.key}
                                                className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50"
                                            >
                                                {isSaving === item.key ? (
                                                    <Loader2 className="animate-spin" size={16} />
                                                ) : (
                                                    <Save size={16} />
                                                )}
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-600 font-mono">
                                            Current: {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Activity Log */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 flex items-center gap-2">
                                <History size={16} /> Recent Activity
                            </h3>

                            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                                <div className="space-y-4">
                                    {[
                                        { action: 'Config Updated', detail: 'Platform fee changed to 2.5%', time: '2 min ago', type: 'config' },
                                        { action: 'New Region', detail: 'Amazonas Colombiano created', time: '15 min ago', type: 'region' },
                                        { action: 'Pixel Adopted', detail: 'CELL-72-45 adopted by user', time: '1 hour ago', type: 'adoption' },
                                        { action: 'Impact Updated', detail: 'CO2 metrics updated for zone', time: '2 hours ago', type: 'impact' }
                                    ].map((log, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                                            <div className={`w-2 h-2 rounded-full mt-1.5 ${log.type === 'config' ? 'bg-emerald-500' :
                                                log.type === 'region' ? 'bg-blue-500' :
                                                    log.type === 'adoption' ? 'bg-purple-500' :
                                                        'bg-green-500'
                                                }`} />
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-white">{log.action}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{log.detail}</div>
                                            </div>
                                            <div className="text-[10px] text-gray-600 uppercase tracking-wider">{log.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Database Stats */}
                            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <Database size={16} className="text-emerald-400" />
                                    Database Status
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Regions</div>
                                        <div className="text-2xl font-black text-white">12</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Zones</div>
                                        <div className="text-2xl font-black text-white">45</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pixels</div>
                                        <div className="text-2xl font-black text-white">1,247</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Users</div>
                                        <div className="text-2xl font-black text-white">89</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Regions Tab */}
                {activeTab === 'regions' && (
                    <AdminRegionManager />
                )}

                {/* Benefits Tab */}
                {activeTab === 'benefits' && (
                    <AdminBenefitsManager />
                )}

                {/* Experiences Tab */}
                {activeTab === 'experiences' && (
                    <AdminExperiencesManager />
                )}

                {/* Impact Tab */}
                {activeTab === 'impact' && (
                    <AdminImpactEditor />
                )}

                {/* Bulk Tools Tab */}
                {activeTab === 'bulk' && (
                    <AdminBulkTools />
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-[#0a0a0a] border border-white/5 p-12 rounded-[2rem] text-center">
                        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-white mb-2">User Management</h3>
                        <p className="text-gray-500 text-sm">Coming soon: View users, manage roles, track activity</p>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-6">
                            {[
                                { label: 'Total Revenue', value: '$12,450', change: '+12%', color: 'emerald' },
                                { label: 'Active Users', value: '89', change: '+5%', color: 'blue' },
                                { label: 'Avg. Adoption', value: '$140', change: '+8%', color: 'purple' },
                                { label: 'Conversion', value: '3.2%', change: '+0.5%', color: 'orange' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{stat.label}</div>
                                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                                    <div className={`text-xs font-bold text-${stat.color}-400`}>{stat.change}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/5 p-12 rounded-[2rem] text-center">
                            <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-black text-white mb-2">Advanced Analytics</h3>
                            <p className="text-gray-500 text-sm">Coming soon: Charts, graphs, and detailed insights</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdminPanel;
