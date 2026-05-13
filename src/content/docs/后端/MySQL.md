# MySQL

| 操作类型 | 命令 | 示例 |
| --- | --- | --- |
| 安装 MySQL | `sudo apt-get install mysql-server`（Ubuntu/Debian 系统）  
`sudo yum install mysql-server`（RedHat/CentOS 系统） | `sudo apt-get install mysql-server` |
| 启动 MySQL 服务 | `sudo systemctl start mysql` | `sudo systemctl start mysql` |
| 停止 MySQL 服务 | `sudo systemctl stop mysql` | `sudo systemctl stop mysql` |
| 重启 MySQL 服务 | `sudo systemctl restart mysql` | `sudo systemctl restart mysql` |
| 查看 MySQL 服务状态 | `sudo systemctl status mysql` | `sudo systemctl status mysql` |
| 登录 MySQL | `mysql -u root -p` | `mysql -u root -p` |
| 显示所有数据库 | `SHOW DATABASES;` | `SHOW DATABASES;` |
| 创建新数据库 | `CREATE DATABASE 数据库名;` | `CREATE DATABASE example_db;` |
| 删除数据库 | `DROP DATABASE 数据库名;` | `DROP DATABASE example_db;` |
| 选择数据库 | `USE 数据库名;` | `USE example_db;` |
| 显示当前数据库中的所有表 | `SHOW TABLES;` | `SHOW TABLES;` |
| 查看表的结构 | `DESCRIBE 表名;` | `DESCRIBE users;` |
| 创建新表 | `CREATE TABLE 表名 (列名1 数据类型, 列名2 数据类型, ...);` | `CREATE TABLE users (id INT, name VARCHAR(100));` |
| 删除表 | `DROP TABLE 表名;` | `DROP TABLE users;` |
| 向表中插入数据 | `INSERT INTO 表名 (列1, 列2, ...) VALUES (值1, 值2, ...);` | `INSERT INTO users (id, name) VALUES (1, 'Alice');` |
| 从表中查询数据 | `SELECT * FROM 表名;` | `SELECT * FROM users;` |
| 更新表中的数据 | `UPDATE 表名 SET 列1 = 值1, 列2 = 值2 WHERE 条件;` | `UPDATE users SET name = 'Bob' WHERE id = 1;` |
| 从表中删除数据 | `DELETE FROM 表名 WHERE 条件;` | `DELETE FROM users WHERE id = 1;` |
| 备份数据库 | `mysqldump -u 用户名 -p 数据库名 > 备份文件名.sql` | `mysqldump -u root -p example_db > backup.sql` |
| 恢复数据库 | `mysql -u 用户名 -p 数据库名 < 备份文件名.sql` | `mysql -u root -p example_db < backup.sql` |
| 显示当前用户 | `SELECT USER();` | `SELECT USER();` |
| 创建新用户 | `CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';` | `CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';` |
| 删除用户 | `DROP USER '用户名'@'主机名';` | `DROP USER 'newuser'@'localhost';` |
| 授权用户 | `GRANT 权限 ON 数据库.表 TO '用户名'@'主机名';` | `GRANT ALL ON example_db.* TO 'newuser'@'localhost';` |
| 撤销权限 | `REVOKE 权限 ON 数据库.表 FROM '用户名'@'主机名';` | `REVOKE ALL ON example_db.* FROM 'newuser'@'localhost';` |
| 显示用户权限 | `SHOW GRANTS FOR '用户名'@'主机名';` | `SHOW GRANTS FOR 'newuser'@'localhost';` |
| 刷新权限 | `FLUSH PRIVILEGES;` | `FLUSH PRIVILEGES;` |
| 更改用户密码 | `ALTER USER '用户名'@'主机名' IDENTIFIED BY '新密码';` | `ALTER USER 'newuser'@'localhost' IDENTIFIED BY 'newpassword';` |
| 查看当前活动的连接 | \`SHOW PROCESS |  |

## 列类型

### 数值

* tinyint 十分小的数据 1个字节
* smallint 较小的数据 2个字节
* mediumint 中等大小的数据 3个字节
* int 标准的整数 4个字节 常用的int
* bigint 较大的数据 8个字节
* float 浮点数 4个字节
* double 浮点数 8个字节（精度问题！）
* decimal 字符串形式的浮点数金融计算的时候，一般是使用 decimal

### 字符串

* char 字符串固定大小 0-255
* varchar 可变字符串 0-65535 (常用的变量string)
* tinytext 微型文本 2^8 - 1
* text 文本串 2^16 - 1 （保存大文本）

### 时间日期

* date YYYY-MM-DD 日期
* time HH:mm:ss 时间
* datetime YYYY-MM-DD HH:mm:ss 最常用的时间格式
* timestamp 时间戳
* year 年份表示

### null

* 没有值，未知（注意，不要使用NULL进行运算，结果为NULL）

## 字段属性

### Unsigned

* 无符号的整数
* 声明该列不能声明为负数

### zerofill

* 0填充的
* 不足的位数，使用0来填充

### 自增

* 通常理解为自增
* 通常用来设置唯一的主键，必须是整数类型
* 可以自定义设置主键自增的起始值和步长

### 非空 NULL not NULL

* 设置为 not NULL，如果不赋值，就会报错
* NULL，如果不填写值，默认是null

### 默认

* 设置默认的值
* sex，默认值为男，如果不指定该列的值，则会有默认的值

> 拓展：
>
> 每一个表都必须存在一下五个字段，表示一个记录存在的意义
>
> * id 主键
> * `version` 乐观锁
> * is\_delete 伪删除
> * gmt\_create 创建时间
> * gmt\_update 修改时间

## 表类型

NNODB默认使用

YISAM早些年使用的

|  | MYISAM | INNODB |
| --- | --- | --- |
| 事务支持 | 不支持 | 支持 |
| 数据行锁定 | 不支持 | 支持 |
| 外键约束 | 不支持 | 支持 |
| 全文索引 | 支持 | 不支持 |
| 表空间大小 | 较小 | 较大，约为2倍 |

常规使用操作：

* MYISAM：节约空间，速度较快
* INNODB：安全性高，事务的处理，多表多用户操作

## 函数

### 常用函数

**数据函数**

```sql
SELECT ABS(-8);  /*绝对值*/
SELECT CEILING(9.4); /*向上取整*/ 
SELECT FLOOR(9.4);   /*向下取整*/ 
SELECT RAND();  /*随机数,返回一个0-1之间的随机数*/ 
SELECT SIGN(0); /*符号函数: 负数返回-1,正数返回1,0返回0*/
```

**字符串函数**

```sql
SELECT CHAR_LENGTH('坚持就能成功'); /*返回字符串包含的字符数*/ 
SELECT CONCAT('我','爱','程序');  /*合并字符串,参数可以有多个*/ 
SELECT INSERT('我爱编程helloworld',1,2,'超级热爱');  /*替换字符串,从某个位置开始替换某个长度*/ 
SELECT LOWER('FanJunyang'); /*小写*/ SELECT UPPER('FanJunyang'); /*大写*/ 
SELECT LEFT('hello,world',5);   /*从左边截取*/ 
SELECT RIGHT('hello,world',5);  /*从右边截取*/ 
SELECT REPLACE('坚持就能成功','坚持','努力');  /*替换字符串*/ 
SELECT SUBSTR('坚持就能成功',2,2); /*截取字符串,开始和长度*/ 
SELECT REVERSE('坚持就能成功'); /*反转*/ 

