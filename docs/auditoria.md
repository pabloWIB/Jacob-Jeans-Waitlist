# Auditoría — Jacob Jeans (estado inicial)

Documento de trabajo interno. Refleja el proyecto **antes** de la reorganización.
El registro de lo que se cambió está en [cambios.md](cambios.md).

---

## 1. Resumen del árbol original

```
Jacob-Jeans/
├── .github/workflows/npm-grunt.yml
├── .gitignore
├── .htaccess
├── CSS/
│   ├── Fonts/fontSizes.css
│   ├── styles.css
│   ├── styles.css.map
│   └── styles.scss
├── IMG/            (32 imágenes en 5 subcarpetas + hero.jpg suelto)
├── JS/
│   ├── email.js
│   ├── script.js
│   └── zoom.js
├── Jacob Jeans.fig
├── LICENSE
├── README.md
└── index.html
```

Peso total en disco: **~16,3 MB**, de los cuales 15,7 MB son imágenes y el `.fig`.

---

## 2. Páginas HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `Jacob Jeans` (11 car.) | **Ninguno** | Landing de lista de espera: intro animada, logo, "To be continued", dos formularios de suscripción, panel *About*, popup de *Reviews*, modal de salida y pantalla de agradecimiento. |
| `404.html` | — | — | **No existe.** |

Sitio de una sola página. No hay navegación entre documentos: `ABOUT` y `REVIEWS` abren overlays en la misma página.

---

## 3. CSS

| Archivo | Líneas | Peso | ¿Se carga? | Notas |
|---|---|---|---|---|
| `CSS/styles.css` | 940 | 23,3 KB | Sí, desde `index.html` | Compilado de `styles.scss`. Único CSS propio real. |
| `CSS/Fonts/fontSizes.css` | 34 | 1,0 KB | Sí, vía `@import` dentro de `styles.css` | Encadena una segunda petición bloqueante. |
| `CSS/styles.scss` | 1042 | 22,8 KB | No (fuente) | Fuente Sass. El proyecto no declara build ni `package.json`. |
| `CSS/styles.css.map` | — | 8,2 KB | No | Source map publicado en producción. |

### 3.1 Dependencias externas de estilos

| Recurso | Origen | Estado |
|---|---|---|
| `normalize.css` 8.0.1 | cdnjs | Se usa como reset. |
| `owl.carousel.min.css` 1.3.3 | cdnjs | **Huérfano**: no hay markup `.owl-carousel` ni se carga el JS del plugin. Petición pura pérdida. |
| `Young Serif` | Google Fonts, vía `@import` en CSS | Sin `preconnect`, sin `font-display`. |
| `Libre Baskerville` | — | Declarada en `font-family` pero **nunca se carga**. Las reglas que la usan no se aplican a nada. |

### 3.2 Reglas muertas o duplicadas

| Selector | Problema |
|---|---|
| `.young-serif-regular`, `.libre-baskerville-bold`, `.libre-baskerville-regular-italic` | Ninguna clase aparece en el HTML. |
| `.close-btn` | No existe en el HTML (el botón real es `.close`). |
| `h2`, `p`, `.founder`, `.contact-section`, `.business-enquiries` (nivel raíz) | Duplican reglas ya definidas dentro de `.dropdown-content`. |
| `.sectionAnimation` | Se aplica a `#section`, elemento que **no existe** en el DOM. |
| `body div::selection { background: transparent }` | Anula el resaltado de selección de texto en toda la página. |
| `.modal … img { width: 90%; width: 30px; }` | Propiedad declarada dos veces seguidas. |
| `.submit-btn { transition: background-color .2s ease; transition: .4s; }` | Mismo patrón repetido en 3 bloques. |

### 3.3 Problemas estructurales del CSS

- **Selectores de hasta 9 niveles** basados en `:nth-child()`:
  `main > :nth-child(1) footer > :nth-child(1) > :nth-child(2) .subscribe-form2 .input-wrapper input:focus`.
  Cualquier `<div>` insertado rompe el layout.
- **Sin variables CSS**: `#01265d` aparece 14 veces, `#f5f5f5` 5 veces, `0.375rem` 4 veces, todos literales.
- **Escala de espaciado arbitraria**: `0.65rem`, `1.75rem`, `22.5px`, `17.5px`, `281.25px`, `421.875px`, `562.5px`.
- **Desktop-first** con breakpoints no estándar: `max-width: 750px` y `max-width: 845px`.
- `body { overflow-x: hidden }` — oculta desbordamientos en lugar de corregirlos.
- `main { height: 100vh; overflow: hidden }` — recorta el contenido en viewports bajos.

---

## 4. JavaScript

