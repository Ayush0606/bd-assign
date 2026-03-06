#!/bin/bash

# Production Deployment Script
# This script installs production dependencies for the Task Management Application

set -e  # Exit on error

echo ""
echo "==================================="
echo "Installing Production Dependencies"
echo "==================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install Backend Dependencies
echo "📦 Installing Backend Dependencies..."
cd backend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

# Install production dependencies
echo "   Installing core dependencies..."
npm install --production

# Install additional production security packages
echo "   Installing security packages..."
npm install helmet express-mongo-sanitize express-rate-limit compression

echo "✅ Backend dependencies installed"
echo ""

# Install Frontend Dependencies
echo "📦 Installing Frontend Dependencies..."
cd ../frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

npm install

echo "✅ Frontend dependencies installed"
echo ""

cd ..

echo "==================================="
echo "✅ All Dependencies Installed"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Configure environment variables (see .env.example files)"
echo "2. Generate JWT secret: node deployment-scripts/generate-jwt-secret.js"
echo "3. Check environment: node deployment-scripts/check-env.js"
echo "4. Build frontend: cd frontend && npm run build"
echo "5. Start backend: cd backend && npm start"
echo ""
