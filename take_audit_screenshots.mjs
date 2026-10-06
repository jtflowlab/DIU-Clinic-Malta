import { chromium } from 'playwright';

async function audit() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);

  const baseDir = 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c';

  // 1. Hero Initial Fullscreen (Scroll 0)
  await page.screenshot({ path: `${baseDir}/audit_hero_initial_fullbleed.png` });

  // 2. Hero Scrolled Down - Shrinking & Docking (Scroll ~450px)
  await page.evaluate(() => {
    window.scrollTo({ top: 450, behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${baseDir}/audit_hero_docked_on_scroll.png` });

  // 3. Scroll to Team Section (#our-team) showing 4 focused specialists
  await page.evaluate(() => {
    const el = document.getElementById('our-team');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${baseDir}/audit_team_4_focused_specialists.png` });

  // 4. Click the "View Full Medical Team & Specialists (19)" button to open internal directory
  const viewFullTeamBtn = page.locator('button:has-text("View Full Medical Team")');
  if (await viewFullTeamBtn.count() > 0) {
    await viewFullTeamBtn.first().click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${baseDir}/audit_team_internal_directory_open.png` });
  }

  await browser.close();
  console.log('Screenshots taken successfully!');
}

audit().catch(console.error);
