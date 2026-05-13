# AI Agent

智能体，从只能执行单一任务的简单代理，到如今能够进行多代理协同与人类代理交互的复杂系统。

工作流：预先定义的固定步骤

Agent：能动态自主选择步骤并完成

保持简单

* 能用提示词就不用工作流
* 能用工作流，就不用Agent
* 单Agent能解决，就不用多Agent

Agent 提示词（最好让ai写）：

* 角色：你是xx助手，xx领域专家
* 任务：你要完成什么
* 工具：可以调用什么工具
* 约束：应该遵循什么规则要求
* 输出：结果是什么样子

## n8n

nodemation（节点自动化）

以工作流为主的LLM平台，通过可视化节点（Node）来构建自动化流程，同时每个节点所提供的配置参数丰富，定制化程度高。

官网：[https://n8n.io/](https://n8n.io/)

文档：[https://docs.n8n.io/](https://docs.n8n.io/)

Github：[https://github.com/n8n-io/n8n](https://github.com/n8n-io/n8n)

（25/07/19：121k Star）

## Dify

开源的LLM应用开发平台，融合BaaS和LLMOps理念，旨在提供一站式的AI应用快速开发与运营能力，包括Agent工作流、RAG Pipeline等。

官网：[https://dify.ai](https://dify.ai)

文档：[https://docs.dify.ai/zh-hans/introduction](https://docs.dify.ai/zh-hans/introduction)

Github：[https://github.com/langgenius/dify/](https://github.com/langgenius/dify/)

（25/07/19：108k Star）

## Coze（扣子）

字节跳动推出，主打低代码/无代码的AI Agent开发，强调快速构建和部署对话式AI应用。

官网：[https://www.coze.cn/](https://www.coze.cn/)

闭源

## Ragflow

基于深度文档理解的开源RAG引擎，专注于解决复杂格式文档的知识提取与高质量问答。

官网：[https://ragflow.io/](https://ragflow.io/)

文档：[https://ragflow.io/docs/dev/](https://ragflow.io/docs/dev/)

Github：[https://github.com/infiniflow/ragflow](https://github.com/infiniflow/ragflow)

（25/07/19：60k Star）

## Fastgpt

基于 LLM 大模型的开源 AI 知识库构建平台。提供了开箱即用的数据处理、模型调用、RAG 检索、可视化 AI 工作流编排等能力，帮助您轻松构建复杂的 AI 应用。

官网：[https://fastgpt.cn/zh](https://fastgpt.cn/zh)

文档：[https://doc.fastgpt.cn/docs/](https://doc.fastgpt.cn/docs/)

Github：[https://github.com/labring/FastGPT](https://github.com/labring/FastGPT)

（25/07/19：25k Star）

## AI Agent 开发框架

### AutoGPT

一个功能强大的平台，创建、部署和管理可自动执行复杂工作流程的连续 AI 智能体。

官网：[https://agpt.co/](https://agpt.co/)

Github：[https://github.com/Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)

（25/07/19：177k Star）

### langchain

通用 LLM 应用开发框架，广泛支持数据处理、工具集成和链式思维。

文档：[https://python.langchain.com/](https://python.langchain.com/)

Github：[https://github.com/langchain-ai/langchain](https://github.com/langchain-ai/langchain)

（25/07/19：112k Star）
