-- ============================================
-- TABLA: pixel_community
-- Descripción: Comunidad de holders por píxel
-- (Gestión de adopciones, renovaciones, comunidad)
-- ============================================

-- Crear tabla principal
CREATE TABLE IF NOT EXISTS pixel_community (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pixel_id TEXT NOT NULL, -- ID del píxel (ej: "CELL-72-45")
    biome_key TEXT NOT NULL, -- Ej: 'COLOMBIA_AMAZON'
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Información de adopción
    adoption_date TIMESTAMP DEFAULT NOW(),
    plan_id TEXT NOT NULL, -- 'plan_24m', 'plan_36m', 'plan_48m', 'plan_60m'
    plan_duration_months INTEGER NOT NULL,
    plan_discount_percent INTEGER DEFAULT 0,
    
    -- Fechas importantes
    expiration_date TIMESTAMP NOT NULL,
    renewal_date TIMESTAMP, -- Fecha de renovación (si aplica)
    last_renewal_reminder TIMESTAMP,
    
    -- Estado
    active BOOLEAN DEFAULT true,
    auto_renew BOOLEAN DEFAULT false,
    
    -- Precio pagado
    price_paid_usd DECIMAL(10,2) NOT NULL,
    
    -- Participación en comunidad
    community_role TEXT DEFAULT 'member', -- 'member', 'moderator', 'ambassador'
    contribution_score INTEGER DEFAULT 0, -- Puntos por participación
    
    -- Metadatos
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_community_pixel ON pixel_community(pixel_id);
CREATE INDEX idx_community_user ON pixel_community(user_id);
CREATE INDEX idx_community_biome ON pixel_community(biome_key);
CREATE INDEX idx_community_active ON pixel_community(active);
CREATE INDEX idx_community_expiration ON pixel_community(expiration_date);

-- Crear función update_updated_at si no existe (puede estar en otro script)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_pixel_community_updated_at
    BEFORE UPDATE ON pixel_community
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función para calcular fecha de expiración
CREATE OR REPLACE FUNCTION calculate_expiration_date(
    p_adoption_date TIMESTAMP,
    p_duration_months INTEGER
)
RETURNS TIMESTAMP AS $$
BEGIN
    RETURN p_adoption_date + (p_duration_months || ' months')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Función para renovar adopción
CREATE OR REPLACE FUNCTION renew_adoption(
    p_community_id UUID,
    p_new_plan_id TEXT,
    p_new_duration_months INTEGER,
    p_new_price_usd DECIMAL
)
RETURNS VOID AS $$
DECLARE
    v_current_expiration TIMESTAMP;
BEGIN
    -- Obtener fecha de expiración actual
    SELECT expiration_date INTO v_current_expiration
    FROM pixel_community
    WHERE id = p_community_id;
    
    -- Actualizar registro
    UPDATE pixel_community
    SET 
        plan_id = p_new_plan_id,
        plan_duration_months = p_new_duration_months,
        renewal_date = NOW(),
        expiration_date = calculate_expiration_date(v_current_expiration, p_new_duration_months),
        price_paid_usd = price_paid_usd + p_new_price_usd,
        active = true,
        updated_at = NOW()
    WHERE id = p_community_id;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener holders de un píxel
CREATE OR REPLACE FUNCTION get_pixel_holders(p_pixel_id TEXT)
RETURNS TABLE (
    user_id UUID,
    adoption_date TIMESTAMP,
    plan_name TEXT,
    days_remaining INTEGER,
    is_active BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pc.user_id,
        pc.adoption_date,
        pc.plan_id,
        EXTRACT(DAY FROM (pc.expiration_date - NOW()))::INTEGER as days_remaining,
        pc.active
    FROM pixel_community pc
    WHERE pc.pixel_id = p_pixel_id
    ORDER BY pc.adoption_date DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABLA: community_events
-- Eventos de la comunidad (limpiezas, reforestaciones, etc.)
-- ============================================

CREATE TABLE IF NOT EXISTS community_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    biome_key TEXT NOT NULL,
    event_type TEXT NOT NULL, -- 'cleanup', 'reforestation', 'monitoring', 'webinar'
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    requires_tier INTEGER, -- Tier mínimo requerido
    virtual BOOLEAN DEFAULT false, -- Si es evento virtual
    meeting_url TEXT, -- Para eventos virtuales
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_biome ON community_events(biome_key);
CREATE INDEX idx_events_date ON community_events(event_date);

-- ============================================
-- TABLA: event_participants
-- Participantes de eventos
-- ============================================

CREATE TABLE IF NOT EXISTS event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES community_events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT NOW(),
    attended BOOLEAN DEFAULT false,
    feedback TEXT,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5)
);

