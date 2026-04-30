---
categories:
- 信息技术
- PHP
- Typecho
category: Typecho
draft: false
published: 2024-05-10 12:10:46
slug: 修改typecho的搜索功能仅检索标题
tags:
- Typecho
- 搜索
title: 修改typecho的搜索功能仅检索标题
updated: 2024-05-10 12:10:47
---

使用typecho的搜索功能时，你会发现，搜索时默认检索标题和全文，如果检索全文，会搜索出很多根本不相干的文章出来，这仅仅是因为该文章出现了这个搜索词导致的，如果仅搜索标题的话，含有关键词，搜索的准确度就大大增加了。

要修改为搜索时仅检索标题，只需要小改一下源代码就行了，具体如下：

打开文件：/var/Widget/Archive.php

找到私有函数：

```
private function searchHandle(Query $select, &$hasPushed)
```

将：

```
$select->where("table.contents.title {$op} ? OR table.contents.text {$op} ?", $searchQuery, $searchQuery)
```

改为：

```
$select->where("table.contents.title {$op} ? ", $searchQuery, $searchQuery)
```

这样搜索时就只检索标题了，不会去检索全文了。