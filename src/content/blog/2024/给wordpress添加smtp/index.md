---
categories:
- PHP
cover: ''
date: '2024-01-08T23:25:23+08:00'
draft: false
slug: 给wordpress添加smtp
tags:
- smtp
- WordPress
- 邮件
title: 给Wordpress添加smtp
updated: '2024-01-08T23:37:39+08:00'
wp_id: 1001
---

SMTP邮件功能在WordPress中是很常用的功能， 虽然WordPress自带了mail函数，但用自带mail函数发送邮件很容易失败或者被拒收。

特别是阿里云，直接把25端口封了，防火墙甚至一点提示都没有，你都不知道这端口根本不通！

可以尝试解封25端口

1. 登录后
2. 右上角头像-安全管控
3. 左侧-业务申请-25端口解封
4. 右上角-25端口解封申请

> 你还得承诺以下内容：
>
> 我/我公司承诺并保证TCP 25端口仅用来连接第三方的SMTP服务器，从第三方的SMTP服务器外发邮件。如发现您使用本机IP直接SMTP发送邮件，有权永久性封禁TCP 25端口，并不再提供相关服务。

可以说就算解封也不给你发邮件，最后寻求其他方法。

---

除了使用 **WP Mail SMTP** 插件，还可以通过添加php代码方式。

首先将下面代码修改后复制到functions.php文件，再测试发送邮件功能。

也可以将内容添加到php扩展代码插件，如 **WPCode Lite**

```
<?php
function mail_smtp( $phpmailer ) {
    $phpmailer->FromName = '我的网站名'; //发件人名称
    $phpmailer->Host = 'smtp.qq.com'; //修改为你使用的邮箱SMTP服务器
    $phpmailer->Port = 465; //SMTP端口
    $phpmailer->Username = 'xxx@qq.com'; //邮箱账户
    $phpmailer->Password = 'xxx'; //邮箱授权码（此处填写QQ邮箱生成的授权码）
    $phpmailer->From = 'xxx@qq.com'; //邮箱账户
    $phpmailer->SMTPAuth = true;
    $phpmailer->SMTPSecure = 'ssl'; //tls or ssl （port=25时->留空，465时->ssl）
    $phpmailer->IsSMTP();
}
add_action('phpmailer_init', 'mail_smtp');
```

搭配 **Contact Form 7** 使用