# URL Shortener App

A full-stack MERN application for shortening URLs with click tracking and an admin dashboard.

## Features

- ✅ Shorten long URLs with custom short codes
- ✅ Redirect short URLs to original long URLs
- ✅ Click tracking for analytics
- ✅ Admin dashboard to view all URLs and statistics
- ✅ Modern, responsive UI
- ✅ Copy to clipboard functionality

## Tech Stack

- **Frontend**: React with TypeScript, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with modern design

## Project Structure

```
url-shortener-app/
├── backend/
│   ├── models/
│   │   └── Url.js          # MongoDB schema
│   ├── routes/
│   │   ├── url.js          # API routes for URL operations
│   │   └── redirect.js     # Redirect routes
│   ├── server.js           # Express server setup
│   ├── .env                # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── UrlShortener.tsx  # Main URL shortening component
    │   │   └── Admin.tsx          # Admin dashboard component
    │   ├── App.tsx
    │   ├── App.css
    │   └── index.tsx
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd url-shortener-app
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system. If using the default local installation:
   ```bash
   mongod
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on http://localhost:3000

## Usage

### Main Application
1. Visit http://localhost:3000
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy the generated short URL
5. Share or use the short URL - it will redirect to the original URL

### Admin Dashboard
1. Click "View Admin Panel" or visit http://localhost:3000/admin
2. View all shortened URLs, their click counts, and creation dates
3. Click on short URLs to test them
4. Use "Refresh Data" to update the statistics

### API Endpoints

- **POST /api/shorten** - Create a short URL
  ```json
  {
    "longUrl": "https://example.com/very/long/url"
  }
  ```

- **GET /api/urls** - Get all URLs (for admin)

- **GET /:shortcode** - Redirect to original URL

## Environment Variables

Backend `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
```

## Database Schema

```javascript
{
  longUrl: String,      // Original long URL
  shortCode: String,    // Generated short code
  shortUrl: String,     // Complete short URL
  clicks: Number,       // Click count (default: 0)
  createdAt: Date      // Creation timestamp
}
```

## Development Notes

- The frontend uses a proxy configuration to communicate with the backend during development
- CORS is configured on the backend to allow frontend requests
- MongoDB connection uses local database by default
- Short codes are generated using the `shortid` library for uniqueness
- URL validation is performed both on frontend and backend

## Production Deployment

For production deployment:

1. Update the BASE_URL in backend .env to your production domain
2. Update API URLs in frontend components to point to your production backend
3. Set up MongoDB Atlas or your preferred cloud MongoDB service
4. Build the frontend: `npm run build`
5. Deploy both frontend and backend to your hosting platform

## Troubleshooting

- **MongoDB Connection Issues**: Ensure MongoDB is running and accessible
- **CORS Errors**: Check that the backend CORS configuration allows your frontend domain
- **Port Conflicts**: Ensure ports 3000 and 5000 are available, or update the configuration
