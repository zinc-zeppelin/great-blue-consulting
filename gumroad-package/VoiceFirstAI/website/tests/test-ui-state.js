const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  });
  
  const context = await browser.newContext({
    permissions: ['microphone']
  });
  
  const page = await context.newPage();
  
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Speech')) {
      console.log(`[${new Date().toISOString()}] ${text}`);
    }
  });
  
  await page.goto('http://localhost:3001');
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('Clicking Start Talking...');
  await page.click('button:has-text("Start Talking")');
  
  // Monitor status changes
  let lastStatus = '';
  for (let i = 0; i < 20; i++) {
    const statusElement = await page.$('.text-gray-900.font-medium');
    if (statusElement) {
      const status = await statusElement.textContent();
      if (status !== lastStatus) {
        console.log(`[${new Date().toISOString()}] Status changed to: ${status}`);
        lastStatus = status;
      }
    }
    await page.waitForTimeout(500);
  }
  
  await browser.close();
})();