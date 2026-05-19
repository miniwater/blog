---
categories:
- WordPress
- 博客
cover: ''
date: 2026-05-17T21:27:14+08:00
draft: true
slug: 全站静态-从wordpress迁移astro
tags:
- WordPress
- 博客
- Astro
- 迁移
- 静态
title: 全站静态 从wordpress迁移astro
updated: 2026-05-17T21:27:14+08:00
---

## 前因

人闲的

## 迁移

- [ ] 页面迁移
  - [x] `post`文章页
    - [x] 数据同步
    - 分页路径发生改变
  - [x] `tag`标签页
  - [x] `category`分类页
  - [x] `docs`文档页
    - [x] 数据同步
  - ~~[ ] `sentences`一言~~
  - [x] `games`游戏库
  - [x] `about`关于我
  - [x] `links`友情链接
    - [ ] 友情申请
  - [ ] `rss-aggregator`RSS 聚合
  - [x] `track`我的足迹
  - ~~[ ] `archives`时间归档~~
  - ~~[ ] `monitor`服务监控~~
  - ~~[ ] `nav`网址导航~~
  - [x] `contact`联系我们
  - [x] `privacy`隐私政策
  - ~~[ ] `music`音乐~~
  - ~~[ ] `gallery`随手一拍~~
- [ ] 评论迁移

## 更变事项

分页发生变化

第一页相同`/post`，后续发生变化，原本`/post/page/2`，现在`/post/2`。

影响范围

- `/post`
- `/category/*`
- `/tag/*`

网站地图发生变化

原本`/sitemap.xml`、`/sitemap_index.xml`，现在`/sitemap-index.xml`

rss订阅发生变化

原本`/feed`、`/rss`，现在`/feed.xml`
