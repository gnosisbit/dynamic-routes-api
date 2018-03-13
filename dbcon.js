var mysql = require('mysql');
var config = require('./config.js');
var connection = mysql.createConnection(config);

try {
    connection.connect();
} catch(e) {
    connection.error=e;    
    console.log('Database Connection failed:' + e);
}

module.exports = connection;
