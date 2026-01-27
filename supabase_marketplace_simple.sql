-- ============================================
-- Bank of Tierras - Marketplace Tables (MINIMAL)
-- Solo crea lo que NO existe
-- ============================================

-- 1. Species Listings (nueva tabla)
CREATE TABLE IF NOT EXISTS species_listings (
    id SERIAL PRIMARY KEY,
    originator_wallet TEXT,
    project_id UUID,
    name TEXT NOT NULL,
    scientific_name TEXT,
    category TEXT CHECK (category IN ('flora', 'fauna')),
    description TEXT,
    image_url TEXT,
    adoption_price_bot DECIMAL,
    monthly_support_bot DECIMAL DEFAULT 0,
    total_adoptions INTEGER DEFAULT 0,
    region TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Donations (nueva tabla)
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_wallet TEXT,
    originator_wallet TEXT,
    amount_bot DECIMAL,
    message TEXT,
    tx_hash TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Carbon Purchases (nueva tabla)
CREATE TABLE IF NOT EXISTS carbon_purchases (
    id SERIAL PRIMARY KEY,
    buyer_wallet TEXT,
    project_id UUID,
    amount_tco2 DECIMAL,
    price_per_ton_bot DECIMAL,
    total_cost_bot DECIMAL,
    burn_amount_bot DECIMAL,
    fee_amount_bot DECIMAL,
    tx_hash TEXT,
    certificate_url TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Indexes básicos
CREATE INDEX IF NOT EXISTS idx_species_originator ON species_listings(originator_wallet);
CREATE INDEX IF NOT EXISTS idx_species_category ON species_listings(category);
CREATE INDEX IF NOT EXISTS idx_donations_donor ON donations(donor_wallet);
CREATE INDEX IF NOT EXISTS idx_carbon_buyer ON carbon_purchases(buyer_wallet);
