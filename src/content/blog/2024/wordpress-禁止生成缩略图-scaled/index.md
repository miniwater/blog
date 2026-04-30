---
categories:
- 信息技术
- WordPress
category: WordPress
draft: false
published: 2024-07-28 12:34:51
slug: wordpress-禁止生成缩略图-scaled
tags:
- WordPress
- 缩略图
- scaled
title: WordPress 禁止生成缩略图 scaled
updated: 2024-09-18 11:05:03
---

如果我们通过 WordPress 后台-设置-媒体中设置图片大小都为 0

那么 WordPress 5.3 版本及以上就会只裁切 1536、2048、scaled 这三个默认尺寸

并且 768、1536、2048 这三个尺寸正常情况几乎不会被用到

服务器空间宝贵

加入一下代码

```
// 禁用 上传生成缩略图
add_action('intermediate_image_sizes_advanced', '__return_empty_array');
// 移除图片裁切
add_filter('intermediate_image_sizes_advanced', '__return_false' );
// 移除 scaled 裁切
add_filter('big_image_size_threshold', '__return_false' );
```