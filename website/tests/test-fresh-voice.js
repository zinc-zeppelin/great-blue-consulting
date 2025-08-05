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
  
  // Log console messages
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  await page.goto('http://localhost:3001');
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('\n=== STARTING VOICE CHAT ===\n');
  await page.click('button:has-text("Start Talking")');
  
  // Monitor status changes
  let lastStatus = '';
  for (let i = 0; i < 30; i++) {
    const statusElement = await page.$('.text-gray-900.font-medium');
    if (statusElement) {
      const status = await statusElement.textContent();
      if (status !== lastStatus) {
        console.log(`\n[STATUS CHANGE] ${status}\n`);
        lastStatus = status;
      }
    }
    await page.waitForTimeout(500);
  }
  
  // Try ending the call
  const endButton = await page.$('button.ml-2.p-2.bg-red-500');
  if (endButton) {
    console.log('\n=== ENDING CALL ===\n');
    await endButton.click();
    await page.waitForTimeout(3000);
    
    // Check if transcript page appears
    const transcriptText = await page.textContent('body');
    if (transcriptText.includes('conversation transcript')) {
      console.log('Transcript page appeared');
      
      // Check if conversation was recorded
      if (transcriptText.includes('No conversation recorded')) {
        console.log('ERROR: No conversation was recorded!');
      } else {
        console.log('SUCCESS: Conversation was recorded');
      }
    }
  }
  
  await browser.close();
})();