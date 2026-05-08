---
categories:
- 游戏
cover: ./文明6.avif
date: 2025-07-18T09:42:45+08:00
draft: false
slug: 文明6-关闭扫盘方法
tags:
- EPIC
- 扫盘
- 文明6
title: 文明6 关闭扫盘方法
updated: 2025-07-18T09:42:46+08:00
wp_id: 12024
---

![](./文明6.avif)

今天EPIC放出《席德·梅尔的文明VI 白金版》免费领取，至 2025/7/24 23:00

<https://store.epicgames.com/zh-CN/p/sid-meiers-civilization-vi--platinum-edition>

需要说明的的身为文明系列厂家 take two，新更新的用户条例明确允许他们可以通过扫盘拿走你电脑里所有的隐私（包括账户密码、聊天记录之类）

还要求所有居住在美国及除澳大利亚、瑞士、英国或欧洲经济区所属地区以外的地区的用户，均须接受强制仲裁条款，并放弃集体诉讼和陪审团审判的权利。

## 关闭扫盘

进入安装位置，依次打开

1. Base
2. Binaries
3. Win64EOS

找到 CivilizationVI\_DX12.exe，复制这个文件的完整路径，到EPIC游戏启动选项里，并在后面添加 空格`%command%`

例如：

```
F:\GAME\SidMeiersCivilizationVI\Base\Binaries\Win64EOS\CivilizationVI_DX12.exe %command%
```

此时启动游戏就能在纯净模式运行了

并且不影响多人模式