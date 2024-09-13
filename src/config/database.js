const { Pool} =  require('pg');
const pool =  new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'ecogreen-commerce',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

pool.on('connect', () =>  {
    console.log('Connected to PostgreSQL database');
})

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
}