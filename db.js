const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 20,
    'host': process.env.mysqlHost,
    'user': process.env.mysqlUser,
    'password': process.env.mysqlPassword,
    'database': process.env.mysqlDatabase
});

module.exports = {
    connection: pool,
}