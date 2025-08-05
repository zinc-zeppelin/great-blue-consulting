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
  
  // Log all console messages
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  await page.goto('http://localhost:3001');
  await page.waitForSelector('button:has-text("Start Talking")', { timeout: 10000 });
  
  console.log('\n=== CLICKING START TALKING ===');
  await page.click('button:has-text("Start Talking")');
  
  // Inject JavaScript to monitor React state
  await page.evaluate(() => {
    // Find the React component
    const getReactComponent = () => {
      const element = document.querySelector('[class*="text-gray-900 font-medium"]');
      if (!element) return null;
      
      const key = Object.keys(element).find(k => k.startsWith('__reactFiber'));
      if (!key) return null;
      
      let fiber = element[key];
      while (fiber && !fiber.memoizedState) {
        fiber = fiber.return;
      }
      return fiber;
    };
    
    // Monitor state changes
    let lastState = null;
    setInterval(() => {
      const component = getReactComponent();
      if (component && component.memoizedState) {
        const currentState = JSON.stringify(component.memoizedState);
        if (currentState !== lastState) {
          console.log('React state changed:', currentState);
          lastState = currentState;
        }
      }
      
      // Also check the DOM
      const statusElement = document.querySelector('.text-gray-900.font-medium');
      if (statusElement) {
        console.log('DOM text:', statusElement.textContent);
      }
    }, 500);
  });
  
  // Wait and monitor
  console.log('\n=== MONITORING FOR 15 SECONDS ===');
  await page.waitForTimeout(15000);
  
  // Try ending the call
  const endButton = await page.$('button.ml-2.p-2.bg-red-500');
  if (endButton) {
    console.log('\n=== ENDING CALL ===');
    await endButton.click();
    await page.waitForTimeout(3000);
  }
  
  await browser.close();
})();