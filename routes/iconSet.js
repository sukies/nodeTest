var express = require('express');
var router = express.Router();
var URL = require('url');
var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  port: '3306',
  database: 'icon'
});
connection.connect();


//SQL语句
var  sql = 'SELECT * FROM icon_list';
var  addSql = 'INSERT INTO icon_list (name,tag,classify,"default","double",three) VALUES (?,?,?,?,?,?)';
// "INSERT INTO `icon_list`(`name`, `tag`, `classify`, `default`, `double`, `three`) VALUES (\"扫码成功icon\", \"\",\"-1\",\"\",\"https://assets.2dfire.com/frontend/38118d30f50a0f7b898c2c997b3556ff.png\",\"https://assets.2dfire.com/frontend/4f313a07ab1e8dc9175cb4fb3266e0e4.png\");"
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
  //查
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    console.log(params.id);
    
    //把搜索值输出
    res.send(result);
  });
});

module.exports = router;
