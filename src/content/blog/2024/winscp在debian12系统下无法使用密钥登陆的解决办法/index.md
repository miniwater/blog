---
categories:
- Debian
- Linux
- 信息技术
cover: ''
date: '2024-05-09T22:30:49+08:00'
draft: false
slug: winscp在debian12系统下无法使用密钥登陆的解决办法
tags:
- Debian
- Linux
- ssh
- WinSCP
title: WinSCP在Debian12系统下无法使用密钥登陆的解决办法
updated: '2024-05-09T22:30:49+08:00'
wp_id: 9360
---

今天装了个Debian12的系统，配置了ssh登录，但使用WinSCP通过ssh密钥登录时，总提示被拒绝，但是单独使用putty通过密钥登录却正常，让人百思不得其解。

网上搜罗一番，说Linux系统使用OpenSSh8.0以后的版本中，配置文件“/etc/ssh/sshd\_config”中默认不再添加ssh-rsa密钥认证方式。我装的Debian12系统使用的openssh版本为9.2，所以它默认是没有添加ssh-rsa密钥认证的。

具体的解决方法很简单，在/etc/ssh/sshd\_config中添加：

```
PubkeyAcceptedKeyTypes +ssh-rsa
```

然后重启ssh服务即可：

```
systemctl restart sshd
```

再使用WinSCP通过密钥登录就正常了。