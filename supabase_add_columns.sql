-- ============================================
-- Bank of Tierras - Add missing columns to existing tables
-- ============================================

-- 1. Add columns to 'species' table (if they don't exist)
DO $$ 
BEGIN
    -- Add adoption_price_bot if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'species' AND column_name = 'adoption_price_bot'
    ) THEN
        ALTER TABLE species ADD COLUMN adoption_price_bot DECIMAL DEFAULT 500;
    END IF;

    -- Add category if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'species' AND column_name = 'category'
    ) THEN
        ALTER TABLE species ADD COLUMN category TEXT DEFAULT 'fauna';
    END IF;

    -- Add scientific_name if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'species' AND column_name = 'scientific_name'
    ) THEN
        ALTER TABLE species ADD COLUMN scientific_name TEXT;
    END IF;

    -- Add total_adoptions if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'species' AND column_name = 'total_adoptions'
    ) THEN
        ALTER TABLE species ADD COLUMN total_adoptions INTEGER DEFAULT 0;
    END IF;

    -- Add region if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'species' AND column_name = 'region'
    ) THEN
        ALTER TABLE species ADD COLUMN region TEXT;
    END IF;

    -- Add description if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'species' AND column_name = 'description'
    ) THEN
        ALTER TABLE species ADD COLUMN description TEXT;
    END IF;
END $$;

-- 2. Create donations table (new)
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_wallet TEXT NOT NULL,
    originator_wallet TEXT NOT NULL,
    amount_bot DECIMAL NOT NULL,
    message TEXT,
    tx_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add columns to 'compensations' table for carbon purchases
DO $$ 
BEGIN
    -- Add burn_amount_bot if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'compensations' AND column_name = 'burn_amount_bot'
    ) THEN
        ALTER TABLE compensations ADD COLUMN burn_amount_bot DECIMAL DEFAULT 0;
    END IF;

    -- Add fee_amount_bot if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'compensations' AND column_name = 'fee_amount_bot'
    ) THEN
        ALTER TABLE compensations ADD COLUMN fee_amount_bot DECIMAL DEFAULT 0;
    END IF;

    -- Add total_cost_bot if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'compensations' AND column_name = 'total_cost_bot'
    ) THEN
        ALTER TABLE compensations ADD COLUMN total_cost_bot DECIMAL;
    END IF;
END $$;

-- 4. Add columns to 'projects' table
DO $$ 
BEGIN
    -- Add available_credits if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'available_credits'
    ) THEN
        ALTER TABLE projects ADD COLUMN available_credits DECIMAL;
    END IF;

    -- Add price_per_ton if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'price_per_ton'
    ) THEN
        ALTER TABLE projects ADD COLUMN price_per_ton DECIMAL DEFAULT 1000;
    END IF;

    -- Add description if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'description'
    ) THEN
        ALTER TABLE projects ADD COLUMN description TEXT;
    END IF;
END $$;

-- 5. Create indexes
CREATE INDEX IF NOT EXISTS idx_species_category ON species(category);
CREATE INDEX IF NOT EXISTS idx_species_region ON species(region);
CREATE INDEX IF NOT EXISTS idx_donations_donor ON donations(donor_wallet);
CREATE INDEX IF NOT EXISTS idx_donations_originator ON donations(originator_wallet);
CREATE INDEX IF NOT EXISTS idx_projects_owner ON projects(owner_wallet);
