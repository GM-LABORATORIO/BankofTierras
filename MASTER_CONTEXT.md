# 🌍 Bank of Tierras - Master Context

## 📋 Resumen del Proyecto

**Bank of Tierras** es un ecosistema Web3 integral diseñado para liderar la **compensación ambiental**, la **protección de biodiversidad** y el **cumplimiento de marcos legales y corporativos (ESG / Ley del Árbol)**. 

La plataforma utiliza la adopción de nodos territoriales (píxeles) como un mecanismo de usabilidad y transparencia para:
- 🌿 **Compensación Ambiental**: Facilitar a personas y empresas el cumplimiento de sus objetivos de huella de carbono.
- 🦊 **Protección de Especies**: Financiar directamente la conservación de fauna en peligro de extinción.
- 🤝 **Apoyo Comunitario**: Canalizar donaciones y recursos a comunidades locales guardianas de biomas.
- 📑 **Certificación Legal**: Emitir certificados verificables on-chain para beneficios tributarios y cumplimiento normativo.
- 🪙 **Economía Circular**: Utilizar el token $SIGNAL como motor de incentivos y combustible de la red para la regeneración ecosistémica.
- 📊 **Métricas Reales**: Trazabilidad absoluta de CO2, árboles plantados y estado de salud biótica mediante el CPX Ledger.

---

## 🗂️ Arquitectura del Sistema

### 🗺️ Mapa Mundial Pixelado

**Sistema de Grilla Global**:
- **Proyección**: GeoMercator
- **Resolución**: 1.0° por píxel (GRID_STEP)
- **Dimensiones**: 360 (Longitud) × 180 (Latitud)
- **Total de Nodos**: **64,800 píxeles**
  - 🌍 Nodos Terrestres: ~18,792 (29%)
  - 🌊 Nodos Marítimos: ~46,008 (71%)

**Características del Mapa**:
- Detección de biomas en tiempo real
- Sistema de coordenadas determinista
- Aportes de compensación procedurales con volatilidad de mercado
- Hover interactivo con throttling (100ms)
- Zoom optimizado (0.5x - 12x)
- Visualización de tiers con colores dinámicos

**Archivo**: `src/components/LifeMap.jsx`

---

### 💎 Sistema de Tiers y Economía

**4 Niveles de Exclusividad**:

| Tier | Nombre | % del Mapa | Cantidad | Aporte Sugerido (USD) | Multiplicador |
|------|--------|------------|----------|--------------|---------------|
| **1 - EPIC** | Santuario Crítico | 1% | 648 px | $1,000 - $3,500 | 1.5x |
| **2 - RARE** | Hotspot Biótico | 9% | 5,832 px | $500 - $1,000 | 1.3x |
| **3 - COMMON** | Reserva Forestal | 20% | 12,960 px | $250 - $500 | 1.1x |
| **4 - BASIC** | Sumidero Oceánico | 70% | 45,360 px | $100 - $250 | 1.0x |

**Potencial de Recaudación Total**: **$17,334,000 USD**

**Beneficios por Tier**:

#### EPIC ($1,000+)
- 🏆 NFT 3D Voxelizado de especie protegida
- 📹 Acceso a Live-Cams 24/7 con control PTZ
- 🗳️ Votación en gobernanza del proyecto
- ✈️ Viaje guiado de 7-10 días al bioma
- 🎓 Webinar mensual con expertos
- 🌱 **Nivel de Impacto: Máximo**

#### RARE ($500-$999)
- 📊 Reportes de especies en tiempo real
- 📜 Certificado de Impacto Premium
- 🌐 Acceso a zona VIP de Discord
- 🎥 Webinar trimestral exclusivo
- 🌱 **Nivel de Impacto: Alto**

#### COMMON ($250-$499)
- ⚡ Generación acelerada de EcoTokens
- 📈 Pool de recompensas de carbono
- 🌱 Certificado digital de adopción
- 🌱 **Nivel de Impacto: Medio**

#### BASIC ($100-$249)
- 🛡️ Membresía de Guardián
- 🌊 Participación en proyectos de limpieza
- 📱 Badge de perfil
- 🌱 **Nivel de Impacto: Base**

**Archivo**: `src/data/globalBiomes.jsx` (ADOPTION_PLANS)

---

### 👤 Sistema de Perfiles de Usuario

**Componente**: `UserProfile.jsx`

**Funcionalidades**:
- 📝 Información personal (nombre, email, empresa)
- 🏢 Tipo de usuario (Individual, Corporativo, Originador, Auditor)
- 🗺️ Mapa de píxeles adoptados
- 📊 Estadísticas de impacto (CO2, árboles, fondos)
- 🎖️ Badges y logros
- 📜 Historial de transacciones
- 🔔 Notificaciones y alertas
- ⚙️ Configuración de cuenta

**Tipos de Usuario**:
1. **Individual** - Adoptante regular
2. **Corporativo** - Empresas con panel especial
3. **Originador** - Creadores de proyectos de conservación
4. **Auditor** - Verificadores de impacto
5. **Admin** - Administradores del sistema

---

### 🏢 Panel Corporativo

**Componente**: `CorporatePanel.jsx`

