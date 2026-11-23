import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await desktop.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await desktop.waitForTimeout(500);
await desktop.screenshot({ path: 'artifacts/logo-formation-in-progress.png', fullPage: false });
await desktop.waitForTimeout(1700);
await desktop.screenshot({ path: 'artifacts/logo-formation-final.png', fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await mobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(2200);
await mobile.screenshot({ path: 'artifacts/logo-formation-mobile.png', fullPage: false });

await browser.close();
