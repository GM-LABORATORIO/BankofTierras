import React, { useState, useEffect } from 'react';
import {
    Grid,
    Link,
    MousePointer2,
    Zap,
    UserPlus,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

const AdminBulkTools = () => {
    const [selectedOriginator, setSelectedOriginator] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [pixelCount, setPixelCount] = useState(100);
    const [gridSize, setGridSize] = useState(10);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const [originators, setOriginators] = useState([]);
    const [zones, setZones] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [profiles, allZones] = await Promise.all([
                supabaseService.getProfiles(),
                supabaseService.getZones()
            ]);
            // Filter only originators (this is a guess on structure, would need to verify role field)
            setOriginators(profiles.filter(p => (p.role === 'originator' || p.is_originator)));
            setZones(allZones || []);
        } catch (error) {
            console.error('Error loading initial data for bulk tools:', error);
        }
    };

    const handleBulkCreate = async () => {
        if (!selectedZone) {
            alert('Please select a Zone first');
            return;
        }

        setIsProcessing(true);
        setResult(null);
        try {
            const data = await supabaseService.bulkCreatePixels(
                selectedZone,
                pixelCount,
                startX,
                startY,
                gridSize
            );
            setResult({ success: true, count: data.length, message: `Created ${data.length} pixels successfully.` });
        } catch (error) {
            setResult({ success: false, message: error.message });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="flex items-center gap-4 p-8 bg-black/40 rounded-[2.5rem] border border-emerald-500/20">
                <div className="p-4 bg-emerald-500/20 rounded-2xl">
                    <Zap className="text-emerald-400" size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Bulk Ecosystem Tools</h2>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Massive land population & management</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pixel Grid Generator */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/20 transition-all flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <Grid className="text-emerald-400" size={24} />
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Pixel Grid Generator</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Target Zone</label>
                            <select
                                value={selectedZone}
                                onChange={(e) => setSelectedZone(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                            >
                                <option value="">Select a Zone...</option>
                                {zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Total Pixels</label>
                                <input
                                    type="number"
                                    value={pixelCount}
                                    onChange={(e) => setPixelCount(parseInt(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Grid Width</label>
                                <input
                                    type="number"
                                    value={gridSize}
                                    onChange={(e) => setGridSize(parseInt(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Start X</label>
                                <input
                                    type="number"
                                    value={startX}
                                    onChange={(e) => setStartX(parseInt(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Start Y</label>
                                <input
                                    type="number"
                                    value={startY}
                                    onChange={(e) => setStartY(parseInt(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleBulkCreate}
                        disabled={isProcessing}
                        className="mt-8 w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isProcessing ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
                        Execute Mass Population
                    </button>
                </div>

                {/* Originator Assignment */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/20 transition-all flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <UserPlus className="text-blue-400" size={24} />
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Originator Assignment</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div>
                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Select Originador</label>
                            <select
                                value={selectedOriginator}
                                onChange={(e) => setSelectedOriginator(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                            >
                                <option value="">Select an Originator...</option>
                                {originators.map(o => <option key={o.id} value={o.id}>{o.name || o.wallet_address.slice(0, 10)}</option>)}
                            </select>
                        </div>

                        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                            <p className="text-sm text-gray-400 font-medium">
                                Selection logic will be integrated with the Map or a list view of available pixels.
                            </p>
                        </div>
                    </div>

                    <button className="mt-8 w-full py-4 bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                        <Link size={18} /> Assign Selected Lands
                    </button>
                </div>
            </div>

            {/* Result Overlay */}
            {result && (
                <div className={`p-6 rounded-2xl border flex items-center gap-4 animate-in zoom-in-95 ${result.success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {result.success ? <CheckCircle2 /> : <AlertCircle />}
                    <span className="text-sm font-bold uppercase tracking-wider">{result.message}</span>
                </div>
            )}
        </div>
    );
};

export default AdminBulkTools;
