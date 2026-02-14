import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, TreeDeciduous, Award, ShieldCheck, Leaf, ExternalLink, Download, Loader2, Settings, Mail, Globe, Briefcase } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { supabaseService } from '../services/supabaseService';
import { uploadFileToIPFS } from '../services/pinataService';
import ReputationWidget from './ReputationWidget';
import GreenIdentityCard from './GreenIdentityCard';
import { useLanguage } from '../context/LanguageContext';

const UserProfile = ({ myForest, onProfileUpdate }) => {
    const { account } = useWeb3();
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        company_name: '',
        tax_id: '',
        company_logo: '',
        employee_count: 0,
        bio: '',
        role: 'guardian',
        entityType: 'individual'
    });
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reputation, setReputation] = useState({ total_score: 0, total_actions: 0 });

    // Load Profile Data
    useEffect(() => {
        if (account) {
            const loadData = async () => {
                try {
                    const [profile, repSummary] = await Promise.all([
                        supabaseService.getProfile(account),
                        supabaseService.getReputationSummary(account)
                    ]);

                    if (profile) {
                        setProfileData({
                            name: profile.name || '',
                            company_name: profile.company_name || '',
                            tax_id: profile.tax_id || '',
                            company_logo: profile.company_logo || '',
                            employee_count: profile.employee_count || 0,
                            bio: profile.preferences?.bio || '',
                            role: profile.role || 'guardian',
                            entityType: profile.entity_type || 'individual'
                        });
                    }
                    if (repSummary) {
                        setReputation(repSummary);
                    }
                } catch (error) {
                    console.error("Error loading profile data:", error);
                }
            };
            loadData();
        }
    }, [account]);

    const totalTrees = myForest.length;
    const totalImpact = totalTrees * 0.5;
    const level = totalTrees > 10 ? "Guardián Legendario" : totalTrees > 5 ? "Protector del Bosque" : "Iniciado";

    const getImageUrl = (image) => {
        if (!image) return "https://images.unsplash.com/photo-1546272446-615729161cb9?auto=format&fit=crop&q=80&w=800";
        if (image.startsWith('http')) return image;
        if (image.includes('/')) return image;
        return `https://gateway.pinata.cloud/ipfs/${image}`;
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await supabaseService.upsertProfile({
                wallet_address: account,
                name: profileData.name,
                company_name: profileData.company_name,
                tax_id: profileData.tax_id,
                company_logo: profileData.company_logo,
                employee_count: parseInt(profileData.employee_count) || 0,
                role: profileData.role,
                entity_type: profileData.entityType,
                preferences: { bio: profileData.bio },
                updated_at: new Date()
            });
            if (onProfileUpdate) onProfileUpdate();
            setIsEditing(false);
            alert("Digital Identity Synchronized with Ledger");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 pb-20 font-inter">
            {/* Identity Header: Institutional Passport Layout */}
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                <div className="w-full lg:w-auto shrink-0 self-start">
                    <GreenIdentityCard userProfile={profileData} reputation={reputation} />
                </div>

                <div className="flex-1 bg-white border border-slate-200 p-10 rounded-[3rem] shadow-sm relative overflow-hidden flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2 leading-none italic">Verified Digital Identity</div>
                                <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-3">
                                    {profileData.name || "UNIDENTIFIED STEWARD"}
                                </h2>
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Status: {level}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-500 hover:bg-emerald-50 transition-all border border-slate-100"
                            >
                                <Settings size={20} />
                            </button>
                        </div>

                        <p className="text-xs text-slate-400 font-bold uppercase leading-relaxed tracking-wider max-w-2xl">
                            {profileData.bio || "Active participant in the Bank of Tierras ecosystem, committed to planetary regeneration and verified impact tracking."}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 relative z-10 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                            <Mail size={14} className="text-slate-300" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{account?.slice(0, 10)}...</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                            <Briefcase size={14} className="text-slate-300" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{profileData.company_name || "Individual Steward"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-800 rounded-[3rem] p-12 shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                        <form className="space-y-8 relative z-10" onSubmit={handleSaveProfile}>
                            <h3 className="text-lg font-black text-white uppercase italic tracking-widest mb-4">Identity Configuration</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                                    <input
                                        value={profileData.name}
                                        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-emerald-500 outline-none transition-all font-bold"
                                        placeholder="Identification Name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Entity Name</label>
                                    <input
                                        value={profileData.company_name}
                                        onChange={e => setProfileData({ ...profileData, company_name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-emerald-500 outline-none transition-all font-bold"
                                        placeholder="Company or Individual"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax ID / NIT</label>
                                    <input
                                        value={profileData.tax_id}
                                        onChange={e => setProfileData({ ...profileData, tax_id: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-emerald-500 outline-none transition-all font-bold"
                                        placeholder="Legal Identification"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Environmental Mission (Bio)</label>
                                <textarea
                                    value={profileData.bio}
                                    onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-emerald-500 outline-none h-32 resize-none transition-all font-bold"
                                    placeholder="Briefly describe your institutional commitment to conservation..."
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" disabled={isLoading} className="flex-1 py-5 bg-emerald-500 text-black font-black uppercase text-xs rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                                    {isLoading ? "Broadcasting..." : "Synchronize Identity Ledger"}
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-5 bg-white/5 text-slate-400 font-black uppercase text-xs rounded-2xl hover:text-white transition-all">Cancel</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { icon: <TreeDeciduous />, val: totalTrees.toLocaleString(), label: "Verified Adoptions", color: "emerald" },
                    { icon: <Leaf />, val: `${(totalImpact * 1000000).toLocaleString()}g`, label: "Net Offset (Impact)", color: "emerald" },
                    { icon: <ShieldCheck />, val: "100%", label: "Traceability", color: "slate" },
                    { icon: <Award />, val: `#${1000 - totalTrees * 7}`, label: "Global Ranking", color: "slate" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-emerald-500 transition-colors" />
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-emerald-500">
                            {stat.icon}
                        </div>
                        <div className="text-4xl font-black text-slate-800 italic tracking-tighter mb-2">{stat.val}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Biodiversity Inventory */}
            <div className="bg-slate-50 border border-slate-100 p-12 rounded-[3.5rem] shadow-inner">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><TreeDeciduous className="text-emerald-500" /></div>
                        Stewardship Inventory
                    </h3>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">{myForest.length} Verified Assets</div>
                </div>

                {myForest.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-300">
                        <Globe size={48} className="mx-auto text-slate-200 mb-6" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Stewardship ledger is empty</p>
                        <p className="text-xs text-slate-300 font-bold mt-2">Visit the Terminal Marketplace to initialize your environmental footprint.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myForest.map((tree, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white border border-slate-200 rounded-[2.5rem] p-6 group transition-all shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <a href={`https://snowtrace.io/tx/${tree.txHash}`} target="_blank" className="p-3 bg-slate-900/80 backdrop-blur-md rounded-xl text-white block hover:bg-emerald-500 transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                </div>

                                <div className="h-48 w-full rounded-[2rem] overflow-hidden mb-6 relative">
                                    <img src={getImageUrl(tree.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={tree.name} />
                                    <div className="absolute bottom-4 left-4 bg-emerald-500/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[9px] font-black text-white uppercase tracking-widest">
                                        Verified: {tree.adoptionDate}
                                    </div>
                                </div>

                                <div className="px-2">
                                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-xl mb-1 italic leading-none">{tree.name}</h4>
                                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-6">{tree.scientific || "Verified Biological Unit"}</p>

                                    <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-800 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all flex items-center justify-center gap-3">
                                        <Download size={14} /> Legal Certificate
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
