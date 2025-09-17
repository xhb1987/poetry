# Poetry Full-Stack Application

A full-stack Chinese poetry application for browsing and searching classical Chinese poetry (Shijing collection).

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm
- Docker (for PostgreSQL database)

### Installation & Setup

```bash
# Install all dependencies for root, backend, and frontend
npm run install:all

# Set up the database (starts Docker, runs migrations, seeds data)
npm run db:setup
```

### Development

#### Start Both Applications (Recommended)

```bash
# Start both backend and frontend simultaneously
npm start
```

This will start:

- Backend API server on http://localhost:3000
- Frontend development server on http://localhost:3001

#### Start Applications Individually

```bash
# Start only the backend (NestJS API)
npm run start:backend-only

# Start only the frontend (React + Vite)
npm run start:frontend-only
```

## Available Scripts

#### Development

- `npm start` - Start both backend and frontend
- `npm run start:backend` - Start backend only
- `npm run start:frontend` - Start frontend only

#### Database Management

- `npm run db:setup` - Complete database setup (Docker + migrate + seed)
- `npm run db:seed` - Seed the database with Chinese poetry data
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:studio` - Open Prisma Studio for database management

#### Docker

- `npm run docker:up` - Start PostgreSQL container
- `npm run docker:down` - Stop PostgreSQL container

#### Build & Deployment

- `npm run build` - Build both applications for production
- `npm run build:backend` - Build backend only
- `npm run build:frontend` - Build frontend only

#### Utilities

- `npm run install:all` - Install dependencies for all projects
- `npm run status` - Check if both servers are running
- `npm run clean` - Remove all node_modules and build folders

## Project Structure

```
poetry/
├── package.json          # Root package.json with convenience scripts
├── backend/              # NestJS API server
│   ├── src/
│   ├── prisma/
│   ├── docker-compose.yml
│   └── package.json
└── frontend/             # React + Vite application
    ├── src/
    ├── public/
    └── package.json
```

## Current Features

- 📚 Browse Chinese classical poetry (Shijing collection - 305 poems)
- 🔍 Full-text search functionality across title, content, author, chapter, and section
- 📅 Daily poetry feature with random poem selection
- 💾 PostgreSQL database with Prisma ORM
- ⚡ Hot reload for development
- 🎨 Modern React UI with TypeScript
- 🔄 State management with Zustand

## API Endpoints

- `GET /poetry/all-poetry` - Get all poetry
- `GET /poetry/search?q=term` - Search poetry
- `GET /poetry/daily` - Get daily poetry
- `GET /poetry/:id` - Get specific poetry by ID

## Tech Stack

### Backend

- **NestJS** - Node.js framework with TypeScript
- **PostgreSQL** - Database with Docker containerization
- **Prisma ORM** - Type-safe database access

### Frontend

- **React 19** - UI library with TypeScript
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management

## Development Tips

1. **First time setup**: Run `npm run db:setup` to initialize everything
2. **Daily development**: Use `npm start` to run both servers
3. **Database issues**: Use `npm run docker:down` then `npm run db:setup`
4. **View database**: Use `npm run db:studio` to open Prisma Studio

_If you have any suggestions or comments, please create an issue for discussion._
