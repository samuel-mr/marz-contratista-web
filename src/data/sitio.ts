/*
 * Contenido del sitio. Separado del markup para que crezca sin tocar
 * componentes: añadir un servicio o un testimonio es añadir un objeto aquí.
 */

/*
 * Fuente de verdad fuera del repo: 01-activos/01-marca/datos-negocio.md en la
 * carpeta del proyecto MRX. Si un dato cambia allí, se cambia aquí.
 *
 * La dirección fiscal NO se publica (decisión del cliente): la web, el JSON-LD
 * y Google Business muestran solo "Lima".
 */
export const empresa = {
  nombre: 'MRX CONTRATISTAS',
  razonSocial: 'MRX CONTRATISTAS S.A.C.S.',
  ruc: '20616671147',
  ciudad: 'Lima, Perú',
  telefono: '+51 972 014 679',
  /** Formato E.164 sin espacios, para los href de tel: y wa.me */
  telefonoRaw: '+51972014679',
  whatsapp: '51972014679',
  email: 'contacto@mrxcontratistas.pe',
  fundador: 'Roy E. Martínez Ramírez',
  anioFundacion: '2026',
  /** Frase única de experiencia. No usar otra cifra en ningún sitio. */
  experiencia: 'Equipo con +5 años de experiencia; empresa formalizada en 2026',
  horario: 'Lun–vie 9:00–18:00 · Sáb 9:00–13:00',
} as const;

/** Mismos tramos que `empresa.horario`, en el formato que pide schema.org. */
export const horarioSchema = [
  { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '09:00', cierra: '18:00' },
  { dias: ['Saturday'], abre: '09:00', cierra: '13:00' },
] as const;

/** Solo perfiles ya públicos. Google Business se añade cuando sea visible. */
export const redes = [
  { nombre: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61595412065004' },
  { nombre: 'LinkedIn', url: 'https://www.linkedin.com/company/mrx-contratistas' },
] as const;

export const telHref = `tel:${empresa.telefonoRaw}`;
/** Mensaje prellenado: el cliente solo tiene que pulsar enviar. */
export const waHref = `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(
  'Hola MRX Contratistas, quiero cotizar un trabajo.',
)}`;

export const seo = {
  titulo: 'MRX CONTRATISTAS | Movimiento de tierras en Lima',
  descripcion:
    'Excavación, movimiento de tierras, demolición, obras civiles y alquiler de maquinaria en Lima. Cotiza por llamada o WhatsApp.',
} as const;

export interface Servicio {
  /** Identificador estable. Lo usan las fichas de obra (`servicio:`). */
  id: string;
  numero: string;
  titulo: string;
  cuerpo: string;
  /** Tipos de obra concretos. Además de orientar al cliente, cubren búsquedas
   *  locales que el resto de la página no toca ("calzaduras Lima"). */
  etiquetas: string[];
}

export const servicios: Servicio[] = [
  {
    id: 'excavacion',
    numero: '01',
    titulo: 'Excavación',
    cuerpo:
      'Excavación en roca y tierra para cimentaciones y obras civiles.',
    etiquetas: ['Cisternas', 'Zapatas', 'Zanjas', 'Calzaduras', 'Sótanos'],
  },
  {
    id: 'movimiento-tierras',
    numero: '02',
    titulo: 'Nivelación y movimiento de tierras',
    cuerpo:
      'Preparación y nivelación de terrenos para construcción y urbanización.',
    etiquetas: [
      'Nivelación',
      'Movimiento de tierras',
      'Relleno',
      'Compactado',
      'Afirmado',
    ],
  },
  {
    id: 'demolicion',
    numero: '03',
    titulo: 'Demolición',
    cuerpo: 'Demolición con martillo hidráulico y retiro de escombros.',
    etiquetas: ['Casas', 'Edificios', 'Tanques', 'Estructuras de concreto'],
  },
  {
    id: 'eliminacion-desmonte',
    numero: '04',
    titulo: 'Eliminación de desmonte',
    cuerpo: 'Retiro con volquete y disposición en botadero autorizado.',
    etiquetas: ['Volquete', 'Botadero autorizado'],
  },
  {
    id: 'alquiler-maquinaria',
    numero: '05',
    titulo: 'Alquiler de maquinaria',
    cuerpo: 'Maquinaria pesada con operador o sin operador.',
    etiquetas: ['Con operador', 'Sin operador', 'Por hora', 'Por día', 'Por mes'],
  },
  {
    id: 'obras-civiles',
    numero: '06',
    titulo: 'Obras civiles',
    cuerpo: 'Ejecución de obras de concreto e infraestructura.',
    etiquetas: [
      'Cimentaciones',
      'Muros de contención',
      'Pistas y veredas',
      'Obras de concreto',
    ],
  },
];

export interface Stat {
  cifra: string;
  etiqueta: string;
}

export const stats: Stat[] = [
  { cifra: '+5', etiqueta: 'años de experiencia del equipo; empresa formalizada en 2026' },
  { cifra: '$', etiqueta: 'precios competitivos, sin sorpresas' },
  { cifra: '✓', etiqueta: 'cumplimiento de plazos garantizado' },
];

export interface Testimonio {
  cita: string;
  autor: string;
}

/**
 * PLACEHOLDERS. Confirmados como genéricos por el cliente.
 * Reemplazar por testimonios reales o eliminar la sección antes de publicar.
 * Ver README.md, "Pendiente antes de publicar".
 */
export const testimonios: Testimonio[] = [
  {
    cita: 'Trabajo rápido y sin contratiempos. Cumplieron el plazo acordado.',
    autor: 'Cliente de obra residencial',
  },
  {
    cita: 'Maquinaria en buen estado y operadores con experiencia.',
    autor: 'Cliente de construcción',
  },
  {
    cita: 'Buen precio y comunicación clara durante todo el proyecto.',
    autor: 'Cliente particular',
  },
];
