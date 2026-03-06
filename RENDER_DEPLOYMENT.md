# Deploy to Render & Vercel - Complete Guide

## Overview
- **Backend**: Render (Free tier)
- **Frontend**: Vercel (Free tier)
- **Database**: MongoDB Atlas (Free tier)

Total Cost: **$0/month** 🎉

## Step 1: Deploy Backend to Render

### 1.1 Go to Render
1. Visit: https://render.com/
2. **Sign Up** with GitHub (use the same GitHub account with your repo)

### 1.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Ayush0606/bd-assign`
3. Configure the service:
   - **Name**: `bd-assign-backend`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Add Environment Variables
Click **"Advanced"** and add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://ayush0606:ayush%400606@cluster0.5ntwdgh.mongodb.net/taskmanagement
JWT_SECRET=50db66bd40118048b9fb72eba368e672a03e728fad80032220d20c71be00b3efb1ff8efb2b2c2b738f92ee9f594e4e1db3456272288acd79a93aa4a12e6d8876
JWT_EXPIRE=30d
CORS_ORIGIN=https://your-app-name.vercel.app
```

**Note**: We'll update `CORS_ORIGIN` after deploying the frontend.

### 1.4 Deploy
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://bd-assign-backend.onrender.com`)

## Step 2: Update MongoDB Atlas

1. Go to MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

This allows Render to connect to your database.

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Production Environment File
Create `frontend/.env.production` with your Render backend URL:

```bash
REACT_APP_API_URL=https://bd-assign-backend.onrender.com/api/v1
```

### 3.2 Login to Vercel
```bash
vercel login
```

Follow the prompts to authenticate (opens browser).

### 3.3 Deploy Frontend
```bash
cd frontend
vercel --prod
```

Answer the prompts:
- **Set up and deploy?** → Y
- **Which scope?** → Select your account
- **Link to existing project?** → N
- **Project name?** → bd-assign-frontend (or any name you prefer)
- **In which directory is your code?** → . (current directory)
- **Override settings?** → N

Vercel will:
1. Build your React app
2. Deploy to production
3. Give you a URL (e.g., `https://bd-assign-frontend.vercel.app`)

## Step 4: Update Backend CORS

Now that you have the Vercel URL:

1. Go back to **Render Dashboard**
2. Select your `bd-assign-backend` service
3. Go to **"Environment"** tab
4. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://bd-assign-frontend.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will automatically redeploy

## Step 5: Test Your Live Application! 🚀

1. Open your Vercel URL: `https://bd-assign-frontend.vercel.app`
2. Register a new account
3. Test features:
   - Create tasks
   - Edit tasks
   - Delete tasks (admin only)
   - Toggle dark mode
   - Test responsive design (on mobile)
4. Check API docs: `https://bd-assign-backend.onrender.com/api-docs`

## Important Notes

### Render Free Tier Limitations
- **Spins down after 15 minutes of inactivity**
- First request after inactivity takes 30-60 seconds (cold start)
- 750 hours/month free (enough for one service)

### Keeping Backend Awake (Optional)
Use a service like UptimeRobot or cron-job.org to ping your backend every 10 minutes:
- Ping URL: `https://bd-assign-backend.onrender.com/health`

### Custom Domain (Optional)
Both Render and Vercel support custom domains for free:
- Render: Settings → Custom Domains
- Vercel: Settings → Domains

## Troubleshooting

### Backend won't start on Render
**Issue**: Build failed or service unhealthy

**Solutions**:
1. Check Render logs for errors
2. Verify all environment variables are set correctly
3. Ensure `backend/package.json` has start script: `"start": "node server.js"`
4. Check MongoDB IP whitelist includes 0.0.0.0/0

### Frontend can't connect to backend
**Issue**: API calls failing, CORS errors

**Solutions**:
1. Verify `CORS_ORIGIN` in Render matches your Vercel URL exactly
2. Check `REACT_APP_API_URL` in Vercel environment variables
3. Ensure backend URL includes `/api/v1` at the end
4. Wait for Render backend to wake up (30-60 seconds on free tier)

### Dark mode not working
**Issue**: Theme not persisting

**Solution**: This is a browser localStorage issue, should work fine. Clear cache if needed.

## Updating Your App

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render auto-deploys from GitHub!

### Update Frontend
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push origin main
vercel --prod
```

## Costs Breakdown
| Service | Plan | Cost |
|---------|------|------|
| Render Backend | Free | $0 |
| Vercel Frontend | Free | $0 |
| MongoDB Atlas | M0 Free | $0 |
| **Total** | | **$0/month** |

## Your Live URLs
- **Frontend**: https://[your-app].vercel.app
- **Backend**: https://bd-assign-backend.onrender.com
- **API Docs**: https://bd-assign-backend.onrender.com/api-docs

Congratulations! Your app is now live on the internet! 🎉
