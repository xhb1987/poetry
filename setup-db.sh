#!/bin/bash

# Poetry Backend Database Setup Script
echo "Setting up Poetry Database..."

# Create database user and database
psql -d postgres << EOF
-- Create user if not exists
DO
\$\$BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE  usename = 'postgres') THEN
        CREATE USER postgres WITH PASSWORD 'password123';
    END IF;
END\$\$;

-- Grant privileges
ALTER USER postgres CREATEDB;
ALTER USER postgres WITH SUPERUSER;

-- Create database if not exists
SELECT 'CREATE DATABASE poetry_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'poetry_db')\gexec

-- Grant all privileges to user
GRANT ALL PRIVILEGES ON DATABASE poetry_db TO postgres;

EOF

echo "Database setup completed!"
echo "Next steps:"
echo "1. cd backend"
echo "2. npm run db:migrate"
echo "3. npm run db:seed"
echo "4. npm run start:dev"
