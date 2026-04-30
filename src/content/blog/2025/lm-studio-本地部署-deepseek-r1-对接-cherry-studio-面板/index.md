---
categories:
- 信息技术
- AI
- LLM
category: LLM
draft: false
published: 2025-02-04 13:21:18
slug: lm-studio-本地部署-deepseek-r1-对接-cherry-studio-面板
tags:
- API
- 本地部署
- DeepSeek R1
- LM Studio
- Cherry Studio
- 翻译
- 沉浸式翻译
title: LM Studio本地部署DeepSeek R1对接AI客户端、翻译、VS Code
updated: 2025-02-22 18:40:22
---

## 对接AI客户端

部署LM Studio可以查看[这篇文章](https://www.krjojo.com/2025/02/03/windows-%e6%9c%ac%e5%9c%b0%e9%83%a8%e7%bd%b2-deepseek-r1%e6%b7%b1%e5%ba%a6%e6%b1%82%e7%b4%a2/)，这里讲部署后如何对接第三方AI客户端，以 Cherry Studio 为例。

安装 Cherry Studio。

官网 ：<https://cherry-ai.com/>

Github：<https://github.com/CherryHQ/cherry-studio>

在设置中添加模型服务，名称随意。

![](./Cherry-Studio.avif)

在 LM Studio 中开启api接口，并复制本地连接地址

![](./Cherry-Studio2.avif)

输入 LM Studio 的api接口

![](./Cherry-Studio3.avif)

此时会显示 LM Studio 存在的模型，添加上去。

![](./Cherry-Studio4.avif)

然后就可以愉快聊天了

![](./Cherry-Studio5.avif)

## 翻译

以 **沉浸式翻译** 为例

官网：<https://immersivetranslate.com/>

Chrome扩展：<https://chrome.google.com/webstore/detail/immersive-translate/bpoadfkcbjbfhfodiogcnhhhpibjhbnh?utm_source=official>

Edge扩展：<https://microsoftedge.microsoft.com/addons/detail/amkbmndfnliijdhojkpoglbnaaahippg?utm_source=official>

安装扩展后进入设置界面，选择翻译服务

<extension://bpoadfkcbjbfhfodiogcnhhhpibjhbnh/options.html#services>

添加 OpenAI 兼容服务

![](./翻译.avif)

名称随意，api接口为上面 LM Studio 暴露的端口地址，模型可以手动填写

最后右上角验证

![](./翻译2.avif)

返回上一个界面启用，并设置默认

就可以愉快玩耍了

![](./翻译3.avif)

看看8B出来的翻译效果

![](./翻译4.avif)

速度很慢，看起来也不是很聪明，还是不建议使用了。

## VS Code

以VS Code插件 **Roo Code (prev. Roo Cline)** 为例

市场：<https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline>

安装完成后，点开左侧栏的小火箭图标，

API Provider 选择 LM Studio，选择自己的模型

![](./VSCode.avif)

然后就可以对话写代码了。

此时可能会遇到报错

```
Please check the LM Studio developer logs to debug what went wrong. You may need to load the model with a larger context length to work with Roo Code's prompts.
```

这是因为下文长度不够，在LM Studio里重新调整上下文长度即可

这里上下文长度设置成 15000，就可以正常执行了。

![](./VSCode2.avif)