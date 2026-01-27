-- ============================================
-- TABLA: premium_experiences
-- Descripción: Experiencias premium asociadas a biomas
-- (Viajes, webinars, live-cams, merchandising)
-- ============================================

-- Crear tabla principal
CREATE TABLE IF NOT EXISTS premium_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    biome_key TEXT NOT NULL, -- Ej: 'COLOMBIA_AMAZON', 'GALAPAGOS'
    experience_type TEXT NOT NULL CHECK (experience_type IN ('trip', 'webinar', 'livecam', 'merch')),
    title TEXT NOT NULL,
    description TEXT,
    duration_days INTEGER, -- Para viajes (ej: 7 días)
    max_participants INTEGER, -- Cupo máximo
    current_participants INTEGER DEFAULT 0,
    partner_name TEXT, -- Nombre del operador/sponsor
    partner_logo_url TEXT,
    partner_website TEXT,
    booking_url TEXT,
    price_usd DECIMAL(10,2), -- Precio adicional (si no está incluido)
    price_included BOOLEAN DEFAULT false, -- Si está incluido en el precio del píxel
    requires_tier INTEGER CHECK (requires_tier BETWEEN 1 AND 4), -- 1=EPIC, 2=RARE, 3=COMMON, 4=BASIC
    available_dates JSONB, -- Array de fechas: [{"date": "2026-03-15", "available": true}]
    highlights JSONB, -- Array de highlights: ["Guía experto", "Hospedaje incluido"]
    images JSONB, -- Array de URLs de imágenes
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false, -- Para destacar en homepage
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_experiences_biome ON premium_experiences(biome_key);
CREATE INDEX idx_experiences_tier ON premium_experiences(requires_tier);
CREATE INDEX idx_experiences_type ON premium_experiences(experience_type);
CREATE INDEX idx_experiences_active ON premium_experiences(active);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON premium_experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Experiencia EPIC: Viaje al Amazonas
INSERT INTO premium_experiences (
    biome_key, experience_type, title, description, duration_days, max_participants,
    partner_name, partner_logo_url, partner_website, booking_url,
    price_usd, price_included, requires_tier, available_dates, highlights, images, featured
) VALUES (
    'COLOMBIA_AMAZON',
    'trip',
    'Expedición Amazónica de 7 Días',
    'Sumérgete en el corazón de la selva amazónica colombiana con biólogos expertos. Incluye hospedaje en eco-lodge, todas las comidas, transporte fluvial, y actividades de conservación.',
    7,
    12,
    'Amazon Expeditions Colombia',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=200',
    'https://amazonexpeditions.co',
    'https://amazonexpeditions.co/book',
    0, -- Incluido en el precio del píxel
    true,
    1, -- EPIC tier
    '[
        {"date": "2026-03-15", "available": true, "spots_left": 8},
        {"date": "2026-06-20", "available": true, "spots_left": 12},
        {"date": "2026-09-10", "available": true, "spots_left": 10}
    ]'::jsonb,
    '["Guía biólogo certificado", "Hospedaje en eco-lodge", "Todas las comidas incluidas", "Transporte fluvial", "Actividades de reforestación", "Avistamiento de delfines rosados"]'::jsonb,
    '["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800", "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800"]'::jsonb,
    true
);

-- Experiencia EPIC: Viaje a Galápagos
INSERT INTO premium_experiences (
    biome_key, experience_type, title, description, duration_days, max_participants,
    partner_name, booking_url, price_usd, price_included, requires_tier,
    available_dates, highlights, images, featured
) VALUES (
    'GALAPAGOS',
    'trip',
    'Conservación en Galápagos - 10 Días',
    'Participa en proyectos de conservación de tortugas gigantes e iguanas marinas. Incluye crucero inter-islas, snorkel, y sesiones con biólogos de la Fundación Charles Darwin.',
    10,
    8,
    'Galápagos Conservancy',
    'https://galapagos.org/expeditions',
    0,
    true,
    1,
    '[
        {"date": "2026-04-01", "available": true, "spots_left": 5},
        {"date": "2026-07-15", "available": true, "spots_left": 8},
        {"date": "2026-10-20", "available": true, "spots_left": 6}
    ]'::jsonb,
    '["Crucero inter-islas", "Snorkel con tortugas", "Proyecto de conservación", "Certificado de participación", "Encuentro con biólogos"]'::jsonb,
    '["https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800"]'::jsonb,
    true
);

