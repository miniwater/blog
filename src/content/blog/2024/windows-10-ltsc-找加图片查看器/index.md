---
categories:
- Windows
- 信息技术
cover: ''
date: 2024-05-09T23:30:20+08:00
draft: false
slug: windows-10-ltsc-找加图片查看器
tags:
- LTSC
- Win10
- windows
- 图片
title: Windows 10 LTSC 找加图片查看器
updated: 2024-05-09T23:30:21+08:00
wp_id: 9384
---

今天安装了windows 10 LTSC版本的系统，发现不能直接查看图片，只能用画图查看，非常的不方便，网上搜索一番，发现处理方法很简单，就是修改一下注册表，因为LTSC版本自带有图片查看功能，只是精简后取消了这个功能，但可以通过修改注册表的方式找回这个图片查看器。

去注册表找相关内容太麻烦了，直接复制如下代码，保存为bat格式，以管理员运行即可。

```
echo 恢复Win10照片查看器

reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".jpg" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f

reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".jpeg" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f

reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".bmp" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f

reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".png" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f

echo 请双击或右击图片，选择“照片查看器”即可

pause
```

完成上述操作后，右键点图片，选择打开方式就有“图片查看器”了，相关的图片格式都指定为默认打开方式即可，下次就不用右键选择打开方式了。