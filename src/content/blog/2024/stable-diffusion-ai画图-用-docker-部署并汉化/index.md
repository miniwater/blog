---
categories:
- 信息技术
- AI
- Docker
category: Docker
draft: false
published: 2024-05-12 16:35:54
slug: stable-diffusion-ai画图-用-docker-部署并汉化
tags:
- AI
- Docker
- Stable Diffusion
title: Stable Diffusion AI画图 用 Docker 部署并汉化
updated: 2024-09-18 11:15:31
---

> <https://github.com/AbdBarho/stable-diffusion-webui-docker/wiki/Setup>
>
>
>
> <https://github.com/dtlnor/stable-diffusion-webui-localization-zh_CN>
>
> 详细参考资料

![ai画图](./SD.avif)

图片与模型链接：<https://civitai.com/images/11778183>

## 小白看这里

确保已经安装最新版 Docker

### 选一个存放目录

最好要大于20G

Windows 在文件夹中右键 - 在终端中打开

### 克隆整合包仓库

（整合包依赖里面的配置文件，不能只下载[docker-compose.yml](https://github.com/AbdBarho/stable-diffusion-webui-docker/blob/master/docker-compose.yml)）

```
git clone https://github.com/AbdBarho/stable-diffusion-webui-docker.git
```

### 进入克隆后的文件夹

```
cd stable-diffusion-webui-docker
```

### 下载必需的模型和文件

需要确保网络正常，最好通过全局代理

在这期间，如果遇到任何问题，请优先怀疑你的网络

```
docker compose --profile download up --build
```

### 运行 UI

虽然是运行ui，但脚本里依然有大量内容需要下载

需要确保网络正常，最好通过全局代理

第一次启动大约 15 分钟时间

```
docker compose --profile auto up --build
```

### 打开界面

本地打开： <http://localhost:7860/>

### 汉化

选择 Extensions - Available 选项

最后点击 Load from: 按钮

![](./SDcn.avif)

这时候，重点来了

Load from: 黄色按钮的下面标签中

如果 localization 打了勾，**把勾取消**

localization **不能**打勾

保持上面的图一样

在搜索框中搜索 `zh`

找到 [zh\_CN Localization](https://github.com/dtlnor/stable-diffusion-webui-localization-zh_CN) ，点击右侧 **Install** 安装

（选它，是因为它的星星最多，用的人最多）

![](./SDcn2.avif)

安装完成后

点击 Installed 标签，勾选刚刚安装的插件，Apply and quit 应用并退出

![](./SDcn3.avif)

点完黄色按钮，这时候容器已经退出了，需要再次启动容器

执行以下命令

```
docker compose --profile auto up
```

在 Settings 选项卡中，找到 User interface 子选项

然后去页面最顶部，找到 `Localization` 小项，找到在下拉选单中选中 `zh_CN`

然后先点击橙色按钮 Apply settings 保存设置，

再点击 Reload UI 重启界面

![](./SDcn4.avif)

## 第三方模型市场

<https://civitai.com>