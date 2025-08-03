#!/usr/bin/env python3
"""
Paymo API Client for PineAI Consulting
Handles project management and invoicing
"""

import os
import json
import requests
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()


class PaymoClient:
    """Paymo API client for project management and invoicing"""
    
    def __init__(self):
        self.api_key = os.getenv('PAYMO_API_KEY')
        self.api_url = os.getenv('PAYMO_API_URL', 'https://app.paymoapp.com/api')
        self.session = requests.Session()
        self.session.auth = (self.api_key, 'api-key')
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None):
        """Make authenticated request to Paymo API"""
        url = f"{self.api_url}/{endpoint}"
        
        if method == 'GET':
            response = self.session.get(url, params=data)
        elif method == 'POST':
            response = self.session.post(url, json=data)
        elif method == 'PUT':
            response = self.session.put(url, json=data)
        elif method == 'DELETE':
            response = self.session.delete(url)
        
        response.raise_for_status()
        return response.json() if response.text else None
    
    # Client Management
    def create_client(self, client_data: Dict) -> Dict:
        """Create a new client"""
        required_fields = ['name']
        for field in required_fields:
            if field not in client_data:
                raise ValueError(f"Required field '{field}' missing")
        
        return self._make_request('POST', 'clients', client_data)
    
    def get_clients(self, page: int = 1, limit: int = 100) -> List[Dict]:
        """Get all clients with pagination"""
        params = {
            'page': page,
            'limit': limit
        }
        
        response = self._make_request('GET', 'clients', params)
        return response.get('clients', [])
    
    def get_client_by_email(self, email: str) -> Optional[Dict]:
        """Find client by email"""
        clients = self.get_clients()
        for client in clients:
            if client.get('email') == email:
                return client
        return None
    
    # Project Management
    def create_project(self, project_data: Dict) -> Dict:
        """Create a new project"""
        required_fields = ['name', 'client_id']
        for field in required_fields:
            if field not in project_data:
                raise ValueError(f"Required field '{field}' missing")
        
        # Set defaults
        project_data.setdefault('billable', True)
        project_data.setdefault('active', True)
        
        return self._make_request('POST', 'projects', project_data)
    
    def get_projects(self, active_only: bool = True) -> List[Dict]:
        """Get all projects"""
        params = {'where': 'active=true'} if active_only else {}
        response = self._make_request('GET', 'projects', params)
        return response.get('projects', [])
    
    def update_project(self, project_id: str, update_data: Dict) -> Dict:
        """Update project details"""
        return self._make_request('PUT', f'projects/{project_id}', update_data)
    
    # Task Management
    def create_task(self, task_data: Dict) -> Dict:
        """Create a new task"""
        required_fields = ['name', 'project_id']
        for field in required_fields:
            if field not in task_data:
                raise ValueError(f"Required field '{field}' missing")
        
        return self._make_request('POST', 'tasks', task_data)
    
    def get_project_tasks(self, project_id: str) -> List[Dict]:
        """Get all tasks for a project"""
        params = {'where': f'project_id={project_id}'}
        response = self._make_request('GET', 'tasks', params)
        return response.get('tasks', [])
    
    # Time Tracking
    def create_time_entry(self, entry_data: Dict) -> Dict:
        """Create a time entry"""
        required_fields = ['task_id', 'date', 'duration']
        for field in required_fields:
            if field not in entry_data:
                raise ValueError(f"Required field '{field}' missing")
        
        return self._make_request('POST', 'entries', entry_data)
    
    def get_time_entries(self, start_date: str, end_date: str) -> List[Dict]:
        """Get time entries for date range"""
        params = {
            'where': f"date>={start_date} AND date<={end_date}"
        }
        response = self._make_request('GET', 'entries', params)
        return response.get('entries', [])
    
    # Invoicing
    def create_invoice(self, invoice_data: Dict) -> Dict:
        """Create a new invoice"""
        required_fields = ['client_id', 'date', 'due_date']
        for field in required_fields:
            if field not in invoice_data:
                raise ValueError(f"Required field '{field}' missing")
        
        # Set defaults
        invoice_data.setdefault('status', 'draft')
        invoice_data.setdefault('currency', 'USD')
        
        return self._make_request('POST', 'invoices', invoice_data)
    
    def add_invoice_line(self, invoice_id: str, line_data: Dict) -> Dict:
        """Add line item to invoice"""
        required_fields = ['description', 'amount']
        for field in required_fields:
            if field not in line_data:
                raise ValueError(f"Required field '{field}' missing")
        
        line_data['invoice_id'] = invoice_id
        return self._make_request('POST', 'invoicelines', line_data)
    
    def send_invoice(self, invoice_id: str, message: str = None) -> Dict:
        """Send invoice to client"""
        data = {
            'action': 'send',
            'message': message or 'Please find attached your invoice.'
        }
        return self._make_request('POST', f'invoices/{invoice_id}/send', data)
    
    def get_invoices(self, status: str = None) -> List[Dict]:
        """Get invoices, optionally filtered by status"""
        params = {}
        if status:
            params['where'] = f"status={status}"
        
        response = self._make_request('GET', 'invoices', params)
        return response.get('invoices', [])
    
    # Reports
    def get_project_profitability(self, project_id: str) -> Dict:
        """Get profitability report for a project"""
        return self._make_request('GET', f'reports/project/{project_id}/profitability')
    
    def get_client_summary(self, client_id: str) -> Dict:
        """Get summary report for a client"""
        projects = self.get_projects()
        client_projects = [p for p in projects if p.get('client_id') == client_id]
        
        total_revenue = 0
        total_hours = 0
        
        for project in client_projects:
            # Get project revenue and hours
            entries = self._make_request('GET', 'entries', {'where': f'project_id={project["id"]}'})
            for entry in entries.get('entries', []):
                total_hours += entry.get('duration', 0) / 3600  # Convert to hours
                total_revenue += entry.get('billed_amount', 0)
        
        return {
            'client_id': client_id,
            'total_projects': len(client_projects),
            'total_hours': round(total_hours, 2),
            'total_revenue': round(total_revenue, 2),
            'active_projects': len([p for p in client_projects if p.get('active')])
        }


