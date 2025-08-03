terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}

# Variables
variable "do_token" {
  description = "DigitalOcean API Token"
  type        = string
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "nyc3"
}

variable "droplet_size" {
  description = "Size of the droplet"
  type        = string
  default     = "s-2vcpu-4gb"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "pineaiconsulting.com"
}

# SSH Key
resource "digitalocean_ssh_key" "pineai" {
  name       = "pineai-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

# Main Application Droplet
resource "digitalocean_droplet" "pineai_app" {
  name     = "pineai-app"
  size     = var.droplet_size
  image    = "ubuntu-22-04-x64"
  region   = var.region
  ssh_keys = [digitalocean_ssh_key.pineai.fingerprint]
  
  user_data = templatefile("${path.module}/user-data.sh", {
    domain_name = var.domain_name
  })

  tags = ["pineai", "production"]
}

# Firewall
resource "digitalocean_firewall" "pineai" {
  name = "pineai-firewall"

  droplet_ids = [digitalocean_droplet.pineai_app.id]

  # SSH
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # HTTP
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # HTTPS
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allow all outbound traffic
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

# Floating IP
resource "digitalocean_floating_ip" "pineai" {
  droplet_id = digitalocean_droplet.pineai_app.id
  region     = var.region
}

# Domain
resource "digitalocean_domain" "pineai" {
  name = var.domain_name
}

# DNS Records
resource "digitalocean_record" "pineai_a" {
  domain = digitalocean_domain.pineai.id
  type   = "A"
  name   = "@"
  value  = digitalocean_floating_ip.pineai.ip_address
  ttl    = 300
}

resource "digitalocean_record" "pineai_www" {
  domain = digitalocean_domain.pineai.id
  type   = "CNAME"
  name   = "www"
  value  = "@"
  ttl    = 300
}

resource "digitalocean_record" "pineai_n8n" {
  domain = digitalocean_domain.pineai.id
  type   = "A"
  name   = "n8n"
  value  = digitalocean_floating_ip.pineai.ip_address
  ttl    = 300
}

resource "digitalocean_record" "pineai_analytics" {
  domain = digitalocean_domain.pineai.id
  type   = "A"
  name   = "analytics"
  value  = digitalocean_floating_ip.pineai.ip_address
  ttl    = 300
}

# Spaces for backups (optional)
resource "digitalocean_spaces_bucket" "pineai_backups" {
  name   = "pineai-backups"
  region = var.region
  acl    = "private"

  lifecycle_rule {
    id      = "backup-retention"
    enabled = true
    
    expiration {
      days = 30
    }
  }
}

# Project
resource "digitalocean_project" "pineai" {
  name        = "PineAI Consulting"
  description = "Infrastructure for PineAI Consulting services"
  purpose     = "Web Application"
  environment = "Production"
  
  resources = [
    digitalocean_droplet.pineai_app.urn,
    digitalocean_domain.pineai.urn,
    digitalocean_spaces_bucket.pineai_backups.urn
  ]
}

# Outputs
output "droplet_ip" {
  value = digitalocean_droplet.pineai_app.ipv4_address
}

output "floating_ip" {
  value = digitalocean_floating_ip.pineai.ip_address
}

output "domain_name" {
  value = digitalocean_domain.pineai.name
}