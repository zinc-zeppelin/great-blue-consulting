# PineAI Consulting Development Guidelines

## Project Overview
PineAI Consulting website - AI automation solutions for small businesses.

## Netlify Deploy Previews

### Automatic PR Deploy Previews
When working on the PineAI Consulting website (`website/` directory):

1. **How it works**: Netlify automatically builds deploy previews for all pull requests
2. **Preview URL**: Will be commented on the PR by Netlify bot in format: `https://deploy-preview-{PR-NUMBER}--{SITE-NAME}.netlify.app`
3. **Example**: For PR #1, the preview would be: `https://deploy-preview-1--pineai-consulting.netlify.app`

### Branch Deploys
- Netlify can also deploy specific branches automatically
- Branch deploys use format: `https://{BRANCH-NAME}--{SITE-NAME}.netlify.app`
- Example: `https://fix-microphone-issue--pineai-consulting.netlify.app`

### Testing Changes
1. Create a pull request with your changes
2. Wait for Netlify bot to comment with the deploy preview URL
3. Test your changes on the preview URL before merging
4. Preview stays active until PR is closed

This ensures all changes can be tested in a production-like environment before merging to main.

## Key Components

### Website (`website/`)
- Next.js 15 with React 19
- TypeScript and Tailwind CSS
- ElevenLabs Conversational AI integration
- Netlify Forms for contact form

### ElevenLabs Integration
- Agent ID: `agent_5501k0vy6b9zet2v2vabyytrs0y9`
- Uses dynamic variables for personalization
- Supports both voice and text chat modes

## Development Guidelines
- Always test changes using Netlify deploy previews
- Commit frequently with detailed messages
- Test ElevenLabs integration thoroughly with both WebRTC and WebSocket connections

---
*Last Updated: January 27, 2025*