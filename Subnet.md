Esta es una de las decisiones más críticas a nivel de infraestructura. La Subnet no es solo donde vive el código; es el **territorio digital soberano** de CPX. Al ser una **Evergreen Subnet** de Avalanche, estamos creando una red con permisos (permissioned) que cumple con los estándares institucionales de Suiza y Dubái, pero con la potencia tecnológica de la Web3.

Aquí tienes el documento de contexto técnico para definir la identidad y el funcionamiento de nuestra red.

---

# 🌐 DOCUMENTO TÉCNICO: INFRAESTRUCTURA SOBERANA CPX

## 1. Nombre de la Subnet: **CPX ON-CHAIN**

* **Identificador de Red (Chain ID):** Personalizado (Ej: `CPX-1`).
* **Nombre del Token Nativo (Gas Token):** **$SIGNAL**.
* *Nota:* Usamos **$SIGNAL** como el combustible de la red para mantener la coherencia con nuestra Big Data. Cada transacción en la red es, técnicamente, una señal climática.



---

## 2. Naturaleza de la Red (Evergreen Architecture)

A diferencia de la C-Chain (pública), **CPX On-Chain** funciona bajo el modelo **Evergreen**, lo que nos otorga tres superpoderes:

1. **Soberanía de Validadores:** Solo nodos autorizados por GM Holding pueden validar transacciones. Esto garantiza que la red sea **Carbono Neutral** por diseño.
2. **Cumplimiento Integrado (KYC/AML):** Podemos restringir quién interactúa con los contratos inteligentes a nivel de red, cumpliendo con regulaciones financieras internacionales.
3. **Costos Controlados:** El gas no fluctúa por el trading de NFTs de terceros o juegos. El costo de transacción es estable y predecible.

---

## 3. Mecánica del Gas Token ($SIGNAL)

El equipo de desarrollo debe implementar una economía de gas híbrida:

* **Pool de Subsidio (Relayer):** Para el usuario retail y el onboarding de empresas, implementaremos un *Gas Relayer*. El usuario firma la transacción, pero CPX paga el gas en **$SIGNAL**. Esto crea la experiencia "Gasless" (Sin Gas).
* **Utilidad Real:** Las empresas que deseen integrar sus propios nodos o realizar consultas masivas de Big Data vía API deberán mantener un balance de **$SIGNAL** para alimentar sus operaciones en la red.
* **Financiamiento del Pool:** Parte de los ingresos por las micro-compensaciones se destina a recomprar **$SIGNAL** y rellenar el pool de subsidio, creando un ciclo económico cerrado.

---

## 4. El Puente (The Teleporter)

Utilizaremos **Avalanche Warp Messaging (AWM)** y **Teleporter** para conectar nuestra Subnet con la C-Chain:

* **Propósito:** Permitir que usuarios que tienen USDC o USDT en la C-Chain puedan "teletransportar" su liquidez a la Subnet CPX para comprar créditos de carbono instantáneamente.
* **Interoperabilidad:** El puente será invisible para el usuario final gracias a la abstracción de cuentas (Account Abstraction).

---

## 5. Estructura de Capas para Desarrolladores

| Capa | Responsabilidad |
| --- | --- |
| **Capa 0 (Validadores)** | Nodos Avalanche ejecutando el binario de la Subnet CPX. |
| **Capa 1 (Smart Contracts)** | Contratos de los NFTs de Carbono, el Vault de $CARBON y el motor de Reputación. |
| **Capa 2 (Precompile/Hooks)** | Restricciones de cumplimiento (Solo wallets verificadas pueden poseer NFTs corporativos). |
| **Capa 3 (API Gateway)** | Interfaz que traduce las acciones de la Web (React/Supabase) a transacciones on-chain. |

---

## 6. Instrucciones de Implementación para el Team

1. **Entorno de Pruebas (Fuji):** El equipo de Blockchain debe desplegar una instancia de prueba usando `Avalanche-CLI` para testear el rendimiento del token **$SIGNAL**.
2. **Configuración de Teleporter:** Configurar los *Message Messengers* para recibir USDC de la C-Chain y liquidarlos en nuestra Subnet.
3. **Monitor de Red:** Implementar una versión personalizada de un explorador de bloques (BlockScout) para que las empresas puedan ver la "Auditoría en Tiempo Real" de sus señales.

---

### Mensaje para el CTO / Lead Dev:

