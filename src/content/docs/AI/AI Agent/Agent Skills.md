# Agent Skills

Agent Skills（智能体技能）

利用渐进式披露机制，每次对话只发送工具名称和工具介绍，让AI知道有这个工具，等AI需要时再让AI去获取更详细的说明或调用（按需加载）。

官方文档：[https://agentskills.io/](https://agentskills.io/)

主要解决MCP的两个缺点：

- 上下文爆炸
- 无法说明代码结构和开发规范

## 目录结构

基础

```
my-skill/
└── SKILL.md
```

完整

```
项目目录/.claude/skills/skills name1/
├── SKILL.md
├── scripts
│   └── main.py
├── references
│   └── doc.md
├── assets
│   └── pic.png
└── train.sh
```

SKILL.md

```yaml
---
name: PDF处理
description: 从PDF文件中提取文本和表格，填写表格，合并文档。
---
# PDF处理
 
## 何时使用此技能
当用户需要处理PDF文件时使用此技能...
 
## 如何提取文本
1. 使用pdfplumber进行文本提取...
 
## 如何填写表格
...
```