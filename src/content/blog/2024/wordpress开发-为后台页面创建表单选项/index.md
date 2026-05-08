---
categories:
- PHP
- WordPress
- 信息技术
cover: ''
date: '2024-02-09T14:21:04+08:00'
draft: false
slug: wordpress开发-为后台页面创建表单选项
tags:
- form
- PHP
- WordPress
- 插件
- 表单
title: WordPress为后台页面创建表单选项
updated: '2024-03-12T23:48:17+08:00'
wp_id: 1286
---

不废话，先上官方推荐做法

以下展示所有表单选项

```
<?php
add_action('admin_menu', function () {
  add_menu_page(
    '我是最棒的设置',                                // 页面内标题
    '最棒的设置',                                    // 左侧侧边栏名称
    'manage_options',                               // 菜单类型
    'i_am_good_setting_slug',                       // 唯一 id (slug）
    function () {                                   // 匿名函数输出页面的内容
      if (!current_user_can('manage_options')) {    // 如果没有管理页权限则退出
        return;
      }
  ?>
    <div class="wrap">
      <h1><?php echo esc_html(get_admin_page_title()); //输出标题 
          ?></h1>
      <h2>官方接口</h2>
      <form action="options.php" method="post">
        <?php
        // 安全，限可制修改范围，去掉后保存会跳转到 ./wp-admin/options.php，内容为设置组
        settings_fields('i_am_good_settings');
        // 显示，内容为设置组
        do_settings_sections('i_am_good_settings');
        // 保存按钮
        submit_button('保存设置');
        ?>
      </form>
    </div>
<?php
    },
    plugin_dir_url(__FILE__) . 'images/icon.svg',   // 图标位置
    20                                              // 菜单顺序中的位置
  );
});

add_action('admin_init', function () {
  // 在 {$wpdb->prefix}_options 表中创建一个条目。 删掉后保存会报错，（设置组，数据库保存的变量名）
  register_setting('i_am_good_settings', 'i_am_good_options');

  // 添加一个设置部分
  add_settings_section(
      'i_am_good_section',            // id
      'demo的设置部分',                // 标题
      '',                             // 回调函数
      'i_am_good_settings'            // 设置组
  );

  // 在《部分》里添加字段
  add_settings_field(
      'i_am_good_option1',             // 标签的唯一id
      '下拉框',                        // 选项的名称
      'i_am_good_option1',             // 回调函数，里面写输出选项的html
      'i_am_good_settings',            // 设置组
      'i_am_good_section',             // 设置部分的id
      array(
          'label_for'         => 'option1',  // wp数据库这个字段的 key，[key:value,key:value]。删掉后保存则保存数组[value,value]
      )
  );

  add_settings_field(
      'i_am_good_option2',
      '输入框',
      'i_am_good_option2',
      'i_am_good_settings',
      'i_am_good_section',
      array(
          'label_for'         => 'option2',
      )
  );

  add_settings_field(
      'i_am_good_option3',
      '选择框',
      'i_am_good_option3',
      'i_am_good_settings',
      'i_am_good_section',
      array(
          'label_for'         => 'option3',
      )
  );

  add_settings_field(
      'i_am_good_option4',
      '选择框2',
      'i_am_good_option4',
      'i_am_good_settings',
      'i_am_good_section',
      array(
          'label_for'         => 'option4',
      )
  );

  add_settings_field(
      'i_am_good_option5',
      '单选框',
      'i_am_good_option5',
      'i_am_good_settings',
      'i_am_good_section',
      array(
          'label_for'         => 'option5',
      )
  );

  add_settings_field(
      'i_am_good_option6',
      '文本框',
      'i_am_good_option6',
      'i_am_good_settings',
      'i_am_good_section',
      array(
          'label_for'         => 'option6',
      )
  );
});


function i_am_good_option1($args)
{
    $options = get_option('i_am_good_options');
?>
    <select id="<?php echo esc_attr($args['label_for']); ?>" name="i_am_good_options[<?php echo esc_attr($args['label_for']); ?>]">
        <option value="red" <?php echo isset($options[$args['label_for']]) ? (selected($options[$args['label_for']], 'red', false)) : (''); ?>>
            <?php esc_html_e('红色药丸'); ?>
        </option>
        <option value="blue" <?php echo isset($options[$args['label_for']]) ? (selected($options[$args['label_for']], 'blue', false)) : (''); ?>>
            <?php esc_html_e('蓝色药丸'); ?>
        </option>
        <option value="green" <?php echo isset($options[$args['label_for']]) ? (selected($options[$args['label_for']], 'green', false)) : (''); ?>>
            <?php esc_html_e('绿色药丸'); ?>
        </option>
    </select>
    <p class="description">
        <?php esc_html_e('你吃下蓝色药丸，故事就结束了。你从床上醒来，相信你想相信的一切。'); ?>
    </p>
    <p class="description">
        <?php esc_html_e('你吃了红色药丸，你就会留在仙境，我就让你看看兔子洞有多深。'); ?>
    </p>
<?php
}

function i_am_good_option2($args)
{
    $options = get_option('i_am_good_options')[$args['label_for']] ?? '';
?>
    <input id="<?php echo esc_attr($args['label_for']); ?>" name="i_am_good_options[<?php echo esc_attr($args['label_for']); ?>]" value="<?php echo $options; ?>">
<?php
}

function i_am_good_option3($args)
{
    $options = get_option('i_am_good_options')[$args['label_for']] ?? '0';
?>
    <input id="<?php echo esc_attr($args['label_for']); ?>" type="checkbox" name="i_am_good_options[<?php echo esc_attr($args['label_for']); ?>]" value="1" <?php echo $options ? 'checked' : ''; ?>>
    任何人都能变成超人
    <?php
}

function i_am_good_option4($args)
{
    $options = get_option('i_am_good_options')[$args['label_for']] ?? [];
    $list = ['苹果', 'oppo', '小米', '华为', 'vivo'];
    echo '<fieldset>';
    foreach ($list as $key => $value) {
        $checked = $options[$key] ?? '';
    ?>
        <input id="<?php echo esc_attr($args['label_for']) . '[' . $key . ']'; ?>" type="checkbox" name="i_am_good_options[<?php echo esc_attr($args['label_for']); ?>][<?php echo $key ?>]" value="1" <?php echo $checked ? 'checked' : ''; ?>>
    <?php echo $value;
    }
    echo '</fieldset>';
}

function i_am_good_option5($args)
{
    $options = get_option('i_am_good_options')[$args['label_for']] ?? '0';
    $list = ['秘密', '男', '女', '沃尔玛购物袋'];
    echo '<fieldset>';
    foreach ($list as $key => $value) {
    ?>
        <label>
            <input id="<?php echo esc_attr($args['label_for']) . '[' . $key . ']'; ?>" type="radio" name="i_am_good_options[<?php echo esc_attr($args['label_for']); ?>]" value="<?php echo $key ?>" <?php echo $options == $key ? 'checked' : ''; ?>>
            <span><?php echo $value; ?></span>
        </label>
        <br>
    <?php
    }
    echo '</fieldset>';
}

function i_am_good_option6($args)
{
    $options = get_option('i_am_good_options')[$args['label_for']] ?? '';
    ?>
    <textarea id="<?php echo esc_attr($args['label_for']); ?>" name="i_am_good_options[<?php echo esc_attr($args['label_for']); ?>]" rows="10" cols="50"><?php echo $options; ?></textarea>
<?php
}
```

