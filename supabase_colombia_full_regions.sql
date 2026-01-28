-- ============================================
-- COLOMBIA FULL REGIONS SYNC
-- Synchronizing globalBiomes.jsx static data with Supabase
-- ============================================

-- Ensure Colombia exists and get its ID
DELETE FROM countries WHERE code = 'CO';
INSERT INTO countries (code, name, flag_emoji, continent, description, official_language, currency, conservation_agency, agency_website)
VALUES ('CO', 'Colombia', '🇨🇴', 'america', 'País megadiverso con el segundo mayor número de especies en el mundo', 'Español', 'COP', 'IDEAM', 'http://www.ideam.gov.co');

INSERT INTO regions (
    country_id, code, name, biome_type, 
    conservation_score, m2_price, 
    center_lat, center_lng, 
    description, fun_facts, endemic_species, 
    conservation_status, main_threats, 
    hero_image_url, gallery_urls, live_cam_url
)
VALUES 
-- 1. EJE CAFETERO
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_COFFEE_REGION',
    'Eje Cafetero: Paisaje Cultural Cafetero',
    'mountain',
    8,
    340.00,
    4.7, -75.5,
    'Patrimonio de la Humanidad UNESCO. Hogar del mejor café del mundo y del Nevado del Ruiz.',
    ARRAY['Hogar del mejor café del mundo', 'Manizales, Pereira y Armenia forman el triángulo cafetero', 'El Nevado del Ruiz es el volcán activo más alto'],
    ARRAY['Loro Orejiamarillo', 'Oso de Anteojos', 'Palma de Cera'],
    'Patrimonio de la Humanidad UNESCO',
    ARRAY['Expansión urbana', 'Monocultivos', 'Cambio climático'],
    'https://images.unsplash.com/photo-1583623025817-d180a2221d0a', -- Valle del Cocora (Real)
    ARRAY['https://images.unsplash.com/photo-1447933601403-0c6688de566e', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'],
    'https://www.youtube.com/embed/live_stream?channel=UCVArkbPFFy_ojNW0PzEWUqg'
),
-- 2. ANDES
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_ANDES',
    'Andes Colombianos: Nevados y Páramos',
    'mountain',
    8,
    320.00,
    6.2, -73.5,
    'Los páramos almacenan el 70% del agua dulce de Colombia y albergan al Cóndor Andino.',
    ARRAY['Los páramos almacenan el 70% del agua dulce', 'Hogar del Cóndor Andino', 'Ecosistema único de alta montaña'],
    ARRAY['Cóndor Andino', 'Frailejón', 'Oso de Anteojos'],
    'Vulnerable',
    ARRAY['Minería', 'Expansión agrícola', 'Cambio climático'],
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09', -- Andes (Real)
    ARRAY['https://images.unsplash.com/photo-1580654712603-eb43273aff33', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'],
    NULL
),
-- 3. AMAZONAS
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_AMAZON',
    'Amazonía Colombiana: Selva Virgen',
    'rainforest',
    10,
    350.00,
    -1.5, -71.5,
    '6% del Amazonas está en Colombia. Alberga 674 especies de aves, más que toda Europa.',
    ARRAY['6% del Amazonas está en Colombia', 'Alberga 674 especies de aves', 'El pulmón del mundo'],
    ARRAY['Jaguar', 'Delfín Rosado', 'Anaconda Verde'],
    'Protección Crítica',
    ARRAY['Deforestación', 'Minería ilegal', 'Tráfico de especies'],
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5', -- Amazonas (Real)
    ARRAY['https://images.unsplash.com/photo-1547234935-80c7145ec969', 'https://images.unsplash.com/photo-1551244072-5d12893278ab'],
    'https://www.youtube.com/embed/ydYDqZQpim8'
),
-- 4. CARIBE
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_CARIBBEAN',
    'Caribe Colombiano: Costa Dorada',
    'mangrove',
    7,
    280.00,
    10.5, -74.5,
    'Hogar del Parque Tayrona y la Sierra Nevada de Santa Marta, la montaña costera más alta del mundo.',
    ARRAY['Hogar del Parque Tayrona', 'Sierra Nevada de Santa Marta es la montaña costera más alta', 'Cuna de la cultura Tayrona'],
    ARRAY['Flamenco del Caribe', 'Manatí', 'Tortuga Carey'],
    'Amenazado',
    ARRAY['Turismo masivo', 'Contaminación marina', 'Sobrepesca'],
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5', -- Tayrona (Real)
    ARRAY['https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a'],
    NULL
),
-- 5. PACIFICO
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_PACIFIC',
    'Pacífico Colombiano: Selva Húmeda',
    'rainforest',
    10,
    310.00,
    4.5, -77.5,
    'Una de las regiones más lluviosas del planeta. Santuario de ballenas jorobadas.',
    ARRAY['Una de las regiones más lluviosas del planeta', 'Santuario de ballenas jorobadas', 'Cuna de la marimba'],
    ARRAY['Ballena Jorobada', 'Rana Venenosa', 'Jaguar Negro'],
    'Biodiversidad Extrema',
    ARRAY['Minería ilegal', 'Tala', 'Sobrepesca'],
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0', -- Pacifico/Choco (Real)
    ARRAY['https://images.unsplash.com/photo-1583212292454-1fe6229603b7', 'https://images.unsplash.com/photo-1547234935-80c7145ec969'],
    NULL
),
-- 6. ORINOQUIA
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_ORINOQUIA',
    'Orinoquía: Llanos Orientales',
    'savanna',
    8,
    240.00,
    4.5, -70.5,
    'Los llanos se inundan 6 meses al año, creando un ecosistema único de sabana tropical.',
    ARRAY['Se inunda 6 meses al año', 'Corazón de la cultura llanera', 'Tierras de horizontes infinitos'],
    ARRAY['Chigüiro', 'Oso Palmero', 'Delfín de Río'],
    'Estable',
    ARRAY['Ganadería extensiva', 'Monocultivos', 'Explotación petrolera'],
    'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a', -- Savanna/Tropical (Real)
    ARRAY['https://images.unsplash.com/photo-1547234935-80c7145ec969', 'https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7'],
    NULL
),
-- 7. INSULAR
(
    (SELECT id FROM countries WHERE code = 'CO'),
    'COLOMBIA_INSULAR',
    'Región Insular: San Andrés y Providencia',
    'coral_reef',
    7,
    290.00,
    12.5, -81.7,
    'El mar de los 7 colores. Reserva de Biosfera Seaflower, la tercera más grande del mundo.',
    ARRAY['El mar de los 7 colores', 'Reserva de Biosfera Seaflower', 'Tercera barrera coralina más grande'],
    ARRAY['Pez Ángel', 'Tortuga Carey', 'Coral Cuerno de Alce'],
    'En Peligro',
    ARRAY['Sobrepesca', 'Turismo no sostenible', 'Blanqueamiento coralino'],
    'https://images.unsplash.com/photo-1582967788606-a171c1080cb0', -- Caribbean Island (Real)
    ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19'],
    'https://www.youtube.com/embed/QMbq4sRzSs4'
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    biome_type = EXCLUDED.biome_type,
    conservation_score = EXCLUDED.conservation_score,
    m2_price = EXCLUDED.m2_price,
    center_lat = EXCLUDED.center_lat,
    center_lng = EXCLUDED.center_lng,
    description = EXCLUDED.description,
    fun_facts = EXCLUDED.fun_facts,
    endemic_species = EXCLUDED.endemic_species,
    conservation_status = EXCLUDED.conservation_status,
    main_threats = EXCLUDED.main_threats,
    hero_image_url = EXCLUDED.hero_image_url,
    gallery_urls = EXCLUDED.gallery_urls,
    live_cam_url = EXCLUDED.live_cam_url;
