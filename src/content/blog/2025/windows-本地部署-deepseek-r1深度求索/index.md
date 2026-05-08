---
categories:
- AI
- LLM
- 信息技术
cover: ./deepseek.avif
date: '2025-02-03T00:44:03+08:00'
draft: false
slug: windows-本地部署-deepseek-r1深度求索
tags:
- DeepSeek
- DeepSeek R1
- LM Studio
- ollama
- 本地部署
- 深度求索
title: Windows 本地部署 DeepSeek R1深度求索
updated: '2026-01-04T19:17:11+08:00'
wp_id: 10614
---

![](./deepseek.avif)

最近看到抖音B站的DeepSeek R1很火，正好整一个离线版玩玩。

虽然现在AI大模型技术和能力越来越强，不过相应的成本也在逐步降低。成本低不仅仅意味着它价格低，也意味着，本地部署的成本低，即安装使用成本。

所以要安装DeepSeek这个大模型，简单地有电脑就能有手即可。

## 使用本地部署DeepSeek的特点

* 在电脑上运行llm，完全脱机
* 通过应用内聊天界面或OpenAI兼容的本地服务器使用模型
* 从HuggingFace存储库下载任何兼容的模型文件

## 使用LM Studio部署DeepSeek R1（推荐）

推荐用LM Studio最大的好处就是支持CPU+GPU混合推理，只要内存富裕，可以用4G闲卡推动32B模型（让GPU负责4G部分，让CPU负责剩下28G部分），自带可视化界面，可调参数也非常多。

最重要也就是免费。

非要说缺点也是有的，就是不开源，当免费遇上不开源，难免让人起疑心，不过这不是本篇重点。

首先安装LM Studio

<https://lmstudio.ai>

### 切换中文

在应用中的任何位置按 `cmd` + `,` (macOS) 或 `ctrl` + `,` (Windows/Linux) 快速跳转到设置。

### 下载导入模型

选择左侧 **开发者**(像命令行图标) ，点击运行时

![](./LMStudio.avif)

在Model Search搜索 DeepSeek

![](./deepseek-1.avif)

选择适合自己电脑性能的模型。

* 4G GPU：8B Q4推理
* 6G GPU：8B Q8推理
* 8G GPU：32B Q4推理
* 12G GPU：32B Q4推理
* 16G GPU：32B Q4推理 或者 32B Q8推理
* 24G GPU：32B Q8推理 或者 70B Q2推理
* 40G GPU：70B Q4推理
* Qwen底模除了1.5B其他不建议，真的太辣跨；Llama底模推荐。

优先使用**高参数**模型。

尽量不要低于Q4，再往下性能缩减非常严重

![](./EQLLM.avif)

精度对性能的损失

![](./量化的损失.avif)

不同精度与原模型的差异

得益于LM Studio支持cpu gpu混合推理，内存和显存分担，可以让低配显卡跑更大参数的模型。

