# PineAI Consulting Tech Stack

A fully automated, CLI-accessible tech stack for PineAI Consulting that enables AI agents to manage all business operations.

## Overview

This repository contains the complete infrastructure, automation workflows, and integrations for PineAI Consulting's operations.

## Tech Stack

| Category | Tool | Purpose |
|----------|------|---------|
| **CRM** | Zoho CRM | Lead management with AI assistant |
| **Project & Invoicing** | Paymo | Project tracking with built-in invoicing |
| **Automation** | n8n | Self-hosted workflow automation |
| **Payments** | Stripe | Payment processing |
| **Infrastructure** | DigitalOcean + Terraform | Cloud infrastructure |
| **Website** | Astro + Tailwind + Netlify | Static site with forms |
| **Email** | Gmail/Google Workspace | Business email |
| **Voice/SMS** | Twilio + ElevenLabs | Communication services |
| **BI** | Metabase | Self-hosted analytics |
| **Knowledge** | Obsidian + Git | Documentation |

## Project Structure

```
pineai-consulting/
├── infrastructure/      # Terraform and Docker configs
├── website/            # Astro static site
├── automation/         # n8n workflows
├── integrations/       # API integrations
├── scripts/           # Automation scripts
├── docs/              # Documentation
└── knowledge-base/    # Obsidian vault
```

## Quick Start

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your API keys
3. Run the setup script: `./scripts/setup/setup.sh`

## Documentation

- [Setup Guide](docs/SETUP_GUIDE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Automation Workflows](docs/WORKFLOWS.md)

## License

© 2025 PineAI Consulting. All rights reserved.