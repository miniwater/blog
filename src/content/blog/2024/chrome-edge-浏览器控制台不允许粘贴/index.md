---
categories:
- HTML
cover: ''
date: '2024-01-13T00:00:27+08:00'
draft: false
slug: chrome-edge-浏览器控制台不允许粘贴
tags:
- chrome
- edge
title: Chrome Edge 浏览器控制台不允许粘贴
updated: '2024-01-13T00:00:27+08:00'
wp_id: 1042
---

会弹出警告：

Warning: Don’t paste code into the DevTools Console that you don’t understand or haven’t reviewed yourself. This could allow attackers to steal your identity or take control of your computer. Please type ‘allow pasting’ below to allow pasting.

```
Warning: Don’t paste code into the DevTools Console that you don’t understand or haven’t reviewed yourself. This could allow attackers to steal your identity or take control of your computer. Please type ‘allow pasting’ below to allow pasting.
```

Warning: Don’t paste code into the DevTools Console that you don’t understand or haven’t reviewed yourself. This could allow attackers to steal your identity or take control of your computer. Please type ‘allow pasting’ below to allow pasting.

新浏览器出了这么一个东西，表示不让你在 控制台 中粘贴一些你不懂的东西，完完全全是针对普通用户的。

### 解决办法

它这个提示中也说了，如果你不想以后再看到它，就在下面打出 `allow pasting` 这两个单词即可。

```
allow pasting
```

然后就可以正常粘贴了。