## 进入数据库

``` sql
mysql -u root -p
```

## 数据库格式

icon_list数据库格式

| Field     | Type             | Null | Key | Default | Extra          |
|:---------:|:----------------:|:----:|:---:|:-------:|:--------------:|
| id        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name      | varchar(100)     | NO   |     | NULL    |                |
| tag       | varchar(100)     | YES  |     | NULL    |                |
| classify  | varchar(100)     | YES  |     | NULL    |                |
| def       | varchar(512)     | YES  |     | NULL    |                |
| two_mul   | varchar(512)     | YES  |     | NULL    |                |
| three_mul | varchar(512)     | YES  |     | NULL    |                |


## 创建icon_list

```sql
CREATE TABLE IF NOT EXISTS `icon_list`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(100),
  `classify`  INT,
  `def`  VARCHAR(512),
  `two_mul`  VARCHAR(512),
  `three_mul`  VARCHAR(512),
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

插入数据
```sql
INSERT INTO icon_list
  -> ( name, tag,classify,def,two_mul,three_mul)
  -> VALUES
  -> ( "扫码成功icon", "","-1","","https://assets.2dfire.com/frontend/38118d30f50a0f7b898c2c997b3556ff.png","https://assets.2dfire.com/frontend/4f313a07ab1e8dc9175cb4fb3266e0e4.png");
```

### 严格模式修改（）
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; //(修改加密规则 （必写）)

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; //(更新用户密码 )

FLUSH PRIVILEGES; //刷新权限（不输入也可以）
```


### 修改数据表名
```sql
ALTER TABLE  icon_list  CHANGE `default` `def` varchar(100)
```

### node 连接数据库

```js
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: '3306',
  database: 'icon'
});
connection.connect();
```

### node 查询
```js
let addSql = 'INSERT INTO icon_list (name,tag,classify,def,two_mul,three_mul) VALUES (?,?,?,?,?,?)';
let addSqlParams = ['ceshi',  '', '',  '',  '', ''];
connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
});
```

### 完整代码
实现后可在浏览器输入http://localhost:3000/iconSet/addList?name=ceshi&two_mul=htt验证
```js
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

```