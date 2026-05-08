---
categories:
- HTML
- 信息技术
cover: ''
date: '2021-01-26T20:46:36+08:00'
draft: false
slug: 解决动态ajax-pjax加载mathjax不生效问题
tags: []
title: 解决动态ajax/pjax加载mathjax不生效问题
updated: '2023-04-21T23:53:24+08:00'
wp_id: 249
---

在每次跳转的脚本后面添加执行脚本
如

```
window.pjaxLoaded = function(){
    //页面每次跳转都会执行这里的代码   //do something...
}
```

里面添加

```
$.getScript("//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML", function() {
    MathJax.Hub.Config({tex2jax: {inlineMath: [['
```

```
#039;,'
```

```
#039;], ['\\(','\\)']]}}); // entry-content是文章页的内容div的class var math = document.getElementsByClassName("entry-content")[0]; MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]); });
```

收工