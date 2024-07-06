import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "users_auth",
    password: process.env.PASSWORD,
    port: 3030
})

export default pool;