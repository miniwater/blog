---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: '2024-10-23T11:46:06+08:00'
draft: false
slug: wordpress-使用-rest-api-批量发布文章，提交-http-post-请求即可发布
tags:
- API
- http
- POST
- python
- REST API
- 批量发布
- 文章
- 采集
title: Wordpress 使用 REST API 批量发布文章，提交 HTTP Post 请求即可发布
updated: '2024-10-23T11:50:11+08:00'
wp_id: 10142
---

看了一下Wordpress远程发布文章的方式，基本围绕着 XML-RPC 。

但是这功能并不安全，很多爬虫都会扫描 `/xmlrpc.php` 路径url，导致许多主题和优化插件都自动禁用该功能了，甚至有的防火墙也建议添加到 URL 黑名单。

没办法只能手写暴露一个发布接口了

安装一个 [WPCode](https://cn.wordpress.org/plugins/insert-headers-and-footers/) 插件加入以下PHP代码，或者干脆放入function.php文件中

```
<?php
// rest初始化
add_action('rest_api_init', function () {

  // 注册API接口，地址参考：https://www.krjojo.com/wp-json/api/publish
  register_rest_route('api', 'publish', [
    
    // 接收post提交   
    'methods' => 'POST',
    'callback' => function ($request) {

      // 验证Token密码，可以自行修改
      if ((getallheaders()['Token'] ?? '') !== 'VH6AudNa%8Z*TYSg') return;

      // 获取json参数并发布文章
      $jsonData = file_get_contents("php://input");
      $post_id  = wp_insert_post(json_decode($jsonData, true));

      // 返回发布成功或失败
      if (is_wp_error($post_id)) {
        return [
          'code' => 400,
          'id' => 0,
          'msg' => $post_id->get_error_message(),
        ];
      } else {
        return [
          'code' => 200,
          'id' => $post_id,
          'msg' => 'ok',
        ];
      }
    },
    'permission_callback' => function () {
      return true;
    }
  ], 1);
});
```

上面的 api 地址和 Token 可以自行修改

由于使用官方的 `wp_insert_post()` 函数进行发布，所以会正常触发系统依赖，meta数据也会进行判断并更新写入，包括像点赞浏览量等。

也因为使用了json提交数据，可操作的内容也非常的大，甚至可以修改已有文章，详细可以看 `wp_insert_post` 的官方文档：

<https://developer.wordpress.org/reference/functions/wp_insert_post/>

下面分享一下 python 的发布文章的写法

```
import requests

url = 'https://www.krjojo.com/wp-json/api/publish'
headers = {
    'Token': 'VH6AudNa%8Z*TYSg',        # 上面的Token
    'Content-Type': 'application/json'  # json格式数据
}
data = {
    'post_author': 1,                   # 作者id，一般是站长
    'post_date': "2024-10-08 20:40:34", # 发布时间
    'post_content': "这是内容",
    'post_title': "这是标题",
    "post_status": "publish",           # publish代表已发布，默认为 draft 草稿
    "post_category": [20, 8537],        # 分类id
    "tags_input": ["标签","测试"]        # 可以多个标签，自动识别同名
}

# 发送POST请求
response = requests.post(url, json=data, headers=headers)

# 检查响应状态码
if response.status_code == 200:
    if response.json()['code'] == 200:
        print('发布成功，文章id:', response.json()['id'])
    else :
        print('发布失败:', response.json()['msg'])
        exit()
else:
    print('请求失败，状态码:', response.status_code)
    exit()
```

由于分类比较特殊，可以存在同名，并且有上下级关系，所以只能手动填写分类id。

如果是批量发布，只需要封装到for循环即可。

看看效果图，轻松导入5W文章

![](./文章.avif)