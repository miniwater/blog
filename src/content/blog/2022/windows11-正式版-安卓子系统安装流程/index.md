---
categories:
- Windows
- 技术
- 系统
cover: ./9-1.avif
date: '2022-02-20T19:35:09+08:00'
draft: false
slug: windows11-正式版-安卓子系统安装流程
tags:
- Android
- windows
- 虚拟机
title: Windows11 正式版 安卓子系统安装流程
updated: '2025-12-17T19:12:39+08:00'
wp_id: 590
---

Windows 11 中最令人期待的支持安卓应用的功能正式版终于来了，在经历半年多的测试之后，首次推送正式版。以往安装安卓子系统需要加入Windows 11测试版，为了体验新功能还要当免费小白鼠，这次无需切换就能用上最新的安卓子系统。

![](./10-2.avif)

酷安

![](./9-1.avif)

安兔兔跑分

跑分也着实唬人一把。

## 第一步 修改美区商店

目前国区商店还没有上架，需要切换至美区下载安装

虽说如此，这还是比Apple Store切换区域方便太多了

![](./1-1.avif)

## 安装亚马逊App商店（amazon appstore）

打开win10商店并搜索 amazon

![](./2-1.avif)

![](./3-1.avif)

当你安装完成后，就已经装上了windows的安卓子系统。教程结束！

对了，别忘了把区域改回国区，国区是最后一个。

---

## 安装第三方APK

首先打开安装好的亚马逊商店，确保安卓子系统（WSA）在后台运行。

![](./4-1.avif)

amazon appstore

## 进入Android子系统的设置，打开ADB。

![](./5-1.avif)

开始菜单栏搜索

![](./6-1.avif)

打开开发人员模式（adb）

## 下载安装adb安装工具

可以选择 [wsa\_pacman](https://github.com/alesimula/wsa_pacman) 或者 [wsa工具箱](https://www.microsoft.com/en-us/p/wsa-toolbox/9ppsp2mkvtgt) 等adb工具进行安装apk。

有能力的话敲命令也是可行的。

下面是wsa工具箱的演示图，可以安装apk和上传文件到安卓目录中。

![](./7-1.avif)

wsa工具箱

![](./8-1.avif)

wsa工具箱

看到那个熟悉的图标了吗，点击就可以安装啦！