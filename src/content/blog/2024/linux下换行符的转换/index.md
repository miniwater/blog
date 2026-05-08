---
categories:
- Linux
- 信息技术
cover: ''
date: '2024-05-09T22:32:26+08:00'
draft: false
slug: linux下换行符的转换
tags:
- Linux
- sh
title: Linux下换行符的转换
updated: '2024-05-09T22:32:26+08:00'
wp_id: 9362
---

在Windows下使用文本编辑器写好了一段脚本，拷贝到Linux下运行这个脚本，出现如下报错：

```
/bin/bash^M: bad interpreter: No such file or directory
line 2: $'\r': command not found
```

这个问题主要是Windows和Linux这两个不同的平台换行符不一样导致的。Windows下换行符为“\r\n”，而Linux下换行符为“\n”。

在Linux系统中，可以使用文本编辑器（如vim、nano等）将Windows下的编辑的脚本文件转换为Linux格式。具体方法是在文本编辑器中打开文件，然后将换行符从“\r\n”修改为“\n”。在vim中，可以使用以下命令进行修改：

打开脚本文件：

```
vi test.sh
```

进行格式转换：

```
:set ff=unix
```

保存脚本文件：

```
:wq
```

“set ff=unix”这个命令会将当前文件的换行符从“\r\n”修改为“\n”，这样在Linux下运行从Windows下编辑来的脚本就不会报错了。