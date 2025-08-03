#!/bin/bash

# PineAI Consulting - Server initialization script

set -e

# Update system
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common \
    git \
    nginx \
    certbot \
    python3-certbot-nginx \
    ufw

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create app user
useradd -m -s /bin/bash pineai
usermod -aG docker pineai

# Setup firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Create app directory
mkdir -p /opt/pineai
chown pineai:pineai /opt/pineai

# Clone repository (placeholder - replace with actual repo)
# su - pineai -c "cd /opt/pineai && git clone https://github.com/zinc-zeppelin/pineai-consulting.git ."

# Create systemd service for Docker Compose
cat > /etc/systemd/system/pineai.service <<EOF
[Unit]
Description=PineAI Consulting Services
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/pineai
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0
User=pineai
Group=pineai

[Install]
WantedBy=multi-user.target
EOF

# Setup Nginx configuration
cat > /etc/nginx/sites-available/pineai <<'EOF'
# Main website
server {
    listen 80;
    server_name ${domain_name} www.${domain_name};
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# n8n
server {
    listen 80;
    server_name n8n.${domain_name};
    
    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Metabase
server {
    listen 80;
    server_name analytics.${domain_name};
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/pineai /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# Setup SSL with Let's Encrypt (will be run manually after DNS propagation)
# certbot --nginx -d ${domain_name} -d www.${domain_name} -d n8n.${domain_name} -d analytics.${domain_name} --non-interactive --agree-tos -m admin@${domain_name}

# Enable and start services
systemctl daemon-reload
systemctl enable pineai
systemctl enable docker

# Create initial directories
su - pineai -c "mkdir -p /opt/pineai/{data,logs,backups}"

# Setup log rotation
cat > /etc/logrotate.d/pineai <<EOF
/opt/pineai/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 pineai pineai
    sharedscripts
}
EOF

echo "Server initialization complete!"