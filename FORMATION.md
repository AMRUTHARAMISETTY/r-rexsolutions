# R-REX formation

The hero uses the supplied PNG layers in their original 1254 × 1254 coordinate system. No logo assets were changed. The seven-second canvas sequence includes ignition, head (0.6–1.6), jaw (1.3–2.3), face (2.1–3.1), orange (3–4), yellow (3.5–4.5), triangle (4.3–4.9), activation (4.9–5.7), and original wordmark (5.4–6.3).

Modified files:
- `src/components/ui/LogoFormation.tsx`: shared timeline, finite effects, directional depth, original facial patch, adaptive particle density and off-screen/hidden-tab termination.
- `src/components/cinematic/FormationExperience.tsx`: once-per-session playback, skip, replay, gesture-activated soundtrack and live mute.
- `src/lib/logoSound.ts`: synchronized synthesized sound events and master mute.
- `src/components/sections/HeroSection.tsx`: embeds the experience at normal speed.
- `src/index.css`: responsive, accessible formation controls.

The website remains interactive throughout. Leaving the viewport or hiding the tab finishes the animation and stops audio instead of resuming a desynchronized sequence. Reduced motion displays the assembled logo immediately. Performance/Balanced/Ultra select 16/36/64 particles using viewport and CPU concurrency heuristics; sustained slow frames lower the profile. These are heuristics, not GPU capability measurements. Effects use canvas approximations, not volumetric rendering or physical 3D materials.

Validation: TypeScript and Vite production build, existing responsive smoke check, visible Chrome desktop/tablet/mobile viewport checks, replay, sound toggle, skip, native scroll during playback, reduced motion and console error capture. Screenshots saved under `/tmp/rrex-*.png`. No physical iPhone/Android, Safari, Windows wheel, Mac trackpad, slow-network or before/after FPS measurements were performed. Existing page sections and company functionality are preserved; this change focuses on the formation rather than rebuilding every section from the broader brief.
