---
categories:
- 信息技术
- HTML
- nginx
- apache
category: apache
draft: false
published: 2024-03-30 10:31:31
slug: use-x-content-type-options-header修复
tags:
- HTML
- HTML5
- js
- xss
- .htaccess
- http
- http响应头
- nginx
- Apache
title: Use X-Content-Type-Options Header修复
updated: 2024-03-30 10:41:12
---

今天在看到了 `Use X-Content-Type-Options Header` 的警告

具体内容为：<https://webhint.io/docs/user-guide/hints/hint-x-content-type-options/?source=devtools>

大概意思就是：

响应头用来指定浏览器对未指定或错误指定Content-Type资源真正类型的猜测行为，nosniff表示不允许任何猜测(即关闭浏览器的MIME嗅探功能)。

在通常的请求响应中，浏览器会根据Content-Type来分辨响应的类型，但当响应类型未指定或错误指定时，浏览会尝试启用MIME-sniffing来猜测资源的响应类型，这是非常危险的。

例如一个.jpg的图片文件被恶意嵌入了可执行的js代码，在开启资源类型猜测的情况下，浏览器将执行嵌入的js代码，可能会有意想不到的后果。

## X-Content-Type-Options 是什么？

X-Content-Type-Options 是一种 HTTP 响应头，用于控制浏览器是否应该尝试 MIME 类型嗅探。如果启用了 X-Content-Type-Options，浏览器将遵循服务器提供的 MIME 类型，用于防止浏览器执行 MIME 类型错误的响应体（response body）。

如果在http响应头中指定的 Content-Type 与实际响应体返回的 MIME 类型不一致，这种情况下浏览器可能会忽略响应头中指定的Content-Type，执行实际响应体的 MIME 类型，造成安全风险，而设置 X-Content-Type-Options 就是为了避免这种类型的安全风险。

## 如何设置 X-Content-Type-Options ？

在服务器端（前后端分离的场景下，只需要在前端站点所在服务器配置即可，如果前后端在一起的话在项目所在服务器配置）的代码或反向代理服务配置中添加 X-Content-Type-Options 头即可。

以 nginx为例，在 nginx.conf 文件中添加以下行：

```
add_header X-Content-Type-Options nosniff;
```

以 apache为例，在 .htaccess 文件中添加以下行：

```
Header set X-Content-Type-Options "nosniff"
```

如你只是想在服务器配置（或 .htaccess 文件）中设置这些 HTTP 响应标头。例如，若要仅将 X-Content-Type-Options .css HTTP 响应标头应用于 .css 和 .png 之类的静态不可执行文件，请尝试以下操作：

```
<FilesMatch "\.(css|png|woff2|webp)$">
    Header set X-Content-Type-Options nosniff
</FilesMatch>
```

注意，只有apache才处理 .htaccess 文件，nginx无效

## X-Content-Type-Options 应用场景

主要用于防范 XSS（跨站脚本攻击）和 snippet-injection 攻击。snippet-injection 攻击是指把 HTML 代码嵌入到非 HTML 内容，浏览器会读取并解析该内容。这可能导致XSS攻击或着被误导到包含恶意代码的站点。

## 举个例子

下面是一段使用了 X-Content-Type-Options 响应头的代码：

```
HTTP/1.1 200 OK
Content-Type: text/html;charset=utf-8
X-Content-Type-Options: nosniff
 
<html>
<head>
<title>手里有只毛毛虫</title>
</head>
<body>
<script>
alert("nosniff warning");
</script>
</body>
</html>
```

通过在响应头中添加 X-Content-Type-Options: nosniff，告诉浏览器只能执行 MIME 为 text/html 的响应内容，将阻止浏览器执行 JavaScript 代码。