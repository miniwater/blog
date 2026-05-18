---
math: true
---

# Markdown

- Markdown
- [CommonMark](https://commonmark.org/)

Markdown是一种轻量级的标记语言，可用于将格式设置元素添加到纯文本文档中。Markdown 由[John Gruber](https://daringfireball.net/projects/markdown/)于2004年创建。

由于 John Gruber 对 Markdown 语法的规范描述没有明确指定语法，因此在过去 10 年中，实现方式发生了很大差异。因此，用户经常会惊讶地发现，在一个系统上以一种方式呈现的文档（例如，GitHub wiki）在另一个系统上以不同的方式呈现（例如，使用 Pandoc 转换为文档书）。

解决 Markdown 歧义和不一致的唯一方法是 [Babelmark](https://babelmark.github.io/)，它将 20+ 个 Markdown 实现的输出相互比较，以查看是否达成共识。

## 基本语法

元素|Markdown 语法
---|---
标题 | `# H1`<br />`## H2`<br />`### H3`
粗体 | `**bold text**`
斜体 | `*italicized text*`
块引用 | `> blockquote`
有序列表 | `1. First item` <br/> `2. Second item` <br/> `3. Third item`
无序列表 | `- First item` <br/> `- Second item` <br/> `- Third item` <br />
代码 | `` `code` ``
水平线 | `---`
超链接 | `[title](https://www.qq.com)`
图片 | `![alt text](image.jpg)`

元素|Markdown 语法
---|---
表格 | `\| Syntax \| Description \|`<br/>`\| ----------- \| ----------- \|`<br/>`\| Header \| Title \|`<br/>`\| Paragraph \| Text \|`
围栏代码块 | ` ``` `<br/>`{`<br/>`"firstName": "John",`<br/>`"age": 25`<br/>`}`<br/>` ``` `
脚注 | `Here's a sentence with a footnote. [^1]`<br/><br/>`[^1]: This is the footnote.`
标题ID | `### My Great Heading {#custom-id}`
删除线 | `~~The world is flat.~~`
任务列表 | `- [x] Write the press release`<br/>`- [ ] Update the website`<br>`- [ ] Contact the media`

## 标题

```md
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 段落

段落的换行

是前后要有一个以上的空行

```md
段落的换行

是前后要有一个以上的空行
```

## 字体

正常文本

*斜体文本*  

**粗体文本**  

***粗斜体文本***

```md
正常文本

*斜体文本*

**粗体文本**

***粗斜体文本***
```

<mark>标记文本</mark>

<pre>Preformatted 文本</pre>

<small>小文本</small>

这是 <sub>下标</sub>

This is <sup>上标</sup>

```md
<mark>标记文本</mark>

<pre>Preformatted 文本</pre>

<small>小文本</small>

这是 <sub>下标</sub>

这是 <sup>上标</sup>
```

## 分隔线

***

```md
***
```

不建议

```md
* * *   

*****

- - -

----------
```

## 删除线

ABC.COM  
~~ABC.COM~~

```md
ABC@123.COM
~~ABC@123.COM~~
```

## 脚注

[^要注明的文本]

```md
[^要注明的文本]
```

## 列表

### 无序列表

- 第一项
- 第二项
- 第三项

```md
* 第一项
* 第二项
* 第三项

```

不建议

```md
+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项
```

### 有序列表

1. 第一项
2. 第二项
3. 第三项

```md
1. 第一项
2. 第二项
3. 第三项
```

### 列表嵌套

1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素

```md

1. 第一项：
    * 第一项嵌套的第一个元素
    * 第一项嵌套的第二个元素
2. 第二项：
    * 第二项嵌套的第一个元素
    * 第二项嵌套的第二个元素
```

## 区块

> 死鱼正口
> 收杆就走
> 道袍一换
> 下河开干

```md
> 死鱼正口
> 收杆就走
> 道袍一换
> 下河开干
```

> 最外层
> > 第一层嵌套
> > > 第二层嵌套
> > >
> > > 1. 第一项
> > > 2. 第二项
> > >
> > > - 第一项
> > > - 第二项
> >
> 大气层

```md
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
> > >
> > > 1. 第一项
> > > 2. 第二项
> > >
> > > * 第一项
> > > * 第二项
> >
> 大气层
```

## 代码

````md
```php
$stu = new Stu();
```
````

```php
$stu = new Stu();
```

敲击```abc```键

```md
敲击```abc```键
```

## 链接

[链接名称](example.com)

<https://example.com/>

```md
[链接名称](example.com)

<链接地址>
```

这个链接用 1 作为网址变量 [github][1]

这个链接用 runoob 作为网址变量 [Runoob][runoob]

然后在文档的结尾为变量赋值（网址）

  [1]: http://www.github.com/
  [runoob]: http://www.runoob.com/

```md
这个链接用 1 作为网址变量 [github][1]

这个链接用 runoob 作为网址变量 [Runoob][runoob]

然后在文档的结尾为变量赋值（网址）

  [1]: http://www.github.com/
  [runoob]: http://www.runoob.com/
```

## 图片

```md
![alt 属性文本](../../image/%E8%83%A1%E6%A1%83%E6%91%87.gif "胡桃摇")

![alt 属性文本](图片地址 "可选标题")

<img src="http://logo.png" width="50%">
```

## 表格

| 左对齐 | 左对齐 | 居中对齐 | 右对齐 |
| :-----| ---- | :----: | ----: |
| 格 | 格 | 格 | 格 |

```md
| 左对齐 | 左对齐 | 居中对齐 | 右对齐 |
| :-----| ---- | :----: | ----: |
| 格 | 格 | 格 | 格 |

表头   | 表头
----  | ----
格  | 格
```

## 转义

**加粗**  
\*\* 不加粗 \*\*

```md
**加粗**  
\*\* 不加粗 \*\*
```

代码块套代码块

`````md
````md
```md
**加粗**  
\*\* 不加粗 \*\*
```
````
`````

Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

```md
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```

## 内联html元素

插件作者的意图是为了使 markdown 文件是纯 markdown 的，避免在使用 html 以外的方式渲染时出错。
> [MD033/no-inline-html: Inline HTML [Element: kbd]markdownlintMD033](https://github.com/DavidAnson/markdownlint/blob/v0.25.1/doc/Rules.md#md033)

```html
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

<u>带下划线文本</u>

上标
a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
Windows 10 <sup>TM</sup>
```

### 键盘

<kbd>Ctrl</kbd>

```md
<kbd>Ctrl</kbd>
```

其他

<kbd>&uarr;</kbd>`<kbd>&uarr;</kbd>` Arrow Up

<kbd>&darr;</kbd>`<kbd>&darr;</kbd>` Arrow Down

<kbd>&larr;</kbd>`<kbd>&larr;</kbd>` Arrow Left

<kbd>&rarr;</kbd>`<kbd>&rarr;</kbd>` Arrow Right

<kbd>&#8682;</kbd>`<kbd>&#8682;</kbd>`  Caps Lock

<kbd>&#8984;</kbd>`<kbd>&#8984;</kbd>`  Command

<kbd>&#8963;</kbd>`<kbd>&#8963;</kbd>`  Control

<kbd>&#9003;</kbd>`<kbd>&#9003;</kbd>`  Delete

<kbd>&#8998;</kbd>`<kbd>&#8998;</kbd>`  Delete (Forward)

<kbd>&#8600;</kbd>`<kbd>&#8600;</kbd>`  End

<kbd>&#8996;</kbd>`<kbd>&#8996;</kbd>`  Enter

<kbd>&#9099;</kbd>`<kbd>&#9099;</kbd>`  Escape

<kbd>&#8598;</kbd>`<kbd>&#8598;</kbd>`  Home

<kbd>&#8670;</kbd>`<kbd>&#8670;</kbd>`  Page Up

<kbd>&#8671;</kbd>`<kbd>&#8671;</kbd>`  Page Down

<kbd>&#8997;</kbd>`<kbd>&#8997;</kbd>`  Option, Alt

<kbd>&#8629;</kbd>`<kbd>&#8629;</kbd>`  Return

<kbd>&#8679;</kbd>`<kbd>&#8679;</kbd>`  Shift

<kbd>&#9251;</kbd>`<kbd>&#9251;</kbd>`  Space

<kbd>&#8677;</kbd>`<kbd>&#8677;</kbd>`  Tab

<kbd>&#8676;</kbd>`<kbd>&#8676;</kbd>`  Tab + Shift

## 复选框

- [ ] Java
- [x] Php

```md
* [ ] Java
* [x] Php
```

## 注释

<!-- 这是一段被注释掉的文字 -->

```md
<!-- 这是一段被注释掉的文字 -->
```
