# Quick Start Guide - VoiceFirst AI

Get your voice AI lead generation system live in 30 minutes!

## Prerequisites

Before starting, ensure you have:
- [ ] A GitHub account (free)
- [ ] A Vercel or Netlify account (free)
- [ ] A Vapi account (sign up at vapi.ai)
- [ ] An n8n account (or Zapier/Make as alternatives)
- [ ] A domain name (optional but recommended)

## Step 1: Deploy the Website (5 minutes)

### Option A: Deploy to Vercel (Recommended)
1. Click the "Deploy to Vercel" button in the `/website` folder
2. Connect your GitHub account
3. Name your project (e.g., "my-ai-consultant")
4. Click "Deploy"
5. Your site will be live at `your-project.vercel.app`

### Option B: Deploy to Netlify
1. Drag the entire `/website` folder to Netlify's deployment area
2. Your site will be live at `your-site.netlify.app`

## Step 2: Set Up Your Vapi Assistant (10 minutes)

1. **Log into Vapi** at dashboard.vapi.ai
2. **Create New Assistant**:
   - Click "Create Assistant"
   - Name it (e.g., "Business Consultant")
3. **Import Configuration**:
   - Open `/templates/vapi-assistants/base-consultant.json`
   - Copy all the settings into your assistant
4. **Get Your Credentials**:
   - Copy your Public Key
   - Copy your Assistant ID
5. **Voice Selection** (optional):
   - Test different voices in Vapi dashboard
   - We recommend Harry, Mark, or Sarah

## Step 3: Configure Environment Variables (5 minutes)

1. **In your website folder**, create `.env.local`:
```
VAPI_PUBLIC_KEY=your_public_key_here
VAPI_ASSISTANT_ID=your_assistant_id_here
```

2. **In Vercel/Netlify**, add these same environment variables:
   - Go to Settings → Environment Variables
   - Add both keys with their values

## Step 4: Set Up Email Automation (10 minutes)

### Using n8n (Recommended):
1. **Deploy n8n** with one click:
   - Go to https://railway.com/deploy/n8n-with-workers
   - Click "Deploy Now"
   - Railway will automatically set up n8n with PostgreSQL & Redis
2. **Import Workflow**:
   - Open your n8n dashboard (Railway will provide the URL)
   - Go to Workflows → Import
   - Import `/workflows/basic-email-followup.json`
3. **Configure Email**:
   - Add your Gmail/SMTP credentials in n8n
   - Copy the webhook URL from n8n
   - Update the webhook URL in your site's `.env.local`

### Using Zapier (Alternative):
1. Create new Zap with Webhook trigger
2. Add OpenAI action for email generation
3. Add Gmail/Email action to send
4. Copy webhook URL to your site

## Step 5: Test Your System (5 minutes)

1. **Visit your deployed site**
2. **Click "Start Talking"**
3. **Have a brief conversation** (say "goodbye" to end)
4. **Fill out the form**
5. **Check your email** for the AI-generated insights

## Step 6: Customize (Optional)

### Change Branding:
- Update colors in `/app/globals.css`
- Replace logo in `/public`
- Edit text in `/app/components/VoiceChat.tsx`

### Modify AI Behavior:
- Edit system prompt in Vapi dashboard
- Adjust conversation flow
- Change time limits or voice

## Troubleshooting

### Voice chat won't start:
- Check browser permissions for microphone
- Verify Vapi credentials are correct
- Check browser console for errors

### No email received:
- Verify webhook URL is correct
- Check n8n/Zapier logs
- Ensure email automation is active

### Conversation ends abruptly:
- Check max duration in Vapi settings
- Ensure endCall function is configured properly

## Next Steps

1. **Read the customization guide** for advanced modifications
2. **Set up analytics** to track conversions
3. **Create industry-specific versions** using our templates
4. **Join our community** for tips and support

---

Need help? Email support@greatblueconsulting.com or check our video tutorials.