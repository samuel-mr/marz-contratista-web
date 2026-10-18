/*
 * Galería de obras. Cada obra es una carpeta en src/content/obras/<slug>/
 * con un index.md y sus fotos al lado. Cómo añadir una: ver
 * src/content/obras/README.md.
 *
 * El slug sale del nombre de la carpeta (AAAA-MM-distrito-servicio), no del
 * título: así la URL no cambia si se corrige el título.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { servicios } from './data/sitio';

const idsServicio = servicios.map((s) => s.id) as [string, ...string[]];

const obras = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/obras',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      /** AAAA-MM. Ordena la galería, de la más reciente a la más antigua. */
      fecha: z.string().regex(/^\d{4}-\d{2}$/, 'fecha debe ser AAAA-MM'),
      distrito: z.string(),
      servicio: z.enum(idsServicio),
      /** Una o dos frases. Va en la tarjeta y en la meta description. */
      resumen: z.string().max(160),
      volumen: z.string().optional(),
      duracion: z.string().optional(),
      maquinaria: z.string().optional(),
      /** Solo si el cliente autorizó mostrar su nombre. */
      cliente: z.string().optional(),
      portada: image(),
      portadaAlt: z.string(),
      fotos: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            etapa: z.enum(['antes', 'durante', 'despues']).optional(),
          }),
        )
        .default([]),
      /** Videos en YouTube (ID del video). Los videos no van en el repo. */
      videos: z
        .array(z.object({ youtube: z.string(), titulo: z.string() }))
        .default([]),
      publicar: z.boolean().default(true),
    }),
});

export const collections = { obras };