| Archivo | Líneas | ¿Se carga? | Función |
|---|---|---|---|
| `JS/script.js` | 147 | Sí | Overlays (about, reviews, modal de salida, agradecimiento) + secuencia de animación con jQuery. |
| `JS/email.js` | 49 | Sí | Envío de los dos formularios vía EmailJS. |
| `JS/zoom.js` | 13 | Sí | Intercepta `Ctrl` + `+` / `-` / `0` para **bloquear el zoom del navegador**. |

### 4.1 Dependencias externas de scripts

| Recurso | Dónde | Estado |
|---|---|---|
| jQuery **3.7.1** | `<head>`, bloqueante | Cargado. |
| jQuery **1.12.0** | fin de `<body>` | **Sobrescribe** al 3.7.1. La página acaba corriendo sobre la versión de 2016 tras descargar las dos (~184 KB combinados). |
| `@emailjs/browser` 4.x | fin de `<body>` | En uso real. Es la única dependencia necesaria. |

jQuery se usa exclusivamente para `$(function(){})` y `$(el).addClass()` — sustituible por API nativa sin pérdida.

### 4.2 Defectos de JS

| Ubicación | Problema |
|---|---|
| `zoom.js` completo | Bloquear el zoom del navegador incumple WCAG 2.1 SC 1.4.4. |
| `email.js:24,45` | `alert(JSON.stringify(err))` vuelca el error crudo del SDK al usuario. |
| `email.js:18,40` | Escribe `formSubmitted`, variable declarada con `let` en *otro* archivo. Acoplamiento por global implícita. |
| `email.js:21` | En el camino de error, el botón pasa igualmente a `"Suscribed"`: el fallo se presenta como éxito. |
| `script.js:89` | El handler de `Escape` usa `popup`, declarado 8 líneas más abajo. |
| `script.js:47,50` | `closeBtn.onclick` y `window.onclick` — asignación directa, pisa cualquier otro handler. |
| Global | Ninguna comprobación de existencia antes de operar sobre elementos del DOM. |
| Global | 12 constantes en el ámbito global compartido entre los tres archivos. |
| `script.js:134` | Anima `#section`, que no existe. |

---

## 5. Imágenes

### 5.1 En uso (14 archivos, 5,08 MB)

| Ruta | Dimensiones | Peso | Se muestra a | Observación |
|---|---|---|---|---|
| `IMG/JPG/Blackhoodie4.jpg` | 3000×3800 | 3,05 MB | fondo `cover` | Nombre erróneo: la sudadera es azul periwinkle, no negra. |
| `IMG/PNG/JacobJeans.png` | 4000×2142 | 1,46 MB | 375 px | **10× más ancha** de lo que se pinta. |
| `IMG/JPG/Jacob-jeans.jpg` | 3305×3305 | 320 KB | `og:image` | Referenciada con atributo inválido (ver §6). |
| `IMG/PNG/JacobJeansWhite.png` | 4000×835 | 251 KB | 250 px | 16× más ancha de lo necesario. |
| `IMG/FAVICON/icon.png` | 1268×1268 | 164 KB | 32 px | Favicon de 164 KB. |
| `IMG/PNG/JacobJeansWhiteLogo.png` | 1146×1200 | 55 KB | 20 px | Se pinta 3 veces como adorno de esquina. |
| `IMG/PNG/textIMG.png` | 1624×272 | 53 KB | ancho fluido | **Párrafo de texto renderizado como imagen.** |
| `IMG/PNG/unitedKingdom.png` | 512×512 | 19 KB | 25 px | Se pinta 3 veces. |
| `IMG/PNG/JacobJeansMes.png` | 632×138 | 14 KB | 250 px | Correcta. |
| `IMG/PNG/thankWhite.png` | 657×85 | 10 KB | ancho fluido | Lettering de marca. `alt=""` pese a ser contenido. |
| `IMG/WEBP/toBeContinued.webp` | 1005×179 | 8 KB | 562 px | Correcta. |
| `IMG/PNG/waitWhite.png` | 499×85 | 8 KB | ancho fluido | Lettering de marca. |
| `IMG/SVG/close.svg` | vectorial | 222 B | 30–50 px | Se usa 3 veces. |
| `IMG/SVG/{instagram,facebook,whatsapp,youtube}.svg` | vectorial | 2,7 KB | 30 px | Ver enlaces rotos en §6. |

Ninguna imagen declara `width`/`height` → *layout shift* garantizado.
Ninguna usa `loading="lazy"`.

### 5.2 Huérfanas (21 archivos, 10,6 MB) — verificado con `grep` sobre HTML, CSS, SCSS y JS

