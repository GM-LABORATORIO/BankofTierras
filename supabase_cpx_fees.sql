-- ============================================
-- CPX: Legal Fees & Commission Management
-- ============================================

-- Add commission_fee column to projects table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'commission_fee'
    ) THEN
        ALTER TABLE projects ADD COLUMN commission_fee DECIMAL DEFAULT 10;
        COMMENT ON COLUMN projects.commission_fee IS 'Porcentaje de comisión acordado con el originador (0-100)';
    END IF;
END $$;

-- Update existing projects with a default fee for the demo
UPDATE projects SET commission_fee = 12 WHERE name LIKE '%Amazonas%';
UPDATE projects SET commission_fee = 8 WHERE name LIKE '%Pacific%';
