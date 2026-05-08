---
categories:
- Git
- 信息技术
cover: ''
date: 2024-10-20T22:07:19+08:00
draft: false
slug: 优雅的解决多人同时修改-git-分支所导致的无用merge信息
tags:
- git
- Merge
- pull
- push
- 分支
title: 优雅的解决多人同时修改 Git 分支所导致的无用merge信息
updated: 2024-10-20T22:08:53+08:00
wp_id: 10121
---

使用 `git push` 时，在发现远端仓库被其他人抢先修改后，可以使用 rebase 方式

把**自己的提交**挂在**其他人的提交**的后面，可以保持历史数据的线性干净

就不会产生杂乱的 merge 信息

```
仓库 -> 别人的提交 -> 自己的提交
```

使用以下命令

```
git pull --rebase
```