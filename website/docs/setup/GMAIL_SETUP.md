# Gmail Setup for n8n Email Automation (FREE!)

## Quick Setup Guide

### Step 1: Prepare Your Gmail Account

1. **Enable 2-Factor Authentication** (Required)
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup wizard

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as device and name it "n8n"
   - Copy the 16-character password (you'll need this!)

### Step 2: Configure Gmail in n8n

1. **Access Your n8n Instance**
   - Go to: https://n8n-railway-production-f3d61.up.railway.app
   - Log in with your admin credentials

2. **Import the Workflow**
   - Click "Workflows" → "Import from File"
   - Upload `workflows/n8n-consultation-workflow.json`

3. **Set Up Gmail Credentials**
   - Click on the "Gmail - Send Email" node
   - Click "Create New" under credentials
   - Choose "OAuth2" authentication
   - Click "Sign in with Google"
   - Select your Gmail account
   - Grant permissions to n8n

4. **Update From Email**
   - In the Gmail node, change `YOUR_GMAIL_ADDRESS@gmail.com` to your actual Gmail
   - This will be the "from" address for emails

### Step 3: Configure OpenAI

1. **Click on "OpenAI - Analyze Conversation" node**
2. **Create new credentials**
3. **Add your API key** (already in .env.local)
4. **Test the connection**

### Step 4: Activate & Test

1. **Activate the Workflow**
   - Toggle the workflow switch to "Active"
   - You'll see "Workflow activated"

2. **Test the Integration**
   - Go to your website
   - Have a voice conversation
   - Fill out the form
   - Check your email!

## Alternative: Gmail SMTP Setup

If OAuth2 doesn't work, use SMTP:

1. In n8n, use "Email Send" node instead of Gmail
2. Configure SMTP:
   - **Host**: smtp.gmail.com
   - **Port**: 587
   - **User**: your-email@gmail.com
   - **Password**: Your 16-character app password
   - **SSL/TLS**: Enable "Start TLS"

## Troubleshooting

### "Less secure app access" Error
- Use App Password (not your regular password)
- Make sure 2FA is enabled

### Emails Going to Spam
- Add SPF record to your domain
- Use consistent "from" name
- Avoid spam trigger words

### Gmail Limits
- Free: 500 emails/day
- More than enough for consultations!

### Test Email Not Received
1. Check spam folder
2. Verify workflow is active
3. Check n8n execution logs
4. Ensure webhook URL matches in netlify.toml

## Your Specific URLs

- **n8n Dashboard**: https://primary-production-d8cb.up.railway.app
- **Webhook URL**: https://primary-production-d8cb.up.railway.app/webhook/consultation
- **Test locally**: `npm run dev` then visit http://localhost:3001

## Next Steps

1. ✅ Gmail configured
2. ✅ Workflow activated
3. 🎯 Test with real conversation
4. 📊 Optional: Set up Google Sheets tracking

## Cost: $0.00 🎉

- Gmail: FREE
- n8n on Railway: ~$5-10/month
- OpenAI: ~$0.02 per email
- Total: Under $10/month for unlimited consultations!