const mysql = require('mysql2');

const dbConfig = {
   host: 'localhost',
   user: 'kyunggeun',
   password: 'cometrue',
   port: 3306,
   database: 'music',
   multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;