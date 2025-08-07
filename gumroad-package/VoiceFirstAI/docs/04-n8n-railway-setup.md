# n8n Railway Deployment Guide

## One-Click Deploy

Deploy n8n on Railway in seconds:

**🚀 [Deploy n8n Now](https://railway.com/deploy/n8n-with-workers)**

## What Railway Sets Up For You

When you click the deploy button, Railway automatically:
- ✅ Creates an n8n instance with workers
- ✅ Sets up PostgreSQL database
- ✅ Configures Redis for queue management
- ✅ Generates all required environment variables
- ✅ Provides a public URL for your n8n instance
- ✅ Handles SSL certificates automatically

## After Deployment

1. **Access your n8n dashboard**
   - Railway will show your app URL (e.g., `https://your-app.up.railway.app`)
   - Click the URL to open n8n

2. **Set up your n8n account**
   - Create your admin email and password
   - Save these credentials securely

3. **Import the VoiceFirst workflow**
   - Go to Workflows → Import from File
   - Upload `/workflows/basic-email-followup.json`
   - The workflow will appear in your dashboard

4. **Configure Gmail SMTP**
   - In n8n, go to Credentials → New
   - Choose "Email (SMTP)"
   - Enter your Gmail details:
     - SMTP Host: `smtp.gmail.com`
     - SMTP Port: `587`
     - Email: Your Gmail address
     - Password: Your Gmail App Password (not regular password)
   - [How to create Gmail App Password](https://support.google.com/accounts/answer/185833)

5. **Get your webhook URL**
   - Open the imported workflow
   - Click on the Webhook node
   - Copy the "Production URL"
   - It will look like: `https://your-n8n.up.railway.app/webhook/consultation`

6. **Update your website**
   - Add to your `.env.local`:
   ```
   N8N_WEBHOOK_URL=https://your-n8n.up.railway.app/webhook/consultation
   ```
   - Redeploy your website

## Testing Your Setup

1. Activate the workflow in n8n (toggle the Active switch)
2. Go to your website and have a test conversation
3. Fill out the form
4. Check n8n's execution history
5. Verify email was sent

## Railway Pricing

- **Free tier**: $5 credit/month (usually enough for testing)
- **Hobby tier**: $5/month (includes $5 usage)
- **Pro tier**: $20/month (for production use)

For most users, the Hobby tier is perfect for running n8n with moderate usage.

## Troubleshooting

### Webhook not receiving data
- Ensure workflow is activated (not just saved)
- Check the webhook URL matches exactly
- Verify no typos in environment variable

### Emails not sending
- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail
- Try with port 465 if 587 doesn't work

### Railway app sleeping
- Free tier apps sleep after inactivity
- Upgrade to Hobby tier to prevent sleeping
- Or ping your webhook every 30 minutes

## Alternative: Self-Hosted n8n

If you prefer to self-host:
1. Use Docker: `docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n`
2. Use npm: `npx n8n`
3. Follow n8n's self-hosting guide

But Railway is recommended for simplicity!