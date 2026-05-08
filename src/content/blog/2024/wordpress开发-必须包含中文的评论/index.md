---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: 2024-02-22T00:12:32+08:00
draft: false
slug: wordpress开发-必须包含中文的评论
tags:
- Chinese
- comment
- WordPress
- 中文
- 评论
title: wordpress过滤评论
updated: 2024-03-12T23:48:10+08:00
wp_id: 1295
---

## 必须包含中文的评论

使用 `preprocess_comment` 钩子，在用户提交评论时进行进行判断，若评论内容不存在中文字符则评论失败。

注意：若不存在中文字符，用户会立即收到评论失败，需要重新提交评论。

用正则`'/[一-龥]/u'`进行判断：

* 使用 一 和 龥 这两个中文字符来表示中文字符的范围，它们是 Unicode 编码中的第一个和最后一个中文字符，表示匹配任意一个中文字符。
* 使用 u 标志来表示这是一个 Unicode 正则表达式，表示按照 Unicode 编码来解析和匹配字符。

在 `function.php` 下添加：

```
add_filter('preprocess_comment', function ($comment_data) {
  $pattern = '/[一-龥]/u';
  if (!preg_match($pattern, $comment_data['comment_content'])) {
    wp_die('评论必须含中文！');
  }
  return ($comment_data);
});
```

## 非中文评论自动标记为垃圾评论

使用 `pre_comment_approved` 钩子，在用户提交评论后进行进行判断，若评论内容不存在中文字符则自动标记为垃圾评论。

注意：不管是否存在中文字符，用户都可以提交成功，对于用户是无感的。

在 function.php 下添加：

```
add_filter('pre_comment_approved', function ($approved, $commentdata) {

  $comment = $commentdata['comment_content'];

  if (!preg_match('/[一-龥]/u', $comment)) {

    return 'spam';

  }

  return $approved;

}, '99', 2);
```

如果把 `spam` 改为 `trash` ，则自动移至回收站。

甚至，你还可以在这段函数里添加想要过滤的关键字敏感词，对垃圾内容进行静默处理。

例如：

```
add_filter('pre_comment_approved', function ($approved, $commentdata) {

  $comment = $commentdata['comment_content'];

  $keyword = [

    '代练',

    '挂机',

    '演员',
    // 添加敏感词

  ];

  foreach ($keyword as $value) {

    if (strpos($comment, $value) !== false) {

      return 'spam';

    }

  }

  if (!preg_match('/[一-龥]/u', $comment)) {

    return 'spam';

  }

  return $approved;

}, '99', 2);
```