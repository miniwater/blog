---
categories:
- 信息技术
- Linux
category: Linux
draft: false
published: 2024-05-10 12:20:34
slug: 关闭-selinux
tags:
- Linux
- SELinux
title: 关闭 SELinux
updated: 2024-09-18 11:18:44
---

今天在修改ssh端口时，发现竟然修改不了，修改后重启sshd就会报错，网上查了很久，最后发现是SELinux启用了造成的。所以要想修改ssh端口，就要先禁用SELinux。

使用下面的命令可以查看SELinux的状态：

```
[root@localhost ~] #/usr/sbin/sestatus -v
```

或者：

```
[root@localhost ~] # sestatus
```

如果返回有：

```
SELinux status: enabled
```

那就证明启用了SELinux。

永久关闭修改配置文件即可，打开SELinux的配置文件：

```
[root@localhost ~] # vi /etc/selinux/config
```

将SELINUX=enforcing或SELINUX=permissive修改为：

```
SELINUX=disabled
```

保存后重启，再使用sestatus查看状态，此时应该返回：

```
SELinux status: disabled
```

这样就关闭了SELinux。