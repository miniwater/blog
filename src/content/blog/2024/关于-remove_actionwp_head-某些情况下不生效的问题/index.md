---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: 2024-10-11T13:50:45+08:00
draft: false
slug: 关于-remove_actionwp_head-某些情况下不生效的问题
tags:
- Hook
- PHP
- WordPress
- 开发
- 踩坑
title: 关于 remove_action('wp_head','') 某些情况下不生效的问题
updated: 2024-10-11T13:52:54+08:00
wp_id: 10030
---

今天在WordPress中，遇到几位抽象的BUG，在某些情况下 remove\_action() 函数不能顺利移除 Hook。

具体代码为

```
add_action('wp_head', 'krjojotest', 12);
function krjojotest()
{
  echo '<link rel="kkkkkkkkkkkkkk" href="www.krjojo.com">';
}
```

操作内容：在head头添加测试用link。

按正常逻辑下，使用 remove\_action() 函数可以移除，如下

```
add_action('wp_loaded', function () {
  remove_action('wp_head', 'krjojotest');
});
```

但是同时执行上面两段代码后，会发现 `<link rel="kkkkkkkkkkkkkk" href="www.krjojo.com">` 头依旧存在。

最后发现如果想要正确移除 `krjojotest` 的Hook，则需要修改成这样

```
add_action('wp_loaded', function () {
  remove_action('wp_head', 'krjojotest', 12);
});
```

最后一个12，代表priority参数为12，也就是执行优先级，需要跟 `add_action()` 函数中的优先级一致

在[官方文档](https://developer.wordpress.org/reference/functions/remove_action/)可以看到这样一句话：

> The exact priority used when adding the original action callback.

添加原始操作回调时使用的确切优先级。

为什么要确切优先级？难道PHP的函数名还能重复吗......抽象