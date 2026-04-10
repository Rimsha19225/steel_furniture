import { query, initDatabase } from '../db';

async function addColorsColumn() {
  try {
    console.log('Adding colors column to products table...');
    
    // Add colors column as JSONB to store array of color hex codes
    await query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS colors JSONB DEFAULT '["#ffffff","#000000","#6b7280"]'::jsonb
    `);
    console.log('✓ Added colors column');
    
    console.log('\nMigration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run migration
initDatabase()
  .then(() => addColorsColumn())
  .catch(console.error);
