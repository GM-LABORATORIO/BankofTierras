Este es el **Protocolo de Arquitectura Conductual** para el equipo de desarrollo. El objetivo es que los ingenieros no solo vean código, sino que entiendan la lógica detrás de cada **Señal (Signal)** y cómo se transforma en **Reputación (Score)** dentro de la Subnet.

---

# 🛠 PROTOCOLO TÉCNICO: EL MOTOR DE SEÑALES CPX

**Versión:** 2.0 (Arquitectura de Economía Real)

**Objetivo:** Integración de compensación en Retail/Servicios y cálculo del Score.

---

## 1. DEFINICIÓN DE CONCEPTOS (Léxico Técnico)

Para evitar confusiones en la base de datos y el código, se establecen los siguientes términos:

* **Signal (Señal):** Es la unidad atómica de acción. Cada vez que un usuario compensa (ej. 1 gramo de carbono), se dispara una señal.
* **CPX:** Es la unidad de valor reputacional acumulado. Las señales alimentan el balance de CPX.
* **Climate Action Score™:** Es el índice resultante del procesamiento de las señales (frecuencia, volumen y consistencia).
* **CO2Pay™:** El oráculo de pago que valida la transacción en el mundo físico.

---

## 2. FLUJO LÓGICO DE INTEGRACIÓN (Paso a Paso)

### Fase A: La Captura (Retail/API)

1. **Trigger:** El usuario realiza una compra en un comercio aliado (Starbucks, Aerolínea, etc.).
2. **Payload:** El comercio envía a nuestra API un JSON con: `monto_fiat`, `id_usuario`, `id_comercio` y `tipo_de_acción`.
3. **Conversión:** El motor CPX calcula el equivalente en Carbono (Gramos) basado en el precio actual del pool de **Amazon Carbon** en la Exchange.

### Fase B: El Settlement (Blockchain)

1. **Minting/Transfer:** En la Subnet de Avalanche, el Smart Contract de **$CARBON** fracciona la cantidad exacta y la asigna al usuario.
2. **Emission:** Se emite un evento `SignalEmitted(address user, uint256 cpxAmount)`.
3. **Gasless:** El sistema debe usar el **Gas Subsidy Pool** para que el usuario no firme transacciones manualmente; la plataforma procesa el registro on-chain de forma invisible.

### Fase C: Actualización del Score

1. **Worker:** Un servicio en el backend escucha la señal confirmada.
2. **Algoritmo de Reputación:** Se actualiza el Score del usuario en Supabase considerando:
* **Volumen:** Cantidad de CPX acumulados.
* **Recurrencia:** ¿Es la tercera vez que compensa este mes? (Multiplicador de consistencia).
* **Diversidad:** ¿Ha compensado en diferentes biomas o países?



---

## 3. REQUERIMIENTOS DE FRONTEND (UX de Notificación)

Cuando el usuario completa una compensación en un comercio físico, la App debe mostrar un **"Feedback de Impacto"** inmediato:

* **Animación:** El Score circular se ilumina y sube en tiempo real.
* **Mensaje:** *"Señal Climática Recibida. +12 CPX añadidos a tu trayectoria global."*
* **Acción Social:** Opción de ver el certificado UUID de la red directamente desde el móvil.

---

## 4. ESTRUCTURA DE LA API PARA COMERCIOS (Endpoints)

El equipo debe habilitar el siguiente endpoint para aliados B2B:

`POST /api/v1/signals/emit`

```json
{
  "api_key": "comercio_prod_xxxx",
  "user_identifier": "user_wallet_or_email",
  "transaction_data": {
    "currency": "USD",
    "amount": 0.10,
    "category": "retail_coffee",
    "bioma_preference": "amazonas_colombia"
  },
  "metadata": {
    "store_location": "Bogotá - Calle 93",
    "timestamp": "2026-02-13T20:02:37Z"
  }
}

```

---

## 5. BENEFICIOS PROGRAMADOS (Lógica de Negocio)

Los desarrolladores deben programar "Triggers de Beneficio" basados en el nivel de CPX:

* **IF Score > 50,000 (Nivel Canopy):** Habilitar en el dashboard el acceso a la API de señales para terceros.
* **IF Score > 100,000 (Nivel Apex Guardian):** Activar el flag `is_eligible_for_benefits` para que los comercios aliados apliquen descuentos automáticos vía **CO2Pay™**.

---

### Instrucción Directa al Equipo:

> *"Estamos construyendo una capa de inteligencia sobre la economía real. Cada línea de código debe garantizar que la compensación de un usuario en una tienda física se refleje con integridad matemática en su Score Global. La simplicidad para el usuario es nuestra prioridad; la robustez on-chain es nuestra obligación."*

---
