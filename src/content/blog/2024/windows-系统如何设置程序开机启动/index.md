---
categories:
- PowerShell
- Windows
- 信息技术
cover: ''
date: 2024-05-09T22:38:26+08:00
draft: false
slug: windows-系统如何设置程序开机启动
tags:
- shell
- windows
title: Windows 系统如何设置程序开机启动
updated: 2024-05-09T22:38:27+08:00
wp_id: 9368
---

Windows 系统如何设置程序开机启动？

要实现这个功能其实很简单，只需要将需要开机启动的程序创建一个快捷方式，然后把这个快捷方式复制到开机启动目录中即可，每次开机时系统都会自动运行这个目录下的程序。具体路径如下：

```
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
```

或者在“运行”输入以下代码会自动打开开机启动目录：

```
shell:Common Startup
```