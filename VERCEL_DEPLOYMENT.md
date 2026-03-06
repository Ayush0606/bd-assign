# Vercel Deployment Guide

This guide will help you deploy your application to production.

## Architecture
- **Frontend**: Vercel (React app)
- **Backend**: Railway.app (Node.js/Express API)
- **Database**: MongoDB Atlas (already configured)

## Step 1: Deploy Backend to Railway

1. **Go to Railway**: https://railway.app/
2. **Sign up/Login** with GitHub
3. **Create New Project** → **Deploy from GitHub repo**
4. **Select**: `Ayush0606/bd-assign`
5. **Add Service** → **Select root directory** (it will auto-detect backend folder)
6. **Configure Environment Variables** in Railway:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://ayush0606:ayush%400606@cluster0.5ntwdgh.mongodb.net/taskmanagement
   JWT_SECRET=50db66bd40118048b9fb72eba368e672a03e728fad80032220d20c71be00b3efb1ff8efb2b2c2b738f92ee9f594e4e1db3456272288acd79a93aa4a12e6d8876
   JWT_EXPIRE=30d
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
7. **Set Root Directory**: `/backend`
8. **Deploy** - Railway will provide a URL like: `https://your-app.railway.app`

## Step 2: Update MongoDB Atlas

1. Go to MongoDB Atlas → Network Access
2. Add Railway IP: `0.0.0.0/0` (allows all IPs) or get specific Railway IPs
3. Save changes

## Step 3: Deploy Frontend to Vercel

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

3. **Create `.env.production`** with your Railway backend URL:
   ```
   REACT_APP_API_URL=https://your-app.railway.app/api/v1
   ```

4. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

5. Follow the prompts:
   - Link to existing project? **N** (No)
   - What's your project name? **bd-assign-frontend**
   - In which directory is your code? **.**
   - Want to override settings? **N**

## Step 4: Update Backend CORS

After Vercel gives you the frontend URL (e.g., `https://bd-assign-frontend.vercel.app`):

1. Go back to **Railway**
2. Update `CORS_ORIGIN` environment variable to your Vercel URL
3. **Redeploy** the backend

## Step 5: Test Your Live Application

1. Visit your Vercel URL
2. Register a new account
3. Test all features (create/edit/delete tasks, dark mode)

## Alternative: Deploy Backend to Vercel (Serverless)

If you prefer both on Vercel, the backend needs to be converted to serverless functions. This is more complex but possible.

## Useful Commands

```bash
# Deploy frontend to Vercel (from frontend directory)
vercel --prod

# Deploy frontend with environment variables
vercel --prod -e REACT_APP_API_URL=https://your-backend-url.railway.app/api/v1

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Environment Variables Checklist

### Backend (Railway)
- ✅ NODE_ENV=production
- ✅ MONGO_URI
- ✅ JWT_SECRET
- ✅ CORS_ORIGIN (set to Vercel URL)

### Frontend (Vercel)
- ✅ REACT_APP_API_URL (set to Railway backend URL)

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend matches your Vercel URL exactly
- Include `https://` in the URL

### MongoDB Connection
- Whitelist Railway IPs in MongoDB Atlas (0.0.0.0/0 or specific IPs)

### 404 on Routes
- Vercel's SPA routing is configured in `vercel.json`
- Ensure `rewrites` rule is present

## Cost
- **Vercel**: Free tier (generous limits)
- **Railway**: $5/month credit (enough for small apps)
- **MongoDB Atlas**: Free M0 tier

Your app is now live! 🚀
