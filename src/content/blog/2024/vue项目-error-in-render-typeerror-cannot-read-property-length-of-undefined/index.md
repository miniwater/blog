---
categories:
- 信息技术
- HTML
- vue
category: vue
draft: false
published: 2024-05-07 22:41:12
slug: vue项目-error-in-render-typeerror-cannot-read-property-length-of-undefined
tags:
- vue
title: 'vue项目 Error in render: "TypeError: Cannot read property ''length'' of undefined"'
updated: 2024-05-07 22:41:12
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