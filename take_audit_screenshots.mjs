import { chromium } from 'playwright';

async function audit() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const baseDir = 'C:/Users/jorda/.gemini/antigravity/brain/2f59d547-19fb-4dd6-b63e-6926441a856c';

  // 1. Hero Fullscreen
  await page.screenshot({ path: `${baseDir}/audit_desktop_hero_fullscreen.png` });

  // 2. Click Compact Video toggle
  const compactBtn = page.locator('button:has-text("Compact Video")');
  if (await compactBtn.count() > 0) {
    await compactBtn.first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${baseDir}/audit_desktop_hero_compact.png` });
  }

  // 3. Services with real images
  await page.evaluate(() => {
    const el = document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${baseDir}/audit_services_with_images.png` });

  // 4. Smile Results (moved right after services)
  await page.evaluate(() => {
    const el = document.getElementById('smile-results');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${baseDir}/audit_smile_results_moved_up.png` });

  // 5. Team Section (Core 5 specialists)
  await page.evaluate(() => {
    const el = document.getElementById('our-team');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${baseDir}/audit_team_core_5.png` });

  // 6. Click View All Team Members (19)
  const viewAllBtn = page.locator('button:has-text("View All Team Members")');
  if (await viewAllBtn.count() > 0) {
    await viewAllBtn.first().click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${baseDir}/audit_team_expanded_19.png` });
  }

  // 7. Fees & Prices
  await page.evaluate(() => {
    const el = document.getElementById('fees-prices');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${baseDir}/audit_fees_prices.png` });

  // 8. Open Emergency Modal
  const urgentBtn = page.locator('button:has-text("Urgent Care")');
  if (await urgentBtn.count() > 0) {
    await urgentBtn.first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${baseDir}/audit_emergency_modal.png` });
    // Close it
    const closeBtn = page.locator('button[aria-label="Close emergency modal"]');
    if (await closeBtn.count() > 0) await closeBtn.first().click();
  }

  // 9. Open Booking Modal and test First/Last Name and Contact Preference
  const bookBtn = page.locator('button:has-text("Book Consultation")');
  if (await bookBtn.count() > 0) {
    await bookBtn.first().click();
    await page.waitForTimeout(600);

    // Fill First and Last Name
    const firstNameInput = page.locator('input[placeholder*="Christopher"]');
    if (await firstNameInput.count() > 0) await firstNameInput.first().fill('Alexander');
    
    const lastNameInput = page.locator('input[placeholder*="Borg"]');
    if (await lastNameInput.count() > 0) await lastNameInput.first().fill('Vella');

    const phoneInput = page.locator('input[placeholder*="+356"]');
    if (await phoneInput.count() > 0) await phoneInput.first().fill('+356 9912 3456');

    // Click Call Back contact preference
    const callBackBtn = page.locator('button:has-text("Call Back")');
    if (await callBackBtn.count() > 0) await callBackBtn.first().click();

    await page.waitForTimeout(600);
    await page.screenshot({ path: `${baseDir}/audit_booking_modal_new_fields.png` });
  }

  await browser.close();
  console.log('AUDIT SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

audit().catch(console.error);
