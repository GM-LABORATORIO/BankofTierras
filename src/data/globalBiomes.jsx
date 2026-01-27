import { Trees, Wind, CloudSun, Droplets, Bird, Anchor, Mountain, Palmtree, Waves } from 'lucide-react';

// 🌍 BASE DE DATOS GLOBAL DE BIOMAS EXPANDIDA (27 Regiones)
export const GLOBAL_BIOMES = {
    // ========================================
    // COLOMBIA (7 REGIONES NATURALES)
    // ========================================
    COLOMBIA_COFFEE_REGION: {
        coords: { lon: [-76, -75], lat: [4, 5.5] },
        name: "EJE CAFETERO: PAISAJE CULTURAL CAFETERO",
        biome: "Montaña Cafetera",
        species: ["Loro Orejiamarillo (Ognorhynchus icterotis)", "Oso de Anteojos (Tremarctos ornatus)", "Palma de Cera (Ceroxylon quindiuense)"],
        endangeredSpecies: ["Loro Orejiamarillo", "Oso de Anteojos", "Palma de Cera"],
        health: 78,
        status: "Patrimonio de la Humanidad UNESCO",
        threat: "Expansión urbana, monocultivos, cambio climático",
        funFact: "Hogar del mejor café del mundo. Manizales, Pereira y Armenia forman el triángulo cafetero. El Nevado del Ruiz (5,321m) es el volcán activo más alto de Colombia.",
        conservationTip: "Compra café de comercio justo. Apoya a los caficultores locales y la conservación de bosques de niebla.",
        donationLink: "https://www.parquesnacionales.gov.co/",
        liveCamUrl: "https://www.youtube.com/embed/live_stream?channel=UCVArkbPFFy_ojNW0PzEWUqg&autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800", // Café colombiano
            "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800", // Nevado del Ruiz
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800", // Plantación de café
            "https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=800"  // Valle del Cocora (Palmas de cera)
        ],
        icon: <Trees className="text-amber-600" />,
        basePrice: 340
    },
    COLOMBIA_ANDES: {
        coords: { lon: [-77, -72], lat: [5.5, 7] }, // Ajustado para excluir Eje Cafetero
        name: "ANDES COLOMBIANOS: NEVADOS Y PÁRAMOS",
        biome: "Montaña Andina",
        species: ["Cóndor Andino (Vultur gryphus)", "Oso de Anteojos (Tremarctos ornatus)", "Frailejón (Espeletia)"],
        endangeredSpecies: ["Oso de Anteojos", "Cóndor Andino", "Puma Andino"],
        health: 76,
        status: "Vulnerable",
        threat: "Minería, expansión agrícola, cambio climático",
        funFact: "Hogar de los nevados del Tolima y Santa Isabel. Los páramos almacenan el 70% del agua dulce de Colombia.",
        conservationTip: "Protege los páramos. Son fábricas de agua esenciales para millones de colombianos.",
        donationLink: "https://www.parquesnacionales.gov.co/",
        liveCamUrl: "https://www.youtube.com/embed/live_stream?channel=UCVArkbPFFy_ojNW0PzEWUqg&autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800", // Nevado
            "https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=800", // Páramo
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", // Montañas
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"  // Paisaje andino
        ],
        icon: <Mountain className="text-blue-200" />,
        basePrice: 320
    },
    COLOMBIA_AMAZON: {
        coords: { lon: [-75, -66], lat: [-4, 1] },
        name: "AMAZONÍA COLOMBIANA: SELVA VIRGEN",
        biome: "Selva Tropical",
        species: ["Jaguar (Panthera onca)", "Delfín Rosado (Inia geoffrensis)", "Anaconda Verde (Eunectes murinus)"],
        endangeredSpecies: ["Jaguar", "Delfín Rosado", "Nutria Gigante"],
        health: 88,
        status: "Protección Crítica",
        threat: "Deforestación, narcotráfico, minería ilegal",
        funFact: "6% del Amazonas está en Colombia. Alberga 674 especies de aves, más que toda Europa.",
        conservationTip: "Apoya productos sostenibles de comunidades indígenas amazónicas.",
        donationLink: "https://www.amazonfrontlines.org/",
        liveCamUrl: "https://www.youtube.com/embed/ydYDqZQpim8?autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
            "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800",
            "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800",
            "https://images.unsplash.com/photo-1601306353994-ff2ff2c3c3c3?w=800"
        ],
        icon: <Trees className="text-emerald-500" />,
        basePrice: 350
    },
    COLOMBIA_CARIBBEAN: {
        coords: { lon: [-77, -71], lat: [8, 12] },
        name: "CARIBE COLOMBIANO: COSTA DORADA",
        biome: "Bosque Seco Tropical",
        species: ["Flamenco del Caribe (Phoenicopterus ruber)", "Iguana Verde (Iguana iguana)", "Mangle Rojo (Rhizophora mangle)"],
        endangeredSpecies: ["Manatí del Caribe", "Tortuga Carey", "Caimán Aguja"],
        health: 71,
        status: "Amenazado",
        threat: "Turismo masivo, contaminación marina, sobrepesca",
        funFact: "Hogar del Parque Tayrona y la Sierra Nevada de Santa Marta, la montaña costera más alta del mundo.",
        conservationTip: "Usa protector solar biodegradable. Evita tocar corales en playas.",
        donationLink: "https://www.parquesnacionales.gov.co/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800"
        ],
        icon: <Palmtree className="text-cyan-400" />,
        basePrice: 280
    },
    COLOMBIA_PACIFIC: {
        coords: { lon: [-79, -77], lat: [1, 8] },
        name: "PACÍFICO COLOMBIANO: SELVA HÚMEDA",
        biome: "Selva Pluvial",
        species: ["Ballena Jorobada (Megaptera novaeangliae)", "Rana Venenosa (Phyllobates terribilis)", "Jaguar Negro"],
        endangeredSpecies: ["Ballena Jorobada", "Manatí", "Nutria de Río"],
        health: 82,
        status: "Biodiversidad Extrema",
        threat: "Minería ilegal, tala, contaminación",
        funFact: "Una de las regiones más lluviosas del planeta (hasta 13,000mm/año). Santuario de ballenas jorobadas.",
        conservationTip: "Apoya el ecoturismo de avistamiento de ballenas (julio-octubre).",
        donationLink: "https://www.worldwildlife.org/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
        ],
        icon: <Waves className="text-blue-500" />,
        basePrice: 310
    },
    COLOMBIA_ORINOQUIA: {
        coords: { lon: [-73, -66], lat: [2, 7] },
        name: "ORINOQUÍA: LLANOS ORIENTALES",
        biome: "Sabana Tropical",
        species: ["Chigüiro (Hydrochoerus hydrochaeris)", "Anaconda Llanera", "Garza Real (Ardea alba)"],
        endangeredSpecies: ["Jaguar Llanero", "Oso Palmero", "Delfín de Río"],
        health: 79,
        status: "Estable",
        threat: "Ganadería extensiva, monocultivos, explotación petrolera",
        funFact: "Los llanos se inundan 6 meses al año, creando un ecosistema único. Hogar del joropo y la cultura llanera.",
        conservationTip: "Consume carne de ganadería sostenible certificada.",
        donationLink: "https://www.parquesnacionales.gov.co/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800",
            "https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7?w=800"
        ],
        icon: <Wind className="text-yellow-500" />,
        basePrice: 240
    },
    COLOMBIA_INSULAR: {
        coords: { lon: [-82, -81], lat: [12, 13] },
        name: "REGIÓN INSULAR: SAN ANDRÉS Y PROVIDENCIA",
        biome: "Arrecife Coralino",
        species: ["Pez Ángel (Pomacanthidae)", "Tortuga Carey (Eretmochelys imbricata)", "Coral Cuerno de Alce"],
        endangeredSpecies: ["Tortuga Carey", "Coral Cuerno de Alce", "Tiburón Nodriza"],
        health: 68,
        status: "En Peligro",
        threat: "Sobrepesca, turismo no sostenible, blanqueamiento de coral",
        funFact: "El mar de los 7 colores. Reserva de Biosfera Seaflower, la tercera más grande del mundo.",
        conservationTip: "No compres productos de coral o carey. Son ilegales y amenazan el ecosistema.",
        donationLink: "https://www.coralina.gov.co/",
        liveCamUrl: "https://www.youtube.com/embed/QMbq4sRzSs4?autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
        ],
        icon: <Droplets className="text-cyan-300" />,
        basePrice: 290
    },

    // ========================================
    // AMÉRICA DEL SUR (Expandido - 20 Biomas)
    // ========================================

    // BRASIL (5 regiones)
    BRAZIL_MATA_ATLANTICA: {
        coords: { lon: [-48, -40], lat: [-28, -5] },
        name: "MATA ATLÁNTICA: BOSQUE ATLÁNTICO",
        biome: "Bosque Tropical Atlántico",
        species: ["Mono León Dorado (Leontopithecus rosalia)", "Tucán Toco (Ramphastos toco)", "Jaguar (Panthera onca)"],
        endangeredSpecies: ["Mono León Dorado", "Muriquí", "Guacamayo Jacinto"],
        health: 62,
        status: "En Peligro Crítico",
        threat: "Deforestación urbana, agricultura, fragmentación",
        funFact: "Solo queda 12% del bosque original. Uno de los ecosistemas más amenazados del mundo, pero con 20,000 especies de plantas.",
        conservationTip: "Apoya proyectos de reforestación en la Mata Atlántica. Cada árbol cuenta.",
        donationLink: "https://www.sosma.org.br/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
            "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800",
            "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800"
        ],
        icon: <Trees className="text-green-600" />,
        basePrice: 330
    },
    BRAZIL_CERRADO: {
        coords: { lon: [-55, -45], lat: [-24, -5] },
        name: "CERRADO: SABANA BRASILEÑA",
        biome: "Sabana Tropical",
        species: ["Oso Hormiguero Gigante (Myrmecophaga tridactyla)", "Lobo de Crin (Chrysocyon brachyurus)", "Armadillo Gigante"],
        endangeredSpecies: ["Lobo de Crin", "Jaguar del Cerrado", "Guacamayo Azul"],
        health: 58,
        status: "Vulnerable",
        threat: "Agricultura intensiva (soja), ganadería, incendios",
        funFact: "La sabana más biodiversa del mundo. Almacena agua para 8 de las 12 cuencas hidrográficas de Brasil.",
        conservationTip: "Consume productos certificados libres de deforestación del Cerrado.",
        donationLink: "https://www.wwf.org.br/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800",
            "https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7?w=800"
        ],
        icon: <Wind className="text-amber-500" />,
        basePrice: 270
    },
    BRAZIL_PANTANAL: {
        coords: { lon: [-58, -55], lat: [-22, -16] },
        name: "PANTANAL: HUMEDAL GIGANTE",
        biome: "Humedal Tropical",
        species: ["Jaguar (Panthera onca)", "Yacaré (Caiman yacare)", "Guacamayo Azul (Anodorhynchus hyacinthinus)"],
        endangeredSpecies: ["Jaguar", "Guacamayo Azul", "Oso Hormiguero Gigante"],
        health: 74,
        status: "Vulnerable",
        threat: "Incendios, ganadería, agricultura",
        funFact: "El humedal más grande del mundo. Se inunda 80% en época de lluvias, creando un paraíso de vida salvaje.",
        conservationTip: "Apoya proyectos de turismo de observación de jaguares.",
        donationLink: "https://www.worldwildlife.org/places/pantanal",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800",
            "https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7?w=800"
        ],
        icon: <Droplets className="text-green-400" />,
        basePrice: 310
    },
    BRAZIL_CAATINGA: {
        coords: { lon: [-45, -35], lat: [-17, -3] },
        name: "CAATINGA: BOSQUE SECO BRASILEÑO",
        biome: "Bosque Seco",
        species: ["Guacamayo de Spix (Cyanopsitta spixii)", "Tatú Bola (Tolypeutes tricinctus)", "Onza (Leopardus pardalis)"],
        endangeredSpecies: ["Guacamayo de Spix", "Tatú Bola", "Jaguar de Caatinga"],
        health: 55,
        status: "Amenazado",
        threat: "Desertificación, sobrepastoreo, tala para leña",
        funFact: "Único bioma exclusivamente brasileño. El guacamayo de Spix (de la película Rio) está extinto en estado salvaje.",
        conservationTip: "Apoya programas de reintroducción del guacamayo de Spix.",
        donationLink: "https://www.icmbio.gov.br/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800"
        ],
        icon: <Wind className="text-orange-400" />,
        basePrice: 220
    },
    BRAZIL_FERNANDO_NORONHA: {
        coords: { lon: [-32.5, -32.3], lat: [-4, -3.7] },
        name: "FERNANDO DE NORONHA: PARAÍSO MARINO",
        biome: "Archipiélago Oceánico",
        species: ["Delfín Rotador (Stenella longirostris)", "Tortuga Verde (Chelonia mydas)", "Tiburón Limón"],
        endangeredSpecies: ["Tortuga Verde", "Albatros de Patas Negras"],
        health: 85,
        status: "Protegido - Patrimonio UNESCO",
        threat: "Turismo no regulado, pesca ilegal",
        funFact: "21 islas volcánicas. Mejor lugar del mundo para ver delfines rotadores. Aguas cristalinas con visibilidad de 50m.",
        conservationTip: "Visita solo con operadores certificados. Límite de 450 turistas/día.",
        donationLink: "https://www.noronha.pe.gov.br/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800"
        ],
        icon: <Waves className="text-blue-400" />,
        basePrice: 360
    },

    // ARGENTINA (4 regiones)
    ARGENTINA_PAMPAS: {
        coords: { lon: [-65, -57], lat: [-39, -30] },
        name: "PAMPAS ARGENTINAS: LLANURA INFINITA",
        biome: "Pradera Templada",
        species: ["Ñandú (Rhea americana)", "Zorro Pampeano (Lycalopex gymnocercus)", "Venado de las Pampas"],
        endangeredSpecies: ["Venado de las Pampas", "Loica Pampeana"],
        health: 52,
        status: "En Peligro",
        threat: "Agricultura intensiva, ganadería, urbanización",
        funFact: "Una de las praderas más fértiles del mundo. Solo queda 1% de la pampa original.",
        conservationTip: "Apoya la ganadería regenerativa que restaura pastizales nativos.",
        donationLink: "https://www.avesargentinas.org.ar/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800",
            "https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7?w=800"
        ],
        icon: <Wind className="text-green-500" />,
        basePrice: 190
    },
    ARGENTINA_QUEBRADA_HUMAHUACA: {
        coords: { lon: [-65.5, -65], lat: [-24, -23] },
        name: "QUEBRADA DE HUMAHUACA: MONTAÑAS DE COLORES",
        biome: "Valle Andino",
        species: ["Vicuña (Vicugna vicugna)", "Cóndor Andino (Vultur gryphus)", "Chinchilla Andina"],
        endangeredSpecies: ["Chinchilla Andina", "Flamenco Andino"],
        health: 78,
        status: "Patrimonio UNESCO",
        threat: "Minería, turismo no sostenible",
        funFact: "Cerro de los 7 Colores en Purmamarca. Formaciones geológicas de 75 millones de años.",
        conservationTip: "Compra artesanías de comunidades locales. Evita productos de vicuña no certificada.",
        donationLink: "https://www.parquesnacionales.gob.ar/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ],
        icon: <Mountain className="text-orange-300" />,
        basePrice: 300
    },
    ARGENTINA_PENINSULA_VALDES: {
        coords: { lon: [-65, -63], lat: [-43, -42] },
        name: "PENÍNSULA VALDÉS: SANTUARIO MARINO",
        biome: "Costa Patagónica",
        species: ["Ballena Franca Austral (Eubalaena australis)", "Pingüino de Magallanes", "Elefante Marino del Sur"],
        endangeredSpecies: ["Ballena Franca Austral", "Lobo Marino"],
        health: 82,
        status: "Patrimonio UNESCO",
        threat: "Contaminación marina, pesca incidental",
        funFact: "Mejor lugar del mundo para ver ballenas francas (junio-diciembre). Más de 2,000 ballenas visitan cada año.",
        conservationTip: "Apoya tours de avistamiento responsable. Mantén distancia de 100m de las ballenas.",
        donationLink: "https://www.icb.org.ar/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
        ],
        icon: <Waves className="text-blue-500" />,
        basePrice: 340
    },
    ARGENTINA_IGUAZU: {
        coords: { lon: [-54.7, -54.4], lat: [-25.8, -25.5] },
        name: "IGUAZÚ: CATARATAS MONUMENTALES",
        biome: "Selva Paranaense",
        species: ["Tucán Grande (Ramphastos toco)", "Coatí (Nasua nasua)", "Jaguar (Panthera onca)"],
        endangeredSpecies: ["Jaguar", "Yaguareté", "Tapir"],
        health: 80,
        status: "Patrimonio UNESCO",
        threat: "Deforestación, represas, caza furtiva",
        funFact: "275 saltos de agua. La Garganta del Diablo tiene 80m de altura. Eleanor Roosevelt dijo: 'Poor Niagara'.",
        conservationTip: "Visita ambos lados (Argentina y Brasil). Apoya la conservación del corredor verde.",
        donationLink: "https://www.parquesnacionales.gob.ar/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"
        ],
        icon: <Droplets className="text-cyan-500" />,
        basePrice: 350
    },

    // CHILE (3 regiones)
    CHILE_PATAGONIA: {
        coords: { lon: [-75, -65], lat: [-55, -40] },
        name: "PATAGONIA CHILENA: TORRES DEL PAINE",
        biome: "Estepa y Glaciares",
        species: ["Puma (Puma concolor)", "Guanaco (Lama guanicoe)", "Cóndor Andino (Vultur gryphus)"],
        endangeredSpecies: ["Huemul", "Pudú"],
        health: 85,
        status: "Protegido",
        threat: "Cambio climático, retroceso glaciar",
        funFact: "Torres del Paine: 3 torres de granito de 2,500m. Glaciar Grey tiene 6km de frente.",
        conservationTip: "Practica Leave No Trace. Lleva toda tu basura de vuelta.",
        donationLink: "https://www.patagoniaparks.org/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
        ],
        icon: <Wind className="text-blue-300" />,
        basePrice: 180
    },
    CHILE_ATACAMA: {
        coords: { lon: [-70, -68], lat: [-27, -18] },
        name: "ATACAMA: DESIERTO MÁS ÁRIDO",
        biome: "Desierto Extremo",
        species: ["Vicuña (Vicugna vicugna)", "Flamenco Andino (Phoenicoparrus andinus)", "Zorro Culpeo (Lycalopex culpaeus)"],
        endangeredSpecies: ["Flamenco Andino", "Vicuña"],
        health: 81,
        status: "Extremo",
        threat: "Minería de litio, turismo no regulado",
        funFact: "El lugar más seco de la Tierra. Algunas zonas no han visto lluvia en 400 años. Cielos perfectos para astronomía.",
        conservationTip: "Visita observatorios astronómicos certificados. Respeta las zonas protegidas.",
        donationLink: "https://www.conaf.cl/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ],
        icon: <Wind className="text-orange-300" />,
        basePrice: 200
    },
    CHILE_VALDIVIAN_FOREST: {
        coords: { lon: [-74, -71], lat: [-43, -39] },
        name: "BOSQUE VALDIVIANO: SELVA TEMPLADA",
        biome: "Bosque Templado Lluvioso",
        species: ["Pudú (Pudu puda)", "Monito del Monte (Dromiciops gliroides)", "Alerce (Fitzroya cupressoides)"],
        endangeredSpecies: ["Pudú", "Huemul", "Alerce Milenario"],
        health: 72,
        status: "Vulnerable",
        threat: "Tala, plantaciones de pino, incendios",
        funFact: "Uno de los 5 bosques templados lluviosos del mundo. Alerces de 3,600 años, los árboles más antiguos de Sudamérica.",
        conservationTip: "Compra madera certificada FSC. Evita productos de alerce no autorizado.",
        donationLink: "https://www.conaf.cl/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ],
        icon: <Trees className="text-green-700" />,
        basePrice: 290
    },

    // PERÚ (2 regiones)
    PERU_AMAZON: {
        coords: { lon: [-76, -68], lat: [-13, -0] },
        name: "AMAZONÍA PERUANA: RESERVA NACIONAL PACAYA-SAMIRIA",
        biome: "Selva Amazónica",
        species: ["Delfín Rosado (Inia geoffrensis)", "Perezoso de Tres Dedos", "Guacamayo Escarlata"],
        endangeredSpecies: ["Delfín Rosado", "Manatí Amazónico", "Jaguar"],
        health: 86,
        status: "Protección Alta",
        threat: "Tala ilegal, minería de oro, narcotráfico",
        funFact: "Pacaya-Samiria: 2da reserva más grande de Perú. 'Selva de los Espejos' por sus aguas reflejantes.",
        conservationTip: "Apoya ecoturismo comunitario. Compra artesanías de comunidades indígenas.",
        donationLink: "https://www.rainforestpartnership.org/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
            "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800"
        ],
        icon: <Trees className="text-emerald-600" />,
        basePrice: 340
    },
    PERU_MACHU_PICCHU: {
        coords: { lon: [-72.6, -72.4], lat: [-13.3, -13.1] },
        name: "MACHU PICCHU: SANTUARIO INCA",
        biome: "Bosque Nuboso Andino",
        species: ["Oso de Anteojos (Tremarctos ornatus)", "Gallito de las Rocas (Rupicola peruvianus)", "Orquídeas (400+ especies)"],
        endangeredSpecies: ["Oso de Anteojos", "Tapir de Montaña"],
        health: 75,
        status: "Patrimonio UNESCO",
        threat: "Turismo masivo, deslizamientos, cambio climático",
        funFact: "Ciudad inca del siglo XV a 2,430m. Recibe 1.5 millones de visitantes/año. Límite de 2,500/día desde 2019.",
        conservationTip: "Reserva con meses de anticipación. Sigue el Camino Inca con guías certificados.",
        donationLink: "https://www.machupicchu.gob.pe/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ],
        icon: <Mountain className="text-amber-600" />,
        basePrice: 370
    },

    // ECUADOR (1 región)
    ECUADOR_GALAPAGOS: {
        coords: { lon: [-92, -89], lat: [-2, 0] },
        name: "GALÁPAGOS: LABORATORIO DE EVOLUCIÓN",
        biome: "Islas Volcánicas",
        species: ["Tortuga Gigante (Chelonoidis nigra)", "Iguana Marina (Amblyrhynchus cristatus)", "Pinzón de Darwin"],
        endangeredSpecies: ["Tortuga Gigante", "Pingüino de Galápagos", "Cormorán No Volador"],
        health: 83,
        status: "Patrimonio de la Humanidad",
        threat: "Especies invasoras, turismo, cambio climático",
        funFact: "Inspiró la teoría de la evolución de Darwin. 97% de especies terrestres son endémicas.",
        conservationTip: "Visita solo con operadores certificados. No toques ni alimentes animales.",
        donationLink: "https://www.galapagos.org/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800"
        ],
        icon: <Bird className="text-orange-500" />,
        basePrice: 380
    },

    // ========================================
    // AMÉRICA DEL NORTE
    // ========================================
    YELLOWSTONE: {
        coords: { lon: [-111, -109], lat: [44, 45] },
        name: "YELLOWSTONE: ECOSISTEMA GEOTERMAL",
        biome: "Bosque Templado",
        species: ["Bisonte Americano (Bison bison)", "Lobo Gris (Canis lupus)", "Oso Grizzly (Ursus arctos)"],
        endangeredSpecies: ["Oso Grizzly", "Lince Canadiense"],
        health: 88,
        status: "Protegido",
        threat: "Turismo masivo, cambio climático",
        funFact: "Primer parque nacional del mundo (1872). Tiene más de 10,000 características geotermales.",
        conservationTip: "Respeta distancias con fauna salvaje. Mínimo 100m de osos y lobos.",
        donationLink: "https://www.yellowstone.org/",
        liveCamUrl: "https://www.youtube.com/embed/live_stream?channel=UCVArkbPFFy_ojNW0PzEWUqg&autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800"
        ],
        icon: <Trees className="text-green-600" />,
        basePrice: 280
    },

    // ========================================
    // ÁFRICA
    // ========================================
    SERENGETI: {
        coords: { lon: [34, 36], lat: [-3, -1] },
        name: "SERENGETI: GRAN MIGRACIÓN",
        biome: "Sabana",
        species: ["León (Panthera leo)", "Elefante Africano (Loxodonta africana)", "Jirafa (Giraffa camelopardalis)"],
        endangeredSpecies: ["Rinoceronte Negro", "Guepardo", "Elefante Africano"],
        health: 79,
        status: "Vulnerable",
        threat: "Caza furtiva, conflicto humano-fauna",
        funFact: "Hogar de la migración más grande de mamíferos terrestres: 1.5 millones de ñus.",
        conservationTip: "No compres marfil ni productos de fauna silvestre. Apoya ecoturismo certificado.",
        donationLink: "https://www.awf.org/",
        liveCamUrl: "https://www.youtube.com/embed/ydYDqZQpim8?autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800",
            "https://images.unsplash.com/photo-1534567110243-e9d5a5e5c2f7?w=800"
        ],
        icon: <Wind className="text-yellow-600" />,
        basePrice: 320
    },
    SAHARA: {
        coords: { lon: [-15, 35], lat: [15, 30] },
        name: "SAHARA: DESIERTO EXTREMO",
        biome: "Desierto Árido",
        species: ["Dromedario (Camelus dromedarius)", "Fénec (Vulpes zerda)", "Addax (Addax nasomaculatus)"],
        endangeredSpecies: ["Addax", "Gacela Dama", "Guepardo del Sahara"],
        health: 65,
        status: "Extremo",
        threat: "Desertificación, sobrepastoreo",
        funFact: "El desierto cálido más grande del mundo. Temperaturas de hasta 58°C.",
        conservationTip: "Reduce tu huella de carbono. El cambio climático expande los desiertos.",
        donationLink: "https://www.scf-uk.org/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"
        ],
        icon: <Wind className="text-orange-400" />,
        basePrice: 120
    },
    CONGO_BASIN: {
        coords: { lon: [10, 30], lat: [-5, 5] },
        name: "CUENCA DEL CONGO: SEGUNDO PULMÓN",
        biome: "Selva Tropical",
        species: ["Gorila de Montaña (Gorilla beringei)", "Okapi (Okapia johnstoni)", "Bonobo (Pan paniscus)"],
        endangeredSpecies: ["Gorila de Montaña", "Elefante de Bosque", "Bonobo"],
        health: 68,
        status: "En Peligro Crítico",
        threat: "Tala ilegal, minería de coltán, caza furtiva",
        funFact: "Segunda selva tropical más grande. Absorbe 1.2 mil millones de toneladas de CO2/año.",
        conservationTip: "Recicla tu celular. El coltán (mineral en baterías) causa destrucción masiva.",
        donationLink: "https://www.worldwildlife.org/places/congo-basin",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
            "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800"
        ],
        icon: <Trees className="text-green-700" />,
        basePrice: 340
    },

    // ========================================
    // ASIA
    // ========================================
    SIBERIAN_TAIGA: {
        coords: { lon: [60, 180], lat: [50, 70] },
        name: "TAIGA SIBERIANA: BOSQUE BOREAL",
        biome: "Taiga",
        species: ["Tigre Siberiano (Panthera tigris altaica)", "Oso Pardo (Ursus arctos)", "Reno (Rangifer tarandus)"],
        endangeredSpecies: ["Tigre Siberiano", "Leopardo de Amur"],
        health: 82,
        status: "Reserva de Carbono",
        threat: "Tala industrial, incendios forestales",
        funFact: "El bosque más grande del mundo. Almacena más carbono que todas las selvas tropicales juntas.",
        conservationTip: "Evita productos de madera no certificada FSC. Apoya energías renovables.",
        donationLink: "https://www.worldwildlife.org/places/amur-heilong",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ],
        icon: <Trees className="text-emerald-700" />,
        basePrice: 175
    },
    HIMALAYAS: {
        coords: { lon: [70, 95], lat: [27, 35] },
        name: "HIMALAYA: TECHO DEL MUNDO",
        biome: "Montaña Alta",
        species: ["Leopardo de las Nieves (Panthera uncia)", "Panda Rojo (Ailurus fulgens)", "Yak (Bos grunniens)"],
        endangeredSpecies: ["Leopardo de las Nieves", "Panda Rojo", "Rinoceronte Indio"],
        health: 74,
        status: "Vulnerable",
        threat: "Cambio climático, retroceso glaciar, caza furtiva",
        funFact: "Fuente de agua para 1.3 mil millones de personas. Los glaciares se derriten 10% más rápido cada década.",
        conservationTip: "Reduce emisiones de CO2. El deshielo glaciar amenaza el suministro de agua de Asia.",
        donationLink: "https://www.snowleopard.org/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
        ],
        icon: <CloudSun className="text-blue-200" />,
        basePrice: 290
    },

    // ========================================
    // OCEANÍA
    // ========================================
    GREAT_BARRIER_REEF: {
        coords: { lon: [145, 153], lat: [-24, -10] },
        name: "GRAN BARRERA DE CORAL",
        biome: "Arrecife de Coral",
        species: ["Tortuga Verde (Chelonia mydas)", "Pez Payaso (Amphiprioninae)", "Tiburón de Arrecife (Carcharhinus melanopterus)"],
        endangeredSpecies: ["Tortuga Verde", "Dugongo", "Coral Cuerno de Ciervo"],
        health: 58,
        status: "En Peligro Crítico",
        threat: "Blanqueamiento por calentamiento, acidificación oceánica",
        funFact: "El ser vivo más grande del planeta. Visible desde el espacio. Ha perdido 50% de coral desde 1995.",
        conservationTip: "Usa protector solar reef-safe. Químicos tradicionales matan corales.",
        donationLink: "https://www.barrierreef.org/",
        liveCamUrl: "https://www.youtube.com/embed/QMbq4sRzSs4?autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
        ],
        icon: <Droplets className="text-blue-400" />,
        basePrice: 380
    },

    // ========================================
    // EUROPA
    // ========================================
    SCANDINAVIAN_FOREST: {
        coords: { lon: [5, 30], lat: [55, 70] },
        name: "BOSQUE ESCANDINAVO",
        biome: "Bosque Boreal",
        species: ["Alce (Alces alces)", "Lince Euroasiático (Lynx lynx)", "Glotón (Gulo gulo)"],
        endangeredSpecies: ["Glotón", "Oso Pardo Escandinavo"],
        health: 90,
        status: "Bien Gestionado",
        threat: "Tala comercial, fragmentación de hábitat",
        funFact: "Modelo mundial de silvicultura sostenible. 70% del bosque está certificado.",
        conservationTip: "Compra madera certificada FSC. Apoya la gestión forestal sostenible.",
        donationLink: "https://www.wwf.se/",
        liveCamUrl: null,
        photoGallery: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800"
        ],
        icon: <Trees className="text-green-600" />,
        basePrice: 200
    },

    // ========================================
    // REGIONES POLARES
    // ========================================
    ARCTIC_TUNDRA: {
        coords: { lon: [-180, 180], lat: [65, 90] },
        name: "TUNDRA ÁRTICA: PERMAFROST",
        biome: "Tundra",
        species: ["Oso Polar (Ursus maritimus)", "Reno (Rangifer tarandus)", "Zorro Ártico (Vulpes lagopus)"],
        endangeredSpecies: ["Oso Polar", "Morsa", "Ballena Beluga"],
        health: 62,
        status: "En Peligro Crítico",
        threat: "Calentamiento global, deshielo del hielo marino",
        funFact: "Se calienta 2x más rápido que el resto del planeta. El Ártico podría estar sin hielo en verano para 2040.",
        conservationTip: "Reduce tu huella de carbono. Cada tonelada de CO2 derrite 3m² de hielo ártico.",
        donationLink: "https://www.worldwildlife.org/places/arctic",
        liveCamUrl: "https://www.youtube.com/embed/live_stream?channel=UCVArkbPFFy_ojNW0PzEWUqg&autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
        ],
        icon: <CloudSun className="text-blue-100" />,
        basePrice: 125
    },
    ANTARCTICA: {
        coords: { lon: [-180, 180], lat: [-90, -60] },
        name: "ANTÁRTIDA: CONTINENTE HELADO",
        biome: "Hielo Permanente",
        species: ["Pingüino Emperador (Aptenodytes forsteri)", "Foca de Weddell (Leptonychotes weddellii)", "Ballena Azul (Balaenoptera musculus)"],
        endangeredSpecies: ["Ballena Azul", "Pingüino Emperador"],
        health: 70,
        status: "Protegido por Tratado",
        threat: "Calentamiento global, acidificación oceánica",
        funFact: "Contiene 90% del hielo mundial. Si se derritiera, el nivel del mar subiría 60 metros.",
        conservationTip: "Apoya energías renovables. El deshielo antártico es irreversible si superamos 2°C.",
        donationLink: "https://www.antarcticaproject.org/",
        liveCamUrl: "https://www.youtube.com/embed/7Iy5TXaXCCk?autoplay=1&mute=1",
        photoGallery: [
            "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800"
        ],
        icon: <CloudSun className="text-white" />,
        basePrice: 100
    }
};