选项很简单，但是如果我需要对表格进行操作呢？

来看看用wordpress官方类来实现操作。

注意，wordpress不建议你使用此类，原因是以后可能会有变动。

但事实上你会发现很多插件都用了此类来实现表格。

不废话，上代码：

```
<?php
add_action('admin_menu', function () {
  add_menu_page(
    '我是最棒的设置',                                // 页面内标题
    '最棒的设置',                                    // 左侧侧边栏名称
    'manage_options',                               // 菜单类型
    'i_am_good_setting_slug',                       // 唯一 id (slug）
    function () {                                   // 匿名函数输出页面的内容
      if (!current_user_can('manage_options')) {    // 如果没有管理页权限则退出
        return;
      }
  ?>
    <div class="wrap">
      <h1><?php echo esc_html(get_admin_page_title()); //输出标题 
          ?></h1>
      <h2>WP_List_Table 表格</h2>
      <?php
        $testListTable = new I_Am_Good_List_Table();
        $testListTable->prepare_items(); ?>
        <form id="movies-filter" method="get">
            <input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
            <?php $testListTable->display() ?>
        </form>
    </div>
<?php
    },
    plugin_dir_url(__FILE__) . 'images/icon.svg',   // 图标位置
    20                                              // 菜单顺序中的位置
  );
});

/**
 * https://developer.wordpress.org/reference/classes/wp_list_table/
 */
if ( ! class_exists( 'WP_List_Table' ) ) {        // 确保能找到类！
	require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}
class I_Am_Good_List_Table extends WP_List_Table
{
    // 构造函数
    function __construct()
    {
        global $status, $page;

        //Set parent defaults
        parent::__construct(array(
            'singular'  => 'movie',     //singular name of the listed records
            'plural'    => 'movies',    //plural name of the listed records
            'ajax'      => false        //does this table support ajax?
        ));
    }
    // 初始化列表方法
    function prepare_items()
    {
        // global $wpdb;
        // $sql="SELECT COUNT(*) as numbers FROM  `zhongyidc`";
        $per_page = 5;
        $columns = $this->get_columns();
        $hidden = array();
        $sortable = $this->get_sortable_columns();
        $this->_column_headers = array($columns, $hidden, $sortable);
        $this->process_bulk_action();
        $data = [[
            'ID'        => 1,
            'title'     => '300',
            'rating'    => 'R',
            'director'  => 'Zach Snyder',
            'phone' => '13336756456'
        ], [
            'ID'        => 2,
            'title'     => '400',
            'rating'    => 'G',
            'director'  => 'Zach Snyder',
            'phone' => '15435465576'
        ],];
        function usort_reorder($a, $b)
        {
            $orderby = (!empty($_REQUEST['orderby'])) ? $_REQUEST['orderby'] : 'title';
            $order = (!empty($_REQUEST['order'])) ? $_REQUEST['order'] : 'asc';
            $result = strcmp($a[$orderby], $b[$orderby]);
            return ($order === 'asc') ? $result : -$result;
        }
        usort($data, 'usort_reorder');
        $current_page = $this->get_pagenum();
        $total_items = count($data);
        $data = array_slice($data, (($current_page - 1) * $per_page), $per_page);
        $this->items = $data;
        $this->set_pagination_args(array(
            'total_items' => $total_items,
            'per_page'    => $per_page,
            'total_pages' => ceil($total_items / $per_page)
        ));
    }
    // 自定义列内容处理
    function column_ID($item)
    {
        //Build row actions
        $actions = array(
            'edit'      => sprintf('<a href="?page=%s&action=%s&movie=%s">编辑', $_REQUEST['page'], 'edit', $item['ID']),
            'delete'    => sprintf('<a href="?page=%s&action=%s&movie=%s">删除', $_REQUEST['page'], 'delete', $item['ID']),
        );

        //Return the title contents
        return sprintf(
            '%1$s%2$s',
            /*$1%s*/
            $item['ID'],
            /*$2%s*/
            $this->row_actions($actions)
        );
    }
    // 默认列内容处理
    function column_default($item, $column_name)
    {
        switch ($column_name) {
            case 'title':
            case 'rating':
            case 'director':
            case 'phone':
                return $item[$column_name];
            default:
                return print_r($item, true); //Show the whole array for troubleshooting purposes
        }
    }
    // 多选处理
    function column_cb($item)
    {
        return sprintf(
            '<input type="checkbox" name="%1$s[]" value="%2$s" />',
            /*$1%s*/
            $this->_args['singular'],  //Let's simply repurpose the table's singular label ("movie")
            /*$2%s*/
            $item['ID']                //The value of the checkbox should be the record's id
        );
    }
    // 动作处理函数
    function process_bulk_action()
    {
        //Detect when a bulk action is being triggered...
        if ('delete' === $this->current_action()) {
            wp_die('Items deleted (or they would be if we had items to delete)!');
        }
    }
    // 动作数组关联
    function get_bulk_actions()
    {
        $actions = array(
            'delete'    => '删除'
        );
        return $actions;
    }
    // 列是否允许排序
    function get_sortable_columns()
    {
        $sortable_columns = array(
            'title'     => array('title', false),     //true means it's already sorted
            'rating'    => array('rating', false),
            'director'  => array('director', false)
        );
        return $sortable_columns;
    }
    // 列标题设置
    function get_columns()
    {
        $columns = array(
            'cb'        => '<input type="checkbox" />', //选择框
            'ID' => 'user id',
            'title'     => '金额',
            'rating'    => '类型',
            'director'  => '地址',
            'phone' => '电话'
        );
        return $columns;
    }
}
```

