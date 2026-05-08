---
categories:
- HTML
- nginx
- 信息技术
cover: ''
date: 2024-05-09T23:57:26+08:00
draft: false
slug: 解决nginx报错：413-request-entity-too-large
tags:
- nginx
title: 解决Nginx报错：413 Request Entity Too Large
updated: 2024-05-09T23:57:27+08:00
wp_id: 9394
---

发现上传大文件时报错：413 Request Entity Too Large。以为单纯的是php配置问题，于是将php.ini配置中的post\_max\_size和upload\_max\_filesize进行了调整，都设置为500Mb，但上传文件不足500Mb大小时，仍然报“413 Request Entity Too Large”这个错误。

后面发现还需要在nginx的配置文件中，添加client\_max\_body\_size参数，并指定上传文件大小。

虽然改在上面的参数，不会有报413错误，但是在上传较大文件时，由于nignx的默认缓冲区可能不够，客户端上传较大文件时，还会有一个类似这样的警告“a client request body is buffered to a temporary file /usr/local/nginx/client\_body\_temp/0000000004”。这个警告虽然不影响使用，但默认缓冲区设置的太小的话，Nginx 会频繁读写硬盘，将对性能有很大的影响，但也不是越大越好，需要根据实际调整。

这两个参数可以放在3个位置使用，具体如下：

1、全局生效：

```
http {
  ……
  client_max_body_size 500m;
  client_body_buffer_size 2m;
  ……
}
```

2、指定域生效：

```
server{
  listen 80;
  server_name www.example.con;
  ……
  client_max_body_size 500m;
  client_body_buffer_size 2m;
  ……
}
```

3、指定路由生效：

```
location /path/ {
  ……
  client_max_body_size 500m;
  client_body_buffer_size 2m;
  ……
}
```