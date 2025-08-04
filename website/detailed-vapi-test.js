const { chromium } = require('playwright');

async function detailedVapiTest() {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}]: ${msg.text()}`);
  });

  // Enable error logging
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR]: ${error.message}`);
  });

  try {
    console.log('🔍 Detailed Vapi Implementation Analysis\n');

    // Navigate and submit form first
    await page.goto('https://deploy-preview-2--gregarious-moxie-b3361f.netlify.app', {
      waitUntil: 'networkidle'
    });

    // Fill and submit form quickly
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="company"]', 'Test Corp');
    await page.selectOption('select[name="service"]', 'AI Automation');
    await page.fill('textarea[name="message"]', 'I need help with process automation');
    
    const submitButton = await page.$('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(3000);

    console.log('📋 DETAILED VOICE CHAT ANALYSIS');
    console.log('================================\n');

    // 1. Check all elements in the voice chat area
    console.log('1. Voice Chat DOM Structure:');
    const voiceChatHTML = await page.evaluate(() => {
      const container = document.querySelector('.voice-chat-container') || 
                       document.querySelector('#voice-chat') ||
                       document.querySelector('[class*="voice"]');
      return container ? container.outerHTML : 'Container not found';
    });
    console.log('   Voice chat container HTML:');
    console.log(`   ${voiceChatHTML.slice(0, 500)}...\n`);

    // 2. Check computed styles
    console.log('2. Button and Container Styles:');
    const buttonStyles = await page.evaluate(() => {
      const button = document.querySelector('button:contains("Start Voice Chat")') ||
                    document.querySelector('button[class*="voice"]') ||
                    document.querySelector('#start-call-button');
      if (button) {
        const styles = window.getComputedStyle(button);
        return {
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
          height: styles.height,
          width: styles.width,
          position: styles.position,
          zIndex: styles.zIndex
        };
      }
      return 'Button not found';
    });
    console.log('   Start button styles:', buttonStyles);

    // 3. Check for transcript and status elements
    console.log('\n3. Status and Transcript Elements:');
    
    const statusElement = await page.$('.call-status') || await page.$('#call-status') || await page.$('[class*="status"]');
    if (statusElement) {
      const statusText = await statusElement.textContent();
      const statusStyles = await page.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          height: styles.height,
          visibility: styles.visibility
        };
      }, statusElement);
      console.log(`   Status element found: "${statusText}"`);
      console.log('   Status styles:', statusStyles);
    } else {
      console.log('   ⚠️ No status element found');
    }

    const transcriptElement = await page.$('.transcript') || await page.$('#transcript') || await page.$('[class*="transcript"]');
    if (transcriptElement) {
      const transcriptStyles = await page.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          height: styles.height,
          visibility: styles.visibility,
          overflow: styles.overflow
        };
      }, transcriptElement);
      console.log('   Transcript element found');
      console.log('   Transcript styles:', transcriptStyles);
    } else {
      console.log('   ⚠️ No transcript element found');
    }

    // 4. Test button interaction and monitor changes
    console.log('\n4. Button Interaction Test:');
    const startButton = await page.$('button:has-text("Start Voice Chat")');
    
    if (startButton) {
      console.log('   Clicking Start Voice Chat button...');
      await startButton.click();
      
      // Monitor for DOM changes over time
      for (let i = 0; i < 10; i++) {
        await page.waitForTimeout(1000);
        
        // Check current button state
        const currentButtonText = await page.evaluate(() => {
          const btn = document.querySelector('button:contains("Start Voice Chat")') ||
                     document.querySelector('button[class*="voice"]') ||
                     document.querySelector('#start-call-button');
          return btn ? btn.textContent.trim() : 'Button not found';
        });
        
        // Check for status updates
        const currentStatus = await page.evaluate(() => {
          const status = document.querySelector('.call-status') || 
                        document.querySelector('#call-status') || 
                        document.querySelector('[class*="status"]');
          return status ? status.textContent.trim() : 'No status';
        });
        
        // Check for new elements that might have appeared
        const endButton = await page.$('button:has-text("End Call")') || await page.$('#end-call-button');
        const hasEndButton = endButton !== null;
        
        console.log(`   ${i + 1}s: Button="${currentButtonText}", Status="${currentStatus}", EndButton=${hasEndButton}`);
        
        // If we see significant changes, break early
        if (currentButtonText.includes('End') || currentStatus.includes('Connected') || hasEndButton) {
          console.log('   ✅ Detected significant state change!');
          break;
        }
      }
    }

    // 5. Check for any Vapi-specific JavaScript errors or warnings
    console.log('\n5. Vapi Integration Check:');
    const vapiInfo = await page.evaluate(() => {
      // Check if Vapi is loaded
      const hasVapi = typeof window.Vapi !== 'undefined';
      const hasVapiInstance = window.vapiInstance !== undefined;
      
      // Check for any global Vapi-related variables
      const vapiVars = Object.keys(window).filter(key => 
        key.toLowerCase().includes('vapi') || 
        key.toLowerCase().includes('voice') ||
        key.toLowerCase().includes('call')
      );
      
      return {
        hasVapi,
        hasVapiInstance,
        vapiVars,
        userAgent: navigator.userAgent
      };
    });
    
    console.log('   Vapi SDK loaded:', vapiInfo.hasVapi);
    console.log('   Vapi instance exists:', vapiInfo.hasVapiInstance);
    console.log('   Vapi-related variables:', vapiInfo.vapiVars);
    console.log('   User agent:', vapiInfo.userAgent.slice(0, 100));

    // 6. Final screenshot with annotations
    await page.screenshot({ path: 'detailed-analysis.png', fullPage: true });
    console.log('\n📸 Detailed analysis screenshot saved: detailed-analysis.png');

  } catch (error) {
    console.log(`\n❌ Detailed test failed: ${error.message}`);
    await page.screenshot({ path: 'detailed-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

detailedVapiTest().catch(console.error);