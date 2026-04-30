---
categories:
- 技术
- 信息技术
category: 信息技术
draft: false
published: 2024-12-22 17:43:06
slug: 2024-web框架性能测试排行总结
tags:
- 性能测试
- 后端
- Web框架
- 排行榜
title: 2024 Web框架性能测试排行总结
updated: 2024-12-22 17:49:35
---

## Web Frameworks Benchmark

这是一个开源项目，它通过严格的性能测试来比较不同 Rust 网络框架的处理能力。项目通过执行“Hello, World!”这一基础场景，评估每个框架在单位时间内能处理的最大请求数（Req/Sec），从而揭示各框架的潜能和效率。这不仅仅是一场速度的较量，更是对资源利用率的一次深刻探讨。

项目地址：<https://web-frameworks-benchmark.netlify.app/result>

所有框架都使用[wrk](https://github.com/wg/wrk)（threads： 8， timeout： 8， duration： 15 seconds） 进行基准测试，并发数为 **64,256** 和 **512**。

用于基准测试的硬件：

* CPU：8 核（M1 八核处理器）
* 内存：7 GB
* 操作系统： Linux

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Language | Framework | Requests / Second (64) | Requests / Second (256) | Requests / Second (512) |
| nim (2.0) | caprese (0.1) | 557,223 | 624,155 | 614,271 |
| rust (1.82) | may\_minihttp (0.1) | 531,099 | 577,107 | 602,342 |
| rust (1.82) | actix (4.8) | 510,640 | 568,150 | 590,376 |
| go (1.23) | web (0) | 507,225 | 528,557 | 533,631 |
| rust (1.82) | ohkami (0.2) | 506,612 | 541,508 | 552,995 |
| javascript (ES2019) | uwebsockets (20.49) | 499,848 | 574,607 | 596,710 |
| javascript (ES2019) | sifrr (0.0) | 495,785 | 568,072 | 590,157 |
| php (8.3) | workerman (4.2) | 488,768 | 537,155 | 556,877 |
| java (21) | activej (5.5) | 487,656 | 548,212 | 563,501 |
| javascript (ES2019) | mesh (0.6) | 484,264 | 550,900 | 569,178 |
| nim (2.0) | httpbeast (0.4) | 481,151 | 543,591 | 563,278 |
| php (8.3) | mark (2) | 479,844 | 532,705 | 546,670 |
| java (21) | vertx (4.5) | 478,225 | 536,725 | 550,420 |
| cpp (14/17) | drogon (1.9) | 475,375 | 529,728 | 545,443 |
| kotlin (2.1) | jooby (3.5) | 472,023 | 538,641 | 553,164 |
| go (1.23) | gearbox (1.2) | 470,560 | 505,678 | 510,795 |
| java (21) | jooby (3.5) | 468,913 | 534,751 | 550,208 |
| javascript (ES2019) | elysia (1.1) | 467,848 | 533,329 | 549,806 |
| php (8.3) | simps (1) | 466,413 | 527,329 | 556,354 |
| javascript (ES2019) | routejs-uwebsocket (3) | 465,964 | 526,803 | 543,232 |
| java (21) | vertx4web (4.5) | 461,622 | 521,251 | 531,703 |
| java (21) | rapidoid (5.5) | 460,613 | 517,575 | 531,526 |
| nim (2.0) | whip (0.2) | 457,232 | 510,149 | 529,678 |
| php (8.3) | fomo (2.4) | 456,833 | 521,884 | 551,325 |

## TechEmpower Framework Benchmark

这是包含范围最广泛的web框架性能测试，覆盖了比较典型的使用场景，其可参考性极强。另外，所有测试源代码和软硬件配置都开放，基本得到大家的认可。TFB 挑战是对许多 Web 应用程序平台进行性能比较，这些平台通过 HTTP 执行 JSON、数据库、ORM、HTML 模板。它比较了用 C++、Rust、Go、JS、Java、C# 编写的最佳框架。

应用性能直接影响到托管服务的成本，因此公司在开发应用时需要格外注意应用所使用的Web框架，初创公司尤其如此。此外，糟糕的应用性能也会影响到用户体验，甚至会因此受到相关搜索引擎的降级处罚。在选择框架时，又有许多因素需要考量，但原始性能无疑是其中最容易测评的。不同的框架性能差异极大，即使你充分利用了硬件的性能，错误的框架依然可能带来十倍的性能损耗，虽然不是每个人都会遇到如此极端的情况，但在某些情况下确实如此，因此你有必要了解各框架之间的性能差异。

项目地址：<https://www.techempower.com/benchmarks/#hw=ph&test=fortune&section=data-r22>

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Rnk | Framework | Best performance (higher is better) | | Errors |
| 1 | may-minihttp | 585,122 | 100.0% | 0 |
| 2 | xitca-web | 578,573 | 98.9% | 0 |
| 3 | ntex [sailfish] | 558,331 | 95.4% | 0 |
| 4 | h2o | 549,078 | 93.8% | 0 |
| 5 | vertx-postgres | 453,406 | 77.5% | 0 |
| 6 | axum [postgresql] | 438,996 | 75.0% | 0 |
| 7 | viz [postgresql] | 432,605 | 73.9% | 0 |
| 8 | jooby-pgclient | 427,682 | 73.1% | 0 |
| 9 | just-js | 422,871 | 72.3% | 0 |
| 10 | salvo [postgres] | 413,812 | 70.7% | 0 |
| 11 | redkale-graalvm | 413,537 | 70.7% | 0 |
| 12 | actix-http | 405,144 | 69.2% | 0 |
| 13 | vertx-web-postgres | 388,512 | 66.4% | 0 |
| 14 | ntex [async-std,db] | 375,054 | 64.1% | 0 |
| 15 | officefloor-sqlclient | 367,623 | 62.8% | 0 |
| 16 | aspcore-ado-pg | 363,344 | 62.1% | 0 |
| 17 | vertx-web-kotlin-coroutines-postgres | 356,670 | 61.0% | 0 |
| 18 | officefloor-async | 355,359 | 60.7% | 0 |
| 19 | lithium-postgres | 351,475 | 60.1% | 0 |
| 20 | aspcore-aot-ado-pg | 350,712 | 59.9% | 0 |

## 总结

前者（TechEmpower） 有实际数据输出，后者全部框架都只输出一个空白页面进行测速比较，所以如果说代表性强的话，还是 TechEmpower 。

个人感觉，Rust语言的框架在目前来说，依旧遥遥领先，在性能和安全性上，从隔壁 Linux 内核之争就可初见端倪。

在PHP中，Workerman依然名列前茅，小企业前期借助 Laravel thinkPHP 敏捷开发、快速上线，后期也能在同语言下，无痛完成重构。

Javascript 背靠 Web 前端和 Ts 两座大山，以及有 uWebSockets.js 的性能加持，也方便让小企业《前后端分离，但人不分离》。

Golang 没能革 Java 的命，就已经开始走下坡路了，在新项目语言的选择上，似乎越来越多人选择 Rust 而不是 Golang，实在可惜。

至于 Java，很难评，也不知道 Oracle 还能霍霍多少年