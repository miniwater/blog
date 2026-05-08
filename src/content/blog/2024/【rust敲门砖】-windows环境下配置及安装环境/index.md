---
categories:
- Rust
- 信息技术
cover: ./rust.avif
date: 2024-12-23T13:22:21+08:00
draft: false
slug: 【rust敲门砖】-windows环境下配置及安装环境
tags:
- Rust
- windows
- 入门
- 安装环境
title: 【Rust敲门砖】 Windows环境下配置及安装环境
updated: 2024-12-25T13:12:10+08:00
wp_id: 10440
---

![](./rust.avif)

## 安装C++环境

`rust`底层是依赖`C`环境的连接器，所以需要先安装`C/C++`编译环境, 有两种选择:安装微软的`msvc`或者安装`mingw/cygwin`。

如果使用[msvc](https://so.csdn.net/so/search?q=msvc&spm=1001.2101.3001.7020)的Visual Studio，只需要安装好C/C++编译环境,然后一路默认就行了，缺点是体积比较大，下载安装都要好几个G，参见：安装MSVC。

本文主要讲解`mingw-64`的环境下的安装操作，

看看下载页面

<https://www.mingw-w64.org/downloads/>

可以看到有很多种`mingw-64`的构建方式，支持`windows`的也不少，我本人目前用的是上图中圆圈标记的那个。

### Mingw-builds 的构建版本

地址为：<https://github.com/niXman/mingw-builds-binaries/releases>

以 [Release of 14.2.0-rt\_v12-rev0](https://github.com/niXman/mingw-builds-binaries/releases/tag/14.2.0-rt_v12-rev0) 版本为例

* [i686-14.2.0-release-mcf-dwarf-ucrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/i686-14.2.0-release-mcf-dwarf-ucrt-rt_v12-rev0.7z)88.6 MBSep 5
* [i686-14.2.0-release-posix-dwarf-msvcrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/i686-14.2.0-release-posix-dwarf-msvcrt-rt_v12-rev0.7z)88.8 MBSep 5
* [i686-14.2.0-release-posix-dwarf-ucrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/i686-14.2.0-release-posix-dwarf-ucrt-rt_v12-rev0.7z)88.5 MBSep 5
* [i686-14.2.0-release-win32-dwarf-msvcrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/i686-14.2.0-release-win32-dwarf-msvcrt-rt_v12-rev0.7z)88.9 MBSep 5
* [i686-14.2.0-release-win32-dwarf-ucrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/i686-14.2.0-release-win32-dwarf-ucrt-rt_v12-rev0.7z)88.6 MBSep 5
* [x86\_64-14.2.0-release-mcf-seh-ucrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-mcf-seh-ucrt-rt_v12-rev0.7z)79.9 MBSep 5
* [x86\_64-14.2.0-release-posix-seh-msvcrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-posix-seh-msvcrt-rt_v12-rev0.7z)80 MBSep 5
* [x86\_64-14.2.0-release-posix-seh-ucrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-posix-seh-ucrt-rt_v12-rev0.7z)79.9 MBSep 5
* [x86\_64-14.2.0-release-win32-seh-msvcrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-win32-seh-msvcrt-rt_v12-rev0.7z)80.1 MBSep 5
* [x86\_64-14.2.0-release-win32-seh-ucrt-rt\_v12-rev0.7z](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-win32-seh-ucrt-rt_v12-rev0.7z)80 MBSep 5
* [Source code(zip)](https://github.com/niXman/mingw-builds-binaries/archive/refs/tags/14.2.0-rt_v12-rev0.zip)Feb 21
* [Source code(tar.gz)](https://github.com/niXman/mingw-builds-binaries/archive/refs/tags/14.2.0-rt_v12-rev0.tar.gz)Feb 21

### 如何选择版本

* x86\_64
  + 64位系统，不必多说
* i686
  + 继 `i386`、`i486` 和 `i586`（如 Pentium）的升级版本，一种特定的 32 位 x86 架构。

* [mcf](https://github.com/niXman/mingw-builds-binaries/releases/download/14.2.0-rt_v12-rev0/x86_64-14.2.0-release-mcf-seh-ucrt-rt_v12-rev0.7z)
  + **意义**：`mcf`（Microsoft C Runtime）表示使用微软的C运行时库。
  + **适用性**：更适合与微软相关的工具和环境结合使用，通常在Windows环境中表现更好。
  + **异常处理**：支持微软结构化异常处理（SEH），这对于Windows开发来说是标准的异常处理机制。
  + **线程模型**：与微软相关的线程模型兼容性更好。
* posix
  + **意义**：`posix`（Portable Operating System Interface for uniX）表示POSIX标准兼容模式。
  + **适用性**：更适合跨平台开发和对POSIX标准有依赖的应用。如果你的开发需要支持多平台或者与POSIX标准的库和工具兼容，那么选择POSIX可能更合适。
  + **异常处理**：支持POSIX兼容的异常处理，适用于需要符合POSIX标准的应用程序。
  + **线程模型**：支持POSIX线程模型（pthread），更适合跨平台开发。
* win32
  + 用于对目标平台 win32 (32位) 的开发

* msvcrt-rt
  + 微软早期开发的C运行时库，随Windows操作系统和Visual Studio发布。
  + 已经存在很长时间，主要用于兼容旧版本的Windows和旧版应用程序。
  + 对于需要支持老版本Windows和老版本应用程序的开发者适用。
* ucrt-rt
  + 微软推出的新版C运行时库，意在统一C运行时库，使其更易于跨平台兼容。
  + 随Windows 10及更新版本发布，并作为Windows操作系统的一部分分发。
  + 对于需要现代C标准功能和更好兼容性的开发者适用。

以我为例，选择 x86\_64-14.2.0-release-posix-seh-ucrt-rt\_v12-rev0

然后下载到本地，把`bin`文件夹加到`Path`系统环境变量里面即可，这个适合老手，毕竟这个压缩包才70Mb左右，比安装`msvc`那一套快，又省空间。

至此，C/C++环境就搞定了，就是这么简单。

```
Microsoft Windows [版本 10.0.26100.2605]
(c) Microsoft Corporation。保留所有权利。

C:\Users\14564>gcc -v
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=E:/APP/mingw64/bin/../libexec/gcc/x86_64-w64-mingw32/14.2.0/lto-wrapper.exe
Target: x86_64-w64-mingw32
Configured with: ../../../src/gcc-14.2.0/configure --host=x86_64-w64-mingw32 --build=x86_64-w64-mingw32 --target=x86_64-w64-mingw32 --prefix=/mingw64 --with-sysroot=/c/buildroot/x86_64-1420-posix-seh-ucrt-rt_v12-rev0/mingw64 --enable-host-shared --disable-multilib --enable-languages=c,c++,fortran,lto --enable-libstdcxx-time=yes --enable-threads=posix --enable-libgomp --enable-libatomic --enable-lto --enable-graphite --enable-checking=release --enable-fully-dynamic-string --enable-version-specific-runtime-libs --enable-libstdcxx-filesystem-ts=yes --disable-libssp --disable-libstdcxx-pch --disable-libstdcxx-debug --enable-bootstrap --disable-rpath --disable-win32-registry --disable-nls --disable-werror --disable-symvers --with-gnu-as --with-gnu-ld --with-arch=nocona --with-tune=core2 --with-libiconv --with-system-zlib --with-gmp=/c/buildroot/prerequisites/x86_64-w64-mingw32-static --with-mpfr=/c/buildroot/prerequisites/x86_64-w64-mingw32-static --with-mpc=/c/buildroot/prerequisites/x86_64-w64-mingw32-static --with-isl=/c/buildroot/prerequisites/x86_64-w64-mingw32-static --with-pkgversion='x86_64-posix-seh-rev0, Built by MinGW-Builds project' --with-bugurl=https://github.com/niXman/mingw-builds LD_FOR_TARGET=/c/buildroot/x86_64-1420-posix-seh-ucrt-rt_v12-rev0/mingw64/bin/ld.exe --with-boot-ldflags='-pipe -fno-ident -L/c/buildroot/x86_64-1420-posix-seh-ucrt-rt_v12-rev0/mingw64/opt/lib -L/c/buildroot/prerequisites/x86_64-zlib-static/lib -L/c/buildroot/prerequisites/x86_64-w64-mingw32-static/lib  -Wl,--disable-dynamicbase -static-libstdc++ -static-libgcc'
Thread model: posix
Supported LTO compression algorithms: zlib
gcc version 14.2.0 (x86_64-posix-seh-rev0, Built by MinGW-Builds project)

C:\Users\14564>
```

## 二、安装[Rust](https://so.csdn.net/so/search?q=rust&spm=1001.2101.3001.7020)环境

打开 Rust 官网

<https://www.rust-lang.org>

安装 Rustup 这一工具

如果使用msvc环境的话，一切默认就行了，而mingw就需要手动选择`gnu toolchain`

```
Rust Visual C++ prerequisites

Rust requires a linker and Windows API libraries but they don't seem to be
available.

These components can be acquired through a Visual Studio installer.

1) Quick install via the Visual Studio Community installer
   (free for individuals, academic uses, and open source).

2) Manually install the prerequisites
   (for enterprise and advanced users).

3) Don't install the prerequisites
   (if you're targeting the GNU ABI).

>
```

它说`rust`需要`windows API`库和链接器，你可以选择下面3项的一项。

1. 安装Visual Studio。
2. 手动安装的预设条件。
3. 无需预设条件。

我们这里选择3，mingw-w64也是C/C++编译器，就是 GCC 的 Windows 版本 。回车：

```
Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  C:\Users\14564\.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

  C:\Users\14564\.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  C:\Users\14564\.cargo\bin

This path will then be added to your PATH environment variable by
modifying the HKEY_CURRENT_USER/Environment/PATH registry key.

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:

   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with standard installation (default - just press enter)
2) Customize installation
3) Cancel installation
>
```

1. 继续进行标准安装（默认设置-只需按enter键）
2. 自定义安装
3. 取消安装

我们输入2，就是自定义安装，出现提示：

```
I'm going to ask you the value of each of these installation options.
You may simply press the Enter key to leave unchanged.

Default host triple? [x86_64-pc-windows-msvc]
```

输入`x86_64-pc-windows-gnu`，（小提示，你先复制x86\_64-pc-windows-gnu，在rustup右键可以直接粘贴文字，可以不用手写输入。

出现提示：

```
Default toolchain? (stable/beta/nightly/none) [stable]
```

询问安装什么版本，当然是稳定版

直接回车，或者输入`stable`，表示稳定版。

出现提示：

```
Profile (which tools and data to install)? (minimal/default/complete) [default]
```

询问要安装哪些工具

也是直接回车，或者输入`default`，表示默认。

出现提示：

```
Modify PATH variable? (Y/n)
```

输入`Y`，表示修改环境变量，回车

此时，会回到了第一步，提示：

```
Current installation options:

   default host triple: x86_64-pc-windows-gnu
     default toolchain: stable
               profile: default
  modify PATH variable: yes

1) Proceed with selected options (default - just press enter)
2) Customize installation
3) Cancel installation
>
```

直接回车，或者输入1

进入安装流程

```
info: profile set to 'default'
info: setting default host triple to x86_64-pc-windows-gnu
info: syncing channel updates for 'stable-x86_64-pc-windows-gnu'
info: latest update on 2024-11-28, rust version 1.83.0 (90b35a623 2024-11-26)
info: downloading component 'cargo'
info: downloading component 'clippy'
info: downloading component 'rust-docs'
info: downloading component 'rust-mingw'
info: downloading component 'rust-std'
info: downloading component 'rustc'
 81.1 MiB /  81.1 MiB (100 %)  36.1 MiB/s in  2s ETA:  0s
info: downloading component 'rustfmt'
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
 16.5 MiB /  16.5 MiB (100 %)   1.8 MiB/s in  6s ETA:  0s
info: installing component 'rust-mingw'
info: installing component 'rust-std'
 26.6 MiB /  26.6 MiB (100 %)  19.7 MiB/s in  2s ETA:  0s
info: installing component 'rustc'
 81.1 MiB /  81.1 MiB (100 %)  19.8 MiB/s in  4s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-pc-windows-gnu'

  stable-x86_64-pc-windows-gnu installed - rustc 1.83.0 (90b35a623 2024-11-26)

Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload its PATH environment variable to include
Cargo's bin directory (%USERPROFILE%\.cargo\bin).

Press the Enter key to continue.
```

最后敲击回车，关闭窗口完成安装！

### 常用命令

更新Rust

```
rustup update
```

卸载Rust

```
rustup self uninstall
```

查看版本

```
rustc --version
```

打开本地文档

```
rustup doc
```

编译单rs文件（ c = compile ）

```
rustc main.rs
```

创建项目 ( Cargo 是 Rust 的构建系统和包管理工具)

```
cargo new hello_cargo
```

构建项目

```
# 调试
cargo build

# 生产，编译时间更长，运行更快
cargo build --release
```

构建并运行项目

```
cargo run
```

检测代码，确保能通过编译，但不生成文件（比编译快的多）

```
cargo check
```

安装依赖库（安装 rand 随机数）

```
cargo add rand
```

更新依赖库

```
cargo update
```

其他命令

```
#安装其他类型的toolchain开发环境
rustup toolchain install <toolchain>

#例如
rustup toolchain install  stable-x86_64-pc-windows-gnu

#切换默认的toolchain
rustup default [toolchain]

#例如
rustup default stable-x86_64-pc-windows-gnu

#更新：
rustup update stable
rustup default stable
```

## VSCode插件

安装 rust-analyzer 插件

插件地址

<https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer>

可能会遇到以下问题

```
2024-12-23T12:33:20.0151062+08:00 ERROR failed to find any projects in [AbsPathBuf("E:\\project\\rust")]
2024-12-23T12:33:20.0160047+08:00 ERROR FetchWorkspaceError: rust-analyzer failed to fetch workspace
2024-12-23T12:33:20.0295931+08:00 ERROR FetchWorkspaceError: rust-analyzer failed to fetch workspace
```

### 解决办法

说明Rust项目中缺少 Cargo.toml

使用正确方法创建 Rust 项目

```
cargo new hello_cargo
```