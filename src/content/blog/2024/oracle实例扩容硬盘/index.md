---
categories:
- Linux
- 信息技术
cover: ''
date: 2024-05-09T22:33:39+08:00
draft: false
slug: oracle实例扩容硬盘
tags:
- Linux
- Oracle
- 扩容硬盘
title: Oracle实例扩容硬盘
updated: 2024-05-09T22:33:40+08:00
wp_id: 9364
---

Oracle开实例默认只有47G，如果在200G范围内增加硬盘容量，就需要手动进行扩容。

查看磁盘和分区详情使用如下命令：

```
[root@sg ~]# lsblk
NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda 8:0 0 105G 0 disk
├─sda1 8:1 0 100M 0 part /boot/efi
├─sda2 8:2 0 1G 0 part /boot
├─sda3 8:3 0 45.5G 0 part
│ ├─ocivolume-root 252:0 0 35.5G 0 lvm /
│ └─ocivolume-oled 252:1 0 10G 0 lvm /var/oled
```

执行扩容命令：

```
LANG=en_US.UTF-8
sudo /usr/libexec/oci-growfs
```

再次检查磁盘和分区详情：

```
[root@sg ~]# lsblk
NAME MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda 8:0 0 105G 0 disk
├─sda1 8:1 0 100M 0 part /boot/efi
├─sda2 8:2 0 1G 0 part /boot
└─sda3 8:3 0 103.9G 0 part
├─ocivolume-root 252:0 0 93.9G 0 lvm /
└─ocivolume-oled 252:1 0 10G 0 lvm /var/oled
```

通过对比，sda3硬盘已扩容为103.9G。