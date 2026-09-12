require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function getUser() {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC')
    return result.rows
}

async function createUser(name, email, phone, role, status) {
    const result = await pool.query(`
        INSERT INTO users (name, email, phone, role, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [name, email, phone, role, status])
    console.log('eror')
    return result.rows[0]
}

async function getEditUsers(id) {
    const result = await pool.query(`
        SELECT * FROM users WHERE id = $1`,
        [id])
    return result.rows[0]
}

async function updateUsers(id, name, email, phone, role, status) {
    const result = await pool.query(`
            UPDATE users
            SET name = $1, email = $2, phone = $3, role = $4, status = $5
            WHERE id = $6
            RETURNING *`,
        [name, email, phone, role, status, id])
    return result.rows[0]
}

async function deleteUsers(id) {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        RETURNING *`,
        [id])
    return result.rows[0]
}

module.exports = {
    getUser,
    createUser,
    getEditUsers,
    updateUsers,
    deleteUsers
}