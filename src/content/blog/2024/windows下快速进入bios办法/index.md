---
categories:
- 信息技术
- Windows
- PowerShell
category: PowerShell
draft: false
published: 2024-02-13 17:40:39
slug: windows下快速进入bios办法
tags:
- windows
- bios
title: Windows下快速进入bios办法
updated: 2024-02-13 17:40:41
---

Win+R 调出“运行”，直接输入

```
shutdown /r /fw /t 0
```

* `/r` 重启
* `/fw` 进入firmware
* `/t 0` 在0秒后执行