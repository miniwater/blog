---
categories:
- 信息技术
- HTML
category: HTML
draft: false
published: 2024-03-01 13:24:54
slug: code-server-提示-this-is-likely-because-the-editor-is-not-running-in-a-secure-context
tags:
- HTML
- chrome
title: Code-Server 提示 This is likely because the editor is not running in a secure
  context
updated: 2024-03-01 18:00:48
---

今天在code-server遇到一个错误提示

如下：

```
crypto.subtle' is not available so webviews will not work. This is likely because the editor is not running in a secure context (https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).: Error: 'crypto.subtle' is not available so webviews will not work. This is likely because the editor is not running in a secure context (https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).
```

解决办法：

开启chrome 的 unsafely-treat-insecure-origin-as-secure 功能

`chrome://flags/#unsafely-treat-insecure-origin-as-secure`

将对应的 code-server 网址填入对应的网址框，并开启该功能