---
categories:
- 信息技术
- PHP
- 图片格式
- 1Panel
- Docker
category: Docker
draft: false
published: 2024-04-29 11:15:50
slug: 1panel面板修改php构建扩展，gd扩展增加avif支持
tags:
- 1Panel
- Docker
- AVIF
- gd
title: 1Panel面板修改PHP构建扩展，GD扩展增加avif支持
updated: 2024-05-02 00:41:09
---

通过微调 1Panel面板PHP构建文件，可以为扩展编译增加更多的支持。

省去自己构建麻烦

## 修改

1Panel的PHP构建目录在 `/opt/1panel/runtime/php/` 目录下。

以我的 1Panel社区版：v1.10.5-lts PHP：8.2.15 举例。

进入以下目录：

```
cd /opt/1panel/runtime/php/PHP82_15/php/extensions
```

修改目录下的的 `install.sh` 文件。

搜索 `Install gd` ，找到判断GD扩展那一行。

我的在228行

```
if [[ -z "${EXTENSIONS##*,gd,*}" ]]; then
    echo "---------- Install gd ----------"
    isPhpVersionGreaterOrEqual 8 0

    if [[ "$?" = "1" ]]; then
        # "--with-xxx-dir" was removed from php 7.4,
        # issue: https://github.com/docker-library/php/issues/912
        options="--with-freetype --with-jpeg --with-webp"
    else
        options="--with-gd --with-freetype-dir=/usr/include/ --with-png-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-webp-dir=/usr/include/"
    fi

    apk add --no-cache \
        freetype \
        freetype-dev \
        libpng \
        libpng-dev \
        libjpeg-turbo \
        libjpeg-turbo-dev \
	libwebp-dev \
    && docker-php-ext-configure gd ${options} \
    && docker-php-ext-install ${MC} gd \
    && apk del \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev
fi
```

修改最上面的 options。

增加 `--with-avif` ，使用AVIF支持进行编译

```
// old
options="--with-freetype --with-jpeg --with-webp"

// new
options="--with-freetype --with-jpeg --with-webp --with-avif"
```

修改 apk add --no-cache 内部一行

在 freetype 和 libwebp-dev 中间添加 `libavif-dev`。

GD 扩展依赖于 libavif 软件包，以提供底层 AVIF 解码。

```
    apk add --no-cache \
        freetype \
        freetype-dev \
        libpng \
        libpng-dev \
        libavif-dev \
        libjpeg-turbo \
        libjpeg-turbo-dev \
	libwebp-dev \
    && docker-php-ext-configure gd ${options} \
    && docker-php-ext-install ${MC} gd \
    && apk del \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev
```

在 1Panel面板 运行环境 重建PHP应用

### 备选方案

理论上修改了构建命令，docker的缓存会失效，如果依然秒编译完成可以尝试手动清理全部缓存

<https://docs.docker.com/reference/cli/docker/builder/prune/>

```
docker builder prune -a
y
```

如果依然不行可能新版构建目录换了地方

## 验证

完成后可以在 phpinfo(); 查看GD扩展多出了 AVIF 支持

```
AVIF Support	enabled
```