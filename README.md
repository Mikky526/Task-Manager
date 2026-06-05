# MERN Personal Task Manager

A full-stack Task Manager application built with:

- MongoDB Atlas / Mongoose
- Express.js
- React.js
- Node.js
- Tailwind CSS
- JWT authentication

## Project Structure

- `server/` — backend API
- `client/Task Manager/` — frontend React app

## Features

- User registration and login
- JWT-based auth with protected routes
- Task creation, listing, updating, and deletion
- Responsive Tailwind UI
- Separate backend and frontend apps

## Backend Setup

1. Open a terminal and navigate to the backend folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `server/` with the following values:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5175
```

4. Start the backend:

```bash
npm run dev
```

## Frontend Setup

1. Open a terminal and navigate to the frontend folder:

```bash
cd "client/Task Manager"
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

4. Open the Vite URL shown in the terminal (typically `http://localhost:5175`).

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Notes

- The frontend uses `http://localhost:5001/api` as the API base URL.
- Make sure `server/.env` contains a valid `MONGO_URI` and `JWT_SECRET`.
- `node_modules/` is excluded from Git by `.gitignore`.

## Deploy

To deploy this repository, push it to GitHub and configure your frontend and backend host environments with the same environment variables.
