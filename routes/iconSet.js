var express = require('express');
var router = express.Router();
var URL = require('url');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'icon'
});
connection.connect();


//SQL语句
let sql = 'SELECT * FROM icon_list';
let addSql = 'INSERT INTO icon_list (name,tag,classify,def,two_mul,three_mul) VALUES (?,?,?,?,?,?)';


/* GET users listing. */
router.get('/addList', (req, res, next) => {
  // //解析请求参数
  let params = URL.parse(req.url, true).query;
  let addSqlParams = [params.name || '', params.tag || '', params.classify || '', params.def || '', params.two_mul || '', params.three_mul || ''];
  
  //增
  connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
  });
  //查
  connection.query(sql, (err, result) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    //把搜索值输出
    res.send(result);
  });
});

module.exports = router;