| Ruta | Dimensiones | Peso |
|---|---|---|
| `IMG/hero.jpg` | **18000×12000** | **10,47 MB** |
| `IMG/JPG/hoodie4.jpg` | 3000×3800 | 2,36 MB |
| `IMG/JPG/repeat.jpg` | 2250×2250 | 1,17 MB |
| `IMG/JPG/repeatToned.jpg` | 2250×2250 | 434 KB |
| `IMG/WEBP/PC.webp` | 1344×768 | 267 KB |
| `IMG/JPG/hoodie.jpg` | 1200×1600 | 234 KB |
| `IMG/JPG/hoodie5.jpg` | 1200×1600 | 234 KB (idéntica a `hoodie.jpg`) |
| `IMG/WEBP/testimonial2.webp` | 3325×3325 | 125 KB |
| `IMG/JPG/hoodie3.jpg` | 1200×1600 | 112 KB |
| `IMG/WEBP/PHONE.webp` | 768×1344 | 95 KB |
| `IMG/WEBP/testimonial1.webp` | 2097×2097 | 64 KB |
| `IMG/JPG/hoodie2.jpg` | 720×1280 | 60 KB |
| `IMG/PNG/JacobJeansMes.jpg` | 1000×1000 | 41 KB |
| `IMG/PNG/JacobJeansYellow.png` | 388×51 | 21 KB |
| `IMG/PNG/thank.png` | 657×85 | 11 KB |
| `IMG/PNG/wait.png` | 499×85 | 9 KB |
| `IMG/WEBP/comingSoon2.webp` | 933×179 | 8 KB |
| `IMG/WEBP/comingSoon3.webp` | 778×179 | 7 KB |
| `IMG/WEBP/comingSoon1.webp` | 892×179 | 6 KB |
| `IMG/SVG/youtube.svg` | vectorial | 4,2 KB |
| `IMG/SVG/down.svg` | vectorial | 495 B |
| `IMG/SVG/closeBlue.svg` | vectorial | 245 B |

`IMG/hero.jpg` es un JPEG de 216 megapíxeles que nunca llegó a usarse.

---

## 6. Enlaces, rutas y metadatos rotos

| Elemento | Problema |
|---|---|
| `<a href="https://www.instagram.com/sharer.php?u=…">` | **Instagram no tiene endpoint de compartir.** El enlace no lleva a ningún sitio útil. |
| `<a href="https://www.youtube.com/share?url=…">` | **`youtube.com/share` no existe.** Enlace muerto. |
| Los 4 enlaces sociales | Apuntan a `jacob-jeans.store` (con guion), mientras el canonical declara `jacobjeans.store` (sin guion). Dominios distintos. |
| `<meta property="og:image" href="…">` | Atributo `href`; Open Graph exige `content`. **La etiqueta se ignora.** |
| `<meta name="twitter:image" href="…">` | Mismo error. |
| `<meta name="twitter:card" href="…">` | Mismo error, y `twitter:card` espera un tipo (`summary_large_image`), no una URL. |
| `<meta name="msapplication-TileImage" href="…">` | Mismo error. Además está duplicada. |
| `og:image:type` = `image/webp` | El archivo es un JPEG. |
| `og:locale` = `es_ES` | Todo el contenido está en inglés y `<html lang="en">`. |
| `msapplication-TileColor`, `theme-color` | Cada una declarada **dos veces**. |
| `src="IMG/PNG//JacobJeans.png"` | Doble barra en la ruta. |
| JSON-LD `@context` | Vale la URL del sitio; debe ser `https://schema.org`. |
| JSON-LD `author.@type` | Vale una URL de Fiverr; debe ser `Person` u `Organization`. |
| JSON-LD `publisher.@type` | Vale `"Fiverr"`, que no es un tipo de schema.org. |
| JSON-LD `logo.url` | Apunta a un perfil de Instagram, no a una imagen. |
| JSON-LD `datePublished` | `"2024-25-12"` — mes 25. Fecha inválida. |
| JSON-LD `image` | `https://jacob-jeans.vercel.app/IMG/WEBP/JacobJeans.jpeg` — **ese archivo no existe** (ni la carpeta, ni la extensión). |
| JSON-LD `@type: Article` | La página es una landing de marca, no un artículo. |
| `robots.txt` | No existe. |
| `sitemap.xml` | No existe. |

Ningún `<link>` ni `<script>` apunta a un archivo local inexistente.

---

## 7. Accesibilidad

| Criterio | Estado |
|---|---|
| `<h1>` en la página | **Ausente.** El documento empieza en `<h2>`. |
| Jerarquía de encabezados | `h2` → `h3` → `h4` sin `h1`. |
| `ABOUT` / `REVIEWS` | Son `<h2>` con `onclick`: no reciben foco, no responden a teclado, sin `aria-expanded`. |
| Botones de cierre | Son `<img>` con `onclick`: no enfocables, no operables por teclado. |
| Modales | Sin `role="dialog"`, sin `aria-modal`, sin gestión ni trampa de foco. |
| Scroll de fondo | No se bloquea al abrir overlays. |
| Foco visible | Sin estilos `:focus-visible`; los inputs además hacen `outline: none`. |
| Zoom del navegador | **Bloqueado por `zoom.js`** (incumple SC 1.4.4). |
| Selección de texto | Resaltado anulado por `::selection { background: transparent }`. |
| `alt` | `thankWhite.png` lleva `alt=""` siendo contenido informativo. |
| Contraste `.submit-btn` | Blanco sobre `#3b82f6` ≈ **3,1:1** — no alcanza 4,5:1. |
| Contraste `.stars` | `#ffd700` sobre blanco ≈ **1,6:1**. |
| Áreas táctiles | Enlaces sociales e iconos de cierre por debajo de 44×44 px. |
| `lang` | `en` — correcto, coincide con el contenido. |

