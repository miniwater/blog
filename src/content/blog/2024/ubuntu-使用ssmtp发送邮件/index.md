---
categories:
- Linux
- Ubuntu
- 信息技术
cover: ''
date: 2024-05-09T22:55:05+08:00
draft: false
slug: ubuntu-使用ssmtp发送邮件
tags:
- Email
- Linux
- smtp
- ssmtp
- Ubuntu
- 邮件
title: Ubuntu 使用ssmtp发送邮件
updated: 2024-05-09T22:55:05+08:00
wp_id: 9376
---

我在ubuntu系统中需要用到smtp来发送邮件进行数据库的备件，以前在centos下安装mailx简单配置一下smtp就能正常发送邮件，但是现在使用了Ubuntu 20.04，不能照搬Centos中的配置方法了。

经过尝试，可以安装ssmtp来使用第三方的SMTP服务向外发送邮件，具体方法如下。

1、安装好的Ubuntu20.04中可能已经自带了邮件系统，先删除它们：

```
apt autoremove postfix
apt autoremove sendmail
```

2、安装我们需要的ssmtp和mailutils：

```
apt install ssmtp mailutils
```

3、编辑ssmtp的配置文件：

```
vi /etc/ssmtp/ssmtp.conf
```

我主要修改的配置项如下：

```
root=address@mail.com
mailhub=smtp.exmail.qq.com
hostname=服务器名
AuthUser=address@mail.com
AuthPass=邮箱密码
```

上面的配置默认使用25端口，很多服务器默认关闭了25端口，导致不能发出去邮件。此时就需要使用TLS来发信，比如我使用的阿里云的邮件推送，TLS端口为465，那么配置就要修改为：

```
root=address@mail.com
mailhub=smtpdm.aliyun.com:465
hostname=服务器名
AuthUser=address@mail.com
AuthPass=邮箱密码
UseTLS=Yes
AuthMethod=LOGIN
FromLineOverride=yes
rewriteDomain=mail.com
```

详细的配置文件说明请移步这里：https://wiki.debian.org/sSMTP 或 https://wiki.archlinux.org/title/SSMTP。

4、发送邮件测试：

```
# 不带附件发邮件：
echo "This is a email content." | mail -s "Email Title" to@mail.com
# 带附件发送邮件（注意在Ubuntu下附件使用附件参数-A，与Centos中的-a不同，注意大小写）：
echo "This is a email content." | mail -s "Email Title" -A /path/to/test.gz to@mail.com
# 要显示回复邮箱地址，加上-r参数，该邮箱可以为任意指定邮箱：
echo "This is a email content." | mail -s "Email Title" -r from@mail.com to@mail.com
# 指定发件人名字和发件人邮箱地址（与配置中的邮箱地址一致），避免以root@hostname的来显示发件人名字
echo "This is a email content." | mail -s "Email Title" -a "From: Someone <from@mail.com>" to@mail.com
```

5、问题处理：

若发送邮件有如下提示：

```
mail: cannot send message: Process exited with a non-zero status
```

查看错误日志，cat /var/log/mail.err，也有如下信息：

```
sSMTP[1234]: 501 mail from address must be same as auth orization user
```

则需要到/etc/ssmtp/revaliases配置文件中对发件人、服务器地址和端口进行指明，添加如下部分:

```
root:from@mail.com:smtp.exmail.qq.com
ubuntu:from@mail.com:smtp.exmail.qq.com
```

如果使用TLS发信，/etc/ssmtp/revaliases里的配置也需要变更一下端口到465：

```
root:address@mail.com:smtpdm.aliyun.com:465
ubuntu:address@mail.com:smtpdm.aliyun.com:465
```

发送邮件的日志和记录可以在/var/log/mail.log中查看。