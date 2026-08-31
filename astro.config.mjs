// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

/*
 * `site` y `base` se derivan solos. Así el proyecto se puede publicar en
 * cualquier repositorio sin editar nada: no hay nombres de repo ni de usuario
 * escritos a mano que puedan quedar desincronizados.
 *
 * Reglas, en orden de prioridad:
 *
 *   1. Dominio propio → definir la variable de entorno SITE.
 *      Sirve desde la raíz, así que no lleva `base`.
 *      Ej: SITE=https://excavacionesmartinez.pe
 *
 *   2. GitHub Actions → GITHUB_REPOSITORY llega como "usuario/repo".
 *      - Repo llamado "usuario.github.io" (user page): raíz, sin `base`.
 *      - Cualquier otro repo (project page): base = "/repo".
 *
 *   3. Local (dev, build, preview) → raíz, sin `base`.
 */
const dominioPropio = process.env.SITE;
const [propietario, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');

const esUserPage =
  !!propietario &&
  !!repo &&
  repo.toLowerCase() === `${propietario.toLowerCase()}.github.io`;

const site = dominioPropio
  ? dominioPropio
  : propietario
    ? `https://${propietario}.github.io`
    : 'http://localhost:4321';

// undefined deja el valor por defecto de Astro, que es "/".
const base = dominioPropio || esUserPage || !repo ? undefined : `/${repo}`;

// https://astro.build/config
export default defineConfig({
  site,
  base,

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
