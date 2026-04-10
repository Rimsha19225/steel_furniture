import { Router } from 'express';
import { query } from '../db';

const router = Router();

// Get all reviews (with optional product filter)
router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    
    let sql = `
      SELECT r.*, u.first_name, u.last_name 
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
    `;
    const params: any[] = [];
    
    if (productId) {
      sql += ' WHERE r.product_id = $1';
      params.push(productId);
    }
    
    sql += ' ORDER BY r.created_at DESC';
    
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await query(
      `SELECT r.*, u.first_name, u.last_name 
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [productId]
    );
    
    // Calculate average rating
    const avgRating = result.rows.length > 0
      ? result.rows.reduce((sum, r) => sum + r.rating, 0) / result.rows.length
      : 0;
    
    res.json({
      reviews: result.rows,
      averageRating: avgRating.toFixed(1),
      totalReviews: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Create review
router.post('/', async (req, res) => {
  try {
    const { userId, productId, rating, reviewText, name, email } = req.body;
    
    // For guest reviews, we'll allow without userId
    let user_id = userId || null;
    
    // If userId is provided, verify it exists
    if (userId) {
      const userCheck = await query('SELECT id FROM users WHERE id = $1', [userId]);
      if (userCheck.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid user' });
      }
    }
    
    const result = await query(
      `INSERT INTO reviews (user_id, product_id, rating, review_text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, productId, rating, reviewText]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
});

// Update review
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, reviewText } = req.body;
    
    const result = await query(
      `UPDATE reviews 
       SET rating = COALESCE($1, rating),
           review_text = COALESCE($2, review_text),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [rating, reviewText, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM reviews WHERE id = $1', [id]);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
});

export default router;