-- Experiencia RARE: Webinar Mensual
INSERT INTO premium_experiences (
    biome_key, experience_type, title, description, duration_days, max_participants,
    partner_name, booking_url, price_usd, price_included, requires_tier,
    available_dates, highlights, active
) VALUES (
    'COLOMBIA_ANDES',
    'webinar',
    'Webinar: Conservación de Páramos',
    'Sesión mensual con expertos en ecosistemas de páramo. Aprende sobre frailejones, osos de anteojos, y la importancia de estos ecosistemas como fábricas de agua.',
    NULL,
    100,
    'Dr. Carlos Pérez - Universidad de los Andes',
    'https://zoom.us/webinar/register',
    0,
    true,
    2, -- RARE tier
    '[
        {"date": "2026-02-15", "time": "18:00 COT", "available": true},
        {"date": "2026-03-15", "time": "18:00 COT", "available": true},
        {"date": "2026-04-15", "time": "18:00 COT", "available": true}
    ]'::jsonb,
    '["Sesión en vivo", "Q&A con expertos", "Certificado de asistencia", "Acceso a grabación"]'::jsonb,
    true
);

-- Experiencia COMMON: Live-Cam Premium
INSERT INTO premium_experiences (
    biome_key, experience_type, title, description, duration_days, max_participants,
    partner_name, booking_url, price_usd, price_included, requires_tier,
    highlights, active
) VALUES (
    'SERENGETI',
    'livecam',
    'Live-Cam Premium: Gran Migración',
    'Acceso 24/7 a cámaras en vivo del Serengeti. Control PTZ en horarios específicos. Alertas de avistamientos de leones, elefantes y la gran migración de ñus.',
    NULL,
    NULL,
    'Serengeti Live',
    'https://serengetilive.com',
    0,
    true,
    3, -- COMMON tier
    '["Acceso 24/7", "Control PTZ", "Alertas de avistamientos", "Descarga de clips", "Sin publicidad"]'::jsonb,
    true
);

-- Experiencia BASIC: Merchandising
INSERT INTO premium_experiences (
    biome_key, experience_type, title, description, duration_days, max_participants,
    partner_name, price_usd, price_included, requires_tier,
    highlights, active
) VALUES (
    'COLOMBIA_CARIBBEAN',
    'merch',
    'Kit de Bienvenida Caribe',
    'Recibe un kit con stickers de especies del Caribe colombiano, wallpapers digitales 4K, y acceso a la comunidad Discord.',
    NULL,
    NULL,
    'Bank of Tierras',
    0,
    true,
    4, -- BASIC tier
    '["Stickers exclusivos", "Wallpapers 4K", "Acceso a Discord", "Newsletter mensual"]'::jsonb,
    true
);

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE premium_experiences IS 'Experiencias premium asociadas a biomas (viajes, webinars, live-cams, merchandising)';
COMMENT ON COLUMN premium_experiences.biome_key IS 'Clave del bioma (ej: COLOMBIA_AMAZON)';
COMMENT ON COLUMN premium_experiences.experience_type IS 'Tipo: trip, webinar, livecam, merch';
COMMENT ON COLUMN premium_experiences.requires_tier IS '1=EPIC, 2=RARE, 3=COMMON, 4=BASIC';
COMMENT ON COLUMN premium_experiences.price_included IS 'Si está incluido en el precio del píxel';
COMMENT ON COLUMN premium_experiences.available_dates IS 'Array JSON de fechas disponibles';
