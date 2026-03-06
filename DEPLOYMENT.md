# Production Deployment Guide

This guide covers deploying the Task Management application to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Security Checklist](#security-checklist)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Database Setup](#database-setup)
7. [Monitoring & Logging](#monitoring--logging)

---

## Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (or self-hosted MongoDB)
- Domain name configured
- SSL certificate (Let's Encrypt recommended)
- Production server (e.g., AWS, DigitalOcean, Heroku, Vercel)

---

## Environment Setup

### 1. Generate Strong JWT Secret

```bash
# Run this command to generate a secure random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Backend Environment Variables

Create `.env` file in the `backend` directory:

```bash
cd backend
cp .env.production.example .env
```

Update the following variables:
- `NODE_ENV=production`
- `MONGO_URI` - Your production MongoDB connection string
- `JWT_SECRET` - Generated secret from step 1
- `CORS_ORIGIN` - Your production frontend URL (e.g., https://yourdomain.com)
- `PORT` - Production port (default: 5000)

### 3. Frontend Environment Variables

Create `.env.production` file in the `frontend` directory:

```bash
cd frontend
cp .env.production.example .env.production
```

Update:
- `REACT_APP_API_URL` - Your production backend URL (e.g., https://api.yourdomain.com/api/v1)

---

## Security Checklist

✅ **Before Deploying:**

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Update MongoDB connection string (production database)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS with production frontend URL
- [ ] Enable HTTPS/SSL on both frontend and backend
- [ ] Set secure MongoDB user with minimal permissions
- [ ] Review and update rate limiting settings
- [ ] Enable firewall rules (only allow necessary ports)
- [ ] Set up monitoring and error tracking
- [ ] Remove console.log statements from production code
- [ ] Test all API endpoints in production environment

---

## Backend Deployment

### Option 1: Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set CORS_ORIGIN="https://your-frontend-domain.com"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Deploy to VPS (Ubuntu)

```bash
# Install dependencies
sudo apt update
sudo apt install nodejs npm nginx

# Clone repository
git clone your-repo-url
cd bd-assign/backend

# Install dependencies
npm install --production

# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start server.js --name task-management-api

# Set PM2 to start on boot
pm2 startup
pm2 save

# Configure Nginx as reverse proxy
sudo nano /etc/nginx/sites-available/task-api

# Add configuration:
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/task-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Option 3: Deploy with Docker

```bash
# Build Docker image
docker build -t task-management-backend ./backend

# Run container
docker run -d \
  --name task-backend \
  -p 5000:5000 \
  --env-file backend/.env \
  task-management-backend

# Or use Docker Compose
docker-compose up -d
```

---

## Frontend Deployment

### Option 1: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variables in Vercel dashboard
# Or via CLI:
vercel env add REACT_APP_API_URL production
```

### Option 2: Deploy to Netlify

```bash
# Build the app
cd frontend
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build

# Set environment variables in Netlify dashboard
```

### Option 3: Deploy to VPS

```bash
# Build the app
cd frontend
npm run build

# Copy build folder to server
scp -r build/* user@server:/var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/task-frontend

# Add configuration:
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}

# Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/task-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL
sudo certbot --nginx -d yourdomain.com
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Production Cluster**
   - Go to MongoDB Atlas dashboard
   - Create a new cluster or use existing
   - Select appropriate tier based on usage

2. **Configure Network Access**
   - Add your production server's IP address
   - Or use 0.0.0.0/0 with strong authentication

3. **Create Database User**
   - Create dedicated user for production
   - Use strong password
   - Grant only required permissions

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Update `MONGO_URI` in backend `.env`

---

## Monitoring & Logging

### 1. Application Monitoring

**Install PM2 (if using VPS):**
```bash
pm2 install pm2-logrotate
pm2 logs task-management-api
```

**or use Heroku logs:**
```bash
heroku logs --tail --app your-app-name
```

### 2. Error Tracking

**Integrate Sentry (Optional):**

```bash
# Backend
npm install @sentry/node

# Add to server.js:
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### 3. Performance Monitoring

- Set up uptime monitoring (e.g., UptimeRobot, Pingdom)
- Monitor API response times
- Track database performance in MongoDB Atlas

---

## Post-Deployment Testing

1. **Test API Endpoints:**
   ```bash
   # Health check
   curl https://api.yourdomain.com/health

   # Register user
   curl -X POST https://api.yourdomain.com/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"Test123","role":"user"}'
   ```

2. **Test Frontend:**
   - Visit your production URL
   - Test registration and login
   - Create, edit, delete tasks
   - Test dark mode toggle
   - Check mobile responsiveness

3. **Security Testing:**
   - Test rate limiting
   - Verify HTTPS is working
   - Check CORS configuration
   - Test with invalid JWT tokens

---

## Maintenance

### Regular Tasks

- Monitor error logs daily
- Review MongoDB Atlas metrics
- Update dependencies monthly (`npm audit`, `npm update`)
- Back up database regularly
- Review and rotate JWT secrets periodically
- Monitor disk space and server resources

### Scaling

- **Horizontal Scaling:** Add more server instances with load balancer
- **Database Scaling:** Upgrade MongoDB Atlas tier or add read replicas
- **CDN:** Use Cloudflare or similar for frontend assets
- **Caching:** Implement Redis for frequently accessed data

---

## Rollback Plan

If deployment fails:

1. **Backend:**
   ```bash
   pm2 restart task-management-api
   # or
   heroku releases:rollback
   ```

2. **Frontend:**
   - Deploy previous build folder
   - Or use hosting platform's rollback feature

3. **Database:**
   - Restore from backup
   - MongoDB Atlas supports point-in-time recovery

---

## Support & Troubleshooting

### Common Issues

**Issue: MongoDB connection timeout**
- Check network access whitelist in MongoDB Atlas
- Verify connection string is correct
- Check firewall rules

**Issue: CORS errors**
- Ensure `CORS_ORIGIN` matches frontend URL exactly
- Include protocol (https://) in origin

**Issue: 502 Bad Gateway**
- Check if backend server is running
- Verify port configuration in Nginx
- Check backend logs for errors

---

## Additional Resources

- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Deployment Documentation](https://create-react-app.dev/docs/deployment/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Let's Encrypt SSL Setup](https://letsencrypt.org/getting-started/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

## Contact

For issues or questions, please refer to the main README.md or create an issue in the repository.
