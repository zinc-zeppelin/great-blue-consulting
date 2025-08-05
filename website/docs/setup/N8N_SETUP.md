# n8n Consultation Email Workflow Setup

## Quick Start

1. **Deploy n8n on Railway**
   - Go to https://railway.app/deploy/n8n
   - Click "Deploy n8n"
   - Wait for deployment (~3 minutes)
   - Click on the generated URL to access your n8n instance

2. **Initial n8n Setup**
   - Create your admin account
   - Save your login credentials securely

3. **Import the Workflow**
   - In n8n, click "Workflows" → "Import from File"
   - Upload `workflows/n8n-consultation-workflow.json`
   - The workflow will appear in your dashboard

4. **Configure Credentials**

   ### OpenAI API (for AI analysis)
   - Click on the "OpenAI - Analyze Conversation" node
   - Click "Create New" under credentials
   - Add your OpenAI API key
   - Test the connection

   ### Email Configuration (Choose one):
   
   #### Option A: Gmail
   - Click on "Send Email" node
   - Create new SMTP credentials:
     - Host: smtp.gmail.com
     - Port: 587
     - User: your-email@gmail.com
     - Password: [Generate app password](https://myaccount.google.com/apppasswords)
   
   #### Option B: SendGrid
   - Sign up at sendgrid.com (free tier available)
   - Get API key
   - Use SendGrid node instead of Email Send

   ### Google Sheets (Optional)
   - For lead tracking
   - Click "Save to Google Sheets" node
   - Connect your Google account
   - Create a sheet with columns: Date, Time, Name, Email, Company, Session ID, Transcript Length, Status

5. **Update Website Configuration**
   - Copy your n8n webhook URL from the "Webhook - Consultation" node
   - Update `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/api/consultation"
     to = "YOUR_ACTUAL_N8N_WEBHOOK_URL"
     status = 200
     force = true
   ```

6. **Test the Integration**
   - Activate the workflow in n8n (toggle switch)
   - Test with the voice chat on your website
   - Check n8n execution logs

## Webhook URL Format

Your webhook URL will look like:
```
https://your-n8n-instance.railway.app/webhook/consultation
```

## Customization Options

### Email Template
- Modify the HTML in the "Send Email" node
- Add your logo, change colors, update copy

### AI Analysis Prompt
- Adjust the system prompt in "OpenAI - Analyze Conversation"
- Add industry-specific analysis
- Include pricing estimates

### Additional Integrations
- Add Slack notifications
- Save to CRM (HubSpot, Salesforce)
- Create calendar events for follow-ups

## Troubleshooting

### Webhook not receiving data
- Ensure workflow is active
- Check Netlify redirect is properly configured
- Verify webhook URL matches exactly

### Email not sending
- Check SMTP credentials
- For Gmail, ensure "Less secure app access" or use App Password
- Check spam folder

### OpenAI errors
- Verify API key is valid
- Check you have credits available
- Reduce max tokens if hitting limits

## Cost Estimates

- n8n on Railway: ~$5-10/month
- OpenAI API: ~$0.02 per consultation analysis
- Email: Free with Gmail/SendGrid free tier
- Total: Under $15/month for typical usage