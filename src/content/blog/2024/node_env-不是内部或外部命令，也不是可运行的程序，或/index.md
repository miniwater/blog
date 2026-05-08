---
categories:
- HTML
- js
- 信息技术
cover: ''
date: 2024-04-16T23:45:44+08:00
draft: false
slug: node_env-不是内部或外部命令，也不是可运行的程序，或
tags:
- js
- nodejs
- npm
- PowerShell
title: NODE_ENV 不是内部或外部命令，也不是可运行的程序，或者批处理文件
updated: 2024-04-16T23:45:45+08:00
wp_id: 9056
---

## 环境

```
win10+powershell
```

## 问题

运行 `npm run build:prod` 或 `npm run build:dev` 会报错

错误如下

```
'NODE_ENV' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

查看 package.json 文件

```
"scripts": {
  "build:dev": "NODE_ENV=development gulp build",
  "build:prod": "NODE_ENV=production gulp build",
  "dev": "NODE_ENV=development gulp build && NODE_ENV=development gulp playground && NODE_ENV=development gulp server",
  "prod": "NODE_ENV=production gulp playground && NODE_ENV=production gulp server",
  "lint": "eslint .",
  "test": "npm run lint && npm run build:dev"
},
```

## 解决办法

Windows不支持这种写法，最好换成Linux

或者拆分两条脚本

```
"scripts": {
  "build:dev": "set NODE_ENV=development && gulp build",
  "build:prod": "set NODE_ENV=production && gulp build",
},
```