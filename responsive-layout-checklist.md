# Responsive Layout Checks

Run the production build or dev server, then verify these viewports:

- 1440 x 900: pinned manifesto, service progress rail, desktop navigation, scroll progress.
- 1024 x 768: reduced parallax depth, readable service chapters, no text overlap.
- 390 x 844: mobile menu, stacked service cards, readable hero at narrow width, 44px targets.
- 320 x 568: no horizontal overflow, CTA text fits, contact form fields remain usable.

Also test with `prefers-reduced-motion: reduce` enabled: pinned sequences should become simple static/fade content.
