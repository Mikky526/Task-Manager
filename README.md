# MERN Personal Task Manager

A full-stack Personal Task Manager built with:

- MongoDB
- Express.js
- React.js (JSX)
- Node.js
- Tailwind CSS

## Features

- User registration
- User login
- JWT authentication
- Protected routes
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Tailwind CSS responsive UI

## Backend Setup

```bash
cd server
npm install
npm run dev
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create `.env` inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`
