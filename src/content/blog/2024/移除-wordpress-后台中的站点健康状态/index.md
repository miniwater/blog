---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: '2024-05-09T23:29:00+08:00'
draft: false
slug: 移除-wordpress-后台中的站点健康状态
tags:
- WordPress
- 后台
- 站点健康状态
title: 移除 Wordpress 后台中的“站点健康状态”
updated: '2024-05-09T23:29:00+08:00'
wp_id: 9382
---

wordpress5.0+的后台中多了一个“站点健康状态”模块，基本用不上，比较碍眼，可以使用以下方法把它去除。

先去除左侧“工具”-->“站点健康”这个菜单，在主题的function.php加入如下代码：

```
//移除侧边菜单中的站点健康
function remove_site_health_menu(){
  remove_submenu_page( 'tools.php','site-health.php' );
}
add_action( 'admin_menu', 'remove_site_health_menu' );
```

再移除仪表盘中的“站点健康状态”

```
//移除仪表盘中的站点健康模块，也是在主题的function.php加入如下代码：
function remove_dashboard_siteHealth() {
  remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );
}
add_action('wp_dashboard_setup', 'remove_dashboard_siteHealth' );
```

仪表盘中的“站点健康状态”也可以使用如下代码一并与其它模块一并移除：

```
//移除仪表盘中的相关组件
function example_remove_dashboard_widgets() {
  // Globalize the metaboxes array, this holds all the widgets for wp-admin
  global $wp_meta_boxes;
  // 以下这一行代码将删除 "快速草稿" 模块
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
  // 以下这一行代码将删除 "WordPress活动及新闻" 模块
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
  // 以下这一行代码将删除 "概况" 模块
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
  // 以下这一行代码将删除 "动态" 模块
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
  // 以下这一行代码将删除 "站点健康状态" 模块
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']);
}
add_action('wp_dashboard_setup', 'example_remove_dashboard_widgets' );
```