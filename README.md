🚀 Life Tracker

A full-stack gamified productivity and habit-tracking web application designed to help users build consistency through daily tasks, streaks, XP, levels, progress analytics, and personal profiles.

The application combines a modern dark dashboard with a REST API backend and JWT-based authentication.

🌐 Live Demo

Frontend: https://life-tracker-7vigrhf60-vedantrohankars-projects.vercel.app/

Backend API: https://life-tracker-api-vjxy.onrender.com/

GitHub: https://github.com/VedantRohankar/Life-Tracker

The Vercel deployment URL can change when deployment aliases are updated.

✨ Features

🔐 Authentication

User registration

User login

JWT-based authentication

Protected application routes

Token-based authorization for API requests

Logout functionality

Passwords handled on the backend rather than stored as plain text

📋 Daily Task Management

Create daily tasks

Mark tasks as completed

Toggle task completion

Delete tasks

User-specific task data

XP rewards for completing tasks

Daily productivity tracking

🔥 Streak System

Tracks consecutive productivity days

Streak information is displayed on the dashboard

Streak contributes to the user's growth metrics

⚡ XP & Level System

Users earn XP by completing tasks

XP is displayed throughout the application

User level/progress can be tracked

XP history is visualized on the dashboard

📊 Analytics Dashboard

The dashboard provides a visual overview of productivity:

Weekly XP history

Interactive area chart

Current XP

Current streak

Tasks completed

Growth Metrics pie chart

Consistency score

Intensity score

Mind-strength score

Weekly productivity insight

Note: The current "Weekly Insight" and growth metrics are calculated from application data using frontend logic. They are not an external generative-AI system.

👤 Profile

View user information

Update username

Upload profile/avatar image

View XP

View level

View rank

XP progress visualization

📱 Responsive UI

Desktop layout

Mobile-friendly layouts

Responsive sidebar

Mobile hamburger navigation

Dark application-style interface

Responsive charts and cards

🎨 Modern UI

Dark theme

Green/emerald accent system

Glassmorphism-inspired cards

Framer Motion animations

Interactive charts

Responsive Tailwind CSS styling

🛠️ Tech Stack

Frontend

React.js

Vite

JavaScript (ES6+)

Tailwind CSS

Framer Motion

Recharts

Axios

React Router

React Icons

Backend

Node.js

Express.js

JavaScript / ES Modules

REST APIs

JWT authentication

CORS

dotenv

Database

MongoDB

Mongoose

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB / MongoDB Atlas

Development Tools

Git

GitHub

VS Code

Postman

npm

🏗️ Project Architecture

Life-Tracker/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Daily.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Progress.jsx
│   │   │   ├── Rank.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Streak.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md

Your exact backend folders may contain additional files depending on the current version of the project.

🔄 How the Application Works

User
 │
 ▼
React Frontend
 │
 │ Axios / REST API
 ▼
Express.js Backend
 │
 ├── JWT Authentication
 │
 ├── User Routes
 │
 └── Task Routes
 │
 ▼
MongoDB

Authentication flow

1. User registers
        ↓
2. Backend creates the user
        ↓
3. User logs in
        ↓
4. Backend verifies credentials
        ↓
5. Backend returns JWT
        ↓
6. Frontend stores JWT
        ↓
7. Protected API requests send:
   Authorization: Bearer <token>
        ↓
8. Backend verifies JWT
        ↓
9. User-specific data is returned

🔐 JWT Authentication

The application uses JWT for authentication.

After successful login, the frontend stores the returned token:

localStorage.setItem("token", res.data.token);

Protected API requests send the token using the Authorization header:

{
  Authorization: `Bearer ${token}`
}

The backend uses the JWT secret stored in an environment variable to sign and verify tokens.

Important

Never commit:

.env

to GitHub.

Instead, create:

.env.example

with placeholder values such as:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

⚙️ Environment Variables

Backend

Create:

server/.env

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Use your real values locally.

For Render, add the same variables under the service's Environment Variables settings.

Frontend

The frontend uses the API configuration in:

client/src/api.js

Example structure:

const API = "https://your-backend-url.onrender.com";

export default API;

Do not hard-code localhost URLs into production API requests.

💻 Local Development

1. Clone the repository

git clone https://github.com/VedantRohankar/Life-Tracker.git
cd Life-Tracker

2. Install frontend dependencies

cd client
npm install

3. Install backend dependencies

