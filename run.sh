#!/bin/bash

echo "🚀 Starting URL Shortener App..."

# Kill any existing processes on these ports
echo "Cleaning up existing processes..."
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true

# Start backend
echo "🔧 Starting backend server on port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Test backend
echo "🧪 Testing backend connection..."
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Backend is running successfully!"
else
    echo "❌ Backend failed to start"
    exit 1
fi

# Start frontend  
echo "🎨 Starting frontend on port 3000..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Application started successfully!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🖥️  Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    pkill -f "node.*server.js" 2>/dev/null || true
    pkill -f "react-scripts start" 2>/dev/null || true
    exit 0
}

# Trap cleanup function on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID
