export type Attraction = {
  id: string;
  nombre: string;
  sector: string;
  altitud: number;
  descripcion: string;
  dificultad: "Baja" | "Baja-Media" | "Media";
  accesibilidad: string;
  tipo: "natural" | "mirador" | "campestre" | "rio";
  coordenadas: { lat: number; lng: number };
  /** Posición relativa en el mapa simulado (0-100) */
  mapa: { x: number; y: number };
};

export const attractions: Attraction[] = [
  {
    id: "machu-picchu-coinino",
    nombre: "Machu Picchu Coinino",
    sector: "Coina Alto",
    altitud: 2210,
    descripcion:
      "Formación rocosa escalonada que evoca las terrazas incaicas. Ideal para caminatas al amanecer con vistas de todo el valle del Alto Chicama.",
    dificultad: "Baja-Media",
    accesibilidad: "Sendero de tierra, 45 min de caminata. No apto para sillas de ruedas.",
    tipo: "natural",
    coordenadas: { lat: -7.8412, lng: -78.4521 },
    mapa: { x: 26, y: 24 },
  },
  {
    id: "mirador-de-coina",
    nombre: "El Mirador de Coina",
    sector: "Centro poblado",
    altitud: 1998,
    descripcion:
      "Balcón natural sobre el pueblo. Punto favorito para fotografiar el atardecer y los techos de teja de Coina.",
    dificultad: "Baja",
    accesibilidad: "Acceso a 15 min del centro por camino empedrado. Bancas y sombra.",
    tipo: "mirador",
    coordenadas: { lat: -7.8388, lng: -78.4472 },
    mapa: { x: 52, y: 16 },
  },
  {
    id: "rio-alto-chicama",
    nombre: "Río Alto Chicama (Río Grande)",
    sector: "Ribera baja",
    altitud: 1860,
    descripcion:
      "Aguas frías y cristalinas rodeadas de huertos de lima dulce. Zona de picnic, pesca artesanal y baño en pozas naturales.",
    dificultad: "Baja",
    accesibilidad: "Camino vehicular hasta la ribera. Apto para familias con niños.",
    tipo: "rio",
    coordenadas: { lat: -7.8461, lng: -78.4419 },
    mapa: { x: 68, y: 62 },
  },
  {
    id: "luna-park",
    nombre: "Centro Campestre Luna Park",
    sector: "Salida a Otuzco",
    altitud: 1942,
    descripcion:
      "Piscinas al aire libre, canchas deportivas y jardines. El clásico para pasar el día en familia.",
    dificultad: "Baja",
    accesibilidad: "Rampas de acceso y estacionamiento propio.",
    tipo: "campestre",
    coordenadas: { lat: -7.8402, lng: -78.4508 },
    mapa: { x: 18, y: 58 },
  },
  {
    id: "la-casa-blanca",
    nombre: "La Casa Blanca",
    sector: "Barrio San Miguel",
    altitud: 1950,
    descripcion:
      "Casona republicana convertida en centro campestre, con patios de lima dulce y parrillas.",
    dificultad: "Baja",
    accesibilidad: "Ingreso a nivel, veredas amplias.",
    tipo: "campestre",
    coordenadas: { lat: -7.8375, lng: -78.4494 },
    mapa: { x: 40, y: 44 },
  },
  {
    id: "la-hosteria",
    nombre: "La Hostería",
    sector: "Centro poblado",
    altitud: 1942,
    descripcion:
      "Terrazas con vista al valle, jugos de lima dulce recién exprimidos y música en vivo los fines de semana.",
    dificultad: "Baja",
    accesibilidad: "Totalmente accesible en un solo nivel.",
    tipo: "campestre",
    coordenadas: { lat: -7.8391, lng: -78.4451 },
    mapa: { x: 80, y: 34 },
  },
];

export type Lodging = {
  id: string;
  nombre: string;
  precio: number;
  estrellas: number;
  amenidades: string[];
  whatsapp: string;
  disponible: boolean;
};

