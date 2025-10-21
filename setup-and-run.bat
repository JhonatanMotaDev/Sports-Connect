@echo off
echo 🚀 Sports Connect - Complete Setup and Run
echo ==========================================
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo 🗄️  Checking MongoDB connection...
timeout /t 2 /nobreak >nul

echo.
echo 📊 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo ⏳ Waiting for backend to initialize...
timeout /t 8 /nobreak >nul

echo.
echo 📱 Starting Frontend Server...
start "Frontend Server" cmd /k "npx expo start --clear"

echo ⏳ Waiting for frontend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo ✅ Setup Complete! Both servers are running.
echo.
echo 📊 Backend API: http://localhost:3333
echo 📱 Frontend App: http://localhost:8081
echo 🗄️  MongoDB: mongodb://localhost:27017/sportsconnect
echo.
echo 📱 For Mobile Testing:
echo 1. Install "Expo Go" app on your phone
echo 2. Scan the QR code from the frontend terminal
echo.
echo 🌐 For Web Testing:
echo Opening http://localhost:8081 in your browser...
echo.

start http://localhost:8081
start http://localhost:3333

echo.
echo 🎉 Sports Connect is now running!
echo.
echo 📋 What you can do:
echo - Navigate to "Eventos" tab to see events
echo - Create new events using the form
echo - View data in MongoDB Compass
echo - Test API at http://localhost:3333/api/events
echo.
echo Press any key to continue...
pause >nul
