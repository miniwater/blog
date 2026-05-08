---
categories:
- Linux
- Ubuntu
- 信息技术
cover: ''
date: 2024-05-10T12:12:36+08:00
draft: false
slug: ubuntu-下修改主机名
tags:
- Linux
- Ubuntu
title: Ubuntu 下修改主机名
updated: 2024-05-10T12:12:37+08:00
wp_id: 9408
---

ubuntu20.4下修改主机名和centos7下修改主机名大同小异，也可以说基本是一样的，也是使用同样的hostnamectl命令。

在ubuntu20.4的系统中，要同时修改静态主机名、临时主机名和灵活主机名这三个，只需要执行下面一条命令：

```
$ sudo hostnamectl set-hostname <--your host name-->
```

若要单独进行修改指定的主机名，需要指定参数：

```
$ hostnamectl set-hostname <--your host name--> [--static|--transient|--pretty]
```

修改静态主机名：

```
$ sudo hostnamectl set-hostname <--your host name--> --static
```

修改灵活主机名：

```
$ sudo hostnamectl set-hostname <--your host name--> --pretty
```

修改临时主机名:

```
$ sudo hostnamectl set-hostname <--your host name--> --transient
```

一旦修改了静态主机名，/etc/hostname将被自动更新。

如果设置的 pretty 主机名，它将存储在/etc/machine-info文件中。

但是，/etc/hosts不会自动更新，所以你最好手动更新一下/etc/hosts文件，把新的主机名映射到127.0.0.1：

```
$ sudo vi /etc/hosts
```

但看静态、临时或灵活主机名，使用下面的命令，并配合对应的参数：

```
$ hostnamectl status[--static|--transient|--pretty]
```