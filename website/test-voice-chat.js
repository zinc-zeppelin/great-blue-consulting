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
  
  // Enable console logging
  page.on('console', msg => {
    console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.error(`[Page Error]`, err);
  });
  
  await page.goto('http://localhost:3002');
  
  // Wait for the page to load
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('Page loaded, clicking Start Talking button...');
  
  // Click the Start Talking button
  await page.click('button:has-text("Start Talking")');
  
  // Wait a bit to see what happens
  await page.waitForTimeout(5000);
  
  // Check what's displayed
  const statusText = await page.textContent('.text-gray-900.w-\\[140px\\]');
  console.log('Status text:', statusText);
  
  // Wait more to see if AI speaks
  console.log('Waiting for AI to speak...');
  await page.waitForTimeout(10000);
  
  // Check status again
  const statusText2 = await page.textContent('.text-gray-900.w-\\[140px\\]');
  console.log('Status text after waiting:', statusText2);
  
  // Try to find and click the end button if it exists
  const endButton = await page.$('button.ml-4.p-2.bg-red-500');
  if (endButton) {
    console.log('End button found, clicking it...');
    await endButton.click();
    await page.waitForTimeout(2000);
  } else {
    console.log('End button not found');
  }
  
  // Keep browser open for manual inspection
  await page.waitForTimeout(20000);
  
  await browser.close();
})();