# MRX CONTRATISTAS — Landing

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
  assets/hero-panoramica.webp  foto del hero (1920×800, 2.4:1)
  assets/icono.png        isotipo oficial; define el rojo de marca
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

### Servicios

| # | Servicio | Descripción | Tipos de obra |
|---|---|---|---|
| 01 | Excavación | Excavación en roca y tierra para cimentaciones y obras civiles. | Cisternas, Zapatas, Zanjas, Calzaduras, Sótanos |
| 02 | Nivelación y movimiento de tierras | Preparación y nivelación de terrenos para construcción y urbanización. | Nivelación, Movimiento de tierras, Relleno, Compactado, Afirmado |
| 03 | Demolición | Demolición con martillo hidráulico y retiro de escombros. | Casas, Edificios, Tanques, Estructuras de concreto |
| 04 | Eliminación de desmonte | Retiro con volquete y disposición en botadero autorizado. | Volquete, Botadero autorizado |
| 05 | Alquiler de maquinaria | Maquinaria pesada con operador o sin operador. | Con operador, Sin operador, Por hora, Por día, Por mes |
| 06 | Obras civiles | Ejecución de obras de concreto e infraestructura. | Cimentaciones, Muros de contención, Pistas y veredas, Obras de concreto |

### Galería de obras

`/obras/` y una página por obra en `/obras/<slug>/`, generadas desde la
colección `src/content/obras/` (esquema en `src/content.config.ts`). Cómo
añadir una obra: `src/content/obras/README.md`.

Mientras no haya obras, `/obras/` lleva `noindex` y queda fuera del sitemap, y
la home no muestra la sección "Obras recientes".

Si borras una obra en local y el build falla con `ImageNotFound`, es el caché
de contenido: `rm -rf .astro node_modules/.astro`. En CI no pasa (build limpio).

### Primitivos

| Componente | Para qué |
|---|---|
| `Boton` | Enlace-botón. 4 variantes de color, 2 tamaños, evento de analítica opcional. |
| `Seccion` | Contenedor con ancho máximo, padding y H2 con regla. |
| `Tarjeta` | Caja hairline. La usan Servicios y Testimonios. |
| `Rejilla` | Grid `auto-fit`. Colapsa a una columna sin media queries. |
| `Logo` | Isotipo oficial en PNG (`src/assets/icono.png`). Color fijo: no sirve sobre la banda roja. |

### Rutas

Cualquier ruta absoluta escrita a mano debe pasar por `src/lib/rutas.ts`.
Un `href="/algo"` literal se rompe al desplegar bajo un `base`
(`https://usuario.github.io/repo/`).

## Design tokens

Definidos en `src/styles/tokens.css`. Cambiar un valor ahí lo propaga a todo el sitio.

**Colores**

| Token | Hex | Uso |
|---|---|---|
| `--c-bg` | `#faf9f7` | Fondo global |
| `--c-texto` | `#1b1917` | Texto sobre el fondo claro |
| `--c-acento` | `#BC2425` | Rojo MRX: CTAs, números, reglas, banda final |
| `--c-acento-hover` | `#9c1f20` | Hover del botón sólido y de los enlaces |
| `--c-superficie` | `#f0ede8` | Fondo de reserva de imagen |
| `--c-borde` | `#d9d3cb` | Bordes hairline |
| `--c-borde-hover` | `#e9e4dd` | Hover del botón claro sobre la banda roja |
| `--c-whatsapp` | `#25D366` | Solo el botón flotante (color de marca externo) |

**El rojo sale del isotipo, no al revés.** `#BC2425` es el color exacto de
`src/assets/icono.png`, que es un PNG de paleta indexada. `brand/full-brand.jpg`
muestrea ~`#AE272D`, pero es JPEG: eso es deriva de compresión, no otro color.
Si cambia el isotipo, el token va detrás.

**El acento hace un solo trabajo a la vez.** Sobre el fondo claro es texto y filete
(5.8:1, AA); como relleno lleva siempre `--c-bg` encima (5.8:1, AA). Lo que no
existe es texto oscuro sobre rojo: da 2.0:1 y falla WCAG. Por eso los botones
`solid` y la banda final usan `--c-bg` como color de texto y no un gris oscuro, y
por eso la variante de botón que va sobre la banda se llama `inverso` y no `dark`.

