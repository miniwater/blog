---
categories:
- Linux
- 信息技术
cover: ''
date: '2023-03-20T11:50:03+08:00'
draft: false
slug: openwrt开机自启动时间校准ntpd服务
tags: []
title: OpenWrt开机自启动时间校准ntpd服务
updated: '2023-04-21T23:48:06+08:00'
wp_id: 792
---

理论上，[OpenWrt](https://so.csdn.net/so/search?q=OpenWrt&spm=1001.2101.3001.7020) 自带的时钟同步服务`sysntpd`应该是开机自启的，但是在某些设备遇到了开机不自启的问题，干脆使用原生的`ntpd`服务。

在`\etc\rc.local`文件中最后一行的`exit 0`之前写入：

```
ntpd -p ntp.aliyun.com
```

`-p`表示从指定服务器获取时间。该命令运行后会生成守护进程`ntpd`，可以通过`ps`命令查看：

```
ps | grep ntp
```

注：若首次使用`rc.local`，还需要为其添加执行权限（参考[该教程](https://blog.csdn.net/Hsin96/article/details/124326794?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22124326794%22%2C%22source%22%3A%22Hsin96%22%7D&ctrtid=ZZKG5)）：

```
chmod +x /etc/rc.local
```

---

如果不想开机自启`ntpd`，而是自己手动更新时间，可以像[该教程](https://blog.csdn.net/weixin_42396877/article/details/82825770)一样使用如下命令：

```
ntpd -n -d -p 0.asia.pool.ntp.org
```

`-n`代表不进入守护程序模式，直接在前台运行；  
`-d`代表verbose模式，即输出更多的状态提示字符；  
`-p`上文已提过。

更多参数介绍可以参考[该教程](https://blog.csdn.net/qq_40290222/article/details/109625683)。

注意上面的命令会一直运行下去，在更新几轮之后就可以手动`Ctrl+C`退出啦。之后输入`date`命令，顺利的话就可以发现系统时间已经校正成功。