---
categories:
- 信息技术
- Windows
- 安全
category: 安全
draft: false
published: 2024-07-24 19:55:20
slug: 微软系统近期大规模蓝屏原因以及解决方法
tags:
- 微软
- Microsoft
- 蓝屏
- CrowdStrike
- Microsoft 365
title: 微软系统近期大规模蓝屏原因以及解决方法
updated: 2024-09-18 11:06:13
---

## 蓝屏的原因

因为视窗操作系统中安装了Microsoft 365软件，然后碰巧又安装了Crowdstrike杀毒软件，然后这两款软件产生冲突导致Microsoft 365服务出现问题然后导致了循环性蓝屏

（系统镜像只分原版跟非原版，不分盗版和正版，所谓的盗版和正版只不过是激活密钥授权问题而已，所以该蓝屏还是得蓝屏）

## 为什么Crowdstrike杀毒软件会造成对微软的365软件冲突

~~是因为在系统蓝屏前些日子Crowdstrike杀毒软件公司聘请了位临时程序员，然后这位程序员误操作写出了这严重性的bug~~

**这是谣言**！！！

营销号消息来源：<https://x.com/vinceflibustier>

一个喜欢讲笑话的博主，假装承认是自己干的坏事，结果营销号看都不看直接当真了。

澄清原文：<https://x.com/vinceflibustier/status/1814395720025419832>

> How I broke the internet today and what lessons can we learn from it?
>
>
>
> Several things that make it a good fake that worked:
>
>
>
> 1. No culprit named yet, I bring it on a platter, people like to have a culprit. 2- The culprit seems completely stupid, he is proud of his stupidity, he... takes his afternoon off on... the first day of work... 3- This falls right into a huge buzz in which people absolutely need to have new information, and a fake is by nature new, you won't read it anywhere else 4- In English = very easy to share internationally, with the vast majority of people who have no idea who I am. 5- Baby fingers are stupid, but they distract people from other things (like the fact that I have a horn on my head because of bad clipping) 6- Confirmation bias: People want to believe it, it's so funny. “I like the information, so it is true.” 7- The information is pushed ironically by people who know that it is a joke, and then it arrives in the litteral zone which amplifies it even stronger.
>
>
>
> 我今天是如何打破互联网的，我们可以从中吸取什么教训？
>
>
>
> 有几件事使它成为一个有效的好假货：
>
>
>
> 1.还没有说出罪魁祸首的名字，我把它放在盘子里，人们喜欢有罪魁祸首。
>
>
>
> 2-罪魁祸首似乎完全愚蠢，他为自己的愚蠢感到自豪，他...下午休息一下......上班的第一天...
>
>
>
> 3-这正好陷入了一个巨大的嗡嗡声，人们绝对需要获得新信息，而假货本质上是新的，你不会在其他任何地方读到它
>
>
>
> 4- 英语=很容易在国际上分享，与绝大多数不知道我是谁的人分享。
>
>
>
> 5- 婴儿手指很愚蠢，但它们会分散人们对其他事情的注意力（比如我头上有一个角，因为剪得不好）
>
>
>
> 6-确认偏差：人们愿意相信它，这太有趣了。“我喜欢这些信息，所以这是真的。”
>
>
>
> 7- 具有讽刺意味的是，这些信息是由那些知道这是一个笑话的人推送的，然后它到达了垃圾区，这更加强烈地放大了它。

## 怎么解決

启动Windows进入安全模式或者Windows恢复环境（WINRE）

然后进入目录“C:WindowslSystem32ldrivers\CrowdStrike”找到目录

并删除与“C-00000291\*sys”匹配的文件然后重新启动电脑即可恢复