import { Pool } from "pg";

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

const pool = new Pool({
    user: process.env.DB_USER,
    host:  process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: port
})

export default pool