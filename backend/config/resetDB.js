import 'dotenv/config';
import { pool } from './database.js';

// Initialize database
const initializeDatabase = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          role BOOLEAN NOT NULL DEFAULT FALSE 
        );
      `);
      console.log('Users table ensured to exist.');
    } catch (error) {
      console.error('Error initializing database:', error.message);
    }
}

// Call initializeDatabase function
initializeDatabase();