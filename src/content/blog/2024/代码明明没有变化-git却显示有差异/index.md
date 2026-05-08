---
categories:
- Git
- 信息技术
cover: ''
date: '2024-05-07T21:27:38+08:00'
draft: false
slug: 代码明明没有变化-git却显示有差异
tags:
- git
title: 代码明明没有变化 git却显示有差异
updated: '2024-05-07T21:28:22+08:00'
wp_id: 9281
---

因为由于filemode的变化，文件chmod后其文件某些位是改变了的，如果严格的比较原文件和chmod后的文件，两者是有区别的，但是源代码通常只关心文本内容，因此chmod产生的变化应该忽略，所以设置一下：

切到源码的根目录下

```
git config --add core.filemode false
```

此时再去查看，异常的提醒没有了，开心干活去