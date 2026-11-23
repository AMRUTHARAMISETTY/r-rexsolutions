import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

async function capture(width, height, output) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'domcontentloaded' });
  const team = page.locator('#about');
  await team.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const cards = team.locator('.leader-card');
  const links = team.locator('.leader-card a[href*="linkedin.com/in/"]');
  if (await cards.count() !== 6) throw new Error('Expected six team cards');
  if (await links.count() !== 6) throw new Error('Expected six LinkedIn profile links');
  await team.screenshot({ path: output });
  await page.close();
}

await capture(1440, 1000, 'artifacts/team-section-desktop.png');
await capture(390, 844, 'artifacts/team-section-mobile.png');
await browser.close();