---

## 8. Higiene y configuración

| Archivo | Estado |
|---|---|
| `.gitignore` | Contiene una sola línea: `Accounts.txt`. Sin `node_modules`, `.env`, `.DS_Store`, `*.log`. |
| `.htaccess` | Reescritura de URLs sin extensión para Apache. El sitio se despliega en Vercel, donde **se ignora por completo**; además solo hay una página. |
| `.github/workflows/npm-grunt.yml` | Ejecuta `npm install && grunt` en 3 versiones de Node. **No hay `package.json` ni `Gruntfile.js`**: el workflow falla en cada push. |
| `Jacob Jeans.fig` | 5,76 MB en la raíz. Nombre con espacio y mayúsculas. |
| `CSS/styles.css.map` | Source map servido en producción. |
| Nombres de archivo | `Blackhoodie4.jpg`, `JacobJeansMes.png`, `textIMG.png`, `comingSoon1.webp`… mezcla camelCase, PascalCase y numeración. Carpetas `CSS/`, `IMG/`, `JS/` en mayúsculas. |

### 8.1 Credenciales en el código

`JS/email.js` contiene, en claro:

| Constante | Valor | Naturaleza |
|---|---|---|
| Public key de EmailJS | `Amo5GBjS_00-An44w` | Identificador **publicable** por diseño; se restringe por dominio en el panel de EmailJS. |
| Service ID | `service_bjy0bsa` | Identificador de servicio, no secreto. |
| Template ID (modal) | `template_inofmni` | Identificador de plantilla, no secreto. |
| Template ID (footer) | `template_1n53v5q` | Identificador de plantilla, no secreto. |

No hay contraseñas, tokens privados ni claves de servidor. Aun así, estaban repartidos en cuatro puntos del archivo sin documentar.

---

## 9. Contenido de relleno heredado

No se detectó *Lorem ipsum* ni texto de plantilla. Todo el copy es real y específico de la marca:
historia de la marca, nombre del fundador (Nathan Benjamin), correo de contacto y tres reseñas
firmadas con nombre, fecha y país.

Elementos que **sí** son huecos:

| Elemento | Motivo |
|---|---|
| Enlaces de Instagram y YouTube | Apuntan a endpoints inexistentes: botones que no llevan a ningún sitio. |
| Hoja de estilos de Owl Carousel | Carga un plugin de carrusel que no se usa. |
| Animación `.sectionAnimation` | Apunta a un `#section` que nunca se escribió. |

---

## 10. Rendimiento — primera carga (medida sobre los archivos)

| Recurso | Peso |
|---|---|
| Imágenes | **5,08 MB** |
| jQuery ×2 | ~184 KB |
| CSS propio + `fontSizes` | 24,3 KB |
| CSS externo (normalize + owl) | ~6 KB |
| SDK de EmailJS | ~15 KB |
| `index.html` | 10,9 KB |
| JS propio | 6,5 KB |
| **Total aproximado** | **~5,3 MB** |

Objetivo del estándar: **< 1 MB**. El proyecto lo excede **5,3×**.

Añadido a esto: la secuencia de animación mantiene el contenido invisible durante **6,25 s**, y
`main` arranca con `opacity: 0`, de modo que **sin JavaScript la página se ve en blanco**.

---

## 11. Los cinco hallazgos más graves

1. **5,08 MB de imágenes** para una landing de una pantalla, con un `hero.jpg` huérfano de 10,47 MB en el repositorio.
2. **La página no renderiza sin JavaScript** (`main { opacity: 0 }` y todo el estado inicial dependen de `script.js`), y con él tarda 6,25 s en mostrarse completa.
3. **Todos los metadatos sociales están rotos**: `og:image`, `twitter:image` y `twitter:card` usan `href` en vez de `content`, y el JSON-LD es inválido de principio a fin.
4. **La interfaz no es operable por teclado**: navegación y cierres son `<h2>` e `<img>` con `onclick`, y `zoom.js` bloquea además el zoom del navegador.
5. **El CSS depende de `:nth-child()` hasta 9 niveles de profundidad**, sin una sola variable: cualquier cambio de markup rompe el layout.
