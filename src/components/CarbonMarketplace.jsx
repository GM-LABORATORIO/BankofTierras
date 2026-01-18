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
            const success = await buyTokens(selectedProject.id, amount);
            if (success) {
                setSelectedProject(null);
                setAmount(1);
            }
        } catch (error) {
            console.error(error);
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
                                            {(parseFloat(p.area) * 2.5 || 0).toLocaleString()} tCO2
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: '65%' }} />
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
                            className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden relative"
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">Detalles del Activo</h4>
                                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">{selectedProject.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all hover:scale-110"
                                    >
                                        <ChevronRight className="rotate-90" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div className="space-y-1">
                                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Ubicación</div>
                                        <div className="text-xs font-bold text-gray-300 flex items-center gap-1.5 line-clamp-1">
                                            <MapPin size={12} className="text-emerald-500" /> {selectedProject.location}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Área Total</div>
                                        <div className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                                            <Globe size={12} className="text-emerald-500" /> {selectedProject.area} Hectáreas
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Coordenadas</div>
                                        <div className="text-xs font-mono text-emerald-400/80">{selectedProject.coordinates || "No disp."}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">ID RENARE</div>
                                        <div className="text-xs font-mono text-emerald-400/80 tracking-tighter truncate">{selectedProject.regid || "Pendiente"}</div>
                                    </div>
                                </div>

                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp size={14} className="text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest italic">Predicción de Economía Circular</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                                            <div className="text-[7px] font-black text-gray-500 uppercase mb-1">CO2 Capturado Est.</div>
                                            <div className="text-lg font-black text-white">{(parseFloat(selectedProject.area) * 2.5).toLocaleString()} <span className="text-[8px] text-gray-500">t/año</span></div>
                                        </div>
                                        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
                                            <div className="text-[7px] font-black text-gray-500 uppercase mb-1">Emisión de $CARBON</div>
                                            <div className="text-lg font-black text-emerald-400">{(parseFloat(selectedProject.area) * 2.5).toLocaleString()} <span className="text-[8px] text-emerald-900">Tokens</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                        <ShieldCheck size={12} /> Vista Previa Certificado RENARE
                                    </div>
                                    <div className="aspect-[21/9] bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group/img">
                                        <img
                                            src={getImageUrl(selectedProject.reportipfs)}
                                            className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-opacity duration-500"
                                            alt="Certificado RENARE"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            <a
                                                href={getImageUrl(selectedProject.reportipfs)}
                                                target="_blank"
                                                className="bg-white text-black px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Ver Pantalla Completa
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-white/5 mx-2" />

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cantidad de Toneladas (tCO2)</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-black text-white focus:outline-none focus:border-emerald-500 transition-all"
                                        />
                                        <div className="flex flex-col gap-2">
                                            {[10, 50, 100].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => setAmount(val)}
                                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
                                                >
                                                    +{val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inversión en COP</span>
                                        <span className="text-xl font-black text-white italic tracking-tighter">
                                            $ {Math.round(amount * pricePerTonCOP).toLocaleString()} COP
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inversión en USD</span>
                                        <span className="text-xl font-black text-white italic tracking-tighter">
                                            $ {(amount * pricePerTonUSD).toLocaleString()} USD
                                        </span>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Total en AVAX (Demo Mode)</span>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-emerald-400 italic">
                                                {(amount * demoPriceAVAX).toFixed(6)} AVAX
                                            </div>
                                            <div className="text-[8px] text-gray-500 font-bold uppercase italic">Precio especial para Hackathon</div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePurchase}
                                    disabled={isBuying}
                                    className="w-full py-6 bg-emerald-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isBuying ? (
                                        <>
                                            <RefreshCw className="animate-spin" size={18} />
                                            Procesando en AVAX...
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={18} />
                                            Confirmar Intercambio
                                        </>
                                    )}
                                </button>
                                <p className="text-[9px] text-gray-600 font-bold text-center uppercase tracking-widest leading-relaxed px-4">
                                    Al confirmar, los fondos se envían directamente al originador del proyecto y recibirás $CARBON tokens en tu wallet.
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
