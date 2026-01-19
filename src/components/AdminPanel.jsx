import React, { useState, useEffect } from 'react';
import { Settings, Wallet, Percent, Save, Loader2, ShieldCheck, Database, History } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { motion } from 'framer-motion';

const AdminPanel = () => {
    const [config, setConfig] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(null);
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        setIsLoading(true);
        try {
            let data = await supabaseService.getSystemConfig();

            // Si no hay datos, inicializamos con valores por defecto
            if (!data || data.length === 0) {
                console.log("No config found, seeding defaults...");
                await supabaseService.updateSystemConfig('treasury_wallet', '0xA583f0675a2d6f01ab21DEA98629e9Ee04320108', 'Wallet que recibe el 10% de las comisiones.');
                await supabaseService.updateSystemConfig('platform_fee_percentage', '10', 'Porcentaje de comisión por cada venta de créditos.');
                data = await supabaseService.getSystemConfig();
            }

            setConfig(data);
            const initialValues = {};
            data.forEach(item => {
                initialValues[item.key] = item.value;
            });
            setEditValues(initialValues);
        } catch (error) {
            console.error("Error loading config:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (key) => {
        setIsSaving(key);
        try {
            await supabaseService.updateSystemConfig(key, editValues[key]);
            alert(`Configuración "${key}" actualizada con éxito.`);
            loadConfig();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar: " + error.message);
        } finally {
            setIsSaving(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
                <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Cargando Ajustes del Sistema...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="relative h-48 rounded-[2.5rem] overflow-hidden group">
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
                    alt="Admin header"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-10">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="text-emerald-500" size={24} />
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Panel de Control</h2>
                    </div>
                    <p className="text-gray-400 text-sm font-bold max-w-md uppercase tracking-widest">
                        Configuración crítica de protocolos y parámetros financieros.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Configuration Cards */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 flex items-center gap-2">
                        <Settings size={16} /> Ajustes Globales
                    </h3>

                    {config.map((item) => (
                        <div key={item.key} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/20 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        {item.key.includes('wallet') ? <Wallet className="text-emerald-400" /> : <Percent className="text-blue-400" />}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.key.replace(/_/g, ' ')}</div>
                                        <div className="text-sm font-bold text-white">{item.description}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={editValues[item.key] || ''}
                                    onChange={(e) => setEditValues({ ...editValues, [item.key]: e.target.value })}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-emerald-400 focus:border-emerald-500 outline-none transition-all"
                                />
                                <button
                                    onClick={() => handleUpdate(item.key)}
                                    disabled={isSaving === item.key}
                                    className="bg-emerald-500 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSaving === item.key ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                    Guardar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* System Stats / Logs Visual */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 flex items-center gap-2">
                        <History size={16} /> Estado del Protocolo
                    </h3>

                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] h-full">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-emerald-500/10 rounded-2xl">
                                    <Database className="text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <div className="text-lg font-black text-white italic tracking-tighter italic">SUPABASE NODE: ONLINE</div>
                                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Sincronización en Tiempo Real Activa</div>
                                </div>
                            </div>

                            <div className="h-px bg-white/5" />

                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">Últimos Eventos</div>
                                {[
                                    "Actualización de Tasa de Cambio (AVAX/COP)",
                                    "Verificación de Proyecto ID: AMZ-442",
                                    "Compra confirmada por 50 tokens $CARBON",
                                    "Nuevo originador registrado en Amazonas"
                                ].map((log, i) => (
                                    <div key={i} className="flex items-center gap-3 text-xs text-gray-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                                        {log}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
