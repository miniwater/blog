# Docker 国内镜像源

境内 Docker 镜像状态监控：[https://status.anye.xyz](https://status.anye.xyz/)

| 来源 | URL |
| --- | --- |
| 1Panel | [https://docker.1panel.live](https://docker.1panel.live) |
| 手里有只毛毛虫（CloudFlare） | [https://docker.krjojo.com](https://docker.krjojo.com) |
| 科技lion | [https://docker.kejilion.pro](https://docker.kejilion.pro) |
| DockerProxy | [https://dockerproxy.net](https://dockerproxy.net)  
发布页：[https://dockerproxy.link/](https://dockerproxy.link/) |
| Docker Layer ICU | [https://image.cloudlayer.icu](https://image.cloudlayer.icu) |
| 网友自托管 | [https://proxy.vvvv.ee](https://proxy.vvvv.ee)  
[https://hub.1panel.dev](https://hub.1panel.dev)  
[https://proxy.vvvv.ee](https://proxy.vvvv.ee) |

## 使用方法

### 镜像加速

```json
{
 "registry-mirrors": [
  "https://docker.krjojo.com",
  "https://docker.1panel.live"
 ]
}
```

### 手动拉取

设置了镜像加速后，依然无法拉取或者拉取失败，可以试试先手动拉取镜像，再执行 docker run 或者 docker compose

```shell
docker pull docker.krjojo.com/stilleshan/frpc:latest
docker pull docker.krjojo.com/library/mysql:8.4.6
```

重命名镜像和删除镜像代理

可以不做，会和 [https://registry-1.docker.io/v2](https://registry-1.docker.io/v2) 检查 IMAGE ID 是否相同，不会额外占用存储

```shell
docker tag dockerproxy.net/stilleshan/frpc:latest stilleshan/frpc:latest
 
docker rmi dockerproxy.net/stilleshan/frpc:latest
```

## 自托管

基于Go的自托管轻量级、高性能的多功能代理加速服务，提供 Docker 镜像加速、GitHub 加速、下载离线镜像等功能。单域名实现所有功能，支持仓库审计。流式转发，无缓存。

[https://github.com/sky22333/hubproxy](https://github.com/sky22333/hubproxy)
