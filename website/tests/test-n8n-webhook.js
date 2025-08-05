// Test script for n8n webhook
const webhookUrl = 'https://primary-production-d8cb.up.railway.app/webhook/consultation';

const testData = {
  sessionId: `test-${Date.now()}`,
  formData: {
    name: "Test User",
    email: "test@example.com",
    company: "Test Company"
  },
  conversation: [
    {
      role: "assistant",
      text: "Hey there! I'm your AI business consultant. What kind of business are you running?"
    },
    {
      role: "user", 
      text: "I run a small e-commerce store selling handmade crafts."
    },
    {
      role: "assistant",
      text: "That's wonderful! E-commerce has so many opportunities for AI automation. How many orders do you typically process per day?"
    },
    {
      role: "user",
      text: "About 20-30 orders daily, but it's growing fast and becoming hard to manage."
    }
  ],
  timestamp: new Date().toISOString()
};

console.log('Testing n8n webhook at:', webhookUrl);
console.log('Sending test data...\n');

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-From': 'GreatBlue-Test'
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Response status:', response.status);
  return response.text();
})
.then(data => {
  console.log('Response:', data);
  console.log('\n✅ Webhook test complete!');
  console.log('Check your n8n workflow executions to see if it was received.');
})
.catch(error => {
  console.error('❌ Error:', error);
  console.log('\nTroubleshooting:');
  console.log('1. Make sure n8n workflow is activated');
  console.log('2. Check if the webhook URL is correct');
  console.log('3. Verify n8n is running on Railway');
});