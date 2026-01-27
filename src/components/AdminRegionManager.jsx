import React, { useState, useEffect } from 'react';
import { Save, Loader2, Globe, Plus, Edit2, MapPin, Image as ImageIcon, Video, Camera, ChevronRight } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

const AdminRegionManager = () => {
    const [continents, setContinents] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [editingRegion, setEditingRegion] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        biome_type: 'rainforest',
        center_lat: '',
        center_lng: '',
        description: '',
        fun_facts: '',
        endemic_species: '',
        conservation_status: '',
        main_threats: '',
        hero_image_url: '',
        gallery_urls: '',
        video_url: '',
        live_cam_url: '',
        conservation_score: 5,
        m2_price: 100
    });

    useEffect(() => {
        loadContinents();
    }, []);

    useEffect(() => {
        if (selectedContinent) {
            loadCountriesByContinent(selectedContinent.code);
        }
    }, [selectedContinent]);

    useEffect(() => {
        if (selectedCountry) {
            loadRegions(selectedCountry.id);
        }
    }, [selectedCountry]);

    const loadContinents = async () => {
        setIsLoading(true);
        try {
            console.log('🔄 RegionManager: Loading continents...');
            const data = await supabaseService.getAllContinents();
            console.log('✅ RegionManager: Continents loaded:', data);

            setContinents(data || []);
            if (data && data.length > 0) {
                setSelectedContinent(data[0]); // Select first continent (América)
            }
        } catch (error) {
            console.error('❌ RegionManager: Error loading continents:', error);
            setContinents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCountriesByContinent = async (continentCode) => {
        try {
            console.log('🔄 RegionManager: Loading countries for continent:', continentCode);
            const data = await supabaseService.getCountriesByContinent(continentCode);
            console.log('✅ RegionManager: Countries loaded:', data);

            setCountries(data || []);
            if (data && data.length > 0) {
                setSelectedCountry(data[0]);
            } else {
                setSelectedCountry(null);
                setRegions([]);
            }
        } catch (error) {
            console.error('❌ RegionManager: Error loading countries:', error);
            setCountries([]);
        }
    };

    const loadRegions = async (countryId) => {
        try {
            console.log('🔄 RegionManager: Loading regions for country:', countryId);
            const data = await supabaseService.getRegionsByCountry(countryId);
            console.log('✅ RegionManager: Regions loaded:', data);
            setRegions(data || []);
        } catch (error) {
            console.error('❌ RegionManager: Error loading regions:', error);
            setRegions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const regionData = {
                country_id: selectedCountry.id,
                code: formData.code.toUpperCase(),
                name: formData.name,
                biome_type: formData.biome_type,
                center_lat: parseFloat(formData.center_lat) || null,
                center_lng: parseFloat(formData.center_lng) || null,
                description: formData.description,
                fun_facts: formData.fun_facts.split('\n').filter(f => f.trim()),
                endemic_species: formData.endemic_species.split('\n').filter(s => s.trim()),
                conservation_status: formData.conservation_status,
                main_threats: formData.main_threats.split('\n').filter(t => t.trim()),
                hero_image_url: formData.hero_image_url || null,
                gallery_urls: formData.gallery_urls.split('\n').filter(u => u.trim()),
                video_url: formData.video_url || null,
                live_cam_url: formData.live_cam_url || null,
                conservation_score: parseInt(formData.conservation_score) || 5,
                m2_price: parseFloat(formData.m2_price) || 100
            };

            if (editingRegion) {
                regionData.id = editingRegion.id;
            }

            await supabaseService.upsertRegion(regionData);

            alert(editingRegion ? '✅ Region updated!' : '✅ Region created!');

            // Reset form
            resetForm();
            loadRegions(selectedCountry.id);
        } catch (error) {
            console.error('Error saving region:', error);
            alert('❌ Error: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (region) => {
        setEditingRegion(region);
        setFormData({
            code: region.code,
            name: region.name,
            biome_type: region.biome_type || 'rainforest',
            center_lat: region.center_lat || '',
            center_lng: region.center_lng || '',
            description: region.description || '',
            fun_facts: (region.fun_facts || []).join('\n'),
            endemic_species: (region.endemic_species || []).join('\n'),
            conservation_status: region.conservation_status || '',
            main_threats: (region.main_threats || []).join('\n'),
            hero_image_url: region.hero_image_url || '',
            gallery_urls: (region.gallery_urls || []).join('\n'),
            video_url: region.video_url || '',
            live_cam_url: region.live_cam_url || '',
            conservation_score: region.conservation_score || 5,
            m2_price: region.m2_price || 100
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingRegion(null);
        setShowForm(false);
        setFormData({
            code: '',
            name: '',
            biome_type: 'rainforest',
            center_lat: '',
            center_lng: '',
            description: '',
            fun_facts: '',
            endemic_species: '',
            conservation_status: '',
            main_threats: '',
            hero_image_url: '',
            gallery_urls: '',
            video_url: '',
            live_cam_url: '',
            conservation_score: 5,
            m2_price: 100
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                        <Globe className="text-emerald-400" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Region Manager</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                            {continents.length} Continents • {countries.length} Countries • {regions.length} Regions
                        </p>
                    </div>
                </div>
                {!showForm && selectedCountry && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all"
                    >
                        <Plus size={16} />
                        New Region
                    </button>
                )}
            </div>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-emerald-400 font-bold">{selectedContinent?.emoji} {selectedContinent?.name}</span>
                {selectedCountry && (
                    <>
                        <ChevronRight size={14} />
                        <span className="text-white font-bold">{selectedCountry.flag_emoji} {selectedCountry.name}</span>
                    </>
                )}
            </div>

            {/* Step 1: Continent Selector */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                    Step 1: Select Continent
                </label>
                <div className="grid grid-cols-6 gap-3">
                    {continents.map(continent => (
                        <button
                            key={continent.code}
                            onClick={() => setSelectedContinent(continent)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedContinent?.code === continent.code
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="text-3xl mb-2">{continent.emoji}</div>
                            <div className="text-xs font-black text-white">{continent.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2: Country Selector */}
            {selectedContinent && (
                <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                        Step 2: Select Country ({countries.length} in {selectedContinent.name})
                    </label>

                    {countries.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No countries yet in this continent</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                            {countries.map(country => (
                                <button
                                    key={country.id}
                                    onClick={() => setSelectedCountry(country)}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedCountry?.id === country.id
                                        ? 'border-blue-500 bg-blue-500/10'
                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{country.flag_emoji}</div>
                                    <div className="text-xs font-black text-white">{country.name}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Step 3: Region Form (same as before, just hidden when not needed) */}
            {showForm && selectedCountry && (
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-black text-white uppercase">
                            {editingRegion ? 'Edit Region' : `New Region in ${selectedCountry.flag_emoji} ${selectedCountry.name}`}
                        </h4>
                        <button
                            onClick={resetForm}
                            className="text-xs text-gray-500 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    Region Code *
                                </label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    placeholder="AMAZONAS"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all uppercase"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    Region Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Amazonas Colombiano"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    Biome Type *
                                </label>
                                <select
                                    value={formData.biome_type}
                                    onChange={(e) => setFormData({ ...formData, biome_type: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                >
                                    <option value="rainforest">🌳 Rainforest</option>
                                    <option value="marine">🌊 Marine</option>
                                    <option value="mountain">⛰️ Mountain</option>
                                    <option value="desert">🏜️ Desert</option>
                                    <option value="wetland">💧 Wetland</option>
                                    <option value="savanna">🌾 Savanna</option>
                                    <option value="tundra">🧊 Tundra</option>
                                    <option value="temperate_forest">🌲 Temperate Forest</option>
                                    <option value="grassland">🌿 Grassland</option>
                                    <option value="coral_reef">🪸 Coral Reef</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={formData.conservation_status}
                                    onChange={(e) => setFormData({ ...formData, conservation_status: e.target.value })}
                                    placeholder="Vulnerable"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-blue-400 uppercase tracking-wider mb-2">
                                    Conservation Score (1-10)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.conservation_score}
                                    onChange={(e) => setFormData({ ...formData, conservation_score: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-yellow-400 uppercase tracking-wider mb-2">
                                    M2 Price (USD)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.m2_price}
                                    onChange={(e) => setFormData({ ...formData, m2_price: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-yellow-500 outline-none transition-all font-mono"
                                />
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    <MapPin size={12} className="inline mr-1" />
                                    Center Latitude
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    value={formData.center_lat}
                                    onChange={(e) => setFormData({ ...formData, center_lat: e.target.value })}
                                    placeholder="-1.5"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    <MapPin size={12} className="inline mr-1" />
                                    Center Longitude
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    value={formData.center_lng}
                                    onChange={(e) => setFormData({ ...formData, center_lng: e.target.value })}
                                    placeholder="-71.5"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="La región amazónica de Colombia representa..."
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                            />
                        </div>

                        {/* Fun Facts */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                Fun Facts (one per line)
                            </label>
                            <textarea
                                value={formData.fun_facts}
                                onChange={(e) => setFormData({ ...formData, fun_facts: e.target.value })}
                                placeholder="Hogar de más de 300 especies de aves&#10;Contiene el 10% de la biodiversidad mundial"
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                            />
                        </div>

                        {/* Endemic Species */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                Endemic Species (one per line)
                            </label>
                            <textarea
                                value={formData.endemic_species}
                                onChange={(e) => setFormData({ ...formData, endemic_species: e.target.value })}
                                placeholder="Delfín rosado&#10;Jaguar&#10;Anaconda verde"
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                            />
                        </div>

                        {/* Main Threats */}
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                Main Threats (one per line)
                            </label>
                            <textarea
                                value={formData.main_threats}
                                onChange={(e) => setFormData({ ...formData, main_threats: e.target.value })}
                                placeholder="Deforestación&#10;Minería ilegal&#10;Cambio climático"
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                            />
                        </div>

                        {/* Media URLs */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    <ImageIcon size={12} className="inline mr-1" />
                                    Hero Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.hero_image_url}
                                    onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    <Video size={12} className="inline mr-1" />
                                    Video URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.video_url}
                                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                    placeholder="https://youtube.com/..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                    <Camera size={12} className="inline mr-1" />
                                    Live Cam URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.live_cam_url}
                                    onChange={(e) => setFormData({ ...formData, live_cam_url: e.target.value })}
                                    placeholder="https://youtube.com/embed/..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {editingRegion ? 'Update Region' : 'Create Region'}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Regions List */}
            {!showForm && selectedCountry && (
                <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">
                        {selectedCountry.flag_emoji} {selectedCountry.name} Regions ({regions.length})
                    </h4>

                    {regions.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">No regions yet. Create one!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {regions.map(region => (
                                <div
                                    key={region.id}
                                    className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-1">
                                                {region.code}
                                            </div>
                                            <div className="text-lg font-black text-white">{region.name}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {region.biome_type}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEdit(region)}
                                            className="p-2 bg-white/5 rounded-lg hover:bg-emerald-500/20 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Edit2 size={14} className="text-emerald-400" />
                                        </button>
                                    </div>

                                    {region.description && (
                                        <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                                            {region.description}
                                        </p>
                                    )}

                                    {region.endemic_species && region.endemic_species.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {region.endemic_species.slice(0, 3).map((species, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold"
                                                >
                                                    {species}
                                                </span>
                                            ))}
                                            {region.endemic_species.length > 3 && (
                                                <span className="px-2 py-1 bg-white/5 text-gray-500 rounded text-[10px] font-bold">
                                                    +{region.endemic_species.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminRegionManager;
