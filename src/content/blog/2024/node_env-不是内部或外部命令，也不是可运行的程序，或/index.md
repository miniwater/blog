---
categories:
- 信息技术
- HTML
- js
category: js
draft: false
published: 2024-04-16 23:45:44
slug: node_env-不是内部或外部命令，也不是可运行的程序，或
tags:
- PowerShell
- js
- nodejs
- npm
title: NODE_ENV 不是内部或外部命令，也不是可运行的程序，或者批处理文件
updated: 2024-04-16 23:45:45
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