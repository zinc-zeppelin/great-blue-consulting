# PineAI Consulting Setup Guide

This guide will walk you through setting up the complete PineAI Consulting tech stack.

## Prerequisites

- Linux/macOS system (or WSL2 on Windows)
- Docker and Docker Compose installed
- Node.js 18+ and npm
- Python 3.8+
- Git
- A domain name (for production deployment)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/zinc-zeppelin/pineai-consulting.git
   cd pineai-consulting
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Run the setup script**
   ```bash
   ./scripts/setup/setup.sh
   ```

## Detailed Setup

### 1. API Keys and Credentials

You'll need to obtain API keys for the following services:

#### Zoho CRM
1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Create a new client
3. Get your Client ID, Client Secret, and generate a refresh token
4. Add to `.env`:
   ```
   ZOHO_CLIENT_ID=your_client_id
   ZOHO_CLIENT_SECRET=your_client_secret
   ZOHO_REFRESH_TOKEN=your_refresh_token
   ```

#### Paymo
1. Log into your Paymo account
2. Go to Settings → Your Company → API Keys
3. Generate a new API key
4. Add to `.env`:
   ```
   PAYMO_API_KEY=your_api_key
   ```

#### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers → API Keys
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

#### Twilio
1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Add to `.env`:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

#### ElevenLabs
1. Sign up at [ElevenLabs](https://elevenlabs.io/)
2. Get your API key from Profile Settings
3. Choose a voice ID
4. Add to `.env`:
   ```
   ELEVENLABS_API_KEY=your_api_key
   ELEVENLABS_VOICE_ID=your_voice_id
   ```

#### DigitalOcean
1. Create account at [DigitalOcean](https://www.digitalocean.com/)
2. Generate API token from API → Tokens
3. Add to `.env`:
   ```
   DO_API_TOKEN=your_token
   ```

### 2. Local Development Setup

#### Start Docker services
```bash
docker-compose up -d postgres redis n8n metabase
```

#### Initialize database
```bash
python3 scripts/setup/init_database.py
```

#### Setup n8n workflows
```bash
./scripts/setup/setup_n8n.sh
```

#### Build and preview website
```bash
cd website
npm install
npm run build
npm run preview
```

### 3. Infrastructure Deployment

#### Configure Terraform
```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

#### Deploy infrastructure
```bash
terraform init
terraform plan
terraform apply
```

### 4. Website Deployment

#### Deploy to Netlify
```bash
cd website
netlify login
netlify init
netlify deploy --prod
```

### 5. Configure n8n

1. Access n8n at http://localhost:5678
2. Login with credentials from `.env`
3. Configure credentials for:
   - Zoho CRM
   - Gmail
   - Stripe
   - Twilio
4. Import workflows from `automation/n8n-workflows/`

### 6. Configure Metabase

1. Access Metabase at http://localhost:3000
2. Complete initial setup
3. Connect to PostgreSQL database
4. Import dashboards from `docs/metabase-dashboards/`

## Production Deployment

### 1. Domain Setup

1. Point your domain to DigitalOcean nameservers
2. The Terraform config will create DNS records automatically

### 2. SSL Certificates

SSH into your server and run:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d n8n.yourdomain.com -d analytics.yourdomain.com
```

### 3. Deploy Code

```bash
# On your server
cd /opt/pineai
git pull origin main
docker-compose up -d
```

### 4. Configure Webhooks

Update webhook URLs in:
- Netlify form notifications
- Stripe webhooks
- Twilio webhooks

## Monitoring and Maintenance

### Daily Tasks
- Check automation logs: `docker-compose logs -f n8n`
- Monitor system health: `htop`
- Review Metabase dashboards

### Weekly Tasks
- Run backup script: `./scripts/backup/backup.sh`
- Review error logs
- Update dependencies

### Monthly Tasks
- Review and optimize workflows
- Analyze performance metrics
- Update documentation

## Troubleshooting

### n8n not starting
```bash
docker-compose logs n8n
# Check for database connection issues
```

### Database connection errors
```bash
docker-compose restart postgres
docker-compose exec postgres psql -U pineai -d pineai
```

### Website build failures
```bash
cd website
rm -rf node_modules
npm install
npm run build
```

## Support

For issues or questions:
- Check logs in `logs/` directory
- Review error messages in Docker logs
- Consult service-specific documentation

## Next Steps

1. Test all integrations
2. Set up monitoring alerts
3. Configure backup automation
4. Create client onboarding workflow
5. Customize website content