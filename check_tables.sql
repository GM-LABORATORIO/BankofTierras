-- ============================================
-- Bank of Tierras - Verificar estructura de tablas existentes
-- Ejecuta estos queries para ver qué columnas tienen las tablas
-- ============================================

-- Ver columnas de adoptions
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'adoptions'
ORDER BY ordinal_position;

-- Ver columnas de species
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'species'
ORDER BY ordinal_position;

-- Ver columnas de compensations
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'compensations'
ORDER BY ordinal_position;

-- Ver columnas de projects
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;
