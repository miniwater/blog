---
categories:
- HTML
- nginx
- 信息技术
cover: ''
date: 2024-04-02T17:40:46+08:00
draft: false
slug: 为nginx站点添加防盗链
tags:
- HTML
- http
- nginx
- referer
- 网络安全
- 防盗链
title: 为Nginx站点添加防盗链
updated: 2024-04-02T18:53:37+08:00
wp_id: 8547
---

如果你发现网站没什么人访问但是服务器流量却哗哗的走，有一种可能是你的静态资源被盗用了，别人网站展示的图片，却从你的服务器上加载。

## 作用

主要防止其他网站直接引用自己网站的资源

## 原理

正常用户，正常浏览器，浏览A网站加载图片的时候，会在HTTP的头信息携带Referer这个参数，里面包含了A网站的网址。

Nginx通过检查HTTP的头携带的Referer参数，判断是否是自己的网址，如果不是，则拒绝访问。

## 实现方式

在nginx的站点配置文件下添加以下内容

```
location ~ .*\.(js|css|png|jpg|jpeg|webp|gif|ico|bmp|swf|eot|svg|ttf|woff|woff2)$ {
    expires 1d; 
    log_not_found off; 
    valid_referers none www.krjojo.com krjojo.com *.krjojo.com; 
    if ($invalid_referer) {
        return 404; 
        access_log off; 
    }
}
```

### 说明

```
location ~ .*\.(js|css|png|jpg|jpeg|webp|gif|ico|bmp|swf|eot|svg|ttf|woff|woff2)$ {
...
}
```

表示对js、css、png等结尾的静态文件进行过滤操作。

---

```
expires 1d
```

表示缓存时间为1天

---

```
log_not_found off;
```

如果文件找不到，是否记录到错误日志中 ，默认值为是。

---

```
valid_referers none www.krjojo.com krjojo.com *.krjojo.com;
```

Nginx 提供了valid\_referers参数用于检查url中refer参数的状态，简单来说有3种值可以用:

* none 
  + 不存在的Referer头 (表示空的，也就是直接访问，比如直接在浏览器打开一个图片)
* blocked
  + 存在Referer头，但是值为空或者不正确 (可能被防火墙或中间代理删除，也可能是不正常的用户发起的请求)
* 网址
  + 一个或多个服务器的列表，0.5.33版本以后可以在名称中使用“\*”通配符，用空格分割。

---

```
if ($invalid_referer) {
... 
}
```

需要与 `valid_referers` 搭配使用，是 `valid_referers` 的返回值，如果来源域名不在这个列表中，那么 `$invalid_referer` 等于1。

如果来源域名 不为空 ，不为 `www.krjojo.com krjojo.com *.krjojo.com` ，则触发进入 if。

为空也允许访问是为了支持用户在单独页面窗口上打开图片

---

```
return 404;
```

返回404

---

```
access_log off;
```

不记录日志，注意跟上面的日志不同`，log_not_found` 是错误日志，`access_log` 是访问日志

---

## 测试生效

修改nginx配置文件后，需求重启nginx生效。

检测防盗链是否生效的方法有很多，最简单的方法就是找个 **web在线工具**，把自己的图片的连接粘贴上去

菜鸟工具：<https://www.jyshare.com/front-end/61/>

```
<img src="https://www.krjojo.com/wp-content/uploads/2024/03/兄弟你好香-1.webp" alt="" />
```

也可以 codepen 随便找个项目编辑，把图片链接替换为自己

codepen：<https://codepen.io/hikiko/pen/YGOzxZ>

修改后运行html代码，页面中看不到自己的图片

F12打开控制台，再次运行html代码，可以在网络界面看到红色的404请求

验证完毕

完结！

## 后记

防盗链不是完美，防君子不防小人

虽然正常浏览器，不能直接通过 js 请求来修改 Referer ，但是，可以用远程代理服务器做跳板修改Referer 。

而且虽然叫防盗链，但并不能防止别人下载盗用你的资源。

网络安全，道阻且长