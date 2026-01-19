import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    ShoppingCart,
    TrendingUp,
    ShieldCheck,
    MapPin,
    Info,
    ChevronRight,
    ArrowRight,
    Zap,
    DollarSign,
    RefreshCw
} from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { supabaseService } from '../services/supabaseService';

const CarbonMarketplace = ({ projects }) => {
    const { prices, buyTokens, account } = useWeb3();
    const [selectedProject, setSelectedProject] = useState(null);
    const [amount, setAmount] = useState(1);
    const [isBuying, setIsBuying] = useState(false);

    const getImageUrl = (image) => {
        if (!image) return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000";
        if (image.startsWith('http')) return image;

        // Handle IPFS variants
        let cid = image;
        if (image.startsWith('ipfs://')) {
            cid = image.split('//')[1];
        } else if (image.includes('ipfs/')) {
            cid = image.split('ipfs/')[1];
        }

        return `https://gateway.pinata.cloud/ipfs/${cid}`;
    };

    // Filter only verified or tokenized projects
    const verifiedProjects = projects.filter(p =>
        p.status === 'Verificado' ||
        p.status === 'verified' ||
        p.status === 'Tokenizado'
    );

    // Price calculation (Target: 25 USD per ton)
    const pricePerTonUSD = 25;
    const pricePerTonCOP = pricePerTonUSD * prices.usdCop;
    const demoPriceAVAX = 0.0001; // For Demo purposes on Mainnet
    const pricePerTonAVAX = pricePerTonUSD / (prices.avax || 35);

    const handlePurchase = async () => {
        if (!account) {
            alert("Por favor conecta tu wallet");
            return;
        }
        setIsBuying(true);
        try {
            // Pasamos el owner_wallet del proyecto para el split 90/10
            const success = await buyTokens(selectedProject.id, amount, selectedProject.owner_wallet);
            if (success) {
                // Actualizar Supabase: incrementar sold_tokens
                const newSold = (selectedProject.sold_tokens || 0) + amount;
                await supabaseService.updateProject(selectedProject.id, {
                    sold_tokens: newSold
                });

                // Notificar al Dashboard del cambio si es necesario (asumimos que Dashboard refrescará o el usuario recargará)
                // Para una mejor UX, podrías llamar a una prop onPurchaseSuccess

                setSelectedProject(null);
                setAmount(1);
                alert("¡Compra completada! Los tokens han sido emitidos a tu wallet.");
            }
        } catch (error) {
            console.error(error);
            alert("Error en la compra: " + error.message);
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Market Header */}
            <div className="relative h-48 rounded-[2.5rem] overflow-hidden group">
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Marketplace header"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-10">
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Mercado de Carbono</h2>
                    <p className="text-emerald-300 text-sm font-bold max-w-md mt-2 uppercase tracking-widest">
                        Adquiere créditos reales de proyectos verificados en la Amazonía.
                    </p>
                </div>
            </div>

            {/* Price Ticker */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Precio Referencia USD", value: `$${pricePerTonUSD}`, sub: "Por tonelada CO2" },
                    { label: "Precio Referencia COP", value: `$${Math.round(pricePerTonCOP).toLocaleString()}`, sub: "TRM Actualizada" },
                    { label: "Precio en Red (AVAX)", value: `${pricePerTonAVAX.toFixed(4)} AVAX`, sub: "Cálculo en tiempo real" }
                ].map((p, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl group hover:border-emerald-500/30 transition-all">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{p.label}</div>
                        <div className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors uppercase">{p.value}</div>
                        <div className="text-[9px] text-gray-600 font-bold uppercase mt-1 italic">{p.sub}</div>
                    </div>
                ))}
            </div>

            {/* Projects to Invest */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {verifiedProjects.length > 0 ? (
                    verifiedProjects.map((p) => (
                        <motion.div
                            key={p.id}
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col group"
                        >
                            <div className="h-48 relative">
                                <img src={getImageUrl(p.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                                    Verificado
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight mb-2">{p.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-4">
                                    <MapPin size={14} className="text-emerald-500" />
                                    {p.location}
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-gray-500">Créditos Disponibles</span>
                                        <span className="text-white">
                                            {(p.total_quota - (p.sold_tokens || 0)).toLocaleString()} tCO2
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-1000"
                                            style={{ width: `${Math.max(0, Math.min(100, ((p.total_quota - p.sold_tokens) / p.total_quota) * 100))}%` }}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(p)}
                                    className="w-full mt-auto py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    Invertir Créditos
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                        <RefreshCw size={48} className="mx-auto text-gray-700 mb-4 animate-spin" />
                        <h3 className="text-xl font-black text-gray-500 uppercase italic">Esperando validación de auditoría...</h3>
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-2">Los proyectos aparecerán aquí una vez verificados.</p>
                    </div>
                )}
            </div>

            {/* Purchase Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden relative max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 md:p-8 space-y-4 overflow-y-auto custom-scrollbar">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">Detalles del Activo</h4>
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">{selectedProject.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-2 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all hover:scale-110"
                                    >
                                        <ChevronRight className="rotate-90" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                                    <div className="space-y-0.5">
                                        <div className="text-[7px] font-black text-gray-600 uppercase tracking-widest">Ubicación</div>
                                        <div className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5 line-clamp-1">
                                            <MapPin size={11} className="text-emerald-500" /> {selectedProject.location}
                                        </div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-[7px] font-black text-gray-600 uppercase tracking-widest">Área Total</div>
                                        <div className="text-[11px] font-bold text-gray-300 flex items-center gap-1.5">
                                            <Globe size={11} className="text-emerald-500" /> {selectedProject.area} Hectáreas
                                        </div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-[7px] font-black text-gray-600 uppercase tracking-widest">Coordenadas</div>
                                        <div className="text-[10px] font-mono text-emerald-400/80">{selectedProject.coordinates || "Amazonía (Buscando...)"}</div>
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-[7px] font-black text-gray-600 uppercase tracking-widest">ID RENARE</div>
                                        <div className="text-[10px] font-mono text-emerald-400/80 tracking-tighter truncate">{selectedProject.regid && selectedProject.regid !== "" ? selectedProject.regid : "COL-RENARE-PEND"}</div>
                                    </div>
                                </div>

                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                                            <div className="text-[7px] font-black text-gray-500 uppercase mb-0.5">CO2 Capturado Est.</div>
                                            <div className="text-sm font-black text-white">{(parseFloat(selectedProject.area) * 2.5).toLocaleString() || 0} <span className="text-[7px] text-gray-500 uppercase">t/año</span></div>
                                        </div>
                                        <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-right">
                                            <div className="text-[7px] font-black text-gray-500 uppercase mb-0.5">Tokens Disponibles</div>
                                            <div className="text-sm font-black text-emerald-400">{(parseFloat(selectedProject.area) * 2.5).toLocaleString() || 0} <span className="text-[7px] text-emerald-900 uppercase">Tokens</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[7px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                        <ShieldCheck size={11} /> Evidencia de Certificación
                                    </div>
                                    <div className="aspect-[21/7] bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group/img">
                                        <img
                                            src={selectedProject.reportipfs ? getImageUrl(selectedProject.reportipfs) : "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1000"}
                                            className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-opacity duration-500"
                                            alt="Certificado RENARE"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1000";
                                                e.target.className = "w-full h-full object-cover opacity-40 grayscale";
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            {selectedProject.reportipfs ? (
                                                <a
                                                    href={getImageUrl(selectedProject.reportipfs)}
                                                    target="_blank"
                                                    className="bg-white text-black px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-2xl"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Ver Documento
                                                </a>
                                            ) : (
                                                <div className="text-[8px] font-black text-white uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-full">Procesando...</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cantidad (tCO2)</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-black text-white focus:outline-none focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                    <div className="flex items-end gap-1.5 pb-0.5">
                                        {[10, 50, 100].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setAmount(val)}
                                                className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-gray-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
                                            >
                                                +{val}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Inversión Estimada</span>
                                        <span className="text-lg font-black text-white italic tracking-tighter">
                                            $ {Math.round(amount * pricePerTonCOP).toLocaleString()} COP
                                        </span>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest text-left leading-none">Total en AVAX<br /><span className="text-[7px] text-gray-600">Demo Mode</span></span>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-emerald-400 italic">
                                                {(amount * demoPriceAVAX).toFixed(6)} AVAX
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePurchase}
                                    disabled={isBuying}
                                    className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isBuying ? (
                                        <>
                                            <RefreshCw className="animate-spin" size={16} />
                                            Procesando...
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={16} />
                                            Confirmar Compra
                                        </>
                                    )}
                                </button>
                                <p className="text-[8px] text-gray-600 font-bold text-center uppercase tracking-widest leading-relaxed px-4">
                                    Recibirás $CARBON tokens directamente en tu wallet tras confirmar.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarbonMarketplace;
