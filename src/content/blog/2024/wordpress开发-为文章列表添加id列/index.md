---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: 2024-02-25T13:56:20+08:00
draft: false
slug: wordpress开发-为文章列表添加id列
tags:
- id
- PHP
- WordPress
- 插件
title: Wordpress为文章列表添加id列
updated: 2024-03-12T23:48:00+08:00
wp_id: 1310
---

在 function.php 下添加：

需要注意 `add_filter` 和 `add_action`，不要弄混

```
function krjojo_tool_id_column($columns)

{

  if (count($columns) > 2) {

    $columns = array_merge(array_slice($columns, 0, 1), ['krjojo_tool_id' => 'ID'], array_slice($columns, 1));

  }

  // $columns['id'] = 'ID';

  return $columns;

}

function krjojo_tool_id_value($column_name, $id)

{

  if ($column_name == 'krjojo_tool_id') echo $id;

}

function krjojo_tool_filter_id_value($value, $column_name, $id)

{

  if ($column_name == 'krjojo_tool_id') $value = $id;

  return $value;

}

// 文章

add_filter('manage_posts_columns', 'krjojo_tool_id_column');

add_action('manage_posts_custom_column', 'krjojo_tool_id_value', 10, 2);

// 页面

add_filter('manage_pages_columns', 'krjojo_tool_id_column');

add_action('manage_pages_custom_column', 'krjojo_tool_id_value', 10, 2);

// 媒体

add_filter('manage_media_columns', 'krjojo_tool_id_column');

add_action('manage_media_custom_column', 'krjojo_tool_id_value', 10, 2);

// 链接

add_filter('manage_link-manager_columns', 'krjojo_tool_id_column');

add_action('manage_link_custom_column', 'krjojo_tool_id_value', 10, 2);

// 分类

foreach (get_taxonomies() as $taxonomy) {

  add_action("manage_edit-" . $taxonomy . "_columns", 'krjojo_tool_id_column');

  add_filter("manage_" . $taxonomy . "_custom_column", 'krjojo_tool_filter_id_value', 10, 3);

}

// 用户

add_action('manage_users_columns','krjojo_tool_id_column');

add_filter('manage_users_custom_column','krjojo_tool_filter_id_value',10,3);

// 评论

add_action('manage_edit-comments_columns','krjojo_tool_id_column');

add_action('manage_comments_custom_column','krjojo_tool_id_value',10,2);

// 样式 ID列宽度

add_action('admin_head', function () {

  echo '<style type="text/css">#krjojo_tool_id { width: 50px; }</style>';

});

```