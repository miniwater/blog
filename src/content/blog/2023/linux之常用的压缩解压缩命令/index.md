---
categories:
- Linux
- 信息技术
cover: ''
date: 2023-04-21T23:47:04+08:00
draft: false
slug: linux之常用的压缩解压缩命令
tags:
- Linux
- 压缩
- 解压
title: Linux之常用的压缩解压缩命令
updated: 2023-04-21T23:47:05+08:00
wp_id: 796
---

# 1 解压命令

> ```
> tar -xvf filename.tar
>
> tar -zxvf filename.tar.gz
>
> tar -zxvf filename.tgz
>
> tar -jxvf filename.tar.bz2
>
> tar -xZvf filename.tar.Z
>
> unrar e filename.rar # 解压到当前目录
>
> unrar x filename.rar /path/to/extract 
>
> unzip filename.zip -d filepath
>
> tar.xz文件解压：先xz -d xxx.tar.xz到tar，然后tar xvf xxx.tar
> ```

# 2 压缩命令

> ```
> tar -zcvf filename.tar.gz filename
>
> tar -zcvf filename.tgz filename
>
> tar -jcvf filename.tar.bz2 filename
>
> zip filename.zip filename
>
> zip -r location.zip location
>
> gzip -d filename.gz filename
>
> rar -a filename.rar filename
> ```

# 3 多个压缩文件

如果遇到某个文件夹过大，需要将压缩文件跟个成 N 个指定大小的文件，便于邮件等方式传输，可以使用下边的方法

首先先压缩成一个大文件

```
tar -zcvf filename.tar.gz filenam
```

 然后使用 [split](https://so.csdn.net/so/search?q=split&spm=1001.2101.3001.7020) 指令进行切分

```
split -b 4000M -d -a 1 filename.tar.gz filename.tar.gz.cat filename.tar.gz | split -b 4000M -d -a 1 filename.tar.gz.
```

其中，

> * -b 4000M 表示设置每个分割包的大小，单位还是可以k
> * -d "参数指定生成的分割包后缀为数字的形式
> * -a x来设定序列的长度(默认值是2)，这里设定序列的长度为1

 也可以合成一步进行操作

```
tar -zcvf filename.tar.gz filename | split -b 4000M -d -a 1 -filename.tar.gz.
```

多个压缩文件解压方法如下

```
cat filename.tar.gz.* | tar -zxv
```