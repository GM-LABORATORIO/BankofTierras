import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Package, Zap, Gift, Globe, Check, X, AlertCircle } from 'lucide-react';
import supabaseService from '../services/supabaseService';

const TierBenefitsManager = () => {
    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingBenefit, setEditingBenefit] = useState(null);
    const [formData, setFormData] = useState({
        tier_level: 1,
        tier_name: 'EPIC',
        benefit_name: '',
        benefit_type: 'digital',
        description: '',
        stock: -1,
        requires_shipping: false,
        shipping_regions: [],
        active: true
    });

    const TIER_OPTIONS = [
        { level: 1, name: 'EPIC', color: '#fbbf24', icon: '⚡' },
        { level: 2, name: 'RARE', color: '#a855f7', icon: '💎' },
        { level: 3, name: 'COMMON', color: '#3b82f6', icon: '🌟' },
        { level: 4, name: 'BASIC', color: '#6b7280', icon: '📦' }
    ];

    const BENEFIT_TYPES = [
        { value: 'physical', label: 'Físico', icon: <Package size={18} />, color: '#10b981' },
        { value: 'digital', label: 'Digital', icon: <Zap size={18} />, color: '#3b82f6' },
        { value: 'experience', label: 'Experiencia', icon: <Gift size={18} />, color: '#f59e0b' }
    ];

    const COUNTRIES = [
        { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'MX', name: 'México', flag: '🇲🇽' },
        { code: 'ES', name: 'España', flag: '🇪🇸' },
        { code: 'BR', name: 'Brasil', flag: '🇧🇷' }
    ];

    useEffect(() => {
        loadBenefits();
    }, []);

    const loadBenefits = async () => {
        setLoading(true);
        try {
            const data = await supabaseService.getAllTierBenefits();
            setBenefits(data || []);
        } catch (error) {
            console.error('Error loading benefits:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBenefit) {
                await supabaseService.updateTierBenefit(editingBenefit.id, formData);
            } else {
                await supabaseService.addTierBenefit(formData);
            }
            loadBenefits();
            resetForm();
        } catch (error) {
            console.error('Error saving benefit:', error);
            alert('Error al guardar el beneficio');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este beneficio?')) return;
        try {
            await supabaseService.deleteTierBenefit(id);
            loadBenefits();
        } catch (error) {
            console.error('Error deleting benefit:', error);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await supabaseService.toggleTierBenefitStatus(id, !currentStatus);
            loadBenefits();
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const startEdit = (benefit) => {
        setEditingBenefit(benefit);
        setFormData({
            tier_level: benefit.tier_level,
            tier_name: benefit.tier_name,
            benefit_name: benefit.benefit_name,
            benefit_type: benefit.benefit_type,
            description: benefit.description || '',
            stock: benefit.stock,
            requires_shipping: benefit.requires_shipping,
            shipping_regions: benefit.shipping_regions || [],
            active: benefit.active
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            tier_level: 1,
            tier_name: 'EPIC',
            benefit_name: '',
            benefit_type: 'digital',
            description: '',
            stock: -1,
            requires_shipping: false,
            shipping_regions: [],
            active: true
        });
        setEditingBenefit(null);
        setShowForm(false);
    };

    const toggleShippingRegion = (code) => {
        setFormData(prev => ({
            ...prev,
            shipping_regions: prev.shipping_regions.includes(code)
                ? prev.shipping_regions.filter(c => c !== code)
                : [...prev.shipping_regions, code]
        }));
    };

    const benefitsByTier = TIER_OPTIONS.reduce((acc, tier) => {
        acc[tier.level] = benefits.filter(b => b.tier_level === tier.level);
        return acc;
    }, {});

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tight">Beneficios por Tier</h1>
                    <p className="text-gray-400 text-sm font-medium mt-2">Gestiona experiencias exclusivas para cada nivel de conservación</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg"
                >
                    <Plus size={20} /> Nuevo Beneficio
                </button>
            </div>

            {/* Benefits Grid by Tier */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="space-y-8">
                    {TIER_OPTIONS.map(tier => (
                        <div key={tier.level} className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                                <div className="text-4xl">{tier.icon}</div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight" style={{ color: tier.color }}>
                                        {tier.name} Tier
                                    </h2>
                                    <p className="text-gray-500 text-xs font-medium">
                                        {benefitsByTier[tier.level]?.length || 0} beneficios activos
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {benefitsByTier[tier.level]?.map(benefit => {
                                    const typeInfo = BENEFIT_TYPES.find(t => t.value === benefit.benefit_type);
                                    return (
                                        <motion.div
                                            key={benefit.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`bg-black/30 border border-white/10 rounded-2xl p-6 space-y-4 ${!benefit.active ? 'opacity-50' : ''}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div style={{ color: typeInfo?.color }}>
                                                        {typeInfo?.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-white text-sm">{benefit.benefit_name}</h3>
                                                        <p className="text-xs text-gray-500 font-medium">{typeInfo?.label}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => startEdit(benefit)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                                    >
                                                        <Edit2 size={14} className="text-blue-400" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(benefit.id)}
                                                        className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 transition-all"
                                                    >
                                                        <Trash2 size={14} className="text-red-400" />
                                                    </button>
                                                </div>
                                            </div>

                                            {benefit.description && (
                                                <p className="text-xs text-gray-400 leading-relaxed">{benefit.description}</p>
                                            )}

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-4 text-xs">
                                                    {benefit.requires_shipping && (
                                                        <span className="flex items-center gap-1 text-orange-400">
                                                            <Globe size={12} /> Envío
                                                        </span>
                                                    )}
                                                    {benefit.stock !== -1 && (
                                                        <span className="text-gray-500">Stock: {benefit.stock}</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleToggleStatus(benefit.id, benefit.active)}
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${benefit.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}
                                                >
                                                    {benefit.active ? 'Activo' : 'Inactivo'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
                        onClick={resetForm}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                                    {editingBenefit ? 'Editar Beneficio' : 'Nuevo Beneficio'}
                                </h2>
                                <button onClick={resetForm} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all">
                                    <X size={24} className="text-white" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Tier Selection */}
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Tier</label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {TIER_OPTIONS.map(tier => (
                                            <button
                                                key={tier.level}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, tier_level: tier.level, tier_name: tier.name })}
                                                className={`p-4 rounded-2xl border-2 transition-all ${formData.tier_level === tier.level ? 'border-white bg-white/10' : 'border-white/10 bg-white/5'}`}
                                            >
                                                <div className="text-2xl mb-2">{tier.icon}</div>
                                                <div className="text-xs font-black" style={{ color: tier.color }}>{tier.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefit Type */}
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Tipo de Beneficio</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {BENEFIT_TYPES.map(type => (
                                            <button
                                                key={type.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, benefit_type: type.value })}
                                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.benefit_type === type.value ? 'border-white bg-white/10' : 'border-white/10 bg-white/5'}`}
                                            >
                                                <div style={{ color: type.color }}>{type.icon}</div>
                                                <div className="text-xs font-black text-white">{type.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefit Name */}
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Nombre del Beneficio</label>
                                    <input
                                        type="text"
                                        value={formData.benefit_name}
                                        onChange={e => setFormData({ ...formData, benefit_name: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="Ej: Viaje Guiado al Amazonas"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Descripción</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                                        rows={4}
                                        placeholder="Describe el beneficio en detalle..."
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Stock (-1 = Ilimitado)</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-emerald-500/50 transition-all"
                                    />
                                </div>

                                {/* Shipping */}
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.requires_shipping}
                                            onChange={e => setFormData({ ...formData, requires_shipping: e.target.checked })}
                                            className="w-5 h-5 rounded bg-white/5 border-white/10"
                                        />
                                        <span className="text-sm font-bold text-white">Requiere Envío Físico</span>
                                    </label>
                                </div>

                                {/* Shipping Regions */}
                                {formData.requires_shipping && (
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Regiones de Envío</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {COUNTRIES.map(country => (
                                                <button
                                                    key={country.code}
                                                    type="button"
                                                    onClick={() => toggleShippingRegion(country.code)}
                                                    className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${formData.shipping_regions.includes(country.code) ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}
                                                >
                                                    <span className="text-2xl">{country.flag}</span>
                                                    <span className="text-sm font-bold text-white">{country.name}</span>
                                                    {formData.shipping_regions.includes(country.code) && <Check size={16} className="text-emerald-500 ml-auto" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-white/10 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg"
                                    >
                                        {editingBenefit ? 'Actualizar' : 'Crear'} Beneficio
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TierBenefitsManager;
