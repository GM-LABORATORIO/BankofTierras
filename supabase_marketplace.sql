-- ============================================
-- Bank of Tierras - Marketplace Tables
-- Run this entire script at once in Supabase SQL Editor
-- ============================================

-- 1. Species Listings Table
CREATE TABLE IF NOT EXISTS species_listings (
    id SERIAL PRIMARY KEY,
    originator_wallet TEXT NOT NULL,
    project_id UUID,
    name TEXT NOT NULL,
    scientific_name TEXT,
    category TEXT NOT NULL CHECK (category IN ('flora', 'fauna')),
    description TEXT,
    image_url TEXT,
    adoption_price_bot DECIMAL NOT NULL,
    monthly_support_bot DECIMAL DEFAULT 0,
    total_adoptions INTEGER DEFAULT 0,
    region TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold_out')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Adoptions Table
CREATE TABLE IF NOT EXISTS adoptions (
    id SERIAL PRIMARY KEY,
    adopter_wallet TEXT NOT NULL,
    species_listing_id INTEGER NOT NULL,
    nft_token_id INTEGER,
    adoption_date TIMESTAMP DEFAULT NOW(),
    is_recurring BOOLEAN DEFAULT FALSE,
    monthly_amount_bot DECIMAL DEFAULT 0,
    tx_hash TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_wallet TEXT NOT NULL,
    originator_wallet TEXT NOT NULL,
    amount_bot DECIMAL NOT NULL,
    message TEXT,
    tx_hash TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Carbon Purchases Table
CREATE TABLE IF NOT EXISTS carbon_purchases (
    id SERIAL PRIMARY KEY,
    buyer_wallet TEXT NOT NULL,
    project_id UUID NOT NULL,
    amount_tco2 DECIMAL NOT NULL,
    price_per_ton_bot DECIMAL NOT NULL,
    total_cost_bot DECIMAL NOT NULL,
    burn_amount_bot DECIMAL NOT NULL,
    fee_amount_bot DECIMAL NOT NULL,
    tx_hash TEXT,
    certificate_url TEXT,
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Add Foreign Keys (after tables exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'species_listings_originator_wallet_fkey'
    ) THEN
        ALTER TABLE species_listings 
        ADD CONSTRAINT species_listings_originator_wallet_fkey 
        FOREIGN KEY (originator_wallet) REFERENCES profiles(wallet_address);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'species_listings_project_id_fkey'
    ) THEN
        ALTER TABLE species_listings 
        ADD CONSTRAINT species_listings_project_id_fkey 
        FOREIGN KEY (project_id) REFERENCES projects(id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'adoptions_species_listing_id_fkey'
    ) THEN
        ALTER TABLE adoptions 
        ADD CONSTRAINT adoptions_species_listing_id_fkey 
        FOREIGN KEY (species_listing_id) REFERENCES species_listings(id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'donations_originator_wallet_fkey'
    ) THEN
        ALTER TABLE donations 
        ADD CONSTRAINT donations_originator_wallet_fkey 
        FOREIGN KEY (originator_wallet) REFERENCES profiles(wallet_address);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'carbon_purchases_project_id_fkey'
    ) THEN
        ALTER TABLE carbon_purchases 
        ADD CONSTRAINT carbon_purchases_project_id_fkey 
        FOREIGN KEY (project_id) REFERENCES projects(id);
    END IF;
END $$;

-- 6. Create Indexes
CREATE INDEX IF NOT EXISTS idx_species_originator ON species_listings(originator_wallet);
CREATE INDEX IF NOT EXISTS idx_species_category ON species_listings(category);
CREATE INDEX IF NOT EXISTS idx_species_status ON species_listings(status);
CREATE INDEX IF NOT EXISTS idx_species_region ON species_listings(region);

CREATE INDEX IF NOT EXISTS idx_adoptions_adopter ON adoptions(adopter_wallet);
CREATE INDEX IF NOT EXISTS idx_adoptions_species ON adoptions(species_listing_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_status ON adoptions(status);

CREATE INDEX IF NOT EXISTS idx_donations_donor ON donations(donor_wallet);
CREATE INDEX IF NOT EXISTS idx_donations_originator ON donations(originator_wallet);

CREATE INDEX IF NOT EXISTS idx_carbon_buyer ON carbon_purchases(buyer_wallet);
CREATE INDEX IF NOT EXISTS idx_carbon_project ON carbon_purchases(project_id);
CREATE INDEX IF NOT EXISTS idx_carbon_status ON carbon_purchases(status);

-- 7. Helper Function
CREATE OR REPLACE FUNCTION increment_species_adoptions(species_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE species_listings 
    SET total_adoptions = total_adoptions + 1,
        updated_at = NOW()
    WHERE id = species_id;
END;
$$ LANGUAGE plpgsql;
