import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = fileURLToPath(new URL('../artifacts/', import.meta.url));
const cases = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--enable-webgl', '--ignore-gpu-blocklist', '--use-angle=swiftshader'],
});

try {
  for (const testCase of cases) {
    const page = await browser.newPage({ viewport: { width: testCase.width, height: testCase.height }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
    await page.locator('.assembly-final-mark').waitFor({ state: 'visible' });
    await page.locator('.particle-vortex canvas').waitFor({ state: 'visible' });
    let letterProgress;
    for (let attempt = 0; attempt < 45; attempt += 1) {
      const progress = await page.locator('.assembly-wordmark-text span').evaluateAll((letters) => ({
        visible: letters.filter((letter) => Number.parseFloat(getComputedStyle(letter).opacity) > 0.5).length,
        total: letters.length,
      }));
      if (progress.visible > 0 && progress.visible < progress.total) {
        letterProgress = progress;
        break;
      }
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(2600);

    const result = await page.evaluate(async () => {
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const finalMark = document.querySelector('.assembly-final-mark');
      const vortexCanvas = document.querySelector('.particle-vortex canvas');
      const wordmark = document.querySelector('.assembly-wordmark-text');
      const stage = document.querySelector('.assembly-stage');
      if (!(finalMark instanceof HTMLImageElement) || !(vortexCanvas instanceof HTMLCanvasElement) || !(wordmark instanceof HTMLElement) || !(stage instanceof HTMLElement)) {
        throw new Error('Logo scene elements are missing');
      }
      const vortexGl = vortexCanvas.getContext('webgl2') || vortexCanvas.getContext('webgl');
      if (!vortexGl) throw new Error('WebGL context is unavailable');
      const vortexPixels = new Uint8Array(vortexCanvas.width * vortexCanvas.height * 4);
      vortexGl.readPixels(0, 0, vortexCanvas.width, vortexCanvas.height, vortexGl.RGBA, vortexGl.UNSIGNED_BYTE, vortexPixels);
      let luminousPixels = 0;
      for (let index = 0; index < vortexPixels.length; index += 4) {
        if (vortexPixels[index] + vortexPixels[index + 1] + vortexPixels[index + 2] > 52) luminousPixels += 1;
      }
      const wordmarkRect = wordmark.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      return {
        assembly: {
          source: finalMark.currentSrc,
          loaded: finalMark.complete && finalMark.naturalWidth > 0,
          opacity: Number.parseFloat(getComputedStyle(finalMark).opacity),
        },
        vortex: {
          canvas: `${vortexCanvas.width}x${vortexCanvas.height}`,
          luminousPixels,
          luminousRatio: luminousPixels / (vortexCanvas.width * vortexCanvas.height),
        },
        wordmarkInsideStage: wordmarkRect.left >= stageRect.left - 1 && wordmarkRect.right <= stageRect.right + 1,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    if (!result.assembly.loaded || result.assembly.opacity < 0.95) throw new Error(`${testCase.name}: final logo asset is not fully visible`);
    if (result.vortex.luminousRatio < 0.005) throw new Error(`${testCase.name}: vortex canvas is blank`);
    if (!letterProgress) throw new Error(`${testCase.name}: no progressive wordmark state was observed`);
    if (!result.wordmarkInsideStage) throw new Error(`${testCase.name}: wordmark escapes the logo stage`);
    if (result.horizontalOverflow) throw new Error(`${testCase.name}: page has horizontal overflow`);
    if (errors.length) throw new Error(`${testCase.name}: browser errors: ${errors.join(' | ')}`);

    await page.screenshot({ path: join(outputDir, `rrex-3d-${testCase.name}.png`), fullPage: false });
    const showcase = page.locator('.work-section');
    await showcase.scrollIntoViewIfNeeded();
    await page.locator('.work-media img').first().waitFor({ state: 'visible' });
    await page.waitForTimeout(500);
    const movementBefore = await page.locator('.work-row-track').evaluateAll((tracks) => tracks.map((track) => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41));
    const animationBefore = await page.locator('.work-row-track').evaluateAll((tracks) => tracks.map((track) => ({
      name: getComputedStyle(track).animationName,
      playState: getComputedStyle(track).animationPlayState,
      currentTime: Number(track.getAnimations()[0]?.currentTime ?? 0),
      duration: Number(track.getAnimations()[0]?.effect?.getComputedTiming().duration ?? 0),
    })));
    await page.waitForTimeout(700);
    const movementAfter = await page.locator('.work-row-track').evaluateAll((tracks) => tracks.map((track) => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41));
    const animationAfter = await page.locator('.work-row-track').evaluateAll((tracks) => tracks.map((track) => Number(track.getAnimations()[0]?.currentTime ?? 0)));
    const showcaseResult = await page.evaluate(() => {
      const tracks = [...document.querySelectorAll('.work-row-track')];
      const cards = [...document.querySelectorAll('.work-card:not([aria-hidden="true"])')];
      const allCards = [...document.querySelectorAll('.work-card')];
      const images = [...document.querySelectorAll('.work-media img')];
      if (tracks.length !== 2) throw new Error('Showcase tracks are missing');
      return {
        cards: cards.length,
        renderedCards: allCards.length,
        rows: new Set(cards.map((card) => Math.round(card.getBoundingClientRect().top))).size,
        imagesLoaded: images.filter((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0).length,
        horizontalPageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    if (showcaseResult.cards !== 8 || showcaseResult.renderedCards !== 16 || showcaseResult.imagesLoaded !== 16) {
      throw new Error(`${testCase.name}: showcase assets are incomplete (${showcaseResult.imagesLoaded}/${showcaseResult.cards})`);
    }
    if (showcaseResult.rows !== 2) throw new Error(`${testCase.name}: showcase does not have two rows`);
    if (animationBefore[0].name !== 'workRowForward') throw new Error(`${testCase.name}: top row direction animation is incorrect`);
    if (animationBefore[1].name !== 'workRowReverse') throw new Error(`${testCase.name}: bottom row direction animation is incorrect`);
    if (animationBefore.some((animation) => animation.playState !== 'running')) throw new Error(`${testCase.name}: a showcase row is not running`);
    if (animationAfter.some((time, index) => {
      const before = animationBefore[index];
      const elapsed = (time - before.currentTime + before.duration) % before.duration;
      return elapsed < 100;
    })) throw new Error(`${testCase.name}: a showcase row timeline is not advancing (${JSON.stringify({ animationBefore, animationAfter })})`);
    if (showcaseResult.horizontalPageOverflow) throw new Error(`${testCase.name}: showcase causes page overflow`);
    await showcase.screenshot({ path: join(outputDir, `rrex-showcase-${testCase.name}.png`) });
    console.log(`${testCase.name}: ${JSON.stringify({ ...result, letterProgress, showcase: { ...showcaseResult, movementBefore, movementAfter, animationBefore, animationAfter } })}`);
    await page.close();
  }
} finally {
  await browser.close();
}
