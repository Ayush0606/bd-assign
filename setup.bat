@echo off
echo ============================================
echo Task Management App - Quick Setup Script
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed: 
node --version
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
echo (If this hangs, MongoDB might not be running)
echo.

REM Setup Backend
echo ============================================
echo Setting up BACKEND...
echo ============================================
cd backend

if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo [!] Please edit backend\.env with your MongoDB URI and JWT secret
    echo.
) else (
    echo .env file already exists
)

echo Installing backend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

echo [OK] Backend setup complete!
echo.

cd ..

REM Setup Frontend
echo ============================================
echo Setting up FRONTEND...
echo ============================================
cd frontend

if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
) else (
    echo .env file already exists
)

echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo [OK] Frontend setup complete!
echo.

cd ..

echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Edit backend\.env with your configuration
echo 3. Start the backend: cd backend && npm run dev
echo 4. Start the frontend: cd frontend && npm start
echo.
echo Or use Docker: docker-compose up
echo.
echo API Documentation: http://localhost:5000/api-docs
echo Frontend: http://localhost:3000
echo.
pause
