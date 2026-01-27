-- ============================================
-- Ecosystem Strengthening & Pricing Strategy V2 (FIXED)
-- ============================================

-- 1. Update Schema
ALTER TABLE regions ADD COLUMN IF NOT EXISTS conservation_score INTEGER DEFAULT 5;
ALTER TABLE regions ADD COLUMN IF NOT EXISTS m2_price NUMERIC(10, 2) DEFAULT 100;

-- 2. Populate New & Existing Regions (Strengthening variety)
INSERT INTO regions (country_id, code, name, biome_type, conservation_score, m2_price, description, endemic_species, main_threats, hero_image_url)
VALUES 
-- BRASIL Expansion
(
    (SELECT id FROM countries WHERE code = 'BR'),
    'PANTANAL_SUL',
    'Pantanal Sul',
    'wetland',
    9,
    310.00,
    'El humedal más grande del mundo, famoso por su densidad de jaguares y vida silvestre acuática.',
    ARRAY['Jaguar', 'Yacaré', 'Guacamayo Azul'],
    ARRAY['Incendios', 'Ganadería extensiva'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),
(
    (SELECT id FROM countries WHERE code = 'BR'),
    'CAATINGA_CENTRAL',
    'Caatinga Central',
    'desert',
    7,
    220.00,
    'Único bioma exclusivamente brasileño, un bosque seco con especies altamente adaptadas.',
    ARRAY['Guacamayo de Spix', 'Tatú Bola'],
    ARRAY['Desertificación', 'Tala para leña'],
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e'
),
(
    (SELECT id FROM countries WHERE code = 'BR'),
    'CERRADO_MATO_GROSSO',
    'Cerrado Mato Grosso',
    'savanna',
    8,
    270.00,
    'La sabana más biodiversa del planeta, vital para las cuencas hidrográficas de Sudamérica.',
    ARRAY['Lobo de Crin', 'Oso Hormiguero Gigante'],
    ARRAY['Agronegocio', 'Monocultivos de soja'],
    'https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7'
),
(
    (SELECT id FROM countries WHERE code = 'BR'),
    'FERNANDO_NORONHA',
    'Fernando de Noronha',
    'marine',
    10,
    350.00,
    'Santuario marino volcánico con las aguas más claras del Atlántico sur.',
    ARRAY['Delfín Rotador', 'Tortuga Verde'],
    ARRAY['Sobrepesca', 'Turismo masivo'],
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19'
),
-- ARGENTINA Expansion
(
    (SELECT id FROM countries WHERE code = 'AR'),
    'IBERA_WETLANDS',
    'Esteros del Iberá',
    'wetland',
    9,
    290.00,
    'Uno de los humedales más importantes del cono sur, clave para la reintroducción del yaguareté.',
    ARRAY['Yaguareté', 'Ciervo de los Pantanos'],
    ARRAY['Drenaje de tierras', 'Especies invasoras'],
    'https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7'
),
(
    (SELECT id FROM countries WHERE code = 'AR'),
    'PUNA_JUJUY',
    'Puna Jujeña',
    'mountain',
    7,
    210.00,
    'Ecosistema de alta montaña con salares y lagunas de colores, hogar de las vicuñas.',
    ARRAY['Vicuña', 'Flamenco Andino'],
    ARRAY['Minería de litio', 'Escasez de agua'],
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
),
(
    (SELECT id FROM countries WHERE code = 'AR'),
    'PATAGONIA_ATLANTICA',
    'Patagonia Atlántica',
    'marine',
    8,
    320.00,
    'Costa salvaje donde las ballenas francas australes vienen a reproducirse.',
    ARRAY['Ballena Franca Austral', 'Elefante Marino'],
    ARRAY['Contaminación plástica', 'Pesca incidental'],
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7'
),
-- COSTA RICA Expansion
(
    (SELECT id FROM countries WHERE code = 'CR'),
    'MONTEVERDE_CLOUD',
    'Monteverde Cloud Forest',
    'rainforest',
    10,
    340.00,
    'Bosque nuboso de fama mundial, hogar del Quetzal resplandeciente.',
    ARRAY['Quetzal', 'Rana Arborícola'],
    ARRAY['Cambio climático', 'Fragmentación'],
    'https://images.unsplash.com/photo-1511497584788-876760111969'
),
(
    (SELECT id FROM countries WHERE code = 'CR'),
    'CORCOVADO_PRIMARY',
    'Parque Nacional Corcovado',
    'rainforest',
    10,
    350.00,
    'El lugar biológicamente más intenso de la Tierra según National Geographic.',
    ARRAY['Danta', 'Águila Harpía', 'Jaguar'],
    ARRAY['Zonificación', 'Turismo ilegal'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),
(
    (SELECT id FROM countries WHERE code = 'CR'),
    'TORTUGUERO_REST',
    'Tortuguero',
    'wetland',
    9,
    280.00,
    'Lugar crucial de anidación para la tortuga verde en el Caribe norte.',
    ARRAY['Tortuga Verde', 'Manatí'],
    ARRAY['Erosión costera', 'Luces artificiales'],
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19'
),
-- EXISTING REGIONS Update (included in INSERT list to consolidate)
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'AMAZONAS',
    'Amazonas Colombiano',
    'rainforest',
    9,
    350.00,
    'La región amazónica de Colombia representa el 42% del territorio nacional y alberga una biodiversidad única.',
    ARRAY['Delfín rosado', 'Jaguar', 'Anaconda verde'],
    ARRAY['Deforestación', 'Minería ilegal'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5'
),
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'ANDES',
    'Andes Colombianos',
    'mountain',
    8,
    280.00,
    'Los Andes colombianos son un hotspot de biodiversidad con ecosistemas de páramo únicos.',
    ARRAY['Oso de anteojos', 'Cóndor andino'],
    ARRAY['Agricultura intensiva', 'Ganadería'],
    'https://images.unsplash.com/photo-1589802829985-817e51171b92'
),
(
    (SELECT id FROM countries WHERE code = 'EC'),
    'GALAPAGOS',
    'Islas Galápagos',
    'marine',
    10,
    380.00,
    'Archipiélago volcánico único que inspiró la teoría de la evolución de Darwin.',
    ARRAY['Tortuga gigante', 'Iguana marina'],
    ARRAY['Especies invasoras', 'Cambio climático'],
    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44'
)
ON CONFLICT (code) DO UPDATE SET
    m2_price = EXCLUDED.m2_price,
    conservation_score = EXCLUDED.conservation_score,
    description = EXCLUDED.description,
    endemic_species = EXCLUDED.endemic_species,
    main_threats = EXCLUDED.main_threats;