# CLI interface
if __name__ == "__main__":
    import sys
    
    client = PaymoClient()
    
    if len(sys.argv) < 2:
        print("Usage: python paymo_client.py [create_client|create_project|create_invoice|get_clients|get_projects|get_invoices]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "create_client":
        # Example client creation
        client_data = {
            'name': 'Test Company',
            'email': 'contact@testcompany.com',
            'phone': '123-456-7890',
            'address': '123 Test St, Test City, TC 12345'
        }
        result = client.create_client(client_data)
        print(json.dumps(result, indent=2))
    
    elif command == "create_project":
        if len(sys.argv) < 3:
            print("Usage: python paymo_client.py create_project <client_id>")
            sys.exit(1)
        
        client_id = sys.argv[2]
        project_data = {
            'name': 'Test Project',
            'client_id': client_id,
            'description': 'AI automation project',
            'billable': True,
            'active': True
        }
        result = client.create_project(project_data)
        print(json.dumps(result, indent=2))
    
    elif command == "create_invoice":
        if len(sys.argv) < 3:
            print("Usage: python paymo_client.py create_invoice <client_id>")
            sys.exit(1)
        
        client_id = sys.argv[2]
        invoice_data = {
            'client_id': client_id,
            'date': datetime.now().strftime('%Y-%m-%d'),
            'due_date': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
            'status': 'draft'
        }
        result = client.create_invoice(invoice_data)
        print(json.dumps(result, indent=2))
    
    elif command == "get_clients":
        result = client.get_clients()
        print(json.dumps(result, indent=2))
    
    elif command == "get_projects":
        result = client.get_projects()
        print(json.dumps(result, indent=2))
    
    elif command == "get_invoices":
        result = client.get_invoices()
        print(json.dumps(result, indent=2))