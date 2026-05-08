---
categories:
- 信息技术
cover: ''
date: '2024-05-09T23:32:49+08:00'
draft: false
slug: ffmpeg-常用命令
tags:
- ffmpeg
- 视频
title: ffmpeg 常用命令
updated: '2024-05-09T23:32:49+08:00'
wp_id: 9386
---

最近在整理一些视频，需要发布到网站，视频需要通过ffmpeg进行压缩、切片、加水印等，自学了几天，总结了自己常用的一些命令，方便日后查询。

**1、转换视频格式：**

要转mov格式的视频转换为mp4格式的视频，运行：

```
$ ffmpeg -i input.mov output.mp4
```

或者：

```
$ ffmpeg -i input.mov -vcodec copy -acodec copy output.mp4
```

-vcodec copy -acodec copy表示复制输入文件中的视频流和音频流到输出文件，不重新进行编码，这样转换格式速度更快。

格式转换时还可以指定音频编码，将视频编码保持不变：

```
$ ffmpeg -i input.mov -c:v copy -c:a flac output.mm4
```

转换格式时，音频和视频编码都不变：

```
$ ffmpeg -i input.mov -c:v copy -c:a copy output.mm4
```

-c:v copy 表示复制输入文件中的视频流到输出文件，不重新进行编码

-c:a copy 表示复制输入文件中的音频流到输出文件，不重新进行编码

**2、修改视频文件的分辨率：**

如果你想将一个较大分辨率的视频转换为较小分辨率的视频，以使用下面的命令：

```
$ ffmpeg -i input.mp4 -filter:v scale=1280:720 -c:a copy output.mp4
$ ffmpeg -i input.mp4 -filter:v scale=-1:720 -c:a copy output.mp4
```

scale=-1:720中的-1表示：通过指定的高度720来自动计算宽度，可以有效维持原来的比例。

还可以这样指定分辨率：

```
$ ffmpeg -i input.mp4 -s 1280x720 -c:a copy output.mp4
```

上面的命令将指定视频分辨率调整到1280×720。

类似地，将视频转换到640×480大小：

```
$ ffmpeg -i input.mp4 -filter:v scale=640:480 -c:a copy output.mp4
```

或者：

```
$ ffmpeg -i input.mp4 -s 640x480 -c:a copy output.mp4
```

**3、压缩视频文件：**

下面的命令可以将视频进行压缩，减小视频文件的所占空间的大小。

```
$ ffmpeg -i input.mp4 -vf scale=1280:-1 -c:v libx264 -preset veryslow -crf 24 output.mp4
```

-crf -表示视频质量，范围0-51，其中0为无损，默认为23，最坏为51。

你也可以通过下面的选项来转换编码音频降低比特率，使其有立体声感，从而减小大小。

-ac 2 -c:a aac -strict -2 -b:a 128k

**4、压缩音频文件：**

如将一个320 kbps比特率的音频文件压缩到128kbps：

```
$ ffmpeg -i input.mp3 -ab 128 output.mp3
```

各种各样可用的音频比特率列表是：96kbps、112kbps、128kbps、160kbps、192kbps、256kbps、320kbps。

**5、将视频进行角度旋转：**

我们用手机拍摄视频时，视频的角度可能不对，如放到电脑上看，发现右转了90度，此时可以用下面的命令进行调整角度：

```
$ ffmpeg -i input.mp4 -vf "transpose=2" output.mp4
```

transpose=0 -逆时针旋转90度，垂直翻转。这也是默认设置。

transpose=1 -顺时针旋转90度。

transpose=2 -逆时针旋转90度。

transpose=3 -顺时针旋转90度，垂直翻转。

hflip -水平翻转视频画面

vflip -垂直翻转视频画面

如要水平翻转视频画面一个视频（和照镜子一样）：

```
$ ffmpeg -i input.mp4 -vf hflip output.mp4
```

**6、去除视频中的音频：**

如果你不需要视频文件中的音频，可以使用如下命令：

```
$ ffmpeg -i input.mp4 -an output.mp4
```

-an 表示不录制音频。

**7、提取视频中的音频：**

下面的命令将从指定媒体文件中移除视频，仅保留音频。

```
$ ffmpeg -i input.mp4 -vn output.mp3
```

你也可以使用 -ab 标志来指出输出文件的比特率，如下面的示例所示。

```
$ ffmpeg -i input.mp4 -vn -ab 320 output.mp3
```

**8、将视频转为音频并编码：**

```
$ ffmpeg -i input.mp4 -vn -ar 44100 -ac 2 -ab 320 -f mp3 output.mp3
```

-vn – 表明我们已经在输出文件中禁用视频录制。

-ar – 设置输出文件的音频频率。通常使用的值是22050 Hz、44100 Hz、48000 Hz。

-ac – 设置音频通道的数目。

-ab – 表明音频比特率。

-f – 输出文件格式。在我们的实例中，它是 mp3 格式。

**9、裁剪视频：**

ffmpeg允许以我们选择的任何范围裁剪一个给定的媒体文件。裁剪一个视频文件的语法如下给定：

```
$ ffmpeg -i input.mp4 -filter:v "crop=w:h:x:y" output.mp4
```

-filter:v – 表示视频过滤器。

crop – 表示裁剪过滤器。

w – 我们想自源视频中裁剪的矩形的宽度。

h – 矩形的高度。

x – 我们想自源视频中裁剪的矩形的 x 坐标 。

y – 矩形的 y 坐标。

比如说你想要一个来自视频的位置 (200,150)，且具有 640 像素宽度和 480 像素高度的视频，命令应该是：

