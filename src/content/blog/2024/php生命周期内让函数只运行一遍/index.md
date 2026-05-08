---
categories:
- PHP
- 信息技术
cover: ''
date: '2024-04-17T10:37:22+08:00'
draft: false
slug: php生命周期内让函数只运行一遍
tags:
- function
- PHP
- 全局变量
- 静态变量
title: PHP生命周期内让函数只运行一遍
updated: '2024-04-17T10:37:23+08:00'
wp_id: 9059
---

## 静态变量

通过使用静态变量$isExecuted，实现了只执行一次的效果。静态变量只会在函数第一次调用时初始化，之后的调用都会保留上次调用时的值。

```
function myFunction() {
    static $isExecuted = false;  // 静态变量，初始值为false

    if (!$isExecuted) {
        // 函数的逻辑代码
        echo "这里的代码只会执行一次";

        $isExecuted = true;  // 修改静态变量的值
    }

    echo "这里的代码可以每次都执行";
}

myFunction();  // 输出：这个函数只会执行一次

myFunction();  // 再次调用，不会再执行任何代码
```

## 全局变量

通过使用全局变量$isExecuted，在函数内部判断全局变量的值，从而实现了只执行一次的效果。

因为是全局变量，其他在函数中也能知道是否执行过，甚至可以提前修改全局变量来跳过执行。

```
$isExecuted = false;  // 全局变量，初始值为false

function myFunction() {
    global $isExecuted;  // 使用全局变量

    if (!$isExecuted) {
        // 函数的逻辑代码
        echo "这个函数只会执行一次";

        $isExecuted = true;  // 修改全局变量的值
    }
}

function checkMyFuction(){
    global $isExecuted;  // 使用全局变量

    if ($isExecuted) {
        echo "myFunction执行过了";
    }
}

myFunction();       // 输出：这个函数只会执行一次

myFunction();       // 再次调用，不会再执行任何代码

checkMyFuction();   // 其他函数也能知道是否执行过
```

## 总结

以上两种方法都可以让一个函数只运行一遍。使用静态变量更常见，因为它将变量的作用范围限制在函数内部，避免了全局变量带来的潜在问题。