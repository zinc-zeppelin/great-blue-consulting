#!/bin/bash

# PineAI Consulting - Main Setup Script
# This script sets up the entire tech stack

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running from project root
if [ ! -f ".env.example" ]; then
    log_error "Please run this script from the project root directory"
    exit 1
fi

log_info "Starting PineAI Consulting setup..."

# Check for required tools
log_info "Checking required tools..."
command -v git >/dev/null 2>&1 || { log_error "Git is required but not installed."; exit 1; }
command -v docker >/dev/null 2>&1 || { log_error "Docker is required but not installed."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { log_error "Docker Compose is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { log_error "Node.js/npm is required but not installed."; exit 1; }
command -v python3 >/dev/null 2>&1 || { log_error "Python 3 is required but not installed."; exit 1; }

# Check for .env file
if [ ! -f ".env" ]; then
    log_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    log_warning "Please edit .env file with your actual API keys and credentials"
    log_warning "Press Enter to continue after editing .env file..."
    read
fi

# Source environment variables
source .env

# Create necessary directories
log_info "Creating data directories..."
mkdir -p data/{n8n,metabase,postgres,redis}
mkdir -p logs
mkdir -p backups

# Install Python dependencies
log_info "Installing Python dependencies..."
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install Node.js dependencies for website
log_info "Installing website dependencies..."
cd website
npm install
cd ..

# Install CLI tools
log_info "Installing CLI tools..."

# Install Stripe CLI
if ! command -v stripe &> /dev/null; then
    log_info "Installing Stripe CLI..."
    curl -L https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_x86_64.tar.gz | tar xz
    sudo mv stripe /usr/local/bin/
fi

# Install Twilio CLI
if ! command -v twilio &> /dev/null; then
    log_info "Installing Twilio CLI..."
    npm install -g twilio-cli
fi

# Install Netlify CLI
if ! command -v netlify &> /dev/null; then
    log_info "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Install doctl (DigitalOcean CLI)
if ! command -v doctl &> /dev/null; then
    log_info "Installing DigitalOcean CLI..."
    curl -sL https://github.com/digitalocean/doctl/releases/latest/download/doctl-linux-amd64.tar.gz | tar xz
    sudo mv doctl /usr/local/bin/
fi

# Install Terraform
if ! command -v terraform &> /dev/null; then
    log_info "Installing Terraform..."
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install terraform
fi

# Setup Docker services
log_info "Setting up Docker services..."
docker-compose up -d postgres redis

# Wait for services to be ready
log_info "Waiting for services to start..."
sleep 10

# Initialize database
log_info "Initializing database..."
python3 scripts/setup/init_database.py

# Setup n8n workflows
log_info "Setting up n8n workflows..."
./scripts/setup/setup_n8n.sh

# Build website
log_info "Building website..."
cd website
npm run build
cd ..

# Create initial backups
log_info "Creating initial backup..."
./scripts/backup/backup.sh

log_info "Setup complete!"
log_info ""
log_info "Next steps:"
log_info "1. Configure your domain DNS settings"
log_info "2. Deploy infrastructure with: cd infrastructure/terraform && terraform apply"
log_info "3. Deploy website with: cd website && netlify deploy --prod"
log_info "4. Access n8n at: http://localhost:5678"
log_info "5. Access Metabase at: http://localhost:3000"
log_info ""
log_info "For more information, see docs/SETUP_GUIDE.md"