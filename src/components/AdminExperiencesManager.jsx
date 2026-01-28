import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, Loader2, Save, MapPin, DollarSign, Users, Globe } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

const AdminExperiencesManager = () => {
    const [experiences, setExperiences] = useState([]);
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingExp, setEditingExp] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        experience_type: 'webinar',
        biome_key: '',
        requires_tier: 4,
        price_usd: 0,
        price_included: false,
        booking_url: '',
        image_url: '',
        max_participants: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [expRes, regRes] = await Promise.all([
                supabaseService.supabase.from('premium_experiences').select('*').order('created_at', { ascending: false }),
                supabaseService.supabase.from('regions').select('id, name').order('name')
            ]);

            if (expRes.error) throw expRes.error;
            if (regRes.error) throw regRes.error;

            setExperiences(expRes.data || []);
            setRegions(regRes.data || []);
        } catch (error) {
            console.error('❌ Error loading experiences data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const expData = {
                ...formData,
                price_usd: parseFloat(formData.price_usd) || 0,
                max_participants: parseInt(formData.max_participants) || null,
                region_id: formData.region_id || null
            };

            if (editingExp) {
                const { error } = await supabaseService.supabase
                    .from('premium_experiences')
                    .update(expData)
                    .eq('id', editingExp.id);
                if (error) throw error;
            } else {
                const { error } = await supabaseService.supabase
                    .from('premium_experiences')
                    .insert([expData]);
                if (error) throw error;
            }

            alert('✅ Experience saved!');
            setShowForm(false);
            setEditingExp(null);
            loadData();
        } catch (error) {
            console.error('❌ Error saving experience:', error);
            alert('Error: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (exp) => {
        setEditingExp(exp);
        setFormData({
            title: exp.title,
            description: exp.description || '',
            experience_type: exp.experience_type,
            biome_key: exp.biome_key || '',
            requires_tier: exp.requires_tier || 4,
            price_usd: exp.price_usd || 0,
            price_included: exp.price_included || false,
            booking_url: exp.booking_url || '',
            image_url: exp.image_url || '',
            max_participants: exp.max_participants || ''
        });
        setShowForm(true);
    };

    if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-500" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Calendar className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase">Experiences Manager</h3>
                        <p className="text-xs text-gray-500 uppercase">Manage webinars, trips and tours</p>
                    </div>
                </div>
                {!showForm && (
                    <button
                        onClick={() => {
                            setEditingExp(null);
                            setFormData({
                                title: '',
                                description: '',
                                experience_type: 'webinar',
                                biome_key: '',
                                requires_tier: 4,
                                price_usd: 0,
                                price_included: false,
                                booking_url: '',
                                image_url: '',
                                max_participants: ''
                            });
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-black text-xs uppercase"
                    >
                        <Plus size={16} /> New Experience
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                                    placeholder="Expedition to Amazonas"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Type</label>
                                <select
                                    value={formData.experience_type}
                                    onChange={(e) => setFormData({ ...formData, experience_type: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                                >
                                    <option value="webinar">🎓 Webinar</option>
                                    <option value="trip">✈️ Trip</option>
                                    <option value="tour">🏕️ Tour</option>
                                    <option value="workshop">📸 Workshop</option>
                                    <option value="live_cam">📹 Live Cam</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Related Region</label>
                                <select
                                    value={formData.region_id}
                                    onChange={(e) => setFormData({ ...formData, region_id: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                                >
                                    <option value="">All Regions</option>
                                    {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Min Tier</label>
                                <select
                                    value={formData.requires_tier}
                                    onChange={(e) => setFormData({ ...formData, requires_tier: parseInt(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                                >
                                    <option value={1}>Tier 1 (EPIC)</option>
                                    <option value={2}>Tier 2 (RARE)</option>
                                    <option value={3}>Tier 3 (COMMON)</option>
                                    <option value={4}>Tier 4 (BASIC)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Price (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 text-gray-500" size={16} />
                                    <input
                                        type="number"
                                        value={formData.price_usd}
                                        onChange={(e) => setFormData({ ...formData, price_usd: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/10">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.price_included}
                                    onChange={(e) => setFormData({ ...formData, price_included: e.target.checked })}
                                    className="w-5 h-5 accent-emerald-500"
                                />
                                <span className="text-xs font-black text-white uppercase">Included for free in Tier holders</span>
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 py-4 bg-blue-500 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                {editingExp ? 'Update Experience' : 'Create Experience'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-8 py-4 bg-white/5 text-gray-500 rounded-xl font-black text-xs uppercase"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {!showForm && (
                <div className="space-y-3">
                    {experiences.map(exp => (
                        <div key={exp.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    {exp.experience_type === 'trip' && <Globe size={24} className="text-blue-400" />}
                                    {exp.experience_type === 'webinar' && <Calendar size={24} className="text-emerald-400" />}
                                    {exp.experience_type === 'live_cam' && <Users size={24} className="text-yellow-400" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-white bg-blue-500 px-2 py-0.5 rounded-full uppercase">Tier {exp.requires_tier}+</span>
                                        {exp.price_included && <span className="text-[10px] font-black text-emerald-400 uppercase">✓ Included</span>}
                                        {exp.biome_key && <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter flex items-center gap-1"><MapPin size={10} /> {exp.biome_key}</span>}
                                    </div>
                                    <h4 className="text-lg font-black text-white">{exp.title}</h4>
                                    <div className="text-sm font-black text-white/50">${exp.price_usd} USD</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 text-blue-400"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 text-red-400">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminExperiencesManager;