Open another terminal:

cd server
npm install

4. Configure environment variables

Create:

server/.env

Add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

5. Start backend

Inside server:

npm run dev

The backend should run on:

http://localhost:5000

6. Start frontend

Inside client:

npm run dev

Vite will provide a local URL, normally:

http://localhost:5173

📡 Main API Routes

The backend is organized around REST-style routes.

Authentication

POST /api/auth/register
POST /api/auth/login

User

GET  /api/user/profile
PUT  /api/user/update-name
PUT  /api/user/upload-avatar

Tasks

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/streak

Route names can change as the backend evolves. Check the current route files in server/routes/ for the authoritative implementation.

📊 Dashboard Metrics

The dashboard currently derives three growth metrics.

Consistency

Based primarily on the user's streak:

const consistency = Math.min(streak * 5, 100);

Intensity

Based on completed tasks:

const intensity = Math.min(completedToday * 20, 100);

Mind Strength

Combines streak and accumulated XP:

const mindStrength = Math.min(
  streak * 3 + user.xp / 50,
  100
);

These values are visualized in the Growth Metrics pie chart.

📈 Weekly Productivity Insight

The dashboard compares XP values from the user's recent XP history.

The current implementation calculates an improvement percentage using the first and last values in the available seven-day window.

Example output:

You improved +12.5% this week 🚀

The message changes based on the calculated improvement.

This is currently rule-based analytics, not machine-learning or generative AI.

🎯 Why This Project?

Life Tracker was built to combine full-stack development with a practical productivity problem.

Instead of simply displaying a list of tasks, the application turns productivity into a progression system:

Complete Tasks
      ↓
    Earn XP
      ↓
 Build Streak
      ↓
 Increase Level
      ↓
 Analyze Progress
      ↓
 Improve Consistency

🧠 Key Development Concepts Demonstrated

This project demonstrates experience with:

React component architecture

React Hooks

State management with useState

API calls with Axios

React Router

Protected routes

JWT authentication

REST API development

Express middleware

MongoDB data modeling

Mongoose

CRUD operations

File uploads

CORS configuration

Environment variables

Responsive UI development

Tailwind CSS

Data visualization with Recharts

Animation with Framer Motion

Git/GitHub

Vercel deployment

Render deployment

Production API configuration

🛡️ Security Notes

The project uses environment variables for sensitive configuration.

Never expose:

MongoDB connection strings
Database passwords
JWT secrets
API keys
Cloudinary secrets
SMTP credentials

Make sure .gitignore contains:

.env
.env.*
!.env.example
node_modules/
dist/

If a secret has accidentally been committed to GitHub, simply deleting the file is not enough. Rotate the exposed credential and remove the secret from Git history when appropriate.

🚀 Deployment

Frontend — Vercel

The React/Vite frontend is deployed through Vercel.

Typical configuration:

Framework: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist

For React Router deployments, configure a Vercel rewrite so refreshing routes such as:

/dashboard
/profile
/daily
/streak

does not return a 404.

Backend — Render

The Express backend is deployed through Render.

Typical configuration:

Root Directory: server
Build Command: npm install
Start Command: npm start

The backend receives production environment variables through Render's Environment settings.

🧪 Testing

During development, API endpoints can be tested with:

Browser DevTools

Postman

Frontend UI

Render logs

Vercel deployment logs

For production debugging, verify:

Frontend API URL

Backend deployment status

CORS allowed origins

Environment variables

MongoDB connection

JWT secret

Browser Network tab

Backend logs

🔮 Future Improvements

Potential improvements for future versions:

PWA installation support

Push notifications

Better habit tracking

Calendar-based productivity view

Advanced analytics

Weekly/monthly reports

More accurate productivity scoring

Backend-generated analytics

AI-powered productivity recommendations

Email reminders

Password reset flow

Rate limiting

Stronger request validation

Automated tests

CI/CD pipeline

Better loading and error states

Offline support

👨‍💻 Author

Vedant Rohankar

Full Stack Developer

GitHub: https://github.com/VedantRohankar

LinkedIn: https://linkedin.com/in/vedant-rohankar

📄 License

This project is currently intended as a personal/portfolio project.

If you plan to distribute or reuse the project commercially, add an appropriate open-source license such as MIT.

⭐ If you find this project useful

Feel free to explore the repository, suggest improvements, or use the architecture as inspiration for your own full-stack projects.
