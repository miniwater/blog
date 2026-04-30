---
categories:
- 信息技术
category: 信息技术
draft: false
published: 2024-05-10 12:22:30
slug: 自建-webmail-网页客户端
tags:
- VPS
- 邮箱
- Mail
title: 自建 webmail 网页客户端
updated: 2024-09-18 11:18:25
---

如果你有一个vps，也有不同厂家的邮箱，想归于一个web页面登录，那你可以尝试自建一个Webmail的网页客户端。

常用的网页客户端我使用过的有2个：

1、[rainloop](https://www.rainloop.net/)

2、[WebMail Lite PHP](https://afterlogic.org/webmail-lite)

这2个网页客户端基本相似，安装有php环境基本就可以用了。

以lnmp环境为例，安装rainloop:

1、上传安装文件到服务器，配置好nginx文件；

2、要禁止访问dada目录，在nginx的配置文件中需要增加以下内容：

```
location ^~ /data {
    deny all;
}
```

3、登录后台：https://yourdomain.com/?admin，管理员账号为：admin，初始密码为：12345。

4、在后台修改账号密码后，增加你要登录的邮箱信息，配置好imap和smtp。

5、然后，打开https://yourdomain.com，使用你的的邮箱账号密码在此网页上登录吧。

以lnmp环境为例，安装webmail-lite:

1、上传安装文件到服务器，配置好nginx文件；

2、要禁止访问dada目录，在nginx的配置文件中需要增加以下内容：

```
location ^~ /data {
    deny all;
}
```

3、检查你的web环境是否满足要求：https://yourdomain.com/?install。

4、打开https://yourdomain.com，使用初始管理员账号密码登录，用户名为：superadmin，密码为空。

5、后台修改账号密码后，增加mail服务，配置imap和smtp。

6、打开https://yourdomain.com就可以使用你的邮箱账号密码登录了。