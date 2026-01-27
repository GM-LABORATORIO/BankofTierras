// 🗿 Datos de Monumentos Culturales e Históricos Expandidos
// 🗿 Datos de Monumentos Culturales e Históricos Expandidos
export const CULTURAL_MONUMENTS = [
    // 🇨🇴 COLOMBIA (Prioridad Alta)
    {
        name: "Caño Cristales",
        coords: [-73.78, 2.23],
        type: "rainbow",
        size: 10,
        country: "Colombia",
        year: "Eterno",
        description: "El 'Río de los Cinco Colores', una maravilla natural única donde plantas acuáticas tiñen el agua de rojo, amarillo, verde y azul.",
        facts: ["Ubicado en la Sierra de la Macarena", "Fenómeno visible de julio a noviembre", "Protegido como parque nacional"]
    },
    {
        name: "Catedral de Sal",
        coords: [-73.99, 5.02],
        type: "church",
        size: 11,
        country: "Colombia",
        year: "1995",
        description: "Iglesia católica construida dentro de los túneles de una mina de sal a 200m bajo tierra. Una joya de ingeniería y fe.",
        facts: ["Primera maravilla de Colombia", "Capacidad para 8,000 personas", "Completamente tallada en sal"]
    },
    {
        name: "Ciudad Perdida",
        coords: [-73.93, 11.04],
        type: "temple",
        size: 9,
        country: "Colombia",
        year: "800 d.C.",
        description: "Teyuna, antiguo poblado indígena tayrona en la Sierra Nevada. 650 años más antigua que Machu Picchu.",
        facts: ["Construida por los Tayrona", "Accesible solo tras 4 días de caminata", "Redescubierta en 1972"]
    },
    { name: "Santuario de Las Lajas", coords: [-77.58, 0.82], type: "church", size: 10, country: "Colombia" },
    { name: "Castillo de San Felipe", coords: [-75.54, 10.42], type: "fort", size: 9, country: "Colombia" },
    { name: "Valle del Cocora", coords: [-75.45, 4.63], type: "palm", size: 10, country: "Colombia", description: "Hogar de la palma de cera, el árbol nacional de Colombia.", facts: ["Palmas más altas del mundo (60m)", "Paisaje andino único", "Hábitat del loro orejiamarillo"] },
    { name: "Parque Tayrona", coords: [-74.00, 11.30], type: "beach", size: 9, country: "Colombia" },
    { name: "Piedra del Peñol", coords: [-75.16, 6.22], type: "mountain", size: 10, country: "Colombia" },
    { name: "Chiribiquete", coords: [-72.50, 0.50], type: "mountain", size: 10, country: "Colombia", description: "La 'Capilla Sixtina' de la arqueología amazónica.", facts: ["Patrimonio Mixto UNESCO", "Pinturas rupestres de 20.000 años", "Tepuyes sagrados"] },

    // 🌎 AMÉRICA DEL SUR
    {
        name: "Cristo Redentor",
        coords: [-43.21, -22.95],
        type: "statue",
        size: 14,
        country: "Brasil",
        year: "1931",
        description: "Estatua Art Déco de Jesús en la cima del Corcovado, abrazando a Río de Janeiro.",
        facts: ["Mide 30 metros", "Una de las 7 Nuevas Maravillas", "Icono mundial de paz"]
    },
    {
        name: "Machu Picchu",
        coords: [-72.54, -13.16],
        type: "temple",
        size: 12,
        country: "Perú",
        year: "1450",
        description: "La ciudad perdida de los Incas, oculta en los Andes. Una obra maestra de arquitectura y astronomía.",
        facts: ["Nunca encontrada por los españoles", "Construcción antisísmica", "Patrimonio de la Humanidad"]
    },
    { name: "Cataratas del Iguazú", coords: [-54.44, -25.69], type: "waterfall", size: 12, country: "Arg/Bra" },
    { name: "Torres del Paine", coords: [-72.90, -50.94], type: "mountain", size: 10, country: "Chile" },
    { name: "Salar de Uyuni", coords: [-67.48, -20.13], type: "salt", size: 10, country: "Bolivia", description: "El mayor desierto de sal del mundo, visible desde el espacio.", facts: ["Espejo natural gigante", "Reserva de litio", "Hotel de sal"] },
    { name: "Islas Galápagos", coords: [-90.96, -0.80], type: "turtle", size: 10, country: "Ecuador" },
    { name: "Salto Ángel", coords: [-62.54, 5.97], type: "waterfall", size: 10, country: "Venezuela" },
    { name: "Perito Moreno", coords: [-73.03, -50.50], type: "glacier", size: 10, country: "Argentina" },
    { name: "Moai Rapa Nui", coords: [-109.35, -27.11], type: "statue", size: 11, country: "Chile" },
    { name: "Líneas de Nazca", coords: [-75.13, -14.73], type: "geoglyph", size: 9, country: "Perú" },

    // 🌎 AMÉRICA DEL NORTE Y CENTRAL
    { name: "Estatua de la Libertad", coords: [-74.04, 40.69], type: "statue", size: 13, country: "USA" },
    {
        name: "Chichén Itzá",
        coords: [-88.57, 20.68],
        type: "pyramid",
        size: 12,
        country: "México",
        year: "600 d.C.",
        description: "Impresionante ciudad maya con la pirámide de Kukulkán.",
        facts: ["Efecto de serpiente en equinoccios", "Calendario de piedra gigante", "Cenote sagrado"]
    },
    { name: "Teotihuacán", coords: [-98.84, 19.69], type: "pyramid", size: 11, country: "México" },
    { name: "Gran Cañón", coords: [-112.11, 36.10], type: "canyon", size: 12, country: "USA" },
    { name: "Tikal", coords: [-89.62, 17.22], type: "temple", size: 10, country: "Guatemala" },
    { name: "Blue Hole", coords: [-87.53, 17.31], type: "water", size: 9, country: "Belice" },
    { name: "Cataratas del Niágara", coords: [-79.07, 43.08], type: "waterfall", size: 10, country: "Canadá/USA" },
    { name: "Yellowstone", coords: [-110.58, 44.42], type: "geyser", size: 10, country: "USA" },
    { name: "Banff", coords: [-115.57, 51.17], type: "mountain", size: 10, country: "Canadá" },
    { name: "Monte Rushmore", coords: [-103.45, 43.87], type: "rock_art", size: 9, country: "USA" },
    { name: "Golden Gate", coords: [-122.47, 37.81], type: "bridge", size: 10, country: "USA" },

    // 🌍 EUROPA
    {
        name: "Torre Eiffel",
        coords: [2.29, 48.86],
        type: "tower",
        size: 13,
        country: "Francia",
        year: "1889",
        description: "El símbolo de hierro de París, construida para la Exposición Universal.",
        facts: ["Mide 324 metros", "Se encoge en invierno", "Visitada por 7M personas al año"]
    },
    { name: "Coliseo Romano", coords: [12.49, 41.89], type: "colosseum", size: 12, country: "Italia" },
    { name: "Acrópolis", coords: [23.73, 37.97], type: "temple", size: 11, country: "Grecia" },
    { name: "Sagrada Familia", coords: [2.17, 41.40], type: "church", size: 11, country: "España" },
    { name: "Stonehenge", coords: [-1.82, 51.17], type: "stone", size: 10, country: "UK" },
    { name: "Neuschwanstein", coords: [10.75, 47.55], type: "castle", size: 10, country: "Alemania" },
    { name: "Santorini", coords: [25.43, 36.39], type: "island", size: 9, country: "Grecia" },
    { name: "Venecia", coords: [12.31, 45.44], type: "gondola", size: 9, country: "Italia" },
    { name: "Torre de Pisa", coords: [10.39, 43.72], type: "tower_lean", size: 9, country: "Italia" },
    { name: "Big Ben", coords: [-0.12, 51.50], type: "clock", size: 11, country: "UK" },
    { name: "Catedral de San Basilio", coords: [37.62, 55.75], type: "dome_colors", size: 11, country: "Rusia" },
    { name: "Alhambra", coords: [-3.58, 37.17], type: "palace", size: 10, country: "España" },
    { name: "Mont Saint-Michel", coords: [-1.51, 48.63], type: "castle", size: 10, country: "Francia" },
    { name: "Dubrovnik", coords: [18.09, 42.65], type: "wall", size: 9, country: "Croacia" },
    { name: "Lago Ness", coords: [-4.52, 57.32], type: "water", size: 9, country: "Escocia" },

    // 🌏 ASIA
    {
        name: "Taj Mahal",
        coords: [78.04, 27.17],
        type: "dome",
        size: 13,
        country: "India",
        year: "1653",
        description: "Mausoleo de mármol blanco, símbolo del amor eterno.",
        facts: ["Incrustaciones de piedras preciosas", "Simetría perfecta", "Cambia de color con la luz"]
    },
    { name: "Gran Muralla", coords: [116.57, 40.43], type: "wall", size: 12, country: "China" },
    { name: "Angkor Wat", coords: [103.86, 13.41], type: "temple", size: 11, country: "Camboya" },
    { name: "Monte Fuji", coords: [138.72, 35.36], type: "volcano", size: 12, country: "Japón" },
    { name: "Petra", coords: [35.44, 30.32], type: "temple_rock", size: 11, country: "Jordania" },
    { name: "Burj Khalifa", coords: [55.27, 25.19], type: "skyscraper", size: 12, country: "UAE" },
    { name: "Bali", coords: [115.18, -8.40], type: "temple_bali", size: 9, country: "Indonesia" },
    { name: "Guerreros de Terracota", coords: [109.27, 34.38], type: "statue", size: 10, country: "China" },
    { name: "Fushimi Inari", coords: [135.77, 34.96], type: "torii", size: 9, country: "Japón" },
    { name: "Bahía de Ha Long", coords: [107.12, 20.91], type: "island_rock", size: 10, country: "Vietnam" },
    { name: "Bagan", coords: [94.85, 21.17], type: "temple", size: 10, country: "Myanmar" },
    { name: "Everest", coords: [86.92, 27.98], type: "mountain", size: 13, country: "Nepal" },
    { name: "Borobudur", coords: [110.20, -7.60], type: "stupa", size: 10, country: "Indonesia" },
    { name: "Ciudad Prohibida", coords: [116.39, 39.91], type: "palace", size: 11, country: "China" },

    // 🌍 ÁFRICA
    {
        name: "Pirámides de Giza",
        coords: [31.13, 29.97],
        type: "pyramid",
        size: 14,
        country: "Egipto",
        year: "2560 a.C.",
        description: "La única maravilla del mundo antiguo que perdura.",
        facts: ["Construida para Keops", "2.3 millones de bloques", "Alineación astronómica"]
    },
    { name: "Kilimanjaro", coords: [37.35, -3.06], type: "mountain", size: 11, country: "Tanzania" },
    { name: "Cataratas Victoria", coords: [25.85, -17.92], type: "waterfall", size: 11, country: "Zambia/Zimbabue" },
    { name: "Serengeti", coords: [34.83, -2.15], type: "lion", size: 10, country: "Tanzania", description: "La gran migración de ñus y cebras.", facts: ["Ecosistema más antiguo", "Patrimonio UNESCO", "Fauna salvaje increíble"] },
    { name: "Delta del Okavango", coords: [22.61, -19.28], type: "water", size: 9, country: "Botsuana" },
    { name: "Djemma el-Fna", coords: [-7.98, 31.62], type: "market", size: 9, country: "Marruecos" },
    { name: "Table Mountain", coords: [18.42, -33.92], type: "mountain_flat", size: 10, country: "Sudáfrica" },
    { name: "Lalibela", coords: [39.04, 12.03], type: "church_rock", size: 9, country: "Etiopía" },
    { name: "Esfinge", coords: [31.13, 29.97], type: "sphinx", size: 10, country: "Egipto" },

    // 🌏 OCEANÍA & POLOS
    { name: "Ópera de Sídney", coords: [151.21, -33.85], type: "modern", size: 12, country: "Australia" },
    { name: "Uluru", coords: [131.03, -25.34], type: "rock_red", size: 11, country: "Australia" },
    { name: "Gran Barrera de Coral", coords: [147.70, -18.28], type: "coral", size: 11, country: "Australia" },
    { name: "Milford Sound", coords: [167.95, -44.64], type: "fjord", size: 10, country: "Nueva Zelanda" },
    { name: "Hobbiton", coords: [175.68, -37.87], type: "hobbit", size: 9, country: "Nueva Zelanda" },
    { name: "Moorea", coords: [-149.83, -17.53], type: "island", size: 9, country: "Polinesia" },
    { name: "Antártida (Base)", coords: [-62.20, -64.77], type: "base", size: 8, country: "Antártida" }

];

