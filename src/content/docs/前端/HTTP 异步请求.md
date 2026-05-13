# HTTP 异步请求

## fetch

来自ES6，是一个 API，无需安装

```javascript
fetch("https://www.krjojo.com/")
  .then(response => {
    if (!response.ok) {
      throw new Error("请求失败，状态码：" + response.status);
    }
    return response.json();
  })
  .then(data => {
    // 请求成功，处理响应数据
    console.log("成功获取数据：", data);
  })
  .catch(error => {
    // 请求失败，处理错误
    console.error(error);
  });
```

流式读取内容

## xhr

XMLHttpRequest

来自IE5，后成为W3C标准接口

GET 请求示例

```javascript
// 创建一个新的XHR对象
const xhr = new XMLHttpRequest();
 
// 配置请求
xhr.open("GET", "https://www.krjojo.com/", true);
 
// 配置头
xhr.setRequestHeader("Content-Type", "application/json");
 
// 设置响应处理函数
xhr.onload = function() {
  if (xhr.status === 200) {
    // 请求成功
    const responseData = xhr.responseText;
    console.log("成功获取数据：", responseData);
  } else {
    // 请求失败
    console.error("请求失败，状态码：" + xhr.status);
  }
};
 
// 发起请求
xhr.send();
```

POST 请求示例

```javascript
const xhr = new XMLHttpRequest();
 
xhr.open("POST", "/submit", true);
 
xhr.setRequestHeader("Content-Type", "application/json");
 
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log("成功：", xhr.responseText);
  }
};
 
xhr.send(JSON.stringify({ username: "alice" }));
```

## Axios

用xhr进行了二次封装的第三方请求库，支持异步，**非浏览器自带**

```javascript
const axios = require("axios");
 
axios.get("https://www.krjojo.com/", {
    params: {
      post: 12345
    }
  })
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });
```

## Ajax

Asynchronous JavaScript And XML（异步的 Javascript 和 XML）

Ajax 是一种思想，一种技术统称，xhr (XMLHttpRequest) fetch 都是实现 Ajax 的一种方式。

以 xhr 为例

```javascript
function ajax(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url, false);
  xhr.onreadystatechange = function () {
    // 异步回调函数
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.info("响应结果", xhr.response)
      }
    }
  }
  xhr.send(null);
}
 
ajax("https://www.krjojo.com/")
```
