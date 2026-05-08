---
categories:
- Windows
- 信息技术
cover: ./闪烁.avif
date: '2025-02-02T23:45:26+08:00'
draft: false
slug: 关于nvidia显卡在windows系统下存在部分软件屏闪-闪烁问题
tags:
- Nvidia
- Win10
- windows
- 屏闪
- 英伟达
- 闪烁
title: 关于Nvidia显卡在windows系统下存在部分软件屏闪/闪烁问题与解决方法
updated: '2025-02-27T20:08:00+08:00'
wp_id: 10615
---

### 问题描述

部分软件GUI在使用时一直闪烁/闪屏，包括拖动侧栏与切换子页面时会留下残影。本人遇到发生该现象的桌面应用包括且不限于夸克浏览器, docker desktop, meta quest link, Vortex, Tabby Terminal, LM Studio等。

本人环境：  
操作系统：windows11  
显卡：3060ti  
显卡驱动版本：572.16  
显示器最大帧率：60Hz

### 解决方法

桌面右下角图标里右键Nvidia设置，选择Nvidia控制面板，选择管理3D设置，再选择程序设置，  
把出现屏闪问题的软件开在后台，选择添加程序，正常应该会在列表里显示那个软件，然后设置：

1. 垂直同步改为“开”；
2. 设置最大帧速率为显示器最大支持帧率。

设置完成后点右下角的应用，然后退出之前屏闪的软件，再重新打开，应该就恢复正常了。

![](./闪烁.avif)