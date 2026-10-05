import { chromium } from 'playwright';

async function audit() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600); // Allow progressive entrance animations to settle

  const baseDir = 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c';

  // 1. Hero Fullbleed Initial (Scroll 0)
  await page.screenshot({ path: `${baseDir}/audit_hero_fullbleed_initial.png` });

  // 2. Hero Fullbleed Zoom In on Scroll
  await page.evaluate(() => {
    window.scrollTo({ top: 400, behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${baseDir}/audit_hero_fullbleed_scrolled_zoom.png` });

  // 3. Reset to top, open Booking Modal to ensure it's pristine
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  // 4. Mobile View of Hero
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: `${baseDir}/audit_hero_mobile_fullbleed.png` });

  await browser.close();
  console.log('Screenshots captured successfully!');
}

audit().catch(console.error);
