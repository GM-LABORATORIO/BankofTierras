-- ============================================
-- TABLA: user_gallery
-- Descripción: Galería de fotos subidas por usuarios
-- (Fotos de visitas, integración con Instagram)
-- ============================================

-- Crear tabla principal
CREATE TABLE IF NOT EXISTS user_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pixel_id TEXT NOT NULL, -- ID del píxel visitado
    biome_key TEXT NOT NULL, -- Ej: 'COLOMBIA_AMAZON'
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Información de la imagen
    image_url TEXT NOT NULL, -- URL de la imagen (almacenada en Supabase Storage)
    thumbnail_url TEXT, -- URL del thumbnail (optimizado)
    caption TEXT, -- Descripción de la foto
    location TEXT, -- Ubicación específica dentro del bioma
    taken_at TIMESTAMP, -- Fecha en que se tomó la foto
    
    -- Integración con redes sociales
    instagram_url TEXT, -- URL del post de Instagram (si aplica)
    instagram_post_id TEXT, -- ID del post de Instagram
    hashtags TEXT[], -- Array de hashtags
    
    -- Interacciones
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false, -- Si es destacada por admin
    
    -- Moderación
    approved BOOLEAN DEFAULT false, -- Requiere aprobación de admin
    moderation_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    moderation_notes TEXT,
    moderated_by UUID REFERENCES auth.users(id),
    moderated_at TIMESTAMP,
    
    -- Metadatos
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_gallery_pixel ON user_gallery(pixel_id);
CREATE INDEX idx_gallery_biome ON user_gallery(biome_key);
CREATE INDEX idx_gallery_user ON user_gallery(user_id);
CREATE INDEX idx_gallery_approved ON user_gallery(approved);
CREATE INDEX idx_gallery_featured ON user_gallery(featured);
CREATE INDEX idx_gallery_moderation ON user_gallery(moderation_status);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_user_gallery_updated_at
    BEFORE UPDATE ON user_gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLA: gallery_likes
-- Likes de usuarios en fotos
-- ============================================

CREATE TABLE IF NOT EXISTS gallery_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gallery_id UUID REFERENCES user_gallery(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(gallery_id, user_id) -- Un usuario solo puede dar like una vez
);

CREATE INDEX idx_likes_gallery ON gallery_likes(gallery_id);
CREATE INDEX idx_likes_user ON gallery_likes(user_id);

-- ============================================
-- TABLA: gallery_comments
-- Comentarios en fotos
-- ============================================

