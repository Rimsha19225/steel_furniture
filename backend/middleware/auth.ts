import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    isAdmin: boolean;
  };
}

// Middleware to verify JWT token and attach user to request
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    // Check if user exists and get admin status
    const result = await query('SELECT id, email, is_admin FROM users WHERE id = $1', [decoded.userId]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    req.user = {
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to verify JWT token and update last_login_at
export const authenticateTokenWithLoginTracking = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    // Check if user exists and get admin status, update last_login_at
    const result = await query(
      `UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, email, is_admin`,
      [decoded.userId]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    req.user = {
      userId: user.id,
      email: user.email,
      isAdmin: user.is_admin
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if user is admin
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};
