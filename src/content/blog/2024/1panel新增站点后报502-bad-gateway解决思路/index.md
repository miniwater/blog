---
categories:
- 技术
- 信息技术
- 安全
- 1Panel
category: 1Panel
draft: false
published: 2024-04-18 13:28:36
slug: 1panel新增站点后报502-bad-gateway解决思路
tags:
- 1Panel
- Docker
- PHP运行环境
title: 1Panel新增站点后报502 Bad Gateway解决思路
updated: 2024-04-30 17:00:51
---

## 问题

今天用1Panel面板新增了PHP8.2的站点，结果点进去后报502坏网关。

在面板容器里发现，站点php82的容器没有添加成功。

进入面板日志，查看系统日志，发现这样一条错误：

```
[2024-04-17 17:54:35] [INFO] download app[PHP 8] from https://apps-assets.fit2cloud.com/stable/1panel/php8/8.2.10/php8-8.2.10.tar.gz  
[2024-04-17 17:54:35] [ERROR] download app[PHP 8] error 文件不存在
```

好奇的访问了一下：<https://apps-assets.fit2cloud.com/stable/1panel/php8/8.2.10/php8-8.2.10.tar.gz>

不出所料404

猜测：每次新建站点，面板都需要去1Panel网站下载相关配置文件。

而这个配置文件不是永久的，是随1panel版本对php站点的版本维护进行更替的。

进入面板的 创建运行环境 ，发现最新的PHP8版是8.2.15，尝试把上面链接版本号进行更换：<https://apps-assets.fit2cloud.com/stable/1panel/php8/8.2.15/php8-8.2.15.tar.gz>

得到以下文件

```
│  data.yml
│  logo.png
│  README.md
│
└─8.2.15
    │  data.yml
    │  docker-compose.yml
    │
    ├─build
    │  │  .env
    │  │  config.json
    │  │  docker-compose.yml
    │  │
    │  └─php
    │      │  Dockerfile
    │      │  php-fpm.conf
    │      │  php.ini
    │      │
    │      └─extensions
    │              event-3.0.8.tgz
    │              imagick-3.7.0.tgz
    │              install-composer.sh
    │              install-php-extensions
    │              install.sh
    │              mongodb-1.15.2.tgz
    │              redis-6.0.2.tgz
    │              swoole-5.0.2.tgz
    │              xdebug-3.2.0.tgz
    │
    └─conf
            php-fpm.conf
            php.ini
```

可以看到，都是docker和php的配置文件。

而8.2.10的配置文件无法下发，也导致了无法用旧版本php环境去新建站点！

## 解决办法

新建运行环境，比如面板里最新的PHP8.2.15，把旧版本的运行环境替换掉。

## 总结

在目前的1Panel面板中，并不支持一键升级运行环境，同时对老环境退出支持的时候也没有任何提示，同时还把官网对应版本的配置文件直接删除，这种一刀切的行为我是不能理解的。

对于本机已经存在的PHP运行环境，每次新建站点都需要依赖1Panel官网，有一种随时被掐着脖子的感觉，这种感觉比用宝塔还难受。

毕竟docker断网还能切换仓库和镜像

加上1Panel开始买专业版了

难评......