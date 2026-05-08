---
categories:
- PowerShell
- Windows
- 信息技术
cover: ''
date: 2024-02-13T17:40:39+08:00
draft: false
slug: windows下快速进入bios办法
tags:
- bios
- windows
title: Windows下快速进入bios办法
updated: 2024-02-13T17:40:41+08:00
wp_id: 1288
---

Win+R 调出“运行”，直接输入

```
shutdown /r /fw /t 0
```

* `/r` 重启
* `/fw` 进入firmware
* `/t 0` 在0秒后执行