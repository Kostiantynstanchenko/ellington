// Ellington Estate — catalogue of new-build developments.
// Prices are "from" prices in EUR, excl. VAT/ITP & fees. Re-check them with the developer before publishing changes.
// Images: drop files into public/img/projects/<slug>/ (01.jpg, 02.jpg…) or run `npm run fetch-images`
// after filling `imagePages` with the developer's official project page(s).

export const zones = {
  'costa-blanca': { lat: 38.35, lng: -0.48 },
  'costa-del-sol': { lat: 36.55, lng: -4.75 },
};

export const towns = {
  alicante: { name: 'Alicante', zone: 'costa-blanca' },
  algorfa: { name: 'Algorfa', zone: 'costa-blanca' },
  finestrat: { name: 'Finestrat', zone: 'costa-blanca' },
  rojales: { name: 'Rojales', zone: 'costa-blanca' },
  torrevieja: { name: 'Torrevieja', zone: 'costa-blanca' },
  benalmadena: { name: 'Benalmádena', zone: 'costa-del-sol' },
  casares: { name: 'Casares', zone: 'costa-del-sol' },
  estepona: { name: 'Estepona', zone: 'costa-del-sol' },
  fuengirola: { name: 'Fuengirola', zone: 'costa-del-sol' },
  marbella: { name: 'Marbella', zone: 'costa-del-sol' },
  mijas: { name: 'Mijas', zone: 'costa-del-sol' },
  torrox: { name: 'Torrox', zone: 'costa-del-sol' },
};

export const types = ['apartments', 'penthouses', 'villas', 'townhouses'];

export const featureKeys = ['sea_views', 'near_beach', 'golf', 'pool', 'gym', 'spa', 'coworking', 'padel', 'gated', 'concierge', 'solarium', 'terrace', 'parking', 'storage'];

