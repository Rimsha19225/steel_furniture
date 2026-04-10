import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import { initDatabase } from './db';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import reviewsRouter from './routes/reviews';
import cartRouter from './routes/cart';
import ordersRouter from './routes/orders';
import adminRouter from './routes/admin';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize database
initDatabase().catch(console.error);

// Home route
app.get('/', (req, res) => {
  res.json({
    name: 'Steel Furniture API',
    version: '1.0.0',
    description: 'Backend API for Steel Furniture e-commerce platform',
    endpoints: {
      api: '/api',
      docs: '/api-docs',
      health: '/health'
    },
    documentation: 'Visit /api-docs for interactive API documentation'
  });
});

// API routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Steel Furniture API Docs'
}));

// Redirect /docs to /api-docs
app.get('/docs', (req, res) => {
  res.redirect('/api-docs');
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: {
      home: '/',
      api: '/api',
      docs: '/api-docs',
      health: '/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║     Steel Furniture Backend Server             ║
╠════════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}      ║
║  API Documentation: http://localhost:${PORT}/api-docs ║
║  Health Check: http://localhost:${PORT}/health    ║
╚════════════════════════════════════════════════╝
  `);
});

export default app;
