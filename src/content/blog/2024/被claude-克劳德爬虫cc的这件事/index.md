---
categories:
- 信息技术
- PHP
- WordPress
- 安全
- 1Panel
category: 1Panel
draft: false
published: 2024-10-23 12:17:54
slug: 被claude-克劳德爬虫cc的这件事
tags:
- 网络安全
- 克劳德
- 爬虫
- CC
- Claude
- 网络攻击
- CC攻击
- ClaudeBot
title: 关于被Claude 克劳德爬虫CC的这件事
updated: 2024-10-24 14:08:25
---

大晚上正准备睡觉，邮件收到阿里云的资源告警，5分钟内cpu占用100%

![](./阿里云.avif)

![](./阿里云负载.avif)

顿时人都清醒了，赶紧上后台一看，

好家伙，全是 claudebot@anthropic.com 的爬虫在扫

![](./nginx日志.avif)

但是按道理说，爬虫怎么会扫到负载100%呢。

看了一眼请求时间发现不对劲，怎么一秒内打几个请求过来，

如果是css js jpg那些静态资源也就算了，但请求全是php的动态资源，这简直属于cc攻击范畴了。

在百度搜了一下，emmmmm，牛的

![](./百度.avif)

既然如此，

那就不好意思了

![](./User-Agent.avif)