-- ============================================
-- 🌍 GLOBAL EXPANSION: Continents & Countries
-- ============================================
-- This script adds continent support and expands to 50+ countries worldwide

-- Step 1: Add continent field to countries table
ALTER TABLE countries ADD COLUMN IF NOT EXISTS continent TEXT 
    CHECK (continent IN ('america', 'europe', 'africa', 'asia', 'oceania', 'antarctica'));

-- Step 2: Create continents reference table
CREATE TABLE IF NOT EXISTS continents (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    emoji TEXT,
    display_order INTEGER
);

-- Step 3: Seed continents
INSERT INTO continents (code, name, emoji, display_order) VALUES
('america', 'América', '🌎', 1),
('europe', 'Europa', '🌍', 2),
('africa', 'África', '🌍', 3),
('asia', 'Asia', '🌏', 4),
('oceania', 'Oceanía', '🌏', 5),
('antarctica', 'Antártida', '🧊', 6)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    emoji = EXCLUDED.emoji,
    display_order = EXCLUDED.display_order;

-- Step 4: Update existing countries with continent
UPDATE countries SET continent = 'america' WHERE code IN ('BR', 'CO', 'EC', 'MX', 'PE');

-- Step 5: Add more countries (50+ priority conservation countries)

-- AMÉRICA (20 countries)
INSERT INTO countries (code, name, flag_emoji, continent, description) VALUES
-- North America
('US', 'Estados Unidos', '🇺🇸', 'america', 'Parques nacionales, bosques boreales, humedales'),
('CA', 'Canadá', '🇨🇦', 'america', 'Bosques boreales, tundra ártica, costa del Pacífico'),
-- Central America
('GT', 'Guatemala', '🇬🇹', 'america', 'Selva maya, volcanes, biodiversidad mesoamericana'),
('CR', 'Costa Rica', '🇨🇷', 'america', 'Líder en conservación, bosques nubosos, costas'),
('PA', 'Panamá', '🇵🇦', 'america', 'Puente biológico, selvas tropicales, arrecifes'),
('BZ', 'Belice', '🇧🇿', 'america', 'Barrera de coral, selva maya, jaguar'),
-- South America (already have BR, CO, EC, PE)
('AR', 'Argentina', '🇦🇷', 'america', 'Patagonia, Andes, glaciares, pampas'),
('CL', 'Chile', '🇨🇱', 'america', 'Patagonia, desierto de Atacama, bosques templados'),
('BO', 'Bolivia', '🇧🇴', 'america', 'Amazonía, Andes, Salar de Uyuni'),
('VE', 'Venezuela', '🇻🇪', 'america', 'Tepuyes, Orinoco, Andes, Amazonía'),
('GY', 'Guyana', '🇬🇾', 'america', 'Selva amazónica prístina, biodiversidad'),
('SR', 'Surinam', '🇸🇷', 'america', 'Selva tropical, conservación indígena'),
('PY', 'Paraguay', '🇵🇾', 'america', 'Chaco, humedales, bosques'),
('UY', 'Uruguay', '🇺🇾', 'america', 'Praderas, costas, humedales'),

-- EUROPA (15 countries)
('ES', 'España', '🇪🇸', 'europe', 'Parques nacionales, Pirineos, Doñana, costas'),
('FR', 'Francia', '🇫🇷', 'europe', 'Alpes, Pirineos, bosques, costas mediterráneas'),
('IT', 'Italia', '🇮🇹', 'europe', 'Alpes, Apeninos, costas, parques nacionales'),
('DE', 'Alemania', '🇩🇪', 'europe', 'Bosques negros, Alpes bávaros, humedales'),
('GB', 'Reino Unido', '🇬🇧', 'europe', 'Páramos, costas, reservas naturales'),
('NO', 'Noruega', '🇳🇴', 'europe', 'Fiordos, bosques boreales, Ártico'),
('SE', 'Suecia', '🇸🇪', 'europe', 'Bosques boreales, lagos, Laponia'),
('FI', 'Finlandia', '🇫🇮', 'europe', 'Bosques boreales, lagos, tundra'),
('IS', 'Islandia', '🇮🇸', 'europe', 'Glaciares, volcanes, geotermia'),
('CH', 'Suiza', '🇨🇭', 'europe', 'Alpes, glaciares, lagos alpinos'),
('AT', 'Austria', '🇦🇹', 'europe', 'Alpes, bosques, parques nacionales'),
('PL', 'Polonia', '🇵🇱', 'europe', 'Bosques primarios, Bialowieza'),
('RO', 'Rumania', '🇷🇴', 'europe', 'Cárpatos, bosques, osos, lobos'),
('GR', 'Grecia', '🇬🇷', 'europe', 'Costas mediterráneas, islas, montañas'),
('PT', 'Portugal', '🇵🇹', 'europe', 'Costas atlánticas, bosques, Azores'),

