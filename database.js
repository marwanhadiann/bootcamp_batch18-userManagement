require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function getUser() {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC')
    return result.rows
}

async function getUsersPagination(search = '', limit = 6, offset = 0) {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE name ILIKE $1
        ORDER BY id DESC
        LIMIT $2 OFFSET $3
        `, [`%${search}%`, limit, offset])
    return result.rows
}

async function getUsersCount(search = '') {
    const result = await pool.query(`
        SELECT COUNT(*)
        FROM users
        WHERE name ILIKE $1
        `, [`%${search}%`])
    return parseInt(result.rows[0].count)
}

async function createUser(name, email, phone, role, status) {
    const result = await pool.query(`
        INSERT INTO users (name, email, phone, role, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [name, email, phone, role, status])
    console.log('Data Berhasil ditambahkan')
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

async function isNameExist(name) {
    const result = await pool.query(
        `SELECT id FROM users WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))`,
        [name]
    )
    return result.rows.length > 0
}

module.exports = {
    getUser,
    getUsersPagination,
    getUsersCount,
    createUser,
    getEditUsers,
    updateUsers,
    deleteUsers,
    isNameExist
}