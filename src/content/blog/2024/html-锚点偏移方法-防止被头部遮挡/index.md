---
categories:
- 信息技术
- HTML
- css
category: css
draft: false
published: 2024-10-12 20:10:51
slug: html-锚点偏移方法-防止被头部遮挡
tags:
- HTML
- CSS
- HTML5
- 菜单
- 锚点
title: HTML 锚点偏移方法 防止被头部遮挡
updated: 2025-01-10 18:43:15
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