/**
 * Generador procedural de vegetación masiva - POBĻACION INTENSIVA
 * Crea cientos de árboles distribuidos en zonas biológicas
 */
const generateVegetation = () => {
    // Semilla pseudo-aleatoria simple para consistencia entre renders
    let seed = 12345;
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const trees = [];

    // Configuración de zonas de vegetación [minLon, maxLon, minLat, maxLat, count, type]
    // Refinado para evitar océanos y mejorar clustering
    const zones = [
        // 🌿 AMAZONÍA (Dividida para precisión)
        // Amazonía Oeste (Perú/Colombia)
        [-75, -65, -10, 2, 60, "selva tropical"],
        // Amazonía Central (Brasil)
        [-65, -50, -10, 0, 80, "selva tropical"],
        // Escudo Guayanés (Venezuela/Guyana)
        [-65, -55, 2, 7, 30, "selva tropical"],

        // 🦍 ÁFRICA CENTRAL (Cuenca del Congo)
        [12, 28, -5, 5, 80, "selva tropical"],

        // 🦎 SUDESTE ASIÁTICO (Islas Específicas)
        // Borneo/Sumatra
        [100, 115, -4, 4, 30, "selva tropical"],
        // Nueva Guinea
        [135, 148, -8, -2, 25, "selva tropical"],

        // 🌲 TAIGA & BOSQUES (Norte)
        // Siberia Central
        [80, 120, 55, 65, 60, "taiga"],
        // Siberia Este
        [130, 160, 58, 68, 40, "taiga"],
        // Escandinavia
        [10, 25, 58, 68, 25, "taiga"],

        // 🦌 NORTEAMÉRICA
        // Alaska/Yukón
        [-150, -130, 60, 68, 30, "taiga"],
        // Bosque Boreal Canadiense
        [-120, -90, 52, 60, 50, "taiga"],
        // Este (Appalaches/Quebec)
        [-80, -70, 42, 50, 20, "taiga"],

        // 🐨 AUSTRALIA (Solo franja este verde)
        [146, 152, -35, -15, 15, "selva tropical"],
    ];

    zones.forEach(([minLon, maxLon, minLat, maxLat, count, type]) => {
        for (let i = 0; i < count; i++) {
            const lon = minLon + random() * (maxLon - minLon);
            const lat = minLat + random() * (maxLat - minLat);
            const baseSize = type === "selva tropical" ? 7 : 6;
            const size = baseSize + random() * 4; // Tamaño variable 6-11

            // Variación de tipo para más diversidad visual
            let finalType = type;
            if (type === "taiga" && random() > 0.8) finalType = "tundra"; // Algunos pinos nevados

            trees.push({ coords: [lon, lat], type: finalType, size });
        }
    });

    return trees;
};

