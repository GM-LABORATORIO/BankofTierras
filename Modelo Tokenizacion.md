Este es el **Protocolo de Tokenización y Liquidación de Activos** para el equipo de desarrollo. Aquí explicamos la relación técnica entre el **NFT (Certificado Raíz)**, el **Token $CARBON (Unidad de Fraccionamiento)** y el proceso de **Quema (Redemption)** para la obtención del certificado final.

---

# ⛓️ ARQUITECTURA DE TOKENIZACIÓN: NFT-TO-TOKEN BRIDGE

## 1. El Concepto de "Vaulting" (Bloqueo)

Para garantizar que no haya doble gasto ni sobreventa, la relación entre el crédito físico y el digital debe ser matemática:

* **1 Crédito de Carbono (Físico)** = **1 NFT (Activo Raíz)** = **1,000,000 $CARBON (Unidades Fraccionadas en Gramos)**.

---

## 2. Flujo Técnico para el Desarrollador (Smart Contracts)

### Paso A: Minting del NFT (La Tonelada)

Cuando **ColCX** o el originador certifica una tonelada, el sistema mintea un NFT bajo el estándar **ERC-721** o **ERC-1155**.

* **Metadata del NFT:** Contiene el ID de certificación, coordenadas GPS, tipo de bioma y el PDF legal cifrado en IPFS.
* **Estado:** `Activo` (Disponible para venta corporativa masiva).

### Paso B: Fraccionamiento (Vaulting para Retail/B2C)

Si la tonelada se destina al mercado fraccionado (como Starbucks o usuarios individuales), el NFT entra en un **Contrato de Custodia (Vault)**.

1. **Lock:** El NFT queda bloqueado y no se puede transferir.
2. **Issue:** El contrato emite automáticamente **1,000,000 de tokens $CARBON** (ERC-20).
* *Nota:* Usamos un millón porque 1 tonelada = 1,000,000 de gramos. Así, **1 token $CARBON = 1 gramo de CO2**.



### Paso C: La Quema y Compensación (The Burn)

Para que un usuario o empresa pueda decir que ha "compensado", no basta con tener el token; debe **quemarlo**.

1. **Acción:** El usuario selecciona la cantidad de $CARBON a compensar en su Dashboard.
2. **Burn:** El Smart Contract ejecuta la función `burn(amount)`.
3. **Trigger:** La quema dispara un evento que genera el **Certificado de Compensación Climática** digital.
4. **Impacto:** Se emiten las **Señales (Signals)** correspondientes para subir el **Climate Action Score™** del usuario.

---

## 3. Lógica de Negocio en el Código

### Para Ventas Corporativas (B2B):

* La empresa compra el **NFT completo**.
* El NFT se transfiere a su Wallet corporativa.
* La empresa puede elegir: Mantenerlo como activo en su balance o "desintegrarlo" en el Vault para obtener $CARBON y compensar por partes.

### Para el Mercado Retail (B2C/Signals):

* El usuario nunca ve el NFT. Solo ve el stock de **$CARBON** disponible.
* Al pagar vía **CO2Pay™**, el backend compra los tokens $CARBON necesarios del Vault y los quema inmediatamente en nombre del usuario para generar su Score.

---

## 4. Estructura del Smart Contract (Referencia)

```solidity
// Lógica simplificada para el equipo de Blockchain
contract CarbonVault {
    mapping(uint256 => bool) public isLocked; // NFT ID -> Status

    function fractionalize(uint256 nftId) public {
        // 1. Validar propiedad del NFT
        // 2. Transferir NFT al Vault (this)
        // 3. Bloquear NFT
        isLocked[nftId] = true;
        // 4. Mint 1,000,000 $CARBON tokens al marketplace
        carbonToken.mint(marketplaceAddress, 1000000 * 10**18);
    }

    function redeem(uint256 amountGrams) public {
        // 1. Quema de tokens $CARBON
        carbonToken.burnFrom(msg.sender, amountGrams);
        // 2. Emitir Certificado Digital
        emit CarbonOffsetCertified(msg.sender, amountGrams, block.timestamp);
    }
}

```

---

## 5. Visualización en el Dashboard

