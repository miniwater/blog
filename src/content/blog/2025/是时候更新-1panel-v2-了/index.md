---
categories:
- 信息技术
- 1Panel
category: 1Panel
draft: false
published: 2025-06-23 19:25:10
slug: 是时候更新-1panel-v2-了
tags:
- 1Panel
- Docker
- HTTP/3
- openresty
- VPS
- 迁移
- 服务器
- 面板
- H3
title: 是时候更新 1Panel V2 了
updated: 2025-07-16 17:42:34
---

在2025年6月10日，1Panel终于放出了V2的正式版，新版带来许多革命性的变化，也可以理解为V1版是飞致云对面板的初步摸索，而V2则是总结经验进行大刀重构。

在官网上可以看到这样一句话

> 由于 V2 版本较 V1 版本有比较大的架构变动，目前不支持从 V1 版本直接在线升级至 V2 版本。
>
>
>
> 1Panel V1 版本的用户，可以使用官方提供的[迁移工具](https://gitee.com/fit2cloud-feizhiyun/1panel-migrator)，将 1Panel V1 平滑升级至 1Panel V2。

## 下载迁移工具

**1panel-migrator** 是官方提供的迁移工具，用于将 **1Panel V1** 平滑升级至 **1Panel V2**。

<https://gitee.com/fit2cloud-feizhiyun/1panel-migrator/releases>

以 amd64 架构为例，下载 `1panel-migrator-linux-amd64`

文件重命名为 `1panel-migrator`

放入 `/usr/local/bin/` 目录中

最后的文件路径为：`/usr/local/bin/1panel-migrator`

一定要记得备份网站！

## 执行升级服务

执行下面命令

```
1panel-migrator upgrade core
```

等待面板更新

```
root@krjojo:~# 1panel-migrator upgrade core

注意事项：
在将 1Panel V1 服务迁移至 V2 主节点前，请务必阅读！

1. 原有 V1 版本的许可证信息将被清除，统一迁移为社区版本
2. 出于兼容性考虑，所有 V1 网站、应用和数据库的备份记录将被清空
3. 计划任务的执行记录将不保留（保留 V1 创建的计划任务本体）
4. 由于版本机制差异，V1 的快照记录无法迁移至 V2

迁移期间将停止当前 V1 服务，请确认风险后再继续操作。
是否确认将 V1 迁移至 V2 主节点？ (y/n): y
2025/06/23 17:38:05 即将开始自动下载 V2 安装包，请耐心等待，勿关闭终端。
2025/06/23 17:38:08 下载安装文件成功！
2025/06/23 17:38:08 初始化 core.db 完成
2025/06/23 17:38:08 [xpack] 初始化 core.db 完成
2025/06/23 17:38:09 初始化 agent.db 完成
2025/06/23 17:38:09 [xpack] 初始化 agent.db 完成
2025/06/23 17:38:09 基础数据初始化成功！
2025/06/23 17:38:09 即将自动迁移并备份 V1 相关数据，请耐心等待，勿关闭终端。
2025/06/23 17:38:17 数据迁移成功！
2025/06/23 17:38:17 备份 V1 相关数据成功！
迁移成功，版本已经成功迁移至 v2.0.0 
请执行 1panel-migrator upgrade website 命令来升级网站
```

## 升级网站

继续执行下面命令，把 V1 网站数据迁移至 V2

```
1panel-migrator upgrade website
```

等待数据更新完毕

```
root@krjojo:~# 1panel-migrator upgrade website

注意事项：
网站迁移前请务必阅读！

1. 迁移完成后，所有网站配置将保存至 {1Panel 安装目录}/www
2. OpenResty 将升级至 1.27.1.2-0-1-focal
3. 迁移操作会重置 OpenResty 主配置文件，如有自定义修改，请提前备份
4. 迁移操作会重置 OpenResty 00.default.conf 会取消默认的 default_server 可以在升级之后用 v1 的 00.default.conf  文件替换，
5. PHP 运行环境将被移除（已创建网站中的 PHP 容器不会删除，但会迁移为静态网站）
6. V2 版本迁移成功后，可在网站设置中将迁移的静态网站切换为 PHP 网站
7. 因反代缓存机制已重构，所有网站的反代缓存将会关闭，请升级之后重新打开

迁移期间网站将不可访问，请确认风险后继续操作。
是否确认迁移网站？ (y/n): y
再次确认：确定要升级网站吗？ (y/n): y
正在升级网站...
2025/06/23 17:39:04 应用商店状态正常
2025/06/23 17:39:04 下载 Openresty https://apps-assets.fit2cloud.com/stable/1panel/openresty/1.27.1.2-0-1-focal/openresty-1.27.1.2-0-1-focal.tar.gz 到 /tmp/openresty.tar.gz
2025/06/23 17:39:13 开启拉取 Openresty 镜像 1panel/openresty:1.27.1.2-0-1-focal 请等待
1.27.1.2-0-1-focal: Pulling from 1panel/openresty
d9802f032d67: Pull complete 
25defb16ae6e: Pull complete 
e5b0f3eb3e16: Pull complete 
e79a686cd1be: Pull complete 
db1c5d2210b2: Pull complete 
df991a36f66d: Pull complete 
a0ff281ddbf4: Pull complete 
57462a64fc11: Pull complete 
6f6c228b0269: Pull complete 
86201f8a3660: Pull complete 
3ce6057e763d: Pull complete 
5beb1b66329a: Pull complete 
f336f0e8f4d8: Pull complete 
Digest: sha256:c6ae4bc3392115d0778697047e05b3a87eff73c5d12895d3786f17ba21515bf4
Status: Downloaded newer image for 1panel/openresty:1.27.1.2-0-1-focal
docker.io/1panel/openresty:1.27.1.2-0-1-focal
2025/06/23 17:40:17 docker-compose down executed successfully
2025/06/23 17:40:17 备份 V1 Openresty 到 /opt/1panel/backup/openresty 目录
2025/06/23 17:41:02 备份 V1 Openresty 成功
2025/06/23 17:41:02 开始迁移网站目录
2025/06/23 17:41:02 迁移网站 www 目录到 /opt/1panel/www 目录
2025/06/23 17:41:02 迁移网站 www 目录成功
2025/06/23 17:41:02 迁移 Openresty conf.d 目录成功
文件 /opt/1panel/www/sites/www.krjojo.com/proxy/websocket.conf 无需更新
2025/06/23 17:41:02 处理反代文件: /opt/1panel/www/sites/www.krjojo.com/proxy/websocket.conf
2025/06/23 17:41:02 开始升级 Openresty
2025/06/23 17:41:03 解压 Openresty
2025/06/23 17:41:05 移动 Openresty 目录 /tmp/openresty/1.27.1.2-0-1-focal 到 /opt/1panel/apps/openresty/openresty
2025/06/23 17:41:05 拷贝 Openresty .env
2025/06/23 17:41:06 处理 WAF 配置
2025/06/23 17:41:06 启动 Openresty ...
2025/06/23 17:41:08 docker-compose up -d executed successfully
2025/06/23 17:41:08 启动 Openresty 成功
2025/06/23 17:41:08 升级 Openresty 成功
```

完毕后

登录面板，右下角继续更新，

从 v2.0.0 更新至 v2.0.2

## 安装运行环境

> 由于 1Panel V2 修改了运行环境结构， V1 更新上来需要重新安装运行环境，原本的PHP会被切换成静态网站
>
>
>
> 虽然旧的运行环境容器还在，只是运行环境页面不显示，不重装网站也能正常运行，但还是建议重新建一个新的运行环境

重新安装PHP扩展

分享一个我在用的扩展模板

```
exif,imagick,intl,zip,opcache,redis,mysqli,gd
```

扩展安装完毕后进网站面板，把静态网站修改回PHP环境。

最后进 应用商店 - 已安装 页面，把旧版的php运行环境容器停止并删除

旧版镜像：1panel-php:8.4.6

新版镜像：1panel-php-fpm:8.4.6

## 开启http3

进入网站面板

HTTPS - HTTP3 - 启用

记得防火墙要放开443UDP端口

在线HTTP3检测网站：

* <https://http3check.net/>
* <https://http3.wcode.net/>

在线检测浏览器是否支持HTTP3：

* <https://quic.nginx.org/>
* <https://http3.is>
* <https://cloudflare-quic.com/>

本地使用 curl 检测网站

<https://curl.se/download.html>

以Windows为例，下载 <https://curl.se/windows/>，进入 `\bin` 目录执行

```
curl.exe --http3-only https://http3.is
```

## 后续

在某一天神奇的发现，面板的h3有问题

无法通过`http3-only`来访问h3，

返回：

```
curl: (55) ngtcp2_conn_handle_expiry returned error: ERR_HANDSHAKE_TIMEOUT
```

使用最新 Chrome 浏览器不停刷新也看不到 h3 协议。

ios safari 访问开启了h3的站点时，有概率出现无连接

经过一顿排查摸索后，

**需要修改 OpenResty 配置文件**

请看**后续二**

在 `listen 443 quic` 后面添加 `reuseport`

```
server {
    listen 80 ; 
    listen 443 ssl ; 
    listen 443 quic reuseport; 
....
```

> 但需要注意的是，每个 nginx 只能定义一个 `reuseport`，单个站点定义后其他站点不能再定义了
>
>
>
> 解决办法就是在顶层 nginx 顶层配置文件的 http 里加入 reuseport
>
>
>
> 再后续，发现只有有一个站点写了 reuseport; 其他站点在面板里开启h3也能正常使用了，不需要每个站点都添加
>
>
>
> 神奇 1Panel .....

总结

不知道是不是因为 nginx 容器化后，worker 进程对 udp 的监听出了问题

但是按理来说不应该，毕竟在一年前我就试过切换镜像的方式强行在 1Panel 面板上开启 HTTP3

过去的文章：[OpenResty 对 HTTP/3 的一次尝试](https://www.krjojo.com/9149.html)

只能等后续有时间，出一篇关于 reuseport 摸索的文章了

## 后续二

经过跟 1Panel 开发者一顿交流后：<https://github.com/1Panel-dev/1Panel/issues/9525>

解决办法就是卸载重装 OpenResty 容器，

原因在于 OpenResty 的配置文件是1Panel v1版本的

也可以不重装，只拿v2的配置文件覆盖

/opt/1panel/apps/openresty/openresty/conf/default/00.default.conf

```
server {
    listen 80 ; 
    listen [::]:80 ; 
    listen 443 ssl ; 
    listen [::]:443 ssl ; 
    listen 443 quic reuseport ; 
    listen [::]:443 quic reuseport ; 
    server_name _; 
    index 404.html; 
    root /usr/share/nginx/html; 
    include /usr/local/openresty/nginx/conf/ssl/root_ssl.conf; 
    http2 on; 
}
```