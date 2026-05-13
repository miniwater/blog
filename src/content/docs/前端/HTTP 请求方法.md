# HTTP 请求方法

## GET

发送一个请求获得服务器上的资源

## POST

向 URL 指定的资源提交数据或者附加新的数据

## PUT

PUT方法将请求的数据存储到指定的URL位置，用于更新资源

与 POST 方法不同，PUT 请求是幂等的，意味着多次发送相同的 PUT 请求，服务器的资源状态不会变化。

## PATCH

用于对资源进行部分修改

与 PUT 方法不同，PATCH 请求不需要包含完整的资源数据，而只需要传输需要更新的部分字段。

## DELETE

删除服务器上的指定的资源

DELETE 方法是幂等的，这意味着相同的 DELETE 请求无论执行多少次，服务器上的资源状态应保持一致。

## HEAD

请求页面的头部信息，这些头部信息与 HTTP GET 方法请求时返回的一致

主要作用是获取资源的元数据，而不是资源本身的内容。

```shell
curl -I https://www.krjojo.com/wp-content/uploads/2025/02/毛毛虫2.avif
 
HTTP/1.1 200 OK
Server: openresty
Date: Sat, 21 Jun 2025 15:27:11 GMT
Content-Type: image/avif
Content-Length: 9236
Last-Modified: Mon, 19 May 2025 08:30:11 GMT
Connection: keep-alive
ETag: "682aec13-2414"
Expires: Mon, 21 Jul 2025 15:27:11 GMT
Cache-Control: max-age=2592000
Strict-Transport-Security: max-age=31536000
Accept-Ranges: bytes
```

## OPTIONS

它用于获取当前 URL 所支持的方法。如果请求成功，会有一个 Allow 的头包含类似“Get、Post” 这样的信息

它通常用于检查服务器的能力，确定哪些请求方法可以被安全地执行在指定资源上。

```shell
curl -X OPTIONS https://www.krjojo.com/wp-json/krjojo/sentences
 
{"namespace":"krjojo","methods":["GET"],"endpoints":[{"methods":["GET"],"args":[]}],"_links":{"self":[{"href":"https:\/\/www.krjojo.com\/wp-json\/krjojo\/sentences"}]}}
```

## TRACE

用于回显服务器收到的请求，主要用于测试或诊断。

存在一定的安全风险：跨站追踪（Cross-Site Tracing, XST）。

许多生产环境的 Web 服务器默认会**禁用 TRACE 方法**。

## CONNECT

用于建立一个到服务器的隧道连接，通常用于 HTTP 与 HTTPS 的代理请求。

CONNECT 请求会将客户端的连接转换为一个双向通信的通道，允许客户端与目标服务器之间传递任意数据而不受代理服务器的影响。

最常见的应用场景是通过 HTTP 代理访问 HTTPS 站点。
