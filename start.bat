@echo off
echo 🚀 Starting Sports Connect Full Stack Application...
echo.

echo 📊 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo 📱 Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev:frontend"

echo.
echo ✅ Both servers are starting...
echo 📊 Backend: http://localhost:3333
echo 📱 Frontend: http://localhost:8081
echo 🗄️  MongoDB Compass: mongodb://localhost:27017/sportsconnect
echo.
echo Press any key to open the application...
pause >nul

start http://localhost:8081
start http://localhost:3333

echo.
echo 🎉 Sports Connect is now running!
echo Close the terminal windows to stop the servers.
pause
