import { query } from '../db';

async function deleteAllProducts() {
  try {
    console.log('Deleting all products from database...');

    // First delete related cart items
    await query('DELETE FROM cart_items');
    console.log('✓ Cleared cart items');

    // Then delete related order items
    await query('DELETE FROM order_items');
    console.log('✓ Cleared order items');

    // Delete related reviews
    await query('DELETE FROM reviews');
    console.log('✓ Cleared reviews');

    // Now delete all products
    const result = await query('DELETE FROM products');
    console.log(`✓ Deleted ${result.rowCount} products`);

    console.log('\nAll products deleted successfully!');
  } catch (error) {
    console.error('Error deleting products:', error);
    throw error;
  }
}

deleteAllProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