-- 查询姓周的同学,改成邹
SELECT REPLACE(studentname,'周','邹') AS 新名字
FROM student WHERE studentname LIKE '周%';
```

**日期和时间函数**

```sql
SELECT CURRENT_DATE();   /*获取当前日期*/ 
SELECT CURDATE();   /*获取当前日期*/ 
SELECT NOW();   /*获取当前日期和时间*/ 
SELECT LOCALTIME();   /*获取当前日期和时间*/ 
SELECT SYSDATE();   /*获取当前日期和时间*/ 

/*获取年月日,时分秒*/ 
SELECT YEAR(NOW()); 
SELECT MONTH(NOW());
SELECT DAY(NOW()); 
SELECT HOUR(NOW()); 
SELECT MINUTE(NOW()); 
SELECT SECOND(NOW());
```

**系统信息函数**

```sql
SELECT VERSION();  /*版本*/ 
SELECT USER();     /*用户*/
```

### 聚合函数

| 函数名称 | 描述 |
| --- | --- |
| COUNT() | 返回满足Select条件的记录总和数，如 select count(\*) 【不建议使用 \*，效率低】 |
| SUM() | 返回数字字段或表达式列做统计，返回一列的总和 |
| AVG() | 通常为数值字段或表达列作统计，返回一列的平均值 |
| MAX() | 可以为数值字段，字符字段或表达式列作统计，返回最大的值 |
| MIN() | 可以为数值字段，字符字段或表达式列作统计，返回最小的值 |

```sql
-- 聚合函数
/*COUNT:非空的*/
SELECT COUNT(studentname) FROM student;
SELECT COUNT(*) FROM student;
SELECT COUNT(1) FROM student;  /*推荐*/

-- 从含义上讲，count(1) 与 count(*) 都表示对全部数据行的查询。
-- count(字段) 会统计该字段在表中出现的次数，忽略字段为null 的情况。即不统计字段为null 的记录。
-- count(*) 包括了所有的列，相当于行数，在统计结果的时候，包含字段为null 的记录；
-- count(1) 用1代表代码行，在统计结果的时候，包含字段为null 的记录 。
/*
很多人认为count(1)执行的效率会比count(*)高，原因是count(*)会存在全表扫描，而count(1)可以针对一个字段进行查询。其实不然，count(1)和count(*)都会对全表进行描，统计所有记录的条数，包括那些为null的记录，因此，它们的效率可以说是相差无几。而count(字段)则与前两者不同，它会统计该字段不为null的记录条数。

下面它们之间的一些对比：

1）在表没有主键时，count(1)比count(*)快
2）有主键时，主键作为计算条件，count(主键)效率最高；
3）若表格只有一个字段，则count(*)效率较高。
*/

