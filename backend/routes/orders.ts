import { Router } from 'express';
import { query } from '../db';

const router = Router();

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    
    const orders = await Promise.all(
      result.rows.map(async (order) => {
        const itemsResult = await query(
          `SELECT oi.*, p.name, p.image 
           FROM order_items oi
           JOIN products p ON oi.product_id = p.id
           WHERE oi.order_id = $1`,
          [order.id]
        );
        
        return {
          ...order,
          items: itemsResult.rows
        };
      })
    );
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const orderResult = await query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const order = orderResult.rows[0];
    const itemsResult = await query(
      `SELECT oi.*, p.name, p.image 
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [id]
    );
    
    res.json({
      ...order,
      items: itemsResult.rows
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Create order
router.post('/create', async (req, res) => {
  try {
    const { userId, items, shippingAddress, shippingCity, shippingState, shippingZip, shippingCountry, paymentMethod, customerEmail, customerPhone, customerName } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const productResult = await query('SELECT price, stock_quantity FROM products WHERE id = $1', [item.productId]);
      if (productResult.rows.length === 0) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      const product = productResult.rows[0];
      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += parseFloat(product.price) * item.quantity;
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // For guest checkout, userId will be null
    const actualUserId = userId && userId !== 'guest' ? userId : null;

    // Create order
    const orderResult = await query(
      `INSERT INTO orders (user_id, order_number, total_amount, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country, payment_method, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [actualUserId, orderNumber, totalAmount, shippingAddress, shippingCity, shippingState || '', shippingZip || '', shippingCountry, paymentMethod || 'COD', 'pending']
    );

    const order = orderResult.rows[0];

    // Create order items and update stock
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         SELECT $1, $2, $3, price FROM products WHERE id = $4`,
        [order.id, item.productId, item.quantity, item.productId]
      );

      // Update stock
      await query(
        `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
        [item.quantity, item.productId]
      );
    }

    // Clear cart if user is logged in
    if (actualUserId) {
      const cartResult = await query('SELECT id FROM cart WHERE user_id = $1', [actualUserId]);
      if (cartResult.rows.length > 0) {
        await query('DELETE FROM cart_items WHERE cart_id = $1', [cartResult.rows[0].id]);
      }
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        orderNumber: order.order_number,
        totalAmount: order.total_amount,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});
// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await query(
      `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Cancel order
router.put('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    
    const orderResult = await query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const order = orderResult.rows[0];
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }
    
    // Update order status
    await query(
      `UPDATE orders SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [id]
    );
    
    // Restore stock
    const itemsResult = await query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [id]);
    for (const item of itemsResult.rows) {
      await query(
        `UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2`,
        [item.quantity, item.product_id]
      );
    }
    
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

export default router;