也可以自己手动下载镜像导入，如：[huggingface](https://huggingface.co/)。

需要注意的是，默认的**DeepSeek R1**起步就是671B，模型大小为404G。

671B以下的R1模型都是 **Qwen**(阿里通义千问) 或者 **Llama**(脸书Meta羊驼) 去学习 **DeepSeek R1**，底模并不是**DeepSeek R1**。

以 **DeepSeek-R1-Distill-Llama-8B** 为例，指的是 **8B** 的 **Llama** 去学习 **DeepSeek-R1**，也就是蒸馏（distill），底模是 **Llama** 。

当然，尽管并不是原生 **DeepSeek R1**，但模型性能依然暴打原生的 **Llama** 和 **Qwen** 。

同时在模型名称后面，看到的 Q4\_K\_M 指的是一种特定类型的量化方法。命名约定如下：

* Q 代表量化。
* 4 表示量化过程中使用的位数。
* K 表示在量化中使用 k 均值聚类。
* M 表示量化后的模型大小。S = 小，M = 中，L = 大。

当然K\_M这些不重要，基本只需要关注Q2 Q3 Q4 Q8这些。

最后运行测试一下

![](./LMStudio2.avif)

### 性能优化，8G运行32B模型

如何用低配显存跑起**32B-Q4**模型。

内存至少要32G,

gpu负载调整到显存完全占用，其余层数均交给cpu。

cpu线程数设置为逻辑线程数。 “高级参数”里“设置”一栏除了温度还可以设置cpu推理线程数。

* 4G显存的显卡 设置GPU负载为10
* 8G显存的显卡 设置GPU负载为20

目的是吃满**专用GPU内存**，并且不要溢出到**共享GPU内存**，GPU到内存延迟非常高。除非CPU特别烂，否则还是把溢出部分留给CPU去推理。

![](./任务管理器.avif)

溢出1G左右都是可以接受的

以我配置为例，i5 12600kf+3060ti+32G，cpu逻辑处理器为16，显卡显存为8G，图上的GPU卸载设置20，CPU Thread Pool Size设置为16（注意滑动条有上限，需要点击数字手动输入），右侧设置中展开全部，CPU线程设置16。

系统提示可以设置前置条件，比如**延长思考时间**：

```
你是一个数学家，你需要解决一些数学问题。请仔细思考并推理出数学问题的答案。你需要思考很长的时间并探索所有的可能!你的回答应当使用Latex和Markdown并简明准确。
```

![](./LMStudio3.avif)

依然有2tokens每秒

最后，可以使用LM Studio本地部署去对接AI客户端、翻译、VS Code

**[LM Studio本地部署DeepSeek R1对接AI客户端、翻译、VS Code](https://www.krjojo.com/2025/02/04/lm-studio-%e6%9c%ac%e5%9c%b0%e9%83%a8%e7%bd%b2-deepseek-r1-%e5%af%b9%e6%8e%a5-cherry-studio-%e9%9d%a2%e6%9d%bf/)**

## 使用Ollama部署DeepSeek R1

Ollama作为开源中最火的大型语言模型管理器，自然少不了。

### 安装Ollama

安装有多种方式，windows可以直接安装，拥有docker的系统也可以用docker安装。

**Windows安装**

<https://ollama.com/download/Ollama-darwin.zip>

**docker安装**

拉取ollama

```
docker run -d --gpus=all -p 11434:11434 --name ollama ollama/ollama
```

简单介绍一下命令

* `-d`
  + 容器后台运行
* `--gpus=all` 
  + 使用英伟达显卡，（否则只使用CPU计算大模型，基本非常慢)
* `-p 11434:11434`
  + 暴露端口号11434
* `--name ollama`
  + 容器名备注

### 拉取DeepSeek模型

可以在 <https://ollama.com/library/deepseek-r1> 查看所有DeepSeek R1模型

需要注意的是，默认的**DeepSeek R1**起步就是671B，模型大小为404G。

671B以下的R1模型都是 **Qwen**(阿里通义千问) 或者 **Llama**(脸书Meta羊驼) 去学习 **DeepSeek R1**，底模并不是**DeepSeek R1**。

以 **DeepSeek-R1-Distill-Llama-8B** 为例，指的是 **8B** 的 **Llama** 去学习 **DeepSeek-R1**，也就是蒸馏（distill），底模是 **Llama** 。

当然，尽管并不是原生 **DeepSeek R1**，但模型性能依然暴打原生的 **Llama** 和 **Qwen** 。

拉取 **DeepSeek-R1-Distill-Llama-8B** 模型

```
ollama run deepseek-r1:8b
```

有硬件能力也可以拉取真正的 **DeepSeek R1** 模型，非常不建议

```
ollama run deepseek-r1:671b
```

运行deepseek-r1:8b

```
ollama run deepseek-r1:8b
```

测试一个问题

```
>>> 比较3.8和3.11的大小
<think>
首先，我需要比较3.8和3.11的大小。

为了更清楚地比较它们，我将它们的小数位数对齐。将3.8写成3.80，这样两者都有两个小数位。

接下来，我逐位进行比较。第一位小数都是8，相等，无法区分胜负。

然后比较第二位小数，3.80的第二位是0，而3.11的第二位是1。因为0小于1，所以3.80小于3.11。

因此，可以得出结论：3.8小于3.11。
</think>

要比较 \( 3.8 \) 和 \( 3.11 \) 的大小，我们可以按照以下步骤进行：

1. **对齐小数位数**：

   将两个数的小数部分对齐，使其具有相同的位数。将 \( 3.8 \) 写成 \( 3.80 \)，这样它有两位小数。

2. **逐位比较**：

   - 第一位小数：\( 8 \) 和 \( 1 \)
     - \( 8 > 1 \)，所以第一位决定了大小关系。

   由于 \( 8 > 1 \)，可以直接得出 \( 3.80 > 3.11 \)。

因此，比较结果为：

\[
3.8 < 3.11
\]

最终答案是：
\[
\boxed{3.8 < 3.11}
\]

>>> Send a message (/? for help)
```

### 可视化界面

介绍两个可视化工具 Page Assist 和 Open WebUI，

Page Assist更轻量，安装浏览器插件就可运行

#### Page Assist（推荐）

Page Assist是一款开源的Chrome浏览器扩展,为本地运行的AI模型提供了一个友好的交互界面。它的主要功能包括:

* 侧边栏:可以在任何网页上打开,与AI模型进行交互并查看结果
* Web UI:类似ChatGPT网站的界面,可以与AI模型进行对话
* 网页聊天:可以针对当前浏览的网页内容进行提问

Chrome商店链接：<https://chromewebstore.google.com/detail/page-assist-a-web-ui-for/jfgfiigpkhlkbnfnbobbkinehhfdhndo>

Github：<https://github.com/n4ze3m/page-assist>

#### Open WebUI

此外，**Ollama** 可以与 **Open WebUI** 搭配使用

<https://github.com/open-webui/open-webui>

在命令提示符中输入

```
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

英伟达GPU使用这个

```
docker run -d -p 3000:8080 --gpus all --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:cuda
```

最后使用 [http://localhost:3000](http://localhost:3000/) 登录界面