SELECT SUM(StudentResult) AS 总和 FROM result;
SELECT AVG(StudentResult) AS 平均分 FROM result;
SELECT MAX(StudentResult) AS 最高分 FROM result;
SELECT MIN(StudentResult) AS 最低分 FROM result;
```

## 事务

* 事务就是将一组SQL语句放在同一批次内去执行
* 如果一个SQL语句出错,则该批次内的所有SQL都将被取消执行
* MySQL事务处理只支持InnoDB和BDB数据表类型

### ACID原则

#### 原子性(Atomic)

* 整个事务中的所有操作，要么全部完成，要么全部不完成，不可能停滞在中间某个环节。事务在执行过程中发生错误，会被回滚（ROLLBACK）到事务开始前的状态，就像这个事务从来没有执行过一样。

#### 一致性(Consist)

* 一个事务可以封装状态改变（除非它是一个只读的）。事务必须始终保持系统处于一致的状态，不管在任何给定的时间并发事务有多少。也就是说：如果事务是并发多个，系统也必须如同串行事务一样操作。其主要特征是保护性和不变性(Preserving an Invariant)，以转账案例为例，假设有五个账户，每个账户余额是100元，那么五个账户总额是500元，如果在这个5个账户之间同时发生多个转账，无论并发多少个，比如在A与B账户之间转账5元，在C与D账户之间转账10元，在B与E之间转账15元，五个账户总额也应该还是500元，这就是保护性和不变性。

#### 隔离性(Isolated)

* 隔离状态执行事务，使它们好像是系统在给定时间内执行的唯一操作。如果有两个事务，运行在相同的时间内，执行相同的功能，事务的隔离性将确保每一事务在系统中认为只有该事务在使用系统。这种属性有时称为串行化，为了防止事务操作间的混淆，必须串行化或序列化请求，使得在同一时间仅有一个请求用于同一数据。

#### 持久性(Durable)

* 在事务完成以后，该事务对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。

## 索引

* 提高查询速度
* 确保数据的唯一性
* 可以加速表和表之间的连接 , 实现表与表之间的参照完整性
* 使用分组和排序子句进行数据检索时 , 可以显著减少分组和排序的时间
* 全文检索字段进行搜索优化

> 分类

* 主键索引 (Primary Key)
* 唯一索引 (Unique)
* 常规索引 (Index)
* 全文索引 (FullText)

> 主键索引

主键 : 某一个属性组能唯一标识一条记录

特点 :

* 最常见的索引类型
* 确保数据记录的唯一性
* 确定特定数据记录在数据库中的位置

> 唯一索引

作用 : 避免同一个表中某数据列中的值重复

与主键索引的区别

* 主键索引只能有一个
* 唯一索引可能有多个

## 规范化设计

**当数据库比较复杂时我们需要设计数据库**

**糟糕的数据库设计 :**

* 数据冗余,存储空间浪费
* 数据更新和插入的异常
* 程序性能差

**良好的数据库设计 :**

* 节省数据的存储空间
* 能够保证数据的完整性
* 方便进行数据库应用系统的开发

**软件项目开发周期中数据库设计 :**

* 需求分析阶段: 分析客户的业务和数据处理需求
* 概要设计阶段:设计数据库的E-R模型图 , 确认需求信息的正确和完整.

**设计数据库步骤**

* 收集信息
* 与该系统有关人员进行交流 , 座谈 , 充分了解用户需求 , 理解数据库需要完成的任务.
* 标识实体\[Entity\]
* 标识数据库要管理的关键对象或实体,实体一般是名词
* 标识每个实体需要存储的详细信息\[Attribute\]
* 标识实体之间的关系\[Relationship\]

## 三大范式

不合规范的表设计会导致的问题：

* 信息重复
* 更新异常
* 插入异常
* 无法正确表示信息
* 删除异常
* 丢失有效信息

**第一范式 (1st NF)**

第一范式的目标是确保每列的原子性,如果每列都是不可再分的最小数据单元,则满足第一范式

**第二范式(2nd NF)**

第二范式（2NF）是在第一范式（1NF）的基础上建立起来的，即满足第二范式（2NF）必须先满足第一范式（1NF）

第二范式要求每个表只描述一件事情

**第三范式(3rd NF)**

如果一个关系满足第二范式,并且除了主键以外的其他列都不传递依赖于主键列,则满足第三范式。

第三范式需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。

**规范化和性能的关系**

为满足某种商业目标 , 数据库性能比规范化数据库更重要

在数据规范化的同时 , 要综合考虑数据库的性能

通过在给定的表中添加额外的字段,以大量减少需要从中搜索信息所需的时间

通过在给定的表中插入计算列,以方便查询
