-- ============================================
-- 🎁 BENEFITS & EXPERIENCES SYSTEM
-- ============================================

-- Clean up existing tables to avoid schema conflicts
DROP TABLE IF EXISTS experience_bookings CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS tier_benefits CASCADE;
DROP TABLE IF EXISTS benefits CASCADE;

-- Catalog of potential benefits
CREATE TABLE benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- 'CARBON_CERTIFICATE', 'VIP_WEBINAR'
    name TEXT NOT NULL,
    description TEXT,
    benefit_type TEXT CHECK (benefit_type IN ('digital', 'physical', 'experience', 'financial')),
    icon_emoji TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Mapping benefits to Tiers (1=Bronze, 2=Silver, 3=Gold, 4=Platinum)
CREATE TABLE tier_benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tier_level INTEGER CHECK (tier_level BETWEEN 1 AND 4),
    benefit_id UUID REFERENCES benefits(id) ON DELETE CASCADE,
    ownership_type TEXT CHECK (ownership_type IN ('adoption', 'purchase', 'both')) DEFAULT 'both',
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tier_level, benefit_id, ownership_type)
);

-- Catalog of experiences (Trips, Webinars, Live Cams)
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    experience_type TEXT CHECK (experience_type IN ('trip', 'webinar', 'live_cam', 'workshop', 'tour')),
    biome_key TEXT, -- NULL = available for all biomes
    region_id UUID REFERENCES regions(id) ON DELETE SET NULL,
    
    -- Availability
    min_tier INTEGER CHECK (min_tier BETWEEN 1 AND 4),
    requires_ownership BOOLEAN DEFAULT FALSE,
    max_participants INTEGER,
    
    -- Pricing
    price_usd DECIMAL(10,2),
    included_in_tier BOOLEAN DEFAULT FALSE,
    
    -- Booking/Access
    booking_url TEXT,
    image_url TEXT,
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Seed initial benefits
INSERT INTO benefits (code, name, description, benefit_type, icon_emoji) VALUES
('CARBON_CERTIFICATE', 'Certificado de Carbono', 'Certificado digital de compensación verificado', 'digital', '📜'),
('MONTHLY_REPORT', 'Reporte de Impacto', 'Seguimiento mensual del progreso de conservación', 'digital', '📊'),
('LIVE_CAM_ACCESS', 'Acceso a Cámaras', 'Transmisión 24/7 desde la selva en vivo', 'experience', '📹'),
('WELCOME_KIT', 'Kit de Bienvenida', 'Paquete físico con certificado y merchandising', 'physical', '📦'),
('VIP_EXPEDITION', 'Expedición VIP', 'Viaje anual con todo incluido a la región', 'experience', '🏕️'),
('CARBON_REVENUE', 'Revenue Share', 'Participación en la venta de créditos de carbono', 'financial', '💰')
ON CONFLICT (code) DO NOTHING;

-- Map benefits to Tiers
-- Tier 1: Certificate
-- Tier 2: + Reports
-- Tier 3: + Live Cams
-- Tier 4: + All

DO $$ 
DECLARE 
    cert_id UUID;
    rep_id UUID;
    cam_id UUID;
    kit_id UUID;
    vip_id UUID;
    rev_id UUID;
BEGIN
    SELECT id INTO cert_id FROM benefits WHERE code = 'CARBON_CERTIFICATE';
    SELECT id INTO rep_id FROM benefits WHERE code = 'MONTHLY_REPORT';
    SELECT id INTO cam_id FROM benefits WHERE code = 'LIVE_CAM_ACCESS';
    SELECT id INTO kit_id FROM benefits WHERE code = 'WELCOME_KIT';
    SELECT id INTO vip_id FROM benefits WHERE code = 'VIP_EXPEDITION';
    SELECT id INTO rev_id FROM benefits WHERE code = 'CARBON_REVENUE';

    -- Tier 1 (Bronze)
    INSERT INTO tier_benefits (tier_level, benefit_id) VALUES (1, cert_id) ON CONFLICT DO NOTHING;
    
    -- Tier 2 (Silver)
    INSERT INTO tier_benefits (tier_level, benefit_id) VALUES (2, cert_id), (2, rep_id) ON CONFLICT DO NOTHING;
    
    -- Tier 3 (Gold)
    INSERT INTO tier_benefits (tier_level, benefit_id) VALUES (3, cert_id), (3, rep_id), (3, cam_id), (3, kit_id) ON CONFLICT DO NOTHING;
    
    -- Tier 4 (Platinum)
    INSERT INTO tier_benefits (tier_level, benefit_id) VALUES (4, cert_id), (4, rep_id), (4, cam_id), (4, kit_id), (4, vip_id), (4, rev_id) ON CONFLICT DO NOTHING;
END $$;
