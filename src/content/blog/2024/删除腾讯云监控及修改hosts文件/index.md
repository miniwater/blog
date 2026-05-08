---
categories:
- Linux
- 信息技术
cover: ''
date: '2024-05-09T22:47:18+08:00'
draft: false
slug: 删除腾讯云监控及修改hosts文件
tags:
- hosts
- Linux
- 腾讯云
title: 删除腾讯云监控及修改hosts文件
updated: '2024-05-09T22:47:19+08:00'
wp_id: 9372
---

**一、删除腾讯云自带的监控：**

腾讯云的轻量云主机默认安装了相关的监控软件，比如cpu和内存监控：

```
root@Server:~$ ps -A | grep agent
1747 ? 00:00:02 sgagent
1764 ? 00:00:04 barad_agent
1770 ? 00:04:35 barad_agent
1771 ? 00:20:18 barad_agent
779233 ? 00:02:23 tat_agent
```

若不需要此项监控，可以运行以下命令删除代码：

```
/usr/local/qcloud/stargate/admin/uninstall.sh
/usr/local/qcloud/monitor/barad/admin/uninstall.sh
```

还有一些提供诸如异地登录、暴力破解等监控，异常登录会发邮件或短信通知：

```
root@Server:~$ ps -A | grep YD
963 ? 00:00:00 YDLive
1063 ? 00:00:00 YDService
978 ? 00:00:00 YDEdr
```

若不想使用可以删除：

```
/usr/local/qcloud/YunJing/uninst.sh
```

最后彻底删除qcloud文件:

```
rm -rf /usr/local/qcloud
```

**二、修改hosts文件：**

在使用过程中发现，我修改了hosts文件，但是一重启就会还原，这个要修改hosts模板文件。查看hosts模板路径及名字：

```
cat /etc/hosts
```

会在注释中看到模板文件的路径和名字，复制路径编辑它：

```
vi /etc/cloud/templates/hosts.debian.tmpl
```

添加一行：

```
127.0.0.1 Qcloud Qcloud
```

保存模板文件后，再重启系统，这添加的一行就不丢失了。

相关参考：

<https://cloud.tencent.com/document/product/213/34698>

<https://cloud.tencent.com/document/product/213/19670#cloud-init>