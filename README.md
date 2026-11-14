# R-REX Solutions — Website

Cinematic marketing site for R-REX Solutions, built with React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and produce a production build in dist/
npm run preview   # preview the production build locally
npm run lint       # run oxlint
npm run test:responsive  # smoke-check responsive/reduced-motion coverage
```

Copy `.env.example` to `.env` and fill in values only in a secure server/runtime environment if you wire up a real
`/api/contact` route — no secrets are read from the frontend build.

## Folder structure

```
src/
  App.tsx                     Top-level composition of the page
  main.tsx                    React entry point
  index.css                   Brand tokens, global styles, all section styling
  data/siteContent.ts         Typed content: services, process, values, nav links, work items
  hooks/useReducedMotion.ts   prefers-reduced-motion hook
  components/
    ui/          ButtonLink (magnetic CTA), LogoMark
    layout/      Navbar, Footer, CursorGlow, ScrollProgress
    cinematic/   Preloader
    background/  CinematicBackdrop (hero video + particle/blueprint layers)
    sections/    HeroSection, ManifestoSection, ServicesSection, CapabilitiesStrip,
                 ProcessSection, WorkSection, WhyChooseUsSection, AboutSection,
                 LinkedInSection, FinalCtaSection, ContactSection
public/
  assets/        Logo, hero background video/poster
  robots.txt, sitemap.xml
```

## Content and brand rules

- All copy, service descriptions, process steps and links live in `src/data/siteContent.ts` — update content there
  rather than in components.
- Brand colour tokens are CSS variables defined once in `src/index.css` (`--rrex-*`).
- The "Selected Work" section intentionally ships with clearly labelled capability demonstrations
  (Internal Prototype / Product Concept / Research & Development). **Only publish real client names, results and
  testimonials after written approval** — see the comment in `src/components/sections/WorkSection.tsx`.
- Do not invent clients, metrics, awards or partnerships.

## Contact form

The form posts to `/api/contact`. This is a static Vite SPA, so no server route ships by default — deploy a
serverless function (Vercel/Netlify/etc.) at that path using the variables documented in `.env.example` to send
email. Until that route exists, the form fails gracefully and the section always shows the direct email and
WhatsApp fallback.

## Before deploying

- Replace the canonical URL placeholders in `index.html`, `public/robots.txt` and `public/sitemap.xml`
  (`REPLACE-WITH-RREX-DOMAIN.example`) with the real domain.
- Run `npm run build` and `npm run test:responsive` and confirm both pass.
- Manually check the viewports and reduced-motion behaviour listed in `responsive-layout-checklist.md`.
