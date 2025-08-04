const { chromium } = require('playwright');

async function testVapiImplementation() {
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
    console.log('🚀 Starting Vapi implementation test...\n');

    // 1. Navigate to the site
    console.log('1. Navigating to the deployed site...');
    await page.goto('https://deploy-preview-2--gregarious-moxie-b3361f.netlify.app', {
      waitUntil: 'networkidle'
    });
    console.log('✅ Site loaded successfully\n');

    // Take screenshot of initial state
    await page.screenshot({ path: 'initial-state.png', fullPage: true });

    // 2. Fill out the contact form
    console.log('2. Testing contact form...');
    
    // Wait for form elements to be visible
    await page.waitForSelector('input[name="name"]', { timeout: 10000 });
    
    // Fill form fields
    await page.fill('input[name="name"]', 'John Doe');
    console.log('   - Name field filled');
    
    await page.fill('input[name="email"]', 'john@example.com');
    console.log('   - Email field filled');
    
    await page.fill('input[name="company"]', 'Test Corp');
    console.log('   - Company field filled');
    
    // Select service (assuming it's a select dropdown)
    const serviceSelect = await page.$('select[name="service"]');
    if (serviceSelect) {
      await page.selectOption('select[name="service"]', 'AI Automation');
      console.log('   - Service selected');
    } else {
      // Try radio buttons or other input types
      const serviceRadio = await page.$('input[value="AI Automation"]');
      if (serviceRadio) {
        await page.click('input[value="AI Automation"]');
        console.log('   - Service radio button selected');
      } else {
        console.log('   - ⚠️ Service field not found or different format');
      }
    }
    
    await page.fill('textarea[name="message"]', 'I need help with process automation');
    console.log('   - Message field filled');

    // Take screenshot before submitting
    await page.screenshot({ path: 'form-filled.png', fullPage: true });

    // 3. Submit the form
    console.log('\n3. Submitting the form...');
    
    // Look for submit button
    const submitButton = await page.$('button[type="submit"]') || await page.$('input[type="submit"]') || await page.$('button:has-text("Submit")');
    
    if (submitButton) {
      await submitButton.click();
      console.log('   - Form submitted');
      
      // Wait a moment for any response
      await page.waitForTimeout(3000);
      
      // Check for success message or redirect
      const successMessage = await page.$('.success-message') || await page.$('.thank-you') || await page.$('[class*="success"]');
      if (successMessage) {
        const successText = await successMessage.textContent();
        console.log(`   - ✅ Success message found: ${successText}`);
      } else {
        console.log('   - ⚠️ No obvious success message found');
      }
    } else {
      console.log('   - ❌ Submit button not found');
    }

    // Take screenshot after submission
    await page.screenshot({ path: 'form-submitted.png', fullPage: true });

    // 4. Test Vapi voice chat
    console.log('\n4. Testing Vapi voice chat...');
    
    // Wait for voice chat elements to appear
    await page.waitForTimeout(2000);
    
    // Look for voice chat container
    const voiceChatContainer = await page.$('#voice-chat') || await page.$('.voice-chat') || await page.$('[class*="voice"]');
    
    if (voiceChatContainer) {
      console.log('   - ✅ Voice chat container found');
      
      // Check container dimensions
      const boundingBox = await voiceChatContainer.boundingBox();
      console.log(`   - Container dimensions: ${boundingBox?.width}x${boundingBox?.height}`);
      
      if (boundingBox?.height === 0) {
        console.log('   - ❌ Container has zero height!');
      }
    } else {
      console.log('   - ❌ Voice chat container not found');
    }

    // Look for Start Voice Chat button
    const startButton = await page.$('button:has-text("Start Voice Chat")') || 
                       await page.$('button[id*="start"]') || 
                       await page.$('button[class*="start"]') ||
                       await page.$('#start-call-button');
    
    if (startButton) {
      console.log('   - ✅ Start Voice Chat button found');
      
      // Check if button is visible
      const isVisible = await startButton.isVisible();
      console.log(`   - Button visible: ${isVisible}`);
      
      // Check button dimensions
      const buttonBox = await startButton.boundingBox();
      console.log(`   - Button dimensions: ${buttonBox?.width}x${buttonBox?.height}`);
      
      if (buttonBox?.height === 0) {
        console.log('   - ❌ Button has zero height!');
      }
      
      // Check if button is enabled
      const isEnabled = await startButton.isEnabled();
      console.log(`   - Button enabled: ${isEnabled}`);
      
      if (isVisible && isEnabled && buttonBox?.height > 0) {
        console.log('   - Clicking Start Voice Chat button...');
        await startButton.click();
        
        // Wait for status changes
        await page.waitForTimeout(2000);
        
        // Check for status indicators
        const statusElement = await page.$('.status') || await page.$('[class*="status"]') || await page.$('#call-status');
        if (statusElement) {
          const statusText = await statusElement.textContent();
          console.log(`   - Status: ${statusText}`);
          
          // Wait for "Connecting..." or "Connected" status
          await page.waitForTimeout(3000);
          const newStatusText = await statusElement.textContent();
          console.log(`   - Updated status: ${newStatusText}`);
        } else {
          console.log('   - ⚠️ No status element found');
        }
        
        // Check for transcript area
        const transcriptArea = await page.$('.transcript') || await page.$('[class*="transcript"]') || await page.$('#transcript');
        if (transcriptArea) {
          console.log('   - ✅ Transcript area found');
          const transcriptVisible = await transcriptArea.isVisible();
          console.log(`   - Transcript visible: ${transcriptVisible}`);
          
          const transcriptBox = await transcriptArea.boundingBox();
          console.log(`   - Transcript dimensions: ${transcriptBox?.width}x${transcriptBox?.height}`);
        } else {
          console.log('   - ⚠️ Transcript area not found');
        }
        
        // Wait a bit to see if call connects
        await page.waitForTimeout(5000);
        
        // Look for End Call button
        const endButton = await page.$('button:has-text("End Call")') || 
                         await page.$('button[id*="end"]') || 
                         await page.$('button[class*="end"]') ||
                         await page.$('#end-call-button');
        
        if (endButton) {
          console.log('   - ✅ End Call button found');
          
          const endButtonVisible = await endButton.isVisible();
          console.log(`   - End button visible: ${endButtonVisible}`);
          
          if (endButtonVisible) {
            console.log('   - Clicking End Call button...');
            await endButton.click();
            
            await page.waitForTimeout(2000);
            console.log('   - Call ended');
          }
        } else {
          console.log('   - ⚠️ End Call button not found');
        }
      }
    } else {
      console.log('   - ❌ Start Voice Chat button not found');
    }

    // Take final screenshot
    await page.screenshot({ path: 'final-state.png', fullPage: true });

    // 5. Check for any console errors or warnings
    console.log('\n5. Final checks...');
    
    // Get all elements with voice/vapi related classes or IDs
    const vapiElements = await page.$$eval('[class*="voice"], [class*="vapi"], [id*="voice"], [id*="vapi"]', 
      elements => elements.map(el => ({
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        textContent: el.textContent?.slice(0, 50),
        visible: el.offsetHeight > 0 && el.offsetWidth > 0
      }))
    );
    
    console.log('   - Vapi-related elements found:');
    vapiElements.forEach((el, i) => {
      console.log(`     ${i + 1}. ${el.tagName} - ID: ${el.id}, Class: ${el.className}, Visible: ${el.visible}`);
      if (el.textContent) {
        console.log(`        Text: ${el.textContent}...`);
      }
    });

    console.log('\n✅ Test completed successfully!');
    console.log('📸 Screenshots saved: initial-state.png, form-filled.png, form-submitted.png, final-state.png');

  } catch (error) {
    console.log(`\n❌ Test failed with error: ${error.message}`);
    await page.screenshot({ path: 'error-state.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

// Run the test
testVapiImplementation().catch(console.error);