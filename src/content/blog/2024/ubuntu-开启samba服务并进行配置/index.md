---
categories:
- 信息技术
- Linux
- Ubuntu
category: Ubuntu
draft: false
published: 2024-05-09 23:55:46
slug: ubuntu-开启samba服务并进行配置
tags:
- Linux
- Ubuntu
- samba
title: Ubuntu 开启samba服务并进行配置
updated: 2024-05-09 23:55:46
---

在linux环境中，为了方便与其它设备共享文件，可以创建一个Samba服务，其它平台就都可以通过网络访问你在linux中指定的共享文件夹了。这里以ubuntu系统为例子，简要说一下安装过程。

samba：服务器端软件，主要提供samba服务器的守护程序、共享文档、日志的轮替，必装。Samba服务器安装完毕，会生成配置文件目录/etc/samba和其它一些samba可执行命令工具，/etc/samba/smb.conf是samba的核心配置文件。

samba-common：主要提供samba服务器的设置文件与设置文件语法检验程序testparm。

smbclient：客户端软件，主要提供linux主机作为客户端时，所需要的工具指令集。

1、安装samba服务器，根据上面的介绍，我们安装samba和samba-common：

```
$ sudo apt-get install samba samba-common
```

2、给需要共享的目录设置权限：

```
$ sudo chmod 777 /home/share
```

3、为samba添加一个用户shareuser并设定密码：

```
$ sudo smbpasswd -a shareuser
```

注意：该shareuser用户需要在系统中存在，否则会报错并提示：Failed to add entry for user share。若出现这个错误，请在系统中创建这个用户：

a、在系统中创建shareuser用户并设定密码：

```
$ sudo adduser shareuser
```

b、如果您希望新创建的用户具有管理权限，请将用户添加到sudo组，否则无法使用sudo执行相关操作：

```
$ sudo usermod -aG sudo shareuser
```

c、如果以后不需要该用户了，可以删除用户，删除用户但不删除用户文件，请运行：

```
$ sudo deluser shareuser
```

如果不仅要删除用户并且也将用户的目录等一并删除请使用--remove-home选项：

```
$ sudo deluser --remove-home shareuser
```

在系统中添加shareuser用户后，再为samba添加这个用户就不会报错了。

4、配置好用户之后，还需要编辑samba的配置文件，打开配置文件：

```
$ sudo vi /etc/samba/smb.conf
```

在配置文件smb.conf的最后添加下面的内容：

```
[share]
comment = share folder
browseable = yes
path = /home/share
create mask = 0700
directory mask = 0700
valid users = shareuser
public = yes
available = yes
writable = yes
```

最后，重启samba服务器：

```
$ sudo systemctl restart smbd
```

此时就可以在其它地方访问你在ubuntu中的共享文件夹了。比如在windows系统中，输入\\192.168.1.100回车，再按提示输入用户名和密码，就能正常访问共享文件夹的内容了。