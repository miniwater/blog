---
categories:
- 信息技术
- HTML
- PHP
category: PHP
draft: false
published: 2024-01-12 21:04:09
slug: 极简版一言php
tags: []
title: 极简版自建一言语句php
updated: 2024-07-31 16:38:27
---

查看效果：<https://www.krjojo.com/resources/sentences/>

这是hitokoto原版效果：<https://v1.hitokoto.cn/>

简直就是一模一样。

优点：

* 文件都在本地服务器
* 不依赖别人网站，高稳定性
* 不依赖数据库
* 可以自己修改语句包

缺点：

* 性能有那么一丢丢下降

一言数据来自：<https://github.com/hitokoto-osc/sentences-bundle>

一言开源社区官方提供的语句库，系 hitokoto.cn 数据打包集合。

**2024年07月31号更新**：

新增一言整合进wordpress框架

## 第一步

下载 [语句库](https://github.com/hitokoto-osc/sentences-bundle/tree/master/sentences) 全部 `json` 文件。

```
├── a.json
├── b.json
├── c.json
├── d.json
├── e.json
├── f.json
├── g.json
├── h.json
├── i.json
├── j.json
├── k.json
└── l.json
```

## 第二步

新建`index.php`文件：

```
<?php
// https://v1.hitokoto.cn/

$type_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
if (isset($_GET['c']) && !empty($_GET['c']) && in_array($_GET['c'], $type_list)) {
    $file = $_GET['c'] . ".json";
} else {
    $file = "all.json";
}

// 读取 JSON 文件内容
$jsonContent = file_get_contents('./' . $file);

// 解析 JSON 内容为数组
$array = json_decode($jsonContent, true);

// 从数组中随机选择一段文本
$randomText = $array[array_rand($array)];

// 设置响应头
header('Content-Type: application/json');

// 输出随机选中的文本
echo json_encode($randomText);

?>
```

## 第三步

把所有 `json` 文件合并成一个 `all.json` 文件，当然我也整理了。

可以直接下载。

<https://www.krjojo.com/resources/sentences/all.json>

## 第四步

最后新建一个文件夹把所有文件包起来，文件名字随意，放在站点根目录。

目录下应该为：

```
新建文件夹的名字
├── a.json
├── all.json
├── b.json
├── c.json
├── d.json
├── e.json
├── f.json
├── g.json
├── h.json
├── i.json
├── index.php
├── j.json
├── k.json
└── l.json
```

最后访问你的站点： `www.example.com/新建文件夹的名字`

如果不能正常访问则试试： `www.example.com/新建文件夹的名字/index.php`

## 说明

请求参数支持句子类型，与一言官方一致，不传则默认全部类型，如：

```
example.com/?c=a
```

#### 句子类型（参数）[​](https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0)

| 参数 | 说明 |
| --- | --- |
| a | 动画 |
| b | 漫画 |
| c | 游戏 |
| d | 文学 |
| e | 原创 |
| f | 来自网络 |
| g | 其他 |
| h | 影视 |
| i | 诗词 |
| j | 网易云 |
| k | 哲学 |
| l | 抖机灵 |
| 其他 | 作为 动画 类型处理 |

完毕

## 一言整合进wordpress框架

看看效果

<https://www.krjojo.com/wp-json/krjojo/sentences>

![](./QQ_1722413820723.avif)

优点：可以在后台管理一言了

缺点：性能可能再次下降一点点（都用wp了，谁在意 ¯\*(ツ)*/¯ ）

wordpress加入以下代码，用来注册新的文章类目

```
add_action('rest_api_init', function () {
    register_rest_route('krjojo', 'sentences', [
        'methods' => 'GET',
        'callback' => function ($request) {
            $post = get_posts(['numberposts' => 1, 'post_type' => 'sentences', 'orderby' => 'rand', 'post_status' => 'publish']);
            $post = $post[0];
            return [
                'id' => $post->ID,
                'hitokoto' => $post->post_title,
                'from' => $post->post_content,
                'creator' => $post->post_excerpt,
            ];
        },
        'permission_callback' => function () {
            return true;
        }
    ], 1);
});

add_action('init', function () {
    register_post_type('sentences', [
        'label' => "一言",
        'labels' => [
            'add_new' => '写一言'
        ],
        'description'   => '一言语句',
        // 'map_meta_cap'=>true,
        'public'        => true,
        'menu_position' => 5,
        'supports'      => ['title', 'editor',  'comments', 'excerpt'],
        // 'has_archive'   => true
    ]);

    register_taxonomy('sentences_category', 'sentences', [
        'labels' => [
            'name'              => _x('一言分类', 'taxonomy 名称'),
            'singular_name'     => _x('一言分类', 'taxonomy 单数名称'),
            'search_items'      => __('搜索一言分类'),
            'all_items'         => __('所有一言分类'),
            'parent_item'       => __('该一言分类的上级分类'),
            'parent_item_colon' => __('该一言分类的上级分类：'),
            'edit_item'         => __('编辑一言分类'),
            'update_item'       => __('更新一言分类'),
            'add_new_item'      => __('添加新的一言分类'),
            'new_item_name'     => __('新一言分类'),
            'menu_name'         => __('一言分类'),
        ],
        'hierarchical' => true,
    ]);
});
```

然后把整个一言导入数据库

post\_content 字段对应 from

post\_title 字段对应 hitokoto

creator 字段对应 post\_excerpt

post\_type 字段**设置**成 sentences

post\_status 字段**设置**成 publish

就可以实现简单的今日一言小组件了

![](./QQ_1722414642414.avif)

小组件参考代码

为了方便用的是旧版小组件，块组件制作太麻烦了

请根据自己主题样式微调

```
//一言一句话
class Krjojo_Tool_Sentences_Widget extends WP_Widget
{

    public function __construct()
    {
        parent::__construct(
            'krjojo_tool_sentences_widget',
            '一言一句话',
        );
    }

    function widget($args, $instance)
    {
        echo $args['before_widget'];
?>
        <div>
            <strong style="margin-bottom: 15px;"><?php _e('Sentences', 'WP-krjojo-tool') ?></strong>
            <hr>
            <div id="krjojo_sentences1">
                <?php _e('Loading', 'WP-krjojo-tool') ?>...
            </div>
            <div class="krjojo_sentences2">-「<span id="krjojo_sentences2"></span>」</div>
        </div>
        <script>
            // 使用 Fetch API 发起 GET 请求
            let krjojo_sentences1 = document.getElementById("krjojo_sentences1");
            let krjojo_sentences2 = document.getElementById("krjojo_sentences2");
            fetch('https://www.krjojo.com/wp-json/krjojo/sentences')
                .then(response => response.json())
                .then(data => {
                    krjojo_sentences1.innerHTML = data.hitokoto;
                    krjojo_sentences2.innerHTML = data.from;
                })
                .catch(error => console.error('Error fetching data:', error));
        </script>
        <style>
            .krjojo_sentences2 {
                text-align: right;
                font-size: 15px;
                margin-top: 6px;
                color: #6c757d;
            }
        </style>
<?php
        echo $args['after_widget'];
    }
}

add_action('widgets_init', function () {
    register_widget('Krjojo_Tool_Sentences_Widget');
});
```