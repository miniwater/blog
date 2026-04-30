---
categories:
- 信息技术
- Windows
- PowerShell
category: PowerShell
draft: false
published: 2024-05-09 22:38:26
slug: windows-系统如何设置程序开机启动
tags:
- windows
- shell
title: Windows 系统如何设置程序开机启动
updated: 2024-05-09 22:38:27
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