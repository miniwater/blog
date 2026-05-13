# HTML 语义元素

![html语义](./html语义.avif 'html语义')

| 标签 | 描述 |
| --- | --- |
| `<article>` | 定义文章。 |
| `<aside>` | 定义页面内容以外的内容。 |
| `<details>` | 定义用户能够查看或隐藏的额外细节。 |
| `<figcaption>` | 定义 `<figure>` 元素的标题。 |
| `<figure>` | 规定自包含内容，比如图示、图表、照片、代码清单等。 |
| `<footer>` | 定义文档或节的页脚。 |
| `<header>` | 规定文档或节的页眉。 |
| `<main>` | 规定文档的主内容。 |
| `<mark>` | 定义重要的或强调的文本。 |
| `<nav>` | 定义导航链接。 |
| `<section>` | 定义文档中的节。 |
| `<summary>` | 定义 `<details>` 元素的可见标题。 |
| `<time>` | 定义日期/时间。 |

## section

独立章节。

一般包含一个标题

## article

 元素规定独立的自包含内容。

文档有其自身的意义，并且可以独立于网站其他内容进行阅读。

* 论坛
* 博客
* 新闻

```html
<section>
    <article>
        文章1
    </article>
    <article>
        文章2
    </article>
    <article>
        文章3
    </article>
</section>

```

## header

文档或节规定页眉。

## footer

文档或节规定页脚。

## nav

提供导航链接。

* 菜单
* 目录
* 索引

## aside

文档的一部分，其内容与主要内容间接相关。

用于页面主内容之外的某些内容。

* 侧边栏

## figure

与图片搭配的标题

### figcaption

* 图像
* 插图
* 图表
* 代码片段
