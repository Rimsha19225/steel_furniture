import dotenv from 'dotenv';
dotenv.config();

import { Pool, neonConfig } from '@neondatabase/serverless';
import WebSocket from 'ws';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = WebSocket;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Warning: DATABASE_URL environment variable is not set');
  console.error('Please copy .env.example to .env and configure your database URL');
}

export const pool = connectionString ? new Pool({ 
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}) : null;

export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database connection not configured. Please set DATABASE_URL in your .env file.');
  }
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function initDatabase() {
  try {
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    console.log('Creating database tables...');

    // Execute the entire schema as a single batch
    await query(schema);

    console.log('Database initialized successfully!');
    console.log('Tables created: users, user_addresses, products, reviews, orders, order_items, cart, cart_items');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
