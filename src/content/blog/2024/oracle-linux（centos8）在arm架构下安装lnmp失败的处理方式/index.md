---
categories:
- Centos
- Linux
- 信息技术
cover: ''
date: '2024-05-09T22:36:10+08:00'
draft: false
slug: oracle-linux（centos8）在arm架构下安装lnmp失败的处理方式
tags:
- ARM
- Centos
- Centos8
- Linux
- LNMP
title: Oracle Linux（Centos8）在ARM架构下安装LNMP失败的处理方式
updated: '2024-05-09T22:36:10+08:00'
wp_id: 9366
---

**1、安装mysql时，可能会因为cmake版本过低而安装失败，先更新cmake（注意是ARM版本）:**

```
$ cd /usr/local/
$ wget https://github.com/Kitware/CMake/releases/download/v3.23.4/cmake-3.23.4-linux-aarch64.tar.gz
$ tar zxf cmake-3.23.4-linux-aarch64.tar.gz
$ mv cmake-3.23.4-linux-aarch64 cmake
$ mv /usr/bin/cmake /usr/bin/cmake.backup
$ ln -sf /usr/local/cmake/bin/cmake /usr/bin/cmake
```

安装完查看cmake的版本信息：

```
$ cmake --version
cmake version 3.23.4

CMake suite maintained and supported by Kitware (kitware.com/cmake).
```

**2、安装php可能会因为系统上缺少oniguruma-devel包而安装失败，通过源码安装oniguruma oniguruma-devel:**

```
$ wget https://github.com/kkos/oniguruma/archive/v6.9.8.tar.gz -O oniguruma-6.9.8.tar.gz
$ tar -zxf oniguruma-6.9.8.tar.gz
$ cd oniguruma-6.9.8
$ ./autogen.sh && ./configure --prefix=/usr
$ make && make install
```

注意：

如果运行提示：

```
$ ./autogen.sh: line 6: autoreconf: command not found
```

则需要安装如下依赖：

```
$ yum install autoconf automake libtool
```

**3、如果系统自带gcc版本过低（低于版本8），也要升级到8.X版本，如果版本为8.X版本，则不需要更新：**

先查看版本：

```
$ gcc --version
```

版本低于8，则升级到8.X：

```
$ yum -y install centos-release-scl
$ yum -y install devtoolset-8-gcc devtoolset-8-gcc-c++ devtoolset-8-binutils
$ scl enable devtoolset-8 bash
# 以上命令仅当前终端使用 8 版本,以下命令永久使用.
$ echo "source /opt/rh/devtoolset-8/enable" >>/etc/profile
```