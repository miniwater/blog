---
categories:
- HTML
- PHP
- WordPress
- 信息技术
cover: ''
date: 2024-01-19T13:21:49+08:00
draft: false
slug: 纯代码美化wordpress默认登录页
tags:
- CSS
- HTML
- login
- WordPress
- 定制
- 登录
- 美化
title: 2024纯代码美化WordPress登录页
updated: 2024-01-19T13:35:58+08:00
wp_id: 1169
---

内容来自：<https://www.iowen.cn/chundaimameihuawordpressmorendengluye/>

PHP源代码：

```
/**
 * 美化Wordpress登录页 By 一为
 * 原文地址：https://www.iowen.cn/chundaimameihuawordpressmorendengluye/
 */
function io_login_header(){
    echo '<div class="login-container">
    <div class="login-body">
        <div class="login-img shadow-lg position-relative flex-fill">
            <div class="img-bg position-absolute">
                <div class="login-info">
                    <h2>'. get_bloginfo('name') .'</h2>
                    <p>'. get_bloginfo('description') .'</p>
                </div>
            </div>
        </div>';
}

function io_login_footer(){
    echo '</div><!--login-body END-->
    </div><!--login-container END-->
    <div class="footer-copyright position-absolute">
            <span>Copyright © <a href="'. esc_url(home_url()) .'" class="text-white-50" title="'. get_bloginfo('name') .'" rel="home">'. get_bloginfo('name') .'</a></span> 
    </div>';
}
add_action('login_header', 'io_login_header');
add_action('login_footer', 'io_login_footer');

   
//登录页面的LOGO链接为首页链接
add_filter('login_headerurl',function() {return esc_url(home_url());});

/**
 * 美化Wordpress登录页 By 一为
 * 原文地址：https://www.iowen.cn/chundaimameihuawordpressmorendengluye/
 */
function custom_login_style(){
    $login_color = io_get_option('login_color',array('color-l'=>'','color-r'=>''));
    echo '<style type="text/css">
    body{background:'.$login_color['color-l'].';background:-o-linear-gradient(45deg,'.$login_color['color-l'].','.$login_color['color-r'].');background:linear-gradient(45deg,'.$login_color['color-l'].','.$login_color['color-r'].');height:100vh}
    .login h1 a{background-image:url('.io_get_option('logo',get_template_directory_uri() .'/images/logo.png').');width:180px;background-position:center center;background-size:'.io_get_option('login_logo_size',160).'px}
    .login-container{position:relative;display:flex;align-items:center;justify-content:center;height:100vh}
    .login-body{position:relative;display:flex;margin:0 1.5rem}
    .login-img{display:none}
    .img-bg{color:#fff;padding:2rem;bottom:-2rem;left:0;top:-2rem;right:0;border-radius:10px;background-image:url('.io_get_option('login_ico',get_template_directory_uri() .'/images/login.jpg').');background-repeat:no-repeat;background-position:center center;background-size:cover}
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
}
add_action('login_head', 'custom_login_style');
```

将代码添加到WordPress主题的“functions.php”文件中即可。

**我试了一下，踏马直接报错**

毕竟两年前的文章，还是要修改一下才行。

上修复后的代码：

```
function io_login_header(){
    echo '<div class="login-container">
    <div class="login-body">
        <div class="login-img shadow-lg position-relative flex-fill">
            <div class="img-bg position-absolute">
                <div class="login-info">
                    <h2>'. get_bloginfo('name') .'</h2>
                    <p>'. get_bloginfo('description') .'</p>
                </div>
            </div>
        </div>';
}

function io_login_footer(){
    echo '</div><!--login-body END-->
    </div><!--login-container END-->
    <div class="footer-copyright position-absolute">
            <span>Copyright © <a href="'. esc_url(home_url()) .'" class="text-white-50" title="'. get_bloginfo('name') .'" rel="home">'. get_bloginfo('name') .'</a></span> 
    </div>';
}
add_action('login_header', 'io_login_header');
add_action('login_footer', 'io_login_footer');

   
//登录页面的LOGO链接为首页链接
add_filter('login_headerurl',function() {return esc_url(home_url());});

function getRandomColorRGB() {

    $r = mt_rand(0, 255);

    $g = mt_rand(0, 255);

    $b = mt_rand(0, 255);

    return "rgb($r, $g, $b)";

}



function custom_login_style(){

    $login_color =['color-l'=>getRandomColorRGB(),'color-r'=>getRandomColorRGB()];
    $ico='/favicon.ico';
    $img='/wp-content/uploads/2024/01/课室低码率.jpg';
    echo '<style type="text/css">
    body{background:'.$login_color['color-l'].';background:-o-linear-gradient(45deg,'.$login_color['color-l'].','.$login_color['color-r'].');background:linear-gradient(45deg,'.$login_color['color-l'].','.$login_color['color-r'].');height:100vh}
    .login h1 a{background-image:url('.$ico.');width:180px;background-position:center center;}
    .login-container{position:relative;display:flex;align-items:center;justify-content:center;height:100vh}
    .login-body{position:relative;display:flex;margin:0 1.5rem}
    .login-img{display:none}
    .img-bg{color:#fff;padding:2rem;bottom:-2rem;left:0;top:-2rem;right:0;border-radius:10px;background-image:url('.$img.');background-repeat:no-repeat;background-position:center center;background-size:cover}
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
}
add_action('login_head', 'custom_login_style');

//关闭多语言切换按钮
add_filter( 'login_display_language_dropdown', '__return_false' );
```

`$ico` 里替换自己logo。

`$img` 里替换左边图标

```
$ico='/favicon.ico';
$img='/wp-content/uploads/2024/01/课室低码率.jpg';
```

css里没适配多语言切换按钮，只好关了（不认识中文的老外进你博客后台多半也不是干好事的）

同时为背景增加了随机渐变色，页面不再死气沉沉。

nice!