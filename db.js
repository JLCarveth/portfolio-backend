const mysql = require('mysql2/promise');
const host = 'localhost';
const user = 'jlcportfolio';
const password = 'BippityBoppityBoo69420!';
const database = 'jlcarvethdev';

const pool = mysql.createPool({
    connectionLimit: 20,
    host        : host,
    user        : user,
    password    : password,
    database    : database
});

module.exports = {
    connection : pool,
}