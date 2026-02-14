-- ==========================================
-- CPX DATABASE CLEANUP MASTER SCRIPT
-- Purpose: Purge legacy tables, unify schema, and optimize for $SIGNAL.
-- Author: Antigravity (Senior CTO for GM Labs)
-- ==========================================

BEGIN;

-- 1. DROP LEGACY TABLES (CAUTION: Destructive operation)
-- We drop these because their functionality is now handled by more specialized or unified tables.
DROP TABLE IF EXISTS species_listings CASCADE;
DROP TABLE IF EXISTS pixel_community CASCADE; -- Replaced by a view
DROP TABLE IF EXISTS "adoptions_old" CASCADE; -- If it exists
DROP TABLE IF EXISTS "compensations_old" CASCADE; -- If it exists

-- 2. UNIFY SPECIES TABLE
-- Ensure the 'species' table has all necessary fields from the legacy listings.
ALTER TABLE species ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE species ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE species ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE species ADD COLUMN IF NOT EXISTS owner_wallet TEXT;
ALTER TABLE species ADD COLUMN IF NOT EXISTS total_adoptions INTEGER DEFAULT 0;

-- 3. ALIGN REPUTATION SYSTEM (Service Layer Compatibility)
-- The service layer expects 'reputation_logs' as a table for writing and 'reputation_summary' for reading.

-- If reputation_logs exists as a VIEW (from previous script), drop it to create the TABLE
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_views WHERE viewname = 'reputation_logs') THEN
        DROP VIEW reputation_logs;
    END IF;
END $$;

-- Create reputation_logs TABLE if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'reputation_logs' AND n.nspname = 'public') THEN
        CREATE TABLE reputation_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            wallet_address TEXT NOT NULL,
            action_type TEXT NOT NULL,
            points_change INTEGER NOT NULL,
            description TEXT,
            metadata JSONB DEFAULT '{}'::jsonb,
            created_at TIMESTAMPTZ DEFAULT now()
        );
        
        -- Migrate data if history/history view exists
        IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'reputation_history') THEN
            -- We use action_type as a fallback for description if it's missing in history
            INSERT INTO reputation_logs (wallet_address, action_type, points_change, description, metadata, created_at)
            SELECT wallet_address, action_type, points, action_type, metadata, created_at FROM reputation_history;
            -- COMMENT ON TABLE reputation_logs IS 'Aggregated action logs for CPX Score';
        END IF;
    END IF;
END $$;

-- Ensure reputation_summary exists as a view or table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'reputation_summary') AND 
       NOT EXISTS (SELECT FROM pg_views WHERE viewname = 'reputation_summary') THEN
        CREATE VIEW reputation_summary AS
        SELECT 
            wallet_address,
            SUM(points_change) as total_score,
            COUNT(*) as total_actions,
            MAX(created_at) as last_activity
        FROM reputation_logs
        GROUP BY wallet_address;
    END IF;
END $$;

-- 4. CREATE PIXEL COMMUNITY VIEW
-- This bridges pixel_adoptions (wallet based) and profiles (user based)
CREATE OR REPLACE VIEW pixel_community AS
SELECT 
    pa.id as adoption_id,
    pa.pixel_id,
    pa.buyer_wallet as wallet_address,
    pa.status as adoption_status,
    p.name,
    p.company_name,
    p.entity_type,
    p.role,
    p.company_logo
FROM pixel_adoptions pa
LEFT JOIN profiles p ON pa.buyer_wallet = p.wallet_address
WHERE pa.status = 'active';

-- 5. UPDATE METADATA & COMMENTS FOR $SIGNAL
COMMENT ON TABLE species IS 'Unified catalog of biological assets for the $SIGNAL network';
COMMENT ON COLUMN pixel_adoptions.amount_bot IS 'Amount paid in native/gas tokens ($SIGNAL/Legacy BoT)';

-- 6. INDEXING OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_reputation_logs_wallet ON reputation_logs(wallet_address);
CREATE INDEX IF NOT EXISTS idx_pixel_adoptions_wallet ON pixel_adoptions(buyer_wallet);
CREATE INDEX IF NOT EXISTS idx_species_owner ON species(owner_wallet);

COMMIT;

-- VERIFICATION QUERY
SELECT 'Cleanup Complete' as status;
