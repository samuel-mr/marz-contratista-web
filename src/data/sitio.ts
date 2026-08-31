/*
 * Contenido del sitio. Separado del markup para que crezca sin tocar
 * componentes: añadir un servicio o un testimonio es añadir un objeto aquí.
 */

export const empresa = {
  nombre: 'Excavaciones Martínez',
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
  titulo: 'Excavaciones Martínez | Movimiento de tierras en Lima',
  descripcion:
    'Excavación de terrenos, nivelación y demolición con maquinaria pesada en Lima. Precios competitivos y cumplimiento de plazos. Llámanos o escríbenos por WhatsApp.',
} as const;

export interface Servicio {
  numero: string;
  titulo: string;
  cuerpo: string;
}

export const servicios: Servicio[] = [
  {
    numero: '01',
    titulo: 'Excavación de terrenos',
    cuerpo:
      'Excavación en roca y tierra para cimentaciones, zanjas y obras civiles.',
  },
  {
    numero: '02',
    titulo: 'Nivelación y desmonte',
    cuerpo:
      'Preparación y nivelación de terrenos para construcción y urbanización.',
  },
  {
    numero: '03',
    titulo: 'Demolición de estructuras',
    cuerpo: 'Demolición con martillo hidráulico y retiro de escombros.',
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
