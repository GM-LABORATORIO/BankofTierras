import React, { useState, useEffect, useRef } from 'react';
import { Upload, Plus, FileText, MapPin, CheckCircle2, Leaf, Loader2, FileSearch, TrendingUp, Save } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { uploadJSONToIPFS, uploadFileToIPFS } from '../services/pinataService';
import { AnimatePresence, motion } from 'framer-motion';
import supabaseService from '../services/supabaseService';

const OriginatorPanel = ({ projects, onProjectsChange }) => {
    const { signer, contractAddresses, AMAZONAS_NFT_ABI, account } = useWeb3();
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewProject, setViewProject] = useState(null);

    // Tab State
    const [activeTab, setActiveTab] = useState('register'); // 'register' or 'impact'

    // Registration Form State
    const [formData, setFormData] = useState({
        name: '',
        coords: '',
        area: '',
        dept: 'Amazonas',
        regid: '',
        receivingWallet: ''
    });

    // Impact Management State
    const [stewardZones, setStewardZones] = useState([]);
    const [selectedImpactZone, setSelectedImpactZone] = useState(null);
    const [impactPixels, setImpactPixels] = useState([]);
    const [selectedPixel, setSelectedPixel] = useState(null);
    const [impactLoading, setImpactLoading] = useState(false);
    const [impactData, setImpactData] = useState({
        co2_captured_kg: 0,
        trees_planted: 0,
        funds_raised_usd: 0,
        species_protected: 0,
        current_health: 100,
        area_protected_m2: 10000,
        health_history: [],
        conservation_activities: [],
        experiences: [], // New: Trips, Webinars, etc.
        products: [],    // New: Local products
        stream_url: ''  // New: Live Cam URL
    });

    useEffect(() => {
        if (account) {
            if (!formData.receivingWallet) {
                setFormData(prev => ({ ...prev, receivingWallet: account }));
            }
            loadStewardData();
        }
    }, [account]);

    const loadStewardData = async () => {
        try {
            const zones = await supabaseService.getZonesBySteward(account);
            setStewardZones(zones || []);
        } catch (error) {
            console.error("Error loading steward data:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

    const handleMint = async () => {
        if (!signer || !account) {
            alert("Conecta tu wallet primero");
            return;
        }

        if (!selectedImage) {
            alert("Por favor selecciona una imagen de portada para el proyecto");
            return;
        }

        setIsSubmitting(true);
        try {
            const imgResult = await uploadFileToIPFS(selectedImage);
            if (!imgResult.success) throw new Error("Error subiendo imagen a IPFS");

            let certIpfsUrl = "ipfs://not-provided";
            if (selectedFile) {
                const certResult = await uploadFileToIPFS(selectedFile);
                if (certResult.success) certIpfsUrl = certResult.pinataURL;
            }

            const metadata = {
                name: formData.name,
                description: `Créditos de carbono generados mediante conservación de bosque primario en el departamento de ${formData.dept}, Amazonas Colombia.`,
                image: imgResult.pinataURL,
                attributes: [
                    { trait_type: "Ubicación", value: `${formData.dept}, Colombia` },
                    { trait_type: "Coordenadas", value: formData.coords },
                    { trait_type: "Área Protegida", value: `${formData.area} Hectáreas` },
                    { trait_type: "Estándar Legal", value: "RENARE Colombia" },
                    { trait_type: "ID de Registro Nacional", value: formData.regid || `COL-AMZ-${Date.now()}` }
                ]
            };

            const ipfsResult = await uploadJSONToIPFS(metadata);
            if (!ipfsResult.success) throw new Error("Error subiendo a IPFS");

            const nftContract = new ethers.Contract(contractAddresses.amazonasNFT, AMAZONAS_NFT_ABI, signer);
            const tx = await nftContract.mintProject(account, ipfsResult.pinataURL);
            const receipt = await tx.wait();

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

            const newProject = {
                id: realTokenId.toString(),
                name: formData.name,
                location: `${formData.dept}, Colombia`,
                coordinates: formData.coords,
                area: parseFloat(formData.area),
                regid: formData.regid || `COL-AMZ-${Date.now()}`,
                status: "Pendiente",
                image: imgResult.pinataURL,
                reportipfs: certIpfsUrl,
                owner_wallet: account,
                steward_wallet: account
            };

            await onProjectsChange([newProject, ...projects]);
            alert("¡Proyecto Minteado con Éxito!");
            setFormData({ name: '', coords: '', area: '', dept: 'Amazonas', regid: '', receivingWallet: account });
            setSelectedFile(null);
            setSelectedImage(null);

        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header / Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
                <div>
                    <h2 className="text-2xl font-black text-white">Panel de Originador</h2>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Gestión de Activos y Stewardships</p>
                </div>
                <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'register' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        REGISTRAR PROYECTO
                    </button>
                    <button
                        onClick={() => setActiveTab('impact')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'impact' ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        GESTIÓN DE IMPACTO
                    </button>
                </div>
            </div>

            {activeTab === 'register' ? (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                            <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                                <Plus size={20} className="text-emerald-500" /> Nuevo Registro de Conservación
                            </h3>

                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Nombre del Proyecto</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ej: Amazonía Leticia"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Área (Hectáreas)</label>
                                    <input
                                        type="number"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        placeholder="500"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Coordenadas GPS</label>
                                    <input
                                        type="text"
                                        value={formData.coords}
                                        onChange={(e) => setFormData({ ...formData, coords: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">ID RENARE</label>
                                    <input
                                        type="text"
                                        value={formData.regid}
                                        onChange={(e) => setFormData({ ...formData, regid: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Image & File Uploads */}
                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div
                                    onClick={() => imageInputRef.current.click()}
                                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedImage ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-emerald-500/50'}`}
                                >
                                    <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
                                    <Upload className="mb-2 text-gray-500" />
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedImage ? selectedImage.name : "Foto de Portada"}</p>
                                </div>
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedFile ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-emerald-500/50'}`}
                                >
                                    <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileChange} />
                                    <FileText className="mb-2 text-gray-500" />
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedFile ? selectedFile.name : "Evidencia Legal (PDF)"}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleMint}
                                disabled={isSubmitting}
                                className="w-full mt-8 py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin inline mr-2" /> : null}
                                Mintear NFT Proyecto
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                            <h3 className="text-lg font-bold mb-6">Tus Proyectos</h3>
                            <div className="space-y-4">
                                {projects
                                    .filter(p => p.steward_wallet && p.steward_wallet.toLowerCase() === account?.toLowerCase())
                                    .map(project => (
                                        <div
                                            key={project.id}
                                            onClick={() => setViewProject(project)}
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="font-bold text-sm group-hover:text-emerald-500">{project.name}</div>
                                                <span className="text-[8px] font-black px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full uppercase">{project.status}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                                <MapPin size={10} /> {project.location}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-emerald-500/10 rounded-2xl">
                                    <TrendingUp className="text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Reporte de Impacto Real</h3>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Carga evidencias desde el terreno</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Zona Bajo Custodia</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-emerald-500"
                                        onChange={async (e) => {
                                            const zid = e.target.value;
                                            setSelectedImpactZone(zid);
                                            if (zid) {
                                                const { data } = await supabaseService.supabase.from('pixels').select('*').eq('zone_id', zid);
                                                setImpactPixels(data || []);
                                            }
                                        }}
                                    >
                                        <option value="">Selecciona zona...</option>
                                        {stewardZones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Píxel Específico</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono outline-none focus:border-emerald-500"
                                        disabled={!selectedImpactZone}
                                        onChange={async (e) => {
                                            const pid = e.target.value;
                                            setSelectedPixel(pid);
                                            if (pid) {
                                                setImpactLoading(true);
                                                const impact = await supabaseService.getPixelImpact(pid);
                                                setImpactData(impact);
                                                setImpactLoading(false);
                                            }
                                        }}
                                    >
                                        <option value="">Selecciona píxel...</option>
                                        {impactPixels.map(p => <option key={p.id} value={p.custom_id}>{p.custom_id}</option>)}
                                    </select>
                                </div>
                            </div>

                            {selectedPixel && (
                                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest px-1">CO2 Capturado (Kg)</label>
                                        <input
                                            type="number"
                                            value={impactData.co2_captured_kg}
                                            onChange={e => setImpactData({ ...impactData, co2_captured_kg: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-black"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest px-1">Árboles Activos</label>
                                        <input
                                            type="number"
                                            value={impactData.trees_planted}
                                            onChange={e => setImpactData({ ...impactData, trees_planted: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-black"
                                        />
                                    </div>
                                    {/* Additional Impact Data */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest px-1">Especies Protegidas</label>
                                            <input
                                                type="number"
                                                value={impactData.species_protected}
                                                onChange={e => setImpactData({ ...impactData, species_protected: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-black"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest px-1">URL Transmisión Vivo</label>
                                            <input
                                                type="text"
                                                value={impactData.stream_url}
                                                onChange={e => setImpactData({ ...impactData, stream_url: e.target.value })}
                                                placeholder="https://..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-black"
                                            />
                                        </div>
                                    </div>

                                    {/* Experiences Section */}
                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest px-1">Vincular Experiencias / Turismo</label>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    placeholder="Nombre de la Experiencia"
                                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                                    id="exp_name"
                                                />
                                                <input
                                                    placeholder="Precio Estimado (USD)"
                                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                                    id="exp_price"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const name = document.getElementById('exp_name').value;
                                                    const price = document.getElementById('exp_price').value;
                                                    if (name && price) {
                                                        setImpactData({
                                                            ...impactData,
                                                            experiences: [...(impactData.experiences || []), { name, price, date: new Date().toISOString() }]
                                                        });
                                                        document.getElementById('exp_name').value = '';
                                                        document.getElementById('exp_price').value = '';
                                                    }
                                                }}
                                                className="w-full py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-500/30 transition-all"
                                            >
                                                + Añadir Experiencia
                                            </button>

                                            <div className="flex flex-wrap gap-2">
                                                {(impactData.experiences || []).map((exp, i) => (
                                                    <div key={i} className="bg-black/60 px-3 py-1 rounded-full text-[9px] font-bold text-gray-300 border border-white/5 flex items-center gap-2">
                                                        {exp.name} (${exp.price})
                                                        <button onClick={() => setImpactData({ ...impactData, experiences: impactData.experiences.filter((_, idx) => idx !== i) })} className="text-red-500 hover:text-red-400">×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-2 pt-4">
                                        <button
                                            onClick={async () => {
                                                setImpactLoading(true);
                                                await supabaseService.upsertPixelImpact({ ...impactData, pixel_id: selectedPixel });
                                                alert("Impacto actualizado");
                                                setImpactLoading(false);
                                            }}
                                            className="w-full py-4 bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:border-emerald-500 transition-all"
                                        >
                                            {impactLoading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                            Subir Reporte al Mapa
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">Tu Responsabilidad como Steward</h4>
                            <p className="text-[9px] text-gray-400 font-bold uppercase leading-relaxed">
                                Los datos aquí registrados se vincularán directamente al NFT del usuario guardián. La veracidad de la información es auditada periódicamente por el protocolo Bank of Tierras.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* View Project Modal (Minimal) */}
            <AnimatePresence>
                {viewProject && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6"
                        onClick={() => setViewProject(null)}
                    >
                        <motion.div
                            className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[3rem] w-full max-w-lg"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-black mb-4">{viewProject.name}</h3>
                            <img src={viewProject.image} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-2xl" alt="Project" />
                            <div className="space-y-2 text-xs font-bold text-gray-400 mb-6">
                                <p>COORDENADAS: {viewProject.coordinates}</p>
                                <p>ÁREA: {viewProject.area} Ha</p>
                                <p>ID RENARE: {viewProject.regid}</p>
                            </div>
                            <button onClick={() => setViewProject(null)} className="w-full py-4 bg-emerald-500 rounded-xl font-black text-xs uppercase tracking-widest">Cerrar</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OriginatorPanel;
