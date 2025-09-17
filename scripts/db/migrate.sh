#!/bin/bash

# Database Migration Script for Docker Environment
# This script handles database migrations in containerized environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="poetry_app"
DB_CONTAINER_NAME="poetry_postgres_prod"
DATABASE_URL="postgresql://postgres:password123@localhost:5432/poetry_db"

echo -e "${BLUE}🐳 Poetry Database Migration Tool${NC}"
echo "=================================="

# Check if containers are running
check_containers() {
    if ! docker ps --format "table {{.Names}}" | grep -q "$CONTAINER_NAME"; then
        echo -e "${RED}❌ Container '$CONTAINER_NAME' is not running${NC}"
        echo -e "${YELLOW}💡 Start containers with: npm run docker:up${NC}"
        exit 1
    fi
    
    if ! docker ps --format "table {{.Names}}" | grep -q "$DB_CONTAINER_NAME"; then
        echo -e "${RED}❌ Database container '$DB_CONTAINER_NAME' is not running${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Containers are running${NC}"
}

# Apply migrations
apply_migrations() {
    echo -e "${BLUE}📦 Applying database migrations...${NC}"
    
    if docker exec "$CONTAINER_NAME" npx prisma migrate deploy; then
        echo -e "${GREEN}✅ Migrations applied successfully${NC}"
    else
        echo -e "${RED}❌ Migration failed${NC}"
        exit 1
    fi
}

# Generate Prisma client
generate_client() {
    echo -e "${BLUE}🔧 Generating Prisma client...${NC}"
    
    if docker exec "$CONTAINER_NAME" npx prisma generate; then
        echo -e "${GREEN}✅ Prisma client generated successfully${NC}"
    else
        echo -e "${RED}❌ Client generation failed${NC}"
        exit 1
    fi
}

# Seed database
seed_database() {
    echo -e "${BLUE}🌱 Seeding database...${NC}"
    
    if docker exec "$CONTAINER_NAME" npm run db:seed; then
        echo -e "${GREEN}✅ Database seeded successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Seeding failed or no seed data available${NC}"
    fi
}

# Check migration status
check_status() {
    echo -e "${BLUE}📊 Checking migration status...${NC}"
    docker exec "$CONTAINER_NAME" npx prisma migrate status
}

# Create backup
create_backup() {
    timestamp=$(date +"%Y%m%d_%H%M%S")
    backup_file="backup_${timestamp}.sql"
    
    echo -e "${BLUE}💾 Creating database backup: $backup_file${NC}"
    
    if docker exec "$DB_CONTAINER_NAME" pg_dump -U postgres poetry_db > "$backup_file"; then
        echo -e "${GREEN}✅ Backup created: $backup_file${NC}"
    else
        echo -e "${RED}❌ Backup failed${NC}"
        exit 1
    fi
}

# Main menu
show_menu() {
    echo ""
    echo "Select an action:"
    echo "1) Apply migrations"
    echo "2) Generate Prisma client"
    echo "3) Seed database"
    echo "4) Check migration status"
    echo "5) Create backup"
    echo "6) Full migration workflow (migrate + generate + seed)"
    echo "7) Exit"
    echo ""
}

# Full workflow
full_workflow() {
    echo -e "${BLUE}🚀 Running full migration workflow...${NC}"
    apply_migrations
    generate_client
    seed_database
    echo -e "${GREEN}🎉 Full workflow completed!${NC}"
}

# Parse command line arguments
case "${1:-menu}" in
    "migrate")
        check_containers
        apply_migrations
        ;;
    "generate")
        check_containers
        generate_client
        ;;
    "seed")
        check_containers
        seed_database
        ;;
    "status")
        check_containers
        check_status
        ;;
    "backup")
        check_containers
        create_backup
        ;;
    "full")
        check_containers
        full_workflow
        ;;
    "menu"|*)
        check_containers
        
        while true; do
            show_menu
            read -p "Enter your choice (1-7): " choice
            
            case $choice in
                1) apply_migrations ;;
                2) generate_client ;;
                3) seed_database ;;
                4) check_status ;;
                5) create_backup ;;
                6) full_workflow ;;
                7) 
                    echo -e "${GREEN}👋 Goodbye!${NC}"
                    exit 0
                    ;;
                *) 
                    echo -e "${RED}❌ Invalid option. Please try again.${NC}"
                    ;;
            esac
            echo ""
        done
        ;;
esac