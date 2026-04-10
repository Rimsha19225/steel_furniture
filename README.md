# Steel Furniture - Full Stack Application

A modern e-commerce platform for steel furniture, built with Next.js (frontend) and Node.js/Express (backend) with Neon database.

## Project Structure

```
furniture/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/      # Next.js app pages
│   │   ├── components/
│   │   └── config/   # API configuration
│   ├── public/
│   ├── package.json
│   └── .env.local
├── backend/          # Express.js backend API
│   ├── routes/       # API route handlers
│   ├── scripts/      # Database scripts
│   ├── db.ts         # Database connection
│   ├── schema.sql    # Database schema
│   ├── server.ts     # Express server
│   ├── package.json
│   └── .env
└── README.md         # This file
```

## Quick Start

### 1. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your Neon database URL

# Initialize database
npm run db:init

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3001`

### 2. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure backend URL in .env.local
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api" > .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Database Setup (Neon)

1. Go to [Neon](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it in `backend/.env` as `DATABASE_URL`
5. Run `npm run db:init` in the backend folder

## Features

- **User Authentication**: Signup, login, JWT-based sessions
- **Product Catalog**: Browse, search, filter products
- **Shopping Cart**: Add, update, remove items
- **Orders**: Place orders, track order status
- **Reviews**: Submit and view product reviews
- **Responsive Design**: Mobile-friendly UI

## API Endpoints

See [backend/README.md](backend/README.md) for complete API documentation.

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express
- TypeScript
- Neon (PostgreSQL)
- JWT Authentication
- bcryptjs

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api
```

## Development

### Running Both Services

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Deployment

### Backend
Deploy to Railway, Render, or any Node.js hosting platform.

### Frontend
Deploy to Vercel, Netlify, or any static hosting.

Make sure to update the `NEXT_PUBLIC_BACKEND_URL` in production.

## License

MIT
# furniture
