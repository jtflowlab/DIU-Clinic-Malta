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
  
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  
  const baseDir = 'C:\\Users\\jorda\\.gemini\\antigravity\\brain\\2f59d547-19fb-4dd6-b63e-6926441a856c';
  
  // 1. Hero
  const heroPath = path.join(baseDir, 'screenshot_hero_updated.png');
  await page.screenshot({ path: heroPath });
  console.log('Hero screenshot saved to:', heroPath);
  
  // 2. Founders section
  await page.evaluate(() => {
    window.scrollTo(0, 1150);
  });
  await page.waitForTimeout(1000);
  const foundersPath = path.join(baseDir, 'screenshot_founders.png');
  await page.screenshot({ path: foundersPath });
  console.log('Founders screenshot saved to:', foundersPath);
  
  // 3. Services section
  await page.evaluate(() => {
    window.scrollTo(0, 1950);
  });
  await page.waitForTimeout(1000);
  const servicesPath = path.join(baseDir, 'screenshot_services.png');
  await page.screenshot({ path: servicesPath });
  console.log('Services screenshot saved to:', servicesPath);

  // 4. DSD section
  await page.evaluate(() => {
    window.scrollTo(0, 2900);
  });
  await page.waitForTimeout(1000);
  const dsdPath = path.join(baseDir, 'screenshot_dsd.png');
  await page.screenshot({ path: dsdPath });
  console.log('DSD screenshot saved to:', dsdPath);

  // 5. Prices page
  await page.evaluate(() => {
    window.location.hash = '/prices';
  });
  await page.waitForTimeout(1200);
  const pricesPath = path.join(baseDir, 'screenshot_prices.png');
  await page.screenshot({ path: pricesPath });
  console.log('Prices screenshot saved to:', pricesPath);

  // 6. Blog page
  await page.evaluate(() => {
    window.location.hash = '/blog';
  });
  await page.waitForTimeout(1200);
  const blogPath = path.join(baseDir, 'screenshot_blog.png');
  await page.screenshot({ path: blogPath });
  console.log('Blog screenshot saved to:', blogPath);
  
  await browser.close();
  console.log('Done capturing all updated sections!');
})();
