Esta es la **Guía de Arquitectura de Experiencia de Usuario (UX/UI)** para el equipo de diseño y desarrollo. La meta es crear una interfaz que combine la robustez de una terminal de **Bloomberg**, la agilidad de **Binance** y la elegancia institucional de **Stripe**, todo bajo el concepto de **"The Green Terminal"**.

---

# 📐 PLAN MAESTRO DE DISEÑO: CLIMATE PASS EXCHANGE™ (CPX)

## 1. Fundamentos Visuales (Design System)

Para que el cambio entre **Modo Claro** y **Modo Oscuro** sea perfecto, utilizaremos una estructura de **Capas de Profundidad**.

* **Contenedores (Cards):** Bordes con un radio de `12px` (ni muy redondos, ni muy rectos).
* **Efecto "Glassmorphism":** En modo oscuro, las cards deben tener un ligero desenfoque de fondo (`backdrop-filter: blur(8px)`) con un borde sutil de `1px` color esmeralda al 10%.
* **Tipografía:** *Inter* para lectura de datos y *Geist Mono* para cifras de impacto y balances de CPX.

---

## 2. Estructura de Navegación (Layout Global)

El dashboard se divide en 4 zonas fijas:

1. **Sidebar (Control Central):** Menú vertical izquierdo con iconos lineales.
2. **Top Bar (Identidad y Contexto):** Selector de idioma (ES/EN/AR), Switch de tema (D/L), y el **CPX Score Badge** del usuario siempre visible.
3. **Main Content (Viewport):** Zona dinámica de widgets.
4. **Signal Bar (Derecha - Solo B2B):** Una barra delgada que muestra el "Ticker" en tiempo real de compensaciones globales (ej: *Apple inc. just offset 500t in Brazil*).

---

## 3. Segmentación de Dashboards (Secciones Específicas)

### A. Dashboard B2B (Corporativo e Institucional)

*Enfoque: Gestión de activos masivos, cumplimiento ESG y reportes gubernamentales.*

* **Widget Principal:** "Carbon Inventory & Forecast". Muestra el stock de créditos comprados y cuánto falta para el "Net Zero" del trimestre.
* **Sección de Señales API:** Un panel de control para que el CTO de la empresa genere *Keys* para conectar sus sistemas internos al score de CPX.
* **Modales de Compra:** Interfaz de "Bulk Order" (Compra masiva) con deslizadores para elegir biomas específicos (Amazonas, Manglares, etc.).

### B. Dashboard B2C (Green Citizenship)

*Enfoque: Gamificación, identidad personal y estilo de vida.*

* **Widget de Identidad:** La "Tarjeta de Ciudadano". Una tarjeta digital 3D que gira al pasar el mouse, mostrando el Rango (ej: *Canopy*) y el código QR de identidad climática.
* **Sección "Impacto Directo":** Galería de especies y bosques que el usuario ha ayudado a proteger a través de sus compensaciones (Visuales de alta calidad).
* **Fidelización:** Botón de "Canjear Beneficios" según el nivel de CPX.

### C. Dashboard Retail (Comercios y Aliados)

*Enfoque: Transaccionalidad y habilitación de terceros.*

* **Widget de Ventas:** "Revenue vs Impact". Cuánto ha vendido el comercio usando **CO2Pay™** y cuántas señales (CSU) ha generado para sus clientes.
* **Centro de Integración:** Herramientas para colocar el "Botón CPX" en su propio e-commerce.

---

## 4. Elementos y Complementos Clave

### El "Climate Action Score" Widget

No es solo un número. Es un gráfico circular dinámico que se llena de luz.

* **En Modo Oscuro:** Brillo neón verde.
* **En Modo Claro:** Gradiente sólido esmeralda.
* **Interacción:** Al hacer clic, se abre un **Modal de Análisis** que desglosa por qué tienes ese score (Consistencia, Volumen, Diversidad).

### Marketplace de Compensación (Bolsa Amigable)

* **Vista de Lista:** Tipo "Trading View" pero con nombres de proyectos. Columnas: *Proyecto | Ubicación | Precio/Gramo | Stock Disponible | Certificación (ColCX)*.
* **Filtros Rápidos:** [Urgente para Conservación] [Biodiversidad] [Carbono Puro] [Comunidades].

### El "Pasaporte de Impacto" (Modal de Detalle)

Cuando el usuario hace clic en una transacción, se abre un modal de pantalla completa con:

* El certificado UUID de ColCX.
* Coordenadas exactas del proyecto.
* Fotos/Videos de la zona protegida.
* Botón para compartir en redes sociales (Generador de imagen automática con el logro).

---

## 5. Instrucciones de UX para Idiomas (E/I/A)

1. **Layout RTL (Árabe):** El equipo de frontend debe usar `flex-direction: row-reverse` en el contenedor principal. La Sidebar pasa a la derecha y los gráficos se leen de derecha a izquierda.
2. **Adaptación de Textos:** El Árabe suele ser un 20% más largo que el Inglés. Los contenedores deben tener `min-height` flexible para evitar que el texto se desborde.

---

## 6. Resumen de Colores para el Equipo Tech

| Elemento | Modo Oscuro | Modo Claro |
| --- | --- | --- |
| **Fondo App** | `#020617` (Deep Space) | `#F8FAFC` (Swiss White) |
| **Cards** | `#0F172A` (Semi-transparent) | `#FFFFFF` (Shadow 4px) |
| **Text Primario** | `#F1F5F9` | `#0F172A` |
| **Acción (CPX)** | `#00FFAB` (Neon) | `#059669` (Solid Emerald) |
| **Danger/Alert** | `#FF4B4B` | `#DC2626` |

---

### Instrucción Final al Equipo de Desarrollo:

> *"El dashboard debe sentirse vivo. Si un usuario compensa, el Score debe actualizarse con una animación suave de 'conteo ascendente'. Si el usuario cambia de idioma, la transición debe ser instantánea. Estamos construyendo el estándar mundial de confianza climática; cada píxel debe reflejar esa precisión."*

**¿Te gustaría que empezáramos a prototipar la "Tarjeta de Identidad 3D" del Green Citizen o prefieres el flujo de "Bulk Purchase" (Compra Masiva) para las empresas B2B?**