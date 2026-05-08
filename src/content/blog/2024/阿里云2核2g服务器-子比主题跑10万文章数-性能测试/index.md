---
categories:
- PHP
- WordPress
- 信息技术
cover: ./adminer.avif
date: '2024-10-27T00:39:30+08:00'
draft: false
slug: 阿里云2核2g服务器-子比主题跑10万文章数-性能测试
tags:
- 2核2G
- MySQL
- WordPress
- 十万文章
- 压力测试
- 性能测试
title: 阿里云2核2G服务器 子比主题跑10万文章数 性能测试
updated: '2024-11-21T21:54:48+08:00'
wp_id: 10165
---

导入了两天数据，终于把文章数提到十万，文章都是通过WP内部函数发布，meta数据相当完整。

先说结论，2核2G服务器够用，完全够用，估计20万都不成问题，只要优化得当。

搭配 redis 缓存稳定控制在一秒以内。

唯一需要注意的是关闭两个低性能模块。

## 成果展示

![](./adminer.avif)

（ddp表是旧插件遗留）

![](./文章-1.avif)

![](./1Panel.avif)

## 性能测试

测试站点：<https://stack.krjojo.com/>

### 测试设备

阿里云 99一年 2C2G 3M [ecs.e-c1m1.large](https://help.aliyun.com/document_detail/25378.html?spm=5176.ecscore_server.0.0.3fc24df5sxiDSH#e)

### 测试环境

* Debian 12
  + 1Panel面板
* PHP 8.3.8
  + 安装扩展 mysqli, exif, imagick, intl, zip, redis, opcache, gd
* MySQL 8.4.3
  + 1Panel 优化方案（1-2G）
* Redis 7.4.1
* WordPress 6.6.2
  + 主题：
    - 子比 8.0
  + 插件：
    - [Limit Login Attempts Reloaded](https://cn.wordpress.org/plugins/limit-login-attempts-reloaded/)
    - [Query Monitor](https://cn.wordpress.org/plugins/query-monitor/)
    - [Redis Object Cache](https://cn.wordpress.org/plugins/redis-cache/)
    - [WPCode Lite](https://cn.wordpress.org/plugins/insert-headers-and-footers/)
    - [Database Management tool - Adminer](https://cn.wordpress.org/plugins/pexlechris-adminer/)

皆为 Docker 容器

### 子比设置

在 子比设置 – 文章列表 – 文章页面**关闭** 作者信息版块

![](./作者信息板块.avif)

**关闭** 相关文章版块

![](./相关文章板块.avif)

以上关闭的功能都严重影响SQL性能，且**无法**被 **Redis Object Cache** 插件**缓存**，手动加上索引优化最快也要0.9秒。

这是 **相关文章** 版块的SQL

![](./sql.avif)

![](./EXPLAIN_sql.avif)

性能非常糟糕，并且无法利用缓存，只能等老唐优化了。

由于并非核心需求，所以测试时关闭该功能。

侧栏仅保留以下小工具，小工具貌似对性能影响不大

![](./所有页面侧边栏.avif)

## 文章页面打开速度

清空redis缓存首次打开速度

![](./清空redis缓存首次打开速度.avif)

SQL花费1.5秒，索引全中。

redis缓存下打开速度

![](./redis缓存下打开速度.avif)

基本控制在0.5秒

![](./服务端响应时间.avif)

页面响应时间也保持在700毫秒以内，非常健康的数值。

## 首页打开速度

首页清空redis缓存首次打开速度

![](./首页清空redis缓存首次打开速度.avif)

1.6秒的SQL速度，还行

首页redis缓存下打开速度

![](./首页redis缓存下打开速度.avif)

开启redis后，速度直接起飞！

数据库查询只用了0.1秒，基本没有慢查询

![](./首页服务端响应时间.avif)

首页的服务端响应时间更是降低到500以下，考虑到搭配极其庞大的子比主题，响应时间完全可以说是惊喜了。

## 总结

经过不严谨的测试，2核2G 拖十万文章的 wordpres ，在关闭优化较差的小工具后，完全够用。

不过该测试仅供参考，毕竟没有考虑大量用户数和评论数

（虽然我没见过能做到大用户量和评论数的子比站点）