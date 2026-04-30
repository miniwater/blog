---
categories:
- 信息技术
- HTML
- nginx
category: nginx
draft: false
published: 2024-05-09 23:27:42
slug: nginx-中对多个网站进行跨域配置
tags:
- nginx
- 跨域
title: Nginx 中对多个网站进行跨域配置
updated: 2024-05-09 23:27:42
---

nginx中对于跨域的配置，要启用默认就是：

```
add_header Access-Control-Allow-Origin *;
```

这样对所有网站都允许跨域请求，如果针对某个网站允许跨域，可以这样：

```
add_header Access-Control-Allow-Origin https://www.psay.cn;
```

但是我要针对多个网站允许跨域呢，配置中是不允许同时添加多个网址的，要么为全部允许，要么仅针对某个网址，是不允许Access-Control-Allow-Origin后面添加多个网址。

变通一下，可以这样做多个判断，在server{}添加如下代码，就可以允许多个网站对于本网站进行跨域请求了。

```
set $cors_origin "";
if ($http_origin ~* "^http://test.blyoo.com$") {
  set $cors_origin $http_origin;
}
if ($http_origin ~* "^https://www.blyoo.com$") {
  set $cors_origin $http_origin;
}
add_header Access-Control-Allow-Origin $cors_origin;
```

最后编辑时间为: 2021年11月03日 22:21:32  
本文由 [ProgramSay](https://www.psay.cn/toss/198.html#) 创作， 采用 [知识共享署名 4.0](https://creativecommons.org/licenses/by/4.0/) 国际许可协议进行许可  
可自由转载、引用，但需署名作者且注明文章出处