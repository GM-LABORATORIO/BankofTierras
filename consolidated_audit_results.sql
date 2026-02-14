-- ============================================
-- CPX: CONSOLIDATED DATABASE REFACTOR & AUDIT
-- Targets: Token name update ($SIGNAL), Schema Unification, and Consistency Fixes.
-- ============================================

-- 1. UNIFY SPECIES & LISTINGS
-- Ensure 'species' is the primary table for biological assets
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'species_listings') AND 
       NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'species') THEN
        ALTER TABLE species_listings RENAME TO species;
        ALTER SEQUENCE IF EXISTS species_listings_id_seq RENAME TO species_id_seq;
    END IF;
END $$;

-- 2. REPUTATION SYSTEM (Matching supabaseService.js)
-- Create tables and views that the service expects
CREATE TABLE IF NOT EXISTS reputation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL REFERENCES profiles(wallet_address),
    action_type TEXT NOT NULL, 
    points INTEGER DEFAULT 0,
    impact_metrics JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Service expects 'reputation_summary' and 'reputation_logs'
CREATE OR REPLACE VIEW reputation_summary AS
SELECT 
    wallet_address,
    SUM(points) as total_score,
    COUNT(*) as total_actions,
    MAX(created_at) as last_activity
FROM reputation_history
GROUP BY wallet_address;

CREATE OR REPLACE VIEW reputation_logs AS
SELECT * FROM reputation_history;

-- 3. PIXEL ADOPTIONS & COMMUNITY BRIDGE
-- Ensure both naming conventions work during transition
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'pixel_adoptions') AND 
       NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'pixel_community') THEN
        CREATE VIEW pixel_community AS SELECT * FROM pixel_adoptions;
    END IF;
END $$;

-- 4. MISSING COMMUNITY INFRASTRUCTURE
-- Ensure events and participation exist for the new social features
CREATE TABLE IF NOT EXISTS community_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    biome_key TEXT NOT NULL,
    event_type TEXT NOT NULL, -- 'cleanup', 'reforestation', 'monitoring', 'webinar'
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    requires_tier INTEGER DEFAULT 4,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS event_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES community_events(id) ON DELETE CASCADE,
    wallet_address TEXT NOT NULL REFERENCES profiles(wallet_address),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. USER GALLERY & SOCIAL ENGAGEMENT
CREATE TABLE IF NOT EXISTS user_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL REFERENCES profiles(wallet_address),
    biome_key TEXT NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    likes INTEGER DEFAULT 0,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS gallery_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    photo_id UUID REFERENCES user_gallery(id) ON DELETE CASCADE,
    wallet_address TEXT NOT NULL REFERENCES profiles(wallet_address),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. TOKEN BRANDING UPDATES (Comments & Meta)
COMMENT ON COLUMN pixel_adoptions.amount_bot IS 'Amount paid in native/gas tokens ($SIGNAL/Legacy BoT)';
COMMENT ON TABLE reputation_history IS 'Immutable pulse of user actions in the $SIGNAL ecosystem';

-- 7. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_reputation_wallet_fast ON reputation_history(wallet_address);
CREATE INDEX IF NOT EXISTS idx_gallery_biome ON user_gallery(biome_key);
CREATE INDEX IF NOT EXISTS idx_events_date_fast ON community_events(event_date);