Los neutros llevan sesgo cálido a propósito. Un gris puro al lado del rojo se
lee azulado, y además emparenta mal con el polvo de las fotos de obra.

**Tipografía** — `Bebas Neue` (400) para titulares, `Work Sans` (400–700) para cuerpo.
Todos los titulares van en uppercase.

**Otros** — `border-radius: 0` en todo excepto el botón flotante de WhatsApp (50%).
Ancho máximo 1100px. Target táctil mínimo 44px. Una sola sombra, la del botón flotante.

## Imagen del hero

Un único archivo fuente, `src/assets/hero-panoramica.webp` (1920×800, **2.4:1**).
Astro genera en build:

- **Escritorio**: srcset de 1280 / 1600 / 1920 px.
- **Móvil** (`max-width: 899px`): recorte **3:2 centrado** de 1200×800, generado
  con `getImage({ fit: 'cover', position: 'center' })`.

Para cambiar la foto basta reemplazar el archivo: el recorte móvil se regenera
solo. Para reencuadrar, cambiar `position` en `src/components/Hero.astro`
(acepta los mismos valores que `object-position` de CSS).

### El hero tiene dos disposiciones, no una

- **≥900px** la foto ocupa el hero entero y el texto va **encima**, a la
  izquierda, sobre un velo claro en degradado.
- **<900px** se apila: texto sobre fondo liso y debajo la foto a 3:2.

Dos consecuencias que conviene no olvidar:

1. **La foto de reemplazo tiene que respetar la composición.** El velo da por
   hecho que el sujeto está en el tercio derecho y que la mitad izquierda es
   fondo (cielo, valle, cerro). Una foto con la máquina centrada queda tapada
   por el texto.
2. **Los topes del degradado y el ancho del texto son un solo ajuste.** El texto
   ocupa `min(50%, 560px)` de la columna de 1100px; el velo es opaco hasta el
   42% y se apaga en el 84%. Si se ensancha el texto, hay que correr los topes.

En móvil no hay texto sobre la foto a propósito: texto claro sobre imagen en un
celular al aire libre es donde se pierde la legibilidad, y es donde se abre este
sitio.

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

El destino es siempre el mismo: `https://mrxcontratistas.pe`, desde la raíz.
Está escrito a mano en `astro.config.mjs` y el workflow no lo sobrescribe.

| Dónde | `site` | `base` |
|---|---|---|
| Producción | `https://mrxcontratistas.pe` | raíz |
| Preview (`SITE=... pnpm build`) | el valor de `SITE` | raíz |
| Local (`pnpm dev`) | `https://mrxcontratistas.pe` | raíz |

