---
categories:
- HTML
- js
- PHP
- WordPress
- 信息技术
cover: ''
date: '2024-03-22T00:43:25+08:00'
draft: false
slug: wordpress文章中自动转义
tags:
- '&amp;'
- '&amp;038;'
- HTML
- js
- WordPress
title: WordPress文章中自动转义"&"成"&038;"
updated: '2024-03-26T00:27:46+08:00'
wp_id: 1458
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