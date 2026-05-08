---
categories:
- css
- HTML
- 信息技术
cover: ''
date: 2024-10-12T20:10:51+08:00
draft: false
slug: html-锚点偏移方法-防止被头部遮挡
tags:
- CSS
- HTML
- HTML5
- 菜单
- 锚点
title: HTML 锚点偏移方法 防止被头部遮挡
updated: 2025-01-10T18:43:15+08:00
wp_id: 10037
---

由于顶部菜单存在 `position:fixed` ，而引起的的锚点位置偏移。

在css中，给锚点添加偏移量，直接就可以了

```
html {
    scroll-padding-top: 200px;
    scroll-behavior: smooth;
}
```

就是这么简单的办法，我不知道为什么百度搜不出来

其他不是用正负边距进行抵消，就是用js写滚动。

网络上的反面教材：

```
.content {
    margin-top: -80px;
    padding-top: 100px;
    display: block;
}
```