El porqué de que sean constantes y no se deriven está en
[Dominio propio](#dominio-propio-mrxcontratistaspe): la derivación automática
rompió el sitio en producción.

### Pasos

1. **Settings → Pages → Source: GitHub Actions**.
2. El workflow corre en cada push a `main`. No hay nada más que configurar.

### Dominio propio: mrxcontratistas.pe

**Ya está conectado.** DNS en Punto.pe, correo en Google Workspace.

| Qué | Estado |
|---|---|
| `A` del ápice | las cuatro IPs de GitHub Pages |
| `CNAME` de `www` | `samuel-mr.github.io` |
| Custom domain en Settings → Pages | `mrxcontratistas.pe` |
| Certificado TLS | emitido para el ápice y `www`, expira 2027-01-14 |
| **Enforce HTTPS** | **apagado** — pendiente de marcar |

#### No hay `public/CNAME`, y es correcto

Con `build_type: workflow` el dominio vive en los ajustes de Pages, no en un
archivo del repositorio. La prueba es que el sitio ya se sirve en el dominio
sin que ese archivo exista. Añadirlo sería un fichero que aparenta ser
load-bearing sin serlo. Para comprobar el estado real:

```bash
gh api repos/samuel-mr/marz-contratista-web/pages
```

#### `site` y `base` son constantes, no se derivan

Están escritos a mano en `astro.config.mjs` y el workflow **no** los
sobrescribe. Antes se tomaban de los outputs de `actions/configure-pages`, y
eso ató el build al estado de Settings → Pages en el momento de ejecutarlo.
Produjo dos fallos reales:

1. **El 404 de todos los assets.** El dominio se conectó después del último
   despliegue, así que el build en producción llevaba cocido
   `base: "/marz-contratista-web"`. Al empezar a servir desde la raíz del
   dominio, cada ruta apuntaba a un prefijo inexistente.
2. **Canonical URLs en `http://`.** `steps.pages.outputs.origin` devuelve
   `http://` mientras Enforce HTTPS esté apagado.

La lección es que un build no debe depender de un ajuste externo que puede
cambiar después de haberse construido. Si alguna vez cambia el dominio, se
edita `astro.config.mjs` y se redespliega — un solo sitio donde tocarlo.

#### Si el dominio cambia otra vez

El `base` se fue del todo: el sitio asume raíz. Para volver a publicar bajo un
subdirectorio (`usuario.github.io/repo/`) hay que reintroducir `base` en
`astro.config.mjs`. Las rutas del código ya lo soportan: todas pasan por
`ruta()` en `src/lib/rutas.ts`, que respeta `BASE_URL`.

## Pendiente antes de publicar

### Contenido
- [ ] **Testimonios**: los tres son placeholders genéricos inventados.
      Reemplazar por reales o eliminar la sección (`src/data/sitio.ts`).
- [x] **Experiencia**: "Equipo con +5 años de experiencia; empresa formalizada en 2026". Es la única cifra válida.
- [ ] **Foto del hero**: `src/assets/hero-panoramica.webp` (1920×800) ya está en el
      hero, pero sigue siendo una imagen generada. Sustituir por fotografía real de
      la maquinaria de la empresa, **respetando la composición**: la disposición
      superpuesta de escritorio da por hecho que el sujeto está a la derecha y la
      mitad izquierda es fondo. Una foto con la máquina centrada rompe el velo.
- [ ] **Logo en vector**: `src/assets/icono.png` es el isotipo oficial y la fuente
      del rojo de marca, pero es un PNG de 415×387 y color fijo. Hace falta un SVG
      para dos cosas que hoy no se pueden: usarlo sobre la banda roja (necesita
      versión clara) y cualquier pieza impresa. El logotipo completo de referencia
      está en `brand/full-brand.jpg`, fuera del build.

### SEO — deliberadamente no implementado
Se pospuso por ser una demo. Para publicar hace falta:

- [x] **Dominio**: `mrxcontratistas.pe`, conectado y con certificado emitido.
- [x] **Enforce HTTPS**: activo (verificado el 18-oct-2026).
- [x] **JSON-LD `GeneralContractor`** en `src/components/DatosEstructurados.astro`.
      Negocio de área de servicio: sin calle, solo Lima.
- [x] **Open Graph + Twitter Card** con imagen 1200×630 generada en build desde el hero.
- [x] **`sitemap-index.xml`** (`@astrojs/sitemap`) y **`robots.txt`**.
- [x] **Página 404** propia (`src/pages/404.astro`).
- [ ] **Favicon completo**: hay `favicon.png` 32px y `apple-touch-icon.png` 180px,
      ambos generados desde `src/assets/icono.png`. Falta `manifest.webmanifest`.
- [ ] **Google Business Profile**. No es código, pero para un negocio local pesa
      más que todo lo anterior junto.

### Analítica
- [ ] Levantar el servidor de Umami y rellenar `.env`.
- [ ] Verificar que `data-umami-event` es el mecanismo correcto en la versión de
      Umami que se instale.

## Contacto de la empresa

- Teléfono / WhatsApp: **+51 972 014 679**
- Email: **contacto@mrxcontratistas.pe**
- Ciudad: **Lima, Perú** (la dirección fiscal no se publica)
- Razón social: **MRX CONTRATISTAS S.A.C.S.** · RUC **20616671147**
