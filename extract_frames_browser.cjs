const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('[+] Launching headless Chromium browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to Vite dev server
  console.log('[+] Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/');

  // Create frames folder if it doesn't exist
  const framesDir = path.join(__dirname, 'public', 'frames');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  // Expose a function to save the base64 frames to disk
  let savedCount = 0;
  await page.exposeFunction('saveFrame', (index, base64Data) => {
    const filename = `ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
    const destPath = path.join(framesDir, filename);
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(destPath, buffer);
    savedCount++;
    if (savedCount % 30 === 0 || savedCount === 300) {
      console.log(`    Progress: saved ${savedCount}/300 frames...`);
    }
  });

  console.log('[+] Starting browser-based 1080p frame extraction...');
  
  try {
    await page.evaluate(async () => {
      const video = document.createElement('video');
      video.src = '/Video DIU sin marca.mp4';
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error('Failed to load video. Ensure Vite is running.'));
      });

      const duration = video.duration;
      const totalFrames = 300;
      
      const canvas = document.createElement('canvas');
      canvas.width = 1920;  // 1080p width
      canvas.height = 1080; // 1080p height
      const ctx = canvas.getContext('2d');

      // Evenly distribute 300 frames across the duration
      // (avoiding the absolute end to prevent empty seek frames)
      const times = [];
      for (let i = 0; i < totalFrames; i++) {
        times.push(i * (duration - 0.05) / (totalFrames - 1));
      }

      for (let i = 0; i < totalFrames; i++) {
        const time = times[i];
        video.currentTime = time;
        
        await new Promise((resolve) => {
          video.onseeked = () => resolve();
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Export frame at 85% JPEG quality for high clarity and optimal loading speeds
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        
        await window.saveFrame(i + 1, base64Data);
      }
    });

    console.log('[+] Frame extraction successful! All 300 frames saved in high-quality 1080p.');
  } catch (err) {
    console.error('[-] Error during frame extraction:', err.message);
  } finally {
    await browser.close();
    console.log('[+] Browser closed.');
  }
})();
