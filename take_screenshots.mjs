import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Desktop Test (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Hero section
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_hero_verify.png' });

  // Scroll into Horizontal Track #1 (Treatments)
  await page.evaluate(() => {
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_horizontal_services.png' });

  // Scroll into Vertical section (Anxious Patients)
  await page.evaluate(() => {
    const el = document.getElementById('anxious-patients');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_vertical_anxious.png' });

  // Scroll into Digital Smile Design (DSD Gold)
  await page.evaluate(() => {
    const el = document.getElementById('digital-smile-design');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_vertical_dsd.png' });

  // Scroll into Horizontal Track #2 (Our Team)
  await page.evaluate(() => {
    const el = document.getElementById('our-team');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_horizontal_team.png' });

  // Scroll down within Team to show horizontal movement
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_horizontal_team_scrolled.png' });

  // Scroll into Restorations (Before/After)
  await page.evaluate(() => {
    const el = document.getElementById('smile-results');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_vertical_results.png' });

  // Scroll into Clinics (St. James Hospital & 3 arrival steps)
  await page.evaluate(() => {
    const el = document.getElementById('clinics');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_vertical_clinics.png' });

  // Scroll into Booking & VIP Concierge
  await page.evaluate(() => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/desktop_vertical_concierge.png' });

  // 2. Mobile Test (390x844 - iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Mobile horizontal swipeable team
  await mobilePage.evaluate(() => {
    const el = document.getElementById('our-team');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/mobile_team_carousel.png' });

  // Mobile concierge
  await mobilePage.evaluate(() => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c/mobile_concierge.png' });

  await browser.close();
  console.log('SUCCESS_ALL_CAPTURED');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
