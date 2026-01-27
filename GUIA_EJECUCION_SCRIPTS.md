# 📋 Guía de Ejecución de Scripts de Supabase

## 🎯 Orden de Ejecución

Ejecuta los scripts en este orden exacto para evitar errores de dependencias:

---

### **Script 1: Beneficios por Tier** ✅ (Ya ejecutado)
**Archivo**: `supabase_tier_benefits.sql`
**Estado**: ✅ Completado

Este script ya fue ejecutado exitosamente. Contiene:
- Tabla `tier_benefits`
- 17 beneficios de ejemplo (viajes, NFTs, merchandising)

---

### **Script 2: Experiencias Premium** 🆕
**Archivo**: `supabase_premium_experiences.sql`
**Orden**: **EJECUTAR PRIMERO**

**Qué hace**:
- Crea tabla `premium_experiences`
- Almacena viajes, webinars, live-cams, merchandising
- Incluye 5 experiencias de ejemplo

**Cómo ejecutar**:
1. Abre Supabase Dashboard
2. Ve a SQL Editor
3. Copia y pega todo el contenido de `supabase_premium_experiences.sql`
4. Click en "Run"

**Verificación**:
```sql
SELECT * FROM premium_experiences;
-- Deberías ver 5 registros
```

---

### **Script 3: Impacto por Píxel** 🆕
**Archivo**: `supabase_pixel_impact.sql`
**Orden**: **EJECUTAR SEGUNDO**

**Qué hace**:
- Crea tabla `pixel_impact`
- Tracking de CO2, árboles, fondos, salud del ecosistema
- Incluye funciones auxiliares y vista agregada
- 3 píxeles de ejemplo con datos

**Cómo ejecutar**:
1. Abre Supabase Dashboard → SQL Editor
2. Copia y pega todo el contenido de `supabase_pixel_impact.sql`
3. Click en "Run"

**Verificación**:
```sql
SELECT * FROM pixel_impact;
-- Deberías ver 3 registros (Amazonía, Andes, Galápagos)

SELECT * FROM biome_impact_summary;
-- Vista agregada por bioma
```

---

### **Script 4: Comunidad de Holders** 🆕
**Archivo**: `supabase_pixel_community.sql`
**Orden**: **EJECUTAR TERCERO**

**Qué hace**:
- Crea tabla `pixel_community` (adopciones)
- Crea tabla `community_events` (eventos)
- Crea tabla `event_participants` (participantes)
- Incluye funciones para renovaciones y consultas
- 2 adopciones de ejemplo + 2 eventos

**Cómo ejecutar**:
1. Abre Supabase Dashboard → SQL Editor
2. Copia y pega todo el contenido de `supabase_pixel_community.sql`
3. Click en "Run"

**Verificación**:
```sql
SELECT * FROM pixel_community;
-- Deberías ver 2 registros

SELECT * FROM community_events;
-- Deberías ver 2 eventos

SELECT * FROM biome_community_stats;
-- Vista de estadísticas
```

---

### **Script 5: Galería de Usuario** 🆕
**Archivo**: `supabase_user_gallery.sql`
**Orden**: **EJECUTAR CUARTO**

**Qué hace**:
- Crea tabla `user_gallery` (fotos de usuarios)
- Crea tabla `gallery_likes` (likes)
- Crea tabla `gallery_comments` (comentarios)
- Incluye funciones para likes y moderación
- 3 fotos de ejemplo

**Cómo ejecutar**:
1. Abre Supabase Dashboard → SQL Editor
2. Copia y pega todo el contenido de `supabase_user_gallery.sql`
3. Click en "Run"

**Verificación**:
```sql
SELECT * FROM user_gallery;
-- Deberías ver 3 fotos

SELECT * FROM popular_gallery_photos;
-- Vista de fotos más populares
```

---

## 📊 Resumen de Tablas Creadas

Después de ejecutar todos los scripts, tendrás **11 tablas nuevas**:

### Experiencias Premium
1. `premium_experiences` - Viajes, webinars, live-cams

### Impacto Ambiental
2. `pixel_impact` - CO2, árboles, fondos por píxel

### Comunidad
3. `pixel_community` - Adopciones y renovaciones
4. `community_events` - Eventos (reforestaciones, webinars)
5. `event_participants` - Participantes en eventos

### Galería
6. `user_gallery` - Fotos de usuarios
7. `gallery_likes` - Likes en fotos
8. `gallery_comments` - Comentarios en fotos

### Beneficios (Ya existente)
9. `tier_benefits` - Beneficios por tier ✅

---

## 🔍 Verificación Final

Ejecuta este query para verificar que todo se creó correctamente:

```sql
-- Verificar todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'premium_experiences',
    'pixel_impact',
    'pixel_community',
    'community_events',
    'event_participants',
    'user_gallery',
    'gallery_likes',
    'gallery_comments',
    'tier_benefits'
)
ORDER BY table_name;

-- Deberías ver 9 tablas
```

---

## ⚠️ Posibles Errores

### Error: "function update_updated_at_column() does not exist"
**Solución**: La función se crea en el primer script. Si ves este error, ejecuta primero `supabase_premium_experiences.sql`.

### Error: "relation auth.users does not exist"
**Solución**: Asegúrate de que Supabase Auth esté habilitado. Las tablas de usuarios son parte del sistema de autenticación.

### Error: "duplicate key value violates unique constraint"
**Solución**: Ya ejecutaste el script antes. Puedes:
- Ignorar el error (los datos ya existen)
- O borrar las tablas y volver a ejecutar:
```sql
DROP TABLE IF EXISTS gallery_comments CASCADE;
DROP TABLE IF EXISTS gallery_likes CASCADE;
DROP TABLE IF EXISTS user_gallery CASCADE;
DROP TABLE IF EXISTS event_participants CASCADE;
DROP TABLE IF EXISTS community_events CASCADE;
DROP TABLE IF EXISTS pixel_community CASCADE;
DROP TABLE IF EXISTS pixel_impact CASCADE;
DROP TABLE IF EXISTS premium_experiences CASCADE;
```

---

## 🚀 Próximos Pasos Después de Ejecutar Scripts

1. **Crear servicios en Supabase**
   - Agregar métodos CRUD en `supabaseService.js`
   - Ejemplo: `getPremiumExperiences()`, `getPixelImpact()`, etc.

2. **Implementar componentes en el modal**
   - Tab de Experiencias Premium
   - Sección de Impacto
   - Galería de comunidad

3. **Conectar con smart contracts**
   - Registrar adopciones en blockchain
   - Actualizar `pixel_community` al adoptar

---

## 📞 Soporte

Si encuentras algún error durante la ejecución:
1. Copia el mensaje de error completo
2. Verifica que ejecutaste los scripts en orden
3. Revisa que Supabase Auth esté habilitado

---

## ✅ Checklist de Ejecución

- [ ] Script 1: `supabase_tier_benefits.sql` ✅ (Ya ejecutado)
- [ ] Script 2: `supabase_premium_experiences.sql`
- [ ] Script 3: `supabase_pixel_impact.sql`
- [ ] Script 4: `supabase_pixel_community.sql`
- [ ] Script 5: `supabase_user_gallery.sql`
- [ ] Verificación final (query de tablas)
- [ ] Crear servicios en `supabaseService.js`
- [ ] Implementar componentes del modal

---

**Tiempo estimado de ejecución**: 5-10 minutos total
**Dificultad**: Fácil (solo copiar y pegar)
