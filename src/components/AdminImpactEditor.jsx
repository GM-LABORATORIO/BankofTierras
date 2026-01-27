import React, { useState } from 'react';
import { Save, Loader2, TrendingUp, Plus, Trash2 } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

const AdminImpactEditor = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        pixel_id: '',
        co2_captured_kg: '',
        trees_planted: '',
        funds_raised_usd: '',
        species_protected: '',
        current_health: '',
        area_protected_m2: '',
        health_history: '[]',
        conservation_activities: '[]'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Parse JSON fields
            const healthHistory = JSON.parse(formData.health_history);
            const conservationActivities = JSON.parse(formData.conservation_activities);

            // Prepare data for Supabase
            const impactData = {
                pixel_id: formData.pixel_id,
                co2_captured_kg: parseFloat(formData.co2_captured_kg) || 0,
                trees_planted: parseInt(formData.trees_planted) || 0,
                funds_raised_usd: parseFloat(formData.funds_raised_usd) || 0,
                species_protected: parseInt(formData.species_protected) || 0,
                current_health: parseInt(formData.current_health) || 0,
                area_protected_m2: parseFloat(formData.area_protected_m2) || 0,
                health_history: healthHistory,
                conservation_activities: conservationActivities
            };

            // Save to Supabase
            await supabaseService.upsertPixelImpact(impactData);

            alert('✅ Impact data saved successfully!');

            // Reset form
            setFormData({
                pixel_id: '',
                co2_captured_kg: '',
                trees_planted: '',
                funds_raised_usd: '',
                species_protected: '',
                current_health: '',
                area_protected_m2: '',
                health_history: '[]',
                conservation_activities: '[]'
            });
        } catch (error) {
            console.error('Error saving impact data:', error);
            alert('❌ Error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const addHealthHistoryEntry = () => {
        try {
            const history = JSON.parse(formData.health_history);
            history.push({
                date: new Date().toISOString().split('T')[0],
                health: 75
            });
            setFormData({ ...formData, health_history: JSON.stringify(history, null, 2) });
        } catch (e) {
            alert('Invalid JSON in health history');
        }
    };

    const addConservationActivity = () => {
        try {
            const activities = JSON.parse(formData.conservation_activities);
            activities.push({
                date: new Date().toISOString().split('T')[0],
                type: 'reforestation',
                description: 'New conservation activity'
            });
            setFormData({ ...formData, conservation_activities: JSON.stringify(activities, null, 2) });
        } catch (e) {
            alert('Invalid JSON in conservation activities');
        }
    };

    return (
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem]">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <TrendingUp className="text-emerald-400" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Pixel Impact Editor</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Add or update environmental metrics</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pixel ID */}
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                        Pixel ID
                    </label>
                    <input
                        type="text"
                        value={formData.pixel_id}
                        onChange={(e) => setFormData({ ...formData, pixel_id: e.target.value })}
                        placeholder="CELL-72-45"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                            CO2 Captured (kg)
                        </label>
                        <input
                            type="number"
                            value={formData.co2_captured_kg}
                            onChange={(e) => setFormData({ ...formData, co2_captured_kg: e.target.value })}
                            placeholder="2500"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                            Trees Planted
                        </label>
                        <input
                            type="number"
                            value={formData.trees_planted}
                            onChange={(e) => setFormData({ ...formData, trees_planted: e.target.value })}
                            placeholder="150"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                            Funds Raised (USD)
                        </label>
                        <input
                            type="number"
                            value={formData.funds_raised_usd}
                            onChange={(e) => setFormData({ ...formData, funds_raised_usd: e.target.value })}
                            placeholder="5000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                            Species Protected
                        </label>
                        <input
                            type="number"
                            value={formData.species_protected}
                            onChange={(e) => setFormData({ ...formData, species_protected: e.target.value })}
                            placeholder="12"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                            Current Health (%)
                        </label>
                        <input
                            type="number"
                            value={formData.current_health}
                            onChange={(e) => setFormData({ ...formData, current_health: e.target.value })}
                            placeholder="85"
                            min="0"
                            max="100"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                            Area Protected (m²)
                        </label>
                        <input
                            type="number"
                            value={formData.area_protected_m2}
                            onChange={(e) => setFormData({ ...formData, area_protected_m2: e.target.value })}
                            placeholder="10000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Health History */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">
                            Health History (JSON)
                        </label>
                        <button
                            type="button"
                            onClick={addHealthHistoryEntry}
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                            <Plus size={14} /> Add Entry
                        </button>
                    </div>
                    <textarea
                        value={formData.health_history}
                        onChange={(e) => setFormData({ ...formData, health_history: e.target.value })}
                        placeholder='[{"date":"2024-01-01","health":75}]'
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-gray-300 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                {/* Conservation Activities */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">
                            Conservation Activities (JSON)
                        </label>
                        <button
                            type="button"
                            onClick={addConservationActivity}
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                            <Plus size={14} /> Add Activity
                        </button>
                    </div>
                    <textarea
                        value={formData.conservation_activities}
                        onChange={(e) => setFormData({ ...formData, conservation_activities: e.target.value })}
                        placeholder='[{"date":"2024-01-15","type":"reforestation","description":"Planted 50 trees"}]'
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-gray-300 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Impact Data
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AdminImpactEditor;
