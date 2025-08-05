# Great Blue Consulting Website

AI-powered business consultation platform with voice chat and automated email insights.

## Features

- 🎙️ **Voice Chat**: AI business consultant using Vapi.ai
- 📧 **Automated Emails**: AI-generated insights via n8n workflow
- 💬 **Real-time Conversation**: Natural voice interaction
- 📊 **Business Analysis**: Personalized recommendations

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3001

## Project Structure

```
website/
├── app/              # Next.js app directory
│   ├── components/   # React components
│   ├── page.tsx      # Homepage
│   └── success/      # Success page
├── docs/             # Documentation
│   └── setup/        # Setup guides
├── tests/            # Test scripts
├── public/           # Static assets
└── netlify.toml      # Netlify configuration
```

## Key Components

- **VoiceChat.tsx**: Main voice interaction component
- **VapiChatSDKSimple.tsx**: Post-chat form and transcript display
- **workflows/n8n-consultation-workflow.json**: Email automation workflow

## Deployment

- **Website**: Deployed on Netlify
- **n8n**: Hosted on Railway with Redis + PostgreSQL
- **Voice**: Vapi.ai integration

## Environment Variables

Create `.env.local`:
```
# Copy from .env.example
```

## Documentation

- [Gmail Setup Guide](docs/setup/GMAIL_SETUP.md)
- [n8n Setup Guide](docs/setup/N8N_SETUP.md)
- [Main Project README](../README.md)

## Testing

```bash
# Test n8n webhook
node tests/test-n8n-webhook.js

# Test voice chat
node tests/test-fresh-voice.js
```