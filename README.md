# Jacob-Jeans-Waitlist

Pre-launch waitlist page for Jacob Jeans: email capture through EmailJS, a customer reviews dialog and an exit-intent prompt.

[![Live demo](https://img.shields.io/badge/demo-jacobjeanspre.wib.digital-2ea44f)](https://jacobjeanspre.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-276%20KB-2ea44f)

## Description

A launch page whose single measurable outcome is a captured email address. Everything on it is arranged around that: the brand story, the reviews that supply social proof, and two separate signup points so the visitor never has to hunt for the form.

Submission goes through EmailJS, which posts the form straight to an email service from the browser. That keeps the page fully static — no server, no database, no endpoint of its own — while still delivering a real signup.

The exit-intent prompt is the last line: when the pointer leaves the top of the viewport, a final dialog appears. It, the reviews and the confirmation are all native `<dialog>` elements, so the focus trap, focus restoration and Escape handling come from the browser rather than from hand-written JavaScript.

There is no build step. What is in the repository is what ships.

## Features

- Two email capture points, both wired to EmailJS from the browser.
- Visible client-side validation, a submit state, and a concrete message on both success and failure.
- Exit-intent dialog triggered on `mouseleave` at the top of the viewport, armed after three seconds and suppressed once the visitor has subscribed.
- Customer reviews in a scrollable modal dialog.
- Confirmation dialog shown in place, with no page transition.
- Brand story panel as a keyboard-operable disclosure, closing on Escape and on outside click.
- CSS-only intro sequence that respects `prefers-reduced-motion` and leaves the page fully readable with JavaScript disabled.
- Facebook and WhatsApp share links in the footer.

## Tech stack

| Layer | Technology | Version | Role in project |
|---|---|---|---|
| Markup | HTML5 | — | `index.html` (320 lines), `404.html` |
| Styling | CSS3 | — | 1132 lines across three files, custom properties, no preprocessor |
| Reset | Hand-written | — | 30 lines at the top of `base.css` |
| Scripting | JavaScript | ES modules | `main.js` plus four modules, 266 lines total, no framework |
| Overlays | Native `<dialog>` | — | Focus trap, focus restoration and Escape from the platform |
| Email | `@emailjs/browser` | 4.x, from jsDelivr | Form submission without a backend |
| Font | Young Serif | Google Fonts | Brand and headings; body copy uses a system serif stack |
| Images | WebP | — | 11 assets, 213 KB total |

The only runtime dependency is the EmailJS SDK.

## Prerequisites

None to view the page. An internet connection is required for the Young Serif webfont and the EmailJS SDK; the page renders and stays readable without either.

To make the forms deliver, an [EmailJS](https://www.emailjs.com) account with a service, two templates and a public key.

## Project structure

```
.
├── index.html                  # The entire site: hero, footer form, four overlays
├── 404.html                    # Not-found page, links back to the home page
├── robots.txt                  # Allows everything, points at the sitemap
├── sitemap.xml                 # One URL — the site is a single page
├── assets/
│   ├── css/
│   │   ├── base.css            # Design tokens, reset, base type, utilities
│   │   ├── layout.css          # Container, intro screen, stage, topbar, hero, footer
│   │   └── components.css      # Buttons, forms, share links, panel, dialogs, reviews
│   ├── js/
│   │   ├── main.js             # Entry point: wires panel, dialogs, forms, exit intent
│   │   └── modules/
│   │       ├── config.js       # EmailJS identifiers, in one place
│   │       ├── dialogs.js      # <dialog> wrapper: scroll lock, backdrop click
│   │       ├── panel.js        # About disclosure with aria-expanded
│   │       └── subscribe.js    # Validation, submit state, EmailJS delivery
│   └── img/
│       ├── logo/               # Wordmarks and monogram
│       ├── content/            # Backdrop, brand lettering, social card
│       └── icons/              # Favicon, flag
├── docs/
│   ├── auditoria.md            # Pre-reorganisation audit
│   ├── cambios.md              # Change log, grouped by phase
│   └── jacob-jeans.fig         # Figma source file
└── LICENSE
```

## Running it locally

The page opens straight from the filesystem, but `main.js` is an ES module, so browsers block it over `file://`. Serve the directory instead:

```bash
git clone https://github.com/pabloWIB/Jacob-Jeans-Waitlist.git
cd Jacob-Jeans-Waitlist
npx serve .
```

Any static server works — `python -m http.server` is equivalent. There is nothing to install and nothing to build.

## Configuration

The four EmailJS identifiers live in `assets/js/modules/config.js`:

```javascript
export const EMAILJS = {
  publicKey: "...",
  serviceId: "...",
  exitTemplateId: "...",
  footerTemplateId: "...",
};
```

They are publishable identifiers, not secrets: the browser SDK requires them in client-side code, and EmailJS scopes access by allowed origin. Restrict the domain in the EmailJS dashboard rather than trying to hide the key. No private key or server token belongs in this repository.

The two forms post different fields — `email_id` from the exit dialog and `email_id2` from the footer — so the `name` attributes on the inputs must match what the EmailJS templates expect.

## Accessibility

- One `<h1>`, heading hierarchy with no skipped levels.
- Every interactive element is a real button or link, reachable and operable by keyboard, with a visible `:focus-visible` outline.
- Icon-only buttons carry a visually hidden label.
- Modal overlays use native `<dialog>`; the background scroll is locked while one is open.
- Every colour pair in the palette clears WCAG AA at 4.5:1; the lowest is 5.17:1.
- All images declare `width`, `height` and a real `alt`.
- Browser zoom is not intercepted.

## Design

Laid out from a [Figma file](https://www.figma.com/design/dY5UYnagx1Bioo69LisSOr/Jacob-Jeans?node-id=0-1&p=f&t=7c3WF3Y92IKNJFtH-0). The `.fig` source is committed at `docs/jacob-jeans.fig`.

## Deployment

Deployed on Vercel at [jacobjeanspre.wib.digital](https://jacobjeanspre.wib.digital). Static: upload the repository root as-is, no build command and no output directory. Add the deployed domain to the allowed origins in the EmailJS dashboard, or submissions will be rejected.

The canonical URL, the Open Graph tags, `robots.txt` and `sitemap.xml` all point at `https://jacobjeanspre.wib.digital/`. Change them together if the site moves.

## License

MIT — see [LICENSE](LICENSE).

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