export const projects = [
  {
    slug: 'lakun', name: 'Lakün', town: 'mijas', area: 'Las Lagunas', types: ['apartments', 'penthouses'],
    beds: [1, 4], baths: [1, 3], priceFrom: 458000, units: 233, delivery: '2027',
    developer: 'Lakün Residences', developerUrl: '', architect: 'DTR Studios · Bakpak Architects',
    features: ['pool', 'gym', 'spa', 'coworking', 'gated', 'terrace', 'parking', 'storage'],
    lat: 36.545, lng: -4.64, featured: true, imagePages: [],
    summary: {
      en: 'A resort-style address between Fuengirola and Mijas: 233 residences with a rooftop sky pool, indoor and outdoor pools, spa, gym and coworking, built to BREEAM standards.',
      es: 'Un residencial con espíritu de resort entre Fuengirola y Mijas: 233 viviendas con sky pool en cubierta, piscinas interior y exterior, spa, gimnasio y coworking, con certificación BREEAM.',
      de: 'Eine Adresse mit Resort-Charakter zwischen Fuengirola und Mijas: 233 Residenzen mit Sky-Pool auf dem Dach, Innen- und Außenpools, Spa, Fitness und Coworking – BREEAM-zertifiziert.',
      nl: 'Een adres met resortgevoel tussen Fuengirola en Mijas: 233 woningen met sky pool op het dak, binnen- en buitenzwembad, spa, gym en coworking, gebouwd volgens BREEAM.',
      sv: 'En adress med resortkänsla mellan Fuengirola och Mijas: 233 bostäder med sky pool på taket, inom- och utomhuspool, spa, gym och coworking, byggt enligt BREEAM.',
    },
  },
  {
    slug: 'siete-olas', name: '7 Olas', town: 'fuengirola', area: 'La Loma', types: ['apartments', 'penthouses'],
    beds: [2, 3], baths: [2, 2], priceFrom: 779000, units: 77, delivery: '',
    developer: 'RH Privé', developerUrl: 'https://sieteolasfuengirola.com/', architect: '',
    features: ['sea_views', 'pool', 'gym', 'spa', 'coworking', 'gated', 'terrace', 'parking', 'storage'],
    lat: 36.552, lng: -4.615, featured: true, imagePages: ['https://sieteolasfuengirola.com/'],
    summary: {
      en: '77 sea-facing homes and four penthouses beside the Gran Parque de La Loma, with an infinity pool, gym, sauna and a dedicated work-from-home space.',
      es: '77 viviendas orientadas al mar y cuatro áticos junto al Gran Parque de La Loma, con piscina infinity, gimnasio, sauna y espacio coworking.',
      de: '77 meerseitige Wohnungen und vier Penthäuser am Gran Parque de La Loma – mit Infinity-Pool, Fitness, Sauna und eigenem Coworking-Bereich.',
      nl: '77 woningen op het zuiden met zeezicht en vier penthouses naast het Gran Parque de La Loma, met infinity pool, gym, sauna en coworking.',
      sv: '77 bostäder mot havet och fyra takvåningar intill Gran Parque de La Loma, med infinitypool, gym, bastu och coworking.',
    },
  },
  {
    slug: 'ayana', name: 'Ayana', town: 'estepona', area: 'New Golden Mile', types: ['apartments', 'penthouses'],
    beds: [2, 4], baths: [2, 4], priceFrom: 965000, units: 140, delivery: 'Completed',
    developer: 'Ayana Estepona', developerUrl: '', architect: 'Villarroel Torrico',
    features: ['sea_views', 'near_beach', 'pool', 'gym', 'spa', 'coworking', 'gated', 'concierge', 'terrace', 'parking', 'storage'],
    beach: '500 m', lat: 36.462, lng: -5.06, featured: true, imagePages: [],
    summary: {
      en: '140 residences in 27,000 m² of tropical gardens, a 500 m walk from the beach on the New Golden Mile. Clubhouse, spa, indoor pool, gym and 24-hour security.',
      es: '140 viviendas en 27.000 m² de jardines tropicales, a 500 m a pie de la playa en la Nueva Milla de Oro. Club social, spa, piscina interior, gimnasio y seguridad 24 h.',
      de: '140 Residenzen in 27.000 m² tropischer Gärten, 500 m zu Fuß zum Strand an der New Golden Mile. Clubhaus, Spa, Innenpool, Fitness und 24-Stunden-Security.',
      nl: '140 woningen in 27.000 m² tropische tuinen, op 500 m lopen van het strand aan de New Golden Mile. Clubhuis, spa, binnenzwembad, gym en 24-uursbeveiliging.',
      sv: '140 bostäder i 27 000 m² tropiska trädgårdar, 500 m promenad till stranden längs New Golden Mile. Klubbhus, spa, inomhuspool, gym och bevakning dygnet runt.',
    },
  },
  {
    slug: 'villa-oso', name: 'Villa Oso', town: 'marbella', area: 'Marbella', types: ['villas'],
    beds: [4, 4], baths: [3, 3], priceFrom: 5500000, units: 1, delivery: '',
    developer: '', developerUrl: '', architect: '',
    features: ['pool', 'terrace', 'parking'],
    lat: 36.515, lng: -4.9, featured: true, imagePages: [],
    summary: {
      en: 'A single, privately set four-bedroom villa in Marbella for buyers who want a finished architectural statement rather than a unit in a complex.',
      es: 'Una villa única de cuatro dormitorios en Marbella para quien busca una pieza de arquitectura terminada, no una unidad dentro de un complejo.',
      de: 'Eine einzelne, privat gelegene Villa mit vier Schlafzimmern in Marbella – für Käufer, die ein vollendetes Architekturstück statt einer Einheit im Komplex suchen.',
      nl: 'Eén privé gelegen villa met vier slaapkamers in Marbella, voor kopers die een afgerond architectonisch statement zoeken in plaats van een unit in een complex.',
      sv: 'En enskild, avskilt belägen villa med fyra sovrum i Marbella – för den som vill ha ett färdigt arkitektoniskt verk snarare än en enhet i ett område.',
    },
  },
  {
    slug: 'nexus-residences', name: 'Nexus Residences', town: 'benalmadena', area: 'Benalmádena', types: ['apartments'],
    beds: [2, 4], baths: [2, 3], priceFrom: 524000, units: null, delivery: 'Completed',
    developer: '', developerUrl: '', architect: '',
    features: ['sea_views', 'pool', 'gym', 'terrace', 'parking', 'storage'],
    lat: 36.595, lng: -4.55, featured: true, imagePages: [],
    summary: {
      en: 'Elevated apartments in Benalmádena where every terrace looks out over the Mediterranean, minutes from the marina, Torrequebrada golf and the Cercanías train.',
      es: 'Viviendas elevadas en Benalmádena donde cada terraza mira al Mediterráneo, a minutos del puerto deportivo, del golf de Torrequebrada y del Cercanías.',
      de: 'Erhöht gelegene Wohnungen in Benalmádena, deren Terrassen alle aufs Mittelmeer blicken – Minuten vom Yachthafen, Golf Torrequebrada und der Cercanías-Bahn.',
      nl: 'Hooggelegen appartementen in Benalmádena waar elk terras uitkijkt op de Middellandse Zee, op enkele minuten van de jachthaven, golf Torrequebrada en de trein.',
      sv: 'Högt belägna lägenheter i Benalmádena där varje terrass vetter mot Medelhavet, några minuter från marinan, Torrequebrada golf och pendeltåget.',
    },
  },
  {
    slug: 'casares-bay', name: 'Casares Bay', town: 'casares', area: 'Doña Julia Golf', types: ['apartments', 'penthouses'],
    beds: [2, 3], baths: [2, 2], priceFrom: 490000, units: 9, delivery: '',
    developer: '', developerUrl: '', architect: '',
    features: ['sea_views', 'golf', 'pool', 'terrace', 'solarium', 'parking'],
    lat: 36.405, lng: -5.24, featured: true, imagePages: [],
    summary: {
      en: 'A boutique collection of only nine homes next to Doña Julia Golf, between Estepona and Casares, with sea views and rooftop pools on the penthouses.',
      es: 'Una colección boutique de solo nueve viviendas junto a Doña Julia Golf, entre Estepona y Casares, con vistas al mar y piscinas en la azotea de los áticos.',
      de: 'Eine Boutique-Kollektion von nur neun Wohnungen am Doña Julia Golf zwischen Estepona und Casares – mit Meerblick und Dachpools in den Penthäusern.',
      nl: 'Een boutique-collectie van slechts negen woningen naast Doña Julia Golf, tussen Estepona en Casares, met zeezicht en dakzwembaden bij de penthouses.',
      sv: 'En boutiquesamling med endast nio bostäder intill Doña Julia Golf, mellan Estepona och Casares, med havsutsikt och takpooler i takvåningarna.',
    },
  },
  {
    slug: 'marinsa-altair', name: 'Marinsa Altair', town: 'torrox', area: 'El Morche', types: ['apartments', 'penthouses'],
    beds: [1, 3], baths: [1, 2], priceFrom: 306000, units: 112, delivery: '2026',
    developer: 'Marinsa', developerUrl: '', architect: '',
    features: ['near_beach', 'sea_views', 'pool', 'padel', 'gated', 'terrace', 'parking', 'storage'],
    beach: '150 m', lat: 36.735, lng: -3.99, featured: false, imagePages: [],
    summary: {
      en: '112 homes 150 metres from the beach in El Morche, on the quieter eastern Costa del Sol: gated grounds, pools, padel court and a parking space and storeroom with every home.',
      es: '112 viviendas a 150 metros de la playa de El Morche, en la tranquila Costa del Sol oriental: recinto cerrado, piscinas, pádel y plaza de garaje y trastero con cada vivienda.',
      de: '112 Wohnungen 150 Meter vom Strand in El Morche an der ruhigeren östlichen Costa del Sol: geschlossene Anlage, Pools, Padelplatz, Stellplatz und Abstellraum inklusive.',
      nl: '112 woningen op 150 meter van het strand in El Morche, aan de rustigere oostelijke Costa del Sol: afgesloten complex, zwembaden, padelbaan, parkeerplaats en berging bij elke woning.',
      sv: '112 bostäder 150 meter från stranden i El Morche på den lugnare östra Costa del Sol: inhägnat område, pooler, padelbana samt parkering och förråd till varje bostad.',
    },
  },
  {
    slug: 'jarcia', name: 'Jarcia', town: 'alicante', area: 'San Agustín · PAU II', types: ['apartments', 'penthouses'],
    beds: [2, 3], baths: [2, 2], priceFrom: 441000, units: 48, delivery: 'Completed',
    developer: 'AEDAS Homes', developerUrl: 'https://www.aedashomes.com/', architect: '',
    features: ['sea_views', 'pool', 'solarium', 'gated', 'terrace', 'parking', 'storage'],
    lat: 38.372, lng: -0.468, featured: false, imagePages: [],
    summary: {
      en: 'A completed AEDAS Homes building of 48 homes in San Agustín, Alicante’s newest district, with communal gardens, pool and solarium and views reaching to Santa Bárbara Castle.',
      es: 'Edificio terminado de AEDAS Homes con 48 viviendas en San Agustín, el barrio más nuevo de Alicante, con jardines, piscina y solárium y vistas hasta el Castillo de Santa Bárbara.',
      de: 'Ein fertiggestelltes AEDAS-Homes-Gebäude mit 48 Wohnungen in San Agustín, Alicantes jüngstem Viertel – mit Gärten, Pool, Solarium und Blick bis zur Burg Santa Bárbara.',
      nl: 'Een opgeleverd AEDAS Homes-gebouw met 48 woningen in San Agustín, de nieuwste wijk van Alicante, met tuinen, zwembad, solarium en uitzicht tot aan het kasteel Santa Bárbara.',
      sv: 'En färdigställd byggnad från AEDAS Homes med 48 bostäder i San Agustín, Alicantes nyaste stadsdel, med trädgård, pool, solarium och utsikt mot Santa Bárbara-borgen.',
    },
  },
  {
    slug: 'marques-golf-resort', name: 'Marqués Golf Resort', town: 'finestrat', area: 'Balcón de Finestrat', types: ['apartments', 'penthouses'],
    beds: [2, 2], baths: [2, 2], priceFrom: 329900, units: 78, delivery: '2028',
    developer: 'Grupo Immosol', developerUrl: '', architect: '',
    features: ['sea_views', 'golf', 'pool', 'padel', 'gym', 'gated', 'terrace', 'parking'],
    lat: 38.553, lng: -0.165, featured: false, imagePages: [],
    summary: {
      en: 'Grupo Immosol’s gated resort beside Puig Campana golf, above Benidorm: three landscaped pools, padel, fitness area and broad terraces facing the Mediterranean.',
      es: 'El resort cerrado de Grupo Immosol junto al golf Puig Campana, sobre Benidorm: tres piscinas ajardinadas, pádel, zona fitness y amplias terrazas al Mediterráneo.',
      de: 'Das geschlossene Resort von Grupo Immosol am Golfplatz Puig Campana oberhalb von Benidorm: drei Gartenpools, Padel, Fitnessbereich und große Terrassen zum Meer.',
      nl: 'Het afgesloten resort van Grupo Immosol naast golfbaan Puig Campana, boven Benidorm: drie zwembaden in tuinen, padel, fitness en ruime terrassen richting zee.',
      sv: 'Grupo Immosols inhägnade resort vid Puig Campana golf ovanför Benidorm: tre trädgårdspooler, padel, gym och stora terrasser mot Medelhavet.',
    },
  },
  {
    slug: 'villa-albatros', name: 'Villa Albatros', town: 'finestrat', area: 'Finestrat', types: ['villas'],
    beds: [3, 3], baths: [2, 2], priceFrom: 479000, units: null, delivery: '',
    developer: '', developerUrl: '', architect: '',
    features: ['sea_views', 'pool', 'terrace', 'solarium', 'parking'],
    lat: 38.565, lng: -0.2, featured: false, imagePages: [],
    summary: {
      en: 'Three-bedroom villas with private pools and sea views in Finestrat, between the Puig Campana mountain and the beaches of Benidorm.',
      es: 'Villas de tres dormitorios con piscina privada y vistas al mar en Finestrat, entre el Puig Campana y las playas de Benidorm.',
      de: 'Villen mit drei Schlafzimmern, Privatpool und Meerblick in Finestrat – zwischen dem Puig Campana und den Stränden von Benidorm.',
      nl: 'Villa’s met drie slaapkamers, privézwembad en zeezicht in Finestrat, tussen de Puig Campana en de stranden van Benidorm.',
      sv: 'Villor med tre sovrum, egen pool och havsutsikt i Finestrat, mellan berget Puig Campana och Benidorms stränder.',
    },
  },
  {
    slug: 'alba-salina-2', name: 'Alba Salina 2', town: 'rojales', area: 'Rojales', types: ['townhouses'],
    beds: [3, 3], baths: [2, 2], priceFrom: 396900, units: 15, delivery: '2026',
    developer: 'Solimar', developerUrl: '', architect: '',
    features: ['pool', 'solarium', 'terrace', 'golf', 'parking'],
    lat: 38.088, lng: -0.722, featured: false, imagePages: [],
    summary: {
      en: 'Fifteen three-bedroom townhouses in Rojales with roof solariums, optional private pools and basements, close to Ciudad Quesada’s golf courses.',
      es: 'Quince adosados de tres dormitorios en Rojales con solárium en cubierta, sótano y piscina privada opcional, cerca de los golf de Ciudad Quesada.',
      de: 'Fünfzehn Reihenhäuser mit drei Schlafzimmern in Rojales mit Dachsolarium, Keller und optionalem Privatpool, nahe den Golfplätzen von Ciudad Quesada.',
      nl: 'Vijftien rijwoningen met drie slaapkamers in Rojales met dakterras, kelder en optioneel privézwembad, dicht bij de golfbanen van Ciudad Quesada.',
      sv: 'Femton radhus med tre sovrum i Rojales med takterrass, källare och valbar egen pool, nära golfbanorna i Ciudad Quesada.',
    },
  },
  {
    slug: 'gante-villas-r20', name: 'Gante Villas R20', town: 'algorfa', area: 'Algorfa', types: ['villas'],
    beds: [3, 3], baths: [2, 2], priceFrom: 549000, units: null, delivery: '',
    developer: '', developerUrl: '', architect: '',
    features: ['pool', 'golf', 'terrace', 'solarium', 'parking'],
    lat: 38.065, lng: -0.79, featured: false, imagePages: [],
    summary: {
      en: 'Modern detached three-bedroom villas in Algorfa with private pools and roof terraces, in the golf belt of the southern Costa Blanca.',
      es: 'Villas independientes modernas de tres dormitorios en Algorfa con piscina privada y solárium, en la zona de golf de la Costa Blanca Sur.',
      de: 'Moderne freistehende Villen mit drei Schlafzimmern in Algorfa mit Privatpool und Dachterrasse – im Golfgürtel der südlichen Costa Blanca.',
      nl: 'Moderne vrijstaande villa’s met drie slaapkamers in Algorfa met privézwembad en dakterras, in de golfregio van de zuidelijke Costa Blanca.',
      sv: 'Moderna fristående villor med tre sovrum i Algorfa med egen pool och takterrass, i golfområdet på södra Costa Blanca.',
    },
  },
  {
    slug: 'edificio-altea-vi', name: 'Edificio Altea VI', town: 'torrevieja', area: 'Torrevieja', types: ['apartments', 'penthouses'],
    beds: [2, 2], baths: [2, 2], priceFrom: 240000, units: null, delivery: '',
    developer: '', developerUrl: '', architect: '',
    features: ['sea_views', 'terrace', 'solarium'],
    lat: 37.979, lng: -0.683, featured: false, imagePages: [],
    summary: {
      en: 'Two-bedroom apartments and penthouses in Torrevieja with sea views — the most accessible entry point into the catalogue.',
      es: 'Apartamentos y áticos de dos dormitorios en Torrevieja con vistas al mar: la puerta de entrada más accesible del catálogo.',
      de: 'Wohnungen und Penthäuser mit zwei Schlafzimmern und Meerblick in Torrevieja – der zugänglichste Einstieg in unseren Katalog.',
      nl: 'Appartementen en penthouses met twee slaapkamers en zeezicht in Torrevieja: de meest toegankelijke instap in de catalogus.',
      sv: 'Lägenheter och takvåningar med två sovrum och havsutsikt i Torrevieja – den mest prisvärda vägen in i katalogen.',
    },
  },
];
