---
categories:
- Linux
- OpenWrt
- 信息技术
cover: ''
date: '2024-09-28T21:07:58+08:00'
draft: false
slug: 分享一个测试路由器-连接数-的网站
tags:
- OpenWrt
- 压力测试
- 活动连接
- 路由器
- 连接数
title: 分享一个测试路由器 连接数 的网站
updated: '2024-09-28T21:07:58+08:00'
wp_id: 9905
---

在路由器中有一个重要负载，就是活动连接，在一些安装了OpenWrt系统的路由中，编译系统的作者可能会把值设置的很大，比如65536，给人感觉路由器上限变高了，能同时带六万多个连接。

牛不牛还得实测过才知道，分享一个测试网站

<https://qps.itzmx.com>

原理：通过随机生成子域名，在浏览器中疯狂发起请求，达成刷连接数的目的。

连接数会吃掉路由大量性能和内存，在内存不足，且没有合理限制连接数的情况下，可能会把其他的服务挤崩溃，如OpenClash。

个别光猫如果是软桥接的话，可能还会被光猫所限制，有的限制2000，超过光猫连接数会跳ping。

最后附带一下修改最大活动连接的方法，修改`/etc/sysctl.d/11-nf-conntrack.conf`

```
net.netfilter.nf_conntrack_max=65536
```

再备份一下网站源码，写的真不错~

需要自行导入`jquery-2.1.3.min.js`

