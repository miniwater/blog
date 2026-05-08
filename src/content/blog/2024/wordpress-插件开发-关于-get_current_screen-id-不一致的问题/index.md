---
categories:
- PHP
- WordPress
- 信息技术
- 插件
cover: ''
date: '2024-05-02T15:08:16+08:00'
draft: false
slug: wordpress-插件开发-关于-get_current_screen-id-不一致的问题
tags:
- screen
- WordPress
- 插件
title: WordPress 插件开发 关于 get_current_screen()->id 不一致的问题
updated: '2024-05-02T15:09:44+08:00'
wp_id: 9269
---

今天遇到一个神奇的BUG，

wp\_add\_dashboard\_widget() 和 add\_meta\_box() 生成的元框相互对不上。

经排查发现 do\_meta\_boxes() 有这么一段

```
if ( empty( $screen ) ) {
	$screen = get_current_screen();
} elseif ( is_string( $screen ) ) {
	$screen = convert_to_screen( $screen );
}
```

会发现，经过了 convert\_to\_screen() 函数后输出的id不是一样的

```
echo get_current_screen()->id;
$screen = convert_to_screen( get_current_screen()->id );
echo '<br>'. $screen->id;
```

问题就在 add\_action('admin\_menu','') 里

主菜单的侧边栏名称用了中文，换回英文就好了

```
<?php
add_action('admin_menu', function () {
  $krjojo_tool_menu = add_menu_page(
    '手里有只毛毛虫工具箱',                            // 页面内标题
    'KRJtool',                                      // 侧边栏名称    <---- 就是这一行
    'manage_options',                               // 菜单所需的功能
    'krjojo_tool_setting_slug',                     // id (slug）
    'krjojo_tool_setting_html',                     // 页面的内容
    plugin_dir_url(__FILE__) . 'images/icon.svg',   // 图标
    20                                              // 菜单顺序中的位置
  );
});
```