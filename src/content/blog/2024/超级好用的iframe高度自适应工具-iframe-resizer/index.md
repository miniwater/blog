---
categories:
- 信息技术
- HTML
category: HTML
draft: false
published: 2024-11-08 19:43:28
slug: 超级好用的iframe高度自适应工具-iframe-resizer
tags:
- js
- iframe
- Github
title: 超级好用的iframe高度自适应工具 iframe-resizer
updated: 2024-11-09 11:34:31
---

iframe-resizer 库旨在消除使用 iframe 的痛点。它将调整您的 iframe 大小以匹配您的内容大小，然后监控 iframe 以确保它始终是完美的大小。

<https://github.com/davidjbradshaw/iframe-resizer>

## 父页面

```
<style>
    #tests {
        width: 100%;
        height: 100vh;
    }
</style>
<iframe id="tests" src="https://www.example.com/"></iframe>
<script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.3.2"></script>
<script type='text/javascript'>
    iframeResize({ license: 'GPLv3', waitForLoad: true }, '#tests'); 
</script>
```

如果页面存在多个 iframe，并且全部需要自动适应高度

可以使用 iframe 标签全选中，放到最后一个ifame后面执行

```
<script type='text/javascript'>iframeResize({ license: 'GPLv3' },'iframe'); </script>
```

## 子页面

子页面的js用于和父页面通讯，对于一些简单的小组件，可以不需要这个

```
<script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/child@5.3.2"></script>
```