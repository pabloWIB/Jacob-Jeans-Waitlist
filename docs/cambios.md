# Registro de cambios — reorganización de Jacob Jeans

Estado de partida documentado en [auditoria.md](auditoria.md).
Ningún cambio se ha subido: todo es local, sin ejecutar comandos de git.

---

## Fase 1 — Auditoría

- Inventario completo de los 52 archivos en `docs/auditoria.md`.
- Dimensiones y peso reales de las 35 imágenes medidos con ImageMagick.
- Uso real de cada imagen verificado con `grep` sobre HTML, CSS, SCSS y JS.

---

## Fase 2 — Estructura

Árbol nuevo:

```
index.html · 404.html · robots.txt · sitemap.xml · .gitignore · LICENSE · README.md
assets/css/{base,layout,components}.css
assets/js/main.js + assets/js/modules/{config,dialogs,panel,subscribe}.js
assets/img/{logo,content,icons}/
docs/{auditoria,cambios}.md + jacob-jeans.fig
```

| Antes | Ahora |
|---|---|
| `CSS/styles.css` (940 líneas, un archivo) | `assets/css/base.css` + `layout.css` + `components.css` |
| `CSS/Fonts/fontSizes.css` | Fundido en `base.css`; el `@import` encadenado desapareció |
| `CSS/styles.scss`, `CSS/styles.css.map` | Eliminados: no hay build y el CSS pasa a ser la fuente única |
| `JS/script.js`, `JS/email.js`, `JS/zoom.js` | `assets/js/main.js` + 4 módulos ES |
| `IMG/` (5 subcarpetas, 32 archivos) | `assets/img/logo|content|icons` (11 archivos) |
| `Jacob Jeans.fig` | `docs/jacob-jeans.fig` (sin espacios ni mayúsculas) |

No se creó `assets/css/pages/` ni `assets/fonts/`: el sitio tiene una sola página
y la única tipografía se sirve desde Google Fonts.

Todos los nombres pasaron a minúsculas con guiones:
`Blackhoodie4.jpg` → `jacob-jeans-hoodie-st-lucia.webp`,
`JacobJeansWhiteLogo.png` → `jacob-jeans-monogram-white.webp`, etc.

---

## Fase 3 — Higiene

### Eliminado

| Archivo | Motivo |
|---|---|
| `IMG/hero.jpg` (10,47 MB, 18000×12000) | Huérfano. Ningún archivo lo referenciaba. |
| 20 imágenes más (hoodie1-5, repeat, testimonial1-2, PC, PHONE, comingSoon1-3, thank, wait, JacobJeansYellow, JacobJeansMes.jpg, closeBlue.svg, down.svg) | Huérfanas, confirmado con `grep`. 10,6 MB en total. |
| `IMG/SVG/{instagram,youtube}.svg` | Sus enlaces se eliminaron (ver Fase 8). |
| `CSS/styles.scss`, `CSS/styles.css.map` | Sin build declarado; el source map se servía en producción. |
| `.htaccess` | Reescritura de Apache. El sitio se despliega en Vercel, que lo ignora, y solo hay una página. |
| `.github/workflows/npm-grunt.yml` | Ejecutaba `npm install && grunt` sin `package.json` ni `Gruntfile.js`: fallaba en cada push. |
| `JS/zoom.js` | Bloqueaba el zoom del navegador (incumple WCAG 2.1 SC 1.4.4). |
| jQuery 3.7.1 y 1.12.0 | ~184 KB para `$()` y `addClass()`. Sustituidos por API nativa. |
| `owl.carousel.min.css` | Se cargaba sin markup ni JS de carrusel. |
| `normalize.css` (CDN) | Reemplazado por un reset propio de 30 líneas en `base.css`. Una petición externa menos. |
| Reglas CSS muertas | `.close-btn`, `.young-serif-regular`, `.libre-baskerville-*`, `.sectionAnimation` (apuntaba a un `#section` inexistente) y los duplicados de `h2`/`p`/`.founder`/`.contact-section` a nivel raíz. |
| `::selection { background: transparent }` | Anulaba el resaltado de selección de texto. |

