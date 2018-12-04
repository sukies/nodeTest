var express = require('express');
var router = express.Router();

var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: '3306',
  database: 'test'
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var  sql = 'SELECT * FROM websites';
//查
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
  });
  
  connection.end();
  console.log(111111);
  res.send('respond with a resource');
});

module.exports = router;