// Iconos de bioma naturales (Generados + Manuales Específicos)
export const BIOME_ICONS = [
    // Andes (Montañas brillantes)
    { coords: [-75, -10], type: "andes", size: 12 },
    { coords: [-72, -15], type: "andes", size: 11 },
    { coords: [-70, -30], type: "andes", size: 12 },
    { coords: [-68, -22], type: "andes", size: 10 },

    // Rocosas
    { coords: [-115, 50], type: "andes", size: 11 },
    { coords: [-105, 40], type: "andes", size: 10 },

    // Himalayas
    { coords: [85, 28], type: "andes", size: 13 },
    { coords: [90, 29], type: "andes", size: 11 },
    { coords: [80, 32], type: "andes", size: 12 },

    // Alpes
    { coords: [10, 46], type: "andes", size: 9 },

    // Polos (Nieve dispersa)
    { coords: [0, 80], type: "tundra", size: 6 },
    { coords: [-45, 75], type: "tundra", size: 7 },
    { coords: [45, 78], type: "tundra", size: 6 },
    { coords: [-120, 72], type: "tundra", size: 7 },
    { coords: [120, 70], type: "tundra", size: 7 },

    { coords: [0, -70], type: "tundra", size: 7 },
    { coords: [60, -75], type: "tundra", size: 6 },
    { coords: [-60, -72], type: "tundra", size: 7 },

    // Océanos (Vida marina básica)
    { coords: [-30, 0], type: "océano", size: 8 },
    { coords: [-40, 30], type: "océano", size: 7 },
    { coords: [-140, 20], type: "océano", size: 9 },
    { coords: [-100, -20], type: "océano", size: 8 },
    { coords: [160, -20], type: "océano", size: 9 },
    { coords: [70, -10], type: "océano", size: 8 },

    // 🦜 FAUNA ANIMADA - Fase 4
    // 🇨🇴 Amazonía / Andes
    { name: "Cóndor de los Andes", coords: [-76.5, 3.5], type: "condor", size: 8 },
    { name: "Guacamayo Rojo", coords: [-70, -2], type: "bird", size: 7 },
    { name: "Guacamayo Azul", coords: [-65, -4], type: "bird", size: 7 },

    // 🇺🇸 Norteamérica
    { name: "Águila Calva", coords: [-100, 45], type: "eagle", size: 8 },

    // 🇪🇺 Europa
    { name: "Cigüeña", coords: [5, 48], type: "bird", size: 7 },

    // 🌏 Oceanía
    { name: "Cacatúa", coords: [140, -25], type: "bird", size: 7 },

    ...generateVegetation() // ¡400+ árboles generados!
];
