-- ============================================
-- FIX COLOMBIA METADATA
-- Restaurando campos perdidos durante la sincronización
-- ============================================

UPDATE countries 
SET 
    continent = 'america',
    conservation_agency = 'IDEAM',
    agency_website = 'http://www.ideam.gov.co'
WHERE code = 'CO';

-- Verificar si quedaron regiones huérfanas o con datos incompletos
-- (Colombia debería tener ahora 7 regiones según el último script)
SELECT c.name, r.name as region_name, c.continent 
FROM countries c
JOIN regions r ON c.id = r.country_id
WHERE c.code = 'CO';
