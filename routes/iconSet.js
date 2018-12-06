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
let search = 'SELECT * FROM icon_list';
let addIcon = 'INSERT INTO icon_list (name,tag,classify,def,two_mul,three_mul) VALUES (?,?,?,?,?,?)';


/** GET users listing. */


router.get('/addList', (req, res, next) => {
  let params = URL.parse(req.url, true).query;
  let addSqlParams = [params.name || '', params.tag || '', params.classify || '', params.def || '', params.two_mul || '', params.three_mul || ''];
  connection.query(addIcon, addSqlParams, (err, result) => {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
  });
  connection.query(search, (err, result) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    res.send({
      code:1,
      data:result
    });
  });
});

router.get('/search', (req, res, next) => {
  let params = URL.parse(req.url, true).query;
  
  connection.query(search, (err, result) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    res.send({
      code:1,
      data:result
    });
  });
});

module.exports = router;
