-- ========================================
-- TIER BENEFITS MANAGEMENT SYSTEM
-- ========================================
-- Tabla para gestionar beneficios exclusivos por tier
-- Permite al admin crear experiencias físicas, digitales y regalos

CREATE TABLE IF NOT EXISTS tier_benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tier_level INTEGER NOT NULL CHECK (tier_level BETWEEN 1 AND 4),
    tier_name TEXT NOT NULL CHECK (tier_name IN ('EPIC', 'RARE', 'COMMON', 'BASIC')),
    benefit_name TEXT NOT NULL,
    benefit_type TEXT NOT NULL CHECK (benefit_type IN ('physical', 'digital', 'experience')),
    description TEXT,
    icon_url TEXT,
    stock INTEGER DEFAULT -1, -- -1 = ilimitado
    requires_shipping BOOLEAN DEFAULT false,
    shipping_regions TEXT[], -- Array de códigos de país: ['CO', 'US', 'MX']
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_tier_benefits_tier_level ON tier_benefits(tier_level);
CREATE INDEX IF NOT EXISTS idx_tier_benefits_active ON tier_benefits(active);
CREATE INDEX IF NOT EXISTS idx_tier_benefits_type ON tier_benefits(benefit_type);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_tier_benefits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tier_benefits_updated_at
    BEFORE UPDATE ON tier_benefits
    FOR EACH ROW
    EXECUTE FUNCTION update_tier_benefits_updated_at();

-- ========================================
-- DATOS DE EJEMPLO (Beneficios Iniciales)
-- ========================================

INSERT INTO tier_benefits (tier_level, tier_name, benefit_name, benefit_type, description, requires_shipping, shipping_regions) VALUES
-- EPIC TIER (Tier 1)
(1, 'EPIC', 'Viaje Guiado al Amazonas', 'experience', 'Expedición de 7 días con biólogos expertos. Incluye alojamiento, alimentación y transporte.', false, ARRAY['CO', 'US', 'MX', 'ES', 'BR']),
(1, 'EPIC', 'Certificado Físico Enmarcado', 'physical', 'Certificado de conservación impreso en papel ecológico con marco de madera certificada FSC.', true, ARRAY['CO', 'US', 'MX', 'ES', 'BR']),
(1, 'EPIC', 'NFT Genético Único', 'digital', 'NFT exclusivo con datos genéticos de una especie protegida en tu zona adoptada.', false, NULL),
(1, 'EPIC', 'Acceso Live-Cam 24/7', 'digital', 'Acceso ilimitado a cámaras en vivo instaladas en tu zona protegida.', false, NULL),
(1, 'EPIC', 'Merchandising Premium', 'physical', 'Kit exclusivo: camiseta, gorra, botella térmica y mochila con logo BoT.', true, ARRAY['CO', 'US', 'MX', 'ES', 'BR']),

-- RARE TIER (Tier 2)
(2, 'RARE', 'Kit de Semillas Nativas', 'physical', 'Colección de 10 especies de semillas nativas de tu bioma adoptado con guía de cultivo.', true, ARRAY['CO', 'US', 'MX', 'ES', 'BR']),
(2, 'RARE', 'Camiseta Exclusiva BoT', 'physical', 'Camiseta de algodón orgánico con diseño exclusivo del bioma que adoptaste.', true, ARRAY['CO', 'US', 'MX', 'ES', 'BR']),
(2, 'RARE', 'Webinar con Biólogos', 'experience', 'Sesión mensual en vivo con científicos trabajando en tu zona protegida.', false, NULL),
(2, 'RARE', 'Reporte de Impacto Trimestral', 'digital', 'Informe detallado con fotos y datos del progreso de conservación en tu zona.', false, NULL),

-- COMMON TIER (Tier 3)
(3, 'COMMON', 'Stickers Coleccionables', 'physical', 'Set de 5 stickers con especies endémicas de tu bioma.', true, ARRAY['CO', 'US', 'MX', 'ES', 'BR']),
(3, 'COMMON', 'Wallpapers Digitales', 'digital', 'Pack de 10 wallpapers HD de tu zona protegida para móvil y desktop.', false, NULL),
(3, 'COMMON', 'Newsletter Mensual', 'digital', 'Boletín exclusivo con noticias de conservación y actualizaciones del proyecto.', false, NULL),
(3, 'COMMON', 'Acceso a Comunidad Discord', 'digital', 'Canal privado en Discord para holders de COMMON tier o superior.', false, NULL),

-- BASIC TIER (Tier 4)
(4, 'BASIC', 'Certificado Digital', 'digital', 'Certificado de adopción descargable en PDF con código QR verificable.', false, NULL),
(4, 'BASIC', 'Acceso a Comunidad Pública', 'digital', 'Acceso al canal general de Discord de Bank of Tierras.', false, NULL),
(4, 'BASIC', 'Badge de Perfil', 'digital', 'Insignia digital para mostrar en tu perfil de BoT.', false, NULL);

-- Verificación
SELECT tier_name, benefit_name, benefit_type, requires_shipping 
FROM tier_benefits 
ORDER BY tier_level ASC, benefit_type DESC;
