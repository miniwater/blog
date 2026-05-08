---
categories:
- MySQl
- 信息技术
cover: ''
date: '2023-12-04T19:48:18+08:00'
draft: false
slug: 1panel的mysql数据库有异常
tags:
- 1Panel
- MySQL
title: 1Panel的MySql数据库异常警告
updated: '2023-12-05T12:31:58+08:00'
wp_id: 960
---

装上1Panel后用了一段时间，发现MySQL 8.2.0日志不停报错，内容为：

```
2023-11-28T05:14:24.537671Z 12560 [Warning] [MY-013360] [Server] Plugin mysql_native_password reported: ‘‘mysql_native_password’ is deprecated and will be removed in a future release. Please use caching_sha2_password instead’
```

尝试关闭站点，并把唯一的PHP容器服务停止，日志依然不停刷，怀疑是面板问题。

而且面板数据库-当前状态-总连接数，显示异常，数字一直不停增加。

导致Binlog也特别大，大半个月已经总共生成17G的binlog文件了，刚买99一年的阿里云就挂了个wordpress，何德何能跑这么多SQL…

> 只好跑去1Panel论坛提了一个bug：
>
> <https://bbs.fit2cloud.com/t/topic/2346>

解决办法：

无

但是有个掩耳盗铃的办法！把警告忽略掉...

在1Panel v1.8.5版本里，面板-数据库-设置-配置修改，在`[mysqld]`部分，添加`log_error_suppression_list='MY-013360'`

原本：

```
[mysqld]
skip-host-cache
skip-name-resolve
datadir=/var/lib/mysql
socket=/var/run/mysqld/mysqld.sock
secure-file-priv=/var/lib/mysql-files
user=mysql

character_set_server=utf8
lower_case_table_names=1
group_concat_max_len=1024000
log_bin_trust_function_creators=1

pid-file=/var/run/mysqld/mysqld.pid
[client]
socket=/var/run/mysqld/mysqld.sock

!includedir /etc/mysql/conf.d/
```

修改后：

```
[mysqld]
skip-host-cache
skip-name-resolve
datadir=/var/lib/mysql
socket=/var/run/mysqld/mysqld.sock
secure-file-priv=/var/lib/mysql-files
user=mysql
log_error_suppression_list='MY-013360'

character_set_server=utf8
lower_case_table_names=1
group_concat_max_len=1024000
log_bin_trust_function_creators=1

pid-file=/var/run/mysqld/mysqld.pid
[client]
socket=/var/run/mysqld/mysqld.sock

!includedir /etc/mysql/conf.d/
```

完事，重启MySQL，日志页面干干净净了