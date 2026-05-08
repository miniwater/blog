---
categories:
- Linux
- 信息技术
cover: ''
date: '2024-09-08T10:59:55+08:00'
draft: false
slug: openclash兼容模式无法同步时间-ntp服务器
tags:
- NTP
- OpenClash
- OpenWrt
- 时间服务器
title: OpenClash兼容模式无法同步时间 NTP服务器
updated: '2024-09-18T11:02:32+08:00'
wp_id: 9846
---

如题

今天发现Windows时间一直落后3分钟，检测发现上次同步时间在半年前，使用手动同步也一直同步不上，提示失败。

猛然想起路由器上的小猫咪开着，一番排查发现小猫咪的兼容模式有问题，切换到混合模式就正常了

原因未知，小猫咪用的人越来越少，懒得纠结了

留几个ntp服务器地址备用

ntp.aliyun.com 阿里云

ntp.sjtu.edu.cn 202.120.2.101 (上海交通大学网络中心NTP服务器地址）

s1a.time.edu.cn 北京邮电大学

s1b.time.edu.cn 清华大学

s1c.time.edu.cn 北京大学

s1d.time.edu.cn 东南大学

s1e.time.edu.cn 清华大学

s2a.time.edu.cn 清华大学

s2b.time.edu.cn 清华大学

s2c.time.edu.cn 北京邮电大学

## Linux上检测NTP方法

```
apt-get install ntpdate

ntpdate ntp.aliyun.com
```

## Windows上检测NTP方法

控制面板 - 时间和日期 - Internet时间 - 更改设置