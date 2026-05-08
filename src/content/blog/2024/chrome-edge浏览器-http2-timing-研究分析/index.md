---
categories:
- HTML
- HTTP2
- 信息技术
cover: ./加速.avif
date: 2024-03-31T00:32:38+08:00
draft: false
slug: chrome-edge浏览器-http2-timing-研究分析
tags:
- chrome
- dns
- edge
- http2
- queueing
- timing
- TTFB
- 队列
title: Chrome Edge浏览器 HTTP2 Timing 研究分析
updated: 2024-03-31T00:32:39+08:00
wp_id: 8522
---

![](./加速.avif)

## 队列 Queueing

因为有“队头阻塞”，浏览器对每个域名最多开 6 个并发连接（HTTP/1.1），当页面里链接很多的时候就必须排队等待（Queued、Queueing）。此参数表示从添加到待处理队列，到实际开始处理的时间间隔。

在HTTP/2里面，一个域只需要建立一次TCP连接就可以传输多个资源。多个数据流/信号通过一条信道进行传输，充分地利用高速信道，就叫多路复用（Multiplexing）。

## 已停止 Stalled

浏览器要预先分配资源，调度连接

## DNS查找 DNS Lookup

请求某域名下的资源，浏览器需要先通过DNS解析器得到该域名服务器的IP地址。在DNS查找完成之前，浏览器不能从主机名那里下载到任何东西。DNS查询的时间，当本地DNS缓存没有的时候，这个时间可能是有一段长度的，但是比如你一旦在host中设置了DNS，或者第二次访问，由于浏览器的DNS缓存还在，这个时间就为0了。

## 初始连接 Initial connection

建立DNS查询TCP连接的时间。

## SSL

SSL是初始连接的一部分，为dns查询加入了SSL协议，俗称TLS，用于获取服务器IP 。

## 已发送请求 Request sent

发送HTTP请求的时间（从第一个字节发出前到最后一个字节发出后的时间）

## 正在等待服务器响应 Waiting(TTFB)

请求发出后，到收到响应的第一个字节所花费的时间(Time To First Byte)，发送请求完毕到接收请求开始的时间。通常是耗费时间最长的。从发送请求到收到服务器响应的第一字节之间的时间，受到线路、服务器距离等因素的影响。

注意：网页重定向越多，TTFB越高，所以要减少重定向

## 内容下载 Content Download

从收到响应的第一个字节，到接受完最后一个字节的时间，就是下载时间，一般取决于服务器和用户之间的网速。