---
categories:
- 信息技术
- Linux
category: Linux
draft: false
published: 2023-11-29 20:18:25
slug: 新服务器到手后设置swap虚拟内存那些事
tags:
- Linux
- swap
title: 新服务器到手后设置扩展内存那些事-Swap
updated: 2023-11-29 21:17:01
---

## 检查swap

```
swapon -s
```

Type=file（Swapfile）

Type=partition（zram）

无（无swap）

## Swapfile(swap)

在内存不够用的时候，将部分内存上的数据交换到swap（硬盘）空间上，以便让系统不会因内存不够用而导致oom或者更致命的情况出现。建议服务器使用

查看swap是否有创建

```
free -m
```

使用文件作为swap分区

```
#使用dd创建swap文件/data/swapfile，大小为1G
dd if=/dev/zero of=/data/swapfile bs=1M count=1024
#---或---
#使用fallocate创建swap文件/data/swapfile，大小为1G
fallocate -l 1G /data/swapfile

#交换文件格式化为swap分区
mkswap /data/swapfile
#设置权限
chmod 600 /data/swapfile
#启用swap分区
swapon /data/swapfile
#设置开机自动启用swap分区
vi /etc/fstab
#添加一行
/data/swapfile swap swap defaults 0 0
```

卸载swap分区

```
swapoff /data/swapfile
```

删除swap分区

```
rm -rf /data/swapfile
```

设置swap分区使用优先级

```
#查看优先级设置，0不使用swap分区，100尽可能使用swap分区，根据需求设置一个中间值即可
cat /proc/sys/vm/swappiness

#临时设置优先级，内存占用超过70%后写如swap
sysctl vm.swappiness=30

#设置开机自动生效
echo "vm.swappiness = 30"  >>  /etc/sysctl.conf
#加载sysctl.conf参数
sysctl -p
```

释放虚拟内存命令

```
# sync命令可以多执行几遍
# drop_caches的值（N）可以是0-3之间的数字，代表不同的含义：
# 0：不释放(系统默认值);默认情况下表示不释放内存，由操作系统自动管理;
# 1：释放页缓存;
# 2：释放dentries和inodes；
# 3：释放所有缓存。
echo N > /proc/sys/vm/drop_caches
```

## Swap Partition(zram、交换分区)

zRAM 机制是将进程不常用的内存压缩存储在内存某个区域。 zRAM 机制并不会发生 I/O 操作，从而避免因 I/O 操作导致的性能下降。建议安卓手机使用

监看 zram

```
zramctl
```

创建zram

zRAM 是 Linux 内核的模块，要启用 zRAM 请使用 modprobe 命令加载 zRAM 模块。

```
modprobe zram num_devices=1
# 然后运行 lsmod 命令确认是否成功加载
lsmod  | grep zram
```

配置 zRAM

```
# 设置了 zram0 的大小为 512MB，能够存储 512MB 压缩后的数据。
echo 512M > /sys/block/zram0/disksize
# 更改 zRAM 的压缩算法
echo lzo > /sys/block/zram0/comp_algorithm
# 方括号扩着哪个算法就说明启用了哪个
cat /sys/block/zram0/comp_algorithm
```

持久化开启/加载 zRAM 模块

```
# 格式化为zram
mkswap /dev/zram0
# 启用zram
swapon /dev/zram0
```