### Añadido

- `.gitignore` real: `node_modules/`, `.env*`, `dist/`, `.vercel/`, `*.log`, `.DS_Store`, `Thumbs.db`, editores. Se conservó `Accounts.txt`, la única línea que había.

### Credenciales

Los cuatro identificadores de EmailJS estaban repartidos por `JS/email.js`. Ahora
viven centralizados y documentados en `assets/js/modules/config.js`. **Se
conservan sus valores reales**: son identificadores publicables, el SDK los exige
en el navegador y EmailJS los restringe por dominio de origen. Vaciarlos habría
roto los dos formularios sin ganar seguridad. No hay claves privadas ni tokens de
servidor en el repositorio.

### Formato

Indentación de 2 espacios, comillas dobles en HTML, punto y coma en JS y salto de
línea final en los 15 archivos de texto. Verificado: 0 `!important`, 0 `var`,
0 `console.*`, 0 `alert()`, 0 rutas absolutas de la máquina.

---

## Fase 4 — Imágenes

Solo se trabajó con imágenes ya existentes. No se descargó ni inventó ninguna.

| Origen | Destino | Antes | Después |
|---|---|---|---|
| `Blackhoodie4.jpg` | `content/jacob-jeans-hoodie-st-lucia.webp` | 3000×3800, 3,05 MB | 1600×2027, 126 KB |
| `JacobJeans.png` | `logo/jacob-jeans-wordmark.webp` | 4000×2142, 1,46 MB | 750×402, 38 KB |
| `JacobJeansWhite.png` | `logo/jacob-jeans-wordmark-white.webp` | 4000×835, 251 KB | 500×104, 6,3 KB |
| `JacobJeansMes.png` | `logo/jacob-jeans-wordmark-navy.webp` | 632×138, 14 KB | 500×109, 7,6 KB |
| `JacobJeansWhiteLogo.png` | `logo/jacob-jeans-monogram-white.webp` | 1146×1200, 55 KB | 96×101, 1,0 KB |
| `Jacob-jeans.jpg` | `content/jacob-jeans-social-card.jpg` | 3305×3305, 320 KB | 1200×1200, 46 KB |
| `FAVICON/icon.png` | `icons/favicon.png` | 1268×1268, 164 KB | 180×180, 8,9 KB |
| `unitedKingdom.png` | `icons/flag-united-kingdom.png` | 512×512, 19 KB | 96×96, 5,4 KB |
| `waitWhite.png` | `content/exit-intent-lettering.webp` | 499×85, 8 KB | 499×85, 4,4 KB |
| `thankWhite.png` | `content/thank-you-lettering.webp` | 657×85, 10 KB | 657×85, 5,8 KB |
| `toBeContinued.webp` | `content/coming-soon-lettering.webp` | 1005×179, 8 KB | sin cambios |
| `textIMG.png` | **eliminada** | 1624×272, 53 KB | reemplazada por texto real |

**Total imágenes: 5,08 MB → 213 KB.**

Otros cambios:

- `width` y `height` en las 13 `<img>` del sitio: cero *layout shift*.
- `loading="lazy"` en las 5 imágenes de overlays que el usuario abre a mano.
  **Excepción documentada**: las 5 del diálogo de confirmación se cargan de forma
  anticipada, porque ese diálogo aparece en el instante en que alguien se
  suscribe y un parpadeo justo ahí es el peor momento posible. Coste: 13 KB.
- `alt` descriptivo en todas. Las decorativas (marcas de esquina, banderas junto
  a un texto que ya dice "United Kingdom") llevan `alt=""`.
- `textIMG.png` era un párrafo entero renderizado como imagen: ilegible al
  escalar, no seleccionable e invisible para buscadores. Ahora es texto real con
  el mismo contenido.

---

## Fase 5 — HTML, SEO y accesibilidad

