const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  });
  
  const context = await browser.newContext({
    permissions: ['microphone']
  });
  
  const page = await context.newPage();
  
  const messages = [];
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Vapi message type:') || 
        text.includes('Speech') || 
        text.includes('Important message:') ||
        text.includes('Conversation update')) {
      console.log(text);
      messages.push(text);
    }
  });
  
  await page.goto('http://localhost:3001');
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  await page.click('button:has-text("Start Talking")');
  
  // Wait for messages
  await page.waitForTimeout(10000);
  
  // End call
  const endButton = await page.$('button.ml-2.p-2.bg-red-500');
  if (endButton) {
    await endButton.click();
  }
  
  await page.waitForTimeout(2000);
  
  console.log('\n=== SUMMARY ===');
  console.log('Total messages:', messages.length);
  
  const messageTypes = messages
    .filter(m => m.includes('Vapi message type:'))
    .map(m => m.split('Vapi message type:')[1].trim());
  
  const uniqueTypes = [...new Set(messageTypes)];
  console.log('Message types received:', uniqueTypes);
  
  await browser.close();
})();