---
categories:
- Linux
- 信息技术
cover: ''
date: '2024-05-09T22:52:23+08:00'
draft: false
slug: ubuntu系统中默认防火墙ufw常用操作
tags:
- Linux
- Ubuntu
- UFW
- 防火墙
title: Ubuntu系统中默认防火墙UFW常用操作
updated: '2024-05-09T22:52:24+08:00'
wp_id: 9374
---

ubuntu系统自带了防火墙Uncomplicated Firewall，即ufw。

对于系统中ufw，基本操作命令如下：

启用ufw：

```
sudo ufw enable
```

禁用ufw：

```
sudo ufw disable
```

重启ufw：

```
sudo ufw reload
```

查看状态：

```
sudo ufw status
```

重置UFW：

```
sudo ufw reset
```

开启日志：

```
sudo ufw logging on
```

关闭日志：

```
sudo ufw logging off
```

查询日志：

```
cat /var/log/ufw.log
```

如果服务器启用了ipv6，但ufw没有启用对ipv6的支持，需要打开如下配置文件，修改并确认“IPV6=yes”后重启即可使ufw支持ipv6：

```
sudo vi /etc/default/ufw
```

```
IPV6=yes
```

**一、开启设置的默认策略：**

在配置之前，先启用默认设置，默认策略将拒绝所有传入连接，允许所有传出链接，这样可按需打开指定的端口或允许指定的ip来连接服务器。

```
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

**二、开放或禁止访问指定端口：**

1、开放访问指定端口的规则，基本格式为：sudo ufw allow <port>/<optional: protocol>

a、如允许tcp和udp端口为80的数据包流入：

```
# 允许通过80端口访问（不限协议）
sudo ufw allow 80
```

b、如允许tcp端口为80的数据包流入：

```
# 允许80端口上的tcp协议访问
sudo ufw allow 80/tcp
```

c、如允许udp端口为80的数据包流入：

```
# 允许80端口上的udp协议访问
sudo ufw allow 80/udp
```

d、开放一个范围端口：

```
# 开放端口（不限协议）
sudo ufw allow 7000:7200
# 开放端口的tcp协议
sudo ufw allow 7000:7200/tcp
# 开放端口的udp协议
sudo ufw allow 7000:7200/udp
```

2、禁止访问指定端口的规则，基本格式为：sudo ufw deny <port>/<optional: protocol>

a、如不允许访问tcp和udp的80端口：

```
# 禁止访问80端口（不限协议）
sudo ufw deny 80
```

b、如不允许访问tcp的80端口：

```
# 拒绝80端口的tcp协议访问
sudo ufw deny 80/tcp
```

c、如不允许访问udp的80端口：

```
# 拒绝80端口的udp协议访问
sudo ufw deny 80/udp
```

d、禁止一个范围端口，如7000-7200之间的端口全部关闭：

```
# 拒绝访问的端口范围为7000~7200（不限协议）
sudo ufw deny 7000:7200
```

3、当然也可以以服务名为来进行开放或禁止端口的操作，如：

```
# 允许http服务端口访问（即80端口）
sudo ufw allow http
# 拒绝https服务端口访问（即443端口）
sudo ufw deny https
```

**三、允许或禁止ip或ip段的访问：**

1、允许/禁止指定的IP访问，规则格式为：sudo ufw [allow/deny] from <ip address>

a、如允许/禁止来自207.46.232.182数据包：

```
# 允许 208.208.208.208 访问
sudo ufw allow from 208.208.208.208
# 拒绝 208.208.208.208 访问
sudo ufw deny from 208.208.208.208
```

b、允许/禁止一个网段访问：

```
# 允许 192.168.1.0/24 访问
sudo ufw allow from 192.168.1.0/24
# 禁止 192.168.1.0/24 访问
sudo ufw deny from 192.168.1.0/24
```

2、允许/禁止指定的端口和IP访问，规则格式为：sudo ufw [allow/deny] from <target> to <destination> port <port number>

a、如允许/禁止IP地址为192.168.0.4访问22端口：

```
# 允许ip为192.168.0.4的访问22端口
sudo ufw allow from 192.168.0.4 to any port 22
# 拒绝ip为192.168.0.4的访问22端口
sudo ufw deny from 192.168.0.4 to any port 22
```

3、允许/禁止指定端口、IP、和协议访问，规则格式为：sudo ufw [allow/deny] from <target> to <destination> port <port number> proto <protocol name>

a、如允许/禁止IP为192.168.0.4访问tcp:22：

```
# 允许ip为192.168.0.4的通过tcp协议访问22端口
sudo ufw allow from 192.168.0.4 to any port 22 proto tcp
# 拒绝ip为192.168.0.4的通过tcp协议访问22端口
sudo ufw deny from 192.168.0.4 to any port 22 proto tcp
```

b、你想阻止来自192.168.0.8和 192.168.0.9访问22端口，但是允许网段中其它的IP可以访问tcp:22，那么可以这样：

```
# 拒绝 192.168.0.8连接22端口
sudo ufw deny from 192.168.0.8 to any port 22
# 拒绝 192.168.0.9连接22端口
sudo ufw deny from 192.168.0.9 to any port 22
# 允许 192.168.0.0/24连接22端口
sudo ufw allow from 192.168.0.0/24 to any port 22 proto tcp
```

注意：先禁止，再允许，ufw会依次执行。

**四、针对网卡设备规则设定，指定允许通过某个网卡的连接：**

如仅允许通过名为eth0的网卡来访问80端口：

```
# 允许通过eth0来访问80端口
sudo ufw allow in on eth0 to any port 80
```

网卡名可使用如下命令查询：

```
# 查看网卡设备名
ip addr
```

**五、删除已存在的规则：**

1、通过规则编号进行删除已存在的规则，或插入规则到指定行：

```
# 按编号进行列表
sudo ufw status numbered
# 删除编号为3的规则
sudo ufw delete 3
# 在第3行插入规则 
sudo ufw insert 3 allow from 208.208.208.208
```

2、第二种方法是通过指定实际规则来删除规则，如直接删除规则已存在的tcp协议的80端口：

```
# 删除 deny 80/tcp 这条规则
sudo ufw delete deny 80/tcp
# 删除 allow http 这条规则
sudo ufw delete allow http
# 删除允许192.168.0.0/24访问22端口的规则
sudo ufw delete allow from 192.168.0.0/24 to any port 22
```

**六、禁止ping：**

ufw默认允许 ping请求，若要拒绝ping ，则需要修改规则配置文件：

```
sudo vi /etc/ufw/before.rules
```

规则文件中会看到如下关于ping的规则：

```
# ok icmp codes
-A ufw-before-input -p icmp --icmp-type destination-unreachable -j ACCEPT
-A ufw-before-input -p icmp --icmp-type source-quench -j ACCEPT
-A ufw-before-input -p icmp --icmp-type time-exceeded -j ACCEPT
-A ufw-before-input -p icmp --icmp-type parameter-problem -j ACCEPT
-A ufw-before-input -p icmp --icmp-type echo-request -j ACCEPT
```

删除上面的规则，或是修改"ACCEPT" 为 "DROP"，如下：

```
# ok icmp codes
-A ufw-before-input -p icmp --icmp-type destination-unreachable -j DROP
-A ufw-before-input -p icmp --icmp-type source-quench -j DROP
-A ufw-before-input -p icmp --icmp-type time-exceeded -j DROP
-A ufw-before-input -p icmp --icmp-type parameter-problem -j DROP
-A ufw-before-input -p icmp --icmp-type echo-request -j DROP
```