// Función para detectar bioma basado en coordenadas geográficas
export const detectBiomeByLocation = (lon, lat) => {
    // Buscar en biomas específicos primero (ahora con 16+ regiones)
    for (const [key, biome] of Object.entries(GLOBAL_BIOMES)) {
        const { coords } = biome;
        if (
            lon >= coords.lon[0] && lon <= coords.lon[1] &&
            lat >= coords.lat[0] && lat <= coords.lat[1]
        ) {
            return biome;
        }
    }
    return null; // No encontrado, usar lógica procedural
};

// 📅 SISTEMA DE ADOPCIÓN TEMPORAL
export const ADOPTION_PLANS = [
    {
        id: 'plan_24m',
        duration: 24,
        name: '2 Años',
        discount: 0,
        badge: '🌱 Starter',
        benefits: ['Certificado Digital', 'Reporte Anual', 'Badge de Perfil']
    },
    {
        id: 'plan_36m',
        duration: 36,
        name: '3 Años',
        discount: 10,
        badge: '🌿 Guardian',
        benefits: ['Certificado Digital', 'Reporte Semestral', 'Acceso a Live-Cams', 'Stickers']
    },
    {
        id: 'plan_48m',
        duration: 48,
        name: '4 Años',
        discount: 15,
        badge: '🌳 Protector',
        benefits: ['Certificado Físico', 'Reporte Trimestral', 'Acceso Live-Cams', 'Kit de Semillas', 'Camiseta']
    },
    {
        id: 'plan_60m',
        duration: 60,
        name: '5 Años',
        discount: 20,
        badge: '🏆 Champion',
        benefits: ['Certificado Premium', 'Reporte Mensual', 'Live-Cams 24/7', 'Merchandising Completo', 'Webinar Exclusivo']
    },
    {
        id: 'plan_perpetual',
        duration: 999, // Perpetual
        name: 'Perpetuo',
        discount: 0, // Multiplier will be handled in logic (5x of 5yr price)
        badge: '💎 Perpetual',
        benefits: ['Propiedad NFT Vitalicia', 'Derechos de Gobernanza 5x', 'Boleto de Viaje VIP', 'Acceso Expedición Científica']
    }
];
