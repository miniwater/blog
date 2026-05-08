---
categories:
- 1Panel
- HTML
- HTTP/3
- HTTP2
- 信息技术
cover: ''
date: '2024-04-25T00:22:37+08:00'
draft: false
slug: openresty-对-http-3-的一次尝试
tags:
- 1Panel
- Docker
- http
- HTTP/3
- http2
- http3
- nginx
- openresty
title: OpenResty 对 HTTP/3 的一次尝试
updated: '2024-04-30T16:59:20+08:00'
wp_id: 9149
---

前段时间，也就是今年一月份左右，OpenResty 1.25.3.1 正式添加了对http/3的正式支持，那时候盼星星盼月亮等待着1Panel面板对 OpenResty 容器版本的更新。

直到四月，终于迎来了1Panel面板 OpenResty 容器的新版推送，但不是最新的 1.25 版本，而是去年的 1.21 版本。

没办法，自己动手，丰衣足食。

逛了一遍 1Panel 的论坛，发现这次 OpenResty 更新翻车的人挺多的，官方看到小版本更新都这么容易出问题，估计更不敢更新大版本了。

## 获取最新的 OpenResty 1.25.3.1 镜像

打开 Docker hub 查询最新版的 OpenResty 镜像

<https://hub.docker.com/r/openresty/openresty/tags>

好家伙，全是8天前更新，一次更新就是好几页镜像，只能挑个比较有代表性的版本了。

拉取镜像

```
docker pull openresty/openresty:1.25.3.1-focal
```

如果你跟我一样，下载卡半天，速度动不了，按 Ctrl+c 停止。

由于我的服务器是阿里云，进入[阿里云容器镜像服务](https://cr.console.aliyun.com/cn-guangzhou/instances/mirrors)，复制加速器地址，大概内容如下

```
https://密钥.mirror.aliyuncs.com
```

1Panel面板 - 容器 - 配置 - 基础配置 - 镜像加速 - 设置 - 粘贴上去保存

这时候会重启整个docker

继续回来下载镜像

完成后可以在 1Panel面板 - 容器 - 镜像 中看到

回到容器界面，编辑 OpenResty 容器，把镜像修改成最新下载的 openresty/openresty:1.25.3.1-focal 版本。

确认重建容器。

## 开启 HTTP/3

登入阿里云，放行udp 443 安全组。

修改站点配置文件：

在

```
listen 443 ssl http2 default_server;
```

下方添加一行

```
listen 443 quic reuseport default_server;
```

知其然知其所以然

其中

quic 是指 UDP 的传输协议

reuseport 参数，使其在多个工作线程中正常工作（建议只在根域名上配置，如果多个站点出现reuseport，会报错）

default\_server 默认站点，就算不正确的域名也返回该网站（1Panel面板可以设置）

继续在下方找到

```
add_header Strict-Transport-Security "max-age=31536000";
```

的后面加上

```
add_header Alt-Svc 'h3=":443"; ma=2592000';
```

* add\_header 添加自定义的HTTP头部
* Alt-Svc 'h3=":443"; ma=2592000'; 指示了同一名称的主机在UDP端口443提供HTTP/3服务。
  + Alt-Svc 全称为“Alternative-Service”,直译为“备选服务”
  + 如果初始连接使用的是HTTP/2（甚至HTTP/1），服务器可以响应并告诉客户端它可以再试试HTTP/3。
  + ma=2592000 为过期秒数，缓存30天，30天内重复打开浏览器都知道该网站已经支持h3

修改完成后重载openresty

HTTP/3 测试:

<https://http3check.net>

参看资料：

Nginx文档：<https://nginx.org/en/docs/quic.html>

## 小结

现在 Chrome Edge 浏览器对 HTTP/3 并不是最优先使用的协议，在首次打开网站时候浏览器仍然优先使用 HTTP/2 提升兼容确保用户体验，直至返回的header头告诉浏览器可升级 HTTP/3 协议。

就会导致首次打开时，前面加载最重要的页面、js、css使用了 HTTP/2 ，后面重要性低的图片反而是用 HTTP/3。

当然，后面重复打开了也就快了。

## 后续1

HTTP3还是太新了，容易遇到奇奇怪怪的小问题

```
Uncaught DOMException: Failed to execute 'replaceState' on 'History': A history state object with URL 'https://wp-admin/profile.php' cannot be created in a document with origin 'https://www.krjojo.com' and URL 'https://www.krjojo.com/wp-admin/profile.php'.
at https://www.krjojo.com/wp-admin/profile.php:79:19
Filters the admin canonical url value.
*
* @since 6.5.0
*
* @param string $filtered_url The admin canonical url value.
```

排查发现问题发生在 /wp-admin/includes/misc.php 1413

```
<?php
function wp_admin_canonical_url() {
	$removable_query_args = wp_removable_query_args();

	if ( empty( $removable_query_args ) ) {
		return;
	}

	// Ensure we're using an absolute URL.
	$current_url  = set_url_scheme( 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );
	$filtered_url = remove_query_arg( $removable_query_args, $current_url );

	/**
	 * Filters the admin canonical url value.
	 *
	 * @since 6.5.0
	 *
	 * @param string $filtered_url The admin canonical url value.
	 */
	$filtered_url = apply_filters( 'wp_admin_canonical_url', $filtered_url );
	?>
	<link id="wp-admin-canonical" rel="canonical" href="<?php echo esc_url( $filtered_url ); ?>" />
	<script>
		if ( window.history.replaceState ) {
			window.history.replaceState( null, null, document.getElementById( 'wp-admin-canonical' ).href + window.location.hash );
		}
	</script>
	<?php
}
```

核心问题就是 $\_SERVER['HTTP\_HOST'] 拿到的值是空的，啊？？？？

测试同一个页面使用

```
echo  '<pre>' . json_encode( $_SERVER, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . '</pre>';
```

打印并格式化

会发发现h2返回的数据会比h3返回的数据多一行，

而多出的一行就是 HTTP\_HOST

```
 "HTTP_HOST": "www.krjojo.com",
```

Excuse me，are you sure?

查询得知，在HTTP/2及之前的版本中，`host`头部是必需的，但在HTTP/3中，这个要求被`authority`字段所取代。这意味着在HTTP/3请求中，`host`头部可能不会被发送，而是使用`:authority`头部。

<https://github.com/php/php-src/issues/13021>

github nginx讨论区: <https://github.com/nginx-quic/nginx-quic/issues/3>

nginx社区正式答复： <https://trac.nginx.org/nginx/ticket/2468#no1>

总结，是php问题，wp使用不规范

### ~~解决办法~~

在nginx配置中手动添加host头部

```
fastcgi_param  HTTP_HOST  $host;
```

或者等wordpress什么时候正式支持http/3。。。。

## 后续2

新版1Panle面板的 OpenResty 的镜像是整合了自己的 WAF 防火墙来构建的，

用 openresty/openresty 来替换 1panel/openresty 会导致面板内部站点所设置的 WAF 防火墙失效。

首当其冲就是 Openresty 容器日志不停报错，找不到 WAF 文件。

看来深度整合进面板的东西还是少整花活。