**Funcionalidades Clave**:
- 💼 Dashboard ejecutivo con métricas
- 🌍 Portafolio de píxeles adoptados
- 📊 Reportes de impacto corporativo
- 🔥 Sistema de "quema" de tokens (burn)
- 📜 Certificados de compensación ambiental
- 💰 Re-inversión en créditos de carbono
- 👥 Gestión de equipo corporativo
- 📈 Análisis de Impacto Ambiental

**Beneficios Corporativos**:
- Reducción de impuestos por compensación ambiental
- Certificados legales para reportes ESG
- Branding verde en el mapa global
- Acceso a eventos corporativos exclusivos
- Prioridad en proyectos de conservación

**Archivo**: `src/components/CorporatePanel.jsx`

---

### 🌱 Panel de Originadores

**Componente**: `OriginatorPanel.jsx`

**¿Qué es un Originador?**
Creadores de proyectos de conservación que tokenizen sus iniciativas en la plataforma.

**Funcionalidades**:
- 📋 Crear proyectos de conservación
- 📸 Subir certificados e imágenes (IPFS via Pinata)
- 🗺️ Asignar proyectos a píxeles específicos
- 💰 Definir metas de financiamiento
- 📊 Dashboard de proyectos activos
- 👥 Gestión de colaboradores
- 📈 Tracking de fondos recaudados
- 🔍 Verificación de impacto

**Flujo de Creación de Proyecto**:
1. Registrar proyecto (nombre, descripción, ubicación)
2. Subir certificado de validación (PDF/imagen)
3. Definir meta de financiamiento
4. Asignar a píxeles del mapa
5. Publicar en marketplace
6. Recibir fondos de adoptantes
7. Reportar impacto mensual

**Archivo**: `src/components/OriginatorPanel.jsx`

---

### 🔍 Panel de Auditores

**Componente**: `AuditorPanel.jsx`

**Rol del Auditor**:
Verificadores independientes que validan el impacto real de los proyectos.

**Funcionalidades**:
- 📋 Lista de proyectos pendientes de auditoría
- ✅ Aprobar/Rechazar proyectos
- 📊 Verificar métricas de impacto
- 📸 Validar evidencia fotográfica
- 📝 Generar reportes de auditoría
- 🏅 Sistema de reputación de originadores
- 🔔 Alertas de proyectos sospechosos

**Criterios de Validación**:
- Documentación legal completa
- Evidencia fotográfica geolocalizada
- Métricas de impacto verificables
- Transparencia financiera
- Cumplimiento de estándares internacionales

**Archivo**: `src/components/AuditorPanel.jsx`

---

### 🪙 Sistema de Token $SIGNAL (Legacy: EcoToken)

**Componente**: `EcoTokenPurchase.jsx` / `BotWallet.jsx`

**¿Qué es $SIGNAL?**
Token nativo y de gas de la Subnet que representa el pulso de la red y potencia los servicios ecosistémicos.

**Características**:
- 💰 Precio dinámico basado en TRM (Tasa Representativa del Mercado)
- 🔄 Convertible a créditos de carbono
- 🌱 Generado por píxeles adoptados
- 💸 Comercializable en marketplace
- 🔥 Quemable para certificados ambientales

**Generación de EcoTokens**:
- **EPIC**: 10 tokens/mes por píxel
- **RARE**: 5 tokens/mes por píxel
- **COMMON**: 2 tokens/mes por píxel
- **BASIC**: 1 token/mes por píxel

**Usos del EcoToken**:
1. Adoptar más píxeles con incentivos
2. Acceder a experiencias premium
3. Votar en gobernanza
4. Comercializar en marketplace
5. Quemar para certificados legales

**Archivo**: `src/components/EcoTokenPurchase.jsx`

---

### 🌳 Marketplace de Carbono

**Componente**: `CarbonMarketplace.jsx`

**Funcionalidades**:
- 📊 Listado de proyectos de conservación
- 🔍 Filtros por bioma, tier, precio, impacto
- 💰 Adopción de créditos de carbono
- 📈 Gráficos de impacto en tiempo real
- 🏆 Ranking de proyectos más impactantes
- 💬 Sistema de reviews y ratings
- 🔔 Alertas de nuevos proyectos

**Tipos de Proyectos**:
1. **Reforestación** - Plantación de árboles nativos
2. **Conservación** - Protección de bosques existentes
3. **Restauración** - Recuperación de ecosistemas degradados
4. **Energía Renovable** - Proyectos solares/eólicos
5. **Limpieza Oceánica** - Remoción de plásticos

**Archivo**: `src/components/CarbonMarketplace.jsx`

---

### 🌲 Marketplace de Árboles

**Componente**: `TreeMarketplace.jsx`

**Concepto**:
Marketplace especializado en adopción de árboles individuales con NFTs únicos.

**Funcionalidades**:
- 🌳 Catálogo de especies nativas por bioma
- 📍 Geolocalización exacta del árbol
- 📸 Fotos del árbol adoptado
- 📊 Tracking de crecimiento (altura, diámetro)
- 🎁 NFT 3D del árbol
- 📜 Certificado de adopción
- 🔔 Actualizaciones mensuales