export const lodgings: Lodging[] = [
  {
    id: "la-huaca",
    nombre: "Hospedaje La Huaca",
    precio: 45,
    estrellas: 4,
    amenidades: ["Agua caliente", "Wi-Fi en recepción", "Desayuno con lima dulce", "Patio andino"],
    whatsapp: "51949000111",
    disponible: true,
  },
  {
    id: "rossy",
    nombre: "Hotel Rossy",
    precio: 60,
    estrellas: 4,
    amenidades: ["Habitaciones matrimoniales", "Estacionamiento", "TV cable", "Terraza"],
    whatsapp: "51949000222",
    disponible: true,
  },
];

export type Restaurant = {
  id: string;
  nombre: string;
  especialidad: string;
  platos: string[];
  rango: string;
  whatsapp: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "dona-mili",
    nombre: "Recreo Doña Mili",
    especialidad: "Cocina campestre coinina",
    platos: ["Cuy frito", "Chancho crocante", "Sopa de trigo"],
    rango: "S/ 18 - S/ 35",
    whatsapp: "51949000333",
  },
  {
    id: "delicia",
    nombre: "Pizzería Delicia",
    especialidad: "Horno a leña",
    platos: ["Pizza andina", "Calzone de queso fresco", "Limonada de lima dulce"],
    rango: "S/ 15 - S/ 40",
    whatsapp: "51949000444",
  },
];

export type Transport = {
  id: string;
  empresa: string;
  ruta: string;
  horario: string;
  precio: string;
  nota: string;
};

export const transports: Transport[] = [
  {
    id: "latino",
    empresa: "Latino Express",
    ruta: "Trujillo → Otuzco → Coina",
    horario: "Salidas diarias 6:00 AM y 1:00 PM",
    precio: "S/ 25",
    nota: "Reserva tu asiento un día antes en temporada alta.",
  },
  {
    id: "huaca",
    empresa: "Huaca Express",
    ruta: "Trujillo → Coina",
    horario: "Diario 7:30 AM",
    precio: "S/ 28",
    nota: "Viaje aproximado de 4 h 30 min por carretera de altura.",
  },
  {
    id: "ponce",
    empresa: "Combi del Sr. José Ponce",
    ruta: "Otuzco → Coina",
    horario: "Lunes, miércoles y viernes 11:00 AM",
    precio: "S/ 12",
    nota: "Servicio local; llega 20 min antes al paradero de Otuzco.",
  },
];

export type Product = {
  id: string;
  nombre: string;
  productor: string;
  precio: number;
  unidad: string;
  beneficios: string;
  emoji: string;
};

export const products: Product[] = [
  {
    id: "mermelada",
    nombre: "Mermelada de lima dulce",
    productor: "Asociación de Mujeres Productoras de Coina",
    precio: 10,
    unidad: "frasco 250 g",
    beneficios: "Rica en vitamina C y antioxidantes; apoya las defensas naturales.",
    emoji: "🍯",
  },
  {
    id: "limas",
    nombre: "Caja de limas frescas",
    productor: "Huertos del Alto Chicama",
    precio: 25,
    unidad: "caja 5 kg",
    beneficios: "Digestiva y calmante natural; ideal en infusión para la garganta.",
    emoji: "🍋",
  },
  {
    id: "vino",
    nombre: "Vino artesanal de lima dulce",
    productor: "Bodega Familia Ponce",
    precio: 28,
    unidad: "botella 750 ml",
    beneficios: "Fermentación natural con polifenoles del cítrico coinino.",
    emoji: "🍷",
  },
];

export type Legend = { id: string; titulo: string; resumen: string; texto: string };

