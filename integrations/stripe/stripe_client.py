#!/usr/bin/env python3
"""
Stripe API Client for PineAI Consulting
Handles payment processing and invoice generation
"""

import os
import json
import stripe
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()


class StripeClient:
    """Stripe API client for payments and invoicing"""
    
    def __init__(self):
        self.api_key = os.getenv('STRIPE_SECRET_KEY')
        stripe.api_key = self.api_key
    
    # Customer Management
    def create_customer(self, customer_data: Dict) -> stripe.Customer:
        """Create a new Stripe customer"""
        return stripe.Customer.create(
            email=customer_data.get('email'),
            name=customer_data.get('name'),
            phone=customer_data.get('phone'),
            metadata=customer_data.get('metadata', {})
        )
    
    def get_customer(self, customer_id: str) -> stripe.Customer:
        """Get customer by ID"""
        return stripe.Customer.retrieve(customer_id)
    
    def search_customer_by_email(self, email: str) -> Optional[stripe.Customer]:
        """Find customer by email"""
        customers = stripe.Customer.list(email=email, limit=1)
        return customers.data[0] if customers.data else None
    
    def update_customer(self, customer_id: str, update_data: Dict) -> stripe.Customer:
        """Update customer information"""
        return stripe.Customer.modify(customer_id, **update_data)
    
    # Product and Price Management
    def create_product(self, product_data: Dict) -> stripe.Product:
        """Create a product"""
        return stripe.Product.create(
            name=product_data['name'],
            description=product_data.get('description'),
            metadata=product_data.get('metadata', {})
        )
    
    def create_price(self, price_data: Dict) -> stripe.Price:
        """Create a price for a product"""
        return stripe.Price.create(
            product=price_data['product_id'],
            unit_amount=int(price_data['amount'] * 100),  # Convert to cents
            currency=price_data.get('currency', 'usd'),
            recurring=price_data.get('recurring'),  # e.g., {'interval': 'month'}
            metadata=price_data.get('metadata', {})
        )
    
    # Invoice Management
    def create_invoice(self, invoice_data: Dict) -> stripe.Invoice:
        """Create an invoice"""
        # Create invoice
        invoice = stripe.Invoice.create(
            customer=invoice_data['customer_id'],
            description=invoice_data.get('description'),
            metadata=invoice_data.get('metadata', {}),
            auto_advance=False,  # Don't auto-finalize
            collection_method='send_invoice',
            days_until_due=invoice_data.get('days_until_due', 30)
        )
        
        # Add line items if provided
        for item in invoice_data.get('line_items', []):
            self.add_invoice_item(
                invoice.id,
                item['description'],
                item['amount'],
                item.get('quantity', 1)
            )
        
        return invoice
    
    def add_invoice_item(self, invoice_id: str, description: str, 
                        amount: float, quantity: int = 1) -> stripe.InvoiceItem:
        """Add item to an invoice"""
        invoice = stripe.Invoice.retrieve(invoice_id)
        
        return stripe.InvoiceItem.create(
            customer=invoice.customer,
            invoice=invoice_id,
            description=description,
            unit_amount=int(amount * 100),  # Convert to cents
            quantity=quantity
        )
    
    def send_invoice(self, invoice_id: str) -> stripe.Invoice:
        """Finalize and send invoice"""
        # First finalize the invoice
        invoice = stripe.Invoice.finalize_invoice(invoice_id)
        
        # Then send it
        return stripe.Invoice.send_invoice(invoice_id)
    
    def get_invoices(self, customer_id: Optional[str] = None, 
                    status: Optional[str] = None) -> List[stripe.Invoice]:
        """Get invoices with optional filters"""
        params = {'limit': 100}
        if customer_id:
            params['customer'] = customer_id
        if status:
            params['status'] = status
        
        invoices = stripe.Invoice.list(**params)
        return invoices.data
    
    # Payment Links
    def create_payment_link(self, link_data: Dict) -> stripe.PaymentLink:
        """Create a payment link for quick payments"""
        line_items = []
        
        for item in link_data['items']:
            # Create price if not exists
            if 'price_id' in item:
                price_id = item['price_id']
            else:
                price = self.create_price({
                    'product_id': item['product_id'],
                    'amount': item['amount']
                })
                price_id = price.id
            
            line_items.append({
                'price': price_id,
                'quantity': item.get('quantity', 1)
            })
        
        return stripe.PaymentLink.create(
            line_items=line_items,
            metadata=link_data.get('metadata', {}),
            after_completion={
                'type': 'redirect',
                'redirect': {
                    'url': link_data.get('success_url', 'https://pineaiconsulting.com/thank-you')
                }
            }
        )
    
    # Subscription Management
    def create_subscription(self, subscription_data: Dict) -> stripe.Subscription:
        """Create a subscription"""
        return stripe.Subscription.create(
            customer=subscription_data['customer_id'],
            items=[{'price': subscription_data['price_id']}],
            metadata=subscription_data.get('metadata', {}),
            trial_period_days=subscription_data.get('trial_days')
        )
    
    def cancel_subscription(self, subscription_id: str, 
                          at_period_end: bool = True) -> stripe.Subscription:
        """Cancel a subscription"""
        if at_period_end:
            return stripe.Subscription.modify(
                subscription_id,
                cancel_at_period_end=True
            )
        else:
            return stripe.Subscription.cancel(subscription_id)
    
    # Reporting
    def get_revenue_summary(self, start_date: datetime, end_date: datetime) -> Dict:
        """Get revenue summary for date range"""
        # Get successful charges
        charges = stripe.Charge.list(
            created={
                'gte': int(start_date.timestamp()),
                'lte': int(end_date.timestamp())
            },
            status='succeeded',
            limit=100
        )
        
        total_revenue = sum(charge.amount for charge in charges.data) / 100
        
        # Get invoices
        invoices = stripe.Invoice.list(
            created={
                'gte': int(start_date.timestamp()),
                'lte': int(end_date.timestamp())
            },
            status='paid',
            limit=100
        )
        
        invoice_revenue = sum(invoice.amount_paid for invoice in invoices.data) / 100
        
        return {
            'period_start': start_date.isoformat(),
            'period_end': end_date.isoformat(),
            'total_revenue': total_revenue,
            'invoice_revenue': invoice_revenue,
            'transaction_count': len(charges.data),
            'paid_invoices': len(invoices.data)
        }
    
    # Webhook handling
    def construct_webhook_event(self, payload: str, sig_header: str) -> stripe.Event:
        """Verify and construct webhook event"""
        webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
        
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
            return event
        except ValueError:
            # Invalid payload
            raise ValueError("Invalid webhook payload")
        except stripe.error.SignatureVerificationError:
            # Invalid signature
            raise ValueError("Invalid webhook signature")


# CLI interface
if __name__ == "__main__":
    import sys
    
    client = StripeClient()
    
    if len(sys.argv) < 2:
        print("Usage: python stripe_client.py [create_customer|create_invoice|create_payment_link|get_revenue]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "create_customer":
        # Example customer creation
        customer_data = {
            'email': 'test@example.com',
            'name': 'Test Customer',
            'phone': '+1234567890',
            'metadata': {
                'source': 'website',
                'company': 'Test Company'
            }
        }
        result = client.create_customer(customer_data)
        print(f"Created customer: {result.id}")
        print(json.dumps(result.to_dict(), indent=2))
    
    elif command == "create_invoice":
        if len(sys.argv) < 3:
            print("Usage: python stripe_client.py create_invoice <customer_email>")
            sys.exit(1)
        
        email = sys.argv[2]
        customer = client.search_customer_by_email(email)
        
        if not customer:
            print(f"No customer found with email: {email}")
            sys.exit(1)
        
        invoice_data = {
            'customer_id': customer.id,
            'description': 'AI Consulting Services',
            'line_items': [
                {
                    'description': 'AI Strategy Consultation - 2 hours',
                    'amount': 500.00,
                    'quantity': 1
                },
                {
                    'description': 'Custom AI Agent Development',
                    'amount': 2500.00,
                    'quantity': 1
                }
            ],
            'days_until_due': 30
        }
        
        invoice = client.create_invoice(invoice_data)
        print(f"Created invoice: {invoice.id}")
        print(f"Amount: ${invoice.amount_due / 100:.2f}")
    
    elif command == "create_payment_link":
        # First create a product
        product = client.create_product({
            'name': 'AI Consulting Hour',
            'description': 'One hour of AI consulting services'
        })
        
        link_data = {
            'items': [{
                'product_id': product.id,
                'amount': 250.00,
                'quantity': 1
            }],
            'success_url': 'https://pineaiconsulting.com/thank-you',
            'metadata': {
                'service': 'consulting'
            }
        }
        
        link = client.create_payment_link(link_data)
        print(f"Payment link created: {link.url}")
    
    elif command == "get_revenue":
        # Get last 30 days revenue
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30)
        
        summary = client.get_revenue_summary(start_date, end_date)
        print(json.dumps(summary, indent=2))