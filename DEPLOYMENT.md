# Deployment Guide

Your URL shortener app has been configured for production deployment. Here are the deployment options:

## Option 1: Deploy to Render (Recommended for Full-Stack)

### Backend Deployment:
1. Push your code to GitHub
2. Go to [Render.com](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Set the following:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_connection_string
     FRONTEND_URL=https://your-frontend-url.onrender.com
     ```

### Frontend Deployment:
1. Create another Web Service on Render
2. Set the following:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npx serve -s build -l 3000`
   - **Environment Variables**:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com
     ```

## Option 2: Deploy to Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy backend: `cd backend && railway up`
4. Deploy frontend: `cd frontend && railway up`

## Option 3: Deploy to Vercel (Frontend) + Railway (Backend)

### Backend (Railway):
```bash
cd backend
railway login
railway up
```

### Frontend (Vercel):
```bash
cd frontend
npm install -g vercel
vercel --prod
```

## Environment Variables Setup

### Backend (.env):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env):
```
REACT_APP_API_URL=https://your-backend-domain.com
```

## MongoDB Setup

For production, use MongoDB Atlas:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to your backend environment variables

## Testing Production Build Locally

```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend (in another terminal)
cd frontend
npm run build
npx serve -s build
```

## Troubleshooting

- **CORS Issues**: Ensure FRONTEND_URL is set correctly in backend
- **API Calls Failing**: Check REACT_APP_API_URL in frontend
- **Database Connection**: Verify MongoDB connection string
- **Port Issues**: Most platforms auto-assign ports, ensure you're using `process.env.PORT`
