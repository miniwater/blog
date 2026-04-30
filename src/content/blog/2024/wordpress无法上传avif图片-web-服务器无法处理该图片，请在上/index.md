---
categories:
- 信息技术
- PHP
- WordPress
- 图片格式
category: 图片格式
draft: false
published: 2024-04-28 19:07:10
slug: wordpress无法上传avif图片-web-服务器无法处理该图片，请在上
tags:
- WordPress
- PHP
- AVIF
- gd
- 图片
title: WordPress无法上传avif图片 Web 服务器无法处理该图片，请在上传前将其转换为 JPEG 或 PNG 格式。
updated: 2024-04-30 16:26:46
---

今天突然遇到一个问题，媒体库无法上传avif格式图片。

```
Web 服务器无法处理该图片，请在上传前将其转换为 JPEG 或 PNG 格式。
```

但是如果切换至浏览器上传工具或者在文章页里却可以上传成功。

我寻思不可能呀，WordPress 6.5 已经支持 AVIF 图片格式，我的版本正是最新的 6.5.2。

难道因为之前更新了1Panel面板导致的？

## 排查思路

### 网络检查

先从页面开始，在 上传新媒体文件 页面上传avif格式图片发现并为发生任何网络请求，却直接提示失败：

```
Web 服务器无法处理该图片，请在上传前将其转换为 JPEG 或 PNG 格式。
```

怀疑，页面js做了校验，非 WAF防火墙 问题。

尝试验证，上传 exe 文件测试，收到：

```
从服务器收到预料之外的响应。此文件可能已被成功上传。请检查媒体库或刷新本页。
```

网络请求报 403，上传的 exe文件 被防火墙拦截。

确认为本地页面问题

### 页面检查

页面内尝试搜索 avif ，发现这样一串js代码

```
<script type="text/javascript">
	var resize_height = 1024, resize_width = 1024,
	wpUploaderInit = {"browse_button":"plupload-browse-button","container":"plupload-upload-ui","drop_element":"drag-drop-area","file_data_name":"async-upload","url":"https:\/\/www.krjojo.com\/wp-admin\/async-upload.php","filters":{"max_file_size":"52428800b"},"multipart_params":{"post_id":0,"_wpnonce":"9eacda1f04","type":"","tab":"","short":"1"},"avif_upload_error":true,"heic_upload_error":true};
</script>
```

其中发现 `"avif_upload_error":true,` 不太寻常

难道是 WordPress 代码自己写死不允许上传 avif图片

不会是插件搞得鬼吧

### 代码检查

尝试在 WordPress 全局文件中搜索 `avif_upload_error` 代码

发现在 /wp-admin/includes/media.php 文件下有一串关于avif格式的检查

```
// Check if AVIF images can be edited.
if ( ! wp_image_editor_supports( array( 'mime_type' => 'image/avif' ) ) ) {
	$plupload_init['avif_upload_error'] = true;
}
```

每次上传前，wordpress 都会对服务器所支持编辑的图片格式进行检查

这段检查就是在 `_wp_image_editor_choose()` 函数中

不知道为什么avif没通过检查，而webp通过了，返回的是 WP\_Image\_Editor\_GD

最后，在 WP\_Image\_Editor\_GD class文件找到这么一串

```
/**
 * Checks to see if editor supports the mime-type specified.
 *
 * @since 3.5.0
 *
 * @param string $mime_type
 * @return bool
 */
public static function supports_mime_type( $mime_type ) {
	$image_types = imagetypes();
	switch ( $mime_type ) {
		case 'image/jpeg':
			return ( $image_types & IMG_JPG ) != 0;
		case 'image/png':
			return ( $image_types & IMG_PNG ) != 0;
		case 'image/gif':
			return ( $image_types & IMG_GIF ) != 0;
		case 'image/webp':
			return ( $image_types & IMG_WEBP ) != 0;
		case 'image/avif':
			return ( $image_types & IMG_AVIF ) != 0;
	}
	return false;
}
```

尝试打印 imagetypes()

返回

```
echo IMG_AVIF;
// 256
echo imagetypes();
// 239
```

这个函数以比特字段方式返回与当前 PHP 版本关联的 GD 库所支持的图像格式。

看来就是GD库不支持 avif 。

1Panel 进入php8.2.15容器终端，执行以下命令

```
php -i | grep AVIF
```

返回为空，1Panel 的GD库并没用使用avif支持进行编译。

此外，还有两个新函数，imagecreatefromavif 和 imageavif，它们只有在 GD 扩展使用 AVIF 支持编译时可用。

```
if (function_exists('imageavif')) {
    // AVIF support available.
}
```

## 解决办法

重新构建PHP GD扩展

可以参考这篇文章：[1Panel面板修改PHP构建扩展，GD扩展增加avif支持](https://www.krjojo.com/2024/04/29/1panel%e9%9d%a2%e6%9d%bf%e4%bf%ae%e6%94%b9php%e6%9e%84%e5%bb%ba%e6%89%a9%e5%b1%95%ef%bc%8cgd%e6%89%a9%e5%b1%95%e5%a2%9e%e5%8a%a0avif%e6%94%af%e6%8c%81/)

### 临时解决办法

加入以下代码，取消 avif 格式环境检查

```
add_filter('plupload_init', function($plupload_init) {
	$plupload_init['avif_upload_error'] = false;
	return $plupload_init;
}, 10, 1);

add_filter('plupload_default_settings', function($defaults) {
	$defaults['avif_upload_error'] = false;
	return $defaults;
}, 10, 1);
```

缺点

站内图片的编辑模式失效