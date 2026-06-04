const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size for desktop layout inspection
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/');
  
  // Wait for the initial 300 images to preload and the loading overlay to fade out
  console.log('Waiting 7 seconds for images to preload...');
  await page.waitForTimeout(7000);
  
  // Take screenshot of the Hero section
  const heroPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_hero.png';
  await page.screenshot({ path: heroPath });
  console.log('Hero screenshot saved to:', heroPath);
  
  // Scroll to 35% of page height (Clinics section)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.35);
  });
  await page.waitForTimeout(1000);
  const clinicsPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_clinics.png';
  await page.screenshot({ path: clinicsPath });
  console.log('Clinics screenshot saved to:', clinicsPath);

  // Scroll to 60% of page height (Technology section)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.60);
  });
  await page.waitForTimeout(1000);
  const techPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_tech.png';
  await page.screenshot({ path: techPath });
  console.log('Technology screenshot saved to:', techPath);

  // Scroll to 82% of page height (Treatments section)
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.82);
  });
  await page.waitForTimeout(1000);
  const treatmentsPath = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c\\screenshot_treatments.png';
  await page.screenshot({ path: treatmentsPath });
  console.log('Treatments screenshot saved to:', treatmentsPath);
  
  await browser.close();
  console.log('Done!');
})();
