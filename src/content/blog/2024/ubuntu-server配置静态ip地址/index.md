---
categories:
- 信息技术
- Linux
- Ubuntu
category: Ubuntu
draft: false
published: 2024-05-10 12:14:50
slug: ubuntu-server配置静态ip地址
tags:
- Linux
- ip
- Ubuntu
title: Ubuntu server配置静态ip地址
updated: 2024-05-10 12:14:50
---

安装完ubuntu server 20.04版本的服务器，发现没有设置固定ip，使用的是dhcp获取ip。要将ubuntu 20.04 server的动态ip地址修改为静态ip地址，只需要修改/etc/netplan目录下的00-installer-config.yaml文件即可，具体如下：

编辑网络配置文件：

```
$ sudo vi /etc/netplan/00-installer-config.yaml
```

修改配置如下：

```
# This is the network config written by 'subiquity'
network:
  ethernets:
    eth0: #配置的网卡的名称
      addresses: [10.248.201.18/23] #配置的静态ip地址和掩码
      dhcp4: false #关闭DHCP
      optional: true
      gateway4: 10.248.201.1 #网关地址
      nameservers:
        addresses: [8.8.8.8,8.8.4.4,1.1.1.1] #DNS服务器地址，多个用","分隔
  version: 2
```

修改后使配置的ip地址生效：

```
$ sudo netplan apply
```

修改配置时，需要注意以下几点：  
1、yaml是有严格的层次结构的，需要缩进，具体形式如下：

第一层－network:  
第二层－－ethernets:  
第三层－－－eth0:  
第四层－－－－addresses: [172.18.0.31/24]  
第四层－－－－dhcp4  
第四层－－－－gateway4: 172.18.0.1  
第四层－－－－nameservers:  
第五层－－－－－addresses: [114.114.114.114, 8.8.8.8]  
第二层－－version

2、冒号(:)后面一定要空一格再写参数；

3、注意除了gateway4不需要方括号，其它addresses需要方括号。

在这里配置时踩了坑，稍不注意就会报错。

在20.04版本的ubuntu server中，安装系统的过程中已设置好静态ip，之后查看的配置文件的具体格式如下，和上面提到的格式都是可以正常使用的：

```
# This is the network config written by 'subiquity'
network:
  ethernets:
    eth0:
      addresses:
      - 10.248.201.18/23
      gateway4: 10.248.201.1
      nameservers:
        addresses:
        - 8.8.8.8
        - 8.8.4.4
      search: []
  version: 2
```

在ubuntu22.04中，gateway4已弃用了，替代的参数为：routes，另外search也不再使用。

具体如下：

```
# This is the network config written by 'subiquity'
network:
  ethernets:
    eth0:
      addresses:
      - 10.248.201.18/23
      routes:
      - to: default
        via: 10.248.201.1
      nameservers:
        addresses:
        - 8.8.8.8
        - 8.8.4.4
  version: 2
```