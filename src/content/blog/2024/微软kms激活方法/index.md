---
categories:
- 信息技术
- Windows
category: Windows
draft: false
published: 2024-05-10 12:08:40
slug: 微软kms激活方法
tags:
- windows
- KMS
- 激活
title: 微软KMS激活方法
updated: 2024-05-10 12:08:41
---

KMS激活Windows和Office，网上存在大量的教程，这里只是整理一下，做一个记录，方便日后使用调阅。KMS激活一般适用VL版本，也就说只是使用的是企业版的Windows或Office，都可以使用KMS方式进行激活。

一、激活Windows系统：

1、如果不清楚当前的系统版本，可以使用下面的命令查看系统版本：

```
wmic os get caption
```

2、查看系统的激活状态：

```
slmgr /dlv
```

3、进行激活的完整步骤：

```
::卸载原有Key（如果输入了错误或不可激活的Key，新装的系统或未输入过Key的可不运行此步）
slmgr.vbs -upk
::设置密钥
slmgr /ipk xxxxx-xxxxx-xxxxx-xxxxx
::设置KMS服务器地址
slmgr /skms kms.03k.org
::手动执行激活请求
slmgr /ato
::查询过期时间
slmgr /xpr
```

4、如果是新装系统，可以直接运行如下两行命令即可：

```
slmgr /skms kms.03k.org
slmgr /ato
```

二、Office激活方法：

1、完整的激活步骤如下：

```
::进入ospp.vbs目录，版本不一样，可能目录不一样
cd /d %ProgramFiles%\Microsoft Office\Office16
::设置KMS服务器
cscript ospp.vbs /sethst:kms.03k.org
::设置Office版本对应密钥
cscript ospp.vbs /inpkey:xxxxx-xxxxx-xxxxx-xxxxx
::手动激活
cscript ospp.vbs /act
::查看激活状态
cscript ospp.vbs /dstatus
```

如果要卸载以前的Key，可以使用下面的命令：

```
::卸载以前的Key(xxxxx为密钥后五位，可通过查询激活状态查询到)
cscript ospp.vbs /unpkey:xxxxx
```

2、如果是新装Office，可直接使用下面两个命令即可，如果已经先激活了系统，因为系统内已经设置了指定的KMS服务器，Office也可以不用进行此步手动激活操作，Office会自行激活：

```
cscript ospp.vbs /sethst:kms.03k.org
cscript ospp.vbs /act
```

三、其它相关：

1、Windows VL 版本Key:

> <https://learn.microsoft.com/zh-cn/windows-server/get-started/kms-client-activation-keys>

2、Office VL 版本Key:

> <https://learn.microsoft.com/zh-cn/previous-versions/office/office-2010/ee624355(v=office.14)?redirectedfrom=MSDN>
>
>
>
> <https://learn.microsoft.com/zh-cn/DeployOffice/vlactivation/gvlks?redirectedfrom=MSDN>

3、公网中常用的KMS服务：

> <https://www.coolhub.top/tech-articles/kms_list.html>

4、自建KMS服务：

如果想自建KMS服务，使用Docker感觉方便些，如mikolatero/vlmcsd（https://hub.docker.com/r/mikolatero/vlmcsd/），但不建议自建，可能会收到微软的DMCA（《美国数字千年版权法》）。

补充：

可以用 Microsoft Activation Scripts (MAS) 作为代替了

<https://github.com/massgravel/Microsoft-Activation-Scripts>