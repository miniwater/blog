---
categories:
- AI
- HTML
- LLM
- 信息技术
cover: ''
date: '2025-06-25T19:04:01+08:00'
draft: false
slug: llms-txt：让ai更方便爬取你的数据
tags:
- AI
- HTML
- LLM
- Markdown
title: LLMs.txt：让AI更方便爬取你的数据
updated: '2025-06-26T17:34:35+08:00'
wp_id: 11591
---

最近，看到各种开发工具最近在其文档中添加了 LLMs.txt 支持。

虽然 `robots.txt` 和 `sitemap.xml` 是为搜索引擎设计的，但 `LLMs.txt` 针对推理引擎进行了优化。它以 LLM 可以轻松理解的格式向他们提供有关网站的信息。

## 什么是 LLMs.txt？

LLMs.txt 是一个具有特定结构的 markdown 文件。

* `/llms.txt`: 简化的文档导航视图，帮助 AI 系统快速理解站点的结构
* `/llms-full.txt`: 在一个包含所有文档的综合文件

### llms.txt

该文件必须以 `H1` 项目名称开头，后跟引用摘要。后续部分使用 `H2` 标题来组织文档链接。 “Optional”部分专门标记了可选的不太重要的资源。

```
# Project Name
> Brief project summary

Additional context and important notes

## Core Documentation
- [Quick Start](url): Description of the resource
- [API Reference](url): API documentation details

## Optional
- [Additional Resources](url): Supplementary information
```

真实案例：

* <https://docs.cursor.com/llms.txt>
* <https://wn50ds108y.apifox.cn/llms.txt>
* <https://llmstxt.org/llms.txt>

收录了大量采用llms.txt的网站，涵盖AI、金融、开发、产品等领域

<https://directory.llmstxt.cloud/>

### llms-full.txt

虽然 `/llms.txt` 提供导航和结构，但 `/llms-full.txt` 包含 markdown 中的完整文档内容。

```
# AI Review (Beta)

AI Review is a feature that allows you to review your recent changes in your codebase to catch any potential bugs.

<Frame>
  <img src="https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/advanced/review.png" alt="AI Review" />
</Frame>

You can click into individual review items to see the full context in the editor, and chat with the AI to get more information.

### Custom Review Instructions

In order for AI Review to work in your favor, you can provide custom instructions for the AI to focus on. For example,
if you want the AI to focus on performance-related issues, you could put:

```
focus on the performance of my code
```

This way, AI Review will focus on the performance of your code when scanning through your changes.

### Review Options

Currently, you have a several options to choose from to review:

*   `Review Working State`
    *   This will review your uncommitted changes.
*   `Review Diff with Main Branch`
    *   This will review the diff between your current working state and the main branch.
*   `Review Last Commit`
    *   This will review the last commit you made.
```

真实案例：

* <https://docs.cursor.com/llms-full.txt>

### 以 Markdown 格式查看文章

现代网页内除了包含可读文本的 HTML 之外，还包含大量的 JavaScript 脚本。这些脚本是面向浏览器的，对于 AI 来说是无用的冗余信息，反而占用了 AI 对话的上下文长度，使 AI 响应变慢，而且让用户付出了额外的 Token 成本。

为了解决这个问题， Answer.AI 于 2024 年 9 月提出了一个方案：网站应该提供 Markdown 格式的内容，以便于 AI 读取。

具体而言：网站上的每个网页都应该提供一个 Markdown 版本，其 URL 是给 HTML 页面的 URL 后添加 `.md`；此外，网站的根目录应该添加一个名为 `llms.txt` 的 Markdown 文件，包含网站内每个 Markdown 页面的链接，以及一些简明扼要的信息。

