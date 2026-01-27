-- ============================================
-- FIX: Create missing 'pixels' table
-- ============================================

-- A. Create the core pixels table
CREATE TABLE IF NOT EXISTS pixels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_id TEXT UNIQUE NOT NULL, -- Ej: "CELL-72-45"
    zone_id UUID REFERENCES zones(id) ON DELETE CASCADE,
    originator_id UUID REFERENCES auth.users(id),
    coords_x INTEGER NOT NULL,
    coords_y INTEGER NOT NULL,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'adopted', 'protected')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- B. Create index for performance
CREATE INDEX IF NOT EXISTS idx_pixels_zone ON pixels(zone_id);
CREATE INDEX IF NOT EXISTS idx_pixels_originator ON pixels(originator_id);
CREATE INDEX IF NOT EXISTS idx_pixels_custom ON pixels(custom_id);

-- C. Apply Real Impact Integrated Columns (if table was just created, columns are already there or need update)
-- This matches the logic from supabase_real_impact.sql

COMMENT ON TABLE pixels IS 'Registry of individual 1x1m2 land units (pixels)';
COMMENT ON COLUMN pixels.originator_id IS 'Link the pixel to a specific conservation originator (Project leader/NGO)';

-- D. Trigger for updated_at
CREATE TRIGGER update_pixels_updated_at
    BEFORE UPDATE ON pixels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
