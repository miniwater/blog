# WP Statistics

[WordPress.org 插件页面](https://cn.wordpress.org/plugins/wp-statistics/)

## ip地址下载代理

用于解决国内服务器无法正常下载地理位置数据库

**MaxMind**：[https://www.maxmind.com/en/geoip-databases](https://www.maxmind.com/en/geoip-databases) （需要注册登录）

**DB-IP**：[https://db-ip.com/db](https://db-ip.com/db) （推荐）

手动把地理数据库下载到自己的服务器，添加代码实现代理下载

```php
function custom_geoip_download_url($defaultUrl) {
    $customUrl = 'https://www.krjojo.com/assets/dbip-city-lite-2025-11.mmdb.gz';
    return $customUrl;
}
add_filter('wp_statistics_geolocation_download_url', 'custom_geoip_download_url');
```