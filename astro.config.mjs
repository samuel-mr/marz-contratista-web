// @ts-check
import { existsSync, readdirSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * El sitio vive en un dominio propio y se sirve desde la raíz, así que `site`
 * es una constante y no hay `base`.
 *
 * Antes ambos se derivaban de GITHUB_REPOSITORY para poder publicar en
 * cualquier repositorio sin editar código. Esa flexibilidad causó un fallo
 * real en producción: el dominio propio se conectó DESPUÉS del último
 * despliegue, así que el build que estaba servido llevaba cocido
 * `base: "/marz-contratista-web"` y todos los assets daban 404 en
 * mrxcontratistas.pe. Un build no debe depender del estado de un ajuste
 * externo que puede cambiar después de haberse construido.
 *
 * El https:// va escrito a mano a propósito. GitHub reporta el sitio como
 * http:// mientras "Enforce HTTPS" esté apagado en Settings > Pages, y
 * tomar el origen de ahí metía URLs canónicas en http dentro del HTML.
 *
 * SITE queda como escape para previews en otro dominio:
 *   SITE=https://preview.ejemplo.pe pnpm build
 */
const site = process.env.SITE ?? 'https://mrxcontratistas.pe';

/*
 * La galería vacía lleva noindex (src/pages/obras/index.astro), así que
 * tampoco debe estar en el sitemap: Google marca como error una URL del
 * sitemap que pide no ser indexada. Se cuenta en disco porque la config se
 * evalúa antes que las colecciones de contenido. Una carpeta con
 * `publicar: false` cuenta igual; el desfase es aceptable.
 */
const dirObras = './src/content/obras';
const hayObras =
  existsSync(dirObras) &&
  readdirSync(dirObras, { withFileTypes: true }).some(
    (d) => d.isDirectory() && existsSync(`${dirObras}/${d.name}/index.md`),
  );

// https://astro.build/config
export default defineConfig({
  site,
  // Sin `base`: un dominio propio sirve desde la raíz.

  integrations: [
    sitemap({
      filter: (url) => hayObras || !url.endsWith('/obras/'),
    }),
  ],

  // Fuentes self-hosted: Astro las descarga en build y las sirve desde el
  // propio dominio, con preload y fallbacks calculados. Evita el <link>
  // render-blocking contra fonts.googleapis.com.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bebas Neue',
      cssVariable: '--fuente-titulo',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Work Sans',
      cssVariable: '--fuente-cuerpo',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
