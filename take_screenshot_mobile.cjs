const { chromium } = require('playwright');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge' });
  } catch (e) {
    browser = await chromium.launch({ channel: 'chrome' });
  }
  const page = await browser.newPage();
  
  // Set viewport size for mobile (iPhone 14 width/height: 390 x 844)
  await page.setViewportSize({ width: 390, height: 844 });
  
  console.log('Navigating to http://localhost:5173/ for mobile test...');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  
  const baseDir = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c';
  
  // 1. Mobile Hero
  const heroPath = path.join(baseDir, 'screenshot_mobile_hero.png');
  await page.screenshot({ path: heroPath });
  console.log('Mobile Hero screenshot saved to:', heroPath);
  
  // 2. Mobile Treatments track
  await page.evaluate(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  const servicesPath = path.join(baseDir, 'screenshot_mobile_services.png');
  await page.screenshot({ path: servicesPath });
  console.log('Mobile Services screenshot saved to:', servicesPath);

  // 3. Mobile Booking Form with Terms checkbox
  await page.evaluate(() => {
    document.getElementById('contact-booking')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  const formPath = path.join(baseDir, 'screenshot_mobile_form.png');
  await page.screenshot({ path: formPath });
  console.log('Mobile Form screenshot saved to:', formPath);

  // 4. Mobile Very End of Page (Footer, Copyright, and Completion)
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(1200);
  const endPath = path.join(baseDir, 'screenshot_mobile_end_of_page.png');
  await page.screenshot({ path: endPath });
  console.log('Mobile End of Page screenshot saved to:', endPath);

  await browser.close();
  console.log('Done mobile testing!');
})();