### Estructura

- **Se añadió el `<h1>`**, que no existía: el documento empezaba en `<h2>`.
- `<nav>`, `<main>` y `<footer>` eran hijos de `<main>`. Ahora son hermanos,
  dentro de un contenedor `.stage` puramente visual.
- Jerarquía `h1 → h2 → h3` sin saltos, verificada en el navegador.
- `<article>` por reseña, `<blockquote>` para las citas, `<time datetime>` en las
  fechas.

### `<head>`

| Antes | Ahora |
|---|---|
| `<title>` de 11 caracteres | 60 caracteres, único por página |
| `og:image`, `twitter:image`, `twitter:card`, `msapplication-TileImage` con atributo `href` | Con `content`. Antes las ignoraba todo scraper. |
| `og:image:type: image/webp` sobre un JPEG | Corregido |
| `og:locale: es_ES` con contenido en inglés | `en_GB` |
| `theme-color` y `msapplication-TileColor` duplicadas | Una sola vez |
| `<meta name="keywords">` | Eliminada (obsoleta desde 2009) |
| Sin `og:url` | Añadido |
| JSON-LD inválido: `@context` con la URL del sitio, `@type: "Fiverr"`, `datePublished: "2024-25-12"`, imagen inexistente | `Organization` válido con datos reales: nombre, URL, logo, año de fundación, correo y fundador |
| Favicon de 164 KB | 8,9 KB + `apple-touch-icon` |

Añadidos `robots.txt` y `sitemap.xml` con la URL real del sitio.

### Accesibilidad

- `ABOUT` y `REVIEWS` eran `<h2>` con `onclick`. Ahora son `<button>` reales,
  enfocables y operables por teclado, con `aria-expanded` y `aria-haspopup`.
- Los cierres eran `<img>` con `onclick`. Ahora son `<button>` con nombre
  accesible oculto (`.visually-hidden`).
- Los tres overlays modales usan `<dialog>` nativo: trampa de foco, devolución
  del foco al cerrar y Escape los gestiona el navegador.
- Bloqueo del scroll de fondo mientras hay un modal abierto.
- Foco visible con `:focus-visible` en todo elemento interactivo, en blanco sobre
  fondos navy y en azul sobre fondos claros.
- Enlace "Skip to content".
- Zoom del navegador desbloqueado (se eliminó `zoom.js`).
- Las estrellas llevan `aria-hidden` con un texto "rated 5 out of 5" en paralelo.
- Verificado en Chrome: 13/13 imágenes con `alt`, 2/2 inputs con `<label>`
  asociado, 0 botones de icono sin nombre accesible.

---

## Fase 6 — CSS y sistema de diseño

- **Variables en `:root`** derivadas de la paleta que el sitio ya usaba (el navy
  `#01265d` aparecía 14 veces como literal). No se inventó ningún color de marca.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96. Desaparecen valores
  como `22.5px`, `281.25px` o `421.875px`.
- Escala tipográfica con `clamp()`. Dos familias: **Young Serif** para marca y
  titulares, y una pila de serif del sistema para el cuerpo. `Libre Baskerville`
  se declaraba sin llegar a cargarse nunca: eliminada.
- **Selectores `:nth-child()` de hasta 9 niveles sustituidos por clases.**
  Máximo actual: 2 niveles.
- Orden en cada archivo: variables → reset → base → layout → componentes →
  utilidades → media queries.
- 0 `!important`, 0 estilos inline, 0 reglas duplicadas.

### Contraste verificado

| Par | Ratio |
|---|---|
| Texto sobre fondo claro | 15,63:1 |
| Blanco sobre navy | 14,62:1 |
| Blanco sobre CTA `#0041a2` | 9,22:1 |
| Blanco sobre CTA hover | 6,96:1 |
| Texto atenuado sobre blanco | 6,90:1 |
| Error sobre blanco | 6,54:1 |
| Error sobre navy | 8,61:1 |
| Estrellas sobre blanco | 5,17:1 |

