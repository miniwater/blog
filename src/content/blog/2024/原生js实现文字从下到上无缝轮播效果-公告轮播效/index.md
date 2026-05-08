---
categories:
- HTML
- js
- 信息技术
cover: ./公告.avif
date: 2024-04-12T11:16:03+08:00
draft: false
slug: 原生js实现文字从下到上无缝轮播效果-公告轮播效
tags:
- js
- 公告轮播
title: 原生JS实现文字从下到上无缝轮播效果 公告轮播效果
updated: 2024-04-12T21:37:36+08:00
wp_id: 8937
---

多说无益，先看效果

[](https://www.krjojo.com/wp-content/uploads/2024/04/chrome-capture-2024-3-12-1.webm)

公告

在市面上找了许多无缝轮播效果样式，基本都离不开jQ，只好自己把jQ改写成原生实现了

来源地址：<https://www.cnblogs.com/ccdr/p/10082157.html>

这是原来jQ的实现部分

```
/*
* 参数说明
* obj : 动画的节点，本例中是ul
* top : 动画的高度，本例中是-35px;注意向上滚动是负数
* time : 动画的速度，即完成动画所用时间，本例中是500毫秒，即marginTop从0到-35px耗时500毫秒
* function : 回调函数，每次动画完成，marginTop归零，并把此时第一条信息添加到列表最后;
* 
*/
function noticeUp(obj,top,time) {
 $(obj).animate({
 marginTop: top
 }, time, function () {
 $(this).css({marginTop:"0"}).find(":first").appendTo(this);
 })
}
```

换用原生JS实现

```
function noticeUp(obj, top, time) {
    var element = document.querySelector(obj);
    var start = null;
    var targetMarginTop = parseInt(top, 10);
    var initialMarginTop = parseInt(window.getComputedStyle(element).marginTop, 10);
    var changeInValue = targetMarginTop - initialMarginTop;
    var currentTime = 0;
    var increment = 20;
    var animateMargin = function (timestamp) {
        if (!start) start = timestamp;
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, initialMarginTop, changeInValue, time);
        element.style.marginTop = val + 'px';
        if (currentTime < time) {
            requestAnimationFrame(animateMargin);
        } else {
            element.style.marginTop = '0px';
            element.appendChild(element.firstElementChild);
        }
    };
    // t = current time, b = start value, c = change in value, d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    requestAnimationFrame(animateMargin);
}
```

不得不说jQ真的方便，比原生现实代码少了几倍

最后整个页面整理了一下

大概就是

```
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>文字从下到上无缝轮播</title>
    <style>
        div,
        ul,
        li {
            margin: 0;
            padding: 0
        }

        /*先初始化一下默认样式*/
        .notice {
            width: 300px;
            /*单行显示，超出隐藏*/
            height: 35px;
            /*固定公告栏显示区域的高度*/
            padding: 0 30px;
            background-color: #b3effe;
            overflow: hidden;
        }

        .notice ul li {
            list-style: none;
            line-height: 35px;
            /*以下为了单行显示，超出隐藏*/
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div class="notice">
        <ul>
            <li>第1条公告第1条公告第1条公告第1条公告第1条公告第1条公告</li>
            <li>第2条公告第2条公告第2条公告第2条公告第2条公告第2条公告</li>
            <li>第3条公告第3条公告第3条公告第3条公告第3条公告第3条公告</li>
            <li>第4条公告第4条公告第4条公告第4条公告第4条公告第4条公告</li>
        </ul>
    </div>
    <script>
        function noticeUp(obj, top, time) {
            var element = document.querySelector(obj);
            var start = null;
            var targetMarginTop = parseInt(top, 10);
            var initialMarginTop = parseInt(window.getComputedStyle(element).marginTop, 10);
            var changeInValue = targetMarginTop - initialMarginTop;
            var currentTime = 0;
            var increment = 20;

            var animateMargin = function (timestamp) {
                if (!start) start = timestamp;
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, initialMarginTop, changeInValue, time);
                element.style.marginTop = val + 'px';
                if (currentTime < time) {
                    requestAnimationFrame(animateMargin);
                } else {
                    element.style.marginTop = '0px';
                    element.appendChild(element.firstElementChild);
                }
            };

            // t = current time, b = start value, c = change in value, d = duration
            Math.easeInOutQuad = function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            requestAnimationFrame(animateMargin);
        }

        setInterval("noticeUp('.notice ul','-35px',500)", 2000);

    </script>
</body>

</html>
```