-- ÁFRICA (10 countries)
('KE', 'Kenia', '🇰🇪', 'africa', 'Sabana, Masai Mara, vida salvaje icónica'),
('TZ', 'Tanzania', '🇹🇿', 'africa', 'Serengeti, Kilimanjaro, Zanzíbar'),
('ZA', 'Sudáfrica', '🇿🇦', 'africa', 'Kruger, fynbos, biodiversidad única'),
('BW', 'Botsuana', '🇧🇼', 'africa', 'Delta del Okavango, vida salvaje'),
('NA', 'Namibia', '🇳🇦', 'africa', 'Desierto de Namib, costa esqueleto'),
('MG', 'Madagascar', '🇲🇬', 'africa', 'Biodiversidad única, lémures, baobabs'),
('RW', 'Ruanda', '🇷🇼', 'africa', 'Gorilas de montaña, bosques afromontanos'),
('UG', 'Uganda', '🇺🇬', 'africa', 'Gorilas, chimpancés, fuentes del Nilo'),
('ET', 'Etiopía', '🇪🇹', 'africa', 'Tierras altas, endemismos, café silvestre'),
('CD', 'Congo (RDC)', '🇨🇩', 'africa', 'Selva del Congo, gorilas, bonobos'),

-- ASIA (12 countries)
('ID', 'Indonesia', '🇮🇩', 'asia', 'Selvas tropicales, orangutanes, arrecifes'),
('MY', 'Malasia', '🇲🇾', 'asia', 'Selvas de Borneo, orangutanes, biodiversidad'),
('TH', 'Tailandia', '🇹🇭', 'asia', 'Selvas, elefantes, costas tropicales'),
('VN', 'Vietnam', '🇻🇳', 'asia', 'Bahía de Halong, selvas, biodiversidad'),
('PH', 'Filipinas', '🇵🇭', 'asia', 'Arrecifes de coral, selvas, endemismos'),
('IN', 'India', '🇮🇳', 'asia', 'Tigres, Himalaya, Ghats occidentales'),
('NP', 'Nepal', '🇳🇵', 'asia', 'Himalaya, tigres, rinocerontes'),
('BT', 'Bután', '🇧🇹', 'asia', 'Himalaya, conservación budista, bosques'),
('LK', 'Sri Lanka', '🇱🇰', 'asia', 'Elefantes, leopardos, biodiversidad'),
('JP', 'Japón', '🇯🇵', 'asia', 'Bosques templados, montañas, costas'),
('CN', 'China', '🇨🇳', 'asia', 'Pandas, Himalaya, biodiversidad extrema'),
('MN', 'Mongolia', '🇲🇳', 'asia', 'Estepas, desierto de Gobi, vida nómada'),

-- OCEANÍA (5 countries)
('AU', 'Australia', '🇦🇺', 'oceania', 'Gran Barrera, outback, endemismos únicos'),
('NZ', 'Nueva Zelanda', '🇳🇿', 'oceania', 'Fiordos, bosques, aves endémicas'),
('PG', 'Papúa Nueva Guinea', '🇵🇬', 'oceania', 'Selvas tropicales, arrecifes, biodiversidad'),
('FJ', 'Fiyi', '🇫🇯', 'oceania', 'Arrecifes de coral, islas tropicales'),
('NC', 'Nueva Caledonia', '🇳🇨', 'oceania', 'Arrecifes, endemismos, biodiversidad marina')

ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    flag_emoji = EXCLUDED.flag_emoji,
    continent = EXCLUDED.continent,
    description = EXCLUDED.description;

-- Step 6: Create view for countries with continent info
CREATE OR REPLACE VIEW countries_with_continents AS
SELECT 
    c.*,
    ct.name as continent_name,
    ct.emoji as continent_emoji,
    ct.display_order as continent_order
FROM countries c
LEFT JOIN continents ct ON c.continent = ct.code
ORDER BY ct.display_order, c.name;

-- ============================================
-- 📊 SUMMARY
-- ============================================
-- Continents: 6 (América, Europa, África, Asia, Oceanía, Antártida)
-- Countries: 62 total
--   - América: 20 countries
--   - Europa: 15 countries
--   - África: 10 countries
--   - Asia: 12 countries
--   - Oceanía: 5 countries
--   - Antártida: 0 (future: research stations)
-- 
-- Regions: Currently 2 (Amazonas Colombia, Galápagos Ecuador)
-- Ready to add more regions per country!
