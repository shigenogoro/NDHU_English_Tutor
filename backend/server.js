import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg'
import {register, login, resetPassword} from './auth.js';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = pg

/**
 * Middleware
 */
app.use(cors());
app.use(bodyParser.json());


/**
 * Postgres Connection Pool
 */
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Initialize database
async function initializeDatabase() {
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

/**
 * Routes: API Endpoints
 */
app.post('/register', (req, res) => register(req, res, pool));
app.post('/login', (req, res) => login(req, res, pool));
app.put('/reset-password', (req, res) => resetPassword(req, res, pool));

/**
 * Define Routing
 */

app.get('/', (req, res) => {
    res.send("Hello Express");
})


/**
 * Start the server
 */


app.listen(PORT, async () => {
    await initializeDatabase();
    console.log("Database is connected and initialized.");
    console.log(`Server is running on port ${PORT}`);
})