**Especies Disponibles** (ejemplos):
- Ceiba (Amazonía)
- Alerce (Patagonia)
- Palma de Cera (Eje Cafetero)
- Araucaria (Chile)
- Caoba (Perú)

**Archivo**: `src/components/TreeMarketplace.jsx`

---

### 🛠️ Panel de Administración

**Componente**: `AdminPanel.jsx`

**Funcionalidades**:
- 👥 Gestión de usuarios
- 🗺️ Gestión de biomas y píxeles
- 💰 Configuración de precios y tiers
- 📊 Métricas globales del sistema
- 🔧 Configuración de sistema
- 📜 Logs de auditoría
- 🚨 Moderación de contenido
- 💸 Gestión de tesorería

**Métricas del Dashboard**:
- Total de usuarios registrados
- Píxeles adoptados vs disponibles
- Fondos recaudados
- CO2 capturado total
- Árboles plantados
- Proyectos activos

**Archivo**: `src/components/AdminPanel.jsx`

---

### 🔧 Panel Técnico

**Componente**: `TechnicalPanel.jsx`

**Funcionalidades**:
- 🔍 Monitoreo de smart contracts
- 📊 Métricas de blockchain
- 🔐 Gestión de wallets del sistema
- 📈 Gas tracker
- 🔄 Sincronización con Supabase
- 🐛 Logs de errores
- ⚡ Performance monitoring

**Archivo**: `src/components/TechnicalPanel.jsx`

---

### 💼 Gestor de Beneficios por Tier

**Componente**: `TierBenefitsManager.jsx`

**Funcionalidades**:
- ➕ Crear nuevos beneficios
- ✏️ Editar beneficios existentes
- 🗑️ Eliminar beneficios
- 🎯 Asignar beneficios a tiers
- 📊 Visualizar matriz de beneficios
- 💰 Definir precios de beneficios
- 🔄 Sincronización con Supabase

**Tipos de Beneficios**:
1. **Viajes** - Experiencias en el bioma
2. **Webinars** - Sesiones educativas
3. **Live-Cams** - Acceso a cámaras en vivo
4. **Merchandising** - Productos físicos
5. **NFTs** - Coleccionables digitales
6. **Certificados** - Documentos legales
7. **Eventos** - Acceso a eventos exclusivos

**Archivo**: `src/components/TierBenefitsManager.jsx`

---

### 💳 Sistema de Wallet

**Archivo**: `src/components/BotWallet.jsx`

---

### 🗄️ Arquitectura de Base de Datos Unificada (Supabase)

Esta arquitectura ha sido simplificada y optimizada (Febrero 2026) para eliminar redundancias y escalar con el protocolo $SIGNAL.

**Tablas Principales**:
1. **`profiles`**: Gestión de identidades Web3 (wallet_address como PK). Almacena tipos de entidad (individual/corporativo) y roles.
2. **`species`**: Catálogo unificado de activos biológicos. Fusionado con la antigua `species_listings`.
3. **`projects`**: Registro maestro de iniciativas de conservación y cuotas de carbono/m2.
4. **`pixels`**: El ledger geográfico. Define coordenadas, estados y dueños (originadores).
5. **`pixel_adoptions`**: Registro transaccional de adopciones vinculado a wallets.
6. **`pixel_impact`**: Métricas de impacto en tiempo real por cada coordenada.
7. **`reputation_logs`**: El ledger de acciones de reputación (reemplaza a `reputation_history`).
8. **`community_events`**: Infraestructura de gamificación para eventos sociales.

**Vistas de Integración**:
- **`reputation_summary`**: Agregación dinámica de puntos por wallet para cálculo de CPX Score.
- **`pixel_community`**: Vista que une adoptions con profiles para mostrar la red social de holders.
- **`biome_impact_summary`**: Resumen de métricas agregadas por bioma.

---

### 🏆 Sistema de Certificados NFT

**Concepto**:
Certificados digitales únicos que prueban la adopción de píxeles y el impacto ambiental generado.

**Tipos de Certificados NFT**:

1. **Certificado de Adopción de Píxel**
   - Metadata: Coordenadas, bioma, tier, fecha de adopción
   - Imagen generada dinámicamente con mapa del píxel
   - QR code de verificación on-chain
   - Actualización automática de impacto (CO2, árboles)
   - Transferible entre wallets

2. **Certificado de Compensación Ambiental**
   - Para corporativos que "queman" tokens
   - Válido para reportes ESG y reducción de impuestos
   - Firmado digitalmente por auditores
   - Incluye métricas verificables de impacto
   - Formato PDF + NFT

3. **Certificado de Adopción de Especie**
   - NFT 3D de la especie adoptada
   - Foto real del animal (si disponible)
   - Tracking de salud y ubicación
   - Actualizaciones mensuales
   - Coleccionable y comercializable

4. **Certificado de Proyecto de Carbono**
   - Emitido por originadores de proyectos
   - Validado por auditores
   - Incluye créditos de carbono generados
   - Metadata: ubicación, tipo de proyecto, impacto
   - Comercializable en marketplace

