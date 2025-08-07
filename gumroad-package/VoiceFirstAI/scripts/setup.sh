#!/bin/bash

# VoiceFirst AI Setup Script
# This script helps you set up your development environment

echo "🚀 Welcome to VoiceFirst AI Setup!"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm --version) detected"
echo ""

# Navigate to website directory
cd website

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local file
if [ ! -f .env.local ]; then
    echo ""
    echo "🔧 Setting up environment variables..."
    echo ""
    
    # Get Vapi credentials
    read -p "Enter your Vapi Public Key: " VAPI_PUBLIC_KEY
    read -p "Enter your Vapi Assistant ID: " VAPI_ASSISTANT_ID
    
    # Create .env.local
    cat > .env.local << EOF
# Vapi Configuration
VAPI_PUBLIC_KEY=$VAPI_PUBLIC_KEY
VAPI_ASSISTANT_ID=$VAPI_ASSISTANT_ID

# n8n Webhook (update after setting up n8n)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/consultation
EOF
    
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎨 Customization Options:"
echo "1. Update colors in app/globals.css"
echo "2. Replace logo in public/logo.png"
echo "3. Edit hero text in app/components/VoiceChat.tsx"
echo "4. Customize AI behavior in Vapi dashboard"
echo ""

# Ask if user wants to start dev server
read -p "Would you like to start the development server? (y/n): " START_DEV

if [ "$START_DEV" = "y" ] || [ "$START_DEV" = "Y" ]; then
    echo ""
    echo "🚀 Starting development server..."
    echo "   Your site will be available at http://localhost:3000"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "To start the development server later, run:"
    echo "   cd website && npm run dev"
    echo ""
    echo "To deploy to production:"
    echo "   - Vercel: npm run deploy-vercel"
    echo "   - Netlify: npm run deploy-netlify"
fi

echo ""
echo "📚 Next Steps:"
echo "1. Configure your Vapi assistant at dashboard.vapi.ai"
echo "2. Set up email automation (n8n or Zapier)"
echo "3. Test the complete flow"
echo "4. Deploy to production"
echo ""
echo "Need help? Check the docs/ folder or email support!"