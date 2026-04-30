---
categories:
- 信息技术
- HTML
- PHP
- WordPress
- js
category: js
draft: false
published: 2024-03-22 00:43:25
slug: wordpress文章中自动转义
tags:
- WordPress
- HTML
- js
- '&amp;038;'
- '&amp;'
title: WordPress文章中自动转义"&"成"&038;"
updated: 2024-03-26 00:27:46
---

今天发现在文章内用自定义html写js时，`&`号会被自动转义成 `&038;` 。

html元素转义不要紧，但是js转义就直接报错了。

网上说在 `function` 里加各种代码都不行。

分享一个官方的解决方法：

<https://codex.wordpress.org/Using_Javascript>

在自定义html内写入：

```
<script type="text/javascript">
<!--

//--></script>
```

这时候就算换行，wordpress也不会给你加入<p>标签。

示例：

```
<script type="text/javascript">
<!--
console.log("这里随便打&&");

console.log("就算换行也不会给你加入<p>标签");
//--></script>
```

包括css也适用

```
<style>
<!--

//--></style>
```

快去试试看吧