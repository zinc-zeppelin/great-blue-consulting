// Script to fetch Vapi assistant configuration
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const VAPI_API_KEY = envVars.VAPI_API_KEY;
const ASSISTANT_ID = envVars.VAPI_ASSISTANT_ID;

if (!VAPI_API_KEY || !ASSISTANT_ID) {
  console.error('Missing VAPI_API_KEY or VAPI_ASSISTANT_ID in .env.local');
  process.exit(1);
}

async function getAssistantConfig() {
  try {
    console.log('Fetching Vapi assistant configuration...');
    console.log('Assistant ID:', ASSISTANT_ID);
    console.log('');

    const response = await fetch(`https://api.vapi.ai/assistant/${ASSISTANT_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch assistant: ${response.status} ${response.statusText}`);
    }

    const config = await response.json();
    
    // Display configuration in organized sections
    console.log('=== ASSISTANT CONFIGURATION ===\n');
    
    console.log('Basic Information:');
    console.log('- Name:', config.name || 'Unnamed');
    console.log('- ID:', config.id);
    console.log('- Created:', config.createdAt);
    console.log('- Updated:', config.updatedAt);
    console.log('');

    if (config.model) {
      console.log('Model Configuration:');
      console.log('- Provider:', config.model.provider);
      console.log('- Model:', config.model.model);
      if (config.model.systemPrompt) {
        console.log('\nSystem Prompt:');
        console.log('---');
        console.log(config.model.systemPrompt);
        console.log('---');
      }
      if (config.model.tools && config.model.tools.length > 0) {
        console.log('\nEnabled Tools:');
        config.model.tools.forEach(tool => {
          console.log(`- ${tool.type || tool.name}`);
        });
      }
      console.log('');
    }

    if (config.voice) {
      console.log('Voice Configuration:');
      console.log('- Provider:', config.voice.provider);
      console.log('- Voice ID:', config.voice.voiceId);
      console.log('');
    }

    if (config.firstMessage) {
      console.log('First Message:');
      console.log(config.firstMessage);
      console.log('');
    }

    if (config.endCallMessage) {
      console.log('End Call Message:');
      console.log(config.endCallMessage);
      console.log('');
    }

    if (config.maxDurationSeconds) {
      console.log('Max Duration:', config.maxDurationSeconds, 'seconds');
      console.log('');
    }

    // Save full configuration to file
    const outputPath = path.join(__dirname, '..', 'docs', 'vapi-assistant-config.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(config, null, 2));
    console.log(`\nFull configuration saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error fetching assistant configuration:', error.message);
  }
}

// Run the script
getAssistantConfig();