CREATE TABLE IF NOT EXISTS gallery_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gallery_id UUID REFERENCES user_gallery(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    parent_comment_id UUID REFERENCES gallery_comments(id) ON DELETE CASCADE, -- Para respuestas
    approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_gallery ON gallery_comments(gallery_id);
CREATE INDEX idx_comments_user ON gallery_comments(user_id);
CREATE INDEX idx_comments_parent ON gallery_comments(parent_comment_id);

-- ============================================
-- FUNCIONES AUXILIARES
-- ============================================

-- Función para dar like a una foto
CREATE OR REPLACE FUNCTION toggle_gallery_like(
    p_gallery_id UUID,
    p_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_exists BOOLEAN;
BEGIN
    -- Verificar si ya existe el like
    SELECT EXISTS(
        SELECT 1 FROM gallery_likes 
        WHERE gallery_id = p_gallery_id AND user_id = p_user_id
    ) INTO v_exists;
    
    IF v_exists THEN
        -- Quitar like
        DELETE FROM gallery_likes 
        WHERE gallery_id = p_gallery_id AND user_id = p_user_id;
        
        UPDATE user_gallery 
        SET likes = likes - 1 
        WHERE id = p_gallery_id;
        
        RETURN false;
    ELSE
        -- Agregar like
        INSERT INTO gallery_likes (gallery_id, user_id) 
        VALUES (p_gallery_id, p_user_id);
        
        UPDATE user_gallery 
        SET likes = likes + 1 
        WHERE id = p_gallery_id;
        
        RETURN true;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Función para incrementar vistas
CREATE OR REPLACE FUNCTION increment_gallery_views(p_gallery_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE user_gallery 
    SET views = views + 1 
    WHERE id = p_gallery_id;
END;
$$ LANGUAGE plpgsql;

-- Función para aprobar foto
CREATE OR REPLACE FUNCTION approve_gallery_photo(
    p_gallery_id UUID,
    p_moderator_id UUID,
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE user_gallery
    SET 
        approved = true,
        moderation_status = 'approved',
        moderation_notes = p_notes,
        moderated_by = p_moderator_id,
        moderated_at = NOW()
    WHERE id = p_gallery_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- NOTA: Los siguientes INSERT están comentados porque requieren usuarios reales en auth.users
-- Puedes descomentar y modificar los user_id cuando tengas usuarios registrados en tu app

/*
-- Foto 1: Amazonía Colombiana
INSERT INTO user_gallery (
    pixel_id, biome_key, user_id, image_url, thumbnail_url, caption, location,
    taken_at, instagram_url, hashtags, likes, views, approved, moderation_status
) VALUES (
    'CELL-72-45',
    'COLOMBIA_AMAZON',
    '00000000-0000-0000-0000-000000000001',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400',
    '¡Increíble avistamiento de delfín rosado en el río Amazonas! Una experiencia única que nunca olvidaré. 🐬💚 #BankOfTierras #AmazoniaViva',
    'Río Amazonas, Leticia',
    '2026-01-15 14:30:00',
    'https://instagram.com/p/example123',
    ARRAY['BankOfTierras', 'AmazoniaViva', 'DelfinRosado', 'Conservacion'],
    45,
    320,
    true,
    'approved'
);

-- Foto 2: Andes Colombianos
INSERT INTO user_gallery (
    pixel_id, biome_key, user_id, image_url, thumbnail_url, caption, location,
    taken_at, hashtags, likes, views, approved, moderation_status, featured
) VALUES (
    'CELL-73-5',
    'COLOMBIA_ANDES',
    '00000000-0000-0000-0000-000000000002',
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=1200',
    'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400',
    'Páramo de frailejones al amanecer. Estas plantas son esenciales para el agua de Colombia. 🌄💧',
    'Páramo de Sumapaz',
    '2026-01-20 06:15:00',
    ARRAY['BankOfTierras', 'Paramo', 'Frailejones', 'Colombia'],
    78,
    520,
    true,
    'approved',
    true -- Destacada
);

-- Foto 3: Galápagos (pendiente de aprobación)
INSERT INTO user_gallery (
    pixel_id, biome_key, user_id, image_url, thumbnail_url, caption, location,
    taken_at, hashtags, likes, views, approved, moderation_status
) VALUES (
    'CELL-90-1',
    'GALAPAGOS',
    '00000000-0000-0000-0000-000000000003',
    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200',
    'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400',
    'Tortuga gigante de Galápagos. Tienen más de 100 años. Impresionante. 🐢',
    'Isla Santa Cruz',
    '2026-01-22 10:00:00',
    ARRAY['BankOfTierras', 'Galapagos', 'TortugaGigante'],
    12,
    85,
    false,
    'pending'
);

-- Likes de ejemplo
INSERT INTO gallery_likes (gallery_id, user_id)
SELECT 
    (SELECT id FROM user_gallery WHERE pixel_id = 'CELL-72-45' LIMIT 1),
    '00000000-0000-0000-0000-00000000000' || generate_series(1, 5)::TEXT;

-- Comentarios de ejemplo
INSERT INTO gallery_comments (gallery_id, user_id, comment_text)
VALUES (
    (SELECT id FROM user_gallery WHERE pixel_id = 'CELL-72-45' LIMIT 1),
    '00000000-0000-0000-0000-000000000002',
    '¡Qué foto tan increíble! Me encantaría visitar el Amazonas pronto. 😍'
);
*/

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista: Fotos más populares
CREATE OR REPLACE VIEW popular_gallery_photos AS
SELECT 
    ug.id,
    ug.pixel_id,
    ug.biome_key,
    ug.image_url,
    ug.caption,
    ug.likes,
    ug.views,
    ug.created_at,
    (ug.likes * 2 + ug.views) as popularity_score
FROM user_gallery ug
WHERE ug.approved = true
ORDER BY popularity_score DESC
LIMIT 50;

-- Vista: Fotos pendientes de moderación
CREATE OR REPLACE VIEW pending_moderation AS
SELECT 
    ug.id,
    ug.pixel_id,
    ug.biome_key,
    ug.user_id,
    ug.image_url,
    ug.caption,
    ug.created_at
FROM user_gallery ug
WHERE ug.moderation_status = 'pending'
ORDER BY ug.created_at ASC;

-- Vista: Estadísticas de galería por bioma
CREATE OR REPLACE VIEW biome_gallery_stats AS
SELECT 
    biome_key,
    COUNT(*) as total_photos,
    COUNT(CASE WHEN approved = true THEN 1 END) as approved_photos,
    SUM(likes) as total_likes,
    SUM(views) as total_views,
    AVG(likes) as avg_likes_per_photo
FROM user_gallery
GROUP BY biome_key;

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE user_gallery IS 'Galería de fotos subidas por usuarios de sus visitas a biomas';
COMMENT ON COLUMN user_gallery.moderation_status IS 'Estado: pending, approved, rejected';
COMMENT ON COLUMN user_gallery.featured IS 'Si es destacada por admin en homepage';
COMMENT ON TABLE gallery_likes IS 'Likes de usuarios en fotos de galería';
COMMENT ON TABLE gallery_comments IS 'Comentarios en fotos de galería';