我们发现相当复杂且繁琐，我仅仅需要一个表单，却要填写这么多代码，非常不优雅。

那有没有简介的办法呢

答案当然是有的，我们可以通过适当的骚操作实现这一过程。

不废话，上代码。

```
<?php
add_action('admin_menu', function () {
  add_menu_page(
    '我是最棒的设置',                                // 页面内标题
    '最棒的设置',                                    // 左侧侧边栏名称
    'manage_options',                               // 菜单类型
    'i_am_good_setting_slug',                       // 唯一 id (slug）
    function () {                                   // 匿名函数输出页面的内容
      if (!current_user_can('manage_options')) {    // 如果没有管理页权限则退出
        return;
      }
      $options =  [                                 // 获取表格
        ['id' => 0, 'name' => "玛卡巴卡", 'age' => '5'],
        ['id' => 1, 'name' => "太阳公公", 'age' => '500']
      ];
      if (isset($_POST['submit'])) {
        switch ($_POST['submit']) {
          case '删除':
            // 修改你的删除函数
            add_settings_error('wporg_messages', 'wporg_message', '你点击id为' . ($_POST['key'] ?? '') . '的删除', 'updated');
            break;
          case '上移':
            // 修改你的函数
            add_settings_error('wporg_messages', 'wporg_message', '你点击id为' . ($_POST['key'] ?? '') . '的上移', 'updated');
            break;
          case '下移':
            // 修改你的函数
            add_settings_error('wporg_messages', 'wporg_message', '你点击id为' . ($_POST['key'] ?? '') . '的下移', 'updated');
            break;
          case '编辑':
            // 修改你的函数
            add_settings_error('wporg_messages', 'wporg_message', '你点击id为' . ($_POST['key'] ?? '') . '的编辑', 'updated');
            break;
          case '添加':
            // 修改你的函数
            break;
        }
      }
      settings_errors('wporg_messages');      // 输出提示窗
  ?>
    <div class="wrap">
      <h1><?php echo esc_html(get_admin_page_title()); //输出标题 
          ?></h1>
      <h2>简单版 表格</h2>
      <table class="widefat striped">
        <thead>
          <tr>
            <th>id</th>
            <th>名字</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <?php
          foreach ($options as $key => $value) {
            echo '<tr>';
            echo '<td>' . ($value['id'] ?? "") . '</td>';
            echo '<td>' . ($value['name'] ?? "") . '</td>';
            echo '<td>' . ($value['age'] ?? "") . '</td>';
            echo '<td>';
            echo '<form action="" method="post"><input style="display:none;" name="key" value="' . $key . '" />
                    <input type="submit" name="submit" value="编辑" class="button button-small" />
                    <input type="submit" name="submit" value="上移" class="button button-small" ' . ($key == 0 ? "disabled" : "") . '/>
                    <input type="submit" name="submit" value="下移" class="button button-small" ' . ($key == count($options) - 1 ? "disabled" : "") . '/>
                    <input type="submit" name="submit" value="删除" class="button button-small" /></form>';
            echo '</td>';
            echo '</tr>';
          }
          ?>

        </tbody>
      </table>
    </div>
<?php
    },
    plugin_dir_url(__FILE__) . 'images/icon.svg',   // 图标位置
    20                                              // 菜单顺序中的位置
  );
});
```

简单的代码，实现了表格所有重要操作。

在form里为按钮设置不同的value，在接收的时候加以区分，就能实现按钮的不同操作，包括不限于增删查改。

同时在form里设置一个隐藏的input，就实现提交时候的传参。

```
<form action="" method="post">
  <!-- 隐藏，负责提交时传参 -->
  <input style="display:none;" name="key" value="' . $key . '" />
  <!-- 显示，操作按钮 -->
  <input type="submit" name="submit" value="编辑" class="button button-small" />
  <input type="submit" name="submit" value="上移" class="button button-small" />
  <input type="submit" name="submit" value="下移" class="button button-small" />
  <input type="submit" name="submit" value="删除" class="button button-small" />
</form>
```