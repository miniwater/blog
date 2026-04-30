---
categories:
- 信息技术
- HTML
- PHP
- WordPress
category: WordPress
draft: false
published: 2024-05-08 11:41:54
slug: 简单代码实现-外链跳转安全提示
tags:
- WordPress
- HTML
- PHP
- 外链
title: WordPress 简单代码实现 外链跳转安全提示
updated: 2024-05-08 12:15:40
---

通过代码方式实现知乎那种外链跳转提示

可以自行定制提示页面

目前不清楚对搜索引擎是正收益还是负收益

## 核心代码

使用get传参进行传值，如以下这样

```
www.krjojo.com/link?url=base64网址
```

如果需要把网址直接写到url里面，可以自行小调整实现

```
www.krjojo.com/link/base64网址/
```

### 改写文中所有url地址，进行base64编码

注释掉的那行为url传值，需要自己另外实现方法截取地址请求地址

```
<?php

// 改写文中所有url地址，进行base64编码
add_filter('the_content', function ($content) {
    preg_match_all('/<a(.*?)href="(.*?)"(.*?)>/', $content, $matches);
    if ($matches) {
        foreach ($matches[2] as $val) {
            if (strpos($val, '://') !== false && strpos($val, home_url()) === false && !preg_match('/\.(jpg|jepg|png|ico|bmp|gif|tiff)/i', $val)) {
                $content = str_replace("href=\"$val\"", "href=\"" . home_url() . "/link?url=" . base64_encode($val) . "\"  target=_blank ", $content);
                // $content = str_replace("href=\"$val\"", "href=\"" . home_url() . "/link/" . base64_encode($val) . "\"  target=_blank ", $content);
            }
        }
    }
    return $content;
});
```

### 添加提示页面模板

创建 `link-tempate.php` 模板文件，用于自定义返回页面内容

PHP负责解码base64，获得url地址。

```
<?php
// $link = base64_decode(substr($_SERVER['REQUEST_URI'], strlen('/link/')));
$link = base64_decode($_GET['url'] ?? "");
?>
<!doctype html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name='description' content='您即将离开 手里有只毛毛虫，请注意您的账号财产安全。'>
    <title>手里有只毛毛虫</title>
    <style>
        html {
            background: #f4f5f5;
        }

        #box {
            margin: auto;
            background: #fff;
            padding: 10px 30px;
            margin-top: 10%;
            max-width: 500px;
            box-sizing: border-box;
            border: 1px solid #e5e6eb;
            border-radius: 2px;
        }

        .note {
            font-size: 16px;
            line-height: 20px;
        }

        .link {
            padding: 16px 0 24px;
            border-bottom: 1px solid #e5e6eb;
            position: relative;
            color: gray;
            font-family: "PingFang SC";
            font-size: 14px;
            word-break: break-all;

        }

        .btn-plane {
            text-align: right;
        }

        button {
            margin-top: 20px;
            color: #fff;
            border-radius: 3px;
            border: none;
            background: #007fff;
            height: 32px;
            font-size: 14px;
            padding: 0 14px;
            cursor: pointer;
            outline: 0;
        }

        button a {
            color: #fff;
            text-decoration: none
        }
    </style>
</head>

<body>
    <div id="box">
        <p class="note">您即将离开
            <a href="/" style="text-decoration:none;">
                <?php echo get_bloginfo('name') ?>
            </a>，请注意您的账号财产安全
        </p>
        <p class="link">
            <?php echo $link ?: "发生错误" ?>
        </p>
        <p class="btn-plane">
            <a href="<?php echo $link ?: "/" ?>" rel="nofollow">
                <button>
                    <?php echo $link ? "继续访问" : "返回主页" ?>
                </button>
            </a>
        </p>
    </div>
</body>

</html>
```

### 绑定提示页面模板

绑定外链跳转安全提示页面的模板

`__DIR__ . '/link-tempate.php';` 表示同级目录下的 `link-tempate.php` 文件

```
<?php

// 页面模板添加一个 外链跳转安全提示页面 的选项
add_filter('theme_page_templates', function ($page_templates) {
    $page_templates["link.php"] = '外链跳转安全提示页面';
    return $page_templates;
});

// 打开页面时，如果是我们的模板，则返回模板文件的路径
add_filter('template_include',  function ($template) {
    $template_name = get_post_meta(get_the_ID(), '_wp_page_template', true);

    if ($template_name == 'link.php') {
        return __DIR__ . '/link-tempate.php';
    }
    return $template;
});
```

### 添加页面

以上代码添加后，在后台创建页面的右侧，可以看到选择模板，

把页面模板改为刚刚新建的那个 **外链跳转安全提示页面** ，网址的固定链接改为 link

点击发布，完成