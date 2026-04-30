---
categories:
- 信息技术
- Windows
- PowerShell
category: PowerShell
draft: false
published: 2024-01-31 19:24:03
slug: windows批量重命名的技巧
tags:
- windows
- PowerShell
title: Windows批量重命名的技巧
updated: 2024-01-31 19:28:24
---

在Windows自带的文件管理器里，多选文件，按 F2 键，输入新的文件名，比如 1 ，然后回车。

你会发现神奇的空格加括号加数字：

```
1 (1).jpg
1 (2).jpg
1 (3).jpg
1 (4).jpg
1 (5).jpg
1 (6).jpg
1 (7).jpg
1 (8).jpg
1 (9).jpg
1 (10).jpg
1 (11).jpg
1 (12).jpg
1 (13).jpg
1 (14).jpg
1 (15).jpg
1 (16).jpg
1 (17).jpg
1 (18).jpg
1 (19).jpg
1 (20).jpg
1 (21).jpg
1 (22).jpg
1 (23).jpg
```

EMMM.....

明明Mac上自带的功能到Windows上却缺失。

## 解决办法

使用 PowerShell 命令

PowerShell 进入需要重命名的目录

输入：

```
$i = 1
Get-ChildItem *.jpg | ForEach-Object {
  Rename-Item $_ -NewName "$i.jpg"
  $i++
}
```

就可以把所有 .jpg文件批量重命名成 1.jpg 2.jpg 3.jpg 顺序了，如果需要修改其他文件只需要把上面**两个** `jpg` 替换成其他文件后缀。

```
1.jpg
2.jpg
3.jpg
4.jpg
5.jpg
6.jpg
7.jpg
8.jpg
9.jpg
10.jpg
11.jpg
12.jpg
13.jpg
14.jpg
15.jpg
16.jpg
17.jpg
18.jpg
19.jpg
20.jpg
21.jpg
22.jpg
23.jpg
```

效果立竿见影