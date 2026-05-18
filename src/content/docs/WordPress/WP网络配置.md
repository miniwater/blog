# WP网络配置

以下内容仅作参考，不同主题插件适用范围略有差异。

## Nginx

伪静态

```
location /
{
	try_files $uri $uri/ /index.php?$args;
}

rewrite /wp-admin$ $scheme://$host$uri/ permanent;
```

资源文件缓存

```
location ~ .*\.(js|css|png|jpg|jpeg|gif|ico|bmp|swf|eot|svg|ttf|woff|woff2|webp|avif|mp4|webm|json|MOV)$ {
    expires 30d; 
    access_log off; 
    log_not_found off; 
}
```

### 禁止访问敏感文件

拒绝访问所有以点开头的隐藏文件，如 `.git`、`.env`、`.htaccess`

（排除 `.well-known` 目录，它用于 `ACME/Let's Encrypt` 证书验证）

```
location ~ /\.(?!well-known) {
    deny all;
    return 403;
}
```

拒绝访问备份和SQL文件

```
location ~* \.(sql|bak|backup|zip|tar|gz)$ {
    deny all;
    return 403;
}
```

## CDN

WordPress规则。

不同主题缓存规则不一样，具体看主题实现方法，否则可能导致无法登陆。

| 文件后缀 | 等于 | gif png bmp jpeg tif tiff zip exe wmv swf mp3 wma rar css flv mp4 txt ico js avif webm json woff2 woff svg flac MOV ttf | 缓存 |
| --- | --- | --- | --- |
| HTTP 请求头 | Cookie | 存在 | 不缓存 |
| URL path | 等于 | /wp-admin/ /wp-json/* | 不缓存 |

验证缓存

x-site-cache-status：

HIT：你的文件已经命中缓存。这表示用户获取文件的方式途径为从CF缓存服务器中获取而非你的源服务器，不消耗你的服务器资源

MISS：已经在缓存服务器中查找了你所请求的文件，但是并没有找到，缓存服务器将会回源至你的服务器中获取该文件，当下次请求时该文件就会显示HIT

BYPASS：已经被要求不缓存该文件，用户将直接从网站源服务器中获取文件，这个通常是因为请求的文件响应了NO-Cache header

EXPIRED：自上次缓存之后，文件的缓存期限已经过期，将会再度回源至网站源服务器进行获取文件，当下次请求时该文件就会显示HIT

DYNAMIC：默认不缓存文件，也没有对应的缓存配置，用户将从网站源服务器获取该文件