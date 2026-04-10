import { query } from '../db';

async function addAdminColumn() {
  console.log('Adding is_admin column to users table...');
  try {
    // Check if column already exists
    const result = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'is_admin'
    `);
    
    if (result.rows.length === 0) {
      await query('ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT false');
      console.log('Column is_admin added successfully!');
    } else {
      console.log('Column is_admin already exists.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding is_admin column:', error);
    process.exit(1);
  }
}

addAdminColumn();
