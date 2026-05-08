---
categories:
- HTML
- nginx
- 信息技术
cover: ''
date: '2025-02-04T00:25:01+08:00'
draft: false
slug: nginx反向代理重写url，绕过ublock-origin拦截规则
tags:
- matomo
- nginx
- uBlock Origin
- 反向代理
- 广告拦截
- 拦截规则
title: nginx反向代理重写url，绕过uBlock Origin拦截规则
updated: '2025-02-04T00:27:44+08:00'
wp_id: 10626
---

今儿发现matomo被uBlock Origin规则拦截了，受高人指点可以通过反向代理绕过规则，在此分享方法

在nginx配置文件添加

```
    location /ma.js {
        rewrite ^/ma\.js$ /matomo.js last;
    }
    location /mapi {
        rewrite ^/mapi$ /matomo.php last;
    }
```

第一行是请求 https://ma.krjojo.com/ma.js 时会返回 https://ma.krjojo.com/matomo.js 的内容

第二行是请求 https://ma.krjojo.com/mapi 时会返回 https://ma.krjojo.com/matomo.php 的内容

同时修改matomo给网站的追踪代码

原本

```
  (function() {
    var u="//ma.krjojo.com/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
```

把 `matomo.js` 替换 `ma.js` ，以及 `matomo.php` 替换 `mapi`

```
  (function() {
    var u="//ma.krjojo.com/";
    _paq.push(['setTrackerUrl', u+'mapi']);
    _paq.push(['setSiteId', '2']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'ma.js'; s.parentNode.insertBefore(g,s);
  })();
```