const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size for mobile (iPhone width/height)
  await page.setViewportSize({ width: 375, height: 812 });
  
  console.log('Navigating to http://localhost:5173/ for mobile test...');
  await page.goto('http://localhost:5173/');
  
  // Wait for the loader to clear
  console.log('Waiting 7 seconds for preloading...');
  await page.waitForTimeout(7000);
  
  // Take screenshot of the Hero section in mobile
  const heroPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_mobile_hero.png';
  await page.screenshot({ path: heroPath });
  console.log('Mobile Hero screenshot saved to:', heroPath);
  
  // Scroll to Clinics section (35% scroll)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.35);
  });
  await page.waitForTimeout(1000);
  const clinicsPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_mobile_clinics.png';
  await page.screenshot({ path: clinicsPath });
  console.log('Mobile Clinics screenshot saved to:', clinicsPath);

  // Scroll to Technology section (60% scroll)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.60);
  });
  await page.waitForTimeout(1000);
  const techPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_mobile_tech.png';
  await page.screenshot({ path: techPath });
  console.log('Mobile Technology screenshot saved to:', techPath);

  // Scroll to Treatments section (82% scroll)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.82);
  });
  await page.waitForTimeout(1000);
  const treatmentsPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_mobile_treatments.png';
  await page.screenshot({ path: treatmentsPath });
  console.log('Mobile Treatments screenshot saved to:', treatmentsPath);
  
  // Open the Hamburger menu
  console.log('Clicking the mobile menu hamburger button...');
  await page.click('button[aria-label="Open mobile menu"]');
  await page.waitForTimeout(500);
  const menuPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_mobile_menu.png';
  await page.screenshot({ path: menuPath });
  console.log('Mobile Menu screenshot saved to:', menuPath);

  await browser.close();
  console.log('Mobile screenshots complete!');
})();
