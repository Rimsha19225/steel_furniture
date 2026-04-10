# Steel Furniture - Full Stack E-Commerce Platform

A modern, fully-featured e-commerce platform for steel furniture, built with **Next.js 15** (frontend) and **Node.js/Express** (backend) with **Neon PostgreSQL** database.

---

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
  - [Frontend Features](#frontend-features)
  - [Backend Features](#backend-features)
  - [Interactive Features](#interactive-features)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

---

## 📁 Project Structure

```
furniture/
├── frontend/                     # Next.js frontend application
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── admin/            # Admin panel (dashboard, products, orders, users)
│   │   │   ├── about/            # About Us page
│   │   │   ├── cart/             # Shopping cart with shipping progress bar
│   │   │   ├── checkout/         # Checkout with multiple payment methods
│   │   │   ├── contact/          # Contact page
│   │   │   ├── inspiration/      # Design tips with interactive modals
│   │   │   ├── privacy-policy/   # Privacy Policy page
│   │   │   ├── product/          # Product listing & detail pages
│   │   │   ├── profile/          # User profile page
│   │   │   ├── returns-exchange/ # Returns & Exchange with return form modal
│   │   │   ├── reviews/          # Reviews page
│   │   │   ├── shipping-delivery/# Shipping & Delivery info page
│   │   │   └── terms-and-conditions/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── AddProductForm.tsx      # Admin product creation form
│   │   │   ├── AuthModal.tsx           # Login/Signup modal with success toast
│   │   │   ├── Benifit.tsx             # Benefits cards (Free Shipping, Returns, etc.)
│   │   │   ├── Footer.tsx              # Site footer
│   │   │   ├── Navbar.tsx              # Main navigation (auth-aware)
│   │   │   ├── Navbar_home.tsx         # Homepage navigation
│   │   │   ├── SignupForm.tsx          # Multi-step signup form
│   │   │   ├── product_card_1.tsx      # Product card variant 1
│   │   │   ├── product_card_2.tsx      # Product card variant 2
│   │   │   ├── product_fetch.tsx       # Product listing with search, filters & sorting
│   │   │   ├── reviews.tsx             # Customer reviews carousel
│   │   │   └── search_button.tsx       # Homepage search bar
│   │   ├── config/               # API configuration
│   │   └── contexts/             # React contexts (Auth, Admin, Cart)
│   ├── public/                   # Static assets & images
│   └── next.config.ts            # Next.js configuration
├── backend/                      # Express.js backend API
│   ├── routes/                   # API route handlers
│   │   ├── admin.ts              # Admin endpoints (dashboard, users, orders)
│   │   ├── auth.ts               # Authentication (signup, login, profile)
│   │   ├── cart.ts               # Shopping cart operations
│   │   ├── orders.ts             # Order management
│   │   ├── products.ts           # Product CRUD + image upload
│   │   └── reviews.ts            # Product reviews
│   ├── middleware/               # Auth middleware
│   ├── scripts/                  # Database scripts
│   ├── uploads/                  # Uploaded product images
│   ├── db.ts                     # Database connection & initialization
│   ├── schema.sql                # PostgreSQL schema
│   ├── server.ts                 # Express server entry point
│   └── swagger.ts                # Swagger API documentation
└── README.md
```

---

## ✨ Features

### Frontend Features

#### 🏠 Pages
| Page | Description |
|------|-------------|
| **Home** | Hero section, product cards, benefits section, reviews carousel, search bar |
| **Products** | Product grid with search bar, category filter, color filter, sorting |
| **Product Detail** | Full product view with image, description, color selection, add to cart |
| **Cart** | Item management, quantity controls, shipping progress bar, order summary |
| **Checkout** | Guest checkout, shipping form, multiple payment methods (Card, Easypaisa, JazzCash) |
| **Inspiration** | Design tips with interactive modals for colors, layouts, spaces, and quality |
| **Profile** | User info, saved addresses, quick actions, logout |
| **Returns & Exchange** | Policy details with expandable sections, Return Product modal form |
| **About Us** | Company information |
| **Contact** | Contact form and information |
| **Shipping & Delivery** | Shipping policies and timelines |
| **Privacy Policy** | Privacy and data handling policies |
| **Terms & Conditions** | Terms of service |

#### 🎨 Interactive Components
| Component | Features |
|-----------|----------|
| **Color Guide Modal** | Room type selector, mood picker, personalized color recommendations |
| **Layout Planner Modal** | Room shape selector, furniture picker, layout templates with tips |
| **Small Spaces Optimizer** | Space type selector, 6 solution categories with expandable tips, product recommendations |
| **Quality Guide Modal** | 4 tabs (Materials, Checklist, Comparison table, ROI calculator) |
| **Free Shipping Modal** | Shipping criteria cards, threshold guide, quick tips |
| **Return Form Modal** | Full return request form with file upload, reason picker, refund/exchange selection |
| **Auth Modal** | Login/Signup toggle with success toast notifications |
| **Add Product Form** | Admin product creation with image upload, category selector |

#### 🛒 Cart & Checkout
- **Add to cart** with animated success notification
- **Quantity controls** (increase/decrease) on cart items
- **Shipping progress bar** showing distance to free shipping threshold (PKR 70,000)
- **Auto-calculated** subtotal, tax, shipping, discount (20% off 10+ items), and total
- **Multiple payment methods**: Credit/Debit Card, Easypaisa, JazzCash
- **Country/city selector** with dynamic city list
- **Guest checkout** support

#### 📱 Responsive Design
- Fully responsive across **mobile, tablet, and desktop**
- Collapsible mobile navigation
- Adaptive grid layouts (1-4 columns based on screen size)
- Touch-friendly interactive elements
- Optimized typography and spacing for all devices

#### 🔐 Authentication
- **Signup** with multi-step form (Personal Info → Contact → Address → Password)
- **Login** with email/password
- **Persistent sessions** via localStorage token
- **Auth-aware navbar** — profile icon shows login modal or navigates to profile
- **Protected routes** — redirects to home if not authenticated

#### 🛡️ Admin Panel
- **Admin login** with password authentication
- **Dashboard** with stats overview
- **Product management** — create, edit, delete products with image upload
- **Order management** — view orders, update status
- **User management** — view users, toggle admin role, delete users

---

### Backend Features

#### 🔐 Authentication API
| Endpoint | Method | Auth Required | Description |
|----------|--------|--------------|-------------|
| `/api/auth/signup` | POST | No | Register new user with hashing |
| `/api/auth/login` | POST | No | Login with JWT token |
| `/api/auth/profile` | GET | Yes | Get user profile and addresses |
| `/api/auth/profile` | PUT | Yes | Update user profile |
| `/api/auth/online` | PATCH | Yes | Update user online status |

#### 📦 Products API
| Endpoint | Method | Auth Required | Description |
|----------|--------|--------------|-------------|
| `/api/products` | GET | No | Get all products |
| `/api/products/:id` | GET | No | Get single product |
| `/api/products/category/:category` | GET | No | Get products by category |
| `/api/products/upload` | POST | Admin | Upload product image (multer) |
| `/api/products` | POST | Admin | Create new product |
| `/api/products/:id` | PUT | Admin | Update product |
| `/api/products/:id` | DELETE | Admin | Delete product |

#### ⭐ Reviews API
| Endpoint | Method | Auth Required | Description |
|----------|--------|--------------|-------------|
| `/api/reviews` | GET | No | Get all reviews |
| `/api/reviews/product/:productId` | GET | No | Get reviews for a product |
| `/api/reviews` | POST | Yes | Create review |
| `/api/reviews/:id` | PUT | Yes (owner) | Update review |
| `/api/reviews/:id` | DELETE | Yes (owner) | Delete review |

#### 🛒 Cart API
| Endpoint | Method | Auth Required | Description |
|----------|--------|--------------|-------------|
| `/api/cart/:userId` | GET | No | Get user's cart |
| `/api/cart/add` | POST | No | Add item to cart |
| `/api/cart/update` | PUT | No | Update cart item quantity |
| `/api/cart/remove/:productId` | DELETE | No | Remove item from cart |
| `/api/cart/clear/:userId` | DELETE | No | Clear entire cart |

#### 📋 Orders API
| Endpoint | Method | Auth Required | Description |
|----------|--------|--------------|-------------|
| `/api/orders/user/:userId` | GET | No | Get user's orders |
| `/api/orders/:id` | GET | No | Get single order |
| `/api/orders/create` | POST | No | Create new order |
| `/api/orders/:id/cancel` | PUT | No | Cancel order |

#### 🛡️ Admin API
| Endpoint | Method | Auth Required | Description |
|----------|--------|--------------|-------------|
| `/api/admin/login` | POST | No | Admin authentication |
| `/api/admin/dashboard` | GET | Admin | Dashboard statistics |
| `/api/admin/users` | GET | Admin | List all users |
| `/api/admin/users/:id/toggle-admin` | PATCH | Admin | Toggle admin role |
| `/api/admin/users/:id` | DELETE | Admin | Delete user |
| `/api/admin/orders` | GET | Admin | List all orders |
| `/api/admin/orders/:id` | GET | Admin | Get order details |
| `/api/admin/orders/:id/status` | PATCH | Admin | Update order status |

#### 🔧 Backend Features
- **JWT Authentication** with token-based sessions
- **Password Hashing** using bcryptjs (10 rounds)
- **File Upload** via Multer for product images
- **Input Validation** on all endpoints
- **Error Handling** with proper HTTP status codes
- **Swagger Documentation** at `/api-docs`
- **CORS Configuration** for frontend communication
- **Static File Serving** for uploaded images

---

### Interactive Features

| Feature | Description |
|---------|-------------|
| **Product Search** | Homepage search bar redirects to products page with query, finds similar products |
| **Smart Filtering** | Filter by category, color, and sort by latest/price |
| **Similar Products** | Scoring algorithm finds related products by name, category, description |
| **Color Selection** | Per-product color picker on product detail page |
| **Success Toasts** | Animated notifications for cart add, login, signup |
| **Expandable Sections** | FAQ-style accordion on Returns & Exchange page |
| **Modal Forms** | Return request, login/signup, color guide, layout planner, quality guide |
| **Progress Bars** | Shipping threshold progress in cart |
| **Image Upload** | Drag-and-drop style with preview in admin product form |
| **Multi-step Forms** | 4-step signup with progress indicator |
| **Responsive Tables** | Scrollable comparison tables in quality guide |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Neon PostgreSQL** database (free tier available)

### 1. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your Neon database URL and JWT secret

# Initialize database (creates tables + seed data)
npm run db:init

# Start backend server
npm run dev
```

Backend runs on `http://localhost:8000`
API Documentation: `http://localhost:8000/api-docs`

### 2. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure backend URL
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🗄️ Database Setup

### Using Neon (PostgreSQL)

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from the dashboard
4. Add to `backend/.env`:
   ```env
   DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
   JWT_SECRET=your_random_secret_key
   PORT=8000
   FRONTEND_URL=http://localhost:3000
   ```
5. Initialize the database:
   ```bash
   cd backend
   npm run db:init
   ```

### Database Schema

| Table | Description |
|-------|-------------|
| `users` | User accounts with first/last name, email, password hash, phone, admin flag |
| `user_addresses` | Shipping addresses linked to users |
| `products` | Product catalog with name, price, image, category, stock, colors |
| `reviews` | Product reviews with rating (1-5) and review text |
| `orders` | Customer orders with status, shipping info, payment details |
| `order_items` | Line items for each order |
| `cart` | Shopping cart per user |
| `cart_items` | Items in each cart with quantity |

---

## 📡 API Endpoints

Full interactive API documentation is available via **Swagger UI** at:
```
http://localhost:8000/api-docs
```

See [backend/README.md](backend/README.md) for detailed endpoint documentation.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | React framework (App Router) |
| React | 19 | UI library |
| TypeScript | Latest | Type safety |
| Tailwind CSS | 3.x | Utility-first CSS |
| Lucide React | Latest | Icon library |
| SweetAlert2 | Latest | Beautiful alert modals |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express | 4.x | Web framework |
| TypeScript | Latest | Type safety |
| Neon (@neondatabase/serverless) | Latest | PostgreSQL driver |
| JWT | Latest | Authentication tokens |
| bcryptjs | Latest | Password hashing |
| Multer | Latest | File upload handling |
| Swagger | Latest | API documentation |
| CORS | Latest | Cross-origin requests |
| dotenv | Latest | Environment variables |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
JWT_SECRET=your_super_secret_random_string
PORT=8000
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 🌐 Deployment

### Backend
Recommended platforms: **Railway**, **Render**, **DigitalOcean App Platform**

1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables in platform dashboard
4. Deploy

### Frontend
Recommended platform: **Vercel** (official Next.js hosting)

1. Push code to GitHub
2. Import project in Vercel
3. Set `NEXT_PUBLIC_BACKEND_URL` to your deployed backend URL
4. Deploy

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.
