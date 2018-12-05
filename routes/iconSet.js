var express = require('express');
var router = express.Router();
var URL = require('url');
var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: '3306',
  database: 'icon'
});
connection.connect();


//SQL语句
var  sql = 'SELECT * FROM icon_list';
var  addSql = 'INSERT INTO name(name,tag,classify,default,double,three) VALUES(?,?,?,?,?,?)';


/* GET users listing. */
router.get('/', function(req, res, next) {
  // //解析请求参数
  var params = URL.parse(req.url, true).query;
  console.log(params);
  var addSqlParams = [params.name||'', params.tag||'', params.classify||'',params.default||'',params.double||'',params.three||''];
  console.log(addSqlParams)
  // //增
  connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }
  });
  res.send({
    params:params
  });
});

module.exports = router;
