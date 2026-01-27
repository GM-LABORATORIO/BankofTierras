import React, { useState, useEffect } from 'react';
import { Gift, Plus, Edit2, Trash2, Loader2, Save, Star, ShieldCheck } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

const AdminBenefitsManager = () => {
    const [benefits, setBenefits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingBenefit, setEditingBenefit] = useState(null);

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        benefit_type: 'digital',
        icon_emoji: '🎁'
    });

    useEffect(() => {
        loadBenefits();
    }, []);

    const loadBenefits = async () => {
        setIsLoading(true);
        try {
            console.log('🔄 Loading benefits catalog...');
            const { data, error } = await supabaseService.supabase
                .from('benefits')
                .select('*')
                .order('name');

            if (error) throw error;
            setBenefits(data || []);
        } catch (error) {
            console.error('❌ Error loading benefits:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const benefitData = {
                code: formData.code.toUpperCase(),
                name: formData.name,
                description: formData.description,
                benefit_type: formData.benefit_type,
                icon_emoji: formData.icon_emoji
            };

            if (editingBenefit) {
                const { error } = await supabaseService.supabase
                    .from('benefits')
                    .update(benefitData)
                    .eq('id', editingBenefit.id);
                if (error) throw error;
            } else {
                const { error } = await supabaseService.supabase
                    .from('benefits')
                    .insert([benefitData]);
                if (error) throw error;
            }

            alert('✅ Benefit saved successfully!');
            setShowForm(false);
            setEditingBenefit(null);
            loadBenefits();
        } catch (error) {
            console.error('❌ Error saving benefit:', error);
            alert('Error saving benefit: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = (benefit) => {
        setEditingBenefit(benefit);
        setFormData({
            code: benefit.code,
            name: benefit.name,
            description: benefit.description || '',
            benefit_type: benefit.benefit_type,
            icon_emoji: benefit.icon_emoji || '🎁'
        });
        setShowForm(true);
    };

    if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-emerald-500" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                        <Gift className="text-yellow-400" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase">Benefits Catalog</h3>
                        <p className="text-xs text-gray-500 uppercase">Manage tiered perks and rewards</p>
                    </div>
                </div>
                {!showForm && (
                    <button
                        onClick={() => {
                            setEditingBenefit(null);
                            setFormData({ code: '', name: '', description: '', benefit_type: 'digital', icon_emoji: '🎁' });
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase"
                    >
                        <Plus size={16} /> New Benefit
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Benefit Code</label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none uppercase"
                                    placeholder="CARBON_CREDITS"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                                    placeholder="Impact Reward"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Type</label>
                                <select
                                    value={formData.benefit_type}
                                    onChange={(e) => setFormData({ ...formData, benefit_type: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
                                >
                                    <option value="digital">💻 Digital</option>
                                    <option value="physical">📦 Physical</option>
                                    <option value="experience">🏕️ Experience</option>
                                    <option value="financial">💰 Financial</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Icon Emoji</label>
                                <input
                                    type="text"
                                    value={formData.icon_emoji}
                                    onChange={(e) => setFormData({ ...formData, icon_emoji: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none text-center"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none h-24"
                                placeholder="Describe this benefit..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                {editingBenefit ? 'Update Benefit' : 'Create Benefit'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-8 py-4 bg-white/5 text-gray-500 rounded-xl font-black text-xs uppercase hover:bg-white/10"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {!showForm && (
                <div className="grid grid-cols-2 gap-4">
                    {benefits.map(benefit => (
                        <div key={benefit.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{benefit.icon_emoji}</div>
                                <div>
                                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">{benefit.benefit_type}</div>
                                    <h4 className="text-lg font-black text-white">{benefit.name}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">{benefit.description}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                    onClick={() => handleEdit(benefit)}
                                    className="p-2 bg-white/5 rounded-lg hover:bg-emerald-500/20 text-emerald-400"
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

export default AdminBenefitsManager;
