# Vapi Configuration Guide

Master your AI assistant settings for maximum conversions.

## Understanding Vapi Settings

### Core Components

1. **Model Configuration**
   - Provider: OpenAI (recommended)
   - Model: GPT-4o (best for natural conversation)
   - Temperature: 0.5 (balanced creativity)

2. **Voice Selection**
   - Provider: Vapi, ElevenLabs, or OpenAI
   - Recommended voices:
     - Harry (Professional, male)
     - Sarah (Friendly, female)
     - Mark (Confident, male)
     - Sally (Warm, female)

3. **Transcriber Settings**
   - Provider: Deepgram (most accurate)
   - Model: nova-3
   - Language: en
   - Endpointing: 150ms (optimal for conversation flow)

## System Prompt Best Practices

### Structure Your Prompt:

```
1. Role Definition
"You are a [specific type] consultant who helps [target audience] achieve [outcome]."

2. Goals (numbered list)
- Qualify the lead
- Discover pain points
- Identify opportunities
- Build excitement
- Capture next steps

3. Persona & Tone
Define how the AI should sound and behave.

4. Discovery Questions
List 8-10 questions in order of importance.

5. Behavioral Rules
- Always end with a question
- Keep responses brief
- Stay on topic

6. Wrap-up Instructions
How to end the conversation gracefully.
```

### Industry-Specific Prompts

Each template in `/templates/vapi-assistants/` contains optimized prompts for:
- SaaS companies
- E-commerce stores
- Agencies
- Coaches/Consultants
- Local businesses

## Advanced Settings

### 1. End Call Configuration
```json
{
  "endCallFunctionEnabled": true,
  "endCallMessage": "Custom goodbye message",
  "endCallPhrases": ["goodbye", "bye", "see you later"],
  "maxDurationSeconds": 1800
}
```

### 2. Background Noise Handling
```json
{
  "backgroundDenoisingEnabled": true
}
```

### 3. Smart Endpointing
```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.4,
    "smartEndpointingEnabled": "livekit"
  }
}
```

## Conversation Flow Optimization

### Opening Message
Make it warm and permission-based:
- ❌ "Hi, let me tell you about our services..."
- ✅ "Hey! Thanks for taking time to explore how AI could help your business. Mind if I ask you a few questions?"

### Question Progression
1. Start broad (business overview)
2. Get specific (tools, processes)
3. Identify pain points
4. Explore impact
5. Gauge readiness
6. Clarify next steps

### Time Management
- Set max duration to 25-30 minutes
- Build in time checks at 20 minutes
- Have shortened path for quick conversations

## Testing Your Assistant

### Test Scenarios:
1. **Happy Path**: Engaged prospect who answers all questions
2. **Skeptical**: Someone who challenges the AI
3. **Rushed**: "I only have 5 minutes"
4. **Technical**: Deep dive into specific tools
5. **Confused**: Doesn't understand AI benefits

### What to Listen For:
- Natural conversation flow
- Appropriate question timing
- Smooth topic transitions
- Graceful conversation ending

## Performance Optimization

### Response Time:
- Use streaming responses
- Keep system prompt under 2000 tokens
- Minimize complex instructions

### Conversation Quality:
- Test different temperatures (0.3-0.7)
- Adjust endpointing for your audience
- Enable smart interruption handling

## Common Adjustments

### For B2B Sales:
- More formal tone
- Focus on ROI and metrics
- Longer discovery process
- Multiple stakeholder questions

### For B2C/Coaches:
- Warmer, more personal tone
- Focus on transformation
- Shorter conversations
- Emotional connection

### For Technical Audiences:
- More specific terminology
- Deeper technical questions
- Focus on implementation
- Integration discussions

## Monitoring & Iteration

### Track These Metrics:
1. Average conversation duration
2. Completion rate (% who fill form)
3. Question completion rate
4. Drop-off points

### Weekly Optimization:
1. Review conversation transcripts
2. Identify common objections
3. Update system prompt
4. Test new question order

## Advanced Features

### Dynamic Variables
Pass user data into conversations:
```javascript
vapi.start(assistantId, {
  variables: {
    userName: "John",
    companyName: "Acme Corp"
  }
});
```

### Custom Functions
Add functionality like:
- Calendar booking during call
- Live data lookups
- CRM integration
- Custom calculations

### Multi-language Support
Configure for global audiences:
```json
{
  "transcriber": {
    "language": "es", // Spanish
    "model": "nova-2-general"
  }
}
```

## Troubleshooting Common Issues

### "AI talks too much"
- Shorten system prompt
- Add "be concise" instructions
- Reduce temperature

### "Conversations end abruptly"
- Check endCallPhrases
- Extend maxDuration
- Review system prompt ending

### "AI goes off-topic"
- Add stricter behavioral rules
- Reduce temperature
- Simplify prompt structure

---

For more advanced configurations, check our video tutorials or join our community discussions.