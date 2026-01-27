-- ============================================
-- GLOBAL EXPANSION: Mexico & Peru Hotspots
-- ============================================

INSERT INTO regions (country_id, code, name, biome_type, conservation_score, m2_price, description, endemic_species, main_threats, hero_image_url)
VALUES 
-- MEXICO Expansion
(
    (SELECT id FROM countries WHERE code = 'MX'),
    'YUCATAN_REEF',
    'Arrecife Mesoamericano (Yucatán)',
    'coral_reef',
    10,
    350.00,
    'La segunda barrera de coral más grande del mundo, vital para la protección costera y biodiversidad marina.',
    ARRAY['Tortuga Carey', 'Tiburón Ballena', 'Manatí del Caribe'],
    ARRAY['Blanqueamiento de coral', 'Turismo invasivo', 'Contaminación por sargazo'],
    'https://images.unsplash.com/photo-1544551763-47a0159f9234'
),
(
    (SELECT id FROM countries WHERE code = 'MX'),
    'LACANDONA_CHTY',
    'Selva Lacandona',
    'rainforest',
    9,
    300.00,
    'Hogar de la mayor cantidad de especies de aves y jaguares en México, corazón del mundo maya.',
    ARRAY['Jaguar', 'Guacamaya Roja', 'Tapir'],
    ARRAY['Tala ilegal', 'Tráfico de especies', 'Fragmentación de hábitat'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),

-- PERU Expansion
(
    (SELECT id FROM countries WHERE code = 'PE'),
    'TAMBOPATA_AMZ',
    'Reserva Nacional Tambopata',
    'rainforest',
    10,
    340.00,
    'Uno de los ecosistemas más prístinos del Amazonas, famoso por sus colpas de guacamayos y lobos de río.',
    ARRAY['Lobo de Río', 'Guacamayo Cabezón', 'Jaguar'],
    ARRAY['Minería de oro ilegal', 'Tala selectiva'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),
(
    (SELECT id FROM countries WHERE code = 'PE'),
    'MACHU_PICCHU_CLOUD',
    'Santuario Histórico Machu Picchu',
    'mountain',
    9,
    320.00,
    'Bosques de neblina que rodean la ciudadela inca, hogar de una flora y fauna única de altura.',
    ARRAY['Oso de Anteojos', 'Gallito de las Rocas', 'Orquídeas endémicas'],
    ARRAY['Incendios forestales', 'Erosión de suelos'],
    'https://images.unsplash.com/photo-1526392060635-9d6019884377'
)
ON CONFLICT (code) DO UPDATE SET
    m2_price = EXCLUDED.m2_price,
    conservation_score = EXCLUDED.conservation_score,
    description = EXCLUDED.description,
    endemic_species = EXCLUDED.endemic_species,
    main_threats = EXCLUDED.main_threats;
