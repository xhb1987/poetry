# Backend-only Docker build for Poetry Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./
RUN npm ci

# Copy backend source code
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Build the backend
RUN npm run build

# Install only production dependencies for runtime
RUN npm ci --only=production && npm cache clean --force

# Production image
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S poetry -u 1001

# Copy backend built application
COPY --from=builder --chown=poetry:nodejs /app/dist ./dist
COPY --from=builder --chown=poetry:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=poetry:nodejs /app/prisma ./prisma
COPY --from=builder --chown=poetry:nodejs /app/package*.json ./

# Expose port
EXPOSE 3000

# Switch to non-root user
USER poetry

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/src/main"]