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

    async updateSystemConfig(key, value, description = null) {
        if (!supabase) return null;
        const payload = {
            key,
            value,
            updated_at: new Date().toISOString()
        };
        if (description) payload.description = description;

        const { data, error } = await supabase
            .from('system_config')
            .upsert(payload, { onConflict: 'key' })
            .select();
        if (error) throw error;
        return data[0];
    },

    // --- User Profiles ---
    async getProfile(walletAddress) {
        if (!supabase || !walletAddress) return null;
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', walletAddress)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
            console.error("Error getting profile:", error);
            throw error;
        }
        return data; // returns null if not found
    },

    async upsertProfile(profile) {
        if (!supabase) return null;
        // Ensure wallet_address is present
        if (!profile.wallet_address) throw new Error("Wallet address is required for profile");

        const { data, error } = await supabase
            .from('profiles')
            .upsert(profile, { onConflict: 'wallet_address' })
            .select();

        if (error) throw error;
        return data[0];
    },

    async getProfiles() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('profiles')
            .select('*');
        if (error) throw error;
        return data;
    },

    // --- Marketplace: Species (for adoptions) ---
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

    // --- Marketplace: Adoptions ---
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
            const { data: speciesData } = await supabase
                .from('species')
                .select('total_adoptions')
                .eq('id', data[0].species_id)
                .single();

            if (speciesData) {
                await supabase
                    .from('species')
                    .update({ total_adoptions: (speciesData.total_adoptions || 0) + 1 })
                    .eq('id', data[0].species_id);
            }
        }

        return data[0];
    },

    // --- Marketplace: Donations ---
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

    // --- Marketplace: Carbon Purchases (using compensations table) ---
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
    },

    // --- Tier Benefits Management ---
    async getTierBenefits(tierLevel = null) {
        if (!supabase) return [];
        let query = supabase
            .from('tier_benefits')
            .select('*')
            .eq('active', true);

        if (tierLevel) query = query.eq('tier_level', tierLevel);

        const { data, error } = await query.order('tier_level', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getAllTierBenefits() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('tier_benefits')
            .select('*')
            .order('tier_level', { ascending: true });
        if (error) throw error;
        return data;
    },

    async addTierBenefit(benefit) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('tier_benefits')
            .insert([benefit])
            .select();
        if (error) throw error;
        return data[0];
    },

    async updateTierBenefit(id, updates) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('tier_benefits')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async deleteTierBenefit(id) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('tier_benefits')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return data;
    },

    async toggleTierBenefitStatus(id, active) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('tier_benefits')
            .update({ active })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    // ============================================
    // 🎁 PREMIUM EXPERIENCES (NEW)
    // ============================================
    // 🎁 EXPERIENCES (NEW)
    // ============================================
    async getPremiumExperiences(regionId = null, biomeKey = null, userTier = 4) {
        if (!supabase) return [];
        // Corrected table name based on SQL: premium_experiences
        let query = supabase.from('premium_experiences').select('*');

        if (biomeKey) {
            query = query.eq('biome_key', biomeKey);
        }

        const { data, error } = await query
            .lte('requires_tier', userTier) // Corrected column name: requires_tier
            .eq('active', true) // Corrected column name: active
            .order('requires_tier', { ascending: true });

        if (error) throw error;
        return data || [];
    },

    // 🏆 TIER BENEFITS (NEW)
    // ============================================
    async getTierBenefits(tierLevel = 4) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('tier_benefits')
            .select('*')
            .eq('tier_level', tierLevel)
            .eq('active', true);

        if (error) {
            console.error('Error fetching tier benefits:', error);
            return [];
        }
        return data || [];
    },

    // ============================================
    // 📊 PIXEL IMPACT (NEW)
    // ============================================
    async getPixelImpact(pixelId) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('pixel_impact')
            .select('*')
            .eq('pixel_id', pixelId)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data || {
            co2_captured_kg: 0,
            trees_planted: 0,
            funds_raised_usd: 0,
            species_protected: 0
        };
    },

    async getBiomeImpactSummary(biomeKey) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('biome_impact_summary')
            .select('*')
            .eq('biome_key', biomeKey)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    async upsertPixelImpact(impactData) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('pixel_impact')
            .upsert([impactData], { onConflict: 'pixel_id' })
            .select();
        if (error) throw error;
        return data[0];
    },

    // ============================================
    // 👥 PIXEL COMMUNITY (NEW)
    // ============================================
    async getPixelHolders(pixelId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .rpc('get_pixel_holders', { p_pixel_id: pixelId });
        if (error) {
            console.error('Error fetching pixel holders:', error);
            return [];
        }
        return data || [];
    },

    async getBiomeCommunityStats(biomeKey) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('biome_community_stats')
            .select('*')
            .eq('biome_key', biomeKey)
            .single();
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    // ============================================
    // 📅 COMMUNITY EVENTS (NEW)
    // ============================================
    async getUpcomingEvents(biomeKey) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('community_events')
            .select('*')
            .eq('biome_key', biomeKey)
            .gte('event_date', new Date().toISOString())
            .order('event_date', { ascending: true })
            .limit(5);
        if (error) throw error;
        return data || [];
    },

    async createCommunityEvent(eventData) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('community_events')
            .insert(eventData)
            .select();
        if (error) throw error;
        return data[0];
    },

    async registerForEvent(eventId, userId) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('event_participants')
            .insert({
                event_id: eventId,
                user_id: userId,
                registration_date: new Date().toISOString()
            })
            .select();
        if (error) throw error;
        return data[0];
    },

    // ============================================
    // 📸 USER GALLERY (NEW)
    // ============================================
    async getBiomePhotos(biomeKey, limit = 20) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('user_gallery')
            .select('*')
            .eq('biome_key', biomeKey)
            .eq('approved', true)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) throw error;
        return data || [];
    },

    async uploadPhoto(photoData) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('user_gallery')
            .insert(photoData)
            .select();
        if (error) throw error;
        return data[0];
    },

    async likePhoto(photoId, userId) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .rpc('toggle_gallery_like', {
                p_photo_id: photoId,
                p_user_id: userId
            });
        if (error) {
            console.error('Error liking photo:', error);
            return null;
        }
        return data;
    },

    async commentOnPhoto(photoId, userId, comment) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('gallery_comments')
            .insert({
                photo_id: photoId,
                user_id: userId,
                comment_text: comment
            })
            .select();
        if (error) throw error;
        return data[0];
    },

    // ============================================
    // 📊 GLOBAL STATS (NEW)
    // ============================================
    async getGlobalStats() {
        if (!supabase) return null;
        try {
            const [adoptions, impact, events] = await Promise.all([
                supabase.from('pixel_community').select('id', { count: 'exact', head: true }),
                supabase.from('pixel_impact').select('co2_captured_kg, trees_planted, funds_raised_usd'),
                supabase.from('community_events').select('id', { count: 'exact', head: true })
            ]);

            const totalCO2 = impact.data?.reduce((sum, p) => sum + (p.co2_captured_kg || 0), 0) || 0;
            const totalTrees = impact.data?.reduce((sum, p) => sum + (p.trees_planted || 0), 0) || 0;
            const totalFunds = impact.data?.reduce((sum, p) => sum + (p.funds_raised_usd || 0), 0) || 0;

            return {
                totalAdoptions: adoptions.count || 0,
                totalCO2Captured: totalCO2,
                totalTreesPlanted: totalTrees,
                totalFundsRaised: totalFunds,
                totalEvents: events.count || 0
            };
        } catch (error) {
            console.error('Error fetching global stats:', error);
            return null;
        }
    },

    // ============================================
    // 🗺️ REGIONAL DATA SYSTEM
    // ============================================

    // --- Continents ---
    async getAllContinents() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('continents')
            .select('*')
            .order('display_order');
        if (error) {
            console.error('Error fetching continents:', error);
            return [];
        }
        return data || [];
    },

    // --- Countries ---
    async getAllCountries() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('countries')
            .select('*')
            .order('name');
        if (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
        return data || [];
    },

    async getCountriesByContinent(continentCode) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('countries')
            .select('*')
            .eq('continent', continentCode)
            .order('name');
        if (error) {
            console.error('Error fetching countries by continent:', error);
            return [];
        }
        return data || [];
    },

    async getCountryByCode(countryCode) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('countries')
            .select('*')
            .eq('code', countryCode)
            .single();
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching country:', error);
            return null;
        }
        return data;
    },

    // --- Regions ---
    async getRegionsByCountry(countryId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('regions')
            .select('*, country:countries(*)')
            .eq('country_id', countryId)
            .order('name');
        if (error) {
            console.error('Error fetching regions:', error);
            return [];
        }
        return data || [];
    },

    async getRegionByCode(regionCode) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('regions')
            .select('*, country:countries(*)')
            .eq('code', regionCode)
            .single();
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching region:', error);
            return null;
        }
        return data;
    },

    async getFeaturedRegions() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('regions')
            .select('*, country:countries(*)')
            .eq('is_featured', true)
            .order('name');
        if (error) {
            console.error('Error fetching featured regions:', error);
            return [];
        }
        return data || [];
    },

    async upsertRegion(regionData) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('regions')
            .upsert([regionData])
            .select('*, country:countries(*)')
            .single();
        if (error) throw error;
        return data;
    },

    // --- Zones ---
    async getZonesByRegion(regionId) {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('zones')
            .select('*, region:regions(*, country:countries(*))')
            .eq('region_id', regionId)
            .order('name');
        if (error) {
            console.error('Error fetching zones:', error);
            return [];
        }
        return data || [];
    },

    async getZoneById(zoneId) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('zones')
            .select('*, region:regions(*, country:countries(*))')
            .eq('id', zoneId)
            .single();
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching zone:', error);
            return null;
        }
        return data;
    },

    async upsertZone(zoneData) {
        if (!supabase) return null;
        const { data, error } = await supabase
            .from('zones')
            .upsert([zoneData])
            .select('*, region:regions(*, country:countries(*))')
            .single();
        if (error) throw error;
        return data;
    },

    // --- Data Inheritance Logic ---
    /**
     * Get pixel data with inheritance from Zone → Region
     * This is the main method to use when displaying pixel information
     */
    async getPixelDataWithInheritance(pixelId, biomeKey) {
        if (!supabase) return null;

        try {
            // 1. Try to get pixel-specific data
            const { data: pixelData, error: pixelError } = await supabase
                .from('pixel_impact')
                .select('*, zone:zones(*, region:regions(*, country:countries(*)))')
                .eq('pixel_id', pixelId)
                .single();

            if (pixelData && !pixelError) {
                return {
                    source: 'pixel',
                    data: pixelData,
                    region: pixelData.zone?.region,
                    country: pixelData.zone?.region?.country
                };
            }

            // 2. Try to find region by biomeKey mapping
            // Map biomeKey to region code
            const biomeToRegionMap = {
                'COLOMBIA_AMAZON': 'AMAZONAS',
                'COLOMBIA_ANDES': 'ANDES',
                'GALAPAGOS': 'GALAPAGOS',
                'BRAZIL_AMAZON': 'AMAZONIA',
                'PERU_AMAZON': 'LORETO'
            };

            const regionCode = biomeToRegionMap[biomeKey];
            if (regionCode) {
                const region = await this.getRegionByCode(regionCode);
                if (region) {
                    return {
                        source: 'region',
                        data: {
                            description: region.description,
                            fun_facts: region.fun_facts,
                            endemic_species: region.endemic_species,
                            conservation_status: region.conservation_status,
                            main_threats: region.main_threats,
                            hero_image_url: region.hero_image_url,
                            gallery_urls: region.gallery_urls,
                            video_url: region.video_url,
                            live_cam_url: region.live_cam_url
                        },
                        region: region,
                        country: region.country
                    };
                }
            }

            // 3. Return null if no data found
            return null;
        } catch (error) {
            console.error('Error in getPixelDataWithInheritance:', error);
            return null;
        }
    },

    /**
     * Get aggregated impact data for a region
     */
    async getRegionImpactSummary(regionId) {
        if (!supabase) return null;

        try {
            // Sum up all zone impacts in this region
            const { data: zones, error } = await supabase
                .from('zones')
                .select('co2_captured_kg, trees_planted, area_protected_m2, funds_raised_usd, species_monitored')
                .eq('region_id', regionId);

            if (error) throw error;

            const summary = zones.reduce((acc, zone) => ({
                co2_captured_kg: acc.co2_captured_kg + (zone.co2_captured_kg || 0),
                trees_planted: acc.trees_planted + (zone.trees_planted || 0),
                area_protected_m2: acc.area_protected_m2 + (zone.area_protected_m2 || 0),
                funds_raised_usd: acc.funds_raised_usd + (zone.funds_raised_usd || 0),
                species_monitored: Math.max(acc.species_monitored, zone.species_monitored || 0)
            }), {
                co2_captured_kg: 0,
                trees_planted: 0,
                area_protected_m2: 0,
                funds_raised_usd: 0,
                species_monitored: 0
            });

            return summary;
        } catch (error) {
            console.error('Error calculating region impact:', error);
            return null;
        }
    },

    /**
     * Bulk Create Pixels (Generator)
     */
    async bulkCreatePixels(zoneId, count, startX = 0, startY = 0, gridSize = 10) {
        if (!supabase) return null;

        try {
            const pixels = [];
            for (let i = 0; i < count; i++) {
                const x = startX + (i % gridSize);
                const y = startY + Math.floor(i / gridSize);
                pixels.push({
                    zone_id: zoneId,
                    custom_id: `PX-${x}-${y}`,
                    coords_x: x,
                    coords_y: y,
                    status: 'available'
                });
            }

            const { data, error } = await supabase
                .from('pixels')
                .insert(pixels)
                .select();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error in bulkCreatePixels:', error);
            throw error;
        }
    },

    /**
     * Assign Pixels to Originator
     */
    async assignPixelsToOriginator(pixelIds, originatorId) {
        if (!supabase) return null;

        try {
            const { data, error } = await supabase
                .from('pixels')
                .update({ originator_id: originatorId })
                .in('id', pixelIds)
                .select();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error in assignPixelsToOriginator:', error);
            throw error;
        }
    },

    async getPixelsByOriginator(originatorId) {
        if (!supabase) return null;

        try {
            const { data, error } = await supabase
                .from('pixels')
                .select('*, zones(name, regions(name, countries(name)))')
                .eq('originator_id', originatorId);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error in getPixelsByOriginator:', error);
            return [];
        }
    },

    async getZones() {
        if (!supabase) return [];
        try {
            const { data, error } = await supabase
                .from('zones')
                .select('*, regions(name, country_id)');
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching zones:', error);
            return [];
        }
    }
};

export default supabaseService;
