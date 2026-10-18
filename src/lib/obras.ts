import { getCollection, type CollectionEntry } from 'astro:content';
import { servicios } from '../data/sitio';

export type Obra = CollectionEntry<'obras'>;

/** Obras con `publicar: true`, de la más reciente a la más antigua. */
export async function obrasPublicadas(): Promise<Obra[]> {
  const obras = await getCollection('obras', ({ data }) => data.publicar);
  // AAAA-MM ordena bien como texto.
  return obras.sort((a, b) => b.data.fecha.localeCompare(a.data.fecha));
}

const formatoMes = new Intl.DateTimeFormat('es-PE', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2025-08" -> "agosto de 2025" */
export function fechaLegible(fecha: string): string {
  return formatoMes.format(new Date(`${fecha}-01T00:00:00Z`));
}

export function nombreServicio(id: string): string {
  return servicios.find((s) => s.id === id)?.titulo ?? id;
}
