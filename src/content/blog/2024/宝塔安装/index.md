---
categories:
- 信息技术
cover: ''
date: 2024-06-16T11:24:51+08:00
draft: false
slug: 宝塔安装
tags:
- BT
- 宝塔
title: 宝塔安装
updated: 2024-07-11T17:40:45+08:00
wp_id: 9577
---

## 官网

<https://www.bt.cn>

Linux面板8.2.0安装脚本

[查看详细安装教程](https://www.bt.cn/bbs/thread-79460-1-1.html)

**Centos安装脚本**

yum install -y wget && wget -O install.sh https://download.bt.cn/install/install\_6.0.sh && sh install.sh ed8484bec

**Ubuntu/Deepin安装脚本**

wget -O install.sh https://download.bt.cn/install/install-ubuntu\_6.0.sh && sudo bash install.sh ed8484bec

**Debian安装脚本**

wget -O install.sh https://download.bt.cn/install/install-ubuntu\_6.0.sh && bash install.sh ed8484bec

**万能安装脚本**

if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install\_panel.sh;else wget -O install\_panel.sh https://download.bt.cn/install/install\_panel.sh;fi;bash install\_panel.sh ed8484bec

**国产龙芯架构安装脚本****（其他CPU请勿使用）**

wget -O install\_panel.sh https://download.bt.cn/install/0/loongarch64/loongarch64\_install\_panel.sh && bash install\_panel.sh ed8484bec

## 风险纯净版

<https://baota.sbs>

<https://www.hostcli.com>

<https://bt.sy> (<https://bt.sb>)

<https://bt5.me>

## 动手版

### BTCloud

<https://github.com/flucont/btcloud>

### 原版

1. github找安装原版7.7.0
   * curl -sSO https://raw.githubusercontent.com/8838/btpanel-v7.7.0/main/install/install\_panel.sh && bash install\_panel.sh
2. 去后门
   * wget -O optimize.sh http://f.cccyun.cc/bt/optimize.sh && bash optimize.sh
3. 手动解锁宝塔所有付费插件为永不过期
   * 文件路径：/www/server/panel/data/plugin.json
   * 搜索字符串："endtime": -1全部替换为"endtime": 8999999999
4. 给plugin.json文件上锁防止自动修复为免费版
   * chattr +i /www/server/panel/data/plugin.json