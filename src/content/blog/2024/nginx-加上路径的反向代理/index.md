---
categories:
- HTML
- nginx
- 信息技术
cover: ''
date: 2024-05-09T23:51:40+08:00
draft: false
slug: nginx-加上路径的反向代理
tags:
- nginx
- 反向代理
title: Nginx 加上路径的反向代理
updated: 2024-05-09T23:51:41+08:00
wp_id: 9388
---

情况：

用户请求 example.com

为站点的静态页面

用户请求 example.com/api

为后端接口，后端需要收到包含 /api 路径请求

后端暴露在本地8360端口中

nginx配置文件添加如下

```
location ~/api/
{
    proxy_pass http://127.0.0.1:8360;
}
```