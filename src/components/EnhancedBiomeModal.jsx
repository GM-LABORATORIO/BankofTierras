import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Heart, ExternalLink, Camera, ShieldAlert, Calendar, Check, Mountain, Palmtree, Waves, Plane, Video, Users, TrendingUp, Gift, Activity } from 'lucide-react';
import { ADOPTION_PLANS } from '../data/globalBiomes';
import supabaseService from '../services/supabaseService';


const EnhancedBiomeModal = ({ selectedCell, onClose }) => {
    // Early return MUST be before any hooks
    if (!selectedCell) return null;

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isLiveStreamFullscreen, setIsLiveStreamFullscreen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(ADOPTION_PLANS[0]);
    const [activeTab, setActiveTab] = useState('details'); // 'details', 'experiences', 'impact', 'community', 'gallery'
    const [premiumExperiences, setPremiumExperiences] = useState([]);
    const [loadingExperiences, setLoadingExperiences] = useState(false);

    // Regional state from Supabase
    const [regionalData, setRegionalData] = useState(null);
    const [tierBenefits, setTierBenefits] = useState([]);
    const [loadingRegion, setLoadingRegion] = useState(false);

    // Impact tab state
    const [pixelImpact, setPixelImpact] = useState(null);
    const [loadingImpact, setLoadingImpact] = useState(false);

    // Community tab state
    const [pixelHolders, setPixelHolders] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loadingCommunity, setLoadingCommunity] = useState(false);

    // Gallery tab state
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(false);

    // Generate pixel ID from coordinates
    const pixelId = `CELL-${Math.round(selectedCell.coords[0])}-${Math.round(selectedCell.coords[1])}`;

    // Load all dynamic data from Supabase
    useEffect(() => {
        const loadInitialData = async () => {
            if (!selectedCell) return;

            setLoadingRegion(true);
            setLoadingExperiences(true);

            try {
                const userTier = selectedCell.tier?.level || 4;
                const biomeKey = selectedCell.zone?.key || selectedCell.label?.split(':')[0] || 'UNKNOWN';

                // 1. Fetch Region Data (by code)
                const region = await supabaseService.getRegionByCode(biomeKey);
                setRegionalData(region);

                // 2. Fetch Tier Benefits
                const benefits = await supabaseService.getTierBenefits(userTier);
                setTierBenefits(benefits);

                // 3. Fetch Experiences (using region ID or biome key)
                const experiences = await supabaseService.getPremiumExperiences(region?.id, biomeKey, userTier);
                setPremiumExperiences(experiences);

            } catch (error) {
                console.error('Error loading initial modal data:', error);
            } finally {
                setLoadingRegion(false);
                setLoadingExperiences(false);
            }
        };

        loadInitialData();
    }, [selectedCell]);

    // Derived Gallery logic
    const photoGallery = [
        ...(regionalData?.hero_image_url ? [regionalData.hero_image_url] : []),
        ...(selectedCell.zone?.photoGallery || [])
    ];
    const hasLiveStream = regionalData?.live_cam_url || selectedCell.zone?.liveCamUrl;

    // Load impact data from Supabase
    useEffect(() => {
        const loadImpact = async () => {
            if (!selectedCell) return;

            setLoadingImpact(true);
            try {
                const impact = await supabaseService.getPixelImpact(pixelId);
                setPixelImpact(impact);
            } catch (error) {
                console.error('Error loading pixel impact:', error);
            } finally {
                setLoadingImpact(false);
            }
        };

        if (activeTab === 'impact') {
            loadImpact();
        }
    }, [activeTab, pixelId, selectedCell]);

    // Load community data from Supabase
    useEffect(() => {
        const loadCommunity = async () => {
            if (!selectedCell) return;

            setLoadingCommunity(true);
            try {
                const biomeKey = selectedCell.zone?.key || 'UNKNOWN';
                const [holders, events] = await Promise.all([
                    supabaseService.getPixelHolders(pixelId),
                    supabaseService.getUpcomingEvents(biomeKey)
                ]);
                setPixelHolders(holders || []);
                setUpcomingEvents(events || []);
            } catch (error) {
                console.error('Error loading community data:', error);
            } finally {
                setLoadingCommunity(false);
            }
        };

        if (activeTab === 'community') {
            loadCommunity();
        }
    }, [activeTab, pixelId, selectedCell]);

    // Load gallery photos from Supabase
    useEffect(() => {
        const loadGallery = async () => {
            if (!selectedCell) return;
            const biomeKey = selectedCell.zone?.key || selectedCell.label?.split(':')[0] || 'UNKNOWN';

            setLoadingGallery(true);
            try {
                const photos = await supabaseService.getBiomePhotos(biomeKey);
                setGalleryPhotos(photos || []);
            } catch (error) {
                console.error('Error loading gallery photos:', error);
            } finally {
                setLoadingGallery(false);
            }
        };

        if (activeTab === 'gallery') {
            loadGallery();
        }
    }, [activeTab, selectedCell]);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photoGallery.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + photoGallery.length) % photoGallery.length);
    };

    const calculateFinalPrice = () => {
        // Use regional m2_price if available, fallback to selectedCell.price
        const baseYearlyPrice = regionalData?.m2_price || selectedCell.price;
        const monthlyPrice = baseYearlyPrice / 12;
        const totalMonths = selectedPlan.duration;
        const discount = selectedPlan.discount / 100;

        if (selectedPlan.id === 'plan_perpetual') {
            // Perpetual = 5x the 5-year discounted price
            const fiveYearPrice = monthlyPrice * 60 * 0.8;
            return (fiveYearPrice * 5).toFixed(2);
        }

        const totalPrice = monthlyPrice * totalMonths * (1 - discount);
        return totalPrice.toFixed(2);
    };

    // Dynamic Tier Logic
    const getDynamicTier = () => {
        const price = regionalData?.m2_price || selectedCell.price;
        if (price >= 300) return { name: 'Diamond', icon: '💎', color: 'text-cyan-400', level: 1 };
        if (price >= 250) return { name: 'Gold', icon: '🥇', color: 'text-amber-400', level: 2 };
        if (price >= 200) return { name: 'Silver', icon: '🥈', color: 'text-slate-300', level: 3 };
        return { name: 'Basic', icon: '🥉', color: 'text-orange-400', level: 4 };
    };

    const dynamicTier = getDynamicTier();

    // Load all dynamic data from Supabase
    useEffect(() => {
        const loadInitialData = async () => {
            if (!selectedCell) return;

            setLoadingRegion(true);
            setLoadingExperiences(true);

            try {
                const biomeKey = selectedCell.zone?.key || selectedCell.label?.split(':')[0] || 'UNKNOWN';

                // 1. Fetch Region Data (by code)
                const region = await supabaseService.getRegionByCode(biomeKey);
                setRegionalData(region);

                // Use dynamic tier level if available, fallback to selectedCell.tier.level
                const userTierLevel = dynamicTier.level || selectedCell.tier?.level || 4;

                // 2. Fetch Tier Benefits
                const benefits = await supabaseService.getTierBenefits(userTierLevel);
                setTierBenefits(benefits);

                // 3. Fetch Experiences
                const experiences = await supabaseService.getPremiumExperiences(region?.id, biomeKey, userTierLevel);
                setPremiumExperiences(experiences);

            } catch (error) {
                console.error('Error loading initial modal data:', error);
            } finally {
                setLoadingRegion(false);
                setLoadingExperiences(false);
            }
        };

        loadInitialData();
    }, [selectedCell, dynamicTier.level]);

    const finalPrice = calculateFinalPrice();
    const hasTravelBenefit = parseFloat(finalPrice) >= 1000;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/98 backdrop-blur-4xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-[#050505] border border-white/10 rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                    onClick={e => e.stopPropagation()}
                >
                    {/* LEFT SIDE: Media Gallery + Live Stream */}
                    <div className="w-full md:w-3/5 bg-black relative flex flex-col overflow-hidden">
                        {/* Photo Gallery */}
                        {photoGallery.length > 0 && (
                            <div className="relative h-1/2 overflow-hidden group">
                                <img
                                    src={photoGallery[currentPhotoIndex]}
                                    alt={`${selectedCell.zone?.name} - Photo ${currentPhotoIndex + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                                {/* Gallery Controls */}
                                {photoGallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevPhoto}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronLeft className="text-white" size={24} />
                                        </button>
                                        <button
                                            onClick={nextPhoto}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight className="text-white" size={24} />
                                        </button>

                                        {/* Photo Indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {photoGallery.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentPhotoIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentPhotoIndex ? 'bg-white w-8' : 'bg-white/40'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Photo Counter */}
                                <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10">
                                    <span className="text-white text-sm font-black">
                                        {currentPhotoIndex + 1} / {photoGallery.length}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Live Stream */}
                        {hasLiveStream && (
                            <div className="relative h-1/2 bg-black group">
                                <iframe
                                    src={hasLiveStream}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Live Stream"
                                />

                                {/* Fullscreen Button */}
                                <button
                                    onClick={() => setIsLiveStreamFullscreen(true)}
                                    className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Maximize2 className="text-white" size={20} />
                                </button>

                                {/* Live Badge */}
                                <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 rounded-full flex items-center gap-2 animate-pulse">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                    <span className="text-white text-xs font-black uppercase">En Vivo</span>
                                </div>
                            </div>
                        )}

                        {/* Zone Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-4xl">{selectedCell.zone?.icon}</div>
                                <div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                                        {regionalData?.name || selectedCell.zone?.name || selectedCell.label}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-gray-400 text-sm font-medium">
                                            GPS: {selectedCell.coords[0].toFixed(3)}, {selectedCell.coords[1].toFixed(3)}
                                            {regionalData?.country && ` • ${regionalData.country.name} ${regionalData.country.flag_emoji || ''}`}
                                        </p>
                                        {regionalData?.originator_id && (
                                            <div className="flex items-center gap-2 px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                                                <Shield size={10} className="text-blue-400" />
                                                <span className="text-[10px] font-black text-blue-400 uppercase">Originador: {regionalData.originator?.name || 'ONG Local'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(regionalData?.fun_facts?.[0] || selectedCell.zone?.funFact) && (
                                <p className="text-white/80 text-sm font-medium italic leading-relaxed max-w-2xl">
                                    "{regionalData?.fun_facts?.[0] || selectedCell.zone.funFact}"
                                </p>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Details + Adoption Plans */}
                    <div className="w-full md:w-2/5 p-8 bg-[#080808] flex flex-col overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className={`text-[10px] font-black ${dynamicTier.color} uppercase tracking-[0.15em] mb-1.5 flex items-center gap-2`}>
                                    {dynamicTier.icon} {dynamicTier.name} Tier
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">
                                    {selectedCell.zone?.biome || selectedCell.label}
                                </h4>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="mb-4 flex gap-1.5 p-1 bg-white/5 rounded-xl">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`flex-1 py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'details' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Calendar size={12} className="inline mr-1" />
                                Detalles
                            </button>
                            <button
                                onClick={() => setActiveTab('experiences')}
                                className={`flex-1 py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'experiences' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Gift size={12} className="inline mr-1" />
                                Exp
                            </button>
                            <button
                                onClick={() => setActiveTab('impact')}
                                className={`flex-1 py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'impact' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <TrendingUp size={12} className="inline mr-1" />
                                Impacto
                            </button>
                            <button
                                onClick={() => setActiveTab('community')}
                                className={`flex-1 py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'community' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Users size={12} className="inline mr-1" />
                                Comunidad
                            </button>
                            <button
                                onClick={() => setActiveTab('gallery')}
                                className={`flex-1 py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'gallery' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Camera size={12} className="inline mr-1" />
                                Galería
                            </button>
                        </div>

                        {/* Tab Content: Details */}
                        {activeTab === 'details' && (
                            <>
                                {/* Health Bar */}
                                <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-wider mb-2">
                                        <span>Estado Conservación</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-[8px]">CV: {regionalData?.conservation_score || 5}/10</span>
                                            <span className="text-emerald-500 text-lg">
                                                {regionalData?.conservation_status || selectedCell.zone?.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981] transition-all duration-1000"
                                            style={{ width: `${selectedCell.zone?.health || 85}%` }}
                                        />
                                    </div>
                                    <div className="mt-2 text-[10px] text-gray-400 font-medium leading-tight">
                                        {regionalData?.description || "Cargando datos regionales del ecosistema..."}
                                    </div>
                                </div>

                                {/* Endangered Species */}
                                {(regionalData?.endemic_species || selectedCell.zone?.endangeredSpecies) && (
                                    <div className="mb-6 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                                        <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-wider mb-3">
                                            <ShieldAlert size={16} /> Especies Endémicas & Clave
                                        </div>
                                        <div className="text-sm text-gray-300 font-medium leading-relaxed">
                                            {(regionalData?.endemic_species || selectedCell.zone.endangeredSpecies).join(' • ')}
                                        </div>
                                    </div>
                                )}

                                {/* Main Threats */}
                                {regionalData?.main_threats && (
                                    <div className="mb-6 p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
                                        <div className="flex items-center gap-2 text-xs font-black text-orange-400 uppercase tracking-wider mb-3">
                                            <TrendingUp size={16} /> Amenazas Principales
                                        </div>
                                        <div className="text-sm text-gray-300 font-medium leading-relaxed">
                                            {regionalData.main_threats.join(' • ')}
                                        </div>
                                    </div>
                                )}

                                {/* Adoption Plans */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                                        <Calendar size={16} /> Plan de Adopción
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {ADOPTION_PLANS.map(plan => (
                                            <button
                                                key={plan.id}
                                                onClick={() => setSelectedPlan(plan)}
                                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center ${selectedPlan.id === plan.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'} ${plan.id === 'plan_perpetual' ? 'col-span-2 md:col-span-1 border-cyan-500/30 bg-cyan-500/5' : ''}`}
                                            >
                                                <div className="text-xl mb-1">{plan.badge.split(' ')[0]}</div>
                                                <div className="text-xs font-black text-white uppercase tracking-tighter">{plan.name}</div>
                                                {plan.discount > 0 ? (
                                                    <div className="text-[10px] text-emerald-400 font-bold mt-1">
                                                        -{plan.discount}% OFF
                                                    </div>
                                                ) : plan.id === 'plan_perpetual' && (
                                                    <div className="text-[10px] text-cyan-400 font-black mt-1">
                                                        META-OWNER
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tangible Impact Benefits (Social/Physical) */}
                                    {tierBenefits.filter(b => b.benefit_type === 'physical' || b.benefit_type === 'digital').length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
                                                Beneficios de Impacto Real
                                            </div>
                                            {tierBenefits.filter(b => b.benefit_type === 'physical' || b.benefit_type === 'digital').map((benefit, idx) => (
                                                <div key={idx} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
                                                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                                                        {benefit.benefit_type === 'physical' ? <Gift size={20} className="text-emerald-400" /> : <Camera size={20} className="text-cyan-400" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-black text-white uppercase tracking-tighter">{benefit.name}</div>
                                                        <div className="text-xs text-gray-400 leading-tight mt-0.5">{benefit.description}</div>
                                                        <div className={`text-[10px] font-black uppercase mt-2 ${benefit.benefit_type === 'physical' ? 'text-amber-400' : 'text-cyan-400'}`}>
                                                            {benefit.benefit_type === 'physical' ? '🎁 Producto Físico' : '💎 Activo Digital'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Plan Benefits */}
                                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                                        <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                                            Servicios del Ecosistema ({tierBenefits.filter(b => b.benefit_type !== 'physical' && b.benefit_type !== 'digital').length})
                                        </div>
                                        <div className="space-y-2">
                                            {tierBenefits.filter(b => b.benefit_type !== 'physical' && b.benefit_type !== 'digital').map((benefitItem, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                                                    <Check size={14} className="text-emerald-500" />
                                                    <span className="opacity-60">{benefitItem.benefit?.icon}</span>
                                                    {benefitItem.benefit?.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                        Inversión Total ({selectedPlan.duration} meses)
                                    </div>
                                    <div className="text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                                        ${finalPrice} <span className="text-sm text-gray-500">USD</span>
                                    </div>
                                    {hasTravelBenefit && (
                                        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center gap-3 animate-pulse">
                                            <Plane className="text-cyan-400" size={18} />
                                            <div>
                                                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">Beneficio Desbloqueado</div>
                                                <div className="text-xs font-bold text-white uppercase">Boleto de Exploración Regional Incluido</div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedPlan.discount > 0 && (
                                        <div className="mt-2 text-xs text-emerald-400 font-bold">
                                            Ahorras ${((selectedCell.price * selectedPlan.duration / 12) * (selectedPlan.discount / 100)).toFixed(2)} USD
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 mt-auto">
                                    {selectedCell.zone?.donationLink && (
                                        <a
                                            href={selectedCell.zone.donationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl hover:bg-blue-500/20 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Heart className="text-blue-400" size={18} />
                                                <span className="text-sm font-black text-blue-400 uppercase tracking-wider">
                                                    Donar Ahora
                                                </span>
                                            </div>
                                            <ExternalLink className="text-blue-400 group-hover:translate-x-1 transition-transform" size={14} />
                                        </a>
                                    )}

                                    <button className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-3">
                                        Adoptar Ahora
                                        <Play size={24} />
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Tab Content: Premium Experiences */}
                        {activeTab === 'experiences' && (
                            <div className="space-y-4">
                                <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Experiencias Disponibles
                                </div>

                                {loadingExperiences ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-400 text-sm">Sincronizando expediciones...</p>
                                    </div>
                                ) : premiumExperiences.length > 0 ? (
                                    <div className="grid gap-4">
                                        {premiumExperiences.map((exp) => (
                                            <div key={exp.id} className="group relative p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
                                                {exp.image_url && (
                                                    <div className="relative h-40 -mx-6 -mt-6 mb-6 overflow-hidden">
                                                        <img
                                                            src={exp.image_url}
                                                            alt={exp.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                                                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black text-white uppercase">
                                                            Tier {exp.requires_tier}+
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                                            {exp.experience_type === 'trip' && <Plane size={24} />}
                                                            {exp.experience_type === 'webinar' && <Video size={24} />}
                                                            {exp.experience_type === 'workshop' && <Activity size={24} />}
                                                            {exp.experience_type === 'tour' && <Camera size={24} />}
                                                        </div>
                                                        <div>
                                                            <h5 className="text-lg font-black text-white uppercase tracking-tight leading-none mb-1">
                                                                {exp.title}
                                                            </h5>
                                                            <p className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest">
                                                                {exp.experience_type === 'trip' && '✈️ Expedición Científica'}
                                                                {exp.experience_type === 'webinar' && '🎓 Masterclass VIP'}
                                                                {exp.experience_type === 'workshop' && '🛠️ Taller Regenerativo'}
                                                                {exp.experience_type === 'tour' && '📷 Safari de Conservación'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
                                                    {exp.description}
                                                </p>

                                                <button className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
                                                    {exp.included_in_tier ? 'ACCEDER AHORA' : `RESERVAR POR $${exp.price_usd}`}
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 px-10 bg-white/[0.02] border border-white/10 border-dashed rounded-[3rem]">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Gift className="w-10 h-10 text-white/20" />
                                        </div>
                                        <h5 className="text-xl font-black text-white uppercase mb-2">Próximamente</h5>
                                        <p className="text-gray-500 text-sm font-medium">
                                            Estamos diseñando experiencias únicas para este bioma. <br />Vuelve pronto para descubrir nuevas aventuras.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab Content: Impact */}
                        {activeTab === 'impact' && (
                            <div className="space-y-4">
                                {loadingImpact ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-400 text-sm">Cargando impacto ambiental...</p>
                                    </div>
                                ) : pixelImpact && (pixelImpact.co2_captured_kg > 0 || pixelImpact.trees_planted > 0) ? (
                                    <>
                                        {/* Impact Metrics Grid */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {/* CO2 Captured */}
                                            <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                                <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
                                                    💨 CO2 Capturado
                                                </div>
                                                <div className="text-2xl font-black text-white">
                                                    {(pixelImpact.co2_captured_kg / 1000).toFixed(2)}
                                                    <span className="text-sm text-gray-400 ml-1">ton</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {pixelImpact.co2_captured_kg.toLocaleString()} kg
                                                </div>
                                            </div>

                                            {/* Trees Planted */}
                                            <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl">
                                                <div className="text-xs font-black text-green-400 uppercase tracking-wider mb-2">
                                                    🌳 Árboles Plantados
                                                </div>
                                                <div className="text-2xl font-black text-white">
                                                    {pixelImpact.trees_planted}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {pixelImpact.area_protected_m2 ? `${(pixelImpact.area_protected_m2 / 10000).toFixed(2)} ha` : 'En crecimiento'}
                                                </div>
                                            </div>

                                            {/* Funds Raised */}
                                            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl">
                                                <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2">
                                                    💰 Fondos Recaudados
                                                </div>
                                                <div className="text-2xl font-black text-white">
                                                    ${pixelImpact.funds_raised_usd?.toLocaleString() || 0}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">USD</div>
                                            </div>

                                            {/* Species Protected */}
                                            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl">
                                                <div className="text-xs font-black text-purple-400 uppercase tracking-wider mb-2">
                                                    🦋 Especies Protegidas
                                                </div>
                                                <div className="text-2xl font-black text-white">
                                                    {pixelImpact.species_protected || 0}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">En monitoreo</div>
                                            </div>
                                        </div>

                                        {/* Health History Chart */}
                                        {pixelImpact.health_history && pixelImpact.health_history.length > 0 && (
                                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                                                    📈 Evolución de Salud del Ecosistema
                                                </div>
                                                <div className="relative h-32">
                                                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                                        <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                                        <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                                        <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                                                        <polyline
                                                            fill="none"
                                                            stroke="#10b981"
                                                            strokeWidth="2"
                                                            points={pixelImpact.health_history.map((point, idx) => {
                                                                const x = (idx / (pixelImpact.health_history.length - 1)) * 400;
                                                                const y = 100 - point.health;
                                                                return `${x},${y}`;
                                                            }).join(' ')}
                                                        />

                                                        <defs>
                                                            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                        <polygon
                                                            fill="url(#healthGradient)"
                                                            points={`0,100 ${pixelImpact.health_history.map((point, idx) => {
                                                                const x = (idx / (pixelImpact.health_history.length - 1)) * 400;
                                                                const y = 100 - point.health;
                                                                return `${x},${y}`;
                                                            }).join(' ')} 400,100`}
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <TrendingUp className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                        <h5 className="text-xl font-black text-white mb-2">Impacto Ambiental</h5>
                                        <p className="text-gray-400 text-sm mb-4">
                                            Este píxel aún no tiene datos de impacto registrados.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab Content: Community */}
                        {activeTab === 'community' && (
                            <div className="space-y-4">
                                {loadingCommunity ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-400 text-sm">Cargando comunidad...</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Community Stats */}
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                                <div className="text-2xl font-black text-white">{pixelHolders.length}</div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Holders</div>
                                            </div>
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                                <div className="text-2xl font-black text-blue-400">
                                                    {pixelHolders.filter(h => h.is_active || h.active).length}
                                                </div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Activos</div>
                                            </div>
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                                <div className="text-2xl font-black text-emerald-400">{upcomingEvents.length}</div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Eventos</div>
                                            </div>
                                        </div>

                                        {/* Holders List */}
                                        {pixelHolders.length > 0 && (
                                            <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem]">
                                                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                                                    👥 Holders de este Píxel
                                                </div>
                                                <div className="space-y-3">
                                                    {pixelHolders.slice(0, 5).map((holder, idx) => (
                                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-black">
                                                                    {idx + 1}
                                                                </div>
                                                                <div className="text-xs font-bold text-white">
                                                                    {holder.profiles?.name || `Holder #${(holder.user_id || holder.wallet_address)?.slice(0, 8)}`}
                                                                </div>
                                                            </div>
                                                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full">
                                                                ACTIVO
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {upcomingEvents.length > 0 && (
                                            <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem]">
                                                <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                                                    📅 Próximos Eventos
                                                </div>
                                                <div className="space-y-4">
                                                    {upcomingEvents.map((event, idx) => (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                                                <Calendar size={18} />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-white uppercase">{event.title}</div>
                                                                <div className="text-[10px] text-gray-500">{new Date(event.event_date).toLocaleDateString()}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {upcomingEvents.length === 0 && pixelHolders.length === 0 && (
                                            <div className="text-center py-12">
                                                <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                                                <h5 className="text-xl font-black text-white mb-2">Comunidad de Holders</h5>
                                                <p className="text-gray-400 text-sm">
                                                    Este píxel aún no tiene holders registrados. ¡Sé el primero!
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {/* Tab Content: Gallery */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-4">
                                <div className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    Galería de la Comunidad
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {loadingGallery ? (
                                        <div className="col-span-2 text-center py-12">
                                            <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                            <p className="text-gray-400 text-sm">Buscando fotografías...</p>
                                        </div>
                                    ) : galleryPhotos.length > 0 ? (
                                        galleryPhotos.map((photo, idx) => (
                                            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all">
                                                <img src={photo.photo_url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                                    <p className="text-[10px] text-white font-bold">{photo.caption}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Heart size={10} className="text-red-500" />
                                                        <span className="text-[8px] text-gray-300">{photo.likes_count || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 px-10 bg-white/[0.02] border border-white/10 border-dashed rounded-[3rem] col-span-2">
                                            <Camera className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                                            <h5 className="text-xl font-black text-white mb-2">Galería Vacía</h5>
                                            <p className="text-gray-400 text-sm">
                                                Sé el primero en compartir una foto de este bioma.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Fullscreen Live Stream Modal */}
                <AnimatePresence>
                    {isLiveStreamFullscreen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[600] bg-black flex items-center justify-center"
                        >
                            <iframe
                                src={hasLiveStream}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Live Stream Fullscreen"
                            />
                            <button
                                onClick={() => setIsLiveStreamFullscreen(false)}
                                className="absolute top-10 right-10 p-5 bg-white/10 rounded-full hover:bg-white/20 text-white backdrop-blur-3xl"
                            >
                                <X size={32} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};

export default EnhancedBiomeModal;
