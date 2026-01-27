export const MOCK_PROJECTS = [
    {
        id: 1,
        name: "Proyecto Amazonía Vital - Lote 001",
        location: "Leticia, Amazonas",
        coordinates: "4°05'24\"S 69°56'35\"W",
        area: "500 Hectáreas",
        standard: "RENARE Colombia",
        regId: "COL-RENARE-2026-001",
        status: "Verificado",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
        description: "Créditos de carbono generados mediante conservación de bosque primario en el departamento de Amazonas, Colombia.",
        auditor: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        reportIpfs: "ipfs://QmYwAPJzhjp2j656233zgLwaovN9v6uJSvg9z38h9806"
    },
    {
        id: 2,
        name: "Selva Guardián - Sector Norte",
        location: "Puerto Nariño, Amazonas",
        coordinates: "3°46'12\"S 70°22'10\"W",
        area: "1,200 Hectáreas",
        standard: "Gold Standard",
        regId: "COL-GS-2026-042",
        status: "Pendiente",
        image: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?auto=format&fit=crop&q=80&w=800",
        description: "Proyecto de restauración forestal y protección de biodiversidad en el trapecio amazónico.",
        auditor: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        reportIpfs: "ipfs://QmbWqBPzhjp2j656233zgLwaovN9v6uJSvg9z38h9807"
    }
];

export const MOCK_CERTIFICATE_TEMPLATE = {
    title: "Certificado de Compensación de Carbono",
    issuer: "Bank of Tierras Platform",
    blockchain: "Avalanche C-Chain",
    law: "Ley 1819 de 2016 - No Causación",
    details: {
        tonnes: "100 tCO2e",
        nit: "900.123.456-7",
        company: "EcoTrans S.A.S",
        date: "2026-01-17",
        txHash: "0x...hash_de_la_transaccion_en_mainnet"
    }
};
