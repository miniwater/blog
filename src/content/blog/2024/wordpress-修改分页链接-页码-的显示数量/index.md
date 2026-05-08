---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: '2024-05-10T17:37:14+08:00'
draft: false
slug: wordpress-修改分页链接-页码-的显示数量
tags:
- WordPress
- 分页
title: WordPress 修改分页链接 页码 的显示数量
updated: '2024-09-18T11:17:50+08:00'
wp_id: 9441
---

最近发现页码只向后显示一页，从2开始就省略了

像这样

1 2 ..... 9

太少了，于是动手修改

代码添加

```
<?php
add_filter('the_posts_pagination_args', function ($args) {
    $args['mid_size'] = 2;
    return ($args);
});
```

默认为1，当前页面两侧的1个数字。

修改为2，多加一个数字

当然

$args数组里面还有其他更多的参数，需要参考 paginate\_links() 里面的默认值

<https://developer.wordpress.org/reference/functions/paginate_links>