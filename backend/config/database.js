// import 'dotenv/config';
import dotenv from 'dotenv';
import pg from 'pg';

/**
 * Postgres Connection Pool
 */
dotenv.config();
const config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
}

export const pool = new pg.Pool(config)