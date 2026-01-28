import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Play, Heart, ExternalLink, Camera, ShieldAlert, Calendar, Check, Mountain, Palmtree, Waves, Plane, Video, Users, TrendingUp, Gift, Activity, Shield, Loader2, CheckCircle2 } from 'lucide-react';
import { ADOPTION_PLANS } from '../data/globalBiomes';
import supabaseService from '../services/supabaseService';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

// Sub-components
import BiomeMediaViewer from './biome/BiomeMediaViewer';
import AdoptionTab from './biome/AdoptionTab';
import ExperiencesTab from './biome/ExperiencesTab';
import ImpactTab from './biome/ImpactTab';
import CommunityTab from './biome/CommunityTab';
import GalleryTab from './biome/GalleryTab';


const EnhancedBiomeModal = ({ selectedCell, onClose }) => {
    // Early return MUST be before any hooks
    if (!selectedCell) return null;

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isLiveStreamFullscreen, setIsLiveStreamFullscreen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(ADOPTION_PLANS[0]);
    const [premiumExperiences, setPremiumExperiences] = useState([]);
    const [loadingExperiences, setLoadingExperiences] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAdopted, setIsAdopted] = useState(false);
    const [adoptionTx, setAdoptionTx] = useState(null);
    const [activeTab, setActiveTab] = useState('details');

    const { signer, account, botBalance, contractAddresses, BOT_TOKEN_ABI } = useWeb3();

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

    // Helper functions & derived data (defined before useEffect to avoid TDZ)
    const getDynamicTier = () => {
        const price = regionalData?.m2_price || selectedCell.price;
        if (price >= 300) return { name: 'Diamond', icon: '💎', color: 'text-cyan-400', level: 1 };
        if (price >= 250) return { name: 'Gold', icon: '🥇', color: 'text-amber-400', level: 2 };
        if (price >= 200) return { name: 'Silver', icon: '🥈', color: 'text-slate-300', level: 3 };
        return { name: 'Basic', icon: '🥉', color: 'text-orange-400', level: 4 };
    };

    const dynamicTier = getDynamicTier();

    const calculateFinalPrice = () => {
        const baseYearlyPrice = regionalData?.m2_price || selectedCell.price;
        const monthlyPrice = baseYearlyPrice / 12;
        const totalMonths = selectedPlan.duration;
        const discount = selectedPlan.discount / 100;

        if (selectedPlan.id === 'plan_perpetual') {
            const fiveYearPrice = monthlyPrice * 60 * 0.8;
            return (fiveYearPrice * 5).toFixed(2);
        }

        const totalPrice = monthlyPrice * totalMonths * (1 - discount);
        return totalPrice.toFixed(2);
    };

    const finalPrice = calculateFinalPrice();

    const photoGallery = [
        ...(regionalData?.hero_image_url ? [regionalData.hero_image_url] : []),
        ...(selectedCell.zone?.photoGallery || [])
    ];

    const hasLiveStream = regionalData?.live_cam_url || selectedCell.zone?.liveCamUrl;

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photoGallery.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + photoGallery.length) % photoGallery.length);
    };

    // Unified data loading
    useEffect(() => {
        const loadAllData = async () => {
            if (!selectedCell) return;
            setLoadingRegion(true);
            setLoadingExperiences(true);

            try {
                const biomeKey = selectedCell.zone?.key || selectedCell.label?.split(':')[0] || 'UNKNOWN';

                // Fetch basic region data
                const region = await supabaseService.getRegionByCode(biomeKey);
                setRegionalData(region);

                // Fetch dynamic data based on active tab
                if (activeTab === 'impact') {
                    setLoadingImpact(true);
                    const impact = await supabaseService.getPixelImpact(pixelId);
                    setPixelImpact(impact);
                    setLoadingImpact(false);
                } else if (activeTab === 'community') {
                    setLoadingCommunity(true);
                    const [holders, events] = await Promise.all([
                        supabaseService.getPixelHolders(pixelId),
                        supabaseService.getUpcomingEvents(biomeKey)
                    ]);
                    setPixelHolders(holders || []);
                    setUpcomingEvents(events || []);
                    setLoadingCommunity(false);
                } else if (activeTab === 'gallery') {
                    setLoadingGallery(true);
                    const photos = await supabaseService.getBiomePhotos(biomeKey);
                    setGalleryPhotos(photos || []);
                    setLoadingGallery(false);
                }

                // benefits & experiences depend on dynamic tier
                const userTierLevel = dynamicTier.level;
                const [benefits, experiences] = await Promise.all([
                    supabaseService.getTierBenefits(userTierLevel),
                    supabaseService.getPremiumExperiences(region?.id, biomeKey, userTierLevel)
                ]);
                setTierBenefits(benefits);
                setPremiumExperiences(experiences);

            } catch (error) {
                console.error('Error loading modal data:', error);
            } finally {
                setLoadingRegion(false);
                setLoadingExperiences(false);
            }
        };

        loadAllData();
    }, [selectedCell, activeTab, dynamicTier.level]);


    const hasTravelBenefit = parseFloat(finalPrice) >= 1000;

    const handleAdoptPixel = async () => {
        if (!signer || !account) {
            alert("Por favor, conecta tu wallet antes de adoptar.");
            return;
        }

        const currentBalance = parseFloat(botBalance || '0');
        if (currentBalance < parseFloat(finalPrice)) {
            alert(`Saldo insuficiente. Necesitas ${finalPrice} $BOT.`);
            return;
        }

        setIsProcessing(true);
        try {
            const tokenContract = new ethers.Contract(
                contractAddresses.botToken,
                BOT_TOKEN_ABI,
                signer
            );

            const amount = ethers.parseUnits(finalPrice.toString(), 18);
            const treasuryAddress = contractAddresses.botTreasury;

            // Step 1: Transfer $BOT to Treasury
            const tx = await tokenContract.transfer(treasuryAddress, amount);
            await tx.wait();

            // Step 2: Register in Supabase
            const expirationDate = selectedPlan.id === 'plan_perpetual' ? null : new Date();
            if (expirationDate) {
                expirationDate.setMonth(expirationDate.getMonth() + selectedPlan.duration);
            }

            await supabaseService.registerPixelAdoption({
                pixel_id: pixelId,
                buyer_wallet: account,
                plan_id: selectedPlan.id,
                duration_months: selectedPlan.duration,
                amount_bot: parseFloat(finalPrice),
                tx_hash: tx.hash,
                expires_at: expirationDate ? expirationDate.toISOString() : null
            });

            setAdoptionTx(tx.hash);
            setIsAdopted(true);

            // Re-fetch community data to show the new holder
            const holders = await supabaseService.getPixelHolders(pixelId);
            setPixelHolders(holders || []);

        } catch (error) {
            console.error("Adoption error:", error);
            alert("Error en la adopción: " + (error.reason || error.message));
        } finally {
            setIsProcessing(false);
        }
    };

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
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-[#050505] border border-white/10 rounded-[3rem] max-w-6xl w-full h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close button inside modal for better UX */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-[60] p-2 bg-black/40 hover:bg-black/60 rounded-full border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>
                    {/* LEFT SIDE: Media Gallery + Live Stream */}
                    <BiomeMediaViewer
                        photoGallery={photoGallery}
                        currentPhotoIndex={currentPhotoIndex}
                        setCurrentPhotoIndex={setCurrentPhotoIndex}
                        nextPhoto={nextPhoto}
                        prevPhoto={prevPhoto}
                        hasLiveStream={hasLiveStream}
                        setIsLiveStreamFullscreen={setIsLiveStreamFullscreen}
                        regionalData={regionalData}
                        selectedCell={selectedCell}
                    />

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

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto min-h-0 py-4 pr-1 scrollbar-hide">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {activeTab === 'details' && (
                                        <AdoptionTab
                                            regionalData={regionalData}
                                            selectedCell={selectedCell}
                                            selectedPlan={selectedPlan}
                                            setSelectedPlan={setSelectedPlan}
                                            tierBenefits={tierBenefits}
                                            finalPrice={finalPrice}
                                            hasTravelBenefit={hasTravelBenefit}
                                            handleAdoptPixel={handleAdoptPixel}
                                            isProcessing={isProcessing}
                                            isAdopted={isAdopted}
                                            adoptionTx={adoptionTx}
                                            ADOPTION_PLANS={ADOPTION_PLANS}
                                            dynamicTier={dynamicTier}
                                            loadingRegion={loadingRegion}
                                        />
                                    )}

                                    {activeTab === 'experiences' && (
                                        <ExperiencesTab
                                            loadingExperiences={loadingExperiences}
                                            premiumExperiences={premiumExperiences}
                                        />
                                    )}

                                    {activeTab === 'impact' && (
                                        <ImpactTab
                                            loadingImpact={loadingImpact}
                                            pixelImpact={pixelImpact}
                                        />
                                    )}

                                    {activeTab === 'community' && (
                                        <CommunityTab
                                            loadingCommunity={loadingCommunity}
                                            pixelHolders={pixelHolders}
                                            upcomingEvents={upcomingEvents}
                                        />
                                    )}

                                    {activeTab === 'gallery' && (
                                        <GalleryTab
                                            loadingGallery={loadingGallery}
                                            galleryPhotos={galleryPhotos}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Live Stream Fullscreen Modal */}
            {isLiveStreamFullscreen && (
                <div className="fixed inset-0 z-[600] bg-black flex items-center justify-center">
                    <iframe
                        src={hasLiveStream}
                        className="w-full h-full"
                        allowFullScreen
                        title="Live Stream Fullscreen"
                    />
                    <button
                        onClick={() => setIsLiveStreamFullscreen(false)}
                        className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl border border-white/10"
                    >
                        <X className="text-white" size={32} />
                    </button>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EnhancedBiomeModal;
