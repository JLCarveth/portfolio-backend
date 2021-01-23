const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: process.env.mysql.host,
    user: process.env.mysql.user,
    password: process.env.mysql.password,
    database: process.env.mysql.database
});

module.exports = {
    connection: pool,
}