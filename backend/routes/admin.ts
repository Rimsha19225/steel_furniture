import { Router, Request, Response } from 'express';
import { query } from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_PASSWORD = '35452222r';

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login with password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 admin:
 *                   type: object
 *       401:
 *         description: Invalid password
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if the password matches the admin password
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin password' });
    }

    // Check if admin user exists, if not create it
    let adminResult = await query('SELECT id, email, is_admin FROM users WHERE is_admin = true LIMIT 1');
    
    let admin;
    if (adminResult.rows.length === 0) {
      // Create default admin user
      const adminEmail = 'admin@steelfurniture.com';
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      
      adminResult = await query(
        `INSERT INTO users (first_name, last_name, email, password_hash, is_admin)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, is_admin`,
        ['Admin', 'User', adminEmail, passwordHash, true]
      );
    }
    
    admin = adminResult.rows[0];

    // Generate admin token
    const token = jwt.sign(
      { userId: admin.id, email: admin.email, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        isAdmin: admin.is_admin
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Error logging in as admin' });
  }
});

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get('/dashboard', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    // Get total users count
    const usersCount = await query('SELECT COUNT(*) as count FROM users');
    
    // Get total products count
    const productsCount = await query('SELECT COUNT(*) as count FROM products');
    
    // Get total orders count
    const ordersCount = await query('SELECT COUNT(*) as count FROM orders');
    
    // Get total revenue
    const revenueResult = await query("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'");
    
    // Get recent orders
    const recentOrders = await query(
      `SELECT o.*, u.first_name, u.last_name, u.email 
       FROM orders o 
       LEFT JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC 
       LIMIT 10`
    );

    res.json({
      statistics: {
        totalUsers: parseInt(usersCount.rows[0].count),
        totalProducts: parseInt(productsCount.rows[0].count),
        totalOrders: parseInt(ordersCount.rows[0].count),
        totalRevenue: parseFloat(revenueResult.rows[0].total)
      },
      recentOrders: recentOrders.rows
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/users', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT id, first_name, last_name, email, phone, is_admin, last_login_at, is_online, created_at
       FROM users
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

/**
 * @swagger
 * /api/admin/users/{id}/toggle-admin:
 *   patch:
 *     summary: Toggle admin status for a user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Admin status updated
 *       400:
 *         description: Cannot modify own admin status
 */
router.patch('/users/:id/toggle-admin', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Prevent admin from removing their own admin status
    if (req.user?.userId === id) {
      return res.status(400).json({ message: 'Cannot modify your own admin status' });
    }
    
    const result = await query(
      `UPDATE users 
       SET is_admin = NOT is_admin, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 
       RETURNING id, first_name, last_name, email, is_admin`,
      [id]
    );
    
    res.json({ message: 'Admin status updated', user: result.rows[0] });
  } catch (error) {
    console.error('Error toggling admin status:', error);
    res.status(500).json({ message: 'Error updating admin status' });
  }
});

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: Cannot delete yourself
 */
router.delete('/users/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Prevent admin from deleting themselves
    if (req.user?.userId === id) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }
    
    await query('DELETE FROM users WHERE id = $1', [id]);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get('/orders', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT o.*, u.first_name, u.last_name, u.email 
       FROM orders o 
       LEFT JOIN users u ON o.user_id = u.id 
       ORDER BY o.created_at DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

/**
 * @swagger
 * /api/admin/orders/{id}:
 *   get:
 *     summary: Get order details with items (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 */
router.get('/orders/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get order details
    const orderResult = await query(
      `SELECT o.*, u.first_name, u.last_name, u.email, u.phone 
       FROM orders o 
       LEFT JOIN users u ON o.user_id = u.id 
       WHERE o.id = $1`,
      [id]
    );
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Get order items
    const itemsResult = await query(
      `SELECT oi.*, p.name as product_name, p.image as product_image 
       FROM order_items oi 
       LEFT JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = $1`,
      [id]
    );
    
    res.json({
      order: orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Error fetching order details' });
  }
});

/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.patch('/orders/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const result = await query(
      `UPDATE orders 
       SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );
    
    res.json({ message: 'Order status updated', order: result.rows[0] });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

/**
 * @swagger
 * /api/admin/cart:
 *   get:
 *     summary: Get all user carts (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all carts with items
 */
router.get('/cart', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT c.id as cart_id, c.user_id, c.created_at as cart_created,
              u.first_name, u.last_name, u.email,
              ci.id as item_id, ci.quantity, ci.created_at as item_created,
              p.id as product_id, p.name as product_name, p.price, p.image
       FROM cart c
       LEFT JOIN users u ON c.user_id = u.id
       LEFT JOIN cart_items ci ON c.id = ci.cart_id
       LEFT JOIN products p ON ci.product_id = p.id
       ORDER BY c.created_at DESC`
    );
    
    // Group cart items by cart
    const cartsMap = new Map();
    for (const row of result.rows) {
      if (!cartsMap.has(row.cart_id)) {
        cartsMap.set(row.cart_id, {
          cart_id: row.cart_id,
          user_id: row.user_id,
          user: {
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email
          },
          created_at: row.cart_created,
          items: []
        });
      }
      
      if (row.item_id) {
        cartsMap.get(row.cart_id).items.push({
          item_id: row.item_id,
          product_id: row.product_id,
          product_name: row.product_name,
          price: row.price,
          quantity: row.quantity,
          image: row.image
        });
      }
    }
    
    res.json(Array.from(cartsMap.values()));
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({ message: 'Error fetching carts' });
  }
});

export default router;
