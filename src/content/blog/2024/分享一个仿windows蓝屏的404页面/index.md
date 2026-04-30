---
categories:
- 信息技术
- HTML
category: HTML
draft: false
published: 2024-09-08 13:13:24
slug: 分享一个仿windows蓝屏的404页面
tags:
- windows
- HTML
- '404'
title: 分享一个仿Windows蓝屏的404页面
updated: 2025-11-09 09:50:07
---

## 效果

<https://www.krjojo.com/resources/html/windows%e8%93%9d%e5%b1%8f404.html>

## 页面源码

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 - 页面未找到</title>
    <style>
        body {
            background-color: #0099CC;
            color: #FFFFFF;
            font-family: Microsoft Yahei, "Helvetica Neue", Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
            margin-left: 100px;
        }
        .face {
            font-size: 100px;
        }
        p {
            font-size: 24px;
            padding: 8px;
            line-height: 40px;
        }
        .tips {
            font-size: 16px
        }
        /*针对小屏幕的优化*/
        @media screen and (max-width: 600px) {
            body {
                margin: 0 10px;
            }
            p {
                font-size: 18px;
                line-height: 30px;
            }
            .tips {
                display: inline-block;
                padding-top: 10px;
                font-size: 14px;
                line-height: 20px;
            }
        }
    </style>
</head>
<body>
    <script>
        var i = 5;
        var intervalid;
        intervalid = setInterval("cutdown()", 1000);
        function cutdown() {
            return
            if (i == 0) {
                window.location.href = "https://www.krjojo.com/";
                clearInterval(intervalid);
            }
            document.getElementById("mes").innerHTML = i;
            i--;
        }
        window.onload = cutdown;
    </script>
    <span class="face">:(</span>
    <p>您访问的页面没有找到。<br>
        <span id="mes"></span> 秒后转至网站首页；<br>
    <p class="paddingbox">或者在倒计时结束前点击以下链接继续浏览网页</p>
    <p>》<a style="cursor:pointer" onclick="history.back()">返回上一页面</a></p>
    <span class="tips">如果您想了解更多信息，则可以稍后在线搜索此错误: 算了你还是别搜了……</span>
    </p>
</body>
</html>
```