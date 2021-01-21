const mysql = require('mysql2');
const host = 'localhost';
const user = 'jlcportfolio';
const password = 'BippityBoppityBoo69420!';
const database = 'jlcarvethdev';

var connection = mysql.createPool({
    connectionLimit: 20,
    host        : host,
    user        : user,
    password    : password,
    database    : database
});

module.exports = {
    connection : connection,
}