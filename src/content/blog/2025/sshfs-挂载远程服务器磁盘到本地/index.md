---
categories:
- 信息技术
- Linux
- Windows
- VSCode
category: VSCode
draft: false
published: 2025-02-24 00:21:05
slug: sshfs-挂载远程服务器磁盘到本地
tags:
- windows
- Linux
- VSCode
- 挂载磁盘
- 远程
title: sshfs 挂载远程服务器磁盘到本地
updated: 2025-02-24 00:21:06
---

![](./开发板.avif)

最近需要在线远程修改服务器上的代码，一直都是用vscode远程连接，但是vscode的远程连接太吃服务器性能了，插件也要重新安装，甚至插件的服务也是跑在服务器上。

这对只有2核2G的服务器压力太大了，每次连接都吃掉大量内存和CPU，小鸡承受不住。

所以就想着能不能把远程Linux的文件目录挂载到电脑本地，这样vscode只需要跑在本地上，像本地项目一样。

然后发现可以通过sshfs 进行本地挂载。

## 使用方法

1. 安装 WinFsp：<https://github.com/winfsp/winfsp>
2. 安装 SSHFS-Win：<https://github.com/winfsp/sshfs-win>
3. ~~在 Windows 系统中添加SSHFS的Path环境变量~~（好像不用）
   * `E:\APP\SSHFS\bin`
4. 右键此电脑，映射网络驱动器，使用 `sshfs` 命令挂载远程目录。

例如

```
\\sshfs.r\root@123.223.113.211!22\opt
```

* 用户名：root
* ip：123.223.113.211
* 端口：22
* 目录：\opt

如果不带 `.r` 则会映射到登录用户目录下，如root用户目录下，无法操作上级。。。

如果带 `.kr` 可以使用 C:\Users\14564\.ssh 目录下的 `id_rsa` 文件进行密钥认证登录

如

```
\\sshfs.kr\root@123.223.113.211!22\opt
```