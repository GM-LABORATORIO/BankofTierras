import React, { useState } from 'react';
import { Upload, Plus, FileText, MapPin, CheckCircle2, Clock, Leaf, Loader2 } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants/mockData';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { uploadJSONToIPFS } from '../services/pinataService';
import { AnimatePresence, motion } from 'framer-motion';

const OriginatorPanel = ({ projects, setProjects }) => {
    const { signer, contractAddresses, AMAZONAS_NFT_ABI, account } = useWeb3();
    const fileInputRef = React.useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewProject, setViewProject] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        coords: '',
        area: '',
        dept: 'Amazonas'
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) setSelectedFile(file);
    };

    const handleMint = async () => {
        if (!signer || !account) {
            alert("Conecta tu wallet primero");
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Prepare Metadata (Matching User's technical requirement)
            const metadata = {
                name: formData.name,
                description: `Créditos de carbono generados mediante conservación de bosque primario en el departamento de ${formData.dept}, Amazonas Colombia.`,
                image: "ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco", // Generic forest image
                attributes: [
                    { trait_type: "Ubicación", value: `${formData.dept}, Colombia` },
                    { trait_type: "Coordenadas", value: formData.coords },
                    { trait_type: "Área Protegida", value: `${formData.area} Hectáreas` },
                    { trait_type: "Estándar Legal", value: "RENARE Colombia" },
                    { trait_type: "ID de Registro Nacional", value: `COL-RENARE-2026-${Math.floor(Math.random() * 9000) + 1000}` },
                    { trait_type: "Estado de Auditoría", value: "Pendiente" }
                ],
                external_url: `https://amazonas-cero.vercel.app/proyectos/${formData.area}`,
                provenance: {
                    auditor_signature: "Pendiente de verificación",
                    verification_report_ipfs: "ipfs://pend",
                    legal_owner: `Comunidad Local - ${account.substring(0, 6)}...`,
                    file_attached: selectedFile ? selectedFile.name : "Ninguno"
                }
            };

            // 2. Upload to IPFS
            const ipfsResult = await uploadJSONToIPFS(metadata);
            if (!ipfsResult.success) throw new Error("Error subiendo a IPFS");

            // 3. Mint on Contract
            const nftContract = new ethers.Contract(
                contractAddresses.amazonasNFT,
                AMAZONAS_NFT_ABI,
                signer
            );

            const tx = await nftContract.mintProject(account, ipfsResult.pinataURL);
            const receipt = await tx.wait();

            // Extract tokenId from ProjectMinted event
            // ProjectMinted(uint256 indexed tokenId, address indexed owner, string tokenURI)
            const event = receipt.logs.find(log => log.index !== undefined);
            // Since we use safeMint/mintProject, there's also a Transfer event. 
            // The ProjectMinted event is the one we want.
            // For simplicity in the demo, the contract's _nextTokenId++ means the first one is 0.
            // If we can't find the event, we fallback to finding the first Transfer event.
            let realTokenId = Date.now();
            try {
                const iface = new ethers.Interface(AMAZONAS_NFT_ABI);
                for (const log of receipt.logs) {
                    try {
                        const parsed = iface.parseLog(log);
                        if (parsed.name === 'ProjectMinted') {
                            realTokenId = parsed.args[0];
                            break;
                        }
                    } catch (e) { continue; }
                }
            } catch (e) { console.error("Could not parse logs", e); }

            // 4. Update local state for demo
            const newProject = {
                id: realTokenId.toString(),
                name: formData.name,
                location: `${formData.dept}, Colombia`,
                coordinates: formData.coords,
                area: `${formData.area} Hectáreas`,
                standard: "RENARE Colombia",
                regId: metadata.attributes[4].value,
                status: "Pendiente",
                image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
                description: metadata.description,
                reportIpfs: ipfsResult.pinataURL
            };

            setProjects([newProject, ...projects]);
            alert("¡Proyecto Minteado con Éxito! Vinculado a IPFS permanentemente.");
            setSelectedFile(null);
            setFormData({ name: '', coords: '', area: '', dept: 'Amazonas' });

        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Modal de Detalle */}
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
                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Detalles del Activo</div>
                                    <h3 className="text-3xl font-black text-white">{viewProject.name}</h3>
                                </div>
                                <button onClick={() => setViewProject(null)} className="text-gray-500 hover:text-white transition-colors text-2xl font-black">×</button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Ubicación</div>
                                    <div className="font-bold text-sm flex items-center gap-2"><MapPin size={14} className="text-emerald-500" /> {viewProject.location}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Área Total</div>
                                    <div className="font-bold text-sm flex items-center gap-2"><Leaf size={14} className="text-emerald-500" /> {viewProject.area}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Coordenadas</div>
                                    <div className="font-mono text-xs">{viewProject.coordinates}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">ID RENARE</div>
                                    <div className="font-mono text-xs text-emerald-400">{viewProject.regId}</div>
                                </div>
                            </div>

                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 mb-8">
                                <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={16} /> Predicción de Economía Circular
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">CO2 Capturado Est.</div>
                                        <div className="text-2xl font-black">{parseInt(viewProject.area) * 2.5} <span className="text-xs text-gray-400">t/año</span></div>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Emisión de $CARBON</div>
                                        <div className="text-2xl font-black text-emerald-500">{parseInt(viewProject.area) * 2.5} <span className="text-xs text-gray-400">Tokens</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8 overflow-y-auto max-h-[400px] rounded-[2rem] border border-white/10 group relative custom-scrollbar">
                                <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10 pointer-events-none">
                                    <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Documento Verificado</div>
                                </div>
                                <div className="text-[10px] font-black p-4 bg-white/5 border-b border-white/5 uppercase tracking-widest flex items-center gap-2 sticky top-0 z-20 backdrop-blur-md">
                                    <FileText size={12} className="text-emerald-500" /> Vista Previa Certificado RENARE
                                </div>
                                <img
                                    src="/src/assets/docs/renare_sample.png"
                                    alt="Certificado RENARE"
                                    className="w-full h-auto filter contrast-125 saturate-125 transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex gap-4">
                                <a
                                    href={`https://gateway.pinata.cloud/ipfs/${viewProject.reportIpfs?.split('//')[1]}`}
                                    target="_blank"
                                    className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <FileText size={18} /> Ver Evidencia IPFS
                                </a>
                                <button
                                    onClick={() => setViewProject(null)}
                                    className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all"
                                >
                                    Cerrar Vista
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Welcome Header */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2 text-white">Gestiona tu Proyecto Amazonía</h2>
                    <p className="text-gray-400 max-w-xl">Registra nuevas hectáreas, sube pruebas de conservación y monitorea el estado de tus créditos de CO2.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent flex items-center justify-center">
                    <Leaf className="w-32 h-32 text-emerald-500/20 rotate-12" />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Registration Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-emerald-500" />
                            Nuevo Registro de Conservación
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Nombre del Proyecto</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ej: Amazonía Vital Leticia"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Coordenadas GPS</label>
                                    <input
                                        type="text"
                                        value={formData.coords}
                                        onChange={(e) => setFormData({ ...formData, coords: e.target.value })}
                                        placeholder="0°00'00'' N 0°00'00'' W"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Área (Hectáreas)</label>
                                    <input
                                        type="number"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        placeholder="500"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Departamento</label>
                                    <select
                                        value={formData.dept}
                                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    >
                                        <option>Amazonas</option>
                                        <option>Caquetá</option>
                                        <option>Putumayo</option>
                                        <option>Guainía</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Evidencia Legal (PDF / Auditoría)</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg"
                            />
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-white/[0.02] ${selectedFile ? 'border-emerald-500' : 'border-white/10 hover:border-emerald-500/50'}`}
                            >
                                {selectedFile ? (
                                    <>
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-4" />
                                        <p className="text-sm text-white font-bold mb-1">{selectedFile.name}</p>
                                        <p className="text-xs text-gray-500">Archivo listo para vincular al NFT</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-10 h-10 text-gray-500 mb-4" />
                                        <p className="text-sm text-gray-400 mb-2">Arrastra tu certificación de RENARE o haz clic para subir</p>
                                        <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors">Seleccionar Archivo</button>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleMint}
                            disabled={isSubmitting}
                            className="w-full mt-6 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <><Loader2 className="animate-spin" size={20} />Procesando...</> : "Mintear NFT Proyecto"}
                        </button>
                    </div>
                </div>

                {/* Status Tracker */}
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-lg font-bold mb-6">Tus Proyectos</h3>
                        <div className="space-y-4">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    onClick={() => setViewProject(project)}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="font-bold text-sm group-hover:text-emerald-500 transition-colors">{project.name}</div>
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${project.status === 'Verificado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                        <MapPin size={12} />
                                        {project.location}
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-3 border-t border-white/5">
                                        <div className="flex items-center gap-1">
                                            <FileText size={12} />
                                            Certificado IPFS
                                        </div>
                                        <div className="font-mono text-emerald-500">ID: {project.regId.split('-').pop()}</div>
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

export default OriginatorPanel;
