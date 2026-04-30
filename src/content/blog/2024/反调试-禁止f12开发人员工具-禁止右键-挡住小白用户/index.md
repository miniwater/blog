---
categories:
- 信息技术
- HTML
- PHP
- WordPress
category: WordPress
draft: false
published: 2024-10-27 21:47:44
slug: 反调试-禁止f12开发人员工具-禁止右键-挡住小白用户
tags:
- F12
- 开发人员工具
title: 反调试 禁止F12开发人员工具 禁止右键 挡住小白用户 让专业绕路
updated: 2025-11-25 11:36:43
---

今天在网上冲浪时发现一个有趣的功能，

某个网站一检测到用户打开了开发人员工具，也就是F12，就会跳转到百度，跳转百度就算了，居然还带搜索网站名称。

而且不是原始那种检测浏览器和页面宽度，哪怕独立打开开发人员工具窗口也能被识别到。

这不妥妥走歪路给自己刷百度权重吗。

虽然不知道这种重定向会不会真能刷百度，毕竟请求头有一个大大的 referer 。

下面是破解思路，在进入那个网站前，先开启开发人员工具，源代码，事件侦听器断点，勾选脚本

![](./开发人员工具.avif)

然后再进入网站

当你看到这个界面时，就说明你已经进来了，

![](./开发人员工具2.avif)

此时已经加载完 html 文件，并开始尝试执行第一个js语句。

大致检查这段代码是不是用来检测用户的开发人员工具，从图中看起来不是。

然后我们可以点击右上角三角形继续往下执行js。

一路直到发现问题。

![](./开发人员工具3.avif)

嗯？这是什么玩具

贴出来给大家参考一下

```
// 检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// 检测是否为 Retina 显示屏
function isRetinaDisplay() {
    return window.matchMedia && (window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches || window.devicePixelRatio >= 2);
}
// 通过比较窗口内外宽高差值，来检测开发者工具是否打开
function isDevToolsOpen() {
    return (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) && (document.documentElement.clientWidth < window.innerWidth || document.documentElement.clientHeight < window.innerHeight);
}
// 当检测到开发者工具状态改变时，触发 devtoolschange 事件并传递当前状态和方向。
function emitEvent(isOpen, orientation) {
    globalThis.dispatchEvent(new globalThis.CustomEvent('devtoolschange', {
        detail: { isOpen, orientation }
    }));
}
// 检测开发者工具的打开方向是 垂直 还是 水平 
function detectOrientation() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    const orientation = widthThreshold ? 'vertical' : 'horizontal';

    return { isOpen: widthThreshold || heightThreshold, orientation };
}

function main() {
    if (isMobileDevice() && !localStorage.getItem("wccp_was_desktop_with_div_tools")) return;

    const { isOpen, orientation } = detectOrientation();

    if (isOpen !== devtools.isOpen || orientation !== devtools.orientation) {
        emitEvent(isOpen, orientation);
    }

    devtools.isOpen = isOpen;
    devtools.orientation = orientation;
}

const devtools = {
    isOpen: false,
    orientation: undefined,
};

// Initial check
if (isDevToolsOpen()) {
    console.log("开发者工具已打开");
} else {
    console.log("开发者工具未打开");
}

main();
setInterval(main, 500);

export default devtools;
```

其实这种检测方式并不准确，

因为一旦用户打开了独立的开发人员工具，这种计算内外差的方式就会失效

提供一个简单解法思路。

![](./开发人员工具4.avif)

开发人员工具独立页面

当然这网站水平肯定不止这么低级，识别代码不止这一处。

我们选择三角形右边的一个，跳过按钮，跳过当前js

跳过，意味着js不执行

![](./开发人员工具5.avif)

继续往下走

然后发现，嗯？怎么就到百度了

![](./开发人员工具6.avif)

不对劲，我就全文搜索了baidu.com

然后我在第一个html页发现了这个

![](./开发人员工具7.avif)

这是什么新奇玩意

```
<script disable-devtool-auto src='https://huliku.com/wp-content/themes/zbfox/js/huliku-disable-devtool'
        md5='boolean' url='https://www.baidu.com/s?wd=xxx' tk-name='ddtk' interval='number' disable-menu='boolean'
        stopInterval-time='number' clearInterval-when-dev-open-trigger='false' clear-log='boolean'
        disable-select='false' disable-copy='false' disable-cut='false' disable-paste='false'
        disableIframe-parents='boolean' time-out-url='/'></script>
```

来自于一个 disable-devtool 开源项目

disable-devtool：<https://github.com/theajack/disable-devtool>

* `disable-devtool-auto`: 启用自动禁用开发者工具的功能。
* `src`: 指定脚本的来源URL。
* `md5`: 用于验证脚本的完整性，防止被篡改。
* `url`: 指定重定向URL（通常用于当检测到开发者工具被打开时）。
* `tk-name`: 自定义变量名，用于标识或跟踪工具状态。
* `interval`: 设置检查开发者工具的时间间隔。
* `disable-menu`: 禁用右键菜单的功能。
* `stopInterval-time`: 设置停止检查的时间。
* `clearInterval-when-dev-open-trigger`: 当开发者工具被打开时停止检查。
* `clear-log`: 清除控制台日志。
* `disable-select`: 禁用文本选择功能。
* `disable-copy`: 禁用复制功能。
* `disable-cut`: 禁用剪切功能。
* `disable-paste`: 禁用粘贴功能。
* `disableIframe-parents`: 禁用iframe的父元素。
* `time-out-url`: 设置超时后的重定向URL。

这东西牛，src里没有js后缀，还有1.9k的star

记录一下，回头有时间玩一玩这个项目。

当然，有防就有攻，解决办法就很简单，既然两个识别文件都是独立的。

那就可以直接在AdGuard广告拦截器（[浏览器插件](https://chromewebstore.google.com/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/bgnkhhnnamicmpeenaelnjfhikgbkllg?hl=zh-CN)）中添加这两个url，

也可以在op路由或者网络代理工具里拦截，反正只需要禁止它加载就行了

![](./AdGuard.avif)

效果显而易见

![](./开发人员工具8.avif)

小东西花样真多，简单的 debugger 中断，前辈们玩剩的东西，洒洒水

打开浏览器无视断点的功能，进行下一步

![](./开发人员工具9.avif)

书山有路勤为径,学海无涯苦作舟

---

PS: 如果右键被禁止了，去chrome插件商店装一个复制插件，也可以参考我用的[这个](https://chromewebstore.google.com/detail/supreme-super-copy%E8%B6%85%E7%BA%A7%E5%A4%8D%E5%88%B6/cbfimnpbnbgjbpcnaablibnekhfghbac?hl=zh-CN)。

如果只是单纯想在浏览器中看页面源码（不加载资源文件）

可以试试浏览器地址栏中输入：`view-source:https://www.krjojo.com/`