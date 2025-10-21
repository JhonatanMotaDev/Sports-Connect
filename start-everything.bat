@echo off
echo 🚀 Starting Sports Connect - Complete Setup
echo.

echo 📊 Starting MongoDB Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo 📱 Starting Expo Frontend...
start "Frontend Server" cmd /k "npx expo start --clear"

echo ⏳ Waiting for frontend to start...
timeout /t 3 /nobreak >nul

echo.
echo ✅ Both servers are running!
echo.
echo 📊 Backend: http://localhost:3333
echo 📱 Frontend: http://localhost:8081
echo 🗄️  MongoDB: mongodb://localhost:27017/sportsconnect
echo.
echo 📱 For mobile testing:
echo 1. Install Expo Go app on your phone
echo 2. Scan the QR code from the frontend terminal
echo.
echo 🌐 For web testing:
echo Open http://localhost:8081 in your browser
echo.
echo Press any key to open the web app...
pause >nul

start http://localhost:8081
start http://localhost:3333

echo.
echo 🎉 Sports Connect is now running!
echo Close the terminal windows to stop the servers.
echo.
pause
