Build a complete client demo page from a filled brief.

The client slug is: $ARGUMENTS

## Before building

1. Read `clients/_briefs/$ARGUMENTS.md` in full. If it doesn't exist, stop and say: "Brief not found. Run `/new-client $ARGUMENTS` first, then fill in the brief."
2. Read `clients/kukubyku/index.html`, `styles.css`, and `main.js` as a reference for quality, patterns, and conventions.
3. Identify the business type from the brief (restaurant / hair salon / wellness centre / other) — this determines which sections to build.

---

## Rules — follow these for every build

**Structure**
- Output three files: `clients/$ARGUMENTS/index.html`, `clients/$ARGUMENTS/styles.css`, `clients/$ARGUMENTS/main.js`
- `index.html` contains only markup — no `<style>` tags, no `<script>` tags except `<script src="main.js"></script>` at end of body
- All CSS goes in `styles.css`, all JS in `main.js`
- Create `clients/$ARGUMENTS/images/.gitkeep` if not already there

**Language**
- Everything is Polish — all text, labels, buttons, meta tags, alt attributes

**Colours**
- Use the palette from the brief (`--bg`, `--surface`, `--accent`, `--text`, `--muted`)
- Define all five as CSS custom properties on `:root` at the top of `styles.css`
- Every colour in the file must reference one of these variables — no hardcoded hex codes anywhere else

**Photos**
- Use Unsplash stock photos for all images (demo phase)
- Every image gets a placeholder comment directly above it:
  - In HTML: `<!-- PLACEHOLDER: replace with images/gallery-1.jpg -->`
  - In CSS: `/* PLACEHOLDER: replace with url('images/hero-1.jpg') */`
- Name the target files by convention: `hero-1.jpg`…`hero-4.jpg`, `gallery-1.jpg`…`gallery-6.jpg`, `logo.png`, `team-1.jpg`…

**SEO & Schema**
- Fill in `<title>`, `<meta name="description">`, Open Graph tags, and Twitter Card from the brief
- Add a `<script type="application/ld+json">` Schema.org block — use the correct type:
  - Restaurant → `"@type": "Restaurant"`
  - Hair salon → `"@type": "HairSalon"`
  - Wellness centre → `"@type": "HealthAndBeautyBusiness"`
- Include: name, description, url, telephone, address, openingHoursSpecification, sameAs (social links), aggregateRating (if reviews available)

**Responsive**
- Mobile-first breakpoint at `max-width: 768px`
- Navigation collapses on mobile (hide nav links, keep logo)
- All grids stack to single column on mobile
- Touch-friendly tap targets

---

## Sections to build per business type

### Restaurant
1. **Nav** — logo, links (O nas / Galeria / Menu / Opinie / Kontakt)
2. **Hero** — full-screen slideshow (4 slides), location eyebrow, name, tagline, two CTAs (primary → menu, secondary → contact)
3. **Marquee strip** — scrolling list of key offerings
4. **About** — 2-column: story text left, 4 highlight cards right (icon + title + description)
5. **Gallery** — 12-column CSS grid, 6 images, lightbox on click
6. **Menu** — tabbed by category, each item has name + description + price
7. **Reviews** — Google rating score + review cards
8. **Contact** — address, phone, hours grid, map placeholder with Google Maps link
9. **Footer** — logo, copyright, social links

### Hair Salon
1. **Nav** — logo, links (O nas / Usługi / Zespół / Galeria / Opinie / Kontakt)
2. **Hero** — full-screen photo, name, tagline, "Umów wizytę" CTA
3. **About** — story + highlight cards (experience, products, approach, atmosphere)
4. **Booking CTA strip** — full-width accent band: short text + prominent button linking to phone or booking URL
5. **Services & Pricing** — list or cards, each with service name + short description + price
6. **Team** — cards per stylist: photo placeholder, name, specialty
7. **Gallery** — photo grid with lightbox
8. **Reviews** — rating + review cards
9. **Contact** — address, phone, hours, booking method, map placeholder
10. **Footer**

### Wellness Centre
1. **Nav** — logo, links (O nas / Zabiegi / Cennik / Zespół / Galeria / Opinie / Kontakt)
2. **Hero** — calm full-screen photo, name, tagline, "Zarezerwuj" CTA
3. **About** — philosophy + highlight cards
4. **Booking CTA strip** — same as salon
5. **Services** — cards per treatment: name + description + duration
6. **Pricing** — table or cards: treatment + duration + price (can merge with Services if brief says so)
7. **Team** — therapist/specialist cards
8. **Gallery** — photo grid with lightbox
9. **Reviews** — rating + review cards
10. **Contact** — address, phone, hours, booking method, map placeholder
11. **Footer**
12. **Gift vouchers section** — only if brief says yes

---

## After building

- List every field from the brief that was used
- List every `PLACEHOLDER` comment added and what file/slot it refers to
- List anything missing from the brief that you had to invent or guess — so it can be confirmed with the client
