#!/bin/bash

# n8n Workflow Setup Script

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if n8n is running
check_n8n() {
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:5678/healthz | grep -q "200"; then
        return 0
    else
        return 1
    fi
}

# Wait for n8n to be ready
wait_for_n8n() {
    log_info "Waiting for n8n to be ready..."
    for i in {1..30}; do
        if check_n8n; then
            log_info "n8n is ready!"
            return 0
        fi
        sleep 2
    done
    
    log_warning "n8n is not responding. Please check Docker logs."
    return 1
}

# Import workflows
import_workflows() {
    log_info "Importing n8n workflows..."
    
    # Check if workflow files exist
    if [ ! -d "automation/n8n-workflows" ]; then
        log_warning "No workflow directory found. Creating default workflows..."
        mkdir -p automation/n8n-workflows
    fi
    
    # Import each workflow JSON file
    for workflow in automation/n8n-workflows/*.json; do
        if [ -f "$workflow" ]; then
            workflow_name=$(basename "$workflow" .json)
            log_info "Importing workflow: $workflow_name"
            
            # Use n8n CLI or API to import
            # This is a placeholder - actual implementation depends on n8n version
            # curl -X POST http://localhost:5678/api/v1/workflows \
            #     -H "Content-Type: application/json" \
            #     -d @"$workflow"
        fi
    done
}

# Create default workflows
create_default_workflows() {
    log_info "Creating default n8n workflows..."
    
    # Lead Capture Workflow
    cat > automation/n8n-workflows/lead-capture.json <<'EOF'
{
  "name": "Lead Capture to Zoho",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "lead-capture",
        "responseMode": "onReceived",
        "responseData": "allEntries",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "resource": "lead",
        "operation": "create",
        "additionalFields": {}
      },
      "name": "Zoho CRM",
      "type": "n8n-nodes-base.zohoCrm",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "send",
        "to": "={{$node[\"Webhook\"].json[\"email\"]}}",
        "subject": "Welcome to PineAI Consulting",
        "message": "Thank you for your interest in our AI consulting services!",
        "options": {}
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Zoho CRM", "type": "main", "index": 0}]]
    },
    "Zoho CRM": {
      "main": [[{"node": "Send Email", "type": "main", "index": 0}]]
    }
  }
}
EOF

    # Invoice Generation Workflow
    cat > automation/n8n-workflows/invoice-generation.json <<'EOF'
{
  "name": "Generate Invoice",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "generate-invoice",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "resource": "invoice",
        "operation": "create",
        "additionalFields": {}
      },
      "name": "Create Stripe Invoice",
      "type": "n8n-nodes-base.stripe",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "send",
        "message": "Invoice {{$node[\"Create Stripe Invoice\"].json[\"id\"]}} created",
        "additionalFields": {}
      },
      "name": "Send SMS",
      "type": "n8n-nodes-base.twilio",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Create Stripe Invoice", "type": "main", "index": 0}]]
    },
    "Create Stripe Invoice": {
      "main": [[{"node": "Send SMS", "type": "main", "index": 0}]]
    }
  }
}
EOF

    # Project Status Update Workflow
    cat > automation/n8n-workflows/project-status.json <<'EOF'
{
  "name": "Project Status Updates",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [{"field": "cronExpression", "expression": "0 9 * * 1"}]
        }
      },
      "name": "Weekly Trigger",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "resource": "project",
        "operation": "getAll",
        "returnAll": true,
        "filters": {}
      },
      "name": "Get Active Projects",
      "type": "n8n-nodes-base.paymo",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "functionCode": "// Generate status report\nconst projects = items;\nconst report = projects.map(p => ({\n  client: p.json.client_name,\n  project: p.json.name,\n  status: p.json.status,\n  completion: p.json.completion_percentage\n}));\n\nreturn [{json: {report}}];"
      },
      "name": "Generate Report",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Weekly Trigger": {
      "main": [[{"node": "Get Active Projects", "type": "main", "index": 0}]]
    },
    "Get Active Projects": {
      "main": [[{"node": "Generate Report", "type": "main", "index": 0}]]
    }
  }
}
EOF
}

# Main execution
main() {
    log_info "Setting up n8n workflows..."
    
    # Create default workflows if they don't exist
    if [ ! -f "automation/n8n-workflows/lead-capture.json" ]; then
        create_default_workflows
    fi
    
    # Wait for n8n to be ready
    if wait_for_n8n; then
        import_workflows
        log_info "n8n workflow setup complete!"
        log_info "Access n8n at: http://localhost:5678"
        log_info "Default credentials are in your .env file"
    else
        log_warning "n8n is not running. Please start it with: docker-compose up -d n8n"
    fi
}

# Run main function
main