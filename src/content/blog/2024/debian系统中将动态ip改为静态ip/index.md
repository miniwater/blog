---
categories:
- Debian
- Linux
- 信息技术
cover: ''
date: 2024-05-09T23:53:00+08:00
draft: false
slug: debian系统中将动态ip改为静态ip
tags:
- Debian
- ip
- Linux
title: Debian系统中将动态ip改为静态ip
updated: 2024-05-09T23:53:00+08:00
wp_id: 9390
---

安装debian时，在安装过程中会默认启用dhcp获取网络地址，但为了管理方便，我希望使用静态ip，这样就能保持ip固定。在debian系统中配置静态ip地址，涉及到2个文件要修改，具体操作如下。

1、配置静态ip：

```
vi /etc/network/interfaces
```

可以看到默认是dhcp配置：

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug eth0
iface eth0 inet dhcp
```

看到上面的最后一行没？这里需要将dhcp改为static，并配置指定的ip地址，具体如下：

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug eth0
iface eth0 inet static
    address 10.248.201.224/23
    gateway 10.248.201.1
    # dns-* options are implemented by the resolvconf package, if installed
    dns-nameservers 10.248.201.8
```

2、修改DNS,编辑/etc/resolv.conf中的nameserver

```
vi /etc/resolv.conf
```

```
nameserver 10.248.201.8
nameserver 114.114.114.114
```

修改完成后，重启网络使配置生效：

```
systemctl restart networking
```

或者重启系统也可以。