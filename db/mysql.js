let mysql = require('mysql2');
let connectionPool = mysql.createPool({
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    host: process.env.mysql_host,
    database: process.env.mysql_database
});

let poolPromise = connectionPool.promise();

module.exports = poolPromise;