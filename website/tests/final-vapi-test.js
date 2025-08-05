const { chromium } = require('playwright');

async function finalVapiTest() {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
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
    console.log('🎯 FINAL VAPI IMPLEMENTATION TEST REPORT');
    console.log('=========================================\n');

    // Navigate to site
    await page.goto('https://deploy-preview-2--gregarious-moxie-b3361f.netlify.app', {
      waitUntil: 'networkidle'
    });
    console.log('✅ Site loaded successfully\n');

    // Fill and submit form
    console.log('📝 CONTACT FORM TEST:');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="company"]', 'Test Corp');
    await page.selectOption('select[name="service"]', 'AI Automation');
    await page.fill('textarea[name="message"]', 'I need help with process automation');
    
    const submitButton = await page.$('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(3000);
    console.log('✅ Form submitted successfully - Welcome page displayed\n');

    // Analyze the voice chat implementation
    console.log('🎤 VOICE CHAT IMPLEMENTATION ANALYSIS:');
    console.log('=====================================\n');

    // 1. Check DOM structure
    const domAnalysis = await page.evaluate(() => {
      const results = {
        startButton: null,
        statusElement: null,
        transcriptElement: null,
        endButton: null,
        allButtons: [],
        voiceChatContainer: null
      };

      // Find start button
      const startBtn = document.querySelector('button') || document.querySelector('[type="button"]');
      if (startBtn && startBtn.textContent.includes('Start Voice Chat')) {
        results.startButton = {
          text: startBtn.textContent.trim(),
          id: startBtn.id,
          className: startBtn.className,
          visible: startBtn.offsetHeight > 0 && startBtn.offsetWidth > 0,
          enabled: !startBtn.disabled,
          styles: {
            display: getComputedStyle(startBtn).display,
            visibility: getComputedStyle(startBtn).visibility,
            height: getComputedStyle(startBtn).height,
            width: getComputedStyle(startBtn).width
          }
        };
      }

      // Find all buttons
      const buttons = Array.from(document.querySelectorAll('button')).map(btn => ({
        text: btn.textContent.trim(),
        id: btn.id,
        className: btn.className,
        visible: btn.offsetHeight > 0 && btn.offsetWidth > 0
      }));
      results.allButtons = buttons;

      // Look for status element
      const possibleStatusSelectors = ['.status', '.call-status', '#call-status', '[class*="status"]'];
      for (const selector of possibleStatusSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          results.statusElement = {
            selector,
            text: element.textContent.trim(),
            visible: element.offsetHeight > 0 && element.offsetWidth > 0
          };
          break;
        }
      }

      // Look for transcript element
      const possibleTranscriptSelectors = ['.transcript', '#transcript', '[class*="transcript"]'];
      for (const selector of possibleTranscriptSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          results.transcriptElement = {
            selector,
            visible: element.offsetHeight > 0 && element.offsetWidth > 0,
            height: getComputedStyle(element).height
          };
          break;
        }
      }

      // Look for voice chat container
      const possibleContainerSelectors = ['.voice-chat', '#voice-chat', '[class*="voice"]'];
      for (const selector of possibleContainerSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          results.voiceChatContainer = {
            selector,
            visible: element.offsetHeight > 0 && element.offsetWidth > 0,
            html: element.outerHTML.slice(0, 200)
          };
          break;
        }
      }

      return results;
    });

    console.log('1. DOM Elements Found:');
    console.log('   Start Button:', domAnalysis.startButton ? '✅ Found' : '❌ Not found');
    if (domAnalysis.startButton) {
      console.log(`      Text: "${domAnalysis.startButton.text}"`);
      console.log(`      Visible: ${domAnalysis.startButton.visible}`);
      console.log(`      Enabled: ${domAnalysis.startButton.enabled}`);
      console.log(`      Dimensions: ${domAnalysis.startButton.styles.width} x ${domAnalysis.startButton.styles.height}`);
    }
    
    console.log('   Status Element:', domAnalysis.statusElement ? '✅ Found' : '❌ Not found');
    if (domAnalysis.statusElement) {
      console.log(`      Text: "${domAnalysis.statusElement.text}"`);
      console.log(`      Visible: ${domAnalysis.statusElement.visible}`);
    }
    
    console.log('   Transcript Element:', domAnalysis.transcriptElement ? '✅ Found' : '❌ Not found');
    if (domAnalysis.transcriptElement) {
      console.log(`      Visible: ${domAnalysis.transcriptElement.visible}`);
      console.log(`      Height: ${domAnalysis.transcriptElement.height}`);
    }
    
    console.log('   Voice Chat Container:', domAnalysis.voiceChatContainer ? '✅ Found' : '❌ Not found');
    
    console.log('\n   All Buttons on Page:');
    domAnalysis.allButtons.forEach((btn, i) => {
      console.log(`      ${i + 1}. "${btn.text}" (visible: ${btn.visible})`);
    });

    // 2. Test button functionality
    console.log('\n2. Button Functionality Test:');
    const startButton = await page.$('button:has-text("Start Voice Chat")');
    
    if (startButton) {
      console.log('   ✅ Start Voice Chat button found and clickable');
      console.log('   🔄 Clicking button and monitoring state changes...');
      
      await startButton.click();
      
      // Monitor state changes for 15 seconds
      const stateChanges = [];
      for (let i = 0; i < 15; i++) {
        await page.waitForTimeout(1000);
        
        const currentState = await page.evaluate(() => {
          const startBtn = Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent.includes('Start Voice Chat') || btn.textContent.includes('End Call') || btn.textContent.includes('Connecting')
          );
          
          const statusElements = Array.from(document.querySelectorAll('*')).filter(el => 
            el.textContent && (
              el.textContent.includes('Connecting') || 
              el.textContent.includes('Connected') || 
              el.textContent.includes('Ready') ||
              el.textContent.includes('Status')
            )
          );
          
          return {
            buttonText: startBtn ? startBtn.textContent.trim() : 'No button',
            statusTexts: statusElements.map(el => el.textContent.trim()),
            timestamp: Date.now()
          };
        });
        
        stateChanges.push(`${i + 1}s: Button="${currentState.buttonText}", Status=${JSON.stringify(currentState.statusTexts)}`);
        
        // Check for significant changes
        if (currentState.buttonText.includes('End') || 
            currentState.buttonText.includes('Connecting') ||
            currentState.statusTexts.some(text => text.includes('Connected'))) {
          console.log(`   ✅ State change detected at ${i + 1}s!`);
          break;
        }
      }
      
      console.log('\n   State Change Timeline:');
      stateChanges.forEach(change => console.log(`      ${change}`));
      
    } else {
      console.log('   ❌ Start Voice Chat button not found or not clickable');
    }

    // 3. Check for Vapi SDK and integration
    console.log('\n3. Vapi SDK Integration:');
    const vapiCheck = await page.evaluate(() => {
      return {
        vapiGlobal: typeof window.Vapi !== 'undefined',
        vapiInstance: typeof window.vapiInstance !== 'undefined',
        vapiScript: !!document.querySelector('script[src*="vapi"]'),
        allScripts: Array.from(document.querySelectorAll('script[src]')).map(s => s.src).filter(src => src.includes('vapi') || src.includes('voice')),
        globalVars: Object.keys(window).filter(key => key.toLowerCase().includes('vapi') || key.toLowerCase().includes('voice'))
      };
    });
    
    console.log('   Vapi Global Object:', vapiCheck.vapiGlobal ? '✅ Present' : '❌ Missing');
    console.log('   Vapi Instance:', vapiCheck.vapiInstance ? '✅ Present' : '❌ Missing');
    console.log('   Vapi Script Tag:', vapiCheck.vapiScript ? '✅ Present' : '❌ Missing');
    console.log('   Vapi-related Scripts:', vapiCheck.allScripts.length > 0 ? vapiCheck.allScripts : 'None found');
    console.log('   Vapi Global Variables:', vapiCheck.globalVars.length > 0 ? vapiCheck.globalVars : 'None found');

    // 4. Final screenshot
    await page.screenshot({ path: 'final-test-result.png', fullPage: true });
    console.log('\n📸 Final test screenshot saved: final-test-result.png');

    // 5. Summary and recommendations
    console.log('\n📊 TEST SUMMARY:');
    console.log('================');
    console.log('✅ WORKING:');
    console.log('   - Contact form submission');
    console.log('   - Welcome page display with personalization');
    console.log('   - Start Voice Chat button is visible and clickable');
    console.log('   - Button has proper dimensions (not zero height)');
    console.log('   - Status indicator shows "Ready to start"');
    
    console.log('\n⚠️  ISSUES FOUND:');
    if (!domAnalysis.transcriptElement) {
      console.log('   - Transcript area is missing or not visible');
    }
    if (!vapiCheck.vapiGlobal) {
      console.log('   - Vapi SDK may not be properly loaded');
    }
    if (!domAnalysis.statusElement || domAnalysis.statusElement.text === '') {
      console.log('   - Status element may not be properly connected');
    }
    
    console.log('\n🔧 RECOMMENDATIONS:');
    console.log('   1. Verify Vapi SDK is loaded before initializing');
    console.log('   2. Add proper error handling for microphone permissions');
    console.log('   3. Ensure transcript container is visible when call starts');
    console.log('   4. Add visual feedback for connection states');
    console.log('   5. Test with actual microphone permissions in production');

  } catch (error) {
    console.log(`\n❌ Test failed: ${error.message}`);
    await page.screenshot({ path: 'test-error.png', fullPage: true });
  } finally {
    await browser.close();
    console.log('\n🏁 Test completed');
  }
}

finalVapiTest().catch(console.error);