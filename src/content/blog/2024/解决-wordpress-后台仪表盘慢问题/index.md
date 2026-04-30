---
categories:
- 信息技术
- PHP
- WordPress
category: WordPress
draft: false
published: 2024-12-19 17:57:58
slug: 解决-wordpress-后台仪表盘慢问题
tags:
- WordPress
- 优化
- 后台
- 仪表盘
title: 解决 WordPress 后台仪表盘慢问题
updated: 2024-12-19 17:58:00
---

WordPress，进入后台，会在一定时间内，调用两个函数。这两个函数，都会访问WordPress服务器，而国内大部分都访问不通，所以会导致5秒超时，两个函数，至少造成10秒卡顿。

而且就算通，也会造成http阻塞。

两个函数，无法通过插件解决。所以，必须手动修改文件。

最好每次更新Wordpress版本后，都重新检查一遍。

## wp\_check\_php\_version

判断用户是否需要更新PHP版本。

这个函数没钩子，不管怎么都会访问。

代码位置：wp-admin/includes/misc.php

直接添加代码：return true;

```
function wp_check_php_version() {
	return true;
	$version = PHP_VERSION;
	$key     = md5( $version );

	$response = get_site_transient( 'php_check_' . $key );
// 省略
}
```

## wp\_check\_browser\_version

判断用户是否需要更新浏览器

这个函数没钩子，不管怎么都会访问。

代码位置：wp-admin/includes/dashboard.php

直接添加代码：return false;

```
function wp_check_browser_version() {
	return false;
	if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
		return false;
	}

	$key = md5( $_SERVER['HTTP_USER_AGENT'] );

	$response = get_site_transient( 'browser_' . $key );
// 省略
}
```