---
categories:
- MySQl
- 信息技术
cover: ''
date: 2024-10-26T22:05:33+08:00
draft: false
slug: 1055-expression-1-of-order-by-clause-is-not-in-group-by-clause-and-contains-nonaggregated-column-stack_wordpress-wp_postmeta-meta_value-which-is-not-functionally-dependent-on-columns-in-group
tags:
- MySQL
title: '#1055 - Expression #1 of ORDER BY clause is not in GROUP BY clause and contains
  nonaggregated column ''stack_wordpress.wp_postmeta.meta_value'' which is not functionally
  dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by'
updated: 2024-10-26T22:05:34+08:00
wp_id: 10164
---

```
#1055 - Expression #1 of ORDER BY clause is not in GROUP BY clause and contains nonaggregated column 'stack_wordpress.wp_postmeta.meta_value' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

这个错误是因为在使用 `GROUP BY` 时， `ORDER BY` 子句包含了非聚合列 `meta_value`。这在 `ONLY_FULL_GROUP_BY` 模式下是不允许的。

解决办法：

临时禁用 `ONLY_FULL_GROUP_BY` 模式，以便查询能够执行

```
SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
```

只会改变当前会话的SQL模式设置。一旦你断开数据库连接或重启MySQL服务，设置将恢复为默认值。

如果要永久禁用 `ONLY_FULL_GROUP_BY`，

需要修改 MySQL 配置文件：

1. 打开 MySQL 配置文件（`my.cnf` 或 `my.ini`）。
2. 在 `[mysqld]` 区块添加或修改 `sql_mode`：

```
[mysqld]
sql_mode="NO_ENGINE_SUBSTITUTION"
```

3. 保存文件并重启 MySQL 服务。

这样可以确保设置在重启后仍然有效。