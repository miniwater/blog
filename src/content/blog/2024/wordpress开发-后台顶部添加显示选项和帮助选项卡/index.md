---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: '2024-03-12T13:58:46+08:00'
draft: false
slug: wordpress开发-后台顶部添加显示选项和帮助选项卡
tags:
- HTML
- menu
- PHP
- WordPress
- WordPress后台
- 帮助选项
- 显示选项
- 菜单
title: WordPress后台顶部添加显示选项和帮助选项卡
updated: '2024-03-12T23:47:44+08:00'
wp_id: 1424
---

如何在后台顶部右上角添加 显示选项卡 和 帮助选项卡 。

通过wordpress提供的接口可以轻易实现该功能。

在 `add_action('admin_menu', '')` 创建菜单中，添加以下内容：

```
add_action('admin_menu', function () {
    $krjojo_tool = add_submenu_page(
        'krjojo_slug',
        '插件完整标题',
        '插件左标题',
        'manage_options',
        'krjojo_tool_slug',
        'krjojo_tool_html'
    );

    add_action('load-' . $krjojo_tool, function () {

        // 创建分页选项
        add_screen_option('per_page', [
            // 'label'   => '每页显示',
            'default' => 20,
            'option' => 'krjojo_tool_per_page'
        ]);

        // 创建帮助选项卡
        $screen = get_current_screen();
        $screen->add_help_tab([
            'id'      => 'krjojo_tool_email_log_help',
            'title'   => '概述',
            'content' => '<p>这里是我的插件的帮助内容。</p>',
        ]);
        $screen->add_help_tab([
            'id'      => 'krjojo_tool_email_log_help2',
            'title'   => '可执行操作',
            'content' => '<p>这里是我的插件的帮助内容2。</p>',
        ]);
    });
});
```

保存刷新便能在页面顶部看到内容了。

但如果你点进显示选项卡修改分页数，会发现数值无法保存，怎么点击都是默认数20，其实这需要另外手动实现方法保存。

wordpress提供了保存选项的实现方法。

```
add_filter('set-screen-option', function ($screen_option, $option, $value) {
    return $option === 'krjojo_tool_per_page' ? $value : $screen_option;
}, 10, 3);
```

但是该方法却不能放在 `add_action('admin_menu', '')` 中。

需要更早调用才能运作，如 init 中。

```
add_action('init', function () {
    add_filter('set-screen-option', function ($screen_option, $option, $value) {
        return $option === 'krjojo_tool_per_page' ? $value : $screen_option;
    }, 10, 3);
});
```

总体感觉非常诡异。

这时候保存数据，便能在数据库中 `wp_usermeta` 中看到保存的值了。

获取分页数方法，在表格中：

```
class Krjojo_Tool_Table extends WP_List_Table
{
    ...
    function prepare_items()
    {
        $per_page = $this->get_items_per_page('krjojo_tool_per_page');
    }
    ...
}
```

如果要表格外获取数据，那就要判断当前是什么用户，再获取该用户的 `krjojo_tool_per_page` 的值。

具体代码就不演示了。

全部合在一起便是：

```
add_action('init', function () {
    add_filter('set-screen-option', function ($screen_option, $option, $value) {
        return $option === 'krjojo_tool_per_page' ? $value : $screen_option;
    }, 10, 3);
});

add_action('admin_menu', function () {
    $krjojo_tool = add_submenu_page(
        'krjojo_slug',
        '插件完整标题',
        '插件左标题',
        'manage_options',
        'krjojo_tool_slug',
        'krjojo_tool_html'
    );

    add_action('load-' . $krjojo_tool, function () {

        // 创建分页选项
        add_screen_option('per_page', [
            // 'label'   => '每页显示',
            'default' => 20,
            'option' => 'krjojo_tool_per_page'
        ]);

        // 创建帮助选项卡
        $screen = get_current_screen();
        $screen->add_help_tab([
            'id'      => 'krjojo_tool_email_log_help',
            'title'   => '概述',
            'content' => '<p>这里是我的插件的帮助内容。</p>',
        ]);
        $screen->add_help_tab([
            'id'      => 'krjojo_tool_email_log_help2',
            'title'   => '可执行操作',
            'content' => '<p>这里是我的插件的帮助内容2。</p>',
        ]);
    });
});

class Krjojo_Tool_Table extends WP_List_Table
{
    ...
    function prepare_items()
    {
        $per_page = $this->get_items_per_page('krjojo_tool_per_page');
    }
    ...
}
```