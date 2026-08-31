/*
 * Construye rutas absolutas respetando `base` de astro.config.mjs.
 * Sin esto, un href escrito a mano como "/favicon.svg" apunta a la raíz del
 * dominio y se rompe al desplegar en https://usuario.github.io/<repo>/.
 */
const BASE = import.meta.env.BASE_URL;

/** Base normalizada, siempre con barra final. */
export const inicio = BASE.endsWith('/') ? BASE : `${BASE}/`;

/** ruta('favicon.svg') -> '/<base>/favicon.svg' */
export function ruta(destino: string): string {
  return inicio + destino.replace(/^\/+/, '');
}
