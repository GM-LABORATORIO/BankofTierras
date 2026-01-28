-- ============================================
-- PROJECT STRUCTURE EVOLUTION: QUOTAS & STEWARDSHIP
-- ============================================

DO $$ 
BEGIN
    -- 1. Add carbon_quota (Percentage or absolute area for carbon market)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'carbon_quota'
    ) THEN
        ALTER TABLE projects ADD COLUMN carbon_quota DECIMAL DEFAULT 0;
    END IF;

    -- 2. Add m2_quota (Percentage or absolute area for Life Map / M2 adoption)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'm2_quota'
    ) THEN
        ALTER TABLE projects ADD COLUMN m2_quota DECIMAL DEFAULT 0;
    END IF;

    -- 3. Add steward_wallet (Explicitly for the Originator/Technician responsible)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'steward_wallet'
    ) THEN
        ALTER TABLE projects ADD COLUMN steward_wallet TEXT;
    END IF;
    
    -- 4. Ensure owner_wallet is current platform or empty for initialization
    -- (The UI will handle setting this to the platform wallet initially)
END $$;

-- 5. Link Zones to project ownership/stewardship more clearly
ALTER TABLE zones ADD COLUMN IF NOT EXISTS steward_wallet TEXT;

-- 6. Add policy for stewards to update their zones/pixels
-- (This requires RLS to be enabled)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pixel_impact ENABLE ROW LEVEL SECURITY;

-- Policy: Stewards can update impact for their projects
DROP POLICY IF EXISTS steward_update_impact ON pixel_impact;
CREATE POLICY steward_update_impact ON pixel_impact
    FOR ALL
    USING (
        pixel_id IN (
            SELECT p.custom_id 
            FROM pixels p
            JOIN zones z ON p.zone_id = z.id
            JOIN projects pr ON z.id = pr.id -- This assumes zone_id links to project or similar
            WHERE pr.steward_wallet = auth.uid()::text -- Simplified, needs real wallet link
        )
    );

COMMENT ON COLUMN projects.carbon_quota IS 'Area or percentage dedicated to Carbon Credits (Corporations)';
COMMENT ON COLUMN projects.m2_quota IS 'Area or percentage dedicated to Life Map Adoption (Individuals)';
COMMENT ON COLUMN projects.steward_wallet IS 'Originator wallet responsible for data reporting and conservation';
