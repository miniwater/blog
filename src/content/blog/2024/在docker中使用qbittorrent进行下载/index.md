---
categories:
- Docker
cover: ''
date: 2024-05-09T22:27:12+08:00
draft: false
slug: 在docker中使用qbittorrent进行下载
tags:
- Docker
- 磁力链接
title: 在Docker中使用qbittorrent进行下载
updated: 2024-05-09T22:27:13+08:00
wp_id: 9356
---

qBittorrent是种子和磁力链接下载使用最为广泛的形式了，它支持使用种子文件和磁力链接下载，包括了做种、tracker 编辑、下载优先级设置、RSS 订阅等功能非常丰富。如果你有一台服务器，或是家中有一台NAS，可以简单的使用Docker更行下载，非常方便。

1、拉取镜像：

```
docker pull linuxserver/qbittorrent
```

2、创建对应目录并编写 Docker-Compose 文件：

```
cd ~
mkdir /root/data/docker_data/qBittorrent #创建qbitorrent数据文件夹
cd /root/data/docker_data/qBittorrent
mkdir config downloads #创建配置文件目录与下载目录
nano docker-compose.yml #创建并编辑文件
```

3、写入配置信息：

```
version: "2"
services:
qbittorrent:
image: linuxserver/qbittorrent
container_name: qbittorrent
environment:
- PUID=1000
- PGID=1000
- TZ=Asia/Shanghai # 你的时区
- UMASK_SET=022
- WEBUI_PORT=8081 # 将此处修改成你欲使用的 WEB 管理平台端口
volumes:
- ./config:/config # 绝对路径请修改为自己的config文件夹
- ./downloads:/downloads # 绝对路径请修改为自己的downloads文件夹
ports:
# 要使用的映射下载端口与内部下载端口，可保持默认，安装完成后在管理页面仍然可以改成其他端口。
- 6881:6881
- 6881:6881/udp
# 此处WEB UI 目标端口与内部端口务必保证相同，见问题1
- 8081:8081
restart: unless-stoppe
```

4、执行 docker-compose：

```
docker-compose up -d # docker-compose
# 执行后，访问 ip:web-ui-port 即可进入管理页面。
# 默认用户名密码admin/adminadmin
```

安装好docker版本的qBittoreent后，就可以打开网页使用了：

访问 ip:port，进入 WebUI 管理界面。

默认账号 admin, 默认密码 adminadmin。