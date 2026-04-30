---
categories:
- 信息技术
- PHP
- WordPress
category: WordPress
draft: false
published: 2024-02-27 22:45:30
slug: wordpress开发-禁止上传文件的图片生成缩略图
tags:
- 学习
- WordPress
- PHP
- 缩略图
- thumbnail
title: Wordpress禁止上传文件的图片生成缩略图
updated: 2024-03-12 23:47:52
---

WordPress上传图片和管理图片非常方便，但是有一个问题非常麻烦，那就是每次WordPress上传图片之后会自动生成几个不同尺寸的缩略图，虽然WordPress网站这个功能非常方便，可以自动将图片修改成为我们需要的尺寸，但是大多数大家上传图片之前已经将图片尺寸修改好了，不需要再修改尺寸。而且WordPress每个图片都自动生成几个不同尺寸的缩略图，会造成网站空间的浪费。这些多余的图片占了整个图片数量的一多半。尤其是对于数据量图片量比较大的站点来说比较明显，所以，多余无用的东西就没必要存在，那么怎么取消这种自动生成多种尺寸缩略图呢？

网上有一个可以关闭这个自动生成略缩图的方法：

~~在后台“设置”“多媒体”那里将“缩略图大小”“中等大小”“大尺寸”等参数全部设为0，取消“总是裁剪缩略图到这个尺寸（一般情况下，缩略图应保持原始比例）”~~

你会发现毫无效果，上传图片后在 `wp-content/uploads/` 目录下依然有一大坨缩略图图片，甚至有的缩略图图片在后台删除图片后，不会自行删掉。

其实wordpress官方提供了 `intermediate_image_sizes_advanced` 函数，可以筛选上传图像时自动生成的图像大小，只要我们在筛选过程中全清掉就行了。

这个函数会传入一个关联数组 `$new_sizes`，内容为：

```
[
    "medium_large": {
        "width": 768,
        "height": 0,
        "crop": false
    },
    "1536x1536": {
        "width": 1536,
        "height": 1536,
        "crop": false
    },
    "2048x2048": {
        "width": 2048,
        "height": 2048,
        "crop": false
    },
    "awb_sm": {
        "width": 500,
        "height": 0,
        "crop": false
    },
    "awb_md": {
        "width": 800,
        "height": 0,
        "crop": false
    },
    "awb_lg": {
        "width": 1280,
        "height": 0,
        "crop": false
    },
    "awb_xl": {
        "width": 1920,
        "height": 0,
        "crop": false
    }
]
```

我们只需要修改这个数组就能修改后面生成的缩略图。

我不想要缩略图怎么办？

答案就是清空这个数组。

function.php 最后添加以下代码：

```
add_action('intermediate_image_sizes_advanced', function ($new_sizes) {
  return [];
});
```

甚至都不需要传入参数了，可以更简洁：

```
add_action('intermediate_image_sizes_advanced', function () {
  return [];
});
```

以为这就完了吗，更进一步还可以用WP内置函数 `__return_empty_array()`直接为过滤器返回空数组。

```
add_action('intermediate_image_sizes_advanced', '__return_empty_array');
```