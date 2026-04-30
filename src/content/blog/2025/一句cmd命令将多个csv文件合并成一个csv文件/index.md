---
categories:
- 信息技术
- Windows
- PowerShell
category: PowerShell
draft: false
published: 2025-02-18 09:20:02
slug: 一句cmd命令将多个csv文件合并成一个csv文件
tags:
- windows
- CMD
- CSV
- .csv
- 合并
title: 一句CMD命令将多个CSV文件合并成一个CSV文件
updated: 2025-02-18 09:20:03
---

第一步：把要合并的csv文件全部放到同一个目录；

第二步：打开cmd(快捷键win+R)，进入该目录，输入

```
copy *.CSV all.csv
```

表示合并该目录路径下所有csv文件，并将合并文件命名为all.csv

接下来等待几秒钟就完成的，目录下会多出一个合并后的csv文件