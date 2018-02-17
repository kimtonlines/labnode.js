//
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'kimt',
  password : '1992',
  database : 'gestion_article'
});

connection.connect();

module.exports = connection;