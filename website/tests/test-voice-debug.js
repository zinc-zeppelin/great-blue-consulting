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
  
  // Capture all console logs
  const logs = [];
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    console.log(text);
    logs.push(text);
  });
  
  page.on('pageerror', err => {
    console.error(`[Page Error]`, err);
  });
  
  await page.goto('http://localhost:3001');
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('\n=== STARTING VOICE CHAT ===\n');
  await page.click('button:has-text("Start Talking")');
  
  // Wait for connection
  await page.waitForTimeout(3000);
  
  // Monitor status changes
  let lastStatus = '';
  for (let i = 0; i < 15; i++) {
    const statusText = await page.textContent('.text-gray-900.font-medium');
    if (statusText !== lastStatus) {
      console.log(`\n[STATUS CHANGE] ${statusText}`);
      lastStatus = statusText;
    }
    
    // Check if isSpeaking is being set
    const speechLogs = logs.filter(log => log.includes('Speech'));
    if (speechLogs.length > 0 && i === 5) {
      console.log('\n=== SPEECH EVENTS ===');
      speechLogs.forEach(log => console.log(log));
    }
    
    // Check conversation updates
    const convLogs = logs.filter(log => log.includes('Conversation update'));
    if (convLogs.length > 0 && i === 10) {
      console.log('\n=== CONVERSATION UPDATES ===');
      convLogs.forEach(log => console.log(log));
    }
    
    await page.waitForTimeout(1000);
  }
  
  // Click end button
  const endButton = await page.$('button.ml-2.p-2.bg-red-500');
  if (endButton) {
    console.log('\n=== ENDING CALL ===\n');
    await endButton.click();
    await page.waitForTimeout(3000);
    
    // Check if transcript page appears
    const transcriptHeading = await page.$('text=Your AI Consultation Transcript');
    if (transcriptHeading) {
      console.log('Transcript page appeared');
      
      // Check if conversation is empty
      const emptyMessage = await page.$('text=No conversation recorded');
      if (emptyMessage) {
        console.log('ERROR: No conversation was recorded!');
      } else {
        const messages = await page.$$('.mb-4');
        console.log(`Found ${messages.length} messages in transcript`);
      }
    } else {
      console.log('ERROR: Transcript page did not appear');
    }
  }
  
  // Print all message-related logs
  console.log('\n=== ALL MESSAGE LOGS ===');
  const messageLogs = logs.filter(log => 
    log.includes('message:') || 
    log.includes('Transcript:') || 
    log.includes('Speech update:')
  );
  messageLogs.forEach(log => console.log(log));
  
  await page.waitForTimeout(5000);
  await browser.close();
})();