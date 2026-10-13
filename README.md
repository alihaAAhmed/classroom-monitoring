# 🎓 Classroom Monitoring System

A smart classroom availability system with real-time camera monitoring, built for universities to help students, teachers, and administrators manage classroom usage efficiently.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-Vercel-blue)
![Backend](https://img.shields.io/badge/backend-Railway-purple)
![Database](https://img.shields.io/badge/database-MongoDB-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🔗 Live Demo

| Service | URL |
|---------|-----|
| 🌐 **Frontend** | [classroom-monitoring.vercel.app](https://classroom-monitoring.vercel.app) |
| 🔧 **Backend API** | [classroom-monitoring-production.up.railway.app](https://classroom-monitoring-production.up.railway.app) |
| ❤️ **Health Check** | [/api/health](https://classroom-monitoring-production.up.railway.app/api/health) |

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| 🎓 **Student** | `student@gmail.com` | `123456` |
| 👨‍🏫 **Teacher** | `teacher@gmail.com` | `123456` |
| 🛡️ **Admin** | `admin@gmail.com` | `admin12` |

---

## ✨ Features

### 👨‍🎓 For Students
- 🔍 Search available classrooms in real-time
- 📱 Responsive design (works on mobile, tablet, desktop)
- 🔔 Get notifications about classroom status
- 🗺️ Interactive floor map view
- 📝 Submit feedback via Google Forms

### 👨‍🏫 For Teachers
- 📋 Request classroom bookings
- 📅 Track request status (pending / approved / rejected)
- 🎥 Monitor live classroom occupancy
- 🗺️ View floor maps with room availability

### 🛡️ For Administrators
- 👥 User management (approve / reject teacher registrations)
- 🏫 Manage all classrooms
- 📹 Live camera monitoring dashboard
- 📊 Analytics & reports
- ✅ Handle classroom requests

---

## 🛠️ Tech Stack

### Frontend
- **React 19** — UI library
- **Vite** — Fast build tool
- **React Router DOM 7** — Routing
- **Lucide React** — Icons
- **Custom CSS** — Fully responsive design

### Backend
- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **CORS** — Cross-origin handling
- **dotenv** — Environment variables

### Deployment
- **Vercel** — Frontend hosting
- **Railway** — Backend hosting
- **MongoDB Atlas** — Cloud database

---

## 📁 Project Structure

```
classroom-monitoring/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Mongoose schemas
│   │   └── routes/         # API routes
│   ├── seed/               # Database seeding
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Auth context
│   │   ├── data/           # Static data
│   │   ├── pages/          # Page components
│   │   │   ├── admin/
│   │   │   ├── student/
│   │   │   └── teacher/
│   │   ├── services/       # API calls
│   │   ├── utils/          # Helpers
│   │   ├── App.jsx         # Routes
│   │   ├── main.jsx
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/alihaAAhmed/classroom-monitoring.git
cd classroom-monitoring
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/cms
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
VITE_API_URL=http://127.0.0.1:5000/api
```

Run frontend:

```bash
npm run dev
```

### 4. Seed the database (optional)

```bash
cd ../backend
npm run seed
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/signup` | User registration |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/rooms` | Get all classrooms |
| `GET` | `/api/requests` | Get classroom requests |
| `GET` | `/api/notifications` | Get notifications |
| `GET` | `/api/users` | Get all users (admin) |
| `PUT` | `/api/users/:id/approve` | Approve user (admin) |
| `PUT` | `/api/users/:id/reject` | Reject user (admin) |

---

## 📱 Responsive Design

The application is fully responsive across all devices:

- 📱 **Mobile** (< 700px)
- 📱 **Tablet** (700px – 1100px)
- 💻 **Desktop** (> 1100px)

**Features:**
- Hamburger menu on mobile
- Avatar dropdown with user info
- Collapsible tables and grids
- Touch-friendly buttons

---

## 🔐 Security

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (RBAC)
- ✅ Protected routes for each role
- ✅ CORS configuration
- ✅ Environment variables for secrets

---

## 👤 Author

**Aliha Ahmed**
- GitHub: [@alihaAAhmed](https://github.com/alihaAAhmed)
- Project: [Classroom Monitoring System](https://github.com/alihaAAhmed/classroom-monitoring)

---

## 📄 License

This project is for educational purposes. Free to use and modify.

---

## 🙏 Acknowledgments

- Built as a university semester project
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/) and [Railway](https://railway.app/)

---

## 📞 Support

For issues or questions:

- 🐛 Open an issue on [GitHub](https://github.com/alihaAAhmed/classroom-monitoring/issues)
- ⭐ Star this repo if you like it!

---

⭐ **If you like this project, give it a star on GitHub!** ⭐