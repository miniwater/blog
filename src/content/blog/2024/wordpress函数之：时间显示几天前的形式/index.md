---
categories:
- 信息技术
- PHP
- WordPress
category: WordPress
draft: false
published: 2024-05-10 00:01:56
slug: wordpress函数之：时间显示几天前的形式
tags:
- WordPress
- 时间
title: WordPress函数之：时间显示“几天前”的形式
updated: 2024-05-10 00:01:57
---

WordPress使用下面这个函数，在想要调用的地方，可以显示诸如“1周前”、“3个月前”、“6小时前”等形式。

```
//时间格式多久以前  
function timeago($ptime) {  
    $ptime = strtotime($ptime);  
    $etime = time() - $ptime;  
    if ($etime < 1) return '刚刚';  
    $interval = array(  
        12 * 30 * 24 * 60 * 60 => '年前 (' . date('Y-m-d', $ptime) . ')',  
        30 * 24 * 60 * 60 => '个月前 (' . date('m-d', $ptime) . ')',  
        7 * 24 * 60 * 60 => '周前 (' . date('m-d', $ptime) . ')',  
        24 * 60 * 60 => '天前',  
        60 * 60 => '小时前',  
        60 => '分钟前',  
        1 => '秒前'  
    );  
    foreach ($interval as $secs => $str) {  
        $d = $etime / $secs;  
        if ($d >= 1) {  
            $r = round($d);  
            return $r . $str;  
        }  
    };  
}
```

在相应的地方通过如下方式进行调用该函数：

评论时间调用：

```
<?php echo timeago($comment->comment_date_gmt); ?>
```

文章时间调用：

```
<?php echo timeago( get_gmt_from_date(get_the_time('Y-m-d G:i:s')) );?>
```