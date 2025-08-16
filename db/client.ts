// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg"
import dotenv from "dotenv"
import { logger } from '../lib/logger';

if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: './.env.local' })
}


const pool = new Pool({
    connectionString: process.env.DB_URL!
})


export async function testDbConnection() {
    try {
        const client = await pool.connect();
        logger.info("DATABASE CONNECTION SUCCESSFULL")
        client.release(); // Release the client back to the pool
    } catch (error) {
        // console.error('❌ Failed to connect to the database:', error);
        logger.error(error, 'Failed to connect to the database')
        // Throw the error to prevent the main application from starting
        // throw error;

        process.exit(1)

    }
}

export const db = drizzle({ client: pool })
