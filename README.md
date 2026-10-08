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

**No hay nada que configurar.** `site` y `base` se derivan solos en
`astro.config.mjs`, así que el proyecto se puede publicar en cualquier
repositorio sin editar código:

| Dónde se publica | `site` | `base` |
|---|---|---|
| Repo de proyecto (`usuario/mi-repo`) | `https://usuario.github.io` | `/mi-repo` |
| User page (`usuario/usuario.github.io`) | `https://usuario.github.io` | raíz |
| Dominio propio (variable `SITE`) | el valor de `SITE` | raíz |
| Local (`pnpm dev`) | `http://localhost:4321` | raíz |

En GitHub Actions no se usa esa derivación: el workflow obtiene la URL real de
la API de Pages (`actions/configure-pages`) y la pasa como `--site` y `--base`,
que tienen prioridad sobre `astro.config.mjs`. El resultado es el mismo, pero
sin deducir nada del nombre del repositorio, así que funciona igual con dominio
propio. La derivación de `astro.config.mjs` queda como respaldo y para local.

### Pasos

1. Crear el repositorio en GitHub y hacer push de la rama `main`.
2. **Settings → Pages → Source: GitHub Actions**.
3. Listo. El workflow corre en cada push a `main`.

### Con dominio propio

El dominio elegido es **`mrxcontratistas.pe`**.

> **Todavía no está conectado, y el orden importa.** A fecha de hoy el dominio
> no resuelve: `dig mrxcontratistas.pe` no devuelve nada. Si se añade
> `public/CNAME` antes de que el DNS apunte a GitHub, Pages empieza a redirigir
> la URL de `github.io` al dominio nuevo y **el sitio se cae** hasta que el DNS
> propague. Por eso `public/CNAME` no está en el repo: es el último paso, no el
> primero.

Orden correcto:

1. Registrar `mrxcontratistas.pe` y apuntar el DNS a GitHub Pages:
   - cuatro registros `A` del ápice a `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`;
   - un `CNAME` de `www` a `<usuario>.github.io`.
2. Esperar a que propague. Comprobar con `dig +short mrxcontratistas.pe`.
3. **Settings → Pages → Custom domain**: escribir el dominio y esperar la
   verificación. GitHub crea el `CNAME` en el repo por su cuenta.
4. Marcar **Enforce HTTPS** cuando GitHub termine de emitir el certificado
   (puede tardar hasta 24 h).

**No hace falta tocar el workflow.** `actions/configure-pages` lee la URL real
que haya configurada en Settings → Pages y la pasa como `--site`, así que en
cuanto el dominio esté puesto ahí el build lo usa solo. La variable `SITE` de
`astro.config.mjs` existe solo para builds fuera de Actions; duplicar el dominio
en el workflow crearía un segundo sitio donde mantenerlo sincronizado.

`base` desaparece solo: un dominio propio sirve desde la raíz.

## Pendiente antes de publicar

### Contenido
- [ ] **Testimonios**: los tres son placeholders genéricos inventados.
      Reemplazar por reales o eliminar la sección (`src/data/sitio.ts`).
- [ ] **"+15 años"**: valor asumido, no confirmado por el cliente.
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

- [ ] **Dominio**: `mrxcontratistas.pe`, pendiente de registrar y apuntar.
      Ver [Con dominio propio](#con-dominio-propio) — el orden de los pasos importa.
- [ ] **JSON-LD `LocalBusiness`**. La mayor palanca para búsquedas locales tipo
      "excavaciones lima". Requiere del cliente: razón social, dirección o zona
      de servicio, distritos cubiertos, horario, año de fundación, rango de precios.
- [ ] **Open Graph + Twitter Card** con imagen 1200×630. Es lo que se ve al
      compartir el enlace por WhatsApp, el canal principal del negocio.
- [ ] **`sitemap.xml`** (`@astrojs/sitemap`) y **`robots.txt`**.
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
- Email: **roymartinezramirez@gmail.com**
- Ciudad: **Lima, Perú**
