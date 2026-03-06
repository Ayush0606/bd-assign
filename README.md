# Task Management API - Full Stack Application

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green)
![React](https://img.shields.io/badge/React-v18+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-ready full-stack application with REST API, JWT authentication, role-based access control (RBAC), and a modern React frontend.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Production Deployment](#production-deployment)
- [Scalability](#scalability)
- [Docker Support](#docker-support)
- [License](#license)

## ✨ Features

### Backend
- ✅ RESTful API with versioning (v1)
- ✅ JWT-based authentication
- ✅ Role-based access control (User/Admin)
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ Centralized error handling
- ✅ Request logging with Morgan
- ✅ CORS enabled
- ✅ Swagger API documentation
- ✅ MongoDB with Mongoose ODM
- ✅ Pagination support
- ✅ Health check endpoint

### Frontend
- ✅ React 18 with functional components
- ✅ React Router for navigation
- ✅ JWT token management
- ✅ Protected routes
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark mode toggle with persistence
- ✅ User registration and login
- ✅ Task CRUD operations
- ✅ Role-based UI (Admin can delete)
- ✅ Error and success message handling

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Documentation**: Swagger (swagger-ui-express, swagger-jsdoc)
- **Logging**: MHelmet, CORS, express-mongo-sanitize, express-rate-limit
- **Security**: CORS, helmet (optional)

### Frontend
- **Library**: React.js
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## 📁 Project Structure

```
bd-assign/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── roleMiddleware.js     # Role-based access
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── swagger/
│   │   └── swagger.js            # Swagger configuration
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   ├── Dockerfile                # Docker configuration
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx      # Task creation/edit form
    │   │   └── TaskList.jsx      # Task listing
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   └── Dashboard.jsx     # Main dashboard
    │   ├── services/
    │   │   └── api.js            # API service layer
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── App.css
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── TaskForm.css
    │   │   └── TaskList.css
    │   ├── App.jsx               # Main app component
    │   └── index.js              # Entry point
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

5. Start MongoDB:
```bash
# Using MongoDB service (Windows)
net start MongoDB

# Using mongod directly
mongod
```

6. Run the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

5. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/taskmanagement |
| JWT_SECRET | Secret key for JWT | (required) |
| JWT_EXPIRE | JWT expiration time | 30d |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:3000 |

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api/v1 |

## 📚 API Documentation

Once the backend server is running, access interactive API documentation at:

```
http://localhost:5000/api-docs
```

Swagger UI provides:
- All available endpoints
- Request/response schemas
- Try-it-out functionality
- Authentication instructions

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| GET | `/api/v1/auth/me` | Get current user | Private |

### Tasks

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/tasks` | Create new task | Private |
| GET | `/api/v1/tasks` | Get all tasks | Private |
| GET | `/api/v1/tasks/:id` | Get single task | Private |
| PUT | `/api/v1/tasks/:id` | Update task | Private |
| DELETE | `/api/v1/tasks/:id` | Delete task | Admin only |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/health` | Server health check | Public |

## 📦 API Request/Response Examples

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Task
```bash
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the full-stack project by end of week",
  "status": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64xyz789...",
    "title": "Complete project",
    "description": "Finish the full-stack project by end of week",
    "status": "pending",
    "userId": "64abc123...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 📈 Scalability Considerations

This application is designed with scalability in mind:

### 1. **Horizontal Scaling**
- Stateless API design allows running multiple instances
- JWT authentication (no server-side sessions)
- Load balancer ready (Nginx, AWS ELB)

### 2. **Database Optimization**
- Indexed fields for better query performance
- Pagination support to handle large datasets
- Connection pooling via Mongoose

### 3. **Caching Strategy**
- Redis integration ready for session/data caching
- API response caching for frequently accessed data
- CDN for static assets

### 4. **Microservices Architecture**
Current monolithic structure can be split into:
- Authentication Service
- Task Management Service
- User Management Service
- API Gateway (Kong, Express Gateway)

### 5. **Performance Optimization**
- Compression middleware (gzip)
- Rate limiting to prevent abuse
- Database query optimization
- Async/await for non-blocking operations

### 6. **Monitoring & Logging**
- Morgan for HTTP request logging
- Error tracking (Sentry, LogRocket)
- Performance monitoring (New Relic, DataDog)
- Health check endpoints

### 7. **Cloud Deployment**
Ready for deployment on:
- **AWS**: EC2, ECS, Lambda
- **Azure**: App Service, Container Instances
- **Google Cloud**: App Engine, Cloud Run
- **Heroku**: Quick deployment with Procfile

### 8. **Security Enhancements**
- Rate limiting (express-rate-limit)
- Helmet.js for HTTP headers
- Input sanitization
- SQL injection prevention (Mongoose)
- XSS protection

## 🐳 Docker Support

### Backend Dockerfile

Build and run:
```bash
cd backend
docker build -t task-api .
docker run -p 5000:5000 --env-file .env task-api
```

### Docker Compose (Full Stack)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/taskmanagement
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo-data:
```

Run:
```bash
docker-compose up
```

## 🧪 Testing

### Manual Testing
1. Use Postman collection (provided)
2. Access Swagger UI for interactive testing
3. Test frontend at http://localhost:3000

### Automated Testing (Future Enhancement)
- Unit tests: Jest, Mocha
- Integration tests: Supertest
- E2E tests: Cypress, Selenium
- API tests: Postman/Newman

## 🚀 Deployment

### Backend Deployment

**Heroku:**
```bash
cd backend
heroku create your-app-name
heroku config:set MONGO_URI=<your-mongo-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

**AWS EC2:**
1. Launch EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Configure environment variables
5. Use PM2 for process management
6. Configure Nginx as reverse proxy

### Frontend Deployment

**Vercel:**
```bash
cd frontend
npm install -g vercel
vercel
```

**Netlify:**
```bash
cd frontend
npm run build
# Deploy build folder to Netlify
```

## 🚀 Production Deployment

### Quick Start

For detailed production deployment instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**

### Production Checklist

Before deploying to production, complete the **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)**

### Essential Steps

1. **Install production dependencies:**
   ```bash
   cd backend
   npm install helmet express-mongo-sanitize express-rate-limit compression
   ```

2. **Generate strong JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Update environment variables:**
   - Set `NODE_ENV=production`
   - Update `MONGO_URI` with production database
   - Set strong `JWT_SECRET` (from step 2)
   - Update `CORS_ORIGIN` with production frontend URL

4. **Build frontend for production:**
   ```bash
   cd frontend
   npm run build
   ```

5. **Deploy:**
   - Backend: Heroku, AWS, DigitalOcean, or VPS
   - Frontend: Vercel, Netlify, or S3
   - Database: MongoDB Atlas (recommended)

### Production Features

- ✅ Helmet security headers
- ✅ Rate limiting (100 requests/15 min)
- ✅ Stricter auth rate limiting (5 attempts/15 min)
- ✅ MongoDB injection protection
- ✅ Gzip compression
- ✅ Production error handling
- ✅ Multiple CORS origins support
- ✅ Request size limits

### Deployment Platforms

**Recommended for Backend:**
- [Heroku](https://www.heroku.com/) - Easy deployment with Git
- [Railway](https://railway.app/) - Modern deployment platform
- [DigitalOcean](https://www.digitalocean.com/) - VPS with full control
- [AWS EC2](https://aws.amazon.com/ec2/) - Enterprise-grade infrastructure

**Recommended for Frontend:**
- [Vercel](https://vercel.com/) - Zero-config React hosting
- [Netlify](https://www.netlify.com/) - Continuous deployment from Git
- [Cloudflare Pages](https://pages.cloudflare.com/) - Global CDN edge network

**Recommended for Database:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Managed MongoDB (Free tier available)



## 👥 User Roles & Permissions

### User Role
- Register and login
- Create tasks
- View own tasks
- Update own tasks
- Cannot delete tasks

### Admin Role
- All user permissions
- View all tasks (from all users)
- Delete any task
- Full CRUD access

## 🔧 Development Scripts

### Backend
```bash
npm start          # Production server
npm run dev        # Development with nodemon
```

### Frontend
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@taskapi.com

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Task assignment to multiple users
- [ ] File attachments for tasks
- [ ] Real-time updates (WebSockets)
- [ ] Task comments/notes
- [ ] Task categories/tags
- [ ] Advanced search and filtering
- [ ] Export tasks (CSV, PDF)
- [ ] Mobile app (React Native)

---

**Built with ❤️ using Node.js, Express, MongoDB, and React**
