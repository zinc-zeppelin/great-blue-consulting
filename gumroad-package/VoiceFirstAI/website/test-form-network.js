const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true // Open DevTools automatically
  });
  
  const context = await browser.newContext({
    permissions: ['microphone']
  });
  
  const page = await context.newPage();
  
  // Enable request interception to log ALL network activity
  await page.route('**/*', (route) => {
    const request = route.request();
    console.log(`[${request.method()}] ${request.url()}`);
    route.continue();
  });
  
  // Log responses
  page.on('response', response => {
    console.log(`[RESPONSE ${response.status()}] ${response.url()}`);
  });
  
  // Log console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });
  
  console.log('\n=== NAVIGATING TO LOCALHOST ===');
  await page.goto('http://localhost:3001');
  
  // Navigate directly to the form page
  console.log('\n=== NAVIGATING TO FORM ===');
  await page.goto('http://localhost:3001');
  
  // Manually set up the form state by evaluating JavaScript
  await page.evaluate(() => {
    // Find React root and trigger form display
    const root = document.getElementById('__next');
    if (root) {
      // Simulate the form being shown
      console.log('Setting up test form...');
    }
  });
  
  // Create a test form directly
  console.log('\n=== CREATING TEST FORM ===');
  await page.evaluate(() => {
    document.body.innerHTML = `
      <div style="padding: 20px;">
        <h2>Test Form Submission</h2>
        <form id="testForm">
          <input type="text" id="name" value="Test User" />
          <input type="email" id="email" value="test@example.com" />
          <input type="text" id="company" value="Test Company" />
          <button type="button" id="submitBtn">Submit Test</button>
        </form>
        <div id="result"></div>
      </div>
    `;
    
    document.getElementById('submitBtn').onclick = async () => {
      console.log('Submit clicked!');
      const result = document.getElementById('result');
      result.textContent = 'Submitting...';
      
      try {
        const response = await fetch('/api/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: 'test-' + Date.now(),
            formData: {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              company: document.getElementById('company').value
            },
            conversation: [
              { role: 'assistant', text: 'Hello! How can I help?' },
              { role: 'user', text: 'I need help with automation' }
            ],
            timestamp: new Date().toISOString()
          })
        });
        
        const text = await response.text();
        result.textContent = `Response: ${response.status} - ${text}`;
        console.log('Response received:', response.status, text);
      } catch (error) {
        result.textContent = `Error: ${error.message}`;
        console.error('Fetch error:', error);
      }
    };
  });
  
  // Wait for form to be created
  await page.waitForSelector('#submitBtn');
  
  console.log('\n=== SUBMITTING FORM ===');
  await page.click('#submitBtn');
  
  // Wait for response
  await page.waitForTimeout(5000);
  
  // Get result
  const result = await page.$eval('#result', el => el.textContent);
  console.log('\n=== RESULT ===');
  console.log(result);
  
  // Also test direct to webhook
  console.log('\n=== TESTING DIRECT WEBHOOK ===');
  const directResponse = await page.evaluate(async () => {
    try {
      const response = await fetch('https://primary-production-d8cb.up.railway.app/webhook/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: 'direct-from-browser',
          timestamp: new Date().toISOString()
        })
      });
      return {
        status: response.status,
        text: await response.text()
      };
    } catch (error) {
      return { error: error.message };
    }
  });
  
  console.log('Direct webhook response:', directResponse);
  
  await page.waitForTimeout(3000);
  await browser.close();
})();