El botón principal usaba `#3b82f6` con texto blanco: **3,1:1**, por debajo del
mínimo. Sustituido por `#0041a2`, el azul que el propio footer ya empleaba.
Las estrellas eran `#ffd700` sobre blanco: **1,6:1**. Ahora `#8a6800`.

**11 de 11 pares superan 4,5:1.**

---

## Fase 7 — Responsive

- Reescrito **mobile-first** con `min-width`. Antes era desktop-first con
  breakpoints en `750px` y `845px`.
- Breakpoints: 480 / 768 / 1024 / 1440.
- Se eliminó `body { overflow-x: hidden }`, que tapaba desbordamientos en vez de
  corregirlos.
- **Dos desbordamientos reales encontrados y corregidos en el navegador:**
  1. El `<h1>` ocupaba toda la columna y la animación `scale(1.6)` lo sacaba
     96 px por cada lado → barra horizontal en 360, 768 y 1024 px.
  2. El footer entraba con `translateY(100%)`, añadiendo 230 px de scroll
     vertical transitorio.

  Solución: `overflow: clip` acotado a `.stage`, seguro porque `min-height` deja
  crecer el contenedor con su contenido, de modo que nunca se recorta nada real.
- Logo y lettering no estaban centrados: los `<img>` de bloque no los centra
  `text-align`. Resuelto con `margin-inline: auto`.
- Áreas táctiles de 44×44 px como mínimo en enlaces sociales, botones de la barra,
  cierres y botones de envío.
- La lista de reseñas tiene su propio scroll y no rompe el layout.

**Medido en Chrome a 360×640, 360×800, 768×900, 1024×800 y 1440×900, tanto con
las animaciones en curso como en estado estático: sin scroll horizontal ni
vertical en ninguno de los diez casos.**

No se creó menú móvil: la navegación son dos elementos que caben siempre en
pantalla. Inventar un hamburger no habría aportado nada.

---

## Fase 8 — UX/UI

- **Intro de 6,25 s → 2,7 s.** La secuencia original mantenía la página invisible
  seis segundos antes de que nadie pudiera suscribirse.
- **La página ya no depende de JavaScript para verse.** Antes, `main` arrancaba
  con `opacity: 0` y solo un temporizador la mostraba: sin JS, pantalla en
  blanco. Ahora el estado final es el de por defecto y la animación se activa con
  una clase `js` que se pone en el `<head>`.
- Toda la secuencia pasó de temporizadores de jQuery a `@keyframes` de CSS: un
  módulo de JS entero desapareció.
- `prefers-reduced-motion: reduce` salta la intro y todas las animaciones.
- Estados `hover`, `focus-visible`, `active` y `disabled` en cada elemento
  interactivo, con transiciones de 150–250 ms.
- Ancho de línea limitado a 68 caracteres.

### Enlaces que no llevaban a ningún sitio

| Enlace | Decisión |
|---|---|
| `instagram.com/sharer.php?u=` | **Eliminado.** Instagram no tiene endpoint de compartir. |
| `youtube.com/share?url=` | **Eliminado.** No existe. |
| `facebook.com/sharer/sharer.php` | Conservado; funciona. |
| `wa.me/?text=` | Conservado; funciona. |

Los cuatro apuntaban además a `jacob-jeans.store`, dominio distinto del que
declaraba el canonical. Ahora los dos que quedan usan la URL real del sitio.

### Formularios

Están conectados a EmailJS de verdad, así que se conservan. Lo que cambió:

- Validación visible antes de enviar, con mensaje concreto
  (*"Enter a valid email address, for example name@example.com."*) y
  `aria-invalid` en el campo.
- Estado de envío: el botón se deshabilita y pasa a "Subscribing…".
- **En caso de error, el botón ya no ponía "Suscribed" fingiendo éxito**, y el
  `alert(JSON.stringify(err))` que volcaba el error crudo del SDK desapareció.
  En su lugar, un mensaje legible.
