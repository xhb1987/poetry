#!/bin/bash

# Local Docker Build and Test Script
set -e

echo "🐳 Building Poetry Application Docker Image"

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t poetry-app:latest .

echo "🧪 Testing the Docker image..."

# Check if the image was built successfully
if docker images poetry-app:latest --format "table {{.Repository}}:{{.Tag}}" | grep -q "poetry-app:latest"; then
    echo "✅ Docker image built successfully!"
else
    echo "❌ Failed to build Docker image"
    exit 1
fi

echo "📦 Image size:"
docker images poetry-app:latest --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}"

echo "🚀 To run the application locally:"
echo "   docker run -p 3000:3000 -e NODE_ENV=production poetry-app:latest"
echo ""
echo "🔧 To run with custom environment:"
echo "   docker run -p 3000:3000 --env-file .env poetry-app:latest"
echo ""
echo "🐙 To push to GCP Container Registry:"
echo "   docker tag poetry-app:latest gcr.io/YOUR_PROJECT_ID/poetry-app:latest"
echo "   docker push gcr.io/YOUR_PROJECT_ID/poetry-app:latest"