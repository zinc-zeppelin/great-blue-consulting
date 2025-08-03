# PineAI Consulting API Reference

This document provides reference for all API integrations and CLI tools.

## Table of Contents

1. [Zoho CRM API](#zoho-crm-api)
2. [Paymo API](#paymo-api)
3. [Stripe API](#stripe-api)
4. [Twilio API](#twilio-api)
5. [n8n Webhooks](#n8n-webhooks)
6. [CLI Tools](#cli-tools)

## Zoho CRM API

### Python Client Usage

```python
from integrations.zoho.zoho_client import ZohoCRMClient

client = ZohoCRMClient()

# Create a lead
lead = client.create_lead({
    'Last_Name': 'Smith',
    'Company': 'Tech Corp',
    'Email': 'john@techcorp.com',
    'Phone': '1234567890',
    'Lead_Source': 'Website'
})

# Search leads
results = client.search_leads({'email': 'john@techcorp.com'})

# Convert lead to deal
client.convert_lead(lead_id, 'Tech Corp', 'AI Consulting Project')
```

### CLI Usage

```bash
# Create a lead
python integrations/zoho/zoho_client.py create_lead

# Get all leads
python integrations/zoho/zoho_client.py get_leads

# Search for a lead
python integrations/zoho/zoho_client.py search_leads john@example.com
```

## Paymo API

### Python Client Usage

```python
from integrations.paymo.paymo_client import PaymoClient

client = PaymoClient()

# Create client
paymo_client = client.create_client({
    'name': 'Tech Corp',
    'email': 'contact@techcorp.com',
    'phone': '123-456-7890'
})

# Create project
project = client.create_project({
    'name': 'AI Implementation',
    'client_id': paymo_client['id'],
    'description': 'Custom AI solution',
    'billable': True,
    'budget': 15000
})

# Create invoice
invoice = client.create_invoice({
    'client_id': paymo_client['id'],
    'date': '2025-01-15',
    'due_date': '2025-02-15'
})

# Add invoice line items
client.add_invoice_line(invoice['id'], {
    'description': 'AI Consulting - Phase 1',
    'amount': 5000
})
```

### CLI Usage

```bash
# Create a client
python integrations/paymo/paymo_client.py create_client

# Create a project (requires client_id)
python integrations/paymo/paymo_client.py create_project 12345

# Create an invoice
python integrations/paymo/paymo_client.py create_invoice 12345

# List all projects
python integrations/paymo/paymo_client.py get_projects
```

## Stripe API

### Python Client Usage

```python
from integrations.stripe.stripe_client import StripeClient

client = StripeClient()

# Create customer
customer = client.create_customer({
    'email': 'john@techcorp.com',
    'name': 'John Smith',
    'metadata': {
        'company': 'Tech Corp',
        'source': 'website'
    }
})

# Create invoice with line items
invoice = client.create_invoice({
    'customer_id': customer.id,
    'description': 'AI Consulting Services',
    'line_items': [
        {
            'description': 'Strategy Session',
            'amount': 500.00,
            'quantity': 2
        },
        {
            'description': 'Implementation',
            'amount': 3000.00
        }
    ],
    'days_until_due': 30
})

# Send invoice
client.send_invoice(invoice.id)

# Create payment link
link = client.create_payment_link({
    'items': [{
        'product_id': 'prod_123',
        'amount': 250.00
    }],
    'success_url': 'https://pineaiconsulting.com/thank-you'
})
```

### CLI Usage

```bash
# Create a customer
python integrations/stripe/stripe_client.py create_customer

# Create an invoice for a customer
python integrations/stripe/stripe_client.py create_invoice john@example.com

# Create a payment link
python integrations/stripe/stripe_client.py create_payment_link

# Get revenue summary
python integrations/stripe/stripe_client.py get_revenue
```

## Twilio API

### Python Client Usage

```python
from integrations.twilio.twilio_client import TwilioClient

client = TwilioClient()

# Send SMS
result = client.send_sms(
    '+1234567890',
    'Your AI consulting session is confirmed for tomorrow at 2 PM.'
)

# Send bulk SMS
recipients = [
    {'name': 'John', 'phone': '+1234567890'},
    {'name': 'Jane', 'phone': '+0987654321'}
]
results = client.send_bulk_sms(
    recipients,
    'Hi {name}, your project update is ready.'
)

# Generate TTS and send voice message
client.create_voice_message(
    'Your invoice has been paid. Thank you!',
    '+1234567890'
)

# Verify phone number
verification = client.verify_phone_number('+1234567890')
```

### CLI Usage

```bash
# Send SMS
python integrations/twilio/twilio_client.py send_sms +1234567890 "Your message here"

# Send voice message
python integrations/twilio/twilio_client.py send_voice +1234567890 "Voice message text"

# Verify phone number
python integrations/twilio/twilio_client.py verify_number +1234567890

# Get usage statistics
python integrations/twilio/twilio_client.py get_stats
```

## n8n Webhooks

### Available Webhook Endpoints

Once n8n is running, these webhooks are available:

```bash
# Lead capture
POST http://localhost:5678/webhook/lead-capture
{
    "name": "John Smith",
    "email": "john@example.com",
    "company": "Tech Corp",
    "message": "Interested in AI consulting"
}

# Generate invoice
POST http://localhost:5678/webhook/generate-invoice
{
    "client_email": "john@example.com",
    "items": [
        {
            "description": "AI Consulting",
            "amount": 1500
        }
    ]
}

# Project status update
POST http://localhost:5678/webhook/project-status
{
    "project_id": "12345",
    "status": "completed",
    "notes": "Phase 1 delivered successfully"
}
```

### Testing Webhooks

```bash
# Test lead capture
curl -X POST http://localhost:5678/webhook/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "company": "Test Corp"
  }'

# Test invoice generation
curl -X POST http://localhost:5678/webhook/generate-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "client_email": "test@example.com",
    "items": [{"description": "Consulting", "amount": 1000}]
  }'
```

## CLI Tools

### Setup Tools

```bash
# Main setup
./scripts/setup/setup.sh

# Database initialization
python scripts/setup/init_database.py

# n8n workflow setup
./scripts/setup/setup_n8n.sh
```

### Backup Tools

```bash
# Run full backup
./scripts/backup/backup.sh

# Restore from backup
./scripts/backup/restore.sh pineai_backup_20250115_120000.tar.gz
```

### Utility Scripts

```bash
# Check system status
./scripts/utils/health_check.sh

# Generate client report
python scripts/utils/client_report.py john@example.com

# Export invoices
python scripts/utils/export_invoices.py --month 2025-01

# Sync CRM data
python scripts/utils/sync_crm.py
```

## Error Codes

### Zoho CRM
- `INVALID_TOKEN`: Refresh token expired
- `DUPLICATE_DATA`: Lead/contact already exists
- `MANDATORY_NOT_FOUND`: Required field missing

### Paymo
- `401`: Invalid API key
- `404`: Resource not found
- `422`: Validation error

### Stripe
- `card_declined`: Payment failed
- `customer_not_found`: Invalid customer ID
- `invoice_already_paid`: Cannot modify paid invoice

### Twilio
- `21211`: Invalid phone number
- `21608`: Unverified number (trial account)
- `30008`: Message delivery failed

## Rate Limits

- **Zoho CRM**: 250 requests per minute
- **Paymo**: 1000 requests per hour
- **Stripe**: No hard limit (be reasonable)
- **Twilio**: 1 message per second per number
- **ElevenLabs**: 100,000 characters per month (free tier)

## Webhook Security

All webhooks should validate signatures:

```python
# Example webhook validation
import hmac
import hashlib

def validate_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

## Support

For API-specific issues:
- Check service status pages
- Review API documentation
- Enable debug logging in `.env`
- Check `logs/` directory for detailed errors