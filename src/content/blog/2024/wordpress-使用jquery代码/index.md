---
categories:
- 信息技术
- HTML
- WordPress
- js
category: js
draft: false
published: 2024-05-08 12:36:01
slug: wordpress-使用jquery代码
tags:
- WordPress
- JavaScript
- jQuery
title: WordPress 使用jQuery代码
updated: 2024-05-08 12:36:01
---

由于WordPress中默认使用了 `jQuery.noConflict()` 方法避免与其他JavaScript库冲突

## 办法一

用jQuery 代替$

## 办法二

所以在使用$前需要将jQuery作为参数传递给函数。

```
var $ = jQuery;
```

## 办法三

```
(function(){
    // 在这里可以使用符号，而不用写全名的jQuery
})(jQuery);
```