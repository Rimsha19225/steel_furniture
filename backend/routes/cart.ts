import { Router } from 'express';
import { query } from '../db';

const router = Router();

// Get cart for user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get or create cart
    let cartResult = await query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    
    if (cartResult.rows.length === 0) {
      cartResult = await query('INSERT INTO cart (user_id) VALUES ($1) RETURNING *', [userId]);
    }
    
    const cart = cartResult.rows[0];
    
    // Get cart items with product details
    const itemsResult = await query(
      `SELECT ci.*, p.name, p.price, p.image 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );
    
    // Calculate total
    const total = itemsResult.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      cartId: cart.id,
      items: itemsResult.rows,
      total: total.toFixed(2)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    
    // Get or create cart
    let cartResult = await query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    
    if (cartResult.rows.length === 0) {
      cartResult = await query('INSERT INTO cart (user_id) VALUES ($1) RETURNING *', [userId]);
    }
    
    const cart = cartResult.rows[0];
    
    // Check if item already exists in cart
    const existingItem = await query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cart.id, productId]
    );
    
    if (existingItem.rows.length > 0) {
      // Update quantity
      await query(
        `UPDATE cart_items 
         SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP
         WHERE cart_id = $2 AND product_id = $3`,
        [quantity, cart.id, productId]
      );
    } else {
      // Add new item
      await query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
        [cart.id, productId, quantity]
      );
    }
    
    // Return updated cart
    const itemsResult = await query(
      `SELECT ci.*, p.name, p.price, p.image 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );
    
    const total = itemsResult.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      cartId: cart.id,
      items: itemsResult.rows,
      total: total.toFixed(2)
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

// Update cart item quantity
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    const cartResult = await query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const cart = cartResult.rows[0];
    
    if (quantity <= 0) {
      // Remove item
      await query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart.id, productId]);
    } else {
      // Update quantity
      await query(
        'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3',
        [quantity, cart.id, productId]
      );
    }
    
    // Return updated cart
    const itemsResult = await query(
      `SELECT ci.*, p.name, p.price, p.image 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );
    
    const total = itemsResult.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      cartId: cart.id,
      items: itemsResult.rows,
      total: total.toFixed(2)
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.query;
    
    const cartResult = await query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const cart = cartResult.rows[0];
    await query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart.id, productId]);
    
    // Return updated cart
    const itemsResult = await query(
      `SELECT ci.*, p.name, p.price, p.image 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );
    
    const total = itemsResult.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.json({
      cartId: cart.id,
      items: itemsResult.rows,
      total: total.toFixed(2)
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart' });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cartResult = await query('SELECT * FROM cart WHERE user_id = $1', [userId]);
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const cart = cartResult.rows[0];
    await query('DELETE FROM cart_items WHERE cart_id = $1', [cart.id]);
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Error clearing cart' });
  }
});

export default router;
