---
categories:
- MySQl
cover: ''
date: 2024-01-05T11:45:08+08:00
draft: false
slug: mysql中binlog过多的正确处理方式
tags:
- binlog
- MySQL
title: MySQL中binlog过多的正确处理方式
updated: 2024-01-05T11:58:00+08:00
wp_id: 988
---

登录MySQL

```
mysql -u root -p
```

### 查看binlog过期时间

命令：

```
show variables like 'expire_logs_days';
```

`Empty set` 或者 0：永不过期

10：保留最近10天的binlog文件

### 设置自动清理binlog

修改配置文件，在[mysqld]标签下增加内容：

MySQL8.0之前：

```
expire_logs_days=10
max_binlog_size=1024M
```

MySQL8.0：

```
binlog_expire_logs_seconds=864000
```

别问为什么，问就是被弃用了，看文档：

<https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_expire_logs_seconds>

<https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_expire_logs_days>

注：重启数据库生效

### 手动清理binlog

1、登录到MySQL服务中

执行命令

```
purge binary logs to 'binlog.000030';
```

意为清理掉 **binlog.000030** 之前的binlog文件

```
purge binary logs before '2023-03-12 23:59:59';
```

意为清理掉指定时间之前的binlog内容