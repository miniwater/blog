---
categories:
- 游戏
cover: ''
date: 2024-06-06T00:49:01+08:00
draft: false
slug: 暴雪战网国际服安装卡-45-解决办法
tags:
- Battle
- battle.net
- Diablo
- 国际服
- 战网
- 暴雪
title: 暴雪战网国际服安装卡 45% 解决办法
updated: 2024-09-18T11:11:20+08:00
wp_id: 9547
---

弄了个XGP，想玩一下大菠萝4，结果战网安装卡45%

非常郁闷

查了一下，发现原因是安装时语言点了简体中文，可能跟国服冲突吧，或者不想让国服玩家玩国际服

**解决办法**

1. 关闭所有战网进程（battle）
2. 删除 C:\ProgramData 下 Battle 文件夹（最好有关战网的全删了）
3. win + R 输入 `regedit` 进入注册表：
   * 在 `\HKEY_CURRENT_USER\Software\Blizzard Entertainment\Launcher` 下有个 Locale 常量，把 `zhCN` 改成 `enUS`

再去安装战网国际服客户端就可以了

**提醒事项**

一般大陆网络是连不上国际服的，需要加速器才能登录