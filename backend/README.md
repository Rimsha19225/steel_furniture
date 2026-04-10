# Steel Furniture Backend API

Backend API for the Steel Furniture e-commerce platform, built with Node.js, Express, and Neon database.

## Prerequisites

- Node.js 18+ installed
- A Neon database account and database URL

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
# Get your database URL from Neon console
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Generate a secure random string for JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Initialize Database

Run the database initialization script to create tables and seed sample data:

```bash
npm run db:init
```

### 4. Start the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new user account |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile (requires token) |
| PUT | `/api/auth/profile` | Update user profile (requires token) |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product by ID |
| GET | `/api/products/category/:category` | Get products by category |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/product/:productId` | Get reviews for a product |
| POST | `/api/reviews` | Create review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/:userId` | Get user's cart |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update` | Update cart item quantity |
| DELETE | `/api/cart/remove/:productId` | Remove item from cart |
| DELETE | `/api/cart/clear/:userId` | Clear cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/user/:userId` | Get user's orders |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders/create` | Create new order |
| PUT | `/api/orders/:id/status` | Update order status |
| PUT | `/api/orders/:id/cancel` | Cancel order |

## Database Schema

The application uses the following tables:

- **users** - User accounts
- **user_addresses** - User shipping addresses
- **products** - Product catalog
- **reviews** - Product reviews
- **orders** - Customer orders
- **order_items** - Order line items
- **cart** - Shopping carts
- **cart_items** - Cart line items

## Connecting Neon Database

1. Go to [Neon](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it in your `.env` file as `DATABASE_URL`
5. Run `npm run db:init` to set up the tables

## Development

### Project Structure

```
backend/
├── routes/          # API route handlers
│   ├── auth.ts
│   ├── products.ts
│   ├── reviews.ts
│   ├── cart.ts
│   └── orders.ts
├── scripts/         # Utility scripts
│   └── init-db.ts
├── db.ts            # Database connection
├── schema.sql       # Database schema
├── server.ts        # Express server
└── package.json
```

### Running Tests

(TBD - Add test framework)

## Deployment

The backend can be deployed to any platform that supports Node.js:

- **Railway** - Push to GitHub and connect to Railway
- **Render** - Deploy from GitHub repository
- **Vercel** - Adapt for serverless functions
- **DigitalOcean** - Deploy on Droplet or App Platform

Make sure to set the environment variables in your deployment platform.

## License

MIT