**Características Técnicas**:
- **Estándar**: ERC-721 (NFT único) o ERC-1155 (semi-fungible)
- **Metadata**: Almacenada en IPFS via Pinata
- **Actualización**: Metadata dinámica que se actualiza con impacto real
- **Verificación**: QR code que apunta a blockchain explorer
- **Transferencia**: Transferible pero con historial inmutable

**Generación Automática**:
- Al adoptar píxel → Certificado de Adopción
- Al quemar tokens → Certificado de Compensación
- Al adoptar especie → Certificado de Especie
- Al completar proyecto → Certificado de Proyecto

---

### 💰 Token $CARBON

**¿Qué es $CARBON?**
Token específico que representa créditos de carbono verificados, separado del EcoToken.

**Diferencias con EcoToken**:

| Característica | EcoToken | $CARBON |
|----------------|----------|---------|
| **Propósito** | Utilidad general de la plataforma | Créditos de carbono verificados |
| **Generación** | Por adopción de píxeles | Por proyectos de conservación auditados |
| **Valor** | Dinámico según TRM | Fijo según estándares internacionales |
| **Uso** | Compras, experiencias, gobernanza | Compensación de huella de carbono |
| **Quemable** | Sí, para certificados | Sí, para compensación corporativa |
| **Comercializable** | Marketplace interno | Marketplace externo (Verra, Gold Standard) |

**Generación de $CARBON**:
- **Reforestación**: 1 $CARBON = 1 tonelada CO2 capturada
- **Conservación**: 1 $CARBON = 1 tonelada CO2 evitada
- **Energía Renovable**: 1 $CARBON = 1 tonelada CO2 no emitida
- **Restauración**: 1 $CARBON = 0.5 toneladas CO2 capturada

**Validación**:
- Proyectos auditados por terceros certificados
- Cumplimiento de estándares Verra VCS o Gold Standard
- Verificación anual de impacto
- Emisión de tokens solo después de validación

**Usos del $CARBON**:
1. **Compensación Corporativa** - Empresas compensan su huella
2. **Retiro Permanente** - Quemar para certificado legal
3. **Trading** - Comercializar en mercados secundarios
4. **Staking** - Generar rendimientos pasivos
5. **Donación** - Transferir a ONGs o proyectos

**Precio del $CARBON**:
- Basado en mercados internacionales de carbono
- Rango típico: $15-$50 USD por tonelada
- Actualización diaria según índices globales
- Premium por proyectos de alta calidad (+20-30%)

---

### 🌱 Sistema de Proyectos de Créditos de Carbono

**Estructura de un Proyecto**:

1. **Información Básica**
   - Nombre del proyecto
   - Ubicación geográfica (píxeles asignados)
   - Tipo de proyecto (reforestación, conservación, etc.)
   - Originador (organización responsable)
   - Meta de financiamiento
   - Duración del proyecto

2. **Documentación Legal**
   - Certificado de propiedad de tierra
   - Permisos gubernamentales
   - Plan de manejo forestal
   - Estudio de línea base (baseline)
   - Metodología de cálculo de carbono

3. **Métricas de Impacto**
   - CO2 capturado/evitado (toneladas)
   - Árboles plantados
   - Hectáreas restauradas
   - Especies protegidas
   - Empleos generados
   - Comunidades beneficiadas

4. **Evidencia Verificable**
   - Fotos geolocalizadas (IPFS)
   - Reportes mensuales de progreso
   - Mediciones de campo (altura árboles, diámetro)
   - Imágenes satelitales (antes/después)
   - Testimonios de comunidades locales

5. **Auditoría y Validación**
   - Auditor asignado
   - Fecha de última auditoría
   - Estado de validación (pendiente, aprobado, rechazado)
   - Reputación del originador (1-5 estrellas)
   - Historial de cumplimiento

**Ciclo de Vida del Proyecto**:

```
1. Creación → 2. Revisión → 3. Aprobación → 4. Financiamiento → 
5. Ejecución → 6. Monitoreo → 7. Auditoría → 8. Emisión de $CARBON → 
9. Distribución → 10. Reporte Final
```

**Tipos de Proyectos**:

1. **Reforestación** (REDD+)
   - Plantación de árboles nativos
   - Restauración de bosques degradados
   - Captura activa de CO2

2. **Conservación** (Avoided Deforestation)
   - Protección de bosques existentes
   - Prevención de tala ilegal
   - Evitar emisiones futuras

3. **Agroforestería**
   - Sistemas silvopastoriles
   - Cultivos bajo sombra
   - Agricultura regenerativa

4. **Manglares y Humedales**
   - Restauración de manglares costeros
   - Protección de turberas
   - "Blue Carbon" (carbono azul)

5. **Energía Renovable**
   - Proyectos solares comunitarios
   - Parques eólicos
   - Biodigestores

**Financiamiento**:
- Crowdfunding de adoptantes de píxeles
- Inversión corporativa
- Fondos de impacto
- Donaciones de ONGs
- Venta anticipada de créditos de carbono

---

### 🦁 Sistema de Adopción de Especies

**Concepto**:
Adopción individual de animales en peligro de extinción con seguimiento personalizado.

**Especies Disponibles por Bioma**:

