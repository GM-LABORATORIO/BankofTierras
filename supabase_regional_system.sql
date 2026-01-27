-- ============================================
-- REGIONAL DATA SYSTEM
-- Scalable hierarchy: Country → Region → Zone → Pixel
-- ============================================

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- 'CO', 'EC', 'BR', 'PE', 'MX'
    name TEXT NOT NULL,
    flag_emoji TEXT,
    description TEXT,
    official_language TEXT,
    currency TEXT,
    conservation_agency TEXT, -- Official government agency
    agency_website TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Regions table (States, Departments, Provinces)
CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL, -- 'AMAZONAS', 'GALAPAGOS', 'ACRE'
    name TEXT NOT NULL,
    biome_type TEXT CHECK (biome_type IN ('rainforest', 'marine', 'mountain', 'desert', 'wetland', 'savanna', 'tundra', 'temperate_forest', 'grassland', 'coral_reef', 'mangrove')),
    
    -- Geographic data
    center_lat DECIMAL(10, 7),
    center_lng DECIMAL(10, 7),
    boundary_polygon JSONB, -- GeoJSON polygon
    area_km2 DECIMAL(12, 2),
    
    -- Educational Content
    description TEXT,
    fun_facts TEXT[],
    endemic_species TEXT[],
    conservation_status TEXT,
    main_threats TEXT[],
    success_stories TEXT[],
    
    -- Media
    hero_image_url TEXT,
    gallery_urls TEXT[],
    video_url TEXT,
    live_cam_url TEXT,
    
    -- Real Data Sources
    data_sources JSONB, -- {"nasa": "...", "inpe": "...", "ideam": "..."}
    last_data_update TIMESTAMP,
    
    -- SEO & Discovery
    keywords TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Zones within regions (specific conservation areas/projects)
CREATE TABLE IF NOT EXISTS zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    zone_type TEXT CHECK (zone_type IN ('protected_area', 'reforestation', 'monitoring', 'research', 'community')),
    
    -- Geographic data
    center_lat DECIMAL(10, 7),
    center_lng DECIMAL(10, 7),
    boundary_polygon JSONB,
    area_m2 DECIMAL(15, 2),
    
    -- Project information
    project_name TEXT,
    project_description TEXT,
    project_start_date DATE,
    project_status TEXT CHECK (project_status IN ('planning', 'active', 'completed', 'paused')),
    project_partners TEXT[], -- NGOs, companies, communities
    
    -- Impact data (inherited by all pixels in this zone)
    co2_captured_kg DECIMAL(12,2) DEFAULT 0,
    trees_planted INTEGER DEFAULT 0,
    area_protected_m2 DECIMAL(12,2) DEFAULT 0,
    funds_raised_usd DECIMAL(10,2) DEFAULT 0,
    species_monitored INTEGER DEFAULT 0,
    
    -- Health metrics
    current_health INTEGER CHECK (current_health >= 0 AND current_health <= 100),
    health_history JSONB, -- [{"date": "2024-01-01", "health": 75}]
    
    -- Activities
    conservation_activities JSONB, -- [{"date": "...", "type": "...", "description": "..."}]
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Update pixel_impact table to link with zones
ALTER TABLE pixel_impact 
    ADD COLUMN IF NOT EXISTS zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS featured_story TEXT,
    ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_regions_country ON regions(country_id);
CREATE INDEX IF NOT EXISTS idx_regions_biome ON regions(biome_type);
CREATE INDEX IF NOT EXISTS idx_regions_featured ON regions(is_featured);
CREATE INDEX IF NOT EXISTS idx_zones_region ON zones(region_id);
CREATE INDEX IF NOT EXISTS idx_zones_type ON zones(zone_type);
CREATE INDEX IF NOT EXISTS idx_pixel_impact_zone ON pixel_impact(zone_id);
CREATE INDEX IF NOT EXISTS idx_pixel_impact_featured ON pixel_impact(is_featured);

-- ============================================
-- SEED DATA: Initial Countries
-- ============================================

