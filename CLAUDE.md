# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static personal portfolio site deployed on Vercel at `sieczko.it`. No build step — plain HTML, CSS, and vanilla JS. Changes are live after pushing to `main`.

## Development

Open `index.html` directly in a browser or use any static file server:

```bash
npx serve .
```

There is no linter, test suite, or package.json.

## Architecture

Single-page site (`index.html`) with all sections inline. Two JS files and one CSS file:

- [js/translations.js](js/translations.js) — exports a `translations` object with `en` and `pl` keys, each containing every UI string keyed by a token (e.g. `nav_about`, `hero_cta_primary`).
- [js/main.js](js/main.js) — runtime logic: theme toggle (dark/light, persisted in `localStorage`), language switcher (`applyLang` walks `data-i18n`, `data-i18n-html`, `data-i18n-placeholder` attributes), custom cursor animation, hamburger menu, navbar scroll state, IntersectionObserver fade-ins, and contact form submission via Formspree (`https://formspree.io/f/mnjwvqwo`).
- [css/styles.css](css/styles.css) — CSS custom properties on `:root` for dark theme; `[data-theme="light"]` overrides for light theme.

## Internationalisation

Every user-visible string in `index.html` uses one of three data attributes:

| Attribute | Used for |
|---|---|
| `data-i18n="key"` | Plain text content |
| `data-i18n-html="key"` | HTML content (allows `<span>`, `<strong>`) |
| `data-i18n-placeholder="key"` | Input/textarea placeholders |

When adding new text, add the token to **both** `en` and `pl` blocks in `translations.js`, then add the attribute to the HTML element.

## Client demos

Static HTML demos for clients live under `clients/` (e.g. `clients/kukubyku.html`) and are served automatically by Vercel at `/clients/<filename>`. No routing config needed.

Client briefs (meeting notes) live in `clients/_briefs/`. The template is `clients/_briefs/_template.md`. Filled briefs are named after the client slug (e.g. `clients/_briefs/kuku-byku.md`).

### Hosting & deployment per client

Two phases:

1. **Demo** — lives in this repo at `clients/business-name/`, served at `sieczko.it/clients/business-name/`. No cost, instant to deploy, easy to share with the client before they commit.

2. **Paid / live** — gets its own private GitHub repo and a separate Vercel project. Custom domain (`.pl` preferred, bought on OVH or Namecheap) is pointed to Vercel. Files are copied from the demo folder into the new repo.

Never build the paid version in this portfolio repo.

### Language

All client pages are **Polish only**. No i18n system, no language switcher. All copy, labels, buttons, and meta tags are written in Polish.

### Photos

Client pages are always built in two phases:

- **Demo phase** — use Unsplash stock photos (`https://images.unsplash.com/photo-ID?w=1200&q=80`). Always use copyright-safe stock images. Good Unsplash search terms per business type:
  - Restaurant (burger/steak): `burger`, `steak`, `restaurant interior dark`, `food photography`
  - Restaurant (general): `restaurant food`, `fine dining`, `cafe interior`
  - Hair salon: `hair salon`, `hairstylist`, `hair color`, `barbershop`
  - Wellness / spa: `spa massage`, `wellness candles`, `relaxation`, `massage therapy`
- **Final version** — replace Unsplash URLs with real photos provided by the client or taken by Szymon. Mark placeholder images with a comment `<!-- PLACEHOLDER: replace with real photo -->` so they're easy to find later.

### Client page structure

Each client lives in its own subfolder under `clients/` (e.g. `clients/kukubyku/`):

```
clients/
  kukubyku/
    index.html      ← markup and meta tags only, no inline styles or scripts
    styles.css      ← all CSS for this client
    main.js         ← all JS for this client
    images/         ← client-provided photos (added in final version)
```

Vercel serves `clients/kukubyku/` automatically from `index.html`. The URL shared with clients is `sieczko.it/clients/kukubyku/`.

### Image naming convention

| Slot | Filename |
|---|---|
| Hero slideshow | `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, `hero-4.jpg` |
| Gallery | `gallery-1.jpg` … `gallery-6.jpg` |
| Logo | `logo.png` |
| Team portraits | `team-1.jpg`, `team-2.jpg`, … |

All placeholder images (Unsplash URLs) are marked with a comment directly above them:
- In HTML: `<!-- PLACEHOLDER: replace with images/gallery-1.jpg -->`
- In CSS: `/* PLACEHOLDER: replace with url('images/hero-1.jpg') */`

When real photos arrive, find all `PLACEHOLDER` comments and swap the URLs.

### Colours

Every client page gets a custom colour palette based on their brand. The palette is suggested during `/research-client` and confirmed in the meeting. It always defines five CSS variables:

```css
--bg        /* main background */
--surface   /* card / section background */
--accent    /* primary brand colour — buttons, highlights */
--text      /* main body text */
--muted     /* secondary text, labels */
```

If the client has existing brand colours (logo, signage), use those as the base. If not, propose a palette based on business type and vibe. Never use the portfolio's own colour scheme for client pages.

Default sections per business type:

| Business type | Sections |
|---|---|
| Restaurant | Hero · About · Gallery · Menu · Reviews · Contact |
| Hair salon | Hero · About · Services & Pricing · Team · Gallery · Reviews · Contact (+ optional Booking CTA strip) |
| Wellness centre | Hero · About · Services · Pricing · Team · Gallery · Reviews · Contact (+ optional Booking CTA strip + Gift vouchers) |

A **Booking CTA strip** is a bold full-width band between sections with a single "Book now" button — used on salon and wellness pages to keep the booking action visible as the user scrolls.

## Deployment

Vercel reads `vercel.json` for response headers only. Push to `main` → auto-deploy. No CI pipeline.
