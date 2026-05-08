---
categories:
- Linux
- 信息技术
cover: ./微信截图_20240922131007.avif
date: 2024-09-22T12:52:30+08:00
draft: false
slug: openwrt桥接拨号后，直接访问光猫后台
tags:
- OpenWrt
- 光猫
- 桥接
title: OpenWrt桥接拨号后，直接访问光猫后台
updated: 2024-09-22T13:29:18+08:00
wp_id: 9876
---

首先确认下光猫的后台IP和openwrt的后台IP必须不在同一网段

在此案例中，光猫的后台IP为：192.168.1.1 ；openwrt后台IP为：192.168.31.1

登录openwrt管理后台，网络-WAN-物理设置

![](./微信截图_20240922130941.avif)

进入网络-防火墙-自定义防火墙规则，添加以下规则。

```
MODEMIP=192.168.1.1
# 光猫ip地址

MODEM_NET=`echo $MODEMIP | cut -d "." -f 1-3`
ROUTER_WAN_PORT_IP=192.168.1.100
# 光猫同网段未被占用的ip

WAN_PORT=eth1
# wan口的网络接口名称

ifconfig $WAN_PORT $ROUTER_WAN_PORT_IP netmask 255.255.255.0 broadcast $MODEM_NET.255
iptables -A forwarding_rule -d $MODEMIP -j ACCEPT
iptables -t nat -A postrouting_rule -d $MODEMIP -o $WAN_PORT -j MASQUERADE
```

![](./微信截图_20240922131007.avif)

然后保存一下，即可直接在浏览器访问192.168.1.1的光猫后台，并且和路由器拨号上网都不影响。

本质是添加了一个虚拟网口，使WAN口的ip地址和光猫的处于同一局域网内，即可访问光猫。

移动光猫超级管理员账号：`CMCCAdmin` 密码：`aDm8H%MdA` （好像失效）