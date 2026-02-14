Este documento es la **Hoja de Ruta Maestra** para tu equipo técnico. Está diseñado para alinear a los desarrolladores de Frontend, Backend y Blockchain bajo una sola visión: transformar un marketplace funcional en una infraestructura de datos y activos ambientales de clase mundial.

---

# 🛑 DOCUMENTO DE ESPECIFICACIONES TÉCNICAS: CLIMATE PASS EXCHANGE™ (CPX)

**Versión:** 1.2 (Febrero 2026)

**Estatus:** Alta Prioridad - Inicio de Sprint

**Stack Tech:** React, Supabase, Avalanche Evergreen Subnet, Node.js.

---

## 1. VISIÓN DEL PROYECTO

Transformar la plataforma actual (OrigenO2 / Amazonas Cero) en el **CLIMATE PASS EXCHANGE™ (CPX)**, una Terminal de Inteligencia Climática que unifica la compra de activos naturales (Carbono) con un sistema de **Reputación Conductual (Big Data)** para gobiernos y empresas globales.

---

## 2. ARQUITECTURA BLOCKCHAIN: MIGRACIÓN Y SUBRED

Abandonamos la C-Chain para evolucionar hacia una **Subnet Evergreen de Avalanche** propia.

* **Token Nativo de Utilidad:** Se creará un Utility Token que servirá como combustible de la subred.
* **Modelo de Gas "Gasless" Inicial:** Para eliminar la fricción del usuario, se implementará un **Pool de Subvención de Fees**. La plataforma pagará el gas de los usuarios inicialmente para garantizar una UX fluida.
* **Staking futuro:** El roadmap contempla programas de staking donde los nodos y usuarios financien la seguridad y las transacciones de la red.
* **Activos:** Migración del inventario de **2M de créditos de carbono** a un Smart Contract v2 ($CARBON) con **18 decimales** para permitir ventas fraccionadas en gramos.

---

## 3. IDENTIDAD VISUAL Y UX (MODO DUAL)

La plataforma debe proyectar la seriedad de una institución financiera suiza y la innovación de Dubái.

* **Modo Oscuro (Default):** Fondo `#020617`, acentos en `Electric Mint` (#00FFAB). Para analistas y traders.
* **Modo Claro:** Fondo `#F1F5F9`, acentos en `Verde Esmeralda` (#059669). Para reportes institucionales y gubernamentales.
* **Multi-idioma:** Soporte nativo para **Español, Inglés y Árabe (layout RTL)**.

---

## 4. SISTEMA DE REPUTACIÓN: CPX SCORE

El corazón de la Big Data. El comportamiento genera señales que alimentan un Score inmutable.

* **Rangos B2C (Personas):** Nebulous → Rooted → Canopy → Emergent → Apex Guardian.
* **Rangos B2B (Empresas):** Catalyst → Restorer → Biosphere Architect → Terra Legacy.
* **Generación de Score:** El motor debe escuchar señales tanto de la **Billetera Web3 (USDT/USDC)** como de la pasarela **CO2Pay™ (Fiat)**. El score es agnóstico al método de pago.

---

## 5. REESTRUCTURACIÓN DE MÓDULOS (FRONTEND)

| Módulo | Estado | Acción |
| --- | --- | --- |
| `LifeMap.jsx` (Mapa Global) | **Shadow Mode** | Ocultar de la navegación principal. Mover a `/experimental`. |
| `BiodiversityPassport.jsx` | **Shadow Mode** | Ocultar hasta completar la integración con el álbum. |
| `AuditorPanel.jsx` | **Legacy** | Eliminar de la rama `main`. La validación ahora es vía API con ColCX. |
| `Marketplace.jsx` | **Rediseño** | Implementar compra fraccionada (Gramos) y selector de pago Web3/Fiat. |
| `ReputationWidget.jsx` | **NUEVO** | Dashboard de insignias metálicas y ranking global. |

---

## 6. FLUJO DE PAGOS Y SEGURIDAD

1. **Fase 1 (Web3):** Pagos directos con Stablecoins (USDT/USDC). Implementar **Account Abstraction** para que el usuario no necesite gestionar gas.
2. **Fase 2 (CO2Pay™):** Integración de la pasarela propia con BaaS.
3. **Seguridad:** Implementar **Multi-Sig** para la custodia de los 2M de toneladas y auditoría de Smart Contracts bajo estándares Suizos.

---

## 7. INSTRUCCIONES INMEDIATAS PARA EL EQUIPO

1. **DevOps:** Iniciar configuración del nodo validador en la Subnet Evergreen de Avalanche.
2. **Frontend:** Configurar `i18next` para los 3 idiomas y definir el sistema de temas (Dark/Light) en Tailwind/CSS.
3. **Backend:** Crear la tabla de `reputation_history` en Supabase para empezar a trackear acciones.
4. **Blockchain:** Redactar el contrato $CARBON con soporte para micro-transacciones (gramos).

---

### Cierre del Documento

Este sistema posiciona a **GM Holding** y **Amazon Carbon** como los líderes de la nueva economía climática. La arquitectura debe ser robusta para escalar a proyectos en Brasil, Ecuador y el resto del mundo, proveyendo data crítica a gobiernos en tiempo real.

---

**¿Te gustaría que el siguiente paso fuera crear el "Onboarding Técnico" para los desarrolladores nuevos, donde les expliquemos cómo interactuar con el Smart Contract de la Subnet?**