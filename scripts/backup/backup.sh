#!/bin/bash

# PineAI Consulting Backup Script
# Backs up database, n8n workflows, and configurations

set -e

# Configuration
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="pineai_backup_${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

# Load environment variables
source .env

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create backup directory
create_backup_dir() {
    mkdir -p "${BACKUP_PATH}"
    log_info "Created backup directory: ${BACKUP_PATH}"
}

# Backup PostgreSQL database
backup_database() {
    log_info "Backing up PostgreSQL database..."
    
    if docker ps | grep -q postgres; then
        docker exec postgres pg_dump \
            -U ${POSTGRES_USER:-pineai} \
            ${POSTGRES_DB:-pineai} \
            > "${BACKUP_PATH}/database.sql"
        
        # Compress the dump
        gzip "${BACKUP_PATH}/database.sql"
        log_info "Database backup completed: database.sql.gz"
    else
        log_warning "PostgreSQL container not running, skipping database backup"
    fi
}

# Backup n8n workflows
backup_n8n() {
    log_info "Backing up n8n workflows..."
    
    if [ -d "data/n8n" ]; then
        tar -czf "${BACKUP_PATH}/n8n_data.tar.gz" -C data n8n
        log_info "n8n data backup completed: n8n_data.tar.gz"
    else
        log_warning "n8n data directory not found"
    fi
    
    # Backup workflow JSON files
    if [ -d "automation/n8n-workflows" ]; then
        cp -r automation/n8n-workflows "${BACKUP_PATH}/"
        log_info "n8n workflow files backed up"
    fi
}

# Backup configuration files
backup_configs() {
    log_info "Backing up configuration files..."
    
    # List of config files to backup
    CONFIG_FILES=(
        ".env"
        "docker-compose.yml"
        "docker-compose.override.yml"
        "infrastructure/terraform/terraform.tfvars"
        "website/netlify.toml"
    )
    
    mkdir -p "${BACKUP_PATH}/configs"
    
    for file in "${CONFIG_FILES[@]}"; do
        if [ -f "$file" ]; then
            cp "$file" "${BACKUP_PATH}/configs/"
            log_info "Backed up: $file"
        fi
    done
}

# Backup Metabase data
backup_metabase() {
    log_info "Backing up Metabase data..."
    
    if [ -d "data/metabase" ]; then
        tar -czf "${BACKUP_PATH}/metabase_data.tar.gz" -C data metabase
        log_info "Metabase backup completed: metabase_data.tar.gz"
    else
        log_warning "Metabase data directory not found"
    fi
}

# Backup knowledge base
backup_knowledge_base() {
    log_info "Backing up knowledge base..."
    
    if [ -d "knowledge-base" ]; then
        tar -czf "${BACKUP_PATH}/knowledge_base.tar.gz" knowledge-base
        log_info "Knowledge base backup completed: knowledge_base.tar.gz"
    else
        log_warning "Knowledge base directory not found"
    fi
}

# Create backup metadata
create_metadata() {
    log_info "Creating backup metadata..."
    
    cat > "${BACKUP_PATH}/backup_info.json" <<EOF
{
    "timestamp": "${TIMESTAMP}",
    "date": "$(date)",
    "hostname": "$(hostname)",
    "version": "1.0.0",
    "components": {
        "database": $([ -f "${BACKUP_PATH}/database.sql.gz" ] && echo "true" || echo "false"),
        "n8n": $([ -f "${BACKUP_PATH}/n8n_data.tar.gz" ] && echo "true" || echo "false"),
        "metabase": $([ -f "${BACKUP_PATH}/metabase_data.tar.gz" ] && echo "true" || echo "false"),
        "knowledge_base": $([ -f "${BACKUP_PATH}/knowledge_base.tar.gz" ] && echo "true" || echo "false"),
        "configs": $([ -d "${BACKUP_PATH}/configs" ] && echo "true" || echo "false")
    }
}
EOF
}

# Compress final backup
compress_backup() {
    log_info "Compressing backup..."
    
    cd "${BACKUP_DIR}"
    tar -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"
    rm -rf "${BACKUP_NAME}"
    
    BACKUP_SIZE=$(du -h "${BACKUP_NAME}.tar.gz" | cut -f1)
    log_info "Backup completed: ${BACKUP_NAME}.tar.gz (${BACKUP_SIZE})"
}

# Upload to cloud storage (optional)
upload_backup() {
    if [ -n "${DO_SPACES_KEY}" ] && [ -n "${DO_SPACES_SECRET}" ]; then
        log_info "Uploading backup to DigitalOcean Spaces..."
        
        # Using s3cmd (install with: apt-get install s3cmd)
        if command -v s3cmd &> /dev/null; then
            s3cmd put "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" \
                "s3://pineai-backups/${BACKUP_NAME}.tar.gz" \
                --access_key="${DO_SPACES_KEY}" \
                --secret_key="${DO_SPACES_SECRET}" \
                --host="nyc3.digitaloceanspaces.com" \
                --host-bucket="%(bucket)s.nyc3.digitaloceanspaces.com"
            
            log_info "Backup uploaded to cloud storage"
        else
            log_warning "s3cmd not installed, skipping cloud upload"
        fi
    fi
}

# Clean old backups
clean_old_backups() {
    log_info "Cleaning old backups..."
    
    # Keep only last 7 backups
    cd "${BACKUP_DIR}"
    ls -t pineai_backup_*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm
    
    log_info "Old backups cleaned"
}

# Main backup process
main() {
    log_info "Starting PineAI Consulting backup..."
    
    # Create backup directory
    create_backup_dir
    
    # Run backups
    backup_database
    backup_n8n
    backup_metabase
    backup_knowledge_base
    backup_configs
    
    # Create metadata
    create_metadata
    
    # Compress backup
    compress_backup
    
    # Upload to cloud (optional)
    upload_backup
    
    # Clean old backups
    clean_old_backups
    
    log_info "Backup process completed successfully!"
    log_info "Backup location: ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
}

# Run main function
main