export const legends: Legend[] = [
  {
    id: "aves-fundicion",
    titulo: "Las Aves de la Fundición",
    resumen: "El vuelo que anunciaba el fin de la mina",
    texto:
      "Cuentan los abuelos que cuando la vieja fundición trabajaba día y noche, bandadas de aves blancas comenzaron a rondar las chimeneas. Los obreros decían que eran las almas del cerro pidiendo descanso. Una madrugada las aves se posaron sobre los hornos y el fuego se apagó solo. Desde entonces, cuando el viento sube desde el río, se escucha su aleteo entre las ruinas y los coininos saben que el cerro sigue respirando.",
  },
  {
    id: "laguna-inea",
    titulo: "La Laguna Encantadora de Inea",
    resumen: "Aguas que enamoran y no devuelven",
    texto:
      "En las alturas de Inea duerme una laguna de aguas quietas que, dicen, escoge a quien mira demasiado tiempo su reflejo. A los viajeros se les advierte no lavarse la cara al mediodía: el encanto atrae con música de agua y promesas de riqueza. Los pastores dejan flores amarillas en la orilla para pedir permiso antes de pasar con su ganado, y jamás pronuncian su nombre después del anochecer.",
  },
  {
    id: "san-miguel",
    titulo: "San Miguel Arcángel y el diablo con cola de trapo",
    resumen: "La travesura del tallador coinino",
    texto:
      "Al tallador del pueblo le encargaron la imagen de San Miguel Arcángel venciendo al demonio. Terminó el arcángel con alas doradas, pero al llegar al diablo se le acabó la madera. Sin decir nada, le cosió una cola con retazos de trapo del taller de su mujer. Los fieles se dieron cuenta en la procesión y, en lugar de enojarse, celebraron: desde entonces el diablo de Coina lleva cola de trapo y cada año los niños le cambian el retazo por uno nuevo.",
  },
];

/** Base de conocimiento local para Limi en modo offline */
export const limiKnowledge: { claves: string[]; respuesta: string }[] = [
  {
    claves: ["itinerario", "1 día", "un dia", "plan", "recorrido"],
    respuesta:
      "Itinerario de 1 día: 7:00 desayuno con jugo de lima dulce · 8:00 caminata al Machu Picchu Coinino · 11:00 pozas del Río Alto Chicama · 13:30 cuy frito en Recreo Doña Mili · 16:00 piscinas de Luna Park · 18:00 atardecer en El Mirador de Coina. 🍋",
  },
  {
    claves: ["otuzco", "llego", "llegar", "viajar", "combi", "bus", "trujillo"],
    respuesta:
      "Desde Otuzco: combi del Sr. José Ponce los lunes, miércoles y viernes a las 11:00 AM (S/ 12). Desde Trujillo: Latino Express 6:00 AM y 1:00 PM (S/ 25) o Huaca Express 7:30 AM (S/ 28). El viaje toma unas 4 h 30 min.",
  },
  {
    claves: ["saludable", "salud", "clima", "respirar", "asma", "altura", "msnm"],
    respuesta:
      "Coina está a 1942 msnm con clima seco y soleado casi todo el año. Ese aire limpio y con poca humedad alivia las vías respiratorias, por eso se le llama el paraíso curativo del Alto Chicama. Recuerda vestir en capas: sol fuerte de día y frío al anochecer.",
  },
  {
    claves: ["dormir", "hospedaje", "hotel", "alojamiento", "precio"],
    respuesta:
      "Hospedaje La Huaca desde S/ 45 la noche (agua caliente y desayuno con lima dulce) y Hotel Rossy desde S/ 60 con estacionamiento. Puedes reservar desde la pestaña Servicios, incluso sin conexión.",
  },
  {
    claves: ["comer", "comida", "restaurante", "cuy", "pizza"],
    respuesta:
      "Para comer: Recreo Doña Mili (cuy frito y chancho crocante, S/ 18-35) y Pizzería Delicia con horno a leña (S/ 15-40). Ambos preparan limonada de lima dulce.",
  },
  {
    claves: ["lima dulce", "mermelada", "vino", "comprar", "mercado", "producto"],
    respuesta:
      "En el Mercado encuentras mermelada de lima dulce (S/ 10), caja de limas frescas 5 kg (S/ 25) y vino artesanal (S/ 28). Todo producido por familias coininas y pagable con Yape o Plin.",
  },
  {
    claves: ["leyenda", "cultura", "historia", "diablo", "laguna"],
    respuesta:
      "Coina guarda tres relatos imperdibles: Las Aves de la Fundición, La Laguna Encantadora de Inea y San Miguel Arcángel con el diablo de cola de trapo. Los tienes completos en la pestaña Cultura.",
  },
];

export const quickQuestions = [
  "Sugerir itinerario de 1 día",
  "¿Cómo llego desde Otuzco?",
  "¿Por qué Coina es saludable?",
  "¿Dónde puedo dormir?",
];
