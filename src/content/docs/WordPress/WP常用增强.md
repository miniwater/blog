# WP常用增强

可以搭配 [WP Code](https://cn.wordpress.org/plugins/insert-headers-and-footers/) 使用

## 后台列表显示id

```php
// 文章
add_filter('manage_posts_columns', [$this, 'show_id_column']);
add_action('manage_posts_custom_column', [$this, 'show_id_value'], 10, 2);
// 页面
add_filter('manage_pages_columns', [$this, 'show_id_column']);
add_action('manage_pages_custom_column', [$this, 'show_id_value'], 10, 2);
// 媒体
add_filter('manage_media_columns', [$this, 'show_id_column']);
add_action('manage_media_custom_column', [$this, 'show_id_value'], 10, 2);
// 链接
add_filter('manage_link-manager_columns', [$this, 'show_id_column']);
add_action('manage_link_custom_column', [$this, 'show_id_value'], 10, 2);
// 分类
foreach (get_taxonomies() as $taxonomy) {    
    add_action("manage_edit-" . $taxonomy . "_columns", [$this, 'show_id_column']);    
    add_filter("manage_" . $taxonomy . "_custom_column", [$this, 'show_id_filter_id_value'], 10, 3);
}
// 用户
add_action('manage_users_columns', [$this, 'show_id_column']);
add_filter('manage_users_custom_column', [$this, 'show_id_filter_id_value'], 10, 3);
// 评论
add_action('manage_edit-comments_columns', [$this, 'show_id_column']);
add_action('manage_comments_custom_column', [$this, 'show_id_value'], 10, 2);
// 样式 ID列宽度
add_action('admin_head', function () {
    echo '<style type="text/css">#krjojo_tool_id { width: 50px; }</style>';
}); 

public function show_id_column($columns){
    if (count($columns) > 2) {        $columns = array_merge(array_slice($columns, 0, 1), ['krjojo_tool_id' => 'ID'], array_slice($columns, 1));    }    
    // $columns['id'] = 'ID';    
    return $columns;
}
public function show_id_value($column_name, $id){
    if ($column_name == 'krjojo_tool_id') echo $id;
}
public function show_id_filter_id_value($value, $column_name, $id){
    if ($column_name == 'krjojo_tool_id') $value = $id;
    return $value;
}
```

## 自动添加图片灯箱

```php
add_filter('render_block_data', function ($parsed_block) {
    if (
        is_single() &&
        ($parsed_block['blockName'] ?? false) === "core/image" &&           // 判断图片古腾堡块
        ($parsed_block['attrs']["linkDestination"] ?? false) === "none" &&  // 判断图片没有连接到外部
        ($parsed_block['attrs']["lightbox"]["enabled"]  ?? false) !== true  // 判断图片没有启用灯箱
    ) {
        unset($parsed_block['attrs']['linkDestination']);
        $parsed_block['attrs']["lightbox"] = ["enabled" => true];
    }
    return $parsed_block;
});
```

## 邮件SMTP

```php
add_action('phpmailer_init', function ($phpmailer) {
    $phpmailer->FromName = '手里有只毛毛虫'; //发件人名称
    $phpmailer->Host = 'smtp.qq.com';
    $phpmailer->Port = '465';
    $phpmailer->Username = 'krjojo@qq.com'; //发件人邮箱
    $phpmailer->Password = 'password'; //发件人邮箱密码
    $phpmailer->From = 'krjojo@qq.com'; //发件人邮箱
    $phpmailer->SMTPAuth = true;
    $phpmailer->SMTPSecure = 'ssl';
    $phpmailer->IsSMTP();
});
add_filter('wp_mail_from', function () {
    return 'krjojo@qq.com'; //发件人邮箱
});
```

## 页头展示keywords

在文章的header头展示分类的keywords，现在搜索引擎基本不看

```php
add_action('wp_head', function () {
    if (is_single()) {
        global $post;
        $tags = get_the_tags($post->ID);
        if ($tags) {
            $keywords = [];
            foreach ($tags as $tag) {
                $keywords[] = $tag->name;
            }
            $keywords_string = implode(', ', $keywords);
            echo '<meta name="keywords" content="' . esc_attr($keywords_string) . '">' . "\n";
        }
    }
});
```

## 开启Wordpress对上传svg图片的支持

可以举一反三，添加其他格式支持

```php
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});
```

## 开启Wordpress自带链接功能

默认关闭，属于旧互联网友链范畴

```php
add_filter('pre_option_link_manager_enabled', '__return_true');
```

## 登录推送

```php
add_action('wp_login', function ($user_login) {
    $message = '手里有只毛毛虫-服务器登陆提醒
    登陆IP：' . $_SERVER['REMOTE_ADDR'] . '
    登陆名：' . $user_login . '
    完整信息登录：' . json_encode($_SERVER, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    wp_mail('krjojo@qq.com', '手里有只毛毛虫登录提醒', $message);
}, 10);
```

## 本地头像

```php
add_filter('pre_get_avatar_data', function ($args, $id_or_email) {
    if ($id_or_email == "1" || $id_or_email === "1456441157@qq.com" || ($id_or_email->user_id ?? "0") == "1") {
        $args['url'] = '/wp-content/uploads/2024/05/站长头像.avif';
    } else {
        $args['url'] = '/wp-content/uploads/2024/03/游客头像.webp';
    }
    return $args;
}, 10, 2);
```

## 第三方头像

把国内极难访问的 [gravatar.com](https://gravatar.com/) 替换成 [cravatar.com](https://cravatar.com/) 或 [weavatar.com](http://weavatar.com) 。

不想用外链图片可以使用上面本地头像

```php
add_filter('get_avatar_url', function ($url) {
    $url = str_replace(
        array(
            "www.gravatar.com",
            "0.gravatar.com",
            "1.gravatar.com",
            "2.gravatar.com",
            "secure.gravatar.com",
            "cn.gravatar.com",
            "gravatar.com",
            "*.gravatar.com"
        ),
        "cravatar.cn",
        $url
    );
    return $url;
}, 10);
```

## 登录页 一为主题样式

作者：一为

```php
<?php
 
add_action('login_header', function () {
    echo '<div class="login-container">
            <div class="login-body">
                <div class="login-img shadow-lg position-relative flex-fill">
                    <div class="img-bg position-absolute">
                        <div class="login-info">
                            <h2>' . get_bloginfo('name') . '</h2>
                            <p>' . get_bloginfo('description') . '</p>
                        </div>
                    </div>
                </div>';
});
 
add_action('login_footer',  function () {
    echo '</div><!--login-body END-->
            </div><!--login-container END-->
            <div class="footer-copyright position-absolute">
                    <span>Copyright © <a href="' . esc_url(home_url()) . '" class="text-white-50" title="' . get_bloginfo('name') . '" rel="home">' . get_bloginfo('name') . '</a></span> 
            </div>';
});
 
//登录页面的LOGO链接为首页链接
add_filter('login_headerurl', function () {
    return esc_url(home_url());
});
 
add_action('login_head',  function () {
    function getRandomColorRGB()
    {
        $r = mt_rand(0, 255);
        $g = mt_rand(0, 255);
        $b = mt_rand(0, 255);
        return "rgb($r, $g, $b)";
    }
 
    $login_color = ['color-l' => getRandomColorRGB(), 'color-r' => getRandomColorRGB()];
    $ico = '/favicon.ico';
    $img = '/wp-content/uploads/2024/01/课室低码率.jpg';
    echo '<style type="text/css">
            body{background:' . $login_color['color-l'] . ';background:-o-linear-gradient(45deg,' . $login_color['color-l'] . ',' . $login_color['color-r'] . ');background:linear-gradient(45deg,' . $login_color['color-l'] . ',' . $login_color['color-r'] . ');height:100vh}
            .login h1 a{background-image:url(' . $ico . ');width:180px;background-position:center center;}
            .login-container{position:relative;display:flex;align-items:center;justify-content:center;height:100vh}
            .login-body{position:relative;display:flex;margin:0 1.5rem}
            .login-img{display:none}
            .img-bg{color:#fff;padding:2rem;bottom:-2rem;left:0;top:-2rem;right:0;border-radius:10px;background-image:url(' . $img . ');background-repeat:no-repeat;background-position:center center;background-size:cover}
            .img-bg h2{font-size:2rem;margin-bottom:1.25rem}
            #login{position:relative;background:#fff;border-radius:10px;padding:28px;width:280px;box-shadow:0 1rem 3rem rgba(0,0,0,.175)}
            .flex-fill{flex:1 1 auto}
            .position-relative{position:relative}
            .position-absolute{position:absolute}
            .shadow-lg{box-shadow:0 1rem 3rem rgba(0,0,0,.175)!important}
            .footer-copyright{bottom:0;color:rgba(255,255,255,.6);text-align:center;margin:20px;left:0;right:0}
            .footer-copyright a{color:rgba(255,255,255,.6);text-decoration:none}
            #login form{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;border-width:0;padding:0}
            #login form .forgetmenot{float:none}
            .login #login_error,.login .message,.login .success{border-left-color:#40b9f1;box-shadow:none;background:#d4eeff;border-radius:6px;color:#2e73b7}
            .login #login_error{border-left-color:#f1404b;background:#ffd4d6;color:#b72e37}
            #login form p.submit{padding:20px 0 0}
            #login form p.submit .button-primary{float:none;background-color:#f1404b;font-weight:bold;color:#fff;width:100%;height:40px;border-width:0;text-shadow:none!important;border-color:none;transition:.5s}
            #login form input{box-shadow:none!important;outline:none!important}
            #login form p.submit .button-primary:hover{background-color:#444}
            .login #backtoblog,.login #nav{padding:0}
            @media screen and (min-width:768px){.login-body{width:1200px}
            .login-img{display:block}
            #login{margin-left:-60px;padding:40px}
            }
        </style>';
});
 
// 关闭多语言切换
add_filter('login_display_language_dropdown', '__return_false');
```

## 评论过滤

符合关键词和非中文评论，自动移至`垃圾评论`，不会再收到邮件打扰了。

```php
add_filter('pre_comment_approved', 'pre_comment_approved', 99, 2);
 
public function pre_comment_approved($approved, $commentdata)
    {
        $comment = $commentdata['comment_content'];
        $keyword = [
            '这里填',
            '敏感词',
            '广告网址',
        ];
        foreach ($keyword as $value) {
            if (strpos($comment, $value) !== false) {
                return 'spam';
            }
        }
        // 非中文
        if (!preg_match('/[一-龥]/u', $comment)) {
            return 'spam';
        }
 
        return $approved;
    }
```

## 后台列表添加复制文章按钮

```php
// Add duplicate button to post/page list of actions.
add_filter( 'post_row_actions', 'wpcode_snippet_duplicate_post_link', 10, 2 );
add_filter( 'page_row_actions', 'wpcode_snippet_duplicate_post_link', 10, 2 );
 
// Let's make sure the function doesn't already exist.
if ( ! function_exists( 'wpcode_snippet_duplicate_post_link' ) ) {
	/**
	 * @param array   $actions The actions added as links to the admin.
	 * @param WP_Post $post The post object.
	 *
	 * @return array
	 */
	function wpcode_snippet_duplicate_post_link( $actions, $post ) {
 
		// Don't add action if the current user can't create posts of this post type.
		$post_type_object = get_post_type_object( $post->post_type );
 
		if ( null === $post_type_object || ! current_user_can( $post_type_object->cap->create_posts ) ) {
			return $actions;
		}
 
 
		$url = wp_nonce_url(
			add_query_arg(
				array(
					'action'  => 'wpcode_snippet_duplicate_post',
					'post_id' => $post->ID,
				),
				'admin.php'
			),
			'wpcode_duplicate_post_' . $post->ID,
			'wpcode_duplicate_nonce'
		);
 
		$actions['wpcode_duplicate'] = '<a href="' . $url . '" title="Duplicate item" rel="permalink">复制</a>';
 
		return $actions;
	}
}
 
/**
 * Handle the custom action when clicking the button we added above.
 */
add_action( 'admin_action_wpcode_snippet_duplicate_post', function () {
 
	if ( empty( $_GET['post_id'] ) ) {
		wp_die( 'No post id set for the duplicate action.' );
	}
 
	$post_id = absint( $_GET['post_id'] );
 
	// Check the nonce specific to the post we are duplicating.
	if ( ! isset( $_GET['wpcode_duplicate_nonce'] ) || ! wp_verify_nonce( $_GET['wpcode_duplicate_nonce'], 'wpcode_duplicate_post_' . $post_id ) ) {
		// Display a message if the nonce is invalid, may it expired.
		wp_die( 'The link you followed has expired, please try again.' );
	}
 
	// Load the post we want to duplicate.
	$post = get_post( $post_id );
 
	// Create a new post data array from the post loaded.
	if ( $post ) {
		$current_user = wp_get_current_user();
		$new_post     = array(
			'comment_status' => $post->comment_status,
			'menu_order'     => $post->menu_order,
			'ping_status'    => $post->ping_status,
			'post_author'    => $current_user->ID,
			'post_content'   => $post->post_content,
			'post_excerpt'   => $post->post_excerpt,
			'post_name'      => $post->post_name,
			'post_parent'    => $post->post_parent,
			'post_password'  => $post->post_password,
			'post_status'    => 'draft',
			'post_title'     => $post->post_title . ' (copy)',// Add "(copy)" to the title.
			'post_type'      => $post->post_type,
			'to_ping'        => $post->to_ping,
		);
		// Create the new post
		$duplicate_id = wp_insert_post( $new_post );
		// Copy the taxonomy terms.
		$taxonomies = get_object_taxonomies( get_post_type( $post ) );
		if ( $taxonomies ) {
			foreach ( $taxonomies as $taxonomy ) {
				$post_terms = wp_get_object_terms( $post_id, $taxonomy, array( 'fields' => 'slugs' ) );
				wp_set_object_terms( $duplicate_id, $post_terms, $taxonomy );
			}
		}
		// Copy all the custom fields.
		$post_meta = get_post_meta( $post_id );
		if ( $post_meta ) {
 
			foreach ( $post_meta as $meta_key => $meta_values ) {
				if ( '_wp_old_slug' === $meta_key ) { // skip old slug.
					continue;
				}
				foreach ( $meta_values as $meta_value ) {
					add_post_meta( $duplicate_id, $meta_key, maybe_unserialize( $meta_value ) );
				}
			}
		}
 
		// Redirect to edit the new post.
		wp_safe_redirect(
			add_query_arg(
				array(
					'action' => 'edit',
					'post'   => $duplicate_id
				),
				admin_url( 'post.php' )
			)
		);
		exit;
	} else {
		wp_die( 'Error loading post for duplication, please try again.' );
	}
} );
```

## 文章外链自动跳转新窗

```php
/**
 * 自动为文章中的外部链接添加 target="_blank" 和 rel="noopener noreferrer" 属性
 * 建议添加到子主题的 functions.php 文件中。
 * * @param string $content 文章或内容的 HTML 字符串。
 * @return string 修改后的 HTML 字符串。
 */
function external_links_new_tab( $content ) {
    
    // 检查内容是否为空，避免不必要的处理
    if ( empty( $content ) ) {
        return $content;
    }
 
    // 获取当前网站的域名（需要去除协议，仅保留域名部分）
    $site_url = parse_url( home_url(), PHP_URL_HOST );
    
    // 如果无法获取域名，则不进行处理
    if ( empty( $site_url ) ) {
        return $content;
    }
 
    // 正则表达式匹配所有的 <a> 标签
    // $m[0] 是完整的 <a> 标签
    // $m[1] 是 href 属性的值 (URL)
    // $m[2] 是 <a> 标签内除去 href 的所有其他属性
    $regex = '/<a\s+(?:[^>]*?\s+)?href=["\'](?!#)([^"\' >]+)["\']([^>]*)?>(.*?)<\/a>/is';
 
    $content = preg_replace_callback( 
        $regex, 
        function( $m ) use ( $site_url ) {
            
            $link_url = $m[1]; // 链接的 URL
            $attributes = $m[2]; // 链接的其他属性 (如 class, rel)
            $link_text = $m[3]; // 链接的文本
 
            // 1. 检查是否为内部链接
            // strpos($link_url, $site_url) !== false 表示 URL 中包含本站域名，是内部链接
            if ( strpos( $link_url, $site_url ) !== false || substr( $link_url, 0, 1 ) === '/' || substr( $link_url, 0, 1 ) === '#' ) {
                // 如果是内部链接 (或相对链接/锚点链接)，则原样返回
                return $m[0];
            }
 
            // 2. 已经是外部链接：添加 target="_blank"
            
            // 确保 target="_blank" 不重复添加
            if ( strpos( $attributes, 'target="_blank"' ) === false && strpos( $attributes, 'target=\'_blank\'' ) === false ) {
                $attributes .= ' target="_blank"';
            }
            
            // 3. 添加/更新 rel 属性以增强安全性 (noopener noreferrer)
            
            // 移除现有的 rel 属性，重新构建以避免重复或冲突
            if ( preg_match( '/\srel=([\'"])(.*?)\1/i', $attributes, $rel_match ) ) {
                $attributes = preg_replace( '/\srel=([\'"])(.*?)\1/i', '', $attributes );
                $rel_values = explode( ' ', $rel_match[2] );
                // 确保 noopener 和 noreferrer 存在
                if ( ! in_array( 'noopener', $rel_values ) ) {
                    $rel_values[] = 'noopener';
                }
                if ( ! in_array( 'noreferrer', $rel_values ) ) {
                    $rel_values[] = 'noreferrer';
                }
                $new_rel = implode( ' ', array_filter( array_unique( $rel_values ) ) );
                $attributes .= ' rel="' . trim( $new_rel ) . '"';
 
            } else {
                // 如果没有 rel 属性，直接添加
                $attributes .= ' rel="noopener noreferrer"';
            }
 
            // 返回新的 <a> 标签
            return '<a href="' . $link_url . '"' . trim( $attributes ) . '>' . $link_text . '</a>';
        },
        $content
    );
 
    return $content;
}
 
// 将函数挂载到 the_content 过滤器上，确保在内容输出前执行
// 优先级 10 是默认值，可以根据需要调整，确保在其他内容处理后执行
add_filter( 'the_content', 'external_links_new_tab', 10 );
```