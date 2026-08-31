# Excavaciones Martínez — Landing

Landing de una sola pantalla para una empresa de excavaciones con maquinaria
pesada en Lima. El objetivo es **generar leads por contacto directo**: llamada
telefónica o WhatsApp. No hay formulario ni backend.

> **Estado: demo.** No publicar todavía. Ver [Pendiente antes de publicar](#pendiente-antes-de-publicar).

## Arranque

```bash
pnpm install
pnpm dev      # desarrollo
pnpm build    # genera dist/
pnpm preview  # sirve dist/ (se demoniza: `pnpm astro preview stop` para pararlo)
```

Requisitos:

- **Node ≥ 22.12.** Las versiones impares (v23, v25) no están soportadas por Astro.
- **pnpm ≥ 11.** El proyecto usa pnpm **exclusivamente**; está fijado en
  `packageManager` para que Corepack use la versión correcta.
  No usar `npm` ni `yarn`: generarían un lockfile paralelo y la acción de
  despliegue elige el gestor a partir del lockfile que encuentre.

## Stack

- **Astro 7**, salida estática, sin adapter.
- **CSS plano con custom properties** y `<style>` scoped por componente.
  Sin Tailwind ni CSS-in-JS.
- **Fuentes self-hosted** por la Fonts API de Astro (`fonts` en `astro.config.mjs`).
  Se descargan en build y se sirven desde el propio dominio, con preload y
  fallbacks de métricas ajustadas. Subset `latin` únicamente: el español entra
  completo en U+0000–00FF.

## Estructura

```
src/
  assets/hero.webp        único asset de imagen (1920×1072)
  components/             primitivos reutilizables + secciones
  data/sitio.ts           TODO el contenido y los datos de contacto
  layouts/Base.astro      <head>, fuentes, analítica
  lib/rutas.ts            helper de rutas que respeta `base`
  pages/index.astro       composición de la landing
  styles/tokens.css       design tokens + reset
public/
  .nojekyll               obligatorio: GH Pages ignora /_astro/ sin él
  favicon.svg
```

### Editar contenido

Servicios, estadísticas, testimonios, teléfono, email y textos de SEO viven en
**`src/data/sitio.ts`**. Añadir un servicio es añadir un objeto al array. No
hace falta tocar markup.

### Primitivos

| Componente | Para qué |
|---|---|
| `Boton` | Enlace-botón. 4 variantes de color, 2 tamaños, evento de analítica opcional. |
| `Seccion` | Contenedor con ancho máximo, padding y H2 con regla. |
| `Tarjeta` | Caja hairline. La usan Servicios y Testimonios. |
| `Rejilla` | Grid `auto-fit`. Colapsa a una columna sin media queries. |
| `Logo` | Marca en SVG con `currentColor`. Sirve sobre fondo oscuro y sobre el amarillo. |

### Rutas

Cualquier ruta absoluta escrita a mano debe pasar por `src/lib/rutas.ts`.
Un `href="/algo"` literal se rompe al desplegar bajo un `base`
(`https://usuario.github.io/repo/`).

## Design tokens

Definidos en `src/styles/tokens.css`. Cambiar un valor ahí lo propaga a todo el sitio.

**Colores**

| Token | Hex | Uso |
|---|---|---|
| `--c-bg` | `#14151a` | Fondo global |
| `--c-texto` | `#f2f2f0` | Texto sobre fondo oscuro |
| `--c-acento` | `#F4C430` | Amarillo seguridad: CTAs, números, reglas, banda final |
| `--c-acento-hover` | `#e0b528` | Hover del botón sólido |
| `--c-acento-claro` | `#ffd863` | Hover de enlaces |
| `--c-superficie` | `#1c1d22` | Fondo de reserva de imagen |
| `--c-borde` | `#2a2b30` | Bordes hairline |
| `--c-borde-hover` | `#22242b` | Hover del botón oscuro |
| `--c-whatsapp` | `#25D366` | Solo el botón flotante (color de marca externo) |

**Tipografía** — `Bebas Neue` (400) para titulares, `Work Sans` (400–700) para cuerpo.
Todos los titulares van en uppercase.

**Otros** — `border-radius: 0` en todo excepto el botón flotante de WhatsApp (50%).
Ancho máximo 1100px. Target táctil mínimo 44px. Una sola sombra, la del botón flotante.

## Imagen del hero

Un único archivo fuente, `src/assets/hero.webp`. Astro genera en build:

- **Escritorio**: srcset de 960 / 1440 / 1920 px, 16:9.
- **Móvil** (`max-width: 639px`): recorte **4:5 centrado** de 800×1000, generado
  con `getImage({ fit: 'cover', position: 'center' })`.

Para cambiar la foto basta reemplazar el archivo: el recorte móvil se regenera
solo. Para reencuadrar, cambiar `position` en `src/components/Hero.astro`
(acepta los mismos valores que `object-position` de CSS).

`quality: 72` es explícita a propósito. Con la calidad por defecto, la variante
de 1920px se re-codificaba **más pesada que el propio original**.

### sharp es dependencia explícita

`sharp` está en `dependencies` a propósito, aunque Astro lo traiga por dentro.
El `node_modules` estricto de pnpm no lo expone a la raíz del proyecto, y sin
él Astro **no falla**: emite un aviso y sirve la imagen original sin optimizar,
sin `srcset` y sin el recorte de móvil. No quitarlo.

Los scripts de instalación permitidos se declaran en `pnpm-workspace.yaml`
(`allowBuilds`). pnpm los bloquea por defecto como medida de cadena de
suministro.

## Analítica

Umami self-hosted. Inerte mientras no existan las variables de entorno, así que
el sitio compila y funciona sin ella.

```bash
cp .env.example .env   # y rellenar
```

Los CTAs ya llevan `data-umami-event`: `llamar-header`, `llamar-hero`,
`whatsapp-hero`, `llamar-cta-final`, `whatsapp-cta-final`, `whatsapp-flotante`.

## Despliegue: GitHub Pages

Salida 100% estática, una sola página, sin funciones de servidor. El workflow
está en `.github/workflows/deploy.yml` (acción oficial `withastro/action`).

**No hay nada que configurar.** `site` y `base` se derivan solos en
`astro.config.mjs`, así que el proyecto se puede publicar en cualquier
repositorio sin editar código:

| Dónde se publica | `site` | `base` |
|---|---|---|
| Repo de proyecto (`usuario/mi-repo`) | `https://usuario.github.io` | `/mi-repo` |
| User page (`usuario/usuario.github.io`) | `https://usuario.github.io` | raíz |
| Dominio propio (variable `SITE`) | el valor de `SITE` | raíz |
| Local (`pnpm dev`) | `http://localhost:4321` | raíz |

En GitHub Actions, `GITHUB_REPOSITORY` llega solo. No hace falta pasar nada.

### Pasos

1. Crear el repositorio en GitHub y hacer push de la rama `main`.
2. **Settings → Pages → Source: GitHub Actions**.
3. Listo. El workflow corre en cada push a `main`.

### Con dominio propio

Cuando haya uno:

1. Definir `SITE` en el workflow:
   ```yaml
   - uses: withastro/action@v6
     env:
       SITE: 'https://tu-dominio.pe'
   ```
2. Crear `public/CNAME` con el dominio en una sola línea.
3. Configurarlo en Settings → Pages y esperar la verificación.

`base` desaparece solo: un dominio propio sirve desde la raíz.

> `www.marz.com` **no está disponible**. `marz.com` está registrado desde 1996
> (expira en 2027) y `www.marz.com` ya resuelve a otro sitio. Por eso no hay
> `public/CNAME` en el repo.

## Pendiente antes de publicar

### Contenido
- [ ] **Testimonios**: los tres son placeholders genéricos inventados.
      Reemplazar por reales o eliminar la sección (`src/data/sitio.ts`).
- [ ] **"+15 años"**: valor asumido, no confirmado por el cliente.
- [ ] **Foto del hero**: generada por IA. Sustituir por fotografía real de la
      maquinaria de la empresa.
- [ ] **Logo**: hoy es una marca genérica de cucharón. Si la empresa tiene logo
      propio, reemplazar `src/components/Logo.astro`.

### SEO — deliberadamente no implementado
Se pospuso por ser una demo. Para publicar hace falta:

- [ ] **Dominio definitivo** y `site` apuntando a él.
- [ ] **JSON-LD `LocalBusiness`**. La mayor palanca para búsquedas locales tipo
      "excavaciones lima". Requiere del cliente: razón social, dirección o zona
      de servicio, distritos cubiertos, horario, año de fundación, rango de precios.
- [ ] **Open Graph + Twitter Card** con imagen 1200×630. Es lo que se ve al
      compartir el enlace por WhatsApp, el canal principal del negocio.
- [ ] **`sitemap.xml`** (`@astrojs/sitemap`) y **`robots.txt`**.
- [ ] **Favicon completo**: hoy solo `favicon.svg`. Falta `.ico` 32px,
      `apple-touch-icon` 180px y `manifest.webmanifest`.
- [ ] **Google Business Profile**. No es código, pero para un negocio local pesa
      más que todo lo anterior junto.

### Analítica
- [ ] Levantar el servidor de Umami y rellenar `.env`.
- [ ] Verificar que `data-umami-event` es el mecanismo correcto en la versión de
      Umami que se instale.

## Contacto de la empresa

- Teléfono / WhatsApp: **+51 972 014 679**
- Email: **roymartinezramirez@gmail.com**
- Ciudad: **Lima, Perú**