```
$ ffmpeg -i input.mp4 -filter:v "crop=640:480:200:150" output.mp4
```

**10、使用开始和停止时间截取一段媒体文件：**

可以使用开始和停止时间来剪下一段视频为小段剪辑，我们可以使用下面的命令:

```
$ ffmpeg -i input.mp4 -ss 00:00:50 -codec copy -t 50 output.mp4
```

–ss – 表示视频剪辑的开始时间。在我们的示例中，开始时间是第 50 秒。

-t – 表示总的持续时间。

类似地，我们可以像下面剪下音频。

```
$ ffmpeg -i audio.mp3 -ss 00:01:54 -to 00:06:53 -c copy output.mp3
```

**11、剪分视频文件为多个部分：**

一些网站将仅允许你上传具体指定大小的视频。在这样的情况下，你可以切分大的视频文件到多个较小的部分，像下面：

```
$ ffmpeg -i input.mp4 -t 00:00:30 -c copy part1.mp4 -ss 00:00:30 -codec copy part2.mp4
```

-t 00:00:30 表示从视频的开始到视频的第 30 秒创建一部分视频。

-ss 00:00:30 为视频的下一部分显示开始时间戳。它意味着第 2 部分将从第 30 秒开始，并将持续到原始视频文件的结尾。

**12、将多个视频合并为一个视频：**

创建一个文本文件，如join.txt，里面包含需要拼接的各部分视频（指定严格的路径），如下面：

```
file ‘/path/to/part1.mp4’
file ‘/path/to/part2.mp4’
file ‘/path/to/part3.mp4’
file ‘/path/to/part4.mp4’
```

然后使用如下命令进行合并：

```
$ ffmpeg -f concat -i join.txt -c copy output.mp4
```

如果报错，加上参数-safe 0：

```
$ ffmpeg -f concat -safe 0 -i join.txt -c copy output.mp4
```

**13、添加字幕到一个视频文件：**

```
$ ffmpeg -i input.mp4 -i subtitle.srt -map 0 -map 1 -c copy -c:v libx264 -crf 23 -preset veryfast output.mp4
```

**14、用黑边填充视频，通过自动添加黑边来保持原视频画面比例：**

一个视频是720:1280的，要改为1280:720，但按这个视频的比例来计算，最优方式是指定高为720，则宽按比例将是405，要转成1280:720，为防止拉伸变形，左右窄了，就必须用黑边进行填充，可以这样：

```
$ ffmpeg -i input.mp4 -vf "scale=405:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black" output.mp4
```

405:720是按720:1280的比例计算出的，1280:720是要转成的目标长宽。这个命令实际执行了2步操作，先将原视频按比例绽放为405:720，再给缩放的视频加黑边填充达到1280:720。

注1：ow-iw：1280-405/2=437.5 （output width – input width）/2 左右填充的宽度  
注2：oh-ih：720-720=0 （output height – input height）/2 上下填充的高度  
该效果由 -vf 选项的 pad 参数指定，可以根据情况自行修改。

**15、将视频进行ts切片：**

将一个完整的mp4文件切片成ts，便于网络播放，可以使用如下命令：

```
$ ffmpeg -i inputt.mp4 -force_key_frames "expr:gte(t,n_forced*1)" -strict -2 -c:a aac -c:v libx264 -hls_time 5 -f hls output.m3u8
```

-force\_key\_frames "expr:gte(t,n\_forced\*1)" -表示强制每1秒一个关键帧，可有效保证切片指定时间的准确性。

strict -2 -是为了使用aac音频编码

**16、给视频文件加水印:**

ts切片时同步加上logo水印

```
$ ffmpeg -i inputt.mp4 -i /path/to/logo.png -filter_complex overlay=W-w:H-h -force_key_frames "expr:gte(t,n_forced*1)" -strict -2 -c:a aac -c:v libx264 -hls_time 13 -f hls output.m3u8
```

也可以给视频加图片水印

```
$ ffmpeg -i input.mp4 -i /path/to/logo.png -filter_complex overlay=W-w:H-h output.mp4
```

还可以给视频加文字水印：

```
$ ffmpeg -i input.mp4 -vf "drawtext=fontfile=simhei.ttf: text=This is a Text Example:x=10:y=10:fontsize=24:fontcolor=white:shadowy=2" output.mp4
```

Logo在左上角：  
ffmpeg -i input.mp4 -i logo.png -filter\_complex overlay output.mp4  
Logo右上角：  
ffmpeg -i input.mp4 -i logo.png -filter\_complex overlay=W-w output.mp4  
Logo左下角：  
ffmpeg -i input.mp4 -i logo.png -filter\_complex overlay=0:H-h output.mp4  
Logo右下角：  
ffmpeg -i input.mp4 -i logo.png -filter\_complex overlay=W-w:H-h output.mp4

一个例子，切片ts时加图片水印到右下角，切片起始编码为1，切片时长2秒，m3u8记录全部ts索引，ts存储到/path/to/下，以name-001.ts形式命名：

```
$ ffmpeg -i input.mp4 -i /path/to/logo.png -filter_complex overlay=W-w:H-h -start_number 1 -hls_list_size 0 -force_key_frames "expr:gte(t,n_forced*1)" -strict -2 -c:a aac -c:v libx264 -hls_time 2 -f hls -hls_segment_filename /path/to/name-%03d.ts /path/to/index.m3u8
```

-hls\_list\_size -为0添加所在ts索引，数默认为5。  
-start\_number -切片起始编码  
- hls\_time -ts -切片时长  
-hls\_segment\_filename -指定切片文件路径及名字，%03d表示以3位数格式进行编号，如name-001.ts。