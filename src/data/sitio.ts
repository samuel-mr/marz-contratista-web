/*
 * Contenido del sitio. Separado del markup para que crezca sin tocar
 * componentes: añadir un servicio o un testimonio es añadir un objeto aquí.
 */

export const empresa = {
  nombre: 'MARZ CONTRATISTAS',
  ciudad: 'Lima, Perú',
  telefono: '+51 972 014 679',
  /** Formato E.164 sin espacios, para los href de tel: y wa.me */
  telefonoRaw: '+51972014679',
  whatsapp: '51972014679',
  email: 'roymartinezramirez@gmail.com',
} as const;

export const telHref = `tel:${empresa.telefonoRaw}`;
export const waHref = `https://wa.me/${empresa.whatsapp}`;

export const seo = {
  titulo: 'MARZ CONTRATISTAS | Movimiento de tierras en Lima',
  descripcion:
    'Excavación de terrenos, nivelación y demolición con maquinaria pesada en Lima. Precios competitivos y cumplimiento de plazos. Llámanos o escríbenos por WhatsApp.',
} as const;

export interface Servicio {
  numero: string;
  titulo: string;
  cuerpo: string;
  /** Tipos de obra concretos. Además de orientar al cliente, cubren búsquedas
   *  locales que el resto de la página no toca ("calzaduras Lima"). */
  etiquetas: string[];
}

export const servicios: Servicio[] = [
  {
    numero: '01',
    titulo: 'Excavación',
    cuerpo:
      'Excavación en roca y tierra para cimentaciones y obras civiles.',
    etiquetas: ['Cisternas', 'Zapatas', 'Zanjas', 'Calzaduras', 'Sótanos'],
  },
  {
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
    numero: '03',
    titulo: 'Demolición',
    cuerpo: 'Demolición con martillo hidráulico y retiro de escombros.',
    etiquetas: ['Casas', 'Edificios', 'Tanques', 'Estructuras de concreto'],
  },
  {
    numero: '04',
    titulo: 'Eliminación de desmonte',
    cuerpo: 'Retiro con volquete y disposición en botadero autorizado.',
    etiquetas: ['Volquete', 'Botadero autorizado'],
  },
];

export interface Stat {
  cifra: string;
  etiqueta: string;
}

export const stats: Stat[] = [
  { cifra: '+15', etiqueta: 'años de experiencia en el rubro' },
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
