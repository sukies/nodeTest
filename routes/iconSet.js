var express = require('express');
var router = express.Router();

var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: '3306',
  database: 'icon'
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //SQL语句
  // var  sql = 'SELECT * FROM name';
  // var  addSql = 'INSERT INTO name(id,name,sex) VALUES(?,?,?)';
  //
  // //解析请求参数
  // var params = URL.parse(req.url, true).query;
  // var addSqlParams = [params.id, params.name, params.sex];
  //
  //
  // //增
  // connection.query(addSql,addSqlParams,function (err, result) {
  //   if(err){
  //     console.log('[INSERT ERROR] - ',err.message);
  //     return;
  //   }
  // });
  res.send('respond with a resource');
});

module.exports = router;
