# Agentix Solution — Agency Website

Award-grade marketing site for **Agentix Solution**, an AI automation agency.
Built with Next.js (App Router) + React Three Fiber + GSAP, designed around the
brand gradient (blue → purple → red/orange) on a near-black base.

## Stack
- **Next.js 16** (App Router) + TypeScript + **Tailwind CSS v4**
- **React Three Fiber / three.js** — interactive WebGL "agent field" hero
- **GSAP + ScrollTrigger** — scrollytelling process section
- **Lenis** — smooth scrolling (synced with GSAP)
- **Framer Motion** — UI reveals & micro-interactions
- **react-hook-form + zod** — contact form, validated client + server
- **Resend** — contact email delivery

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project map
```
app/
  page.tsx                 Home (hero, services, work, process, testimonials)
  services/                Full services + FAQ
  work/ + work/[slug]/     Case studies (data in lib/content.ts)
  about/                   Story, values, process
  blog/                    Placeholder posts (GEO)
  contact/                 Contact form
  api/contact/route.ts     Form handler (zod + Resend, dev-log fallback)
  sitemap.ts, robots.ts    SEO
components/                UI, sections, three/ (WebGL)
lib/
  site.ts                  Site config (name, url, email, nav, keywords)
  content.ts               ALL copy: services, cases, stats, testimonials, FAQ
  jsonld.ts                Structured data (Organization, Service, FAQ)
```

## Customising
- **Brand colors** — all tokens live in `app/globals.css` under `@theme` and the
  `--grad-brand` variables. Edit there to retune the whole site.
- **Logo** — currently an SVG approximation in `components/ui/Logo.tsx`. Drop the
  real asset at `public/logo.png` (or replace the inline SVG) to use the official mark.
- **Copy / services / case studies** — edit `lib/content.ts`. Numbers in `stats`
  and the case studies are illustrative placeholders — swap for real metrics.
- **Site name / URL / email / social** — edit `lib/site.ts` (update `url` before launch).

## Contact form email
The form works out of the box in dev (submissions are logged, not emailed).
To deliver real email, set env vars (see `.env.example`):
```
RESEND_API_KEY=...                 # from resend.com
CONTACT_TO=you@yourdomain.com      # defaults to site.email
CONTACT_FROM="Agentix Solution <hello@yourdomain.com>"  # Resend-verified sender
```

## Deploy (Vercel)
Push to a Git repo, import into Vercel (zero config for Next.js), and add the
`RESEND_*` / `CONTACT_*` env vars in the project settings.

## Performance & accessibility
- The WebGL hero is dynamically imported, client-only, and **replaced with a
  lightweight gradient fallback** on mobile / low-power devices and when the user
  prefers reduced motion (`lib/useWebGLEnabled.ts`).
- All motion respects `prefers-reduced-motion`.
