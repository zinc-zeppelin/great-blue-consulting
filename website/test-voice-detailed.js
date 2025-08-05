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
  
  const logs = [];
  
  // Capture ALL console logs
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    console.log(text);
    logs.push(text);
  });
  
  page.on('pageerror', err => {
    console.error(`[Page Error]`, err);
  });
  
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('\n=== STARTING VOICE CHAT ===\n');
  
  // Click the Start Talking button
  await page.click('button:has-text("Start Talking")');
  
  // Wait longer to capture all initial messages
  console.log('\n=== WAITING FOR MESSAGES (20 seconds) ===\n');
  await page.waitForTimeout(20000);
  
  // Check status
  const statusText = await page.textContent('.text-gray-900.w-\\[140px\\]');
  console.log('\n=== FINAL STATUS:', statusText, '===\n');
  
  // Print all Vapi messages
  console.log('\n=== ALL VAPI MESSAGES ===');
  const vapiLogs = logs.filter(log => log.includes('Vapi message:'));
  vapiLogs.forEach(log => console.log(log));
  
  // Print speech updates
  console.log('\n=== SPEECH UPDATES ===');
  const speechLogs = logs.filter(log => log.includes('Speech update:'));
  speechLogs.forEach(log => console.log(log));
  
  await browser.close();
})();