#!/bin/bash

# GCP Poetry App Deployment Script
set -e

# Configuration
PROJECT_ID=${1:-"your-gcp-project-id"}
REGION=${2:-"us-central1"}
SERVICE_NAME="poetry-app"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Starting deployment to Google Cloud Platform"
echo "📋 Project ID: ${PROJECT_ID}"
echo "🌍 Region: ${REGION}"
echo "🐳 Image: ${IMAGE_NAME}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "📥 Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Error: Docker is not running"
    echo "🐳 Please start Docker and try again"
    exit 1
fi

# Set the active project
echo "🔧 Setting active GCP project..."
gcloud config set project ${PROJECT_ID}

# Enable required APIs
echo "⚙️ Enabling required GCP APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and push Docker image
echo "🔨 Building Docker image..."
docker build -t ${IMAGE_NAME}:latest .

echo "📤 Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}:latest

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME}:latest \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 3000 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production,PORT=3000 \
    --timeout 300

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region=${REGION} --format='value(status.url)')

echo "✅ Deployment completed successfully!"
echo "🌐 Service URL: ${SERVICE_URL}"
echo "📊 View logs: gcloud logs tail --service=${SERVICE_NAME}"
echo "🔧 Update service: gcloud run services update ${SERVICE_NAME} --region=${REGION}"

# Optional: Set up custom domain
read -p "🔗 Do you want to set up a custom domain? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "🌐 Enter your domain name: " DOMAIN_NAME
    echo "🔧 Setting up domain mapping..."
    gcloud run domain-mappings create --service ${SERVICE_NAME} --domain ${DOMAIN_NAME} --region ${REGION}
    echo "📝 Add this CNAME record to your DNS:"
    echo "   Name: ${DOMAIN_NAME}"
    echo "   Value: ghs.googlehosted.com"
fi

echo "🎉 Deployment completed! Your Poetry app is now live!"