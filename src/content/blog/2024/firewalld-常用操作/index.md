---
categories:
- Linux
- 信息技术
cover: ''
date: 2024-05-09T23:26:11+08:00
draft: false
slug: firewalld-常用操作
tags:
- Firewalld
- Linux
- 防火墙
title: Firewalld 常用操作
updated: 2024-05-09T23:26:12+08:00
wp_id: 9378
---

Linux系统默认使用firewalld进行防火墙管理，以前一直使用iptable，使用firewalld还不太熟悉，记录一些简单的操作，方便日后使用。

**一、基本的状态查询：**

1、查看版本信息：

```
firewall-cmd --version
```

2、查看所有放行的端口：

```
firewall-cmd --list-ports
```

3、查看public下放行的端口：

```
firewall-cmd --zone=public --list-ports
```

4、查看配置信息:

```
firewall-cmd --list-all
```

5、查看区域信息:

```
firewall-cmd --get-active-zones
```

6、查看指定网络接口所属区域：

```
firewall-cmd --get-zone-of-interface=eth0
```

7、显示状态：

```
firewall-cmd --state
```

**二、在主机上开放和禁用端口：**

1、开放TCP/UDP端口：

```
firewall-cmd --zone=public --add-port=端口/tcp --permanent
firewall-cmd --zone=public --add-port=端口/udp --permanent
```

如开放连续tcp端口：

```
firewall-cmd --zone=public --add-port=8001-8010/tcp --permanent
```

如开放多个tcp端口：

```
firewall-cmd --add-port={80/tcp,443/tcp,3306/tcp} --permanent
```

2、删除TCP/UDP端口：

```
firewall-cmd --zone=public --remove-port=端口/tcp --permanent
firewall-cmd --zone=public --remove-port=端口/udp --permanent
```

3、查看TCP/UDP端口：

```
firewall-cmd --zone=public --query-port=端口/tcp
firewall-cmd --zone=public --query-port=端口/udp
```

4、使配置生效：

```
firewall-cmd --reload
```

5、查看配置是否生效：

```
firewall-cmd --zone=public --list-all
```

注意参数“--permanent”是永乐生效，不加此参数系统重启后失效。

**三、网络接口与Zone：**

1、查看eth0网络接口在哪个zone下面：

```
firewall-cmd --get-zone-of-interface=eth0
```

2、将eth0网络接口从zone中移除并查看操作是否生效：

```
firewall-cmd --remove-interface=eth0
firewall-cmd --list-all
```

3、添加一个网络接口并查看操作是否生效：

```
firewall-cmd --add-interface=eth0
firewall-cmd --list-all
```

4、将eth0网络接口跟zone进行相关联并查看操作是否生效：

```
firewall-cmd --change-interface=eth0 --zone=public --permanent
firewall-cmd --list-all
```

**四、封禁指定IP（段）或放行IP（段）：**

1、禁用一个ip地址或网段的所有访问并查看配置是否生效：

```
firewall-cmd --add-source=10.0.0.8/24 --zone=drop
firewall-cmd --get-active-zone
```

2、允许一个ip地址或网段访问并查看配置是否生效：

```
firewall-cmd --add-source=10.0.0.8/24 --zone=trusted
firewall-cmd --get-active-zone
```

3、移除ip地址或网段的访问并查看配置是否生效：

```
firewall-cmd --remove-source=10.0.0.8/32 --zone=trusted
firewall-cmd --get-active-zone
```

**五、使用端口转发：**

1、启用转发端口：

```
firewall-cmd --add-masquerade --permanent
```

2、添加TCP/UDP等协议的端口转发：

```
firewall-cmd --zone=<区域> --add-forward-port=port=<本地端口>:proto=<协议>:toaddr=<目标IP地址>:toport=<目标端口> --permanent
```

如：使用本机（ip为10.0.0.6）5555端口访问远程电脑（IP为10.0.0.7）的22端口，使用TCP协议：

```
firewall-cmd --zone=public --add-forward-port=port=5555:proto=tcp:toaddr=10.0.0.7:toport=22 --permanent
```

这样就可以通过连接10.0.0.6的5555端口来访问10.0.0.7的22端口了。

3、删除端口转发配置：

```
firewall-cmd --zone=区域 --remove-forward-port=port=本地端口:proto=协议:toaddr=目标IP:toport=目标端口 --permanent
```

4、禁用转发端口：

```
firewall-cmd --remove-masquerade --permanent
```

**六、firewalld系统服务管理：**

1、更新应用配置：

```
firewall-cmd --reload
```

2、启动防火墙：

```
systemctl start firewalld
```

3、开机自启动：

```
systemctl enable firewalld
```

4、关闭防火墙：

```
systemctl stop firewalld
```

5、关闭开机自启动：

```
systemctl disable firewall
```