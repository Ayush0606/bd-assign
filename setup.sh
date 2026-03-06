#!/bin/bash

echo "============================================"
echo "Task Management App - Quick Setup Script"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js is installed: $(node --version)"
echo ""

# Setup Backend
echo "============================================"
echo "Setting up BACKEND..."
echo "============================================"
cd backend

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "[!] Please edit backend/.env with your MongoDB URI and JWT secret"
    echo ""
else
    echo ".env file already exists"
fi

echo "Installing backend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install backend dependencies"
    exit 1
fi

echo "[OK] Backend setup complete!"
echo ""

cd ..

# Setup Frontend
echo "============================================"
echo "Setting up FRONTEND..."
echo "============================================"
cd frontend

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
else
    echo ".env file already exists"
fi

echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install frontend dependencies"
    exit 1
fi

echo "[OK] Frontend setup complete!"
echo ""

cd ..

echo "============================================"
echo "Setup Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Edit backend/.env with your configuration"
echo "3. Start the backend: cd backend && npm run dev"
echo "4. Start the frontend: cd frontend && npm start"
echo ""
echo "Or use Docker: docker-compose up"
echo ""
echo "API Documentation: http://localhost:5000/api-docs"
echo "Frontend: http://localhost:3000"
echo ""
