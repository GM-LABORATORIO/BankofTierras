-- ============================================
-- REAL IMPACT & ORIGINATOR INTEGRATION
-- ============================================

-- 1. Update Schema for Originators
ALTER TABLE pixels ADD COLUMN IF NOT EXISTS originator_id UUID REFERENCES users(id);
COMMENT ON COLUMN pixels.originator_id IS 'Link the pixel to a specific conservation originator (Project leader/NGO)';

-- 2. Add 'Tangible' Benefit Types to the benefits system
-- Ensure we have a way to categorize these. If not using a type, we just add them to the tier_benefits table.

-- Add Physical and Digital Tangible Benefits
INSERT INTO tier_benefits (tier_level, name, description, benefit_type, is_active)
VALUES 
-- LEVEL 1 (DIAMOND)
(1, 'Aventura Doble en Montaña', 'Pase doble para una expedición de senderismo guiada en la zona protegida.', 'physical', true),
(1, 'Colección NFT Especies Rare', 'Colección exclusiva de NFTs fotográficos de especies captadas en tus píxeles.', 'digital', true),
(1, 'Kit de Productos Locales', 'Envío físico de productos artesanales (Café, miel o artesanías) de la comunidad local.', 'physical', true),

-- LEVEL 2 (GOLD)
(2, 'NFT Especie Guardián', 'NFT fotográfico de una especie endémica de la zona.', 'digital', true),
(2, 'Café de Conservación', 'Bolsa de café premium de origen local producido sosteniblemente.', 'physical', true),

-- LEVEL 3 (SILVER)
(3, 'Certificado NFT de Impacto', 'NFT conmemorativo con los datos de CO2 y biodiversidad protegida.', 'digital', true);

-- 3. Update Existing Pixels (Example: Link some to an originator if known)
-- This is just a placeholder to show the intent.
-- UPDATE pixels SET originator_id = (SELECT id FROM users WHERE role = 'originator' LIMIT 1) WHERE zone_id IN (...);
