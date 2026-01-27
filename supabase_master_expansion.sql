-- ============================================
-- 🚀 MASTER ECOSYSTEM EXPANSION (FIXED & EXPANDED)
-- ============================================

-- STEP 1: Fix Constraints to allow new Biome Types
ALTER TABLE regions DROP CONSTRAINT IF EXISTS regions_biome_type_check;
ALTER TABLE regions ADD CONSTRAINT regions_biome_type_check 
    CHECK (biome_type IN ('rainforest', 'marine', 'mountain', 'desert', 'wetland', 'savanna', 'tundra', 'temperate_forest', 'grassland', 'coral_reef', 'mangrove'));

-- STEP 2: Unified Hotspot Population
INSERT INTO regions (country_id, code, name, biome_type, conservation_score, m2_price, description, endemic_species, main_threats, hero_image_url)
VALUES 

-- MEXICO
(
    (SELECT id FROM countries WHERE code = 'MX'),
    'YUCATAN_REEF', 'Arrecife Mesoamericano', 'coral_reef', 10, 350.00,
    'La segunda barrera de coral más grande del mundo, vital para la protección costera.',
    ARRAY['Tortuga Carey', 'Tiburón Ballena'], ARRAY['Blanqueamiento', 'Sargazo'],
    'https://images.unsplash.com/photo-1544551763-47a0159f9234'
),
(
    (SELECT id FROM countries WHERE code = 'MX'),
    'LACANDONA_CHTY', 'Selva Lacandona', 'rainforest', 9, 300.00,
    'Corazón del mundo maya, hogar de la mayor biodiversidad terrestre en México.',
    ARRAY['Jaguar', 'Guacamaya Roja'], ARRAY['Tala ilegal', 'Tráfico'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),

-- PERU
(
    (SELECT id FROM countries WHERE code = 'PE'),
    'TAMBOPATA_AMZ', 'Tambopata Amazonía', 'rainforest', 10, 340.00,
    'Ecosistema prístino famoso por sus colpas de guacamayos y lobos de río.',
    ARRAY['Lobo de Río', 'Guacamayo Cabezón'], ARRAY['Minería ilegal', 'Tala'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),
(
    (SELECT id FROM countries WHERE code = 'PE'),
    'MACHU_PICCHU_CLOUD', 'Machu Picchu Cloud Forest', 'mountain', 9, 320.00,
    'Bosques de neblina que albergan al oso de anteojos y orquídeas únicas.',
    ARRAY['Oso de Anteojos', 'Gallito de las Rocas'], ARRAY['Incendios', 'Erosión'],
    'https://images.unsplash.com/photo-1526392060635-9d6019884377'
),

-- CHILE (Expanding Variety)
(
    (SELECT id FROM countries WHERE code = 'CL'),
    'ATACAMA_DESERT', 'Desierto de Atacama', 'desert', 7, 210.00,
    'El desierto más árido del mundo, con cielos prístinos y vida microscópica única.',
    ARRAY['Flamenco Andino', 'Zorro Culpeo'], ARRAY['Minería de Litio', 'Turismo'],
    'https://images.unsplash.com/photo-1447073280036-7c0a96979603'
),
(
    (SELECT id FROM countries WHERE code = 'CL'),
    'TORRES_PAINE', 'Torres del Paine (Patagonia)', 'mountain', 10, 360.00,
    'Icono de la conservación mundial con glaciares y montañas de granito.',
    ARRAY['Puma Chileno', 'Huemul', 'Cóndor'], ARRAY['Cambio Climático', 'Incendios'],
    'https://images.unsplash.com/photo-1517330357046-3ab5b5dd42a1'
),

-- COLOMBIA (More regions)
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'PACIFICO_CHOCO', 'Selva del Chocó', 'rainforest', 10, 350.00,
    'Una de las zonas más lluviosas y biodiversas del planeta, rica en endemismos.',
    ARRAY['Rana Dorada Mono', 'Ballenas Jorobadas'], ARRAY['Minería', 'Tala ilegal'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'CAÑO_CRISTALES', 'Serranía de la Macarena', 'wetland', 9, 330.00,
    'Lugar del "río de los siete colores" y punto de encuentro de tres ecosistemas.',
    ARRAY['Macarenia Clavigera', 'Tonina'], ARRAY['Deforestación', 'Turismo masivo'],
    'https://images.unsplash.com/photo-1589802829985-817e51171b92'
),

-- USA (Sustainability hotspots)
(
    (SELECT id FROM countries WHERE code = 'US'),
    'YELLOWSTONE_VOLC', 'Parque Nacional Yellowstone', 'mountain', 10, 380.00,
    'Ecosistema geotérmico único y santuario vital para la megafauna de Norteamérica.',
    ARRAY['Lobo Gris', 'Oso Grizzly', 'Bisonte'], ARRAY['Tráfico vehicular', 'Invasoras'],
    'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3'
),
(
    (SELECT id FROM countries WHERE code = 'US'),
    'EVERGLADES_MANG', 'Everglades (Manglares)', 'mangrove', 9, 290.00,
    'Humedal subtropical más grande de Norteamérica y barrera vital contra huracanes.',
    ARRAY['Manatí de Florida', 'Pantera de Florida'], ARRAY['Niveles de agua', 'Especies exóticas'],
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470'
)

ON CONFLICT (code) DO UPDATE SET
    m2_price = EXCLUDED.m2_price,
    conservation_score = EXCLUDED.conservation_score,
    description = EXCLUDED.description,
    endemic_species = EXCLUDED.endemic_species,
    main_threats = EXCLUDED.main_threats;