INSERT INTO countries (code, name, flag_emoji, description, official_language, currency, conservation_agency, agency_website) VALUES
('CO', 'Colombia', '🇨🇴', 'País megadiverso con el segundo mayor número de especies en el mundo', 'Español', 'COP', 'IDEAM', 'http://www.ideam.gov.co'),
('EC', 'Ecuador', '🇪🇨', 'Hogar de las Islas Galápagos y parte del Amazonas', 'Español', 'USD', 'Ministerio del Ambiente', 'https://www.ambiente.gob.ec'),
('BR', 'Brasil', '🇧🇷', 'Contiene el 60% de la selva amazónica', 'Português', 'BRL', 'INPE', 'http://www.inpe.br'),
('PE', 'Perú', '🇵🇪', 'Segundo país con mayor extensión de Amazonas', 'Español', 'PEN', 'MINAM', 'https://www.gob.pe/minam'),
('MX', 'México', '🇲🇽', 'Uno de los 17 países megadiversos del mundo', 'Español', 'MXN', 'SEMARNAT', 'https://www.gob.mx/semarnat')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- EXAMPLE: Colombia Regions
-- ============================================

INSERT INTO regions (
    country_id,
    code,
    name,
    biome_type,
    center_lat,
    center_lng,
    description,
    fun_facts,
    endemic_species,
    conservation_status,
    main_threats,
    hero_image_url,
    data_sources
) VALUES (
    (SELECT id FROM countries WHERE code = 'CO'),
    'AMAZONAS',
    'Amazonas Colombiano',
    'rainforest',
    -1.5,
    -71.5,
    'La región amazónica de Colombia representa el 42% del territorio nacional y alberga una biodiversidad única. Es hogar de comunidades indígenas ancestrales y especies endémicas.',
    ARRAY[
        'Hogar de más de 300 especies de aves',
        'Contiene el 10% de la biodiversidad mundial',
        'Territorio ancestral de 52 pueblos indígenas',
        'Produce el 20% del oxígeno del planeta'
    ],
    ARRAY['Delfín rosado', 'Jaguar', 'Anaconda verde', 'Guacamayo azul', 'Mono tití'],
    'Vulnerable - Deforestación activa',
    ARRAY['Deforestación', 'Minería ilegal', 'Cultivos ilícitos', 'Cambio climático'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
    '{"nasa": "https://earthdata.nasa.gov/", "ideam": "http://www.ideam.gov.co/"}'::jsonb
),
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'ANDES',
    'Andes Colombianos',
    'mountain',
    4.5,
    -74.0,
    'Los Andes colombianos son un hotspot de biodiversidad con ecosistemas de páramo únicos en el mundo.',
    ARRAY[
        'Hogar del 50% de las especies de aves de Colombia',
        'Los páramos almacenan y regulan el 70% del agua del país',
        'Ecosistema único que solo existe en los Andes tropicales'
    ],
    ARRAY['Oso de anteojos', 'Cóndor andino', 'Frailejón', 'Puma andino'],
    'En peligro - Expansión agrícola',
    ARRAY['Agricultura intensiva', 'Ganadería', 'Cambio climático', 'Urbanización'],
    'https://images.unsplash.com/photo-1589802829985-817e51171b92',
    '{"ideam": "http://www.ideam.gov.co/"}'::jsonb
)
ON CONFLICT DO NOTHING;

-- ============================================
-- EXAMPLE: Ecuador Regions
-- ============================================

INSERT INTO regions (
    country_id,
    code,
    name,
    biome_type,
    center_lat,
    center_lng,
    description,
    fun_facts,
    endemic_species,
    conservation_status,
    hero_image_url
) VALUES (
    (SELECT id FROM countries WHERE code = 'EC'),
    'GALAPAGOS',
    'Islas Galápagos',
    'marine',
    -0.75,
    -90.5,
    'Archipiélago volcánico único que inspiró la teoría de la evolución de Darwin. Patrimonio de la Humanidad.',
    ARRAY[
        'El 97% del territorio es Parque Nacional',
        'Hogar de especies que no existen en ningún otro lugar',
        'Inspiró la teoría de la evolución de Charles Darwin',
        'Uno de los ecosistemas marinos más diversos del planeta'
    ],
    ARRAY['Tortuga gigante', 'Iguana marina', 'Pingüino de Galápagos', 'Cormorán no volador'],
    'Protegido - Parque Nacional',
    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44'
)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE countries IS 'Countries with conservation regions in Bank of Tierras';
COMMENT ON TABLE regions IS 'Geographic regions with unique biodiversity and conservation projects';
COMMENT ON TABLE zones IS 'Specific conservation zones/projects within regions';
COMMENT ON TABLE pixel_impact IS 'Impact data for individual pixels (featured or special pixels only)';
