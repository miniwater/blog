---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: '2025-12-05T11:23:38+08:00'
draft: false
slug: wordpress-6-9-更新后-smtp-邮件发送失效解决办法
tags:
- smtp
- WordPress
- 邮件
title: WordPress 6.9 更新后 SMTP 邮件发送失效解决办法
updated: '2025-12-07T11:09:15+08:00'
wp_id: 12474
---

在 WordPress 6.9 版本之前，简单配置SMTP服务是这样的。

以QQ邮箱代发为例：

```
add_action('phpmailer_init', function ($phpmailer) {
    $phpmailer->FromName = '手里有只毛毛虫'; //发件人名称
    $phpmailer->Host = 'smtp.qq.com';
    $phpmailer->Port = '465';
    $phpmailer->Username = 'krjojo@qq.com'; //发件人邮箱
    $phpmailer->Password = 'Password'; //发件人密码
    $phpmailer->From = 'krjojo@qq.com'; //发件人邮箱
    $phpmailer->SMTPAuth = true;
    $phpmailer->SMTPSecure = 'ssl';
    $phpmailer->IsSMTP();
});
```

而6.9版本对 `wp_mail（）` 函数进行了改动，变成扩展的方式设置发送地址。

更新文档：[Improved Email Handling and Inline Image Support](https://make.wordpress.org/core/2025/11/25/wordpress-6-9-field-guide/#improved-email-handling-and-inline-image-support)

新版导致的错误：

```
wordpress@krjojo.com : MAIL FROM command failed,Mail from address must be same as authorization user. ,501, SMTP 服务器错误：MAIL FROM command failed 详情：Mail from address must be same as authorization user. SMTP 代码：501
```

要恢复正常，需要追加以下设置

```
add_filter('wp_mail_from', function () {
    return 'krjojo@qq.com'; //发件人邮箱
});
```