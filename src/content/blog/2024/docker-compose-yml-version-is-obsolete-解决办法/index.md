---
categories:
- 信息技术
- Docker
category: Docker
draft: false
published: 2024-05-12 12:27:42
slug: docker-compose-yml-version-is-obsolete-解决办法
tags:
- Docker
- docker-compose
title: 'Docker docker-compose.yml: `version` is obsolete" 解决办法'
updated: 2024-09-18 11:16:06
---

这通常意味着使用的 `docker-compose` 版本不支持该文件中声明的版本号。

阅读官方文档：

<https://docs.docker.com/compose/compose-file>

<https://docs.docker.com/compose/compose-file/04-version-and-name>

有这么一句话：

**Version top-level element (obsolete)**

The top-level `version` property is defined by the Compose Specification for backward compatibility. It is only informative and you'll receive a warning message that it is obsolete if used.

Compose doesn't use `version` to select an exact schema to validate the Compose file, but prefers the most recent schema when it's implemented.

Compose validates whether it can fully parse the Compose file. If some fields are unknown, typically because the Compose file was written with fields defined by a newer version of the Specification, you'll receive a warning message.

**总结就是**

version 字段已经弃用了，Compose 能验证它是否可以完全解析 Compose 文件。

docker compose 能做到向下兼容，警告你不要写上版本号

## 解决办法

把 version 那行注释或者删掉

```
# version: '3.9'
```