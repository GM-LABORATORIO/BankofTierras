import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const supabaseService = {
    // --- Species ---
    async getSpecies() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('species')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addSpecies(speciesItem) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('species')
            .insert([speciesItem])
            .select();
        if (error) throw error;
        return data[0];
    },

    async updateSpecies(id, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('species')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    // --- Projects ---
    async getProjects() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addProject(project) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('projects')
            .insert([project])
            .select();
        if (error) throw error;
        return data[0];
    },

    async updateProject(id, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    // --- Adoptions ---
    async getAdoptions(walletAddress) {
        if (!supabase || !walletAddress) return [];
        const { data, error } = await supabase
            .from('adoptions')
            .select(`
                *,
                species:species_id (*)
            `)
            .eq('wallet_address', walletAddress);
        if (error) throw error;
        return data;
    },

    async addAdoption(adoption) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('adoptions')
            .insert([adoption])
            .select();
        if (error) throw error;
        return data[0];
    },

    // --- Compensations ---
    async getCompensations(walletAddress) {
        if (!supabase || !walletAddress) return [];
        const { data, error } = await supabase
            .from('compensations')
            .select('*')
            .eq('wallet_address', walletAddress);
        if (error) throw error;
        return data;
    },

    async addCompensation(compensation) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('compensations')
            .insert([compensation])
            .select();
        if (error) throw error;
        return data[0];
    },

    async seedSpecies(initialSpecies) {
        if (!supabase) return;
        const { data: existing } = await supabase.from('species').select('id').limit(1);
        if (existing && existing.length === 0) {
            const { error } = await supabase.from('species').insert(initialSpecies);
            if (error) console.error("Error seeding species:", error);
        }
    },

    // --- System Config ---
    async getSystemConfig() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('system_config')
            .select('*');
        if (error) throw error;
        return data;
    },

    async updateSystemConfig(key, value) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('system_config')
            .update({ value, updated_at: new Date().toISOString() })
            .eq('key', key)
            .select();
        if (error) throw error;
        return data[0];
    }
};
