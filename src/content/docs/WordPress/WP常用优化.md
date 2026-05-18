# WP常用优化

收录常用优化功能，只做减法。

> 以下方法并非适合全部加上，相反，默认才是最适合大多数人。

因 WP 持续更新，以下方法不保证全部有效，可前往 [官网文档](https://developer.wordpress.org/) 核对

## 禁用 XML-RPC 接口

```php
add_filter('xmlrpc_enabled', '__return_false');
add_filter('xmlrpc_methods', '__return_empty_array');
remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');
```

## 禁用 emoji

```php
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
add_filter('emoji_svg_url', '__return_false');
add_filter('tiny_mce_plugins', function ($plugins) {
    if (is_array($plugins)) {
        return array_diff($plugins, array('wpemoji')); // 移除 WordPress 自带的 emoji 插件
    } else {
        return array();
    }
});
```

## 移除 WordPress 的版本号信息

```php
remove_action('wp_head', 'wp_generator');
```

## 禁用 wptexturize 功能

```php
add_filter('run_wptexturize', '__return_false');
```

## 移除后台底部的 感谢使用 WordPress 进行创作

```php
add_filter('admin_footer_text', '__return_empty_string', PHP_INT_MAX);
```

## 禁用后台更新

```php
add_filter('automatic_updater_disabled', '__return_true');

```

## 移除 WordPress 标志

```php
add_action('admin_bar_menu', function ($bar) {    $bar->remove_node('wp-logo');
}, PHP_INT_MAX);
```

## 禁用WordPress的jQuery

需要注意是否存在依赖jQuery的主题和插件

```php
add_action('wp_enqueue_scripts', function () {    wp_deregister_script('jquery');
    wp_deregister_script('jquery-core');
    wp_deregister_script('jquery-migrate');
});
```

## 阻止文章内相互 pingback

```php
add_action('pre_ping', function (&$links) {
    $home = get_option('home');
    foreach ($links as $l => $link) {
        if (0 === strpos($link, $home)) {
            unset($links[$l]);
        }
    }
});
```

## 禁用autoembed

```php
remove_filter('the_content', [$GLOBALS['wp_embed'], 'autoembed'], 8);
remove_filter('widget_text_content', [$GLOBALS['wp_embed'], 'autoembed'], 8);
remove_filter('widget_block_content', [$GLOBALS['wp_embed'], 'autoembed'], 8);
remove_action('edit_form_advanced', [$GLOBALS['wp_embed'], 'maybe_run_ajax_cache']);
remove_action('edit_page_form', [$GLOBALS['wp_embed'], 'maybe_run_ajax_cache']);
```

## 禁用自动保存草稿功能

```php
add_action('wp_print_scripts', function () {    wp_deregister_script('autosave');
});
```

## 禁用Open Sans

```php
function remove_open_sans()
{
	wp_deregister_style('open-sans');
	wp_register_style('open-sans', false);
	wp_enqueue_style('open-sans', '');
}
add_action('init', 'remove_open_sans');
```

## 禁用 auto-embeds

```php
remove_filter( 'the_content', array( $GLOBALS['wp_embed'], 'autoembed' ), 8 );

```

## 移除原生 gallery style

```php
add_filter('use_default_gallery_style', '__return_false');
```

## 彻底移除管理员工具条

不建议使用，可以在 WP后台 - 用户 - 个人资料 - 工具栏 中进行禁用。

```php
add_filter('show_admin_bar','__return_false');
```

## 禁止头部加载s.w.org

```php
function remove_dns_prefetch($hints, $relation_type)
{
	if ('dns-prefetch' === $relation_type) {
		return array_diff(wp_dependencies_unique_hosts(), $hints);
	}
	return $hints;
}
add_filter('wp_resource_hints', 'remove_dns_prefetch', 10, 2);
```

## 禁用l10n.js

```php
wp_deregister_script('l10n');
```

## 禁用REST API、移除wp-json链接

```php
add_filter('rest_enabled', '_return_false');
add_filter('rest_jsonp_enabled', '_return_false');
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
```

## 禁止代码标点符合转义

```php
remove_filter('the_content', 'wptexturize');
```

## 移除wordpress留言中自动链接功能

```php
remove_filter('comment_text', 'make_clickable', 9);
```

## 去除本页唯一链接信息

```php
remove_action('wp_head', 'index_rel_link');
```

## 移除 RSD 链接

```php
remove_action('wp_head', 'rsd_link');
```

## 移除离线编辑器开放接口

```php
remove_action('wp_head', 'wlwmanifest_link');
```

## 禁用 wp-embed.min.js

```php
function my_deregister_scripts(){
    wp_dequeue_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );
```

## 禁用古滕堡编辑器

```php
add_filter('use_block_editor_for_post', '__return_false', 10);
add_filter('use_widgets_block_editor', '__return_false', 10);
remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );
```

## 移除头部 Gutenberg global-styles-inline-css

```php
add_action( 'wp_print_styles', function(){
  wp_deregister_style('global-styles');
});
```

## 移除经典主题样式 classic-theme-styles-inline-css

```php
add_action( 'wp_enqueue_scripts', function() {
	wp_dequeue_style( 'classic-theme-styles' );
}, 20 );
```

## 禁止自动触发 WP Cron 定时任务

> 需要写在根目录中 `wp-config.php` 下。

一般搭配系统任务计划程序使用，系统自动任务定时请求 `/wp-cron.php`

```php
define( 'DISABLE_WP_CRON', true );
```

## 禁用修订版本

需要写在根目录中 `wp-config.php` 下。

```php
define('WP_POST_REVISIONS', false);
```