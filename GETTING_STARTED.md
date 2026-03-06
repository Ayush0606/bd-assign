# Task Management API - Production-Ready Full Stack Application

This is a scalable, production-ready full-stack application featuring:

## 🎯 Key Features
- ✅ RESTful API with JWT authentication
- ✅ Role-based access control (User/Admin)
- ✅ MongoDB database with Mongoose ODM
- ✅ Modern React frontend with routing
- ✅ Swagger API documentation
- ✅ Docker support
- ✅ Complete error handling
- ✅ Input validation
- ✅ Security best practices

## 📦 What's Included
- Complete backend (Node.js + Express + MongoDB)
- Complete frontend (React + React Router + Axios)
- Swagger API documentation at `/api-docs`
- Postman collection for API testing
- Docker configuration for easy deployment
- Comprehensive README with setup instructions

## 🚀 Quick Start

### Using Docker Compose (Recommended)
```bash
docker-compose up
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

### Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## 📚 Documentation

- **Main README**: See detailed documentation in [README.md](README.md)
- **API Docs**: http://localhost:5000/api-docs (after starting backend)
- **Postman Collection**: Import `postman_collection.json` for API testing

## 🔐 Default Credentials

Create users via:
- **Register endpoint**: `/api/v1/auth/register`
- **Frontend UI**: http://localhost:3000/register

Roles available: `user`, `admin`

## 📖 API Endpoints

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - Get all tasks (paginated)
- `GET /api/v1/tasks/:id` - Get single task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task (admin only)

## 🏗️ Architecture

### Backend Structure
```
backend/
├── config/         # Database configuration
├── controllers/    # Business logic
├── middleware/     # Auth, error handling
├── models/         # Mongoose schemas
├── routes/         # API routes
├── swagger/        # API documentation
├── utils/          # Helper functions
└── server.js       # Entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── services/   # API layer
│   └── styles/     # CSS files
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- CORS configuration
- Error handling middleware

## 📈 Scalability

Ready for production with:
- Horizontal scaling support
- Database indexing
- Pagination
- Docker containerization
- Environment-based configuration
- Health check endpoints

## 📝 License

MIT License - See [README.md](README.md) for more details

---

For complete setup instructions, API documentation, and scalability notes, see [README.md](README.md)
