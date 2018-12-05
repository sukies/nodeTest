# node+express+mysql实践 文档记录

## node安装 （跳过~）

## express 安装

> express 文档：<a href='http://www.expressjs.com.cn/starter/generator.html'>http://www.expressjs.com.cn/starter/generator.html</a>

```js
npm install express-generator -g
```

创建应用（到需要创建项目的目录下面）
```js
express --view=pug myapp()
```

安装依赖
```
cd myapp
npm install
```

启动
```
set DEBUG=myapp:* & npm start
```

## mysql 安装

> mysql 下载地址：<a href='https://dev.mysql.com/downloads/mysql/'>https://dev.mysql.com/downloads/mysql/</a>

> 安装参考文档 <a href='http://www.runoob.com/mysql/mysql-install.html'>菜鸟教程</a>

启动mysql后，登录mysql，（在mysql的bin目录下）
```
mysql -u root -p
```

创建数据库
```
create DATABASE icon;
```

进入数据库
```
use icon
```

创建数据表
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


插入数据（）
```sql
INSERT INTO icon_list
  -> ( name, tag,classify,def,two_mul,three_mul)
  -> VALUES
  -> ( "扫码成功icon", "","-1","","https://assets.2dfire.com/frontend/38118d30f50a0f7b898c2c997b3556ff.png","https://assets.2dfire.com/frontend/4f313a07ab1e8dc9175cb4fb3266e0e4.png");
```

## node 实现增加数据操作

node安装mysql
```
npm install mysql
```

node 连接数据库（在原来的routers/user.js页面，这边是routers/iconSet.js，只是改了页面名称，其他都不影响）

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

 node 查询
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

 <a href='../routers/iconSet.js'>完整代码</a>
实现后可在浏览器输入http://localhost:3000/iconSet/addList?name=ceshi&two_mul=htt验证

## 其他
<a href='mysql.md'>mysql说明，及一些笔记</a>