**Colombia**:
- Oso de Anteojos (Andes)
- Delfín Rosado (Amazonía)
- Loro Orejiamarillo (Eje Cafetero)
- Jaguar (Amazonía/Pacífico)
- Manatí (Caribe)

**Brasil**:
- Mono León Dorado (Mata Atlántica)
- Guacamayo Azul (Pantanal)
- Guacamayo de Spix (Caatinga)
- Delfín Rotador (Fernando de Noronha)

**Argentina**:
- Ballena Franca Austral (Península Valdés)
- Pingüino de Magallanes (Patagonia)
- Venado de las Pampas (Pampas)

**Chile**:
- Pudú (Bosque Valdiviano)
- Puma (Patagonia)
- Flamenco Andino (Atacama)

**Perú**:
- Gallito de las Rocas (Machu Picchu)
- Delfín Rosado (Amazonía)

**Ecuador**:
- Tortuga Gigante (Galápagos)
- Iguana Marina (Galápagos)
- Pingüino de Galápagos (Galápagos)

**Paquetes de Adopción**:

1. **Básico** ($50/año)
   - Certificado digital de adopción
   - Foto del animal
   - Actualización trimestral
   - Badge de perfil

2. **Estándar** ($150/año)
   - Todo lo de Básico +
   - NFT 3D del animal
   - Actualizaciones mensuales con fotos
   - Acceso a live-cam del hábitat
   - Kit de bienvenida (peluche, stickers)

3. **Premium** ($500/año)
   - Todo lo de Estándar +
   - Collar GPS en el animal (si aplica)
   - Tracking en tiempo real
   - Video personalizado del animal
   - Visita guiada al hábitat (1 vez)
   - Nombre del adoptante en placa del santuario

**Tracking de Especies**:
- **Ubicación GPS**: Mapa en tiempo real
- **Salud**: Reportes veterinarios mensuales
- **Comportamiento**: Observaciones de biólogos
- **Reproducción**: Alertas de crías nacidas
- **Alimentación**: Tipo de dieta y frecuencia

**Impacto de la Adopción**:
- 100% de fondos va a conservación de la especie
- Financiamiento de collares GPS y monitoreo
- Apoyo a rangers y guardaparques
- Educación ambiental en comunidades locales
- Investigación científica

---

### 🗳️ Sistema de Gobernanza y DAO

**Concepto**:
Organización Autónoma Descentralizada (DAO) donde los holders de píxeles votan en decisiones clave.

**Poder de Voto**:
- **EPIC**: 10 votos por píxel
- **RARE**: 5 votos por píxel
- **COMMON**: 2 votos por píxel
- **BASIC**: 1 voto por píxel

**Tipos de Propuestas**:

1. **Expansión de Biomas**
   - Qué regiones agregar al mapa
   - Priorización de continentes
   - Votación comunitaria

2. **Distribución de Fondos**
   - Qué proyectos financiar
   - Porcentaje de tesorería a asignar
   - Aprobación de originadores

3. **Cambios en Tiers**
   - Ajustes de precios
   - Nuevos beneficios
   - Modificación de multiplicadores

4. **Partnerships**
   - Aprobación de alianzas estratégicas
   - Integración con otras plataformas
   - Colaboraciones con ONGs

5. **Mejoras Técnicas**
   - Nuevas funcionalidades
   - Upgrades de smart contracts
   - Cambios en tokenomics

**Proceso de Votación**:
1. Propuesta creada por holder con >100 votos
2. Período de discusión (7 días)
3. Votación abierta (5 días)
4. Quórum mínimo: 10% de votos totales
5. Aprobación: >50% de votos a favor
6. Implementación: 14 días después de aprobación

**Incentivos por Participación**:
- Bonus de EcoTokens por votar
- NFT de "Gobernador Activo"
- Acceso a propuestas tempranas
- Influencia en roadmap

---

### 🎮 Sistema de Recompensas y Gamificación

**Niveles de Usuario**:

| Nivel | Nombre | Requisitos | Beneficios |
|-------|--------|------------|------------|
| 1 | Explorador | 1 píxel adoptado | Badge básico |
| 2 | Guardián | 5 píxeles | +5% EcoTokens |
| 3 | Protector | 10 píxeles | +10% EcoTokens, acceso VIP |
| 4 | Embajador | 25 píxeles | +15% EcoTokens, webinars gratis |
| 5 | Leyenda | 50+ píxeles | +25% EcoTokens, viaje gratis |

**Logros Desbloqueables**:

🌍 **Explorador Global**
- Adoptar píxeles en 3+ continentes
- Recompensa: NFT de Mapa Mundial

🌳 **Reforestador**
- Plantar 100+ árboles
- Recompensa: 50 $CARBON

🦁 **Protector de Especies**
- Adoptar 5+ especies diferentes
- Recompensa: NFT de Especie Rara

💰 **Inversor de Impacto**
- Invertir $1,000+ en proyectos
- Recompensa: Certificado Premium

🏆 **Gobernador Activo**
- Votar en 10+ propuestas
- Recompensa: Poder de voto 2x

**Misiones Diarias/Semanales**:
- Visitar el mapa (5 EcoTokens)
- Compartir en redes sociales (10 EcoTokens)
- Invitar amigos (50 EcoTokens por referido)
- Subir foto al bioma (20 EcoTokens)
- Votar en propuesta (15 EcoTokens)

