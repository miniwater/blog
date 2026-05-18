# The SEO Framework

[WordPress.org 插件页面](https://cn.wordpress.org/plugins/autodescription/)

## SEO 隐身模式

用户界面中隐藏插件名称和注释

```php
add_filter( 'the_seo_framework_indicator', '__return_false' );
add_filter( 'the_seo_framework_title_fixed_indicator', '__return_false' );
add_filter( 'the_seo_framework_indicator_sitemap', '__return_false' );
```