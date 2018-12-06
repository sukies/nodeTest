## 命令行进入数据库

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

## 创建classify

| Field     | Type             | Null | Key | Default | Extra          |
|-----------|------------------|------|-----|---------|----------------|
| id        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name      | varchar(100)     | NO   |     | NULL    |                |
| parent_id | int(11)          | YES  |     | NULL    |                |

```sql
CREATE TABLE IF NOT EXISTS `classify`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `parent_id` INT,
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

插入数据
```sql
INSERT INTO classify
  -> ( name,parent_id)
  -> VALUES
  -> ( "测试",0);
  INSERT INTO classify (name,parent_id) VALUES ("测试11",1);
```