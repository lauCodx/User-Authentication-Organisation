import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host:  process.env.DB_HOST,
    database: "users_auth",
    password: process.env.PASSWORD,
    port: 3030
})

export default pool