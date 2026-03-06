# Deployment Scripts

This directory contains scripts to help with deployment tasks.

## Available Scripts

### generate-jwt-secret.js
Generates a cryptographically secure JWT secret.

**Usage:**
```bash
npm run generate:secret
```

### check-env.js
Validates environment variables before deployment.

**Usage:**
```bash
npm run check:env
```

## Quick Commands

### Install Production Dependencies
```bash
cd backend
npm install helmet express-mongo-sanitize express-rate-limit compression
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Test Production Build Locally
```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend (serve build folder)
cd frontend
npx serve -s build -l 3000
```

### Docker Production Build
```bash
# Build and run with docker-compose
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Health Checks
```bash
# Backend health check
curl https://api.yourdomain.com/health

# Frontend check
curl -I https://yourdomain.com
```

## Environment Variables Checklist

Before deploying, ensure all environment variables are set:

### Backend (.env)
- [ ] NODE_ENV=production
- [ ] MONGO_URI (production database)
- [ ] JWT_SECRET (64+ character random string)
- [ ] CORS_ORIGIN (production frontend URL)
- [ ] PORT (default: 5000)

### Frontend (.env.production)
- [ ] REACT_APP_API_URL (production backend URL)

## Monitoring Commands

### Check Server Status
```bash
# PM2 status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart all
```

### MongoDB Status
```bash
# Connect to MongoDB
mongosh "your_production_connection_string"

# Check database
use taskmanagement
db.stats()
```

## Rollback Commands

```bash
# PM2 rollback
pm2 reload ecosystem.config.js

# Docker rollback
docker-compose -f docker-compose.prod.yml down
# Deploy previous image/commit
docker-compose -f docker-compose.prod.yml up -d
```
