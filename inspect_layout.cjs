const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Mobile viewport size
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/');
  
  // Wait for loading screen to clear
  await page.waitForTimeout(7000);

  const data = await page.evaluate(() => {
    // Helper to get element details
    const getDetails = (el, label) => {
      if (!el) return { label, exists: false };
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        label,
        exists: true,
        tagName: el.tagName,
        className: el.className,
        rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height },
        display: style.display,
        position: style.position,
        heightStyle: style.height,
        marginTop: style.marginTop,
        paddingTop: style.paddingTop,
      };
    };

    const container = document.querySelector('div.absolute.inset-0.flex.flex-col.justify-between');
    const bottomDetails = container ? container.children[1] : null;
    const row1 = bottomDetails ? bottomDetails.children[0] : null;
    const row2 = bottomDetails ? bottomDetails.children[1] : null;
    
    const p1 = row1 ? row1.children[0] : null;
    const btn = row1 ? row1.children[1] : null;
    const p2 = row2 ? row2.children[0] ? row2.children[0].querySelector('p') : null : null;

    return {
      container: getDetails(container, 'container'),
      bottomDetails: getDetails(bottomDetails, 'bottomDetails'),
      row1: getDetails(row1, 'row1'),
      p1: getDetails(p1, 'p1'),
      btn: getDetails(btn, 'btn'),
      row2: getDetails(row2, 'row2'),
      p2: getDetails(p2, 'p2'),
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
