# Database Management Guide

This guide explains how to manage database schema changes, migrations, and data updates in both development and production environments.

## 1. Schema Changes (Migrations)

### Development Workflow:

```bash
# 1. Make changes to prisma/schema.prisma
# 2. Create and apply migration
npm run db:migrate

# 3. Generate updated Prisma client
npm run db:generate

# 4. Rebuild Docker image (if using containers)
npm run docker:build
```

### Production/Docker Workflow:

```bash
# 1. Apply migrations in production database
docker exec poetry_app npx prisma migrate deploy

# Or from host machine (connecting to containerized DB)
DATABASE_URL="postgresql://postgres:password123@localhost:5432/poetry_db" npx prisma migrate deploy
```

## 2. Data Import/Export

### Seeding Database:

```bash
# Development
npm run db:seed

# Production/Docker
docker exec poetry_app npm run db:seed

# Or from host
DATABASE_URL="postgresql://postgres:password123@localhost:5432/poetry_db" npm run db:seed
```

### Custom Data Import:

```bash
# Create custom import script in scripts/ directory
# Run via Docker exec or with DATABASE_URL
```

## 3. Database Reset (⚠️ DESTRUCTIVE)

```bash
# Development only - resets entire database
npm run db:reset

# Docker environment
docker exec poetry_app npx prisma migrate reset --force
```

## 4. Database Management with Docker Compose

### Start with fresh database:

```bash
# Remove volumes and restart
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml up --build
```

### Apply migrations to running containers:

```bash
# Check container status
docker ps

# Apply migrations
docker exec poetry_app npx prisma migrate deploy

# Seed data if needed
docker exec poetry_app npm run db:seed
```

## 5. Backup and Restore

### Backup:

```bash
# Backup from Docker container
docker exec poetry_postgres_prod pg_dump -U postgres poetry_db > backup.sql

# Or from host
pg_dump postgresql://postgres:password123@localhost:5432/poetry_db > backup.sql
```

### Restore:

```bash
# Restore to Docker container
docker exec -i poetry_postgres_prod psql -U postgres poetry_db < backup.sql

# Or from host
psql postgresql://postgres:password123@localhost:5432/poetry_db < backup.sql
```

## 6. Environment-Specific Considerations

### Development:

- Use `prisma migrate dev` for interactive migration creation
- Safe to use `prisma migrate reset` for clean starts
- Use `prisma studio` for GUI database management

### Staging/Production:

- Always use `prisma migrate deploy` (non-interactive)
- Never use `migrate reset` in production
- Test migrations in staging first
- Consider migration rollback strategies
- Use proper backup procedures before major changes

## Common Commands Quick Reference:

```bash
# Schema changes
npm run db:migrate          # Create & apply migration (dev)
npm run db:generate         # Update Prisma client

# Data management
npm run db:seed            # Populate with seed data
npm run db:reset           # Reset entire database (dev only)

# Docker database management
npm run docker:up          # Start database
npm run docker:down        # Stop database
npm run docker:logs        # View logs

# Production migration
docker exec poetry_app npx prisma migrate deploy
```
