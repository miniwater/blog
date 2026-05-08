---
categories:
- PHP
- 信息技术
cover: ''
date: 2026-04-24T00:00:34+08:00
draft: false
slug: php-利用imagemagick实现多页pdf转一张图片
tags:
- Ghostscript
- ImageMagick
- JPG
- PDF
- PDF转图片
- PHP
title: PHP 利用ImageMagick实现多页PDF转一张图片
updated: 2026-04-24T00:00:36+08:00
wp_id: 12860
---

## 需求

最近业务需要，需要在后端生成一张图片报告，思来想去，发现先生成规整的pdf后，再把pdf转成图片会轻松不少。

目前网上的教程都是每页pdf单独转一张jpg，而需求是所有页面合并成一张图片。

搜了网上不少教程，都是一页转一张，这次把合并的空白补上

## 准备工作

* 准备一份pdf文件
* 安装ImageMagick php扩展
* 安装Ghostscript

> **为什么要装Ghostscript？**
>
>
>
> PHP 本身并没有能力阅读 PDF，需借助第三方程序 Ghostscript

> **为什么偏偏Ghostscript，而不是其他第三方工具？**
>
>
>
> ImageMagick 处理 PDF时，默认设置调用的就是 Ghostscript。同理：
>
>
>
> * 处理 JPG，调用的是 libjpeg。
> * 处理 PNG，调用的是 libpng。

### Ghostscript(linux版要注意)

检查 ImageMagick 的安全策略。找到 `/etc/ImageMagick-6/policy.xml` 或 `/etc/ImageMagick/policy.xml` 。

确保放开读写权限

```
<policy domain="coder" rights="none" pattern="PDF" />
<!-- 改为 -->
<policy domain="coder" rights="read|write" pattern="PDF" />
```

测试是否生效

```
identify /root/pdf路径.pdf
```

改完策略要重启php-fpm服务，注意替换php版本

```
/etc/init.d/php-fpm-84 restart
```

## 实现

处理逻辑：

1. 把PDF每一页单独生成图片，再把每张图片拼接起来。
2. 每张图片间隙设置负数，消除pdf页脚的空白。
3. 把图片四周白边消除，防止最后一页PDF未满的情况下，给图片底部留下大量空白。
4. 再重新为图片生成白色边框，与背景色融为一体。

```
// pdf路径
$pdf_path = 'D:\example_bookmarks.pdf';

// 输出图片时的路径
$output_path = 'D:\example_bookmarks.jpg';

// 拼接pdf时，减去上一页页脚的缝隙
$gap = 100;

// 图片四周留白宽度
$padding = 100;

try {
    // 1. 获取 PDF 的总页数
    $imInfo = new \Imagick();
    // 仅读取元数据获取总页数
    $imInfo->pingImage($pdf_path);
    $total_pages = $imInfo->getNumberImages();
    $imInfo->clear();

    if ($total_pages === 0) {
        throw new \Exception("无法识别 PDF 或文件为空");
    }

    $processed_images = [];
    $canvas_width = 0;
    $canvas_height = 0;

    // 逐页渲染
    for ($i = 0; $i < $total_pages; $i++) {
        $page = new \Imagick();
        $page->setResolution(150, 150);

        // 只渲染第 i 页
        $page->readImage($pdf_path . '[' . $i . ']');

        // 处理背景色和透明度
        $page->setImageBackgroundColor('white');
        $page->setImageAlphaChannel(\Imagick::ALPHACHANNEL_REMOVE);
        $page->mergeImageLayers(\Imagick::LAYERMETHOD_FLATTEN);

        // 转为 JPG 兼容格式
        $page->setImageFormat('jpg');

        // 统计最终画布需要的尺寸
        $canvas_height += $page->getImageHeight();
        $canvas_width = max($canvas_width, $page->getImageWidth());

        $processed_images[] = $page;
    }

    // 创建一张能容纳所有页的长图画布
    $canvas = new \Imagick();
    $canvas->newImage($canvas_width, $canvas_height, 'white');
    $canvas->setImageFormat('jpg');

    // 依次拼接
    $current_y = 0;
    foreach ($processed_images as $single_page) {
        $canvas->compositeImage($single_page, \Imagick::COMPOSITE_OVER, 0, $current_y);

        // 减去上一页页脚的缝隙
        $current_y += $single_page->getImageHeight() - $gap;

        // 贴完一页释放一页
        $single_page->clear();
    }

    // 自动切除整张长图四周的空白（包括底部没填满的部分）
    $canvas->trimImage(0);

    // 重置偏移，否则导出的 JPG 可能会有黑边或尺寸异常
    $canvas->setImagePage(0, 0, 0, 0);

    // 重新添加边框
    $canvas->borderImage('white', $padding, $padding);

    // 再加一次合并，更干净
    $canvas->mergeImageLayers(\Imagick::LAYERMETHOD_FLATTEN);

    // 保存结果
    $canvas->setImageCompressionQuality(90);
    $canvas->writeImage($output_path);

    // 彻底释放
    $canvas->clear();

    echo "成功合并 $total_pages 页 PDF。";
} catch (\Exception $e) {
    echo "渲染失败: " . $e->getMessage();
}
```