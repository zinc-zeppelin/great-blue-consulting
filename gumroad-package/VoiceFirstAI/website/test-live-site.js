const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Monitor network requests
  const requests = [];
  page.on('request', request => {
    if (request.url().includes('api') || request.url().includes('webhook')) {
      console.log(`[REQUEST] ${request.method()} ${request.url()}`);
      requests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData()
      });
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('api') || response.url().includes('webhook')) {
      console.log(`[RESPONSE] ${response.status()} ${response.url()}`);
    }
  });
  
  // Test on a simple HTML page first
  console.log('\n=== CREATING TEST PAGE ===');
  await page.goto('data:text/html,<h1>API Test</h1>');
  
  // Test different scenarios
  await page.evaluate(() => {
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h2>Testing Form Submission</h2>
        
        <button onclick="testLocalAPI()">Test Local API</button>
        <button onclick="testNetlifyAPI()">Test Netlify API</button>
        <button onclick="testDirectWebhook()">Test Direct Webhook</button>
        
        <div id="results" style="margin-top: 20px; white-space: pre-wrap;"></div>
      </div>
      
      <script>
        const log = (msg) => {
          document.getElementById('results').textContent += msg + '\\n';
          console.log(msg);
        };
        
        async function testLocalAPI() {
          log('\\n--- Testing /api/consultation ---');
          try {
            const response = await fetch('/api/consultation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                test: 'local-api',
                timestamp: new Date().toISOString()
              })
            });
            log('Response: ' + response.status + ' ' + response.statusText);
            const text = await response.text();
            log('Body: ' + text.substring(0, 100));
          } catch (error) {
            log('Error: ' + error.message);
          }
        }
        
        async function testNetlifyAPI() {
          log('\\n--- Testing Netlify Site API ---');
          const netlifyUrl = prompt('Enter your Netlify URL (e.g., https://your-site.netlify.app)');
          if (!netlifyUrl) return;
          
          try {
            const response = await fetch(netlifyUrl + '/api/consultation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                test: 'netlify-api',
                timestamp: new Date().toISOString()
              })
            });
            log('Response: ' + response.status + ' ' + response.statusText);
            const text = await response.text();
            log('Body: ' + text.substring(0, 100));
          } catch (error) {
            log('Error: ' + error.message);
          }
        }
        
        async function testDirectWebhook() {
          log('\\n--- Testing Direct Webhook ---');
          try {
            const response = await fetch('https://primary-production-d8cb.up.railway.app/webhook/consultation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                test: 'direct-webhook',
                timestamp: new Date().toISOString()
              })
            });
            log('Response: ' + response.status + ' ' + response.statusText);
            const text = await response.text();
            log('Body: ' + text);
          } catch (error) {
            log('Error: ' + error.message);
          }
        }
      </script>
    `;
  });
  
  console.log('\n=== TEST READY ===');
  console.log('Click the buttons to test different endpoints.');
  console.log('Watch the console and network tab for results.');
  
  // Keep browser open for manual testing
  await page.waitForTimeout(60000);
  
  console.log('\n=== CAPTURED REQUESTS ===');
  requests.forEach(req => {
    console.log(`${req.method} ${req.url}`);
    if (req.postData) {
      console.log('Body:', req.postData);
    }
  });
  
  await browser.close();
})();