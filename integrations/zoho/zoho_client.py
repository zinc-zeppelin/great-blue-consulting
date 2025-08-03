#!/usr/bin/env python3
"""
Zoho CRM API Client for PineAI Consulting
"""

import os
import json
import requests
from typing import Dict, List, Optional
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()


class ZohoCRMClient:
    """Zoho CRM API client with authentication and common operations"""
    
    def __init__(self):
        self.client_id = os.getenv('ZOHO_CLIENT_ID')
        self.client_secret = os.getenv('ZOHO_CLIENT_SECRET')
        self.refresh_token = os.getenv('ZOHO_REFRESH_TOKEN')
        self.accounts_url = os.getenv('ZOHO_ACCOUNTS_URL', 'https://accounts.zoho.com')
        self.api_url = os.getenv('ZOHO_API_URL', 'https://www.zohoapis.com')
        self.access_token = None
        
    def refresh_access_token(self):
        """Refresh the access token using refresh token"""
        url = f"{self.accounts_url}/oauth/v2/token"
        data = {
            'refresh_token': self.refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'grant_type': 'refresh_token'
        }
        
        response = requests.post(url, data=data)
        if response.status_code == 200:
            self.access_token = response.json()['access_token']
            return True
        else:
            print(f"Error refreshing token: {response.text}")
            return False
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None):
        """Make authenticated request to Zoho API"""
        if not self.access_token:
            self.refresh_access_token()
            
        headers = {
            'Authorization': f'Zoho-oauthtoken {self.access_token}',
            'Content-Type': 'application/json'
        }
        
        url = f"{self.api_url}/crm/v5/{endpoint}"
        
        if method == 'GET':
            response = requests.get(url, headers=headers, params=data)
        elif method == 'POST':
            response = requests.post(url, headers=headers, json=data)
        elif method == 'PUT':
            response = requests.put(url, headers=headers, json=data)
        elif method == 'DELETE':
            response = requests.delete(url, headers=headers)
        
        # Retry with new token if unauthorized
        if response.status_code == 401:
            self.refresh_access_token()
            headers['Authorization'] = f'Zoho-oauthtoken {self.access_token}'
            
            if method == 'GET':
                response = requests.get(url, headers=headers, params=data)
            elif method == 'POST':
                response = requests.post(url, headers=headers, json=data)
            elif method == 'PUT':
                response = requests.put(url, headers=headers, json=data)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)
        
        return response
    
    def create_lead(self, lead_data: Dict) -> Dict:
        """Create a new lead in Zoho CRM"""
        data = {
            'data': [lead_data],
            'trigger': ['approval', 'workflow', 'blueprint']
        }
        
        response = self._make_request('POST', 'Leads', data)
        return response.json()
    
    def get_leads(self, page: int = 1, per_page: int = 200) -> Dict:
        """Get leads with pagination"""
        params = {
            'page': page,
            'per_page': per_page,
            'sort_order': 'desc',
            'sort_by': 'Created_Time'
        }
        
        response = self._make_request('GET', 'Leads', params)
        return response.json()
    
    def update_lead(self, lead_id: str, update_data: Dict) -> Dict:
        """Update an existing lead"""
        data = {
            'data': [update_data]
        }
        
        response = self._make_request('PUT', f'Leads/{lead_id}', data)
        return response.json()
    
    def search_leads(self, criteria: Dict) -> Dict:
        """Search leads based on criteria"""
        response = self._make_request('GET', 'Leads/search', criteria)
        return response.json()
    
    def create_deal(self, deal_data: Dict) -> Dict:
        """Create a new deal in Zoho CRM"""
        data = {
            'data': [deal_data],
            'trigger': ['approval', 'workflow', 'blueprint']
        }
        
        response = self._make_request('POST', 'Deals', data)
        return response.json()
    
    def convert_lead(self, lead_id: str, account_name: str, deal_name: str = None) -> Dict:
        """Convert lead to contact and optionally create a deal"""
        data = {
            'data': [{
                'convert_to': 'Contacts',
                'assign_to': self.get_current_user_id(),
                'Accounts': account_name,
                'Deals': {
                    'Deal_Name': deal_name or f"Deal - {account_name}",
                    'Closing_Date': datetime.now().strftime('%Y-%m-%d'),
                    'Stage': 'Qualification'
                }
            }]
        }
        
        response = self._make_request('POST', f'Leads/{lead_id}/actions/convert', data)
        return response.json()
    
    def get_current_user_id(self) -> str:
        """Get the current user's ID"""
        response = self._make_request('GET', 'users?type=CurrentUser')
        users = response.json().get('users', [])
        return users[0]['id'] if users else None


# CLI interface
if __name__ == "__main__":
    import sys
    
    client = ZohoCRMClient()
    
    if len(sys.argv) < 2:
        print("Usage: python zoho_client.py [create_lead|get_leads|search_leads]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "create_lead":
        # Example lead creation
        lead_data = {
            'Last_Name': 'Test Lead',
            'Company': 'Test Company',
            'Email': 'test@example.com',
            'Phone': '1234567890',
            'Lead_Source': 'Website'
        }
        result = client.create_lead(lead_data)
        print(json.dumps(result, indent=2))
    
    elif command == "get_leads":
        result = client.get_leads()
        print(json.dumps(result, indent=2))
    
    elif command == "search_leads":
        if len(sys.argv) < 3:
            print("Usage: python zoho_client.py search_leads <email>")
            sys.exit(1)
        
        email = sys.argv[2]
        result = client.search_leads({'email': email})
        print(json.dumps(result, indent=2))