-- ============================================
-- CIRCULAR ECONOMY: IMPACT TABLE EVOLUTION
-- ============================================

DO $$ 
BEGIN
    -- 1. Add experiences (JSONB array for Trips, Webinars, etc.)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pixel_impact' AND column_name = 'experiences'
    ) THEN
        ALTER TABLE pixel_impact ADD COLUMN experiences JSONB DEFAULT '[]';
    END IF;

    -- 2. Add products (JSONB array for Local Products)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pixel_impact' AND column_name = 'products'
    ) THEN
        ALTER TABLE pixel_impact ADD COLUMN products JSONB DEFAULT '[]';
    END IF;

    -- 3. Add stream_url (Text for Live Cam or Transmissions)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'pixel_impact' AND column_name = 'stream_url'
    ) THEN
        ALTER TABLE pixel_impact ADD COLUMN stream_url TEXT;
    END IF;

END $$;

COMMENT ON COLUMN pixel_impact.experiences IS 'Array of experiences/tourism offered by the steward';
COMMENT ON COLUMN pixel_impact.products IS 'Array of local products linked to the conservation area';
COMMENT ON COLUMN pixel_impact.stream_url IS 'URL for live cams or real-time transmissions';
