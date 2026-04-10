import { query, initDatabase } from '../db';

async function addTrackingColumns() {
  try {
    console.log('Adding user tracking columns...');
    
    // Add last_login_at column if it doesn't exist
    await query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE
    `);
    console.log('✓ Added last_login_at column');
    
    // Add is_online column if it doesn't exist
    await query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false
    `);
    console.log('✓ Added is_online column');
    
    console.log('\nMigration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run migration
initDatabase()
  .then(() => addTrackingColumns())
  .catch(console.error);
