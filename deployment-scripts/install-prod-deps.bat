@echo off
REM Production Deployment Script for Windows
REM This script installs production dependencies for the Task Management Application

echo.
echo ===================================
echo Installing Production Dependencies
echo ===================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Install Backend Dependencies
echo Installing Backend Dependencies...
cd backend

if not exist "package.json" (
    echo Error: Backend package.json not found!
    exit /b 1
)

echo    Installing core dependencies...
call npm install --production

echo    Installing security packages...
call npm install helmet express-mongo-sanitize express-rate-limit compression

echo Backend dependencies installed
echo.

REM Install Frontend Dependencies
echo Installing Frontend Dependencies...
cd ..\frontend

if not exist "package.json" (
    echo Error: Frontend package.json not found!
    exit /b 1
)

call npm install

echo Frontend dependencies installed
echo.

cd ..

echo ===================================
echo All Dependencies Installed
echo ===================================
echo.
echo Next steps:
echo 1. Configure environment variables (see .env.example files)
echo 2. Generate JWT secret: node deployment-scripts\generate-jwt-secret.js
echo 3. Check environment: node deployment-scripts\check-env.js
echo 4. Build frontend: cd frontend ^&^& npm run build
echo 5. Start backend: cd backend ^&^& npm start
echo.

pause
