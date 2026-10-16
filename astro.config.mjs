// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

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

// https://astro.build/config
export default defineConfig({
  site,
  // Sin `base`: un dominio propio sirve desde la raíz.

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
