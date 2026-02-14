import React, { useState, useEffect, useRef } from 'react';
import { Upload, Plus, FileText, MapPin, CheckCircle2, Leaf, Loader2, FileSearch, TrendingUp, Save, Hexagon, ArrowUpRight, Globe, ShieldCheck, X } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { uploadJSONToIPFS, uploadFileToIPFS } from '../services/pinataService';
import { AnimatePresence, motion } from 'framer-motion';
import supabaseService from '../services/supabaseService';
import { useLanguage } from '../context/LanguageContext';

const OriginatorPanel = ({ projects, onProjectsChange }) => {
    const { signer, contractAddresses, AMAZONAS_NFT_ABI, account } = useWeb3();
    const { t } = useLanguage();
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewProject, setViewProject] = useState(null);
    const [activeTab, setActiveTab] = useState('register'); // 'register' or 'impact'

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        coords: '',
        area: '',
        dept: 'Amazonas',
        regid: '',
        receivingWallet: ''
    });

    useEffect(() => {
        if (account && !formData.receivingWallet) {
            setFormData(prev => ({ ...prev, receivingWallet: account }));
        }
    }, [account]);

    const handleMint = async () => {
        if (!signer || !account) {
            alert("Connect Wallet first");
            return;
        }
        setIsSubmitting(true);
        try {
            // Mocking for now to avoid side-effects during UI cleanup
            setTimeout(() => {
                alert("Project Minted (UI Demo Mode)");
                setIsSubmitting(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10 pb-20 font-inter">
            {/* Page Header: Institutional & technical */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-10">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">
                        Asset Issuer Terminal
                    </h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-3">
                        Project Registration • Impact Verifier Node
                    </p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner">
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'register' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Project Registration
                    </button>
                    <button
                        onClick={() => setActiveTab('impact')}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'impact' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Impact Steward
                    </button>
                </div>
            </div>

            {activeTab === 'register' ? (
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* Registration Form */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-10 flex items-center gap-4 italic">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <Plus className="text-emerald-500" size={24} />
                                </div>
                                Mint New Carbon Asset
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Project Identifier</label>
                                    <input
                                        type="text"
                                        placeholder="Amazonas Forest Node #..."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Legal Area (Ha)</label>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                        value={formData.area}
                                        onChange={e => setFormData({ ...formData, area: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Geospatial Coords</label>
                                    <input
                                        type="text"
                                        placeholder="1.23, -75.45"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                        value={formData.coords}
                                        onChange={e => setFormData({ ...formData, coords: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Official RENARE ID</label>
                                    <input
                                        type="text"
                                        placeholder="COL-RENARE-XXXX"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                        value={formData.regid}
                                        onChange={e => setFormData({ ...formData, regid: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <button
                                    onClick={() => imageInputRef.current.click()}
                                    className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500/30 hover:bg-emerald-50/30 transition-all group"
                                >
                                    <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <Plus size={28} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add Project Imagery</span>
                                </button>
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500/30 hover:bg-emerald-50/30 transition-all group"
                                >
                                    <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={e => setSelectedFile(e.target.files[0])} />
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <FileText size={28} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Certification (.pdf)</span>
                                </button>
                            </div>

                            <button
                                onClick={handleMint}
                                disabled={isSubmitting}
                                className="w-full py-6 bg-slate-800 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 hover:text-black transition-all shadow-xl shadow-slate-200"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin inline mr-2" /> : "Authorize Settlement & Mint"}
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats / History */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4 italic">Active Projects Registry</h4>
                            <div className="space-y-4">
                                {projects.length === 0 ? (
                                    <div className="text-center py-10 opacity-30">
                                        <Globe size={32} className="mx-auto mb-2" />
                                        <p className="text-[9px] font-bold uppercase">No records found</p>
                                    </div>
                                ) : (
                                    projects.slice(0, 5).map((p, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-white transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden">
                                                    <img src={p.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-slate-800 uppercase italic tracking-tighter">{p.name}</div>
                                                    <div className="text-[8px] font-bold text-slate-400">{p.location}</div>
                                                </div>
                                            </div>
                                            <ArrowUpRight size={16} className="text-slate-200 group-hover:text-emerald-500 transition-all" />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-black shadow-lg shadow-emerald-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
                            <ShieldCheck size={40} className="mb-6 opacity-30" />
                            <h4 className="text-xl font-black uppercase tracking-tighter italic mb-4">Network Compliance</h4>
                            <p className="text-[10px] font-bold uppercase leading-relaxed text-emerald-950">
                                All project data is cross-verified against the Colombia RENARE infrastructure for radical integrity.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-40 border-2 border-dashed border-slate-100 rounded-[3rem]">
                    <div className="text-center space-y-4">
                        <TrendingUp size={48} className="text-slate-200 mx-auto" />
                        <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic">Impact Management System</h3>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Connect your verified project to start reporting real-time data.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OriginatorPanel;