**Leaderboard**:
- Top adoptantes por cantidad de píxeles
- Top generadores de impacto (CO2)
- Top votantes en gobernanza
- Top contribuidores de contenido

---

### 📦 Integración con IPFS y Pinata

**¿Qué se almacena en IPFS?**

1. **Certificados de Proyectos**
   - PDFs de validación legal
   - Permisos gubernamentales
   - Estudios de impacto ambiental

2. **Fotos de Evidencia**
   - Imágenes de proyectos de conservación
   - Fotos de especies adoptadas
   - Galería de usuarios

3. **Metadata de NFTs**
   - JSON con datos del certificado
   - Imágenes generadas de píxeles
   - Modelos 3D de especies

4. **Reportes de Impacto**
   - Informes mensuales de originadores
   - Auditorías de terceros
   - Mediciones de campo

**Flujo de Subida a IPFS**:
```javascript
1. Usuario sube archivo → 
2. Validación de formato y tamaño → 
3. Compresión (si es imagen) → 
4. Upload a Pinata → 
5. Obtener CID (Content Identifier) → 
6. Guardar CID en Supabase → 
7. Generar URL pública (ipfs.io/ipfs/{CID})
```

**Ventajas**:
- Inmutabilidad de evidencia
- Descentralización de datos
- Resistencia a censura
- Verificación criptográfica
- Permanencia de archivos

---

### 🔔 Sistema de Notificaciones

**Tipos de Notificaciones**:

1. **Adopción y Renovación**
   - Confirmación de adopción de píxel
   - Recordatorio de renovación (30 días antes)
   - Expiración de adopción
   - Renovación exitosa

2. **Impacto Ambiental**
   - Nuevo árbol plantado en tu píxel
   - Milestone de CO2 capturado (100t, 500t, 1000t)
   - Especie avistada en tu bioma
   - Actualización de salud del ecosistema

3. **Comunidad**
   - Nuevo evento en tu bioma
   - Alguien comentó tu foto
   - Nuevo holder en tu píxel
   - Invitación a evento exclusivo

4. **Gobernanza**
   - Nueva propuesta disponible para votar
   - Propuesta que votaste fue aprobada/rechazada
   - Resultado de votación
   - Implementación de cambio aprobado

5. **Marketplace**
   - Nuevo proyecto de carbono en tu región
   - Experiencia premium disponible
   - Descuento en píxeles cercanos
   - Precio de $CARBON cambió significativamente

6. **Logros**
   - Nuevo nivel desbloqueado
   - Logro completado
   - Subiste en el leaderboard
   - Recompensa disponible

**Canales de Notificación**:
- 🔔 In-app (badge en campana)
- 📧 Email (configurable)
- 📱 Push notifications (móvil)
- 💬 Discord (integración)
- 🐦 Twitter (menciones)

---

### 🌐 Landing Page

**Componente**: `LandingPage.jsx`

**Secciones**:

1. **Hero Section**
   - Título impactante: "Adopta un Píxel. Salva el Planeta."
   - Mapa interactivo de fondo
   - CTA: "Explorar Mapa" / "Adoptar Ahora"
   - Contador en tiempo real: Píxeles adoptados, CO2 capturado

2. **¿Cómo Funciona?**
   - 3 pasos simples con iconos
   - Animaciones de Framer Motion
   - Video explicativo (YouTube embed)

3. **Biomas Destacados**
   - Carrusel de 6 biomas premium
   - Fotos espectaculares
   - Precios y disponibilidad
   - Link a modal de adopción

4. **Impacto en Números**
   - Métricas globales animadas
   - CO2 capturado, árboles plantados, fondos recaudados
   - Gráficos de impacto por continente

5. **Testimonios**
   - Historias de adoptantes
   - Fotos de visitas a biomas
   - Ratings de 5 estrellas

6. **Tiers y Beneficios**
   - Tabla comparativa de 4 tiers
   - Beneficios destacados
   - Calculadora de Impacto

7. **Pasaporte de Aventuras**
   - Visualización de sellos coleccionados con fotos reales.
   - Álbum de Biodiversidad con especies desbloqueables.
   - Sistema de gamificación por exploración.

7. **Partners**
   - Logos de ONGs aliadas
   - Certificaciones (Verra, Gold Standard)
   - Universidades colaboradoras

8. **FAQ**
   - Preguntas frecuentes
   - Acordeón expandible
   - Links a documentación

9. **Footer**
   - Redes sociales
   - Links legales (Términos, Privacidad)
   - Newsletter signup
   - Mapa del sitio

**Archivo**: `src/components/LandingPage.jsx`

---

## 🗂️ Estado Actual del Proyecto

### ✅ Completado

