import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shrub as Tree, Info, Globe, ShieldCheck, MapPin, ExternalLink, QrCode, Download, CheckCircle2, Settings, Search, Loader2 } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import { supabaseService } from '../services/supabaseService';

const TreeMarketplace = ({ species, setSpecies, resetSpecies, myForest, setMyForest }) => {
    const { signer, contractAddresses, CARBON_TOKEN_ABI, account } = useWeb3();
    const [selectedTree, setSelectedTree] = useState(null);
    const [isAdopted, setIsAdopted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [guardianName, setGuardianName] = useState('');

    const getImageUrl = (image) => {
        if (!image) return "https://images.unsplash.com/photo-1546272446-615729161cb9?auto=format&fit=crop&q=80&w=800";
        if (image.startsWith('http')) return image;
        if (image.includes('/')) return image;
        return `https://gateway.pinata.cloud/ipfs/${image}`;
    };

    const handleAdopt = async (tree) => {
        if (!signer || !account) {
            alert("Por favor, conecta tu wallet antes de adoptar.");
            return;
        }

        setIsProcessing(true);
        try {
            const tokenContract = new ethers.Contract(
                contractAddresses.carbonToken,
                CARBON_TOKEN_ABI,
                signer
            );

            // Extraer valor numérico del costo (ej: "500 $CARBON" -> 500)
            const costValue = tree.cost.split(' ')[0].replace(/,/g, '');
            const amount = ethers.parseUnits(costValue, 18);

            // En este flujo, el usuario transfiere los tokens al "Fondo de Conservación" (el dueño del contrato)
            // Para el demo, los enviamos a una dirección de tesorería o al mismo admin que emitió
            const treasuryAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"; // Dirección de ejemplo para el fondo

            const tx = await tokenContract.transfer(treasuryAddress, amount);
            await tx.wait();

            setIsAdopted(true);
            const adoptionItem = {
                ...tree,
                db_id: tree.id, // Store DB ID to link in adoptions table
                id: `adoption-${Date.now()}`,
                adoptionDate: new Date().toLocaleDateString(),
                owner: guardianName || 'Anónimo',
                wallet: account,
                txHash: tx.hash
            };
            setMyForest([...myForest, adoptionItem]);

        } catch (error) {
            console.error(error);
            alert("Error en la adopción: " + (error.reason || error.message));
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpdateSpecies = (e) => {
        e.preventDefault();
        if (isAdding) {
            const newItem = {
                ...editingItem,
                id: `new-${Date.now()}`
            };
            setSpecies([...species, newItem]);
            setIsAdding(false);
        } else {
            const updated = species.map(s => s.id === editingItem.id ? editingItem : s);
            setSpecies(updated);
        }
        setEditingItem(null);
    };

    const startAdding = () => {
        setEditingItem({
            name: '',
            scientific: '',
            description: '',
            impact: '',
            cost: '100 $CARBON',
            category: 'Fauna',
            status: 'Protegido',
            image: ''
        });
        setIsAdding(true);
    };

    return (
        <div className="space-y-6 lg:space-y-10 pb-20 px-4 md:px-0">
            {/* Header / Hero */}
            <div className="relative min-h-[300px] lg:h-64 rounded-3xl lg:rounded-[2.5rem] overflow-hidden group border border-white/5">
                <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Amazon rainforest"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-4">Adopt a Tree Initiative</div>
                            <h2 className="text-3xl lg:text-5xl font-black text-white mb-2 italic leading-tight uppercase tracking-tighter">Adopta un Respiro</h2>
                            <p className="text-gray-300 max-w-md text-sm font-medium hidden md:block">
                                Cada contribución en $CARBON financia la protección inmediata de estas especies emblemáticas y su hábitat primario en el Amazonas.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {isAdmin && (
                                <>
                                    <button
                                        onClick={resetSpecies}
                                        className="p-3 bg-red-500/20 border border-red-500/40 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-2xl"
                                        title="Resetear Catálogo a Original"
                                    >
                                        <Download size={20} className="rotate-180" />
                                    </button>
                                    <button
                                        onClick={startAdding}
                                        className="p-3 bg-emerald-500 border border-emerald-500 text-white rounded-2xl transition-all shadow-2xl"
                                        title="Agregar nueva especie"
                                    >
                                        <Tree size={20} />
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setIsAdmin(!isAdmin)}
                                className={`p-3 rounded-2xl border transition-all shadow-2xl ${isAdmin ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'}`}
                                title="Modo Edición para Demo"
                            >
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Summary - Horizontal scroll on mobile */}
            <div className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar select-none">
                {[
                    { label: "Especies Vigiladas", value: species.length.toString(), icon: <ShieldCheck size={16} /> },
                    { label: "Capacidad Circular", value: "850k $C", icon: <Globe size={16} /> },
                    { label: "Adoptantes Hoy", value: "112", icon: <Heart size={16} /> },
                ].map((stat, i) => (
                    <div key={i} className="min-w-[200px] lg:min-w-0 bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl group hover:border-emerald-500/30 transition-all">
                        <div className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2 mb-1">
                            {stat.icon} {stat.label}
                        </div>
                        <div className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Catalog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {species.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/30 transition-all flex flex-col group relative"
                    >
                        {isAdmin && (
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingItem(item);
                                }}
                                className="absolute top-6 right-6 z-20 p-3 bg-emerald-500 text-white rounded-2xl shadow-2xl hover:scale-110 transition-transform"
                                title="Editar esta especie"
                            >
                                <Settings size={16} />
                            </button>
                        )}
                        <div className="h-64 relative overflow-hidden">
                            <img src={getImageUrl(item.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg">{item.category}</span>
                                <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg ${item.status === 'En Peligro' ? 'bg-red-500/20 text-red-500' :
                                    item.status === 'Vulnerable' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="absolute bottom-6 left-8">
                                <span className="text-xs font-black text-white/50 uppercase tracking-[0.2em]">{item.scientific}</span>
                            </div>
                        </div>
                        <div className="p-8 pb-10 flex-1 flex flex-col">
                            <div className="mb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-black text-3xl text-white italic group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{item.name || "Nueva Especie"}</h3>
                                    <div className="text-emerald-500 font-black text-sm tracking-widest">{item.cost}</div>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{item.description || "Sin descripción proporcionada."}</p>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest outline-none">Impacto</div>
                                    <div className="text-xs font-bold text-white flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        {item.impact || "Pendiente"}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTree(item)}
                                    className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-2xl hover:shadow-emerald-500/20 uppercase tracking-widest"
                                >
                                    Adoptar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Admin Editor Modal (Handles both Edit and Add) */}
            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
                    >
                        <motion.form
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            onSubmit={handleUpdateSpecies}
                            className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] max-w-xl w-full space-y-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter relative z-10">
                                {isAdding ? "Agregar Especie" : "Configurar Especie"}
                            </h3>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Nombre Común</label>
                                    <input
                                        required
                                        value={editingItem.name}
                                        onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-bold"
                                        placeholder="Ej: Jaguar"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Nombre Científico</label>
                                    <input
                                        required
                                        value={editingItem.scientific}
                                        onChange={e => setEditingItem({ ...editingItem, scientific: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-bold"
                                        placeholder="Ej: Panthera onca"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Categoría</label>
                                    <select
                                        value={editingItem.category}
                                        onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-bold appearance-none"
                                    >
                                        <option value="Fauna">Fauna</option>
                                        <option value="Flora">Flora</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Status</label>
                                    <select
                                        value={editingItem.status}
                                        onChange={e => setEditingItem({ ...editingItem, status: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-bold appearance-none"
                                    >
                                        <option value="Protegido">Protegido</option>
                                        <option value="Vulnerable">Vulnerable</option>
                                        <option value="Casi Amenazado">Casi Amenazado</option>
                                        <option value="En Peligro">En Peligro</option>
                                        <option value="Crítico">Crítico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 relative z-10">
                                <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">URL de la Imagen (Pinata/Unsplash)</label>
                                <input
                                    required
                                    value={editingItem.image}
                                    onChange={e => setEditingItem({ ...editingItem, image: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-white/50 font-mono text-xs"
                                    placeholder="https://gateway.pinata.cloud/ipfs/..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Costo ($CARBON)</label>
                                    <input
                                        required
                                        value={editingItem.cost}
                                        onChange={e => setEditingItem({ ...editingItem, cost: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-emerald-500 font-black"
                                        placeholder="Ej: 100 $CARBON"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Impacto</label>
                                    <input
                                        required
                                        value={editingItem.impact}
                                        onChange={e => setEditingItem({ ...editingItem, impact: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-bold"
                                        placeholder="Ej: Protección 10ha"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 relative z-10">
                                <label className="text-[10px] font-black text-gray-500 uppercase px-1 tracking-widest">Descripción</label>
                                <textarea
                                    required
                                    value={editingItem.description}
                                    rows={3}
                                    onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors text-gray-300 antialiased"
                                    placeholder="Describe la importancia de esta especie..."
                                />
                            </div>

                            <div className="flex gap-4 pt-6 relative z-10">
                                <button type="button" onClick={() => {
                                    setEditingItem(null);
                                    setIsAdding(false);
                                }} className="flex-1 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Cancelar</button>
                                <button type="submit" className="flex-1 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20">
                                    {isAdding ? "Añadir al Catálogo" : "Guardar Cambios"}
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Adoption Checkout Modal */}
            <AnimatePresence>
                {selectedTree && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/98 backdrop-blur-2xl"
                        onClick={() => !isAdopted && setSelectedTree(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 p-10 lg:p-12 rounded-[3.5rem] max-w-xl w-full relative overflow-y-auto max-h-[90vh] text-center shadow-[0_0_100px_rgba(16,185,129,0.1)] custom-scrollbar"
                            onClick={e => e.stopPropagation()}
                        >
                            {!isAdopted ? (
                                <>
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                                        <Tree className="text-emerald-500 w-12 h-12" />
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tight italic">Finalizar Adopción</h3>
                                    <p className="text-gray-400 mb-8 px-8 text-sm leading-relaxed">
                                        Estás a un paso de convertirte en guardián oficial del **{selectedTree.name}**.
                                        Este intercambio inyecta liquidez en el proyecto de conservación.
                                    </p>

                                    <div className="mb-8 px-8">
                                        <label className="text-[10px] font-black text-gray-500 uppercase block mb-3 text-left tracking-widest">Nombre del Guardián (Para el Certificado)</label>
                                        <input
                                            type="text"
                                            value={guardianName}
                                            onChange={(e) => setGuardianName(e.target.value)}
                                            placeholder="Ingresa tu nombre o empresa"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                                        />
                                    </div>

                                    <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 mb-10 text-left space-y-4">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-500 font-bold uppercase tracking-widest">Intercambio</span>
                                            <span className="font-black text-white text-lg">{selectedTree.cost}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-500 font-bold uppercase tracking-widest">Red</span>
                                            <span className="font-mono text-emerald-500 font-black">AVALANCHE MAINNET</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex justify-between items-center font-black text-2xl group">
                                            <span className="text-white/30 uppercase text-xs tracking-[0.3em]">Total</span>
                                            <span className="text-emerald-500 shadow-emerald-500/20">{selectedTree.cost}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAdopt(selectedTree)}
                                        disabled={isProcessing}
                                        className="w-full py-6 bg-white text-black rounded-[1.5rem] font-black text-xl hover:bg-emerald-500 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] uppercase tracking-tighter flex items-center justify-center gap-3"
                                    >
                                        {isProcessing ? <Loader2 className="animate-spin" /> : "Firmar Intercambio"}
                                    </button>
                                </>
                            ) : (
                                <div className="py-2 text-center relative">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="bg-gradient-to-b from-[#151515] to-[#050505] border-2 border-emerald-500/30 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group mb-8"
                                        id="adoption-certificate"
                                    >
                                        {/* Deco Elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -ml-32 -mb-32" />

                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.4)] border border-white/20">
                                                <ShieldCheck className="text-white w-10 h-10" />
                                            </div>

                                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-4">Certificado Oficial de Adopción</div>
                                            <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 uppercase tracking-tighter italic leading-none">
                                                Guardián del <br /><span className="text-emerald-500">{selectedTree.name}</span>
                                            </h3>

                                            <div className="mb-8 text-center">
                                                <div className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Inmortalizado por</div>
                                                <div className="text-xl font-black text-white italic underline decoration-emerald-500/50 underline-offset-8">{selectedTree.owner || guardianName || "Anónimo"}</div>
                                            </div>

                                            <div className="w-full h-48 rounded-[2rem] overflow-hidden mb-8 border border-white/10 shadow-2xl relative">
                                                <img
                                                    src={getImageUrl(selectedTree.image)}
                                                    className="w-full h-full object-cover filter contrast-125 saturate-125"
                                                    alt="Protected Species"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Monitoreo Satelital Activo</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 w-full mb-8 text-left">
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                    <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Fecha de Emisión</div>
                                                    <div className="text-sm font-bold text-white">{selectedTree.adoptionDate || new Date().toLocaleDateString()}</div>
                                                </div>
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                    <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Impacto Ambiental</div>
                                                    <div className="text-sm font-bold text-emerald-500">Hábitat Protegido</div>
                                                </div>
                                            </div>

                                            <div className="w-full p-4 bg-black/40 rounded-2xl border border-white/10 text-left mb-8 overflow-hidden">
                                                <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-2 flex justify-between">
                                                    <span>Blockchain Provenance</span>
                                                    <span className="text-emerald-500">AVAX MAINNET</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <div className="text-[7px] text-gray-600 font-bold uppercase mb-0.5">Wallet Guardián</div>
                                                        <div className="text-[9px] font-mono text-emerald-500/80 truncate">{selectedTree.wallet || account}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[7px] text-gray-600 font-bold uppercase mb-0.5">Transaction Hash</div>
                                                        <div className="text-[9px] font-mono text-gray-300 break-all leading-tight">
                                                            {selectedTree.txHash || (myForest.length > 0 ? myForest[myForest.length - 1]?.txHash : "0x78a...f231")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                                                    <QrCode size={24} className="text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-[8px] font-black uppercase text-gray-400">Verificado por</div>
                                                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Amazonas Cero Protocol</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="flex gap-4 justify-center">
                                        <a
                                            href={`https://snowtrace.io/tx/${selectedTree.txHash || (myForest.length > 0 ? myForest[myForest.length - 1]?.txHash : '')}`}
                                            target="_blank"
                                            className="flex-1 py-5 bg-white/5 rounded-2xl text-[10px] font-black border border-white/10 uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink size={14} /> Snowtrace
                                        </a>
                                        <button
                                            onClick={() => window.print()}
                                            className="flex-1 py-5 bg-emerald-500 rounded-2xl text-[10px] font-black text-white shadow-2xl shadow-emerald-500/40 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
                                        >
                                            <Download size={14} /> Descargar PDF
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setSelectedTree(null)}
                                        className="mt-8 text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                                    >
                                        Volver al Marketplace
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* My Virtual Forest - Side Scroll on Mobile */}
            {myForest.length > 0 && (
                <div className="bg-[#0a0a0a]/50 border border-emerald-500/20 p-8 lg:p-12 rounded-[3.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48" />

                    <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4 relative z-10 uppercase italic tracking-tighter">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                            <ShieldCheck className="text-emerald-500" size={24} />
                        </div>
                        Mi Bosque Virtual <span className="text-emerald-500">({myForest.length})</span>
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {myForest.map((tree, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={i}
                                className="flex items-center gap-5 p-5 bg-black border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all group"
                            >
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                    <img src={getImageUrl(tree.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-emerald-500/10" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-base font-black text-white truncate group-hover:text-emerald-400 transition-colors uppercase tracking-widest">{tree.name}</div>
                                    <div className="text-[10px] text-gray-500 font-bold truncate italic">{tree.scientific}</div>
                                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 rounded-md text-[8px] font-black text-emerald-500 uppercase tracking-widest">Inmortalizado</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedTree(tree);
                                            setIsAdopted(true);
                                        }}
                                        className="p-3 bg-white/5 rounded-xl text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                                    >
                                        <Download size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TreeMarketplace;