CREATE INDEX idx_participants_event ON event_participants(event_id);
CREATE INDEX idx_participants_user ON event_participants(user_id);

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- NOTA: Los siguientes INSERT están comentados porque requieren usuarios reales en auth.users
-- Puedes descomentar y modificar los user_id cuando tengas usuarios registrados en tu app

/*
-- Adopción de píxel en Amazonía (Plan Champion - 5 años)
INSERT INTO pixel_community (
    pixel_id, biome_key, user_id, plan_id, plan_duration_months, plan_discount_percent,
    expiration_date, price_paid_usd, community_role, contribution_score
) VALUES (
    'CELL-72-45',
    'COLOMBIA_AMAZON',
    '00000000-0000-0000-0000-000000000001', -- Reemplazar con UUID de usuario real
    'plan_60m',
    60,
    20,
    NOW() + INTERVAL '60 months',
    1400.00,
    'ambassador',
    150
);

-- Adopción de píxel en Andes (Plan Guardian - 3 años)
INSERT INTO pixel_community (
    pixel_id, biome_key, user_id, plan_id, plan_duration_months, plan_discount_percent,
    expiration_date, price_paid_usd, auto_renew
) VALUES (
    'CELL-73-5',
    'COLOMBIA_ANDES',
    '00000000-0000-0000-0000-000000000002', -- Reemplazar con UUID de usuario real
    'plan_36m',
    36,
    10,
    NOW() + INTERVAL '36 months',
    864.00,
    true
);
*/

-- Evento: Reforestación en Amazonía
INSERT INTO community_events (
    biome_key, event_type, title, description, event_date, location,
    max_participants, requires_tier, virtual
) VALUES (
    'COLOMBIA_AMAZON',
    'reforestation',
    'Jornada de Reforestación - Leticia',
    'Únete a nosotros para plantar 500 árboles nativos en la Amazonía colombiana. Incluye transporte desde Leticia, almuerzo, y certificado de participación.',
    '2026-04-15 08:00:00',
    'Leticia, Amazonas, Colombia',
    30,
    2, -- RARE tier mínimo
    false
);

-- Evento: Webinar Virtual
INSERT INTO community_events (
    biome_key, event_type, title, description, event_date,
    max_participants, requires_tier, virtual, meeting_url
) VALUES (
    'COLOMBIA_ANDES',
    'webinar',
    'Webinar: Conservación de Páramos',
    'Sesión educativa con expertos en ecosistemas de páramo. Aprende sobre la importancia de estos ecosistemas como fábricas de agua.',
    '2026-02-15 18:00:00',
    100,
    2,
    true,
    'https://zoom.us/j/123456789'
);

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista: Estadísticas de comunidad por bioma
CREATE OR REPLACE VIEW biome_community_stats AS
SELECT 
    biome_key,
    COUNT(*) as total_holders,
    COUNT(CASE WHEN active = true THEN 1 END) as active_holders,
    AVG(contribution_score) as avg_contribution,
    SUM(price_paid_usd) as total_revenue_usd,
    MIN(adoption_date) as first_adoption,
    MAX(adoption_date) as latest_adoption
FROM pixel_community
GROUP BY biome_key;

-- Vista: Próximos a expirar (para recordatorios)
CREATE OR REPLACE VIEW expiring_soon AS
SELECT 
    pc.id,
    pc.pixel_id,
    pc.user_id,
    pc.expiration_date,
    EXTRACT(DAY FROM (pc.expiration_date - NOW()))::INTEGER as days_remaining
FROM pixel_community pc
WHERE 
    pc.active = true 
    AND pc.expiration_date BETWEEN NOW() AND NOW() + INTERVAL '30 days'
    AND pc.auto_renew = false
ORDER BY pc.expiration_date ASC;

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE pixel_community IS 'Comunidad de holders por píxel adoptado';
COMMENT ON COLUMN pixel_community.plan_id IS 'ID del plan: plan_24m, plan_36m, plan_48m, plan_60m';
COMMENT ON COLUMN pixel_community.contribution_score IS 'Puntos por participación en comunidad';
COMMENT ON TABLE community_events IS 'Eventos de la comunidad (limpiezas, reforestaciones, webinars)';
COMMENT ON TABLE event_participants IS 'Participantes registrados en eventos';
