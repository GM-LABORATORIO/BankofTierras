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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cascadas_Manto_de_La_Virgen_-_Ca%C3%B1o_Cristales_-_La_Macarena_-_Meta_-_Colombia.jpg/640px-Cascadas_Manto_de_La_Virgen_-_Ca%C3%B1o_Cristales_-_La_Macarena_-_Meta_-_Colombia.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Zipaquira_-_Catedral_de_Sal_%2822%29.JPG/640px-Zipaquira_-_Catedral_de_Sal_%2822%29.JPG",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Lost_City_Ruins.jpg/640px-Lost_City_Ruins.jpg",
        description: "Teyuna, antiguo poblado indígena tayrona en la Sierra Nevada. 650 años más antigua que Machu Picchu.",
        facts: ["Construida por los Tayrona", "Accesible solo tras 4 días de caminata", "Redescubierta en 1972"]
    },
    { name: "Santuario de Las Lajas", coords: [-77.58, 0.82], type: "church", size: 10, country: "Colombia", image: "https://images.unsplash.com/photo-1594493013710-3f8fcd6ea6ed?q=80&w=1331" },
    { name: "Castillo de San Felipe", coords: [-75.54, 10.42], type: "fort", size: 9, country: "Colombia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Castillo_San_Felipe_de_Barajas%2C_Cartagena_16.jpg/640px-Castillo_San_Felipe_de_Barajas%2C_Cartagena_16.jpg" },
    { name: "Valle del Cocora", coords: [-75.45, 4.63], type: "palm", size: 10, country: "Colombia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Valle_del_cocora_-_wax_palm_02.jpg/640px-Valle_del_cocora_-_wax_palm_02.jpg", description: "Hogar de la palma de cera, el árbol nacional de Colombia.", facts: ["Palmas más altas del mundo (60m)", "Paisaje andino único", "Hábitat del loro orejiamarillo"] },
    { name: "Parque Tayrona", coords: [-74.00, 11.30], type: "beach", size: 9, country: "Colombia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Tayrona_National_Park_utanf%C3%B6r_Santa_Marta.jpg/640px-Tayrona_National_Park_utanf%C3%B6r_Santa_Marta.jpg" },
    { name: "Piedra del Peñol", coords: [-75.16, 6.22], type: "mountain", size: 10, country: "Colombia", image: "https://images.unsplash.com/photo-1634602771420-a6314ff9bfc0?q=80&w=1167" },
    { name: "Chiribiquete", coords: [-72.50, 0.50], type: "mountain", size: 10, country: "Colombia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Chiribiquete_view.jpg/640px-Chiribiquete_view.jpg", description: "La 'Capilla Sixtina' de la arqueología amazónica.", facts: ["Patrimonio Mixto UNESCO", "Pinturas rupestres de 20.000 años", "Tepuyes sagrados"] },

    // 🌎 AMÉRICA DEL SUR
    {
        name: "Cristo Redentor",
        coords: [-43.21, -22.95],
        type: "statue",
        size: 14,
        country: "Brasil",
        year: "1931",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Redentor_Over_Clouds_1.jpg/640px-Redentor_Over_Clouds_1.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Machu_Picchu%2C_Per%C3%BA%2C_2015-07-30%2C_DD_60.JPG/640px-Machu_Picchu%2C_Per%C3%BA%2C_2015-07-30%2C_DD_60.JPG",
        description: "La ciudad perdida de los Incas, oculta en los Andes. Una obra maestra de arquitectura y astronomía.",
        facts: ["Nunca encontrada por los españoles", "Construcción antisísmica", "Patrimonio de la Humanidad"]
    },
    { name: "Cataratas del Iguazú", coords: [-54.44, -25.69], type: "waterfall", size: 12, country: "Arg/Bra", image: "https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=400" },
    { name: "Torres del Paine", coords: [-72.90, -50.94], type: "mountain", size: 10, country: "Chile", image: "https://images.unsplash.com/photo-1510011579267-ee2ba09c4ad7?q=80&w=400" },
    { name: "Salar de Uyuni", coords: [-67.48, -20.13], type: "salt", size: 10, country: "Bolivia", image: "https://images.unsplash.com/photo-1463123081488-789f99849c48?q=80&w=400", description: "El mayor desierto de sal del mundo, visible desde el espacio.", facts: ["Espejo natural gigante", "Reserva de litio", "Hotel de sal"] },
    { name: "Islas Galápagos", coords: [-90.96, -0.80], type: "turtle", size: 10, country: "Ecuador", image: "https://images.unsplash.com/photo-1548545812-7889311e9f16?q=80&w=400" },
    { name: "Salto Ángel", coords: [-62.54, 5.97], type: "waterfall", size: 10, country: "Venezuela", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Paisajes-de-venezuela-salto-angel.jpg/640px-Paisajes-de-venezuela-salto-angel.jpg" },
    { name: "Perito Moreno", coords: [-73.03, -50.50], type: "glacier", size: 10, country: "Argentina", image: "https://images.unsplash.com/photo-1628103723386-b4131ded69ba?q=80&w=400" },
    { name: "Moai Rapa Nui", coords: [-109.35, -27.11], type: "statue", size: 11, country: "Chile", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Moai_Rapa_Nui.jpg/640px-Moai_Rapa_Nui.jpg" },
    { name: "Líneas de Nazca", coords: [-75.13, -14.73], type: "geoglyph", size: 9, country: "Perú", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_59.JPG/640px-L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_59.JPG" },

    // 🌎 AMÉRICA DEL NORTE Y CENTRAL
    { name: "Estatua de la Libertad", coords: [-74.04, 40.69], type: "statue", size: 13, country: "USA", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Statue_of_Liberty%2C_New_York_City%2C_20231001_1037_0857.jpg/640px-Statue_of_Liberty%2C_New_York_City%2C_20231001_1037_0857.jpg" },
    {
        name: "Chichén Itzá",
        coords: [-88.57, 20.68],
        type: "pyramid",
        size: 12,
        country: "México",
        year: "600 d.C.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Chichen_Itza_Observatory_2_1.jpg/640px-Chichen_Itza_Observatory_2_1.jpg",
        description: "Impresionante ciudad maya con la pirámide de Kukulkán.",
        facts: ["Efecto de serpiente en equinoccios", "Calendario de piedra gigante", "Cenote sagrado"]
    },
    { name: "Teotihuacán", coords: [-98.84, 19.69], type: "pyramid", size: 11, country: "México", image: "https://images.unsplash.com/photo-1585435465945-bef5a93f8849?q=80&w=400" },
    { name: "Gran Cañón", coords: [-112.11, 36.10], type: "canyon", size: 12, country: "USA", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6040.jpg/640px-Grand_Canyon_%28Arizona%2C_USA%29%2C_South_Rim_nahe_Tusayan_--_2012_--_6040.jpg" },
    { name: "Tikal", coords: [-89.62, 17.22], type: "temple", size: 10, country: "Guatemala", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Parque_Tikal_Guatemala_2019.jpg/640px-Parque_Tikal_Guatemala_2019.jpg" },
    { name: "Blue Hole", coords: [-87.53, 17.31], type: "water", size: 9, country: "Belice", image: "https://images.unsplash.com/photo-1536643763261-7bf099905c90?q=80&w=400" },
    { name: "Cataratas del Niágara", coords: [-79.07, 43.08], type: "waterfall", size: 10, country: "Canadá/USA", image: "https://images.unsplash.com/photo-1531737212413-667205e2cda7?q=80&w=400" },
    { name: "Yellowstone", coords: [-110.58, 44.42], type: "geyser", size: 10, country: "USA", image: "https://images.unsplash.com/photo-1533119262733-1ec9929a08e1?q=80&w=400" },
    { name: "Banff", coords: [-115.57, 51.17], type: "mountain", size: 10, country: "Canadá", image: "https://images.unsplash.com/photo-1533614767277-2da3658f8445?q=80&w=400" },
    { name: "Monte Rushmore", coords: [-103.45, 43.87], type: "rock_art", size: 9, country: "USA", image: "https://images.unsplash.com/photo-1634125816990-25e80455fc76?q=80&w=400" },
    { name: "Golden Gate", coords: [-122.47, 37.81], type: "bridge", size: 10, country: "USA", image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=400" },

    // 🌍 EUROPA
    {
        name: "Torre Eiffel",
        coords: [2.29, 48.86],
        type: "tower",
        size: 13,
        country: "Francia",
        year: "1889",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Torre_Eiffel%2C_Par%C3%ADs%2C_Francia%2C_2022-10-29%2C_DD_158-160_HDR.jpg/640px-Torre_Eiffel%2C_Par%C3%ADs%2C_Francia%2C_2022-10-29%2C_DD_158-160_HDR.jpg",
        description: "El símbolo de hierro de París, construida para la Exposición Universal.",
        facts: ["Mide 324 metros", "Se encoge en invierno", "Visitada por 7M personas al año"]
    },
    { name: "Coliseo Romano", coords: [12.49, 41.89], type: "colosseum", size: 12, country: "Italia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Rom_%28IT%29%2C_Kolosseum_--_2024_--_0610.jpg/640px-Rom_%28IT%29%2C_Kolosseum_--_2024_--_0610.jpg" },
    { name: "Acrópolis", coords: [23.73, 37.97], type: "temple", size: 11, country: "Grecia", image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=400" },
    { name: "Sagrada Familia", coords: [2.17, 41.40], type: "church", size: 11, country: "España", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/TEMPLE_EXPIATORI_DE_LA_SAGRADA_FAM%C3%8DLIA_24012021_%281%29_21.jpg/640px-TEMPLE_EXPIATORI_DE_LA_SAGRADA_FAM%C3%8DLIA_24012021_%281%29_21.jpg" },
    { name: "Stonehenge", coords: [-1.82, 51.17], type: "stone", size: 10, country: "UK", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/TJDW_Stonehenge_20111107.tif/lossy-page1-640px-TJDW_Stonehenge_20111107.tif.jpg" },
    { name: "Neuschwanstein", coords: [10.75, 47.55], type: "castle", size: 10, country: "Alemania", image: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?q=80&w=400" },
    { name: "Santorini", coords: [25.43, 36.39], type: "island", size: 9, country: "Grecia", image: "https://images.unsplash.com/photo-1570077188670-e3a8d09ac7ff?q=80&w=400" },
    { name: "Venecia", coords: [12.31, 45.44], type: "gondola", size: 9, country: "Italia", image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=400" },
    { name: "Torre de Pisa", coords: [10.39, 43.72], type: "tower_lean", size: 9, country: "Italia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/The_Duomo_and_Tower_of_Pisa_at_sunrise.jpg/640px-The_Duomo_and_Tower_of_Pisa_at_sunrise.jpg" },
    { name: "Big Ben", coords: [-0.12, 51.50], type: "clock", size: 11, country: "UK", image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=400" },
    { name: "Catedral de San Basilio", coords: [37.62, 55.75], type: "dome_colors", size: 11, country: "Rusia", image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=400" },
    { name: "Alhambra", coords: [-3.58, 37.17], type: "palace", size: 10, country: "España", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg/640px-Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg" },
    { name: "Mont Saint-Michel", coords: [-1.51, 48.63], type: "castle", size: 10, country: "Francia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/MSM_sunset_02.JPG/640px-MSM_sunset_02.JPG" },
    { name: "Dubrovnik", coords: [18.09, 42.65], type: "wall", size: 9, country: "Croacia", image: "https://images.unsplash.com/photo-1555990540-39e246995b0c?q=80&w=400" },
    { name: "Lago Ness", coords: [-4.52, 57.32], type: "water", size: 9, country: "Escocia", image: "https://images.unsplash.com/photo-1536643763261-7bf099905c90?q=80&w=400" },

    // 🌏 ASIA
    {
        name: "Taj Mahal",
        coords: [78.04, 27.17],
        type: "dome",
        size: 13,
        country: "India",
        year: "1653",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Taj_Mahal%2C_Agra%2C_India_edit2.jpg/640px-Taj_Mahal%2C_Agra%2C_India_edit2.jpg",
        description: "Mausoleo de mármol blanco, símbolo del amor eterno.",
        facts: ["Incrustaciones de piedras preciosas", "Simetría perfecta", "Cambia de color con la luz"]
    },
    { name: "Gran Muralla", coords: [116.57, 40.43], type: "wall", size: 12, country: "China", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/20090529_Great_Wall_8216.jpg/640px-20090529_Great_Wall_8216.jpg" },
    { name: "Angkor Wat", coords: [103.86, 13.41], type: "temple", size: 11, country: "Camboya", image: "https://images.unsplash.com/photo-1544413647-b539a2edf083?q=80&w=400" },
    { name: "Monte Fuji", coords: [138.72, 35.36], type: "volcano", size: 12, country: "Japón", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400" },
    { name: "Petra", coords: [35.44, 30.32], type: "temple_rock", size: 11, country: "Jordania", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/The_Monastery%2C_Petra%2C_Jordan8.jpg/640px-The_Monastery%2C_Petra%2C_Jordan8.jpg" },
    { name: "Burj Khalifa", coords: [55.27, 25.19], type: "skyscraper", size: 12, country: "UAE", image: "https://images.unsplash.com/photo-1526495124232-a027afbb48b1?q=80&w=400" },
    { name: "Bali", coords: [115.18, -8.40], type: "temple_bali", size: 9, country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400" },
    { name: "Guerreros de Terracota", coords: [109.27, 34.38], type: "statue", size: 10, country: "China", image: "https://images.unsplash.com/photo-1599343351989-ee03b68018ce?q=80&w=400" },
    { name: "Fushimi Inari", coords: [135.77, 34.96], type: "torii", size: 9, country: "Japón", image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=400" },
    { name: "Bahía de Ha Long", coords: [107.12, 20.91], type: "island_rock", size: 10, country: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400" },
    { name: "Bagan", coords: [94.85, 21.17], type: "temple", size: 10, country: "Myanmar", image: "https://images.unsplash.com/photo-1543731068-15a0c1097652?q=80&w=400" },
    { name: "Everest", coords: [86.92, 27.98], type: "mountain", size: 13, country: "Nepal", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400" },
    { name: "Borobudur", coords: [110.20, -7.60], type: "stupa", size: 10, country: "Indonesia", image: "https://images.unsplash.com/photo-1579606055535-3738093db5f8?q=80&w=400" },
    { name: "Ciudad Prohibida", coords: [116.39, 39.91], type: "palace", size: 11, country: "China", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=400" },

    // 🌍 ÁFRICA
    {
        name: "Pirámides de Giza",
        coords: [31.13, 29.97],
        type: "pyramid",
        size: 14,
        country: "Egipto",
        year: "2560 a.C.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/640px-All_Gizah_Pyramids.jpg",
        description: "La única maravilla del mundo antiguo que perdura.",
        facts: ["Construida para Keops", "2.3 millones de bloques", "Alineación astronómica"]
    },
    { name: "Kilimanjaro", coords: [37.35, -3.06], type: "mountain", size: 11, country: "Tanzania", image: "https://images.unsplash.com/photo-1589196556105-020583096fac?q=80&w=400" },
    { name: "Cataratas Victoria", coords: [25.85, -17.92], type: "waterfall", size: 11, country: "Zambia/Zimbabue", image: "https://images.unsplash.com/photo-1628103723386-b4131ded69ba?q=80&w=400" },
    { name: "Serengeti", coords: [34.83, -2.15], type: "lion", size: 10, country: "Tanzania", image: "https://images.unsplash.com/photo-1516422317184-268d71010e4a?q=80&w=400", description: "La gran migración de ñus y cebras.", facts: ["Ecosistema más antiguo", "Patrimonio UNESCO", "Fauna salvaje increíble"] },
    { name: "Delta del Okavango", coords: [22.61, -19.28], type: "water", size: 9, country: "Botsuana", image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?q=80&w=400" },
    { name: "Djemma el-Fna", coords: [-7.98, 31.62], type: "market", size: 9, country: "Marruecos", image: "https://images.unsplash.com/photo-1539035104074-dee66086b5e3?q=80&w=400" },
    { name: "Table Mountain", coords: [18.42, -33.92], type: "mountain_flat", size: 10, country: "Sudáfrica", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=400" },
    { name: "Lalibela", coords: [39.04, 12.03], type: "church_rock", size: 9, country: "Etiopía", image: "https://images.unsplash.com/photo-1629814249584-bd4d53cb0939?q=80&w=400" },
    { name: "Esfinge", coords: [31.13, 29.97], type: "sphinx", size: 10, country: "Egipto", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400" },

    // 🌏 OCEANÍA & POLOS
    { name: "Ópera de Sídney", coords: [151.21, -33.85], type: "modern", size: 12, country: "Australia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Opera_House_Sails.jpg/640px-Sydney_Opera_House_Sails.jpg" },
    { name: "Uluru", coords: [131.03, -25.34], type: "rock_red", size: 11, country: "Australia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Petermann_Ranges_%28AU%29%2C_Uluru-Kata_Tjuta_National_Park%2C_Uluru_--_2019_--_3595.jpg/640px-Petermann_Ranges_%28AU%29%2C_Uluru-Kata_Tjuta_National_Park%2C_Uluru_--_2019_--_3595.jpg" },
    { name: "Gran Barrera de Coral", coords: [147.70, -18.28], type: "coral", size: 11, country: "Australia", image: "https://images.unsplash.com/photo-1546500840-ae38253aba9b?q=80&w=400" },
    { name: "Milford Sound", coords: [167.95, -44.64], type: "fjord", size: 10, country: "Nueva Zelanda", image: "https://images.unsplash.com/photo-1507722169871-d7f4b5ae15ef?q=80&w=400" },
    { name: "Hobbiton", coords: [175.68, -37.87], type: "hobbit", size: 9, country: "Nueva Zelanda", image: "https://images.unsplash.com/photo-1533748931134-78ad3875e501?q=80&w=400" },
    { name: "Moorea", coords: [-149.83, -17.53], type: "island", size: 9, country: "Polinesia", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=400" },
    { name: "Antártida (Base)", coords: [-62.20, -64.77], type: "base", size: 8, country: "Antártida", image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=400" }

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
        // 🌿 AMAZONÍA (Reducido para claridad)
        [-75, -65, -10, 2, 25, "selva tropical"],
        [-65, -50, -10, 0, 35, "selva tropical"],
        [-65, -55, 2, 7, 10, "selva tropical"],

        // 🦍 ÁFRICA CENTRAL (Cuenca del Congo)
        [12, 28, -5, 5, 30, "selva tropical"],

        // 🦎 SUDESTE ASIÁTICO
        [100, 115, -4, 4, 15, "selva tropical"],
        [135, 148, -8, -2, 10, "selva tropical"],

        // 🌲 TAIGA & BOSQUES (Reducido)
        [80, 120, 55, 65, 20, "taiga"],
        [130, 160, 58, 68, 15, "taiga"],
        [10, 25, 58, 68, 10, "taiga"],

        // 🦌 NORTEAMÉRICA
        [-150, -130, 60, 68, 10, "taiga"],
        [-120, -90, 52, 60, 20, "taiga"],
        [-80, -70, 42, 50, 10, "taiga"],

        // 🐨 AUSTRALIA
        [146, 152, -35, -15, 8, "selva tropical"],
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

    ...generateVegetation()
];

// 🦊 Base de Datos de Biodiversidad (Álbum de Especies)
export const BIODIVERSITY_DATA = [
    {
        id: "jaguar",
        name: "Jaguar de la Selva",
        species: "Panthera onca",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/On%C3%A7a_do_Pantanal.jpg/640px-On%C3%A7a_do_Pantanal.jpg",
        icon: "🐆",
        description: "El felino más grande de América. Símbolo de poder y guardián de la selva.",
        habitat: "Amazonía, Pantanal"
    },
    {
        id: "pink-dolphin",
        name: "Delfín Rosado",
        species: "Inia geoffrensis",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Inia_geofrensis_r%C3%ADo_Negro.jpg/640px-Inia_geofrensis_r%C3%ADo_Negro.jpg",
        icon: "🐬",
        description: "Una de las pocas especies de delfines de río. Su color rosado es único en el mundo.",
        habitat: "Cuencas del Amazonas y Orinoco"
    },
    {
        id: "toucan",
        name: "Tucán Real",
        species: "Ramphastos sulfuratus",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Brazilian_Tucan.jpg/640px-Brazilian_Tucan.jpg",
        icon: "🦜",
        description: "Reconocible por su pico multicolor. Es fundamental para la dispersión de semillas.",
        habitat: "Selvas tropicales"
    },
    {
        id: "morpho",
        name: "Mariposa Morpho",
        species: "Morpho menelaus",
        rarity: "common",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Morpho_peleides_10zz.jpg/640px-Morpho_peleides_10zz.jpg",
        icon: "🦋",
        description: "Famosa por su color azul metálico que no es pigmento, sino refracción de luz.",
        habitat: "Selva baja"
    },
    {
        id: "puma",
        name: "Puma Andino",
        species: "Puma concolor",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Puma_%28Puma_concolor_concolor%29_female_Leona_Amarga_5.jpg/640px-Puma_%28Puma_concolor_concolor%29_female_Leona_Amarga_5.jpg",
        icon: "🐈",
        description: "El 'León de los Andes'. Adaptado a grandes altitudes y climas fríos.",
        habitat: "Cordillera de los Andes"
    },
    {
        id: "spectacled-bear",
        name: "Oso de Anteojos",
        species: "Tremarctos ornatus",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Oso_Frontino.jpg/640px-Oso_Frontino.jpg",
        icon: "🐻",
        description: "Único oso de Sudamérica. Esencial para la salud de los páramos.",
        habitat: "Bosques andinos y páramos"
    },
    {
        id: "sea-turtle",
        name: "Tortuga Carey",
        species: "Eretmochelys imbricata",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tortuga_carey_%28Eretmochelys_imbricata%29%2C_islas_Ad_Dimaniyat%2C_Om%C3%A1n%2C_2024-08-13%2C_DD_69.jpg/640px-Tortuga_carey_%28Eretmochelys_imbricata%29%2C_islas_Ad_Dimaniyat%2C_Om%C3%A1n%2C_2024-08-13%2C_DD_69.jpg",
        icon: "🐢",
        description: "En peligro crítico. Su caparazón es vital para el equilibrio de los arrecifes.",
        habitat: "Océanos tropicales"
    },
    {
        id: "condor",
        name: "Cóndor de los Andes",
        species: "Vultur gryphus",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Los_Andes_110514-12.JPG/640px-Los_Andes_110514-12.JPG",
        icon: "🦅",
        description: "El ave voladora más grande del mundo. Rey de las alturas andinas.",
        habitat: "Cordillera de los Andes"
    },
    {
        id: "golden-frog",
        name: "Rana Dorada",
        species: "Phyllobates terribilis",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Atelopus_zeteki_mating.jpg/640px-Atelopus_zeteki_mating.jpg",
        icon: "🐸",
        description: "El animal más tóxico del mundo. Su color brillante es una advertencia.",
        habitat: "Selvas tropicales"
    },
    {
        id: "sloth",
        name: "Perezoso",
        species: "Bradypus variegatus",
        rarity: "common",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bradypus_tridactylus_51125965.jpg/640px-Bradypus_tridactylus_51125965.jpg",
        icon: "🦥",
        description: "Famoso por su lentitud, pasa la mayor parte de su vida en los árboles.",
        habitat: "Selvas tropicales"
    },
    {
        id: "manatee",
        name: "Manatí del Caribe",
        species: "Trichechus manatus",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Milwaukee_Public_Museum_April_2023_011_%28The_Southeast--Manatee_at_Blue_Springs%2C_Florida%29.jpg/640px-Milwaukee_Public_Museum_April_2023_011_%28The_Southeast--Manatee_at_Blue_Springs%2C_Florida%29.jpg",
        icon: "🐋",
        description: "Gentiles gigantes herbívoros que habitan ríos y costas.",
        habitat: "Cuencas del Amazonas y Orinoco"
    },
    {
        id: "giant-anteater",
        name: "Oso Hormiguero Gigante",
        species: "Myrmecophaga tridactyla",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/037_Giant_anteater_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/640px-037_Giant_anteater_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg",
        icon: "🐜",
        description: "Posee una lengua de 60cm y puede comer 30,000 hormigas al día.",
        habitat: "Sabana y estepa"
    },
    {
        id: "quetzal",
        name: "Quetzal Resplandeciente",
        species: "Pharomachrus mocinno",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/058_Male_Resplendent_quetzal_in_Los_Quetzales_National_Park_Photo_by_Giles_Laurent.jpg/640px-058_Male_Resplendent_quetzal_in_Los_Quetzales_National_Park_Photo_by_Giles_Laurent.jpg",
        icon: "🦜",
        description: "Ave sagrada de Mayas y Aztecas, conocida por su plumaje verde esmeralda.",
        habitat: "Bosques nubosos de Centroamérica"
    },
    {
        id: "panda",
        name: "Panda Gigante",
        species: "Ailuropoda melanoleuca",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Chengdu-pandas-d10.jpg/640px-Chengdu-pandas-d10.jpg",
        icon: "🐼",
        description: "Tesoro nacional de China, se alimenta casi exclusivamente de bambú.",
        habitat: "Montañas del centro de China"
    },
    {
        id: "komodo-dragon",
        name: "Dragón de Komodo",
        species: "Varanus komodoensis",
        rarity: "rare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Varanus_komodoensis%2C_Komodo_Island%2C_Indonesia%2C_20250822_1324_2788.jpg/640px-Varanus_komodoensis%2C_Komodo_Island%2C_Indonesia%2C_20250822_1324_2788.jpg",
        icon: "🦎",
        description: "El lagarto más grande del mundo, con una mordida venenosa letal.",
        habitat: "Islas Komodo, Indonesia"
    },
    {
        id: "orangutan",
        name: "Orangután de Borneo",
        species: "Pongo pygmaeus",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PONGO_PYGMAEUS_TANJUNG_PUTING_NATIONAL_PARK.jpg/640px-PONGO_PYGMAEUS_TANJUNG_PUTING_NATIONAL_PARK.jpg",
        icon: "🦧",
        description: "'Persona de la selva', uno de los primates más inteligentes.",
        habitat: "Selvas de Borneo y Sumatra"
    },
    {
        id: "gorilla",
        name: "Gorila de Montaña",
        species: "Gorilla beringei beringei",
        rarity: "legendary",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Mountain_gorilla_%28Gorilla_beringei_beringei%29_female_with_baby.jpg/640px-Mountain_gorilla_%28Gorilla_beringei_beringei%29_female_with_baby.jpg",
        icon: "🦍",
        description: "Gigantes gentiles que viven en grupos familiares liderados por un espalda plateada.",
        habitat: "Montañas Virunga, África"
    },
    {
        id: "magellanic-penguin",
        name: "Pingüino de Magallanes",
        species: "Spheniscus magellanicus",
        rarity: "common",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pinguino_de_magallanes_%2827189074034%29.jpg/640px-Pinguino_de_magallanes_%2827189074034%29.jpg",
        icon: "🐧",
        description: "Pequenos navegantes del sur de Sudamérica.",
        habitat: "Costas de Argentina y Chile"
    }
];
