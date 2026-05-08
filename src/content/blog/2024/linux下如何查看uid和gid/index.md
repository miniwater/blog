---
categories:
- Linux
- 信息技术
cover: ''
date: 2024-05-09T22:28:59+08:00
draft: false
slug: linux下如何查看uid和gid
tags:
- GID
- Linux
- UID
title: Linux下如何查看UID和GID
updated: 2024-05-09T22:28:59+08:00
wp_id: 9358
---

有时候我们在设定应用程序的权限的时候，需要使用UID和GID，但这个UID和GID如何查看呢，其实很简单，先要知道要以什么用户来运行，之后就可以根据用户来查询UID和GID了，具体如下。

查看所有用户，使用命令：cat /etc/passwd

```
ubuntu:~# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
ubuntu:x:1000:1000:,,,:/home/ubuntu:/bin/bash
```

查看是否存在指定用户：

```
ubuntu:~# cat /etc/passwd | grep root
root:x:0:0:root:/root:/bin/bash
```

查看对应用户的UID和GID，如：查询用户www-data的UID和GID：

```
ubuntu:~# id www-data
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```