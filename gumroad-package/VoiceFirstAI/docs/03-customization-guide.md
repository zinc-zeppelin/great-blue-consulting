# Customization Guide

Make VoiceFirst AI uniquely yours.

## Website Customization

### 1. Branding & Colors

**Update your color scheme** in `/app/globals.css`:

```css
:root {
  /* Primary brand colors */
  --primary-color: #3b82f6;    /* Blue */
  --secondary-color: #10b981;  /* Green */
  --accent-color: #f59e0b;     /* Orange */
  
  /* Text colors */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  
  /* Background colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
}
```

**Popular color combinations:**
- Tech/SaaS: Blue (#3b82f6) + Purple (#8b5cf6)
- E-commerce: Green (#10b981) + Gold (#f59e0b)
- Agency: Black (#000000) + Red (#ef4444)
- Wellness: Teal (#14b8a6) + Pink (#ec4899)

### 2. Logo & Favicon

1. **Replace logo**: Add your logo as `/public/logo.png`
2. **Update favicon**: Replace `/public/favicon.png`
3. **Update references** in `/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Company - AI-Powered Solutions",
  description: "Your compelling description",
  icons: {
    icon: '/favicon.png',
  },
};
```

### 3. Hero Section Text

Edit `/app/components/VoiceChat.tsx`:

```tsx
// Update headline
<h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
  <span className="block">Your Custom</span>
  <span className="block bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 bg-clip-text text-transparent">
    Headline Here
  </span>
</h1>

// Update subheadline
<p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
  Your compelling subheadline that speaks to your audience
</p>

// Update CTA button
<span>Your CTA Text</span>
```

### 4. Section Customization

**How It Works** (`/app/components/HowItWorks.tsx`):
- Edit the 3 steps to match your process
- Change icons using Heroicons.com
- Adjust descriptions for your audience

**AI Capabilities** (`/app/components/AICapabilities.tsx`):
- Update capability cards
- Add industry-specific examples
- Include relevant metrics

**FAQ** (`/app/components/FAQ.tsx`):
- Address your audience's specific concerns
- Include pricing questions if relevant
- Add technical questions for developers

### 5. Form Fields

Customize the lead capture form in `/app/components/VapiChatSDKSimple.tsx`:

```tsx
// Add custom fields
<div>
  <label>Company Size</label>
  <select>
    <option>1-10 employees</option>
    <option>11-50 employees</option>
    <option>50+ employees</option>
  </select>
</div>

// Make fields optional
<input type="email" required={false} />
```

## Voice Assistant Customization

### 1. Industry-Specific Scripts

Create variations for different use cases:

**For Agencies:**
```
"I help agencies streamline their operations and boost profitability. What type of services does your agency offer?"
```

**For SaaS:**
```
"I specialize in helping SaaS companies reduce churn and accelerate growth. What's your current MRR?"
```

**For Coaches:**
```
"I help coaches scale their impact without burning out. What kind of transformation do you help people achieve?"
```

### 2. Question Customization

Adapt the discovery questions in your Vapi assistant:

**Technical Audience:**
- "What's your current tech stack?"
- "Are you using any APIs or webhooks?"
- "What's your deployment process?"

**Non-Technical Audience:**
- "What tools do you use every day?"
- "What takes up most of your time?"
- "Where do things usually get stuck?"

### 3. Personality Adjustments

**Professional/Corporate:**
```json
{
  "temperature": 0.3,
  "voice": "Mark",
  "tone": "Professional, data-driven, executive-focused"
}
```

**Friendly/Casual:**
```json
{
  "temperature": 0.7,
  "voice": "Sarah",
  "tone": "Warm, encouraging, conversational"
}
```

## Email Customization

### 1. Template Variables

Available variables in email templates:
- `{{name}}` - Contact's name
- `{{email}}` - Contact's email
- `{{company}}` - Company name
- `{{conversation}}` - Full transcript
- `{{insights}}` - AI-generated insights

### 2. Email Styling

Create branded email templates:

```html
<style>
  .email-container {
    font-family: 'Your-Font', Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .header {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
    padding: 40px;
    text-align: center;
  }
  
  .cta-button {
    background-color: #your-brand-color;
    color: white;
    padding: 15px 30px;
    text-decoration: none;
    border-radius: 5px;
    display: inline-block;
    margin: 20px 0;
  }
</style>
```

### 3. Follow-up Sequences

Customize your nurture sequence:

**Day 1**: Immediate value + soft CTA
**Day 3**: Address common objection
**Day 7**: Share relevant case study
**Day 14**: Final value-add + clear CTA
**Day 30**: Re-engagement campaign

## Advanced Customizations

### 1. Multi-Language Support

```javascript
// In VoiceChat.tsx
const translations = {
  en: {
    startButton: "Start Talking",
    listening: "Listening...",
    speaking: "Speaking..."
  },
  es: {
    startButton: "Comenzar a Hablar",
    listening: "Escuchando...",
    speaking: "Hablando..."
  }
};
```

### 2. A/B Testing

Test different versions:

```javascript
// Simple A/B test
const variant = Math.random() > 0.5 ? 'A' : 'B';

const headlines = {
  A: "Your AI Business Consultant",
  B: "Get AI Solutions in 5 Minutes"
};
```

### 3. Analytics Integration

Add tracking for:
- Conversation starts
- Conversation completions
- Form submissions
- Email opens
- Calendar bookings

```javascript
// Google Analytics example
gtag('event', 'conversation_start', {
  'event_category': 'engagement',
  'event_label': 'voice_chat'
});
```

### 4. CRM Integration

Send leads directly to your CRM:

```javascript
// HubSpot example
const createHubSpotContact = async (formData) => {
  await fetch('https://api.hubapi.com/contacts/v1/contact', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: [
        { property: 'email', value: formData.email },
        { property: 'firstname', value: formData.name },
        { property: 'company', value: formData.company }
      ]
    })
  });
};
```

## Testing Your Customizations

### 1. Device Testing
- Desktop (Chrome, Safari, Firefox)
- Mobile (iOS Safari, Chrome)
- Tablet (iPad, Android)

### 2. Conversation Testing
- Different personas
- Various objections
- Technical questions
- Time constraints

### 3. Conversion Testing
- Form completion rates
- Email open rates
- Calendar booking rates
- Overall conversion funnel

## Deployment Considerations

### 1. Environment Variables
Never commit sensitive data. Use environment variables for:
- API keys
- Webhook URLs
- Email credentials
- Analytics IDs

### 2. Performance Optimization
- Optimize images (use WebP)
- Minimize JavaScript
- Enable caching
- Use CDN for assets

### 3. SEO Optimization
- Update meta tags
- Add structured data
- Create sitemap
- Optimize for Core Web Vitals

---

Need help customizing? Join our community or check out our advanced customization videos.