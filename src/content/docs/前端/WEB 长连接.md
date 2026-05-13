# WEB 长连接

以前的Web端为了实现即时通讯，所用的技术都是Ajax轮询(polling)。

轮询是在特定的的时间间隔（如每1秒），由浏览器对服务器发出HTTP request，然后由服务器返回最新的数据给客服端的浏览器。

这种传统的HTTP request 的模式带来很明显的缺点 – 浏览器需要不断的向服务器发出请求，然而HTTP request 的header是非常长的，里面包含的数据可能只是一个很小的值，这样会占用很多的带宽。

## WebSocket

```javascript
if ("WebSocket" in window) {    const ws = new WebSocket("wss://www.krjojo.com/ws");    ws.onopen = function () {        console.log("succeed");    };    ws.onerror = function () {        console.log("error");    };    ws.onmessage = function (event) {        console.log(event);    };    // ws.close();}
```

## socket.io

需要额外引用js文件

```xml
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script><script>    const socket = io("http://localhost:3000");    socket.on("connect", () => {        console.log("succeed");    });    socket.on("error", (error) => {        console.error("Socket error:", error);    });    socket.on("message", (event) => {        console.log(event);    });    // socket.close();</script>
```

## SSE

客户端只能接受数据

广泛用在AI聊天，逐字返回。

```javascript
if (typeof (EventSource) !== "undefined") {    const sse = new EventSource("https://www.krjojo.com/SSE.php");    sse.onopen = function () {        console.log("succeed");    };    sse.onerror = function () {        console.log("error");    };    sse.onmessage = function (event) {        console.log(event);    };    // sse.close();}
```
