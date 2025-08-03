# PineAI Consulting Automation Workflows

This document describes the automated workflows that power PineAI Consulting's operations.

## Core Workflows

### 1. Lead Capture & Nurture

**Trigger**: Website form submission or API webhook

**Flow**:
1. Receive lead data from website form
2. Create/update lead in Zoho CRM
3. Check for existing client
4. Send personalized welcome email
5. Add to email nurture sequence
6. Notify team via Slack/SMS
7. Schedule follow-up task

**Configuration**:
- Webhook URL: `/webhook/lead-capture`
- Required fields: name, email, company
- Optional fields: phone, message, service_interest

### 2. Client Onboarding

**Trigger**: Lead converted to client in Zoho CRM

**Flow**:
1. Create client in Paymo
2. Create Stripe customer
3. Generate project template
4. Send onboarding email sequence
5. Create shared documents folder
6. Schedule kickoff call
7. Generate initial invoice

**Configuration**:
- Triggered by Zoho CRM webhook
- Creates records across all systems
- Sends notifications to client and team

### 3. Invoice Generation

**Trigger**: Manual trigger or monthly schedule

**Flow**:
1. Get billable hours from Paymo
2. Calculate invoice amount
3. Create Stripe invoice
4. Add line items
5. Send invoice to client
6. Log in accounting system
7. Update project financials

**Configuration**:
- Can be triggered manually or scheduled
- Supports hourly and fixed-price billing
- Automatic payment reminders

### 4. Project Status Updates

**Trigger**: Weekly schedule (Mondays 9 AM)

**Flow**:
1. Get active projects from Paymo
2. Calculate completion percentage
3. Get recent activities
4. Generate status report
5. Send to clients
6. Update CRM with communication log
7. Flag at-risk projects

**Configuration**:
- Runs every Monday morning
- Customizable report template
- Automatic escalation for delays

### 5. Payment Processing

**Trigger**: Stripe webhook (payment received)

**Flow**:
1. Receive payment notification
2. Update invoice status
3. Update project financials
4. Send thank you email
5. Update accounting records
6. Check for outstanding invoices
7. Update client health score

**Configuration**:
- Real-time webhook processing
- Automatic receipt generation
- Financial dashboard updates

## Utility Workflows

### 6. SMS Command Handler

**Trigger**: Incoming SMS to Twilio number

**Flow**:
1. Parse SMS command
2. Identify client by phone number
3. Process command:
   - STATUS: Send project status
   - INVOICE: Send payment link
   - HELP: Send command list
4. Log interaction
5. Send response

### 7. Meeting Scheduler

**Trigger**: Scheduling link clicked

**Flow**:
1. Show available time slots
2. Client selects time
3. Create calendar event
4. Send confirmation email
5. Send SMS reminder (1 day before)
6. Create meeting notes template
7. Update CRM activity

### 8. Document Generator

**Trigger**: Project milestone reached

**Flow**:
1. Get project data
2. Generate document from template
3. Include relevant metrics
4. Save to cloud storage
5. Send to client
6. Log in project history
7. Request feedback

### 9. Feedback Collection

**Trigger**: Project completion or milestone

**Flow**:
1. Wait 2 days after milestone
2. Send feedback request
3. If no response, send reminder
4. Collect NPS score
5. Process text feedback
6. Update client record
7. Flag issues for follow-up

### 10. Backup & Maintenance

**Trigger**: Daily at 2 AM

**Flow**:
1. Backup database
2. Backup n8n workflows
3. Export Metabase dashboards
4. Compress and encrypt
5. Upload to cloud storage
6. Clean old backups
7. Send status report

## Workflow Management

### Testing Workflows

```bash
# Test lead capture
curl -X POST http://localhost:5678/webhook/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "message": "Testing workflow"
  }'
```

### Monitoring Workflows

1. Check n8n execution history
2. Review error logs
3. Monitor webhook response times
4. Track success rates

### Debugging Workflows

1. Enable debug mode in n8n
2. Check node outputs
3. Review error messages
4. Test individual nodes

## Workflow Templates

### Email Templates

Located in `automation/templates/`:
- `welcome.html` - New lead welcome
- `invoice.html` - Invoice notification
- `status-update.html` - Project status
- `thank-you.html` - Payment received

### SMS Templates

- Lead confirmation: "Hi {name}, thanks for your interest in PineAI Consulting. We'll be in touch within 24 hours."
- Invoice reminder: "Hi {name}, your invoice #{number} for ${amount} is due on {date}. Pay at: {link}"
- Project update: "Project '{project}' is {percentage}% complete. Next milestone: {milestone}"

## Best Practices

### 1. Error Handling
- Always include error handling nodes
- Send notifications for critical failures
- Log all errors for debugging
- Implement retry logic for external APIs

### 2. Data Validation
- Validate all incoming data
- Sanitize user inputs
- Check for required fields
- Handle edge cases

### 3. Performance
- Limit API calls to stay within rate limits
- Use caching where appropriate
- Batch operations when possible
- Monitor execution times

### 4. Security
- Never log sensitive data
- Use environment variables for credentials
- Validate webhook signatures
- Implement access controls

## Extending Workflows

### Adding New Workflows

1. Design workflow in n8n UI
2. Test thoroughly
3. Export as JSON
4. Add to `automation/n8n-workflows/`
5. Document in this file
6. Update webhook routes if needed

### Modifying Existing Workflows

1. Create backup of current workflow
2. Make changes in n8n UI
3. Test with sample data
4. Deploy to production
5. Monitor for issues
6. Update documentation

## Troubleshooting

### Common Issues

**Workflow not triggering**:
- Check webhook URL
- Verify credentials
- Check n8n logs
- Test with curl

**API errors**:
- Verify API keys
- Check rate limits
- Review API response
- Update credentials

**Email not sending**:
- Check SMTP settings
- Verify recipient address
- Review email logs
- Check spam filters

**Data not syncing**:
- Check field mappings
- Verify data types
- Review transformation nodes
- Check for duplicates

## Metrics and KPIs

Track these metrics for workflow performance:

1. **Lead Capture**:
   - Conversion rate
   - Response time
   - Error rate

2. **Invoice Generation**:
   - Time to generate
   - Payment rate
   - Accuracy

3. **Client Communication**:
   - Open rates
   - Response rates
   - Satisfaction scores

4. **System Performance**:
   - Uptime
   - Execution time
   - Error frequency