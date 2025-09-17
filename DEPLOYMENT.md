# Poetry App - Docker & GCP Deployment Guide

## 🐳 Docker Setup

This project includes a complete Docker setup that combines both frontend and backend into a single optimized container for production deployment.

### Architecture

- **Multi-stage build** for optimized image size
- **Frontend**: Built with Vite and served as static files
- **Backend**: NestJS application serving both API and frontend
- **Database**: PostgreSQL with Docker support
- **Security**: Non-root user, health checks, proper signal handling

### Local Docker Development

#### 1. Build the Docker Image

```bash
# Build the application image
npm run docker:build

# Or manually:
docker build -t poetry-app:latest .
```

#### 2. Run with Docker Compose (Recommended)

```bash
# Start the full application stack (app + database)
npm run docker:prod

# View logs
npm run docker:prod:logs

# Stop the application
npm run docker:prod:down
```

#### 3. Run Single Container

```bash
# Run just the app (requires external database)
npm run docker:run

# Or with custom environment
docker run -p 3000:3000 --env-file .env poetry-app:latest
```

## ☁️ Google Cloud Platform Deployment

### Prerequisites

1. **Google Cloud SDK**: [Install gcloud CLI](https://cloud.google.com/sdk/docs/install)
2. **Docker**: For building images
3. **GCP Project**: With billing enabled

### Automated Deployment

```bash
# Deploy to GCP Cloud Run
npm run gcp:deploy YOUR_PROJECT_ID us-central1

# Or manually:
./scripts/deploy-gcp.sh YOUR_PROJECT_ID us-central1
```

### Manual GCP Deployment

#### 1. Setup GCP Project

```bash
# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

#### 2. Build and Push Image

```bash
# Build image
docker build -t gcr.io/YOUR_PROJECT_ID/poetry-app:latest .

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/poetry-app:latest
```

#### 3. Deploy to Cloud Run

```bash
gcloud run deploy poetry-app \
    --image gcr.io/YOUR_PROJECT_ID/poetry-app:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production,PORT=3000
```

### Database Setup on GCP

#### Option 1: Cloud SQL (Recommended for Production)

```bash
# Create Cloud SQL instance
gcloud sql instances create poetry-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1

# Create database
gcloud sql databases create poetry_db --instance=poetry-db

# Create user
gcloud sql users create poetry-user \
    --instance=poetry-db \
    --password=YOUR_SECURE_PASSWORD
```

#### Option 2: Containerized Database

The `docker-compose.prod.yml` includes a PostgreSQL container suitable for development or small deployments.

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Copy template
cp .env.example .env

# Edit with your values
nano .env
```

**Required Variables:**

- `POSTGRES_PASSWORD`: Database password
- `JWT_SECRET`: JWT signing secret (32+ characters)
- `DATABASE_URL`: Full database connection string

**For Cloud SQL:**

```
DATABASE_URL=postgresql://poetry-user:YOUR_PASSWORD@/poetry_db?host=/cloudsql/YOUR_PROJECT_ID:us-central1:poetry-db
```

### GCP Secrets Management

```bash
# Create secrets for sensitive data
gcloud secrets create poetry-secrets --data-file=.env

# Grant Cloud Run access to secrets
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:YOUR_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
```

## 🔧 Configuration

### Frontend Configuration

The frontend is built and served as static files. React Router is handled by the backend serving `index.html` for non-API routes.

### Backend Configuration

- **Static Files**: Serves frontend build from `/public` directory
- **CORS**: Configured for production with proper origins
- **Health Checks**: Available at root path (`/`)
- **API Routes**: All API routes prefixed with `/poetry`

## 📊 Monitoring & Logs

### Local Development

```bash
# View Docker logs
docker logs poetry_app

# View compose logs
npm run docker:prod:logs
```

### GCP Cloud Run

```bash
# View service logs
gcloud logs tail --service=poetry-app

# View specific deployment logs
gcloud run services describe poetry-app --region=us-central1
```

## 🚀 Production Checklist

- [ ] Update `.env` with production values
- [ ] Change default passwords
- [ ] Configure proper JWT secret
- [ ] Set up Cloud SQL or external database
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and alerting
- [ ] Configure SSL/TLS certificates
- [ ] Review resource limits and scaling settings

## 🔒 Security Notes

- Container runs as non-root user
- Secrets managed through GCP Secret Manager
- CORS properly configured
- Database connection encrypted
- No sensitive data in Docker images

## 📈 Scaling & Performance

- **Cloud Run**: Auto-scaling from 1-10 instances
- **Memory**: 512Mi allocated (adjustable)
- **CPU**: 1 vCPU allocated (adjustable)
- **Database**: Consider connection pooling for high traffic

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**: Check Docker daemon is running
2. **Database Connection**: Verify DATABASE_URL format
3. **Port Issues**: Ensure port 3000 is available
4. **GCP Permissions**: Check IAM roles and API enablement

### Debug Commands

```bash
# Test local Docker build
docker run -it poetry-app:latest /bin/sh

# Check GCP deployment
gcloud run services describe poetry-app --region=us-central1

# View build logs
gcloud builds log BUILD_ID
```
