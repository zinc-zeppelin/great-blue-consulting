#!/usr/bin/env python3
"""
Database initialization script for PineAI Consulting
Creates necessary tables and initial data
"""

import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from dotenv import load_dotenv

load_dotenv()


def get_db_connection(database=None):
    """Get database connection"""
    conn_params = {
        'host': os.getenv('POSTGRES_HOST', 'localhost'),
        'port': os.getenv('POSTGRES_PORT', '5432'),
        'user': os.getenv('POSTGRES_USER', 'pineai'),
        'password': os.getenv('POSTGRES_PASSWORD', 'pineai123')
    }
    
    if database:
        conn_params['database'] = database
    
    return psycopg2.connect(**conn_params)


def create_database():
    """Create the database if it doesn't exist"""
    db_name = os.getenv('POSTGRES_DB', 'pineai')
    
    # Connect to PostgreSQL server
    conn = get_db_connection()
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Check if database exists
    cursor.execute(
        "SELECT 1 FROM pg_database WHERE datname = %s",
        (db_name,)
    )
    
    if not cursor.fetchone():
        print(f"Creating database '{db_name}'...")
        cursor.execute(f"CREATE DATABASE {db_name}")
        print(f"Database '{db_name}' created successfully!")
    else:
        print(f"Database '{db_name}' already exists.")
    
    cursor.close()
    conn.close()