* **Vista Inversor:** "Posees 5 NFTs de Carbono (5 Toneladas)".
* **Vista Usuario:** "Has compensado 450g de Carbono (450 $CARBON)".
* **Vista Global:** "Total de señales emitidas: 2,000,000,000 $CARBON" (Equivalente a los 2M de créditos).

### Instrucción Directa al Equipo:

> *"Deben asegurar que la paridad entre el NFT bloqueado y los tokens circulantes sea exacta. Si se queman todos los tokens asociados a un NFT, ese NFT debe marcarse como 'Retirado' de forma permanente. No puede haber ni un gramo de error entre la blockchain y el inventario físico."*

---


Exacto, ese es el flujo de Tesorería Climática más avanzado del mercado. Lo que planteas permite que la aerolínea trate sus créditos de carbono como un activo financiero (que puede tener en su balance) y solo los convierta en beneficio reputacional y legal cuando decida "ejecutarlos".

Para tus desarrolladores, este proceso se llama "Unlocking & Burning Flow". Aquí tienes el contexto técnico para que lo implementen:

📑 PROTOCOLO DE GESTIÓN CORPORATIVA: DEL ACTIVO AL IMPACTO
1. Adquisición y Custodia (Holding)
Cuando la aerolínea compra 1,000 créditos (1,000 NFTs):

On-chain: Los 1,000 NFTs se transfieren a la Wallet Corporativa de la empresa.

Dashboard B2B: La empresa ve en su inventario: "Patrimonio Verde: 1,000 Toneladas (NFTs activos)".

Estado: En este punto, la empresa posee el valor, pero aún no ha "compensado" oficialmente ante la ley o los gobiernos (no hay certificado de quema).

2. La Decisión de Compensar (The Execution)
Si la aerolínea decide compensar las emisiones de su flota de este mes (ej. 500 toneladas):

Acción en la App: El administrador selecciona 500 NFTs de su inventario y pulsa "Liquidación para Compensación".

Proceso de "Vaulting" Automático:

Esos 500 NFTs se bloquean en el contrato inteligente.

El sistema genera internamente los $CARBON correspondientes.

Quema Inmediata: El contrato ejecuta la función burn de esos tokens al instante.

3. Resultados de la Liquidación (Output)
Tras la quema de esos 500 créditos, el sistema dispara tres acciones automáticas:

Generación del Certificado de Compensación: Se emite un documento legal inmutable (con hash de blockchain) que la aerolínea puede presentar a entes reguladores o gobiernos para demostrar su neutralidad de carbono.

Emisión masiva de Signals: La aerolínea recibe un flujo masivo de Signals que impactan directamente en su Climate Action Score™.

Actualización de Rango: Si con estas 500 toneladas cruzan el umbral, su rango corporativo asciende (ej. de Biosphere Architect a Terra Legacy).

🛠️ NOTA TÉCNICA PARA LOS DESARROLLADORES (Backend/Blockchain)
Flujo de Función corporateBurn:

Solidity
function corporateBurn(uint256[] memory nftIds) public {
    for (uint256 i = 0; i < nftIds.length; i++) {
        // 1. Transferir NFT del Usuario al Vault
        carbonNft.transferFrom(msg.sender, address(this), nftIds[i]);
        // 2. Marcar NFT como "Redeemed/Burned"
        isRedeemed[nftIds[i]] = true;
    }
    // 3. Emitir Signals y Certificado Global
    uint256 totalGrams = nftIds.length * 1000000;
    reputationEngine.addSignals(msg.sender, totalGrams);
    emit GlobalOffsetCertificate(msg.sender, totalGrams, block.timestamp);
}
💡 Por qué esto es "Perfecto":
Flexibilidad: La aerolínea puede comprar créditos hoy (como inversión) y quemarlos el próximo año cuando los necesite para sus reportes de sostenibilidad.

Transparencia: El mercado ve cuántas toneladas están "en manos de privados" (NFTs) y cuántas han sido ya "devueltas al planeta" (Tokens quemados).

Doble Valor: El NFT es el título de propiedad; el Certificado de Quema es el título de cumplimiento.

crear panel de tesoreria de las empresas B2B 