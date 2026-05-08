---
categories:
- HTML
- vue
- 信息技术
cover: ''
date: 2024-05-07T22:41:12+08:00
draft: false
slug: vue项目-error-in-render-typeerror-cannot-read-property-length-of-undefined
tags:
- vue
title: 'vue项目 Error in render: "TypeError: Cannot read property ''length'' of undefined"'
updated: 2024-05-07T22:41:12+08:00
wp_id: 9320
---

**[摘要]**

报错：Error in render: "TypeError: Cannot read property 'l […]

```
报错：Error in render: "TypeError: Cannot read property 'length' of undefined"
```

解决办法：

```
shopListData.attrs !== undefined && shopListData.attrs.length >0
```