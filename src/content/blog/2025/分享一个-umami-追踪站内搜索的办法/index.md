---
categories:
- 信息技术
- HTML
- js
category: js
draft: false
published: 2025-11-16 21:32:59
slug: 分享一个-umami-追踪站内搜索的办法
tags:
- Umami
- 统计
- Analytics
- 分析
- 站内搜索
title: 分享一个 Umami 追踪站内搜索的办法
updated: 2025-11-17 09:03:07
---

想起以前用 [Matomo](https://matomo.org/) 的时候是自带站内搜索追踪的，后来换了Umami 后这功能被遗忘了。

如今突然想起，结果发现 Umami 默认是没有站内追踪的。

## 试错

另辟蹊径发现 Wordpress 有追踪站内搜索的[插件](https://cn.wordpress.org/plugins/search-analytics/)，试用了一下发现并不理想。

由于插件是在服务端记录搜索，导致会把很多广告爬虫的搜索也记录进去，短短一天不到一千多条记录，各种语言的广告都有......

![](./search.avif)

这都是些什么玩意

## 解决办法

最后研究了一下 Umami 的 [Tracker functions](https://umami.is/docs/tracker-functions) 跟踪器功能，发现可以手动实现

在**搜索页面**添加 JavaScript，以 wp 为例：

```
<?php

add_action('wp_footer', function () {
    if (is_search()) {
        echo "<script>
    document.addEventListener('DOMContentLoaded', () => {
        if (umami) {
            umami.track('search', {
                keyword: '" . get_search_query() . "'
            });
        }
    });
</script>";
    }
});
```

如果是静态网站，独立搜索页可以直接用js获取url后搜索参数

以 <https://blog.krjojo.com/search?q=hugo> 为例，它的搜索参数是 `s` ：

```
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const search = new URL(window.location.href).searchParams.get('s');
        if (umami && search) {
            // 触发一个名为 'search' 的事件，并将关键词作为数据发送
            umami.track('search', {
                keyword: search
            });
        }
    });
</script>
```

登录 Umami 后台查看搜索统计

![](./umami.avif)

这下舒服了。

甚至可以把搜索到的结果数量也统计起来，不过没办法在图表里查看

![](./搜索结果数量.avif)

不过没什么用，毕竟有没有内容自己最清楚