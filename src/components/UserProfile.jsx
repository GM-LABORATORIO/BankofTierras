import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, TreeDeciduous, Award, ShieldCheck, Leaf, ExternalLink, Download, Loader2 } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { supabaseService } from '../services/supabaseService';
import { uploadFileToIPFS } from '../services/pinataService';

const UserProfile = ({ myForest, onProfileUpdate }) => {
    const { account } = useWeb3();
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

    // Load Profile Data
    useEffect(() => {
        if (account) {
            const loadProfile = async () => {
                try {
                    const data = await supabaseService.getProfile(account);
                    if (data) {
                        setProfileData({
                            name: data.name || '',
                            company_name: data.company_name || '',
                            tax_id: data.tax_id || '',
                            company_logo: data.company_logo || '',
                            employee_count: data.employee_count || 0,
                            bio: data.preferences?.bio || '', // Using preferences for Bio strictly or could add bio column
                            role: data.role || 'guardian',
                            entityType: data.entity_type || 'individual'
                        });
                    }
                } catch (error) {
                    console.error("Error loading profile:", error);
                }
            };
            loadProfile();
        }
    }, [account]);

    // Calculate Stats
    const totalTrees = myForest.length;
    const totalImpact = totalTrees * 0.5;
    const level = totalTrees > 10 ? "Guardián Legendario" : totalTrees > 5 ? "Protector del Bosque" : "Iniciado";
    const nextLevel = totalTrees > 10 ? "Máximo Nivel" : totalTrees > 5 ? 11 : 6;
    const progress = totalTrees > 10 ? 100 : ((totalTrees % 5) / 5) * 100;

    const getImageUrl = (image) => {
        if (!image) return "https://images.unsplash.com/photo-1546272446-615729161cb9?auto=format&fit=crop&q=80&w=800";
        if (image.startsWith('http')) return image;
        if (image.includes('/')) return image;
        return `https://gateway.pinata.cloud/ipfs/${image}`;
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const result = await uploadFileToIPFS(file);
            if (result.success) {
                // Pinata returns ipfs://Hash
                const hash = result.pinataURL.replace('ipfs://', '');
                setProfileData(prev => ({ ...prev, company_logo: hash }));
            } else {
                alert("Error al subir logo: " + result.message);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error al subir archivo");
        } finally {
            setIsUploading(false);
        }
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
            alert("Perfil actualizado correctamente en Bank of Tierras Cloud");
        } catch (error) {
            console.error(error);
            alert("Error al guardar perfil: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Profile Card */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -mr-32 -mt-32" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-32 rounded-3xl border-2 border-white/5 bg-black/40 p-4 relative group/logo flex items-center justify-center overflow-hidden">
                        {profileData.company_logo ? (
                            <img src={getImageUrl(profileData.company_logo)} className="max-w-full max-h-full object-contain" alt="Company Logo" />
                        ) : (
                            <User size={64} className="text-emerald-500 opacity-20" />
                        )}
                    </div>

                    <div className="text-center md:text-left flex-1 w-full">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
                                    {profileData.name || "Perfil de Guardián"}
                                </h2>
                                <div className="font-mono text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-xl inline-block mb-4 text-xs tracking-wider">
                                    {account || "Wallet no conectada"}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-500 transition-colors"
                            >
                                {isEditing ? "Cancelar Edición" : "Editar Datos"}
                            </button>
                        </div>

                        {isEditing ? (
                            <motion.form
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4 max-w-lg"
                                onSubmit={handleSaveProfile}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Nombre de Empresa</label>
                                        <input
                                            value={profileData.company_name}
                                            onChange={e => setProfileData({ ...profileData, company_name: e.target.value })}
                                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 outline-none"
                                            placeholder="Tu Empresa S.A.S"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Logo (PNG/JPG)</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="hidden"
                                                id="logo-upload"
                                            />
                                            <label
                                                htmlFor="logo-upload"
                                                className={`w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-center cursor-pointer hover:border-emerald-500 transition-all flex items-center justify-center gap-2 ${isUploading ? 'opacity-50' : ''}`}
                                            >
                                                {isUploading ? <Loader2 size={12} className="animate-spin" /> : <ExternalLink size={12} />}
                                                {profileData.company_logo ? "Cambiar Logo" : "Subir Logo PNG"}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">NIT / Tax ID</label>
                                        <input
                                            value={profileData.tax_id}
                                            onChange={e => setProfileData({ ...profileData, tax_id: e.target.value })}
                                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 outline-none"
                                            placeholder="900.000.000-1"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">N. Empleados (Ley 2173)</label>
                                        <input
                                            type="number"
                                            value={profileData.employee_count}
                                            onChange={e => setProfileData({ ...profileData, employee_count: e.target.value })}
                                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 outline-none"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Tipo de Actor</label>
                                        <select
                                            value={profileData.role}
                                            onChange={e => setProfileData({ ...profileData, role: e.target.value })}
                                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 outline-none appearance-none"
                                        >
                                            <option value="guardian">Guardián (Individual)</option>
                                            <option value="company">Empresa (Sostenibilidad)</option>
                                            <option value="originator">Originador (Alcaldía/ONG)</option>
                                            <option value="auditor">Auditor Verificado</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Bio / Misión</label>
                                        <textarea
                                            value={profileData.bio}
                                            onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 outline-none h-20"
                                            placeholder="Describe tu compromiso con el planeta..."
                                        />
                                    </div>
                                </div>
                                <button disabled={isLoading} className="w-full py-3 bg-emerald-500 text-white font-black uppercase text-xs rounded-xl hover:bg-emerald-600 transition-colors">
                                    {isLoading ? "Guardando..." : "Guardar Cambios"}
                                </button>
                            </motion.form>
                        ) : (
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    {level}
                                </div>
                                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <Award size={14} className="text-yellow-500" />
                                    Top 5% Adoptantes
                                </div>
                                <div className="px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                    <User size={14} />
                                    Rol: {profileData.role === 'originator' ? 'Originador (Alcaldía)' : profileData.role.toUpperCase()}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Level Progress */}
                    <div className="w-full md:w-64 bg-black/40 p-6 rounded-2xl border border-white/5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                            <span>Progreso Nivel</span>
                            <span>{totalTrees} / {nextLevel}</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            />
                        </div>
                        <div className="mt-2 text-[9px] text-gray-600 text-center">
                            ¡Adopta {nextLevel - totalTrees} árboles más para subir de nivel!
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group text-center">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <TreeDeciduous className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">{totalTrees}</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Árboles Adoptados</div>
                </div>
                <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group text-center">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Leaf className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">{totalImpact}t</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">CO2 Compensado</div>
                </div>
                <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group text-center">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">100%</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Trazabilidad</div>
                </div>
                <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group text-center">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Award className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">#{1000 - totalTrees * 7}</div>
                    <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Ranking Global</div>
                </div>
            </div>

            {/* My Forest Grid */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <TreeDeciduous className="text-emerald-500" />
                    Tu Bosque Digital
                </h3>

                {myForest.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <TreeDeciduous size={48} className="mx-auto text-gray-700 mb-4" />
                        <p className="text-gray-500 font-bold">Aún no has adoptado ningún árbol.</p>
                        <p className="text-xs text-gray-600 mt-2">Visita el Mercado para comenzar tu legado.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myForest.map((tree, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-black border border-white/10 p-5 rounded-3xl group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <a href={`https://snowtrace.io/tx/${tree.txHash}`} target="_blank" className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white block hover:bg-emerald-500 transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                </div>

                                <div className="h-40 w-full rounded-2xl overflow-hidden mb-4 relative">
                                    <img src={getImageUrl(tree.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={tree.name} />
                                    <div className="absolute bottom-2 left-2 bg-emerald-500/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">
                                        {tree.adoptionDate}
                                    </div>
                                </div>

                                <h4 className="font-black text-white uppercase tracking-wider mb-1">{tree.name}</h4>
                                <p className="text-[10px] text-emerald-500 font-black mb-4">{tree.scientific}</p>

                                <div className="flex gap-2">
                                    <button className="flex-1 py-3 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Download size={14} /> Certificado
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
