---
categories:
- AI
- LLM
- 信息技术
cover: ''
date: '2024-02-04T00:16:08+08:00'
draft: false
slug: 本地运行大型语言模型ollama
tags:
- AI
- Docker
- Llama
- Llama2
- LLM
- ollama
- 大语言模型
title: 本地运行大型语言模型ollama
updated: '2024-02-04T00:27:20+08:00'
wp_id: 1278
---

## ollama

一款可以在本地启动并运行大型语言模型。

不需要有AI专业知识，不需要用到矩阵，一键运行大公司训练好的大语言模型。

docker隔离，不需要破坏环境。

GitHub：<https://github.com/ollama/ollama>

## 使用方法

### Docker

Linux下运行docker命令

```
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

或者

Windows WSL2下运行docker命令

```
docker run -d -v E:/docker/ollama:/root/.ollama -p 11434:11434 --name ollama_CPU ollama/ollama
```

其中 `E:/docker/ollama` 可更换为任意目录，用于保存 **模型** ，大小在 2G 到 40G 不等，挂载硬盘是为了方便手动下载导入模型。

**但是，需要注意的是WSL2读写性能非常糟糕，大模型在加载时候需要等半天，完进内存才开始执行，哪怕你用的是固态硬盘。**

如果你拥有一块大显存的N卡（**NVIDIA**）可以加上 `--gpus=all` 启用GPU加速

例如：

```
docker run -d --gpus=all -v E:/docker/ollama:/root/.ollama -p 11434:11434 --name ollama_GPU ollama/ollama
```

> 在 7B 的模型中，GPU加速的RTX3060TI运行速度 比 传统intel i5 12600KF 快接近十倍。出字速度行云流水，但同时也吃满了8G显存。
>
> 1B = 10亿参数

对于一般用户来说，内存比显存大的，建议用默认不开启GPU加速的方案，能体验更大参数带来的优势，但是出字速度会非常慢。

*注意：您应该至少有 8 GB 可用 RAM 来运行 7B 型号，16 GB 来运行 13B 型号，32 GB 来运行 33B 型号。*

### 运行

运行聊天

```
ollama run llama2
```

退出聊天

```
/bye
```

查看已下载的模型

```
ollama list
```

## 模型仓库

主流模型

| Model 模型 | Parameters 参数 | Size 尺寸 | Download 下载 |
| --- | --- | --- | --- |
| Llama 2 | 7B | 3.8GB | `ollama run llama2` |
| Mistral | 7B | 4.1GB | `ollama run mistral` |
| Dolphin Phi | 2.7B | 1.6GB | `ollama run dolphin-phi` |
| Phi-2 | 2.7B | 1.7GB | `ollama run phi` |
| Neural Chat | 7B | 4.1GB | `ollama run neural-chat` |
| Starling | 7B | 4.1GB | `ollama run starling-lm` |
| Code Llama | 7B | 3.8GB | `ollama run codellama` |
| Llama 2 Uncensored | 7B | 3.8GB | `ollama run llama2-uncensored` |
| Llama 2 13B | 13B | 7.3GB | `ollama run llama2:13b` |
| Llama 2 70B | 70B | 39GB | `ollama run llama2:70b` |
| Orca Mini | 3B | 1.9GB | `ollama run orca-mini` |
| Vicuna | 7B | 3.8GB | `ollama run vicuna` |
| LLaVA | 7B | 4.5GB | `ollama run llava` |