以wordpress为例，使用WPCode的思路：[Markdown URLs for LLMs](https://library.wpcode.com/snippet/e5wkk195/)

```
<?php
/**
 * 启用此代码段后，转到“设置”>“永久链接”，然后单击“保存更改”
 * 配置$enabled_post_types数组以指定哪些帖子类型应支持.md URL
 */
$enabled_post_types = [ 'post' ];

// Add rewrite rule to catch .md URLs
add_action( 'init', function () {
	add_rewrite_rule(
		'(.+?)\.md$',
		'index.php?markdown_url=$matches[1]',
		'top'
	);
} );

// Add custom query variable
add_filter( 'query_vars', function ( $vars ) {
	$vars[] = 'markdown_url';

	return $vars;
} );

// Handle the markdown request
add_action( 'template_redirect', function () use ( $enabled_post_types ) {
	$markdown_url = get_query_var( 'markdown_url' );

	if ( ! $markdown_url ) {
		return;
	}

	// Try to find the post by URL
	$post = ( function ( $url ) use ( $enabled_post_types ) {
		// Remove leading slash if present
		$url = ltrim( $url, '/' );

		// Try to get post by URL path
		$post_id = url_to_postid( '/' . $url );
		if ( $post_id ) {
			return get_post( $post_id );
		}

		// If that doesn't work, try by post name/slug
		foreach ( $enabled_post_types as $post_type ) {
			// Extract just the slug (last part after last slash)
			$slug = basename( $url );

			$posts = get_posts( [
				'name'        => $slug,
				'post_type'   => $post_type,
				'post_status' => 'publish',
				'numberposts' => 1
			] );

			if ( ! empty( $posts ) ) {
				return $posts[0];
			}
		}

		return null;
	} )( $markdown_url );

	if ( ! $post || ! in_array( $post->post_type, $enabled_post_types ) ) {
		status_header( 404 );
		nocache_headers();
		echo "Post not found or markdown not enabled for this post type.";
		exit;
	}

	// Generate markdown content
	$markdown_content = '';
	// Add title
	$markdown_content .= '# ' . get_the_title( $post ) . "\n\n";
	// Add metadata
	$markdown_content .= '**Published:** ' . get_the_date( 'F j, Y', $post ) . "\n";
	$markdown_content .= '**Author:** ' . get_the_author_meta( 'display_name', $post->post_author ) . "\n";
	// Add categories for posts
	if ( $post->post_type === 'post' ) {
		$categories = get_the_category( $post->ID );
		if ( ! empty( $categories ) ) {
			$cat_names        = array_map( function ( $cat ) {
				return $cat->name;
			}, $categories );
			$markdown_content .= '**Categories:** ' . implode( ', ', $cat_names ) . "\n";
		}
		// Add tags for posts
		$tags = get_the_tags( $post->ID );
		if ( ! empty( $tags ) ) {
			$tag_names        = array_map( function ( $tag ) {
				return $tag->name;
			}, $tags );
			$markdown_content .= '**Tags:** ' . implode( ', ', $tag_names ) . "\n";
		}
	}
	$markdown_content .= "\n---\n\n";
	// Convert HTML content to markdown-friendly format
	$post_content = apply_filters( 'the_content', $post->post_content );
	// Basic HTML to Markdown conversion
	$post_content     = ( function ( $html ) {
		$html = trim( preg_replace( '/\s+/', ' ', $html ) );
		$html = preg_replace( '/<h1[^>]*>(.*?)<\/h1>/i', "\n# $1\n", $html );
		$html = preg_replace( '/<h2[^>]*>(.*?)<\/h2>/i', "\n## $1\n", $html );
		$html = preg_replace( '/<h3[^>]*>(.*?)<\/h3>/i', "\n### $1\n", $html );
		$html = preg_replace( '/<h4[^>]*>(.*?)<\/h4>/i', "\n#### $1\n", $html );
		$html = preg_replace( '/<h5[^>]*>(.*?)<\/h5>/i', "\n##### $1\n", $html );
		$html = preg_replace( '/<h6[^>]*>(.*?)<\/h6>/i', "\n###### $1\n", $html );
		$html = preg_replace( '/<p[^>]*>(.*?)<\/p>/i', "$1\n\n", $html );
		$html = str_replace( [ '<br>', '<br/>', '<br />' ], "\n", $html );
		$html = preg_replace( '/<(strong|b)[^>]*>(.*?)<\/\1>/i', "**$2**", $html );
		$html = preg_replace( '/<(em|i)[^>]*>(.*?)<\/\1>/i', "*$2*", $html );
		$html = preg_replace( '/<a[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)<\/a>/i', "[$2]($1)", $html );
		$html = preg_replace( '/<img[^>]*src=["\']([^"\']*)["\'][^>]*alt=["\']([^"\']*)["\'][^>]*\/?>/i', "![$2]($1)", $html );
		$html = preg_replace( '/<img[^>]*alt=["\']([^"\']*)["\'][^>]*src=["\']([^"\']*)["\'][^>]*\/?>/i', "![$1]($2)", $html );
		$html = preg_replace( '/<img[^>]*src=["\']([^"\']*)["\'][^>]*\/?>/i', "![]($1)", $html );
		$html = preg_replace( '/<ul[^>]*>/i', "", $html );
		$html = preg_replace( '/<\/ul>/i', "\n", $html );
		$html = preg_replace( '/<ol[^>]*>/i', "", $html );
		$html = preg_replace( '/<\/ol>/i', "\n", $html );
		$html = preg_replace( '/<li[^>]*>(.*?)<\/li>/i', "- $1\n", $html );
		$html = preg_replace_callback( '/<blockquote[^>]*>(.*?)<\/blockquote>/is', function ( $matches ) {
			$lines  = explode( "\n", trim( $matches[1] ) );
			$quoted = array_map( function ( $line ) {
				return '> ' . trim( $line );
			}, $lines );

			return "\n" . implode( "\n", $quoted ) . "\n\n";
		}, $html );
		$html = preg_replace_callback( '/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/is', function ( $matches ) {
			return "\n```\n" . html_entity_decode( strip_tags( $matches[1] ) ) . "\n```\n\n";
		}, $html );
		$html = preg_replace( '/<code[^>]*>(.*?)<\/code>/i', "`$1`", $html );
		$html = strip_tags( $html );
		$html = html_entity_decode( $html, ENT_QUOTES, 'UTF-8' );
		$html = preg_replace( '/\n\s*\n\s*\n/', "\n\n", $html );

		return trim( $html );
	} )( $post_content );
	$markdown_content .= $post_content;
	// Add permalink at the end
	$markdown_content .= "\n\n---\n\n";
	$markdown_content .= '**Original URL:** ' . get_permalink( $post ) . "\n";

	// Set proper headers
	nocache_headers();
	header( 'Content-Type: text/plain; charset=UTF-8' );
	header( 'Content-Disposition: inline; filename="' . sanitize_file_name( $post->post_name ) . '.md"' );

	// Output the markdown content
	echo $markdown_content;

	// Stop WordPress from processing further
	exit;
} );
```

如果使用的是子比那种 `/%post_id%.html` 自定义结构

可以把第一段改成

```
<?php
add_action('init', function () {
	add_rewrite_rule(
		'(\d+)\.md$', // 匹配以数字开头，后跟 .md 的 URL
		'index.php?markdown_url=$matches[1].html', // 传递 123.html 给 markdown_url
		'top'
	);
});
```

真实案例：

* apifox文档 <https://wn50ds108y.apifox.cn/api-205194698.md>

## 有什么用处？

目前，LLMs.txt 提供了一个实用的解决方案，帮助人工智能系统更好地理解和利用网络内容，特别是技术文档和 API。

投喂给AI以获取知识库

将文件内容提供给你的 AI 系统，或者分享链接给可以访问 URL 的 AI 助手。

可以通过粘贴链接、将文件内容直接复制到提示中或使用 AI 工具的文件上传功能来完成。

如ChatGPT、Claude、Cursor。

## LLMs.txt工具

llms.txt 规范文档：<https://llmstxt.org/#format>

在线检测是否符合 llms.txt 规范 ：<https://llmstxtvalidator.org>

LLMs.txt 生成器：<https://llms.tools/zh>