#### 1. **Base de Datos de Biomas (27 Regiones)**
- **Colombia**: 7 regiones naturales (Eje Cafetero, Andes, Amazonía, Caribe, Pacífico, Orinoquía, Insular)
- **Brasil**: 5 regiones (Mata Atlántica, Cerrado, Pantanal, Caatinga, Fernando de Noronha)
- **Argentina**: 4 regiones (Pampas, Quebrada de Humahuaca, Península Valdés, Iguazú)
- **Chile**: 3 regiones (Patagonia, Atacama, Bosque Valdiviano)
- **Perú**: 2 regiones (Amazonía Peruana, Machu Picchu)
- **Ecuador**: 1 región (Galápagos)
- **Global**: México (Yucatán, Lacandona), USA (Yellowstone, Everglades) 🆕

#### 2. **Base de Datos Supabase (11 Tablas)**
- ✅ `tier_benefits` - Beneficios por tier
- ✅ `premium_experiences` - Viajes, webinars, live-cams
- ✅ `pixel_impact` - Tracking de impacto ambiental
- ✅ `pixel_community` - Adopciones, renovaciones, eventos
- ✅ `community_events` - Eventos de comunidad
- ✅ `event_participants` - Participantes en eventos
- ✅ `user_gallery` - Fotos de usuarios
- ✅ `gallery_likes` - Likes en fotos
- ✅ `gallery_comments` - Comentarios en fotos
- ✅ `profiles` - Perfiles de usuario y roles
- ✅ `system_config` - Configuración global

#### 3. **Servicios de Supabase (`supabaseService.js`)**
- ✅ Métodos CRUD completos para todas las tablas.
- ✅ Lógica de carga de impacto, comunidad y experiencias.

#### 4. **Modal Mejorado de Biomas (`EnhancedBiomeModal.jsx`)**
- ✅ Carrusel de fotos y Live-stream.
- ✅ Tab de **Detalles** (Planes, beneficios, descripción).
- ✅ Tab de **Experiencias Premium** (Viajes, webinars con tier-locking).
- ✅ Tab de **Impacto** (Métricas de CO2, árboles, fondos y gráfico de salud).
- ✅ Lógica de **Comunidad** (Carga de holders y eventos).

#### 6. **Pasaporte y Álbum de Biodiversidad**
- ✅ **Álbum Visual**: Integración de fotos reales de monumentos en el pasaporte.
- ✅ **Colección de Fauna**: 7 especies iniciales (Jaguar, Delfín Rosado, etc.) con lógica de "locked/unlocked".
- ✅ **Drop Logic**: 10% de probabilidad de descubrir especies al interactuar con el mapa.
- ✅ **Optimización de Mapa**: Reducción de densidad de vegetación para mayor claridad visual.

#### 7. **Ultra-High Fidelity 3D Card Engine (CO2Pay™)**
- ✅ **3D Card Engine**: Sustitución de secuencias pesadas por un motor 3D CSS dinámico (Framer Motion) sincronizado con el scroll. Zero-latency.
- ✅ **Official Assets**: Integración del diseño "First Edition" (Esmeralda/VISA/Embossed).
- ✅ **Flat Aesthetic**: Eliminación de sombras pesadas para una integración minimalista "Pure White".

#### 8. **Institutional Layout & Global Footer (Saudi-tier)**
- ✅ **Layout Tightening**: Reducción de zonas muertas de scroll de 160vh a 120vh para una narrativa compacta.
- ✅ **Master Footer**: Implementación de un cierre institucional de 4 columnas (Ecosistema, Recursos, Compliance, Legal).
- ✅ **Trust Badges**: Integración visual de partners (ColCX, Avalanche Evergreen) y estatus de red.

#### 9. **B2B Command Station & Corporate Dashboard V3**
- ✅ **Carbon Treasury**: Estación de comando ejecutiva para empresas (B2B Vault).
- ✅ **Persona-Based Layouts**: Detección dinámica de roles (Ciudadano, Comercio, Corporativo) en el Dashboard.
- ✅ **Bulky UI Fix**: Optimización de etiquetas y pesos visuales en botones para una estética "Saudi-tier".

---

## 🚧 Pendiente de Implementación

### 1. **Correcciones en el Modal (`EnhancedBiomeModal.jsx`)**
- 🛠️ **Botón de Comunidad**: El contenido del tab existe pero falta el botón en la barra de navegación.
- 🛠️ **Tab de Galería**: Implementar la pestaña de fotos de usuario (el servicio ya existe).
- 🛠️ **Certificado PDF**: Implementar la generación de certificados descargables.

### 2. **Refactorización**
- 🧹 **Modularizar el Modal**: Dividir `EnhancedBiomeModal.jsx` (800+ líneas) en sub-componentes.
- 🧹 **Limpieza**: Eliminar archivos `.backup` y logs de depuración excesivos.

### 3. **Funcionalidades Web3**
- ⛓️ **Integración Blockchain**: Conectar la adopción con el contrato inteligente.
- ⛓️ **NFT Metadata**: Sincronizar adopción con metadata IPFS.

### 3. **Expansión de Biomas (100+ regiones)**

#### Prioridad Alta (28 biomas)
**América del Sur** (15 restantes):
- Venezuela: Los Roques, Tepuyes, Llanos
- Bolivia: Salar de Uyuni, Yungas
- Paraguay: Gran Chaco
- Uruguay: Cabo Polonio
- Guyana: Kaieteur Falls
- Surinam: Selva Central
- Guayana Francesa: Reserva Natural

**América Central** (13 biomas):
- Costa Rica: Monteverde, Tortuguero
- Panamá: Darién, Bocas del Toro
- Nicaragua: Ometepe
- Honduras: Roatán
- Guatemala: Tikal
- Belice: Barrera de Coral
- El Salvador: Parque Nacional Montecristo

#### Prioridad Media (45 biomas)
- **África**: 15 biomas (Madagascar, Kalahari, Okavango, etc.)
- **Asia**: 15 biomas (Borneo, Sundarbans, Gobi, etc.)
- **Europa**: 10 biomas (Alpes, Mediterráneo, Fiordos, etc.)
- **Oceanía**: 5 biomas (Nueva Zelanda, Tasmania, etc.)

#### Prioridad Baja (27 biomas)
- **América del Norte**: 15 biomas (Everglades, Grand Canyon, etc.)
- **Islas Remotas**: 12 biomas (Hawái, Maldivas, Seychelles, etc.)

### 4. **Sistema de Partnerships**
- Integración con operadores turísticos
- Eco-lodges y hoteles sostenibles
- Aerolíneas (descuentos en vuelos)
- ONGs de conservación
- Universidades y centros de investigación

### 5. **Smart Contracts (Blockchain)**
- Registro de adopciones en blockchain
- NFTs con metadata dinámica
- Sistema de renovación automática
- Distribución de fondos a proyectos de conservación

---

## 📊 Estadísticas del Proyecto

### Biomas
- **Total**: 27 regiones
- **Colombia**: 7 (26%)
- **Brasil**: 5 (19%)
- **Argentina**: 4 (15%)
- **Chile**: 3 (11%)
- **Perú**: 2 (7%)
- **Ecuador**: 1 (4%)
- **Otros continentes**: 5 (18%)

### Precios
- **Rango**: $100 - $380 USD
- **Promedio**: ~$280 USD
- **Premium** (>$350): Galápagos, Fernando de Noronha, Machu Picchu

### Base de Datos
- **Tablas**: 9
- **Funciones**: 6
- **Vistas**: 6
- **Scripts SQL**: 5

---

## 🛠️ Stack Tecnológico

### Frontend
- **React** 18.3.1
- **Vite** 7.3.1
- **Tailwind CSS** 3.4.17
- **Framer Motion** 11.15.0
- **Lucide React** (iconos)
- **React Simple Maps** (mapas)

### Backend
- **Supabase** (PostgreSQL)
- **Supabase Storage** (imágenes)
- **Supabase Auth** (autenticación)

### APIs Externas
- **Unsplash API** (fotos de biomas)
- **YouTube API** (live-streams)
- **CoinGecko** (precios de crypto - futuro)

### Blockchain (Futuro)
- **Avalanche C-Chain**
- **Hardhat** (desarrollo)
- **Ethers.js** (interacción)

---

## 📁 Estructura de Archivos Clave

```
AMAZONAS CERO/
├── src/
│   ├── components/
│   │   ├── LifeMap.jsx (Mapa interactivo - OPTIMIZADO)
│   │   └── EnhancedBiomeModal.jsx (Modal con medios)
│   ├── data/
│   │   └── globalBiomes.jsx (27 biomas + planes)
│   └── services/
│       └── supabaseService.js (PENDIENTE)
├── supabase_*.sql (5 scripts ejecutados)
├── GUIA_EJECUCION_SCRIPTS.md
├── implementation_plan.md
└── README.md (este archivo)
```

---

## 🚀 Próximos Pasos Inmediatos

1. **Crear `supabaseService.js`** con métodos CRUD
2. **Implementar Tab de Experiencias Premium** en modal
3. **Agregar Historial de Impacto** con gráficos
4. **Expandir a 15 biomas más** (Venezuela, Bolivia, Costa Rica, etc.)
5. **Integrar sistema de certificados** descargables en PDF

---

## 📝 Notas Importantes

### Performance
- Mapa optimizado con throttling de 100ms
- Evitar renderizado excesivo de biomas
- Lazy loading de imágenes recomendado

### Datos de Ejemplo
- Scripts de Supabase tienen datos comentados
- Requieren usuarios reales en `auth.users`
- Descomentar cuando haya usuarios registrados

### Precios
- Varían de $100 a $380 USD por m²
- Calculados con volatilidad de mercado (+/- $15)
- Tiers EPIC tienen multiplicador 1.5x

---

## 🎯 Visión a Largo Plazo

**Bank of Tierras** busca consolidarse como la infraestructura tecnológica definitiva para la **regeneración del planeta**, transformando la compensación ambiental en un proceso transparente, interactivo y legalmente sólido, conectando:
- 🏗️ **Infraestructura ESG**: El estándar para certificados de cumplimiento ambiental empresarial.
- 🐾 **Santuario Global**: Protección activa de miles de especies y sus hábitats.
- 🏘️ **Impacto Social**: Prosperidad para comunidades locales a través de la custodia ambiental.
- 🌎 **Mercado Unificado**: El eje de intercambio para créditos de carbono y servicios ecosistémicos.

---

**Última actualización**: 2026-02-14
**Versión**: 3.0 (Institutional Infrastructure & 3D Cards)