- Región `role="status"` para que los lectores de pantalla anuncien el resultado.
- Si el SDK de EmailJS no carga, el formulario lo dice en vez de fallar en
  silencio.

---

## Fase 9 — JavaScript

- Un único punto de entrada, `main.js`, con cuatro módulos ES.
- **jQuery eliminado** (se cargaban dos versiones; la de 2016 pisaba a la de
  2024).
- Cero variables globales: `email.js` escribía sobre un `let` declarado en otro
  archivo.
- Delegación de eventos para los botones de cierre (`[data-close-dialog]`).
- Comprobación de existencia antes de operar sobre cualquier elemento; todos los
  inicializadores salen limpiamente si su nodo no está.
- `closeBtn.onclick` y `window.onclick` (que pisaban cualquier otro handler)
  sustituidos por `addEventListener`.
- Escape y trampa de foco los aporta `<dialog>`; se borró el handler manual.
- Código muerto eliminado: la animación de `#section`, elemento que nunca existió.
- **Cero errores y cero advertencias en consola**, verificado tras recarga.

---

## Fase 10 — Rendimiento

| | Antes | Ahora |
|---|---|---|
| Imágenes | 5,08 MB | 213 KB |
| JS propio + librerías | ~197 KB | 7,6 KB + EmailJS (~15 KB) |
| CSS | 30 KB (4 archivos, uno encadenado por `@import`) | 23 KB (3 archivos, sin cadenas) |
| Peticiones externas | 6 | 3 |
| **Primera carga** | **~5,3 MB** | **~276 KB** |

- `defer` en el SDK de EmailJS; `main.js` es un módulo, diferido por definición.
- `preconnect` a los dos orígenes de Google Fonts y `&display=swap`.
- `preload` del logo y del fondo, que son lo primero que se pinta.
- Se eliminó el `@import` de `fontSizes.css` dentro del CSS, que encadenaba una
  petición bloqueante detrás de otra.

Objetivo del estándar: menos de 1 MB. **Queda en el 27 % de ese presupuesto.**

---

## Fase 11 — QA

Verificado en Chrome sobre `http://localhost:4173`:

| Comprobación | Resultado |
|---|---|
| Rutas locales en HTML, CSS y JS | 33 comprobadas, 0 rotas |
| Imágenes rotas en tiempo de ejecución | 0 |
| Errores y advertencias en consola | 0 |
| Scroll horizontal a 360 / 768 / 1024 / 1440 | Ninguno |
| Scroll vertical no deseado | Ninguno |
| Panel *About*: abre, cierra con Escape, cierra al pulsar fuera | Correcto |
| Diálogo de reseñas: abre, cierra, bloquea y libera el scroll de fondo | Correcto |
| Validación del formulario con email inválido | Mensaje visible y `aria-invalid` |
| Un solo `<h1>`, jerarquía sin saltos | Correcto |
| `alt` / `width` / `height` en las 13 imágenes | Correcto |
| `<label>` asociado en los 2 inputs | Correcto |
| Botones de icono con nombre accesible | 4/4 |
| `404.html` con enlace de vuelta | Correcto |
| Texto de plantilla, TODO o Lorem ipsum | Ninguno |
| Credenciales privadas en el código | Ninguna |

---

## Fase 12 — Documentación

- `README.md` actualizado: el árbol, los comandos y el stack habían cambiado por
  completo. Se eliminaron la sección *Known issues* (los dos problemas que
  describía están resueltos) y el bloque de configuración de EmailJS, que ahora
  apunta a `assets/js/modules/config.js`.
- `docs/auditoria.md` y `docs/cambios.md` nuevos.

---

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente y a través de un servidor local.
- Sin rutas absolutas de la máquina. Todas las rutas internas son relativas y en
  minúsculas.
- No se creó configuración de hosting: `vercel.json`, `_redirects` y `.htaccess`
  no se pidieron. El `.htaccess` que había se eliminó por ser inservible en
  Vercel.
- No se ejecutó ningún despliegue.
