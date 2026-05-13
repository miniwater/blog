# Redis

官方文档：[https://www.redis.net.cn/tutorial/3505.html](https://www.redis.net.cn/tutorial/3505.html)

## 字符串(String)

String 是Redis 字符串数据类型

| 命令 | 说明 |
| --- | --- |
| SET key value | 设置指定 key 的值 |
| GET key | 获取指定 key 的值。 |
| GETRANGE key start end | 返回 key 中字符串值的子字符 |
| MGET key1 \[key2..\] | 获取所有(一个或多个)给定 key 的值。 |
| STRLEN key | 返回 key 所储存的字符串值的长度。 |
| MSET key value \[key value ...\] | 同时设置一个或多个 key-value 对。 |
| INCR key | 将 key 中储存的数字值增一。 |
| INCRBY key increment | 将 key 所储存的值加上给定的增量值（increment） 。 |
| DECR key | 将 key 中储存的数字值减一。 |
| DECRBY key decrement key | 所储存的值减去给定的减量值（decrement） 。 |
| APPEND key value | 如果 key 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的值的末尾。 |

```bash
# 设置key为pig，值为peppa
> SET pig peppa
 
# 获取key为pig的值
>GET pig
peppa
```

## 列表(List)

Redis列表是简单的列表，按照插入顺序排序。你可以添加一个元素导列表的头部（左边）或者尾部（右边）

| 命令 | 说明 |
| --- | --- |
| LINDEX key index | 通过索引获取列表中的元素 |
| LINSERT key BEFORE | AFTER pivot value | 在列表的元素前或者后插入元素 |
| LLEN key | 获取列表长度 |
| LPUSH key value1 \[value2\] | 将一个或多个值插入到列表头部 |
| LPUSHX key value | 将一个或多个值插入到已存在的列表头部 |
| LRANGE key start stop | 获取列表指定范围内的元素 |
| LREM key count value | 移除列表元素 |
| LSET key index value | 通过索引设置列表元素的值 |
| RPOP key | 移除并获取列表最后一个元素 |
| RPUSH key value1 \[value2\] | 在列表中添加一个或多个值 |
| RPUSHX key value | 为已存在的列表添加值 |

```bash
# pig列表中加入元素peppa
> LPUSH name_pig peppa
1
# pig列表中加入元素peppa1
> LPUSH name_pig peppa1
2
# 查询pig列表中全部元素
> LRANGE name_pig  0 -1
peppa1
peppa
```

## 集合(Set)

Redis的Set是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。Redis 中 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。

| 命令 | 说明 |
| --- | --- |
| SADD key member1 \[member2\] | 向集合添加一个或多个成员 |
| SCARD key | 获取集合的成员数 |
| SDIFF key1 \[key2\] | 返回给定所有集合的差集 |
| SDIFFSTORE destination key1 \[key2\] | 返回给定所有集合的差集并存储在 destination 中 |
| SINTER key1 \[key2\] | 返回给定所有集合的交集 |
| SINTERSTORE destination key1 \[key2\] | 返回给定所有集合的交集并存储在 destination 中 |
| SISMEMBER key member | 判断 member 元素是否是集合 key 的成员 |
| SMEMBERS key | 返回集合中的所有成员 |
| SREM key member1 \[member2\] | 移除集合中一个或多个成员 |
| SUNION key1 \[key2\] | 返回所有给定集合的并集 |
| SUNIONSTORE destination key1 \[key2\] | 所有给定集合的并集存储在 destination 集合中 |
| SSCAN key cursor \[MATCH pattern\] \[COUNT count\] | 迭代集合中的元素 |

```bash
# pig集合中加入元素peppa1
> SADD pig peppa1
1
# pig集合中加入元素peppa2
> SADD pig peppa2
1
# 查询pig集合中全部元素
> SMEMBERS pig
peppa1
peppa2
```

## 有序集合(sorted set/zset)

* Redis 有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。
* 不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
* 有序集合的成员是唯一的,但分数(score)却可以重复。
* 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。 集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)。

| 命令 | 说明 |
| --- | --- |
| ZADD key score1 member1 \[score2 member2\] | 向有序集合添加一个或多个成员，或者更新已存在成员的分数 |
| ZCARD key | 获取有序集合的成员数 |
| ZINTERSTORE destination numkeys key \[key ...\] | 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中 |
| ZRANGE key start stop \[WITHSCORES\] | 通过索引区间返回有序集合成指定区间内的成员 |
| ZRANGEBYSCORE key min max \[WITHSCORES\] \[LIMIT\] | 通过分数返回有序集合指定区间内的成员 |
| ZRANK key member | 返回有序集合中指定成员的索引 |
| ZREVRANGE key start stop \[WITHSCORES\] | 返回有序集中指定区间内的成员，通过索引，分数从高到底 |
| ZSCORE key member | 返回有序集中，成员的分数值 |
| ZUNIONSTORE destination numkeys key \[key ...\] | 计算给定的一个或多个有序集的并集，并存储在新的 key 中 |

```bash
# pig集合中加入元素p1分数100 p2分数90
> ZADD pig  100 p1 90 p2
2
# 查询pig集合中全部元素
> ZRANGE pig 0 -1
p2
p1
```

## 哈希(Hash)

Redis hash 是键值对映射表，hash特别适合用于存储对象。

| 命令 | 说明 |
| --- | --- |
| HEXISTS key field | 查看哈希表 key 中，指定的字段是否存在。 |
| HGET key field | 获取存储在哈希表中指定字段的值 |
| HGETALL key | 获取在哈希表中指定 key 的所有字段和值 |
| HINCRBY key field increment | 为哈希表 key 中的指定字段的整数值加上增量 increment 。 |
| HKEYS key | 获取所有哈希表中的字段 |
| HLEN key | 获取哈希表中字段的数量 |
| HMGET key field1 \[field2\] | 获取所有给定字段的值 |
| HMSET key field1 value1 \[field2 value2 \] | 同时将多个 field-value (域-值)对设置到哈希表 key 中。 |
| HSET key field value | 将哈希表 key 中的字段 field 的值设为 value 。 |

```bash
# 设置key为pig，字段为peppa，值为123
> HSET pig peppa 123
 
# 获取key为pig，field为peppa的值
> HGET pig peppa
123
```
