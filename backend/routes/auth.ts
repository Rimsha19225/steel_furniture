import { Router, Request, Response } from 'express';
import { query } from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateTokenWithLoginTracking } from '../middleware/auth';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Error creating user
 */
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone, address, city, state, zip, country } = req.body;
    
    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const userResult = await query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, created_at`,
      [firstName, lastName, email, passwordHash, phone || null]
    );
    
    const user = userResult.rows[0];
    
    // Create address if provided
    if (address) {
      await query(
        `INSERT INTO user_addresses (user_id, address, city, state, zip_code, country, is_default)
         VALUES ($1, $2, $3, $4, $5, $6, true)`,
        [user.id, address, city || '', state || '', zip || '', country || '']
      );
    }
    
    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last_login_at
    await query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 addresses:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Invalid token
 *       404:
 *         description: User not found
 */
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const result = await query(
      `SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE id = $1`,
      [decoded.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = result.rows[0];
    
    // Get addresses
    const addressesResult = await query(
      `SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC`,
      [decoded.userId]
    );
    
    res.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        createdAt: user.created_at
      },
      addresses: addressesResult.rows
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Error updating profile
 */
router.put('/profile', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { firstName, lastName, phone } = req.body;

    const result = await query(
      `UPDATE users
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           phone = COALESCE($3, phone),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id, first_name, last_name, email, phone`,
      [firstName, lastName, phone, decoded.userId]
    );

    const user = result.rows[0];
    res.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

/**
 * @swagger
 * /api/auth/online:
 *   post:
 *     summary: Set user online status
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isOnline
 *             properties:
 *               isOnline:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Online status updated
 *       401:
 *         description: Invalid token
 */
router.post('/online', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const { isOnline } = req.body;

    await query(
      'UPDATE users SET is_online = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [isOnline !== false, decoded.userId]
    );

    res.json({ message: 'Online status updated', isOnline: isOnline !== false });
  } catch (error) {
    console.error('Error updating online status:', error);
    res.status(500).json({ message: 'Error updating online status' });
  }
});

export default router;