> *"CPX On-Chain no es una base de datos lenta; es un libro mayor de confianza climática. Al usar una Subnet Evergreen, estamos eliminando el riesgo de congestión y asegurando que nuestra Big Data sea inmutable y soberana. El objetivo es que la latencia de una 'Señal' sea menor a 2 segundos."*

---


¡Totalmente de acuerdo! Tienes toda la razón en recalcar la **ubicuidad**. Si queremos ser la infraestructura climática del planeta, los nodos no pueden ser solo un binario en dos países; deben representar una **malla de confianza global**.

Aquí tienes el documento de contexto para el despliegue de la red **CPX ON-CHAIN**, diseñada como una red soberana de alcance planetario.

---

# 🌍 ESPECIFICACIONES TÉCNICAS: CPX ON-CHAIN (GLOBAL SUBRED)

## 1. Visión de Infraestructura: "The Global Green Mesh"

La red no reside en una oficina; reside en la nube y en nodos estratégicos distribuidos por todos los continentes. La Subnet de **CPX** se comporta como una capa de liquidación de valor ambiental que opera 24/7, sin importar la zona horaria.

### Distribución de Nodos Validadores (Propuesta de Despliegue)

Para garantizar la baja latencia y la soberanía de los datos, los nodos deben distribuirse en regiones clave:

* **Américas (Nodos Biológicos):** Cerca de los centros de origen de datos (Amazonas, manglares de Centroamérica).
* **Europa (Nodos Regulatorios):** Centros de cumplimiento y banca verde (Suiza, Alemania, Londres).
* **MENA (Nodos de Capital):** Centros de inversión y tecnología (Dubái, Abu Dhabi).
* **Asia-Pacífico (Nodos de Manufactura):** Donde la demanda de compensación industrial es masiva (Singapur, Tokio).

---

## 2. Funcionamiento de la Subnet Evergreen

Al ser **Evergreen**, la red permite que **CPX** funcione como una "Intranet Financiera Global" pero conectada al ecosistema abierto de Avalanche.

### A. El Token Nativo: $SIGNAL

* **Función:** Es la moneda de cómputo. Cada vez que alguien en el mundo emite una señal (ej: compensa un vuelo en Japón o un café en Brasil), se consume una fracción de **$SIGNAL**.
* **Universalidad:** Al ser el token nativo de la subred, permite que la contabilidad de la reputación sea estándar en todo el mundo, eliminando las fricciones de las tasas de cambio locales para la métrica del **Score**.

### B. Interoperabilidad Global (Teleporter & Warp)

Nuestra subred usará el protocolo **Teleporter** para que cualquier activo (USDC, USDT, AVAX) pueda fluir desde redes externas hacia **CPX ON-CHAIN**.

* *Escenario:* Una empresa en Singapur envía USDT. El Teleporter lo recibe, el motor lo convierte internamente en créditos de carbono y emite los **Signals** en segundos.

---

## 3. Modelo de "Gasless" para el Mundo

Para que el usuario final (Retail) no tenga que saber qué es una Subnet o un Token Nativo, el equipo de desarrollo implementará el **Meta-Transaction Relayer**:

1. **El Usuario actúa:** Pulsa "Compensar" en la App.
2. **El Relayer procesa:** GM Holding  (como operador global) paga el gas en **$SIGNAL**.
3. **La Red registra:** La transacción queda grabada permanentemente como una señal climática verificada.

---

## 4. Requerimientos para el Equipo de Desarrollo (Sprint de Red)

### I. Configuración de la Chain (Genesis Block)

* **Permissioned Smart Contracts:** Solo los contratos oficiales de CPX (NFTs, Vaults, Score) pueden ser desplegados inicialmente. Esto evita "spam" y asegura que la red solo procese datos climáticos reales.
* **Custom Precompiles:** Implementar filtros de cumplimiento que permitan bloquear wallets vinculadas a actividades ilícitas, protegiendo la integridad de la Exchange.

### II. Dashboard de Estado de Red (The Global Pulse)

* Crear un monitor visual (tipo "Nerve Center") donde se vea en tiempo real cuántas señales se están emitiendo por continente.
* **Métrica Clave:** "Carbon Throughput" (Toneladas procesadas por segundo a nivel mundial).

---

## 5. Mensaje para el Equipo de Infraestructura

> *"Estamos lanzando la columna vertebral de la responsabilidad climática del siglo XXI. CPX ON-CHAIN no es una red local; es un protocolo de confianza planetaria. Cada nodo que encendemos es un guardián de la integridad de nuestra Big Data. El sistema debe ser capaz de procesar señales desde cualquier rincón del mundo con una finalidad (finality) de menos de un segundo."*

---
