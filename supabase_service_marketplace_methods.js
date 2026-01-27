// Updated methods for marketplace - Add these to supabaseService.js

// Replace the existing species/adoptions/donations/carbon methods with these:

// --- Species (for adoptions) ---
async getSpeciesListings(filters = {}) {
    if (!supabase) return [];
    let query = supabase
        .from('species')
        .select('*')
        .eq('status', 'active');

    if (filters.category) query = query.eq('category', filters.category);
    if (filters.region) query = query.eq('region', filters.region);
    if (filters.owner_wallet) query = query.eq('owner_wallet', filters.owner_wallet);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
},

async addSpeciesListing(listing) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('species')
        .insert([listing])
        .select();
    if (error) throw error;
    return data[0];
},

// --- Adoptions ---
async getAdoptionsByWallet(walletAddress) {
    if (!supabase || !walletAddress) return [];
    const { data, error } = await supabase
        .from('adoptions')
        .select(`
            *,
            species:species(*)
        `)
        .eq('adopter_wallet', walletAddress)
        .eq('status', 'active');
    if (error) throw error;
    return data;
},

async createAdoption(adoption) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('adoptions')
        .insert([adoption])
        .select();
    if (error) throw error;

    // Update total adoptions count
    if (data[0] && data[0].species_id) {
        const { data: species } = await supabase
            .from('species')
            .select('total_adoptions')
            .eq('id', data[0].species_id)
            .single();

        if (species) {
            await supabase
                .from('species')
                .update({ total_adoptions: (species.total_adoptions || 0) + 1 })
                .eq('id', data[0].species_id);
        }
    }

    return data[0];
},

// --- Donations ---
async getDonationsByDonor(walletAddress) {
    if (!supabase || !walletAddress) return [];
    const { data, error } = await supabase
        .from('donations')
        .select(`
            *,
            originator:profiles!originator_wallet(name, wallet_address)
        `)
        .eq('donor_wallet', walletAddress);
    if (error) throw error;
    return data;
},

async getDonationsByOriginator(walletAddress) {
    if (!supabase || !walletAddress) return [];
    const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('originator_wallet', walletAddress);
    if (error) throw error;
    return data;
},

async createDonation(donation) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('donations')
        .insert([donation])
        .select();
    if (error) throw error;
    return data[0];
},

// --- Carbon Purchases (using compensations table) ---
async createCarbonPurchase(purchase) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('compensations')
        .insert([purchase])
        .select();
    if (error) throw error;
    return data[0];
},

async getCarbonPurchasesByWallet(walletAddress) {
    if (!supabase || !walletAddress) return [];
    const { data, error } = await supabase
        .from('compensations')
        .select(`
            *,
            project:projects(*)
        `)
        .eq('buyer_wallet', walletAddress);
    if (error) throw error;
    return data;
}
