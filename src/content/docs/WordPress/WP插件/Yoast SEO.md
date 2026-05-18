# Yoast SEO

[WordPress.org 插件页面](https://cn.wordpress.org/plugins/wordpress-seo/)

## 可用的变量类型

> 摘录自：[Yoast SEO中可用的代码段变量列表](https://yoast.com/help/list-available-snippet-variables-yoast-seo/)

### 基本变量

| 标签 | 多变的 | 描述 |
| --- | --- | --- |
| 日期 | %%date%% | 替换为帖子/页面的日期 |
| 标题 | %%title%% | 替换为帖子/页面的标题 |
| 父标题 | %%parent_title%% | 替换为当前页面的父页面标题 |
| 存档标题 | %%archive_title%% | 已替换为 WordPress 生成的存档的正常标题。 |
| 网站标题 | %%sitename%% | 网站标题来自“设置”>“常规”页面 |
| 标语 | %%sitedesc%% | 网站标语（位于“设置”>“常规”页面） |
| 摘抄 | %%excerpt%% | 替换为文章/页面摘要（如果不存在则自动生成） |
| 仅摘录 | %%excerpt_only%% | 替换为文章/页面摘要（非自动生成） |
| 标签 | %%tag%% | 已替换为当前标签/标签集 |
| 类别 | %%category%% | 替换为文章分类（以逗号分隔） |
| 主要类别 | %%primary_category%% | 替换为帖子/页面的主要类别 |
| 类别描述 | %%category_description%% | 替换为类别描述 |
| 标签描述 | %%tag_description%% | 已替换为标签描述 |
| 术语描述 | %%term_description%% | 替换为术语描述 |
| 职称 | %%term_title%% | 替换为术语名称 |
| 搜索词 | %%searchphrase%% | 已替换为当前搜索词 |
| 分离器 | %%sep%% | 主题的 wp_title() 标签中定义的分隔符。 |

术语模板变量用于自定义分类法。如果您没有自定义分类法，请使用标签或

### 高级变量

以下变量示例需要您对 SEO 有更深入的了解。如果您不确定如何使用这些高级变量，我们建议您不要使用它们。您可以通过我们的[Yoast SEO Academy 在线课程](https://yoast.com/academy/)学习更多 SEO 知识。

| 标签 | 多变的 | 描述 |
| --- | --- | --- |
| 帖子类型（单数） | %%pt_single%% | 已替换为内容类型单标签 |
| 帖子类型（复数） | %%pt_plural%% | 已替换为内容类型复数标签 |
| 修改的 | %%modified%% | 替换为帖子/页面修改时间 |
| ID | %%id%% | 已替换为文章/页面 ID |
| 姓名 | %%name%% | 替换为帖子/页面作者的“昵称” |
| 用户描述 | %%user_description%% | 替换为帖子/页面作者的“个人简介” |
| 页码 | %%page%% | 替换为当前页码及上下文（例如，第 2 页，共 4 页） |
| 页数总计 | %%pagetotal%% | 已替换为当前页数总计 |
| 页码 | %%pagenumber%% | 已替换为当前页码 |
| 标题 | %%caption%% | 附件标题 |
| 焦点关键词 | %%focuskw%% | 替换为帖子焦点关键词 |
| Term404 | %%term404%% | 被导致 404 错误的那个弹道导弹替换了 |
| <自定义字段名称>（自定义字段） | %%cf_<custom-field-name>%% | 已替换为文章自定义字段值。移除尖括号 <> |
| <自定义分类名称>（自定义分类法） | %%ct_<custom-tax-name>%% | 已替换为帖子自定义分类，以逗号分隔。移除尖括号 <> |
| <自定义税名> 描述（自定义分类） | %%ct_desc_<custom-tax-name>%% | 已替换为自定义分类描述。移除尖括号 <> |

### WooCommerce变量

以下列出了一些可用于 WooCommerce 的变量。如果您要查找的特定变量未在下方列出，请参考上方的自定义变量信息查找所需变量。

| %%ct_product_cat%% | 产品类别（以逗号分隔） |
| --- | --- |
| %%ct_product_tag%% | 产品标签（以逗号分隔） |
| %%ct_pa_<product-attribute-slug>%% | 产品属性（以逗号分隔）。请务必删除尖括号 <>，因为它们不需要。 |

### WordPress中的默认变量

如果您想将 SEO 标题模板变量重置为默认值，请使用以下方法。元描述的默认值为空。您可以在“SEO 搜索外观”部分输入这些默认标题。这样，默认值就会被设置为该部分的全局模板变量。

| %%title%% %%page%% %%sep%% %%sitename%%% | 文章、页面、产品、媒体和自定义文章类型 |
| --- | --- |
| %%pt_plural%% Archive %%page%% %%sep%% %%sitename%% | 文章、产品和其他自定义文章类型存档页面 |
| %%term_title%% Archives %%page%% %%sep%% %%sitename%% | 分类学 |
| You searched for %%searchphrase%% %%page%% %%sep%% %%sitename%% | 特殊页面：搜索页面 |
| Page Not Found %%sep%% %%sitename%% | 特刊页：404页 |
| %%name%%, Author at %%sitename%% %%page%% | 作者存档页面 |
| %%date%% %%page%% %%sep%% %%sitename%% | 日期存档页面 |
| The post %%POSTLINK%% appeared first on %%BLOGLINK%%. | RSS订阅 |
| %%sitename%% %%page%% %%sep%% %%sitedesc%% | 首页模板 |

### 在 WordPress 中创建自定义模板变量

注册一个变量名 `%%myname%%` ，输出 `手里有只毛毛虫` 。

```php
// 自定义函数的执行方法
function get_myname() {
    return '手里有只毛毛虫';
}
 
// 注册选项
function register_custom_yoast_variables() {
    wpseo_register_var_replacement( '%%myname%%', 'get_myname', 'advanced', '介绍文本' );
}
 
// 添加自定义函数
add_action('wpseo_register_extra_replacements', 'register_custom_yoast_variables');
```