def create_tables():
    """Create necessary tables"""
    db_name = os.getenv('POSTGRES_DB', 'pineai')
    conn = get_db_connection(database=db_name)
    cursor = conn.cursor()
    
    # Clients table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(50),
            company VARCHAR(255),
            zoho_lead_id VARCHAR(100),
            paymo_client_id VARCHAR(100),
            stripe_customer_id VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Projects table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients(id),
            name VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50) DEFAULT 'active',
            paymo_project_id VARCHAR(100),
            start_date DATE,
            end_date DATE,
            budget DECIMAL(10, 2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Invoices table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS invoices (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients(id),
            project_id INTEGER REFERENCES projects(id),
            invoice_number VARCHAR(50) UNIQUE NOT NULL,
            stripe_invoice_id VARCHAR(100),
            paymo_invoice_id VARCHAR(100),
            amount DECIMAL(10, 2) NOT NULL,
            status VARCHAR(50) DEFAULT 'draft',
            due_date DATE,
            paid_date DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Communications log
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS communications (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES clients(id),
            type VARCHAR(50) NOT NULL, -- email, sms, call
            direction VARCHAR(10) NOT NULL, -- inbound, outbound
            subject VARCHAR(255),
            content TEXT,
            metadata JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Automation logs
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS automation_logs (
            id SERIAL PRIMARY KEY,
            workflow_name VARCHAR(255) NOT NULL,
            execution_id VARCHAR(100),
            status VARCHAR(50) NOT NULL,
            input_data JSONB,
            output_data JSONB,
            error_message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # API keys table (for secure storage)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS api_keys (
            id SERIAL PRIMARY KEY,
            service VARCHAR(100) NOT NULL UNIQUE,
            key_hash VARCHAR(255) NOT NULL,
            last_used TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Create indexes
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_communications_client ON communications(client_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_automation_logs_workflow ON automation_logs(workflow_name)")
    
    # Create update trigger function
    cursor.execute("""
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ language 'plpgsql';
    """)
    
    # Add update triggers
    tables_with_updated_at = ['clients', 'projects', 'invoices', 'api_keys']
    for table in tables_with_updated_at:
        cursor.execute(f"""
            DROP TRIGGER IF EXISTS update_{table}_updated_at ON {table};
            CREATE TRIGGER update_{table}_updated_at
            BEFORE UPDATE ON {table}
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        """)
    
    conn.commit()
    print("Tables created successfully!")
    
    cursor.close()
    conn.close()


def create_views():
    """Create useful database views"""
    db_name = os.getenv('POSTGRES_DB', 'pineai')
    conn = get_db_connection(database=db_name)
    cursor = conn.cursor()
    
    # Client summary view
    cursor.execute("""
        CREATE OR REPLACE VIEW client_summary AS
        SELECT 
            c.id,
            c.name,
            c.email,
            c.company,
            COUNT(DISTINCT p.id) as project_count,
            COUNT(DISTINCT i.id) as invoice_count,
            COALESCE(SUM(i.amount), 0) as total_revenue,
            COALESCE(SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END), 0) as paid_revenue,
            MAX(comm.created_at) as last_contact
        FROM clients c
        LEFT JOIN projects p ON c.id = p.client_id
        LEFT JOIN invoices i ON c.id = i.client_id
        LEFT JOIN communications comm ON c.id = comm.client_id
        GROUP BY c.id, c.name, c.email, c.company
    """)
    
    # Project status view
    cursor.execute("""
        CREATE OR REPLACE VIEW project_status AS
        SELECT 
            p.id,
            p.name,
            c.name as client_name,
            p.status,
            p.start_date,
            p.end_date,
            p.budget,
            COUNT(DISTINCT i.id) as invoice_count,
            COALESCE(SUM(i.amount), 0) as total_invoiced,
            COALESCE(SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END), 0) as total_paid
        FROM projects p
        JOIN clients c ON p.client_id = c.id
        LEFT JOIN invoices i ON p.id = i.project_id
        GROUP BY p.id, p.name, c.name, p.status, p.start_date, p.end_date, p.budget
    """)
    
    # Revenue dashboard view
    cursor.execute("""
        CREATE OR REPLACE VIEW revenue_dashboard AS
        SELECT 
            DATE_TRUNC('month', i.created_at) as month,
            COUNT(DISTINCT i.id) as invoice_count,
            COUNT(DISTINCT i.client_id) as client_count,
            SUM(i.amount) as total_amount,
            SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END) as paid_amount,
            SUM(CASE WHEN i.status = 'draft' THEN i.amount ELSE 0 END) as draft_amount,
            SUM(CASE WHEN i.status = 'sent' THEN i.amount ELSE 0 END) as pending_amount
        FROM invoices i
        GROUP BY DATE_TRUNC('month', i.created_at)
        ORDER BY month DESC
    """)
    
    conn.commit()
    print("Views created successfully!")
    
    cursor.close()
    conn.close()


def insert_sample_data():
    """Insert sample data for testing"""
    db_name = os.getenv('POSTGRES_DB', 'pineai')
    conn = get_db_connection(database=db_name)
    cursor = conn.cursor()
    
    # Check if we already have data
    cursor.execute("SELECT COUNT(*) FROM clients")
    if cursor.fetchone()[0] > 0:
        print("Sample data already exists, skipping...")
        cursor.close()
        conn.close()
        return
    
    # Insert sample client
    cursor.execute("""
        INSERT INTO clients (name, email, phone, company)
        VALUES 
        ('John Doe', 'john@example.com', '+1234567890', 'Example Corp'),
        ('Jane Smith', 'jane@techco.com', '+0987654321', 'TechCo Inc')
        RETURNING id
    """)
    client_ids = [row[0] for row in cursor.fetchall()]
    
    # Insert sample projects
    cursor.execute("""
        INSERT INTO projects (client_id, name, description, status, budget)
        VALUES 
        (%s, 'AI Chatbot Development', 'Custom chatbot for customer service', 'active', 15000),
        (%s, 'Process Automation', 'Automate invoice processing workflow', 'planning', 8000)
    """, (client_ids[0], client_ids[1]))
    
    # Insert sample invoices
    cursor.execute("""
        INSERT INTO invoices (client_id, invoice_number, amount, status, due_date)
        VALUES 
        (%s, 'INV-2025-001', 5000, 'paid', CURRENT_DATE + INTERVAL '30 days'),
        (%s, 'INV-2025-002', 3000, 'sent', CURRENT_DATE + INTERVAL '15 days')
    """, (client_ids[0], client_ids[1]))
    
    conn.commit()
    print("Sample data inserted successfully!")
    
    cursor.close()
    conn.close()


def main():
    """Main execution"""
    print("Initializing PineAI Consulting database...")
    
    try:
        # Create database
        create_database()
        
        # Create tables
        create_tables()
        
        # Create views
        create_views()
        
        # Insert sample data
        insert_sample_data()
        
        print("\nDatabase initialization complete!")
        print("You can now connect to the database with:")
        print(f"  Host: {os.getenv('POSTGRES_HOST', 'localhost')}")
        print(f"  Port: {os.getenv('POSTGRES_PORT', '5432')}")
        print(f"  Database: {os.getenv('POSTGRES_DB', 'pineai')}")
        print(f"  User: {os.getenv('POSTGRES_USER', 'pineai')}")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()