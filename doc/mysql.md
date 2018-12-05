## 启动数据库

```
mysql -u root -p
```

## 数据库格式

iconList

| type                  | 类型                | 说明          | 是否必传      |备注                     |
|:--------------------- |:-------------------:|:-------------:|:-------------:|:-----------------------:|
| id                    | Object              | 配置内容      |是             |                         |
| name                  | File、Array         | 文件内容      |否             |                         |
| tag                   | Number              | 文件压缩程度  |否             |0-1，大于1为0.92,默认0.85|
| classify              | String              | 转换后文件类型|否             | 可选值：jpg、jpeg、png、webp  |
| default               | String              | 转换后文件类型|否             | 可选值：jpg、jpeg、png、webp  |
| double                | String              | 返回文件类型  |否             | 可选值：data64          |
| three                 | Function            | 回调函数      |是             | 返回值res               |



iconList

| type                  | 类型                | 说明          | 是否必传      |备注                     |
|:--------------------- |:-------------------:|:-------------:|:-------------:|:-----------------------:|
| id                    | Object              | 配置内容      |是             |                         |
| name                  | File、Array         | 文件内容      |否             |                         |
| tag                   | Number              | 文件压缩程度  |否             |0-1，大于1为0.92,默认0.85|
| classify              | String              | 转换后文件类型|否             | 可选值：jpg、jpeg、png、webp  |
| default               | String              | 转换后文件类型|否             | 可选值：jpg、jpeg、png、webp  |
| double                | String              | 返回文件类型  |否             | 可选值：data64          |
| three                 | Function            | 回调函数      |是             | 返回值res               |

## 记录
创建icon_list

```sql
CREATE TABLE IF NOT EXISTS `icon_list`(
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(100),
  `classify`  INT,
  `default`  VARCHAR(100),
  `double`  VARCHAR(100),
  `three`  VARCHAR(100),
  PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

插入数据
```sql
INSERT INTO icon_list
  -> ( name, tag,classify,default,double,three)
  -> VALUES
  -> ( "扫码成功icon", "","-1","","https://assets.2dfire.com/frontend/38118d30f50a0f7b898c2c997b3556ff.png","https://assets.2dfire.com/frontend/4f313a07ab1e8dc9175cb4fb3266e0e4.png");
```


### 严格模式修改
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; //(修改加密规则 （必写）)

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; //(更新用户密码 )

FLUSH PRIVILEGES; //刷新权限（不输入也可以）
```


### 修改数据类型
```
alter table 表名 modify 字段名 数据类型
```

### node 连接数据库