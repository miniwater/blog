---
categories:
- 信息技术
- HTML
- css
category: css
draft: false
published: 2024-01-30 22:29:06
slug: 冷门的css属性：initial
tags:
- HTML
- CSS
title: 冷门的css属性：initial
updated: 2024-01-30 22:29:06
---

分享一个比较强硬的属性, 可以把几乎所有css属性进行重置。前端在 `ctrl + c` 时就不用这么痛苦检查样式了，虽然没办法像 `<iframe src="..."></iframe>` 那样彻底隔离 `css` 和 `js` 。

一键隔离所有父级css属性：

```
all: initial;
```

还可以单独还原css属性默认值：

```
color: initial;
background-color: initial;
box-shadow: initial;
```

属性值

| 值 | 描述 |
| --- | --- |
| initial | 修改所有元素属性的值为其初始化值 |
| inherit | 修改所有元素属性的值为其父元素的值 |
| unset | 修改所有元素属性或父元素的值为其父元素的值(如果有继承)或其初始值 |