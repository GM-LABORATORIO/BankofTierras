-- ============================================
-- TABLA: pixel_impact
-- Descripción: Tracking de impacto ambiental por píxel
-- (CO2 capturado, árboles plantados, fondos recaudados)
-- ============================================

-- Crear tabla principal
CREATE TABLE IF NOT EXISTS pixel_impact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pixel_id TEXT NOT NULL UNIQUE, -- ID único del píxel (ej: "CELL-72-45")
    biome_key TEXT NOT NULL, -- Ej: 'COLOMBIA_AMAZON'
    
    -- Métricas de impacto
    co2_captured_kg DECIMAL(12,2) DEFAULT 0, -- CO2 capturado en kilogramos
    trees_planted INTEGER DEFAULT 0, -- Árboles plantados
    area_protected_m2 DECIMAL(12,2) DEFAULT 0, -- Área protegida en m²
    funds_raised_usd DECIMAL(12,2) DEFAULT 0, -- Fondos recaudados en USD
    species_protected INTEGER DEFAULT 0, -- Número de especies protegidas
    
    -- Historial de salud del ecosistema
    health_history JSONB DEFAULT '[]'::jsonb, -- Array: [{"date": "2026-01-01", "health": 72}]
    current_health INTEGER CHECK (current_health BETWEEN 0 AND 100),
    
    -- Actividades de conservación
    conservation_activities JSONB DEFAULT '[]'::jsonb, -- Array de actividades realizadas
    
    -- Metadatos
    last_updated TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_pixel_impact_pixel ON pixel_impact(pixel_id);
CREATE INDEX idx_pixel_impact_biome ON pixel_impact(biome_key);

-- Trigger para actualizar last_updated
CREATE TRIGGER update_pixel_impact_updated_at
    BEFORE UPDATE ON pixel_impact
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función para agregar actividad de conservación
CREATE OR REPLACE FUNCTION add_conservation_activity(
    p_pixel_id TEXT,
    p_activity_type TEXT,
    p_description TEXT,
    p_impact_value DECIMAL
)
RETURNS VOID AS $$
BEGIN
    UPDATE pixel_impact
    SET conservation_activities = conservation_activities || jsonb_build_object(
        'date', NOW(),
        'type', p_activity_type,
        'description', p_description,
        'impact', p_impact_value
    )
    WHERE pixel_id = p_pixel_id;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar salud del ecosistema
CREATE OR REPLACE FUNCTION update_ecosystem_health(
    p_pixel_id TEXT,
    p_new_health INTEGER
)
RETURNS VOID AS $$
BEGIN
    UPDATE pixel_impact
    SET 
        health_history = health_history || jsonb_build_object(
            'date', NOW(),
            'health', p_new_health
        ),
        current_health = p_new_health,
        last_updated = NOW()
    WHERE pixel_id = p_pixel_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Píxel en Amazonía Colombiana
INSERT INTO pixel_impact (
    pixel_id, biome_key, co2_captured_kg, trees_planted, area_protected_m2,
    funds_raised_usd, species_protected, current_health, health_history,
    conservation_activities
) VALUES (
    'CELL-72-45',
    'COLOMBIA_AMAZON',
    2500.00, -- 2.5 toneladas de CO2
    150,
    10000.00, -- 1 hectárea
    1250.00,
    3,
    76,
    '[
        {"date": "2025-01-01", "health": 72},
        {"date": "2025-06-01", "health": 74},
        {"date": "2026-01-01", "health": 76}
    ]'::jsonb,
    '[
        {
            "date": "2025-03-15",
            "type": "reforestation",
            "description": "Plantación de 50 árboles nativos",
            "impact": 500
        },
        {
            "date": "2025-09-20",
            "type": "wildlife_monitoring",
            "description": "Instalación de cámaras trampa",
            "impact": 0
        },
        {
            "date": "2025-12-10",
            "type": "reforestation",
            "description": "Plantación de 100 árboles adicionales",
            "impact": 1000
        }
    ]'::jsonb
);

-- Píxel en Andes Colombianos
INSERT INTO pixel_impact (
    pixel_id, biome_key, co2_captured_kg, trees_planted, area_protected_m2,
    funds_raised_usd, species_protected, current_health, health_history
) VALUES (
    'CELL-73-5',
    'COLOMBIA_ANDES',
    1800.00,
    80,
    5000.00,
    950.00,
    2,
    78,
    '[
        {"date": "2025-01-01", "health": 75},
        {"date": "2025-06-01", "health": 77},
        {"date": "2026-01-01", "health": 78}
    ]'::jsonb
);

-- Píxel en Galápagos
INSERT INTO pixel_impact (
    pixel_id, biome_key, co2_captured_kg, trees_planted, area_protected_m2,
    funds_raised_usd, species_protected, current_health, health_history
) VALUES (
    'CELL-90-1',
    'GALAPAGOS',
    500.00, -- Menos vegetación, más enfoque en fauna marina
    20,
    15000.00,
    2100.00,
    5,
    83,
    '[
        {"date": "2025-01-01", "health": 80},
        {"date": "2025-06-01", "health": 82},
        {"date": "2026-01-01", "health": 83}
    ]'::jsonb
);

-- ============================================
-- VISTA PARA ESTADÍSTICAS AGREGADAS
-- ============================================

CREATE OR REPLACE VIEW biome_impact_summary AS
SELECT 
    biome_key,
    COUNT(*) as total_pixels,
    SUM(co2_captured_kg) as total_co2_kg,
    SUM(trees_planted) as total_trees,
    SUM(area_protected_m2) as total_area_m2,
    SUM(funds_raised_usd) as total_funds_usd,
    AVG(current_health) as avg_health,
    MAX(last_updated) as last_update
FROM pixel_impact
GROUP BY biome_key;

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE pixel_impact IS 'Tracking de impacto ambiental por píxel adoptado';
COMMENT ON COLUMN pixel_impact.pixel_id IS 'ID único del píxel (ej: CELL-72-45)';
COMMENT ON COLUMN pixel_impact.co2_captured_kg IS 'CO2 capturado en kilogramos';
COMMENT ON COLUMN pixel_impact.health_history IS 'Historial de salud del ecosistema (array JSON)';
COMMENT ON COLUMN pixel_impact.conservation_activities IS 'Actividades de conservación realizadas (array JSON)';
