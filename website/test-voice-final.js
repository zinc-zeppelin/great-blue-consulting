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
  
  // Capture console logs
  page.on('console', msg => {
    if (msg.text().includes('Speech') || msg.text().includes('Call')) {
      console.log(`[${new Date().toISOString()}] ${msg.text()}`);
    }
  });
  
  await page.goto('http://localhost:3000');
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('\n=== CLICKING START TALKING ===\n');
  await page.click('button:has-text("Start Talking")');
  
  // Wait for call to start
  await page.waitForTimeout(2000);
  
  // Check status periodically
  for (let i = 0; i < 10; i++) {
    const statusText = await page.textContent('.text-gray-900.w-\\[140px\\]');
    console.log(`[${new Date().toISOString()}] Status: ${statusText}`);
    await page.waitForTimeout(1000);
  }
  
  // Click end button
  const endButton = await page.$('button.ml-4.p-2.bg-red-500');
  if (endButton) {
    console.log('\n=== CLICKING END BUTTON ===\n');
    await endButton.click();
    await page.waitForTimeout(2000);
  }
  
  await browser.close();
})();