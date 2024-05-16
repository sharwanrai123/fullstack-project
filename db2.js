var mysql      = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'appsmartz',
    password: '(JY-fFYGVvKSOxZ5',
    database: 'nodedb'
});
 
conn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports={conn};