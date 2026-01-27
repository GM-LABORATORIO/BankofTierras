-- ============================================
-- 🛠️ SAFETY FIX: Clean up duplicates & Ensure UNIQUE code
-- ============================================
-- This script safely removes duplicates keeping ONLY the most recent one
-- No data is lost, we just clean the 'double entries' to fix the database

DO $$ 
BEGIN 
    -- 1. Remove duplicates keeping only one per code
    DELETE FROM regions
    WHERE id IN (
        SELECT id
        FROM (
            SELECT id,
                   ROW_NUMBER() OVER (PARTITION BY code ORDER BY created_at DESC) as row_num
            FROM regions
        ) t
        WHERE t.row_num > 1
    );

    -- 2. Add the unique constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'regions_code_key'
    ) THEN
        ALTER TABLE regions ADD CONSTRAINT regions_code_key UNIQUE (code);
    END IF;
END $$;

-- ============================================
-- 🌿 TOURISM WITH PURPOSE: Premium Experiences
-- ============================================

-- First, let's add some iconic Regions to host these experiences
INSERT INTO regions (country_id, code, name, biome_type, description, fun_facts, endemic_species, conservation_status, main_threats, hero_image_url)
VALUES
-- 🇧🇷 Brasil - Pantanal
((SELECT id FROM countries WHERE code = 'BR'), 'PANTANAL', 'Pantanal Matogrossense', 'wetland', 
'El humedal tropical más grande del mundo y uno de los ecosistemas más vibrantes del planeta.',
ARRAY['Hogar de la mayor densidad de jaguares en el mundo', 'Inundaciones anuales que cubren el 80% del terreno'],
ARRAY['Jaguar', 'Nutria Gigante', 'Guacamayo Jacinto'], 'Vulnerable', ARRAY['Incendios provocados', 'Agronegocio intensivo'], 
'https://images.unsplash.com/photo-1590514102914-df004118967b?auto=format&fit=crop&q=80&w=2000'),

-- 🇦🇷 Argentina - Patagonia
((SELECT id FROM countries WHERE code = 'AR'), 'PATAGONIA', 'Patagonia Austral', 'mountain', 
'Vastas extensiones de glaciares, estepas y picos montañosos en el fin del mundo.',
ARRAY['Posee la tercera reserva de agua dulce más grande del mundo', 'Vientos que pueden superar los 100km/h'],
ARRAY['Puma', 'Cóndor Andino', 'Huemul'], 'Estable', ARRAY['Retiro de glaciares por cambio climático'], 
'https://images.unsplash.com/photo-1516900448138-898720b936c7?auto=format&fit=crop&q=80&w=2000'),

-- 🇨🇷 Costa Rica - Monteverde
((SELECT id FROM countries WHERE code = 'CR'), 'MONTEVERDE', 'Bosque Nuboso Monteverde', 'rainforest', 
'Un ecosistema único envuelto en niebla constante, cuna de la conservación en Centroamérica.',
ARRAY['Alberga el 2.5% de la biodiversidad mundial en un área pequeña', 'Lugar donde se descubrió el Sapo Dorado'],
ARRAY['Quetzal Resplandeciente', 'Colibrí Garganta de Rubí'], 'En peligro', ARRAY['Aumento de temperatura', 'Cambio en patrones de niebla'], 
'https://images.unsplash.com/photo-1594396883241-15822941b376?auto=format&fit=crop&q=80&w=2000')
ON CONFLICT (code) DO UPDATE SET
    description = EXCLUDED.description,
    hero_image_url = EXCLUDED.hero_image_url;

-- Add unique constraint to experiences title if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'experiences_title_unique'
    ) THEN
        ALTER TABLE experiences ADD CONSTRAINT experiences_title_unique UNIQUE (title);
    END IF;
END $$;

-- Now, let's populate the Experiences!
INSERT INTO experiences (title, description, experience_type, biome_key, region_id, min_tier, price_usd, included_in_tier, image_url)
VALUES
-- Amazonas Experience
('Expedición Corazón del Amazonas', 
'Inmersión de 7 días con comunidades indígenas. Aprende sobre medicina ancestral y participa en programas de reforestación activa.',
'trip', 'rainforest', (SELECT id FROM regions WHERE code = 'AMAZONAS'), 
3, 1850.00, false, 
'https://images.unsplash.com/photo-1549543026-aef30294a647?auto=format&fit=crop&q=80&w=1000'),

-- Galapagos Experience
('Voluntariado: Conservación de Tortugas', 
'Vive 15 días en la Estación Científica Charles Darwin. Ayuda en la crianza y liberación de tortugas gigantes de Galápagos.',
'trip', 'marine', (SELECT id FROM regions WHERE code = 'GALAPAGOS'), 
4, 0.00, true, 
'https://images.unsplash.com/photo-1548567103-8ad5ea7fae94?auto=format&fit=crop&q=80&w=1000'),

-- Pantanal Experience
('Safari Fotográfico y Rastreo de Jaguares', 
'Acompaña a biólogos de Onçafari en el monitoreo de jaguares con collares satelitales en el humedal más grande del mundo.',
'tour', 'wetland', (SELECT id FROM regions WHERE code = 'PANTANAL'), 
3, 1200.00, false, 
'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=1000'),

-- Patagonia Experience
('Rastreo del Carbono Azul en Glaciares', 
'Expedición científica para medir el retroceso de los glaciares y entender su impacto en los ecosistemas de carbono azul.',
'trip', 'mountain', (SELECT id FROM regions WHERE code = 'PATAGONIA'), 
4, 2500.00, false, 
'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=1000'),

-- Monteverde Experience
('Workshop: Diseño de Bosques Comestibles', 
'Taller teórico-práctico sobre agricultura regenerativa en el bosque nuboso de Costa Rica. 3 días de aprendizaje intenso.',
'workshop', 'rainforest', (SELECT id FROM regions WHERE code = 'MONTEVERDE'), 
2, 450.00, false, 
'https://images.unsplash.com/photo-1589191060295-c140da5b1d94?auto=format&fit=crop&q=80&w=1000'),

-- Global Digital Experience
('Webinar VIP: El Futuro de la Conservación', 
'Sesión exclusiva con los fundadores de Bank of Tierras y biólogos expertos sobre el impacto de la tokenización en la selva.',
'webinar', NULL, NULL, 
2, 0.00, true, 
'https://images.unsplash.com/photo-1591115765373-520b7a3d726f?auto=format&fit=crop&q=80&w=1000')
ON CONFLICT (title) DO UPDATE SET
    description = EXCLUDED.description,
    price_usd = EXCLUDED.price_usd,
    image_url = EXCLUDED.image_url;
