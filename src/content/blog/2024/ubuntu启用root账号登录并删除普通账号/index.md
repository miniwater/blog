---
categories:
- Linux
- Ubuntu
- 信息技术
cover: ''
date: '2024-05-09T22:39:58+08:00'
draft: false
slug: ubuntu启用root账号登录并删除普通账号
tags:
- Linux
- root
- Ubuntu
title: ubuntu启用root账号登录并删除普通账号
updated: '2024-05-09T22:39:59+08:00'
wp_id: 9370
---

**一、ubuntu启用root账号登录系统：**

ubuntu系统为了安全起见，默认不允许root用户登录，密码也为空。如果需要使用root用户登录，先设置root用户的密码，使用如下命令按提示输入2次密码：

```
sudo passwd root
```

编辑ssh配置文件允许root登录：

```
sudo vi /etc/ssh/sshd_config
```

找到PermitRootLogin配置选项，并修改为：

```
PermitRootLogin yes
```

重新ssh使修改配置生效：

```
sudo systemctl restart sshd
```

重启登录root账号，测试root登录无问题后，可进行删除普通用户操作。

**二、删除普通用户：**

同时删除用户和用户目录文件：

```
userdel -r username
```

如果仅仅是删除用户，不删除用户文件，使用如下命令：

```
userdel username
```

查看可登录用户：

```
grep bash /etc/passwd
```

如果要查看所有系统自带用户：

```
cat /etc/passwd
```