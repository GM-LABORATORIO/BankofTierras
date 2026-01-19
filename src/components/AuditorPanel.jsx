import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, XCircle, FileSearch, Fingerprint, Clock, Loader2, MapPin, Leaf, FileText } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants/mockData';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { supabaseService } from '../services/supabaseService';

const AuditorPanel = ({ projects, onProjectsChange }) => {
    const { signer, contractAddresses, AMAZONAS_NFT_ABI, CARBON_TOKEN_ABI, account } = useWeb3();
    const [isVerifying, setIsVerifying] = useState(null); // Will store tokenId
    const [viewProject, setViewProject] = useState(null);

    const pendingProjects = projects.filter(p => p.status === 'Pendiente');
    const verifiedProjects = projects.filter(p => p.status === 'Verificado');

    const handleVerify = async (project) => {
        if (!signer) {
            alert("Conecta tu wallet");
            return;
        }

        // Resilient ID selection
        const blockchainId = project.tokenId || project.token_id || (!isNaN(project.id) ? project.id : null);

        if (!blockchainId || blockchainId.toString().includes('-')) {
            alert("ERROR TÉCNICO: Este proyecto (UUID: " + project.id + ") no tiene vinculado un Token ID de la blockchain. Probablemente fue creado antes de la actualización del sistema. Por favor, realiza una nueva prueba emitiendo un proyecto.");
            return;
        }

        console.log("Intentando verificar proyecto:", { id: project.id, blockchainId });
        setIsVerifying(project.id);
        try {
            const nftContract = new ethers.Contract(
                contractAddresses.amazonasNFT,
                AMAZONAS_NFT_ABI,
                signer
            );

            const tx = await nftContract.verifyProject(blockchainId);
            await tx.wait();

            // Actualizar estado local (Dashboard se encarga de Supabase)
            const updatedProjects = projects.map(p =>
                p.id === project.id ? { ...p, status: 'Verificado' } : p
            );
            await onProjectsChange(updatedProjects);
            if (viewProject && viewProject.id === project.id) {
                setViewProject({ ...viewProject, status: 'Verificado' });
            }

            alert("¡Proyecto Verificado con Éxito! " + tx.hash);
        } catch (error) {
            console.error("Error en verifyProject:", error);
            alert("Error de Blockchain: " + (error.reason || error.message));
        } finally {
            setIsVerifying(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Modal de Detalle para Auditor */}
            <AnimatePresence>
                {viewProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050505]/95 backdrop-blur-md"
                        onClick={() => setViewProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] max-w-2xl w-full shadow-2xl relative overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Revisión de Auditoría</div>
                                    <h3 className="text-3xl font-black text-white">{viewProject.name}</h3>
                                </div>
                                <button onClick={() => setViewProject(null)} className="text-gray-500 hover:text-white transition-colors text-2xl font-black">×</button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Área Protegida</div>
                                    <div className="font-bold text-sm flex items-center gap-2"><Leaf size={14} className="text-emerald-500" /> {viewProject.area}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID Registro</div>
                                    <div className="font-mono text-xs text-emerald-400">{viewProject.regid && viewProject.regid !== "" ? viewProject.regid : "PEND-ASIGN"}</div>
                                </div>
                            </div>

                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 mb-8">
                                <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4">Cálculo de Emisión Propuesto</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Captura de Carbono (Est.)</span>
                                        <span className="font-bold">{(parseFloat(viewProject.area) || 0) * 2.5} tCO2/año</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t border-white/5 pt-3">
                                        <span className="text-gray-400">Tokens a Emitir ($CARBON)</span>
                                        <span className="font-black text-emerald-500 text-lg">{(parseFloat(viewProject.area) || 0) * 2.5} AMZ-CO2</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={viewProject.reportipfs ? (viewProject.reportipfs.startsWith('http') ? viewProject.reportipfs : `https://gateway.pinata.cloud/ipfs/${viewProject.reportipfs.split('//')[1] || viewProject.reportipfs}`) : "#"}
                                    target="_blank"
                                    className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <FileSearch size={18} /> Revisar Evidencia
                                </a>
                                {viewProject.status === 'Pendiente' && (
                                    <button
                                        onClick={() => handleVerify(viewProject)}
                                        disabled={isVerifying === viewProject.id}
                                        className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isVerifying === viewProject.id ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
                                        FIRMAR Y VERIFICAR
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Welcome Header */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2 text-white">Panel de Auditoría Técnica</h2>
                    <p className="text-gray-400 max-w-xl">Valida la veracidad de los proyectos inscritos y autoriza la emisión de activos digitales de carbono.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent flex items-center justify-center">
                    <ShieldCheck className="w-32 h-32 text-emerald-500/20 -rotate-12" />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Pending & Verified Queue */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={16} />
                        Cola de Verificación ({pendingProjects.length})
                    </h3>

                    <div className="space-y-4">
                        {pendingProjects.length === 0 && (
                            <div className="p-12 text-center bg-white/5 border border-dashed border-white/10 rounded-2xl text-gray-500 font-bold">
                                No hay proyectos pendientes de auditoría
                            </div>
                        )}
                        {pendingProjects.map(project => (
                            <div
                                key={`auditor-pending-${project.id}`}
                                onClick={() => setViewProject(project)}
                                className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all cursor-pointer group"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">{project.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <MapPin size={12} /> {project.location} • {project.area}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-black bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">PENDIENTE</div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setViewProject(project); }}
                                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FileSearch size={14} /> REVISAR DETALLES
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleVerify(project); }}
                                            disabled={isVerifying === project.id}
                                            className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-black text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                                        >
                                            {isVerifying === project.id ? <Loader2 className="animate-spin" size={14} /> : <ShieldCheck size={14} />}
                                            FIRMAR AHORA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mt-12">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        Proyectos Verificados ({verifiedProjects.length})
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {verifiedProjects.map(project => (
                            <div
                                key={`auditor-verified-${project.id}`}
                                onClick={() => setViewProject(project)}
                                className="bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl overflow-hidden cursor-pointer hover:bg-emerald-500/[0.02] transition-colors"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-sm">{project.name}</h4>
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    </div>
                                    <div className="text-[10px] text-gray-500 italic">Lista para el mercado de carbono</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Auditor Stats/Identity */}
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                            <Fingerprint size={16} className="text-emerald-500" />
                            Credencial de Auditor
                        </h3>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-6">
                            <div className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Status: Whitelisted</div>
                            <div className="text-xs font-mono truncate text-emerald-400">{account || "No conectado"}</div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Verificaciones Totales</span>
                                <span className="font-bold">142</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Tons Avaladas</span>
                                <span className="font-bold">84,200</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-bold mb-4">Actividad Reciente</h3>
                        <div className="space-y-3">
                            {verifiedProjects.slice(0, 3).map(p => (
                                <div key={`auditor-recent-${p.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold truncate">{p.name}</div>
                                        <div className="text-[10px] text-gray-500">Verificado hace 2h</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditorPanel;