```
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

  <title>DNSTester 域名权威DNS云端QPS压力测试 - itzmx.com</title>
  <meta name="Keywords" content="DNS查询,DNS,云DDOS,DNS压测">
  <meta name="description" content="域名权威DNS云端QPS压力测试">
  <script language="javascript">
    if (document.location.protocol == "http:" &&
      (document.location.hostname == 'qps.itzmx.com')) {
      //http redirect to https
      var new_url = "https://" + document.location.hostname + document.location.pathname + document.location.search;
      document.location = new_url;
    }
    var li_length = document.getElementsByTagName("li").length;
    if (li_length > 6) {
      for (var i = 1; i <= li_length; i++) {
        document.getElementById("nav" + i).style.padding = "0 18px";
      }
    }
  </script>
  <style type="text/css">
    #_copy {
      align-items: center;
      background: #4494d5;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      display: flex;
      font-size: 13px;
      height: 30px;
      justify-content: center;
      position: absolute;
      width: 60px;
      z-index: 1000
    }

    #select-tooltip,
    #sfModal,
    .modal-backdrop,
    div[id^=reader-helper] {
      display: none !important
    }

    .modal-open {
      overflow: auto !important
    }

    ._sf_adjust_body {
      padding-right: 0 !important
    }

    .enable_copy_btns_div {
      position: fixed;
      width: 154px;
      left: 10px;
      top: 45%;
      background: #e7f1ff;
      border: 2px solid #4595d5;
      font-weight: 600;
      border-radius: 2px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
      z-index: 5000
    }

    .enable_copy_btns_logo {
      width: 100%;
      background: #4595d5;
      text-align: center;
      font-size: 12px;
      color: #e7f1ff;
      line-height: 30px;
      height: 30px
    }

    .enable_copy_btns_btn {
      display: block;
      width: 128px;
      height: 28px;
      background: #7f5711;
      border-radius: 4px;
      color: #fff;
      font-size: 12px;
      border: 0;
      outline: 0;
      margin: 8px auto;
      font-weight: 700;
      cursor: pointer;
      opacity: .9
    }

    .enable_copy_btns_btn:hover {
      opacity: .8
    }

    .enable_copy_btns_btn:active {
      opacity: 1
    }
  </style>
  <style data-id="immersive-translate-input-injected-css">
    .immersive-translate-input {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 2147483647;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .immersive-translate-attach-loading::after {
      content: " ";

      --loading-color: #f78fb6;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: block;
      margin: 12px auto;
      position: relative;
      color: white;
      left: -100px;
      box-sizing: border-box;
      animation: immersiveTranslateShadowRolling 1.5s linear infinite;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-2000%, -50%);
      z-index: 100;
    }

    .immersive-translate-loading-spinner {
      vertical-align: middle !important;
      width: 10px !important;
      height: 10px !important;
      display: inline-block !important;
      margin: 0 4px !important;
      border: 2px rgba(221, 244, 255, 0.6) solid !important;
      border-top: 2px rgba(0, 0, 0, 0.375) solid !important;
      border-left: 2px rgba(0, 0, 0, 0.375) solid !important;
      border-radius: 50% !important;
      padding: 0 !important;
      -webkit-animation: immersive-translate-loading-animation 0.6s infinite linear !important;
      animation: immersive-translate-loading-animation 0.6s infinite linear !important;
    }

    @-webkit-keyframes immersive-translate-loading-animation {
      from {
        -webkit-transform: rotate(0deg);
      }

      to {
        -webkit-transform: rotate(359deg);
      }
    }

    @keyframes immersive-translate-loading-animation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(359deg);
      }
    }

    .immersive-translate-input-loading {
      --loading-color: #f78fb6;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: block;
      margin: 12px auto;
      position: relative;
      color: white;
      left: -100px;
      box-sizing: border-box;
      animation: immersiveTranslateShadowRolling 1.5s linear infinite;
    }

    @keyframes immersiveTranslateShadowRolling {
      0% {
        box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
      }

      12% {
        box-shadow: 100px 0 var(--loading-color), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
      }

      25% {
        box-shadow: 110px 0 var(--loading-color), 100px 0 var(--loading-color), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
      }

      36% {
        box-shadow: 120px 0 var(--loading-color), 110px 0 var(--loading-color), 100px 0 var(--loading-color), 0px 0 rgba(255, 255, 255, 0);
      }

      50% {
        box-shadow: 130px 0 var(--loading-color), 120px 0 var(--loading-color), 110px 0 var(--loading-color), 100px 0 var(--loading-color);
      }

      62% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 var(--loading-color), 120px 0 var(--loading-color), 110px 0 var(--loading-color);
      }

      75% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 var(--loading-color), 120px 0 var(--loading-color);
      }

      87% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 var(--loading-color);
      }

      100% {
        box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
      }
    }

    .immersive-translate-search-recomend {
      border: 1px solid #dadce0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      position: relative;
      font-size: 16px;
    }

    .immersive-translate-search-enhancement-en-title {
      color: #4d5156;
    }

    .immersive-translate-search-settings {
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;
    }

    .immersive-translate-search-recomend::before {
      /* content: " "; */
      /* width: 20px; */
      /* height: 20px; */
      /* top: 16px; */
      /* position: absolute; */
      /* background: center / contain url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAxlBMVEUAAADpTInqTIjpSofnSIfqS4nfS4XqS4nqTIjsTYnrTInqTIroS4jvQIDqTIn////+/v7rSYjpTIn8/v7uaZzrTIr9/f3wfansWJL88/b85e73qc39+/v3xNnylrvrVI/98fb62Obva5/8+fr76vH4y9zpSIj74e353Oj1ocTzm77xhK/veKbtYpjsXJTqU47oTInxjrXyh7L99fj40eH2ttH1udD3sc31ssz1rMnykLXucqPtbqD85e/1xdn2u9DzqcXrUY6FaJb8AAAADnRSTlMA34BgIM8Q37/fz7+/EGOHcVQAAAGhSURBVDjLhZPncuowEEZFTW7bXVU7xsYYTO/p7bb3f6lICIOYJOT4h7/VnFmvrBFjrF3/CR/SajBHswafctG0Qg3O8O0Xa8BZ6uw7eLjqr30SofCDVSkemMinfL1ecy20r5ygR5zz3ArcAqJExPTPKhDENEmS30Q9+yo4lEQkqVTiIEAHCT10xWERRdH0Bq0aCOPZNDV3s0xaYce1lHEoDHU8wEh3qRJypNcTAeKUIjgKMeGLDoRCLVLTVf+Ownj8Kk6H9HM6QXPgYjQSB0F00EJEu10ILQrs/QeP77BSSr0MzLOyuJJQbnUoOOIUI/A8EeJk9E4YUHUWiRyTVKGgQUB8/3e/NpdGlfI+FMQyWsCBWyz4A/ZyHXyiiz0Ne5aGZssoxRmcChw8/EFKQ5JwwkUo3FRT5yXS7q+Y/rHDZmFktzpGMvO+5QofA4FPpEmGw+EWRCFvnaof7Zhe8NuYSLR0xErKLThUSs8gnODh87ssy6438yzbLzxl012HS19vfCf3CNhnbWOL1eEsDda+gDPUvri8tSZzNFrwIZf1NmNvqC1I/t8j7nYAAAAASUVORK5CYII='); */
    }

    .immersive-translate-search-title {}

    .immersive-translate-search-title-wrapper {}

    .immersive-translate-search-time {
      font-size: 12px;
      margin: 4px 0 24px;
      color: #70757a;
    }

    .immersive-translate-expand-items {
      display: none;
    }

    .immersive-translate-search-more {
      margin-top: 16px;
      font-size: 14px;
    }

    .immersive-translate-modal {
      display: none;
      position: fixed;
      z-index: 2147483647;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
      font-size: 15px;
    }

    .immersive-translate-modal-content {
      background-color: #fefefe;
      margin: 10% auto;
      padding: 40px 24px 24px;
      border: 1px solid #888;
      border-radius: 10px;
      width: 80%;
      max-width: 270px;
      font-family: system-ui, -apple-system, "Segoe UI", "Roboto", "Ubuntu",
        "Cantarell", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
      position: relative
    }

    @media screen and (max-width: 768px) {
      .immersive-translate-modal-content {
        margin: 50% auto !important;
      }
    }

    .immersive-translate-modal .immersive-translate-modal-content-in-input {
      max-width: 500px;
    }

    .immersive-translate-modal-content-in-input .immersive-translate-modal-body {
      text-align: left;
      max-height: unset;
    }

    .immersive-translate-modal-title {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: #333333;
    }

    .immersive-translate-modal-body {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      word-break: break-all;
      margin-top: 24px;
    }

    @media screen and (max-width: 768px) {
      .immersive-translate-modal-body {
        max-height: 250px;
        overflow-y: auto;
      }
    }

    .immersive-translate-close {
      color: #666666;
      position: absolute;
      right: 16px;
      top: 16px;
      font-size: 20px;
      font-weight: bold;
    }

    .immersive-translate-close:hover,
    .immersive-translate-close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .immersive-translate-modal-footer {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 24px;
    }

    .immersive-translate-btn {
      width: fit-content;
      color: #fff;
      background-color: #ea4c89;
      border: none;
      font-size: 16px;
      margin: 0 8px;
      padding: 9px 30px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .immersive-translate-btn:hover {
      background-color: #f082ac;
    }

    .immersive-translate-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .immersive-translate-btn:disabled:hover {
      background-color: #ea4c89;
    }

    .immersive-translate-cancel-btn {
      /* gray color */
      background-color: rgb(89, 107, 120);
    }

    .immersive-translate-cancel-btn:hover {
      background-color: hsl(205, 20%, 32%);
    }

    .immersive-translate-action-btn {
      background-color: transparent;
      color: #EA4C89;
      border: 1px solid #EA4C89
    }

    .immersive-translate-btn svg {
      margin-right: 5px;
    }

    .immersive-translate-link {
      cursor: pointer;
      user-select: none;
      -webkit-user-drag: none;
      text-decoration: none;
      color: #007bff;
      -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
    }

    .immersive-translate-primary-link {
      cursor: pointer;
      user-select: none;
      -webkit-user-drag: none;
      text-decoration: none;
      color: #ea4c89;
      -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
    }

    .immersive-translate-modal input[type="radio"] {
      margin: 0 6px;
      cursor: pointer;
    }

    .immersive-translate-modal label {
      cursor: pointer;
    }

    .immersive-translate-close-action {
      position: absolute;
      top: 2px;
      right: 0px;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <!--DNSTester 程序由 http://qps.itzmx.com/ 提供，转载请注明出处，谢谢-->
  <script type="text/javascript">
    function start_test() {
      DOMAIN = document.getElementById('site').value;
      MAX_COUNT = parseInt(document.getElementById('max_time').value);
      //console.log(MAX_COUNT);
      TPS = parseInt(document.getElementById('time_per_sec').value);
      var timegap = 1000 * (1 / TPS);
      r_send(timegap);
      update_id = setInterval("update_counter()", 1E3)
    }
    function update_counter() {
      document.getElementById("counter").innerHTML = "Count: " + COUNT.toString();
    }
    function stop_test() {
      console.log('STOP');
      clearInterval(TIMERID);
      clearInterval(update_id);
    }
  </script>
  <h1>DNSTester 演示</h1>
  <p>
    为了节省资源，很简陋，网站域名默认格式就行，注意前面的小数点，同时挂的人越多效果越好，而且不吃网速哦，叫上你的进击的小伙伴吧。(<a href="https://qps.itzmx.com/1.png"
      target="_blank">图1</a> <a href="https://qps.itzmx.com/2.png" target="_blank">图2</a>)<br>
    频率/秒: <input id="time_per_sec" type="text" value="250">(chrome浏览器限制最大值250每秒连接产生)<br>
    QPS次数: <input id="max_time" type="text" value="10000000000"><br>
    网站域名: <input id="site" type="text" value=".360.cn"><br>
    <br>
    点击下面的按钮开始测试：<br>
    <button onclick="start_test()">开始</button>
  </p>
  <p>
  </p>
  <p id="counter"></p>

  <button onclick="stop_test()">停止</button>
  <p></p>
  <p>
  </p>
  <script src="./jquery-2.1.3.min.js" type="text/javascript"></script>
  <script>
    /*! dnstester v0.0.351 | (c) 2015, 2015 dnstester http://qps.itzmx.com/ , Inc. | itzmx.com/license */
    function makeid_old(t) {
      for (var e = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", o = 0; t > o; o++)
        e += n.charAt(Math.floor(Math.random() * n.length));
      return e
    }
    function makeid_new(t) {
      var e = new Uint8Array((t || 40) / 2);
      return window.crypto.getRandomValues(e),
        text = [].map.call(e, function (t) {
          return t.toString(16)
        }).join(""),
        text
    }
    function r_send2() {
      1 != (1 > MAX_COUNT || COUNT >= MAX_COUNT) && get("https://" + makeid(Math.floor(64 * Math.random() + 1)) + DOMAIN),
        COUNT % 1e3 == 0 && console.log("Done: " + COUNT.toString())
    }
    function get(t) {
      $.ajax({
        url: t,
        dataType: "script",
        timeout: .01,
        cache: !0,
        complete: function () {
          COUNT += 1
        }
      })
    }
    function r_send(t) {
      TIMERID = setInterval("r_send2()", t)
    }
    var COUNT = 0
      , STARTTIME = (new Date).getTime()
      , DOMAIN = ".baidu.com/"
      , MAX_COUNT = 5e4
      , TPS = 100
      , TIMERID = 0;
    makeid = makeid_new;
    try {
      test_msg = makeid(5)
    } catch (err) {
      console.log("New function not supported! " + err),
        makeid = makeid_old
    }
  </script>
</body>

</html>
```