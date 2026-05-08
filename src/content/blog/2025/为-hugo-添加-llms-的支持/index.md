---
categories:
- AI
- HTML
- LLM
- 信息技术
cover: ./输出md文件.avif
date: 2025-08-20T21:39:56+08:00
draft: false
slug: 为-hugo-添加-llms-的支持
tags:
- AI
- Hugo
- LLMS
title: 为 Hugo 添加 LLMS 的支持
updated: 2025-08-20T23:48:59+08:00
wp_id: 12092
---

首先表明观点：

> 需要特定格式来消费信息的人工智能不是人工智能。
>
> 人工智能不需要它自己的格式来理解我的网站，如果它不能理解 HTML，那么它就不是人工智能。

好，如果还是不死心，要给小笨蛋ai做在线知识库，那就开始今天的正片内容：

添加 LLM 友好的 Hugo 内容。

现在的 LLMs.txt 标准尚未被广泛采用，但是 Hugo 开发者说了，如果未来 LLMS 获得更多关注，Hugo 将会原生支持 LLMS嵌入式模板。

目前只能通过手动去创建 LLMS 模板。

## 创建 LLMS

这里利用 robots.txt 作为代码入口，正好可以放入llms-txt链接，

（不用robots改成其他入口文件，比如 home.html 布局文件也是可以的）

启用 robots.txt

hugo.yaml

```
enableRobotsTXT: true
```

用于动态生成，和链接一个名为 `llms.txt` 的文件。

layouts/robots.txt

```
User-agent: *

{{/* LLMS */}}
{{- $llms := resources.Get "llms.txt" -}}
{{- if $llms -}}
  {{- $llms := $llms | resources.ExecuteAsTemplate "llms.txt" . -}}
  llms-txt: {{ $llms.Permalink }}  
{{- end }}
```

最后创建编写 llms.txt 的布局格式

assets\llms.txt

```
{{ with .Site.Title -}}
    # {{ . }}
{{- end }}

{{ with .Site.Params.Description -}}
> {{ . }}
{{- end }}

{{ range (where (sort ((.Site.GetPage "/").Pages) "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
    - [{{ .Title }}]({{ .Permalink }}): {{ .Description }}
{{ end -}}

{{/* Sections */}}
{{ range (where (sort ((.Site.GetPage "/").Sections) "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
{{ with .Title -}}
    ## {{ . }}
{{- end }}

{{ with .Description -}}
    > {{ . }}
{{- end }}

{{ range (where (sort .Pages "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
    {{ if .Title -}}
        - [{{ .Title }}]({{ .Permalink }}){{ with .Description }}: {{ . }}{{ end }}
    {{- end }}
{{ end -}}

{{/* Sub-Sections */}}
{{ range (where (sort .Sections "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
{{ with .Title -}}
    ### {{ . }}
{{- end }}

{{ with .Description -}}
    > {{ . }}
{{- end }}

{{ range (where (sort .Pages "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
    {{ if .Title -}}
        - [{{ .Title }}]({{ .Permalink }}){{ with .Description }}: {{ . }}{{ end }}
    {{- end }}
{{ end }}
{{ end -}}

{{ end -}}
```

此时，运行 hugo server ，已经能正常编译出llms.txt文件了

如果不需要在 robots.txt 里显示 llms-txt 的链接，可以把 `llms-txt: {{ $llmsTXT.Permalink }}` 这行删除

具体效果：<https://aao.fyi/llms.txt>

与 [curcor](https://docs.cursor.com/llms.txt) 对比，基本一样

![](./llms.avif)

参考自：<https://discourse.gohugo.io/t/support-for-llms-txt-standard-for-ai-crawlers/53782/3>

## 创建 LLMS-FULL

llms-full 支持度非常低，甚至连 llms 的官网也不支持

<https://llmstxt.org/llms-full.txt>，可以看到返回404

当然，想要支持很简单，与上面llms无异

robots.txt 底下追加代码

layouts\robots.txt

```
{{/* LLMS-FULL */}}
{{- $llmsfull := resources.Get "llms-full.txt" -}}
{{- if $llmsfull -}}
  {{- $llmsfull := $llmsfull | resources.ExecuteAsTemplate "llms-full.txt" . -}}
  llms-full-txt: {{ $llmsfull.Permalink }}
{{- end }}
```

编写 llms-full.txt 的布局格式

assets\llms-full.txt

```
{{- range .Site.RegularPages -}}
# {{ .Title }}
Source: {{ .Permalink }}
{{ .RawContent }}

{{ end -}}
```

最终效果可以和 [cursor](https://docs.cursor.com/llms-full.txt) 对比

![](./llms-full.avif)

## 添加 MD 文件以进行 LLM 友好的站点使用

这个有点麻烦，需要[创建自定义输出格式](https://gohugo.io/configuration/output-formats/)

在 hugo.yaml 文件中追加单页的markdown输出格式，

用 outputFormats.baseName 设置文件名前缀，符合llms 官网所要求的 index.html -> index.html.md 。

用 outputs.page 设置多输出一个 markdown 文件

hugo.yaml

```
outputFormats:
  MARKDOWN:
    mediaType: "text/markdown"
    isPlainText: true
    baseName: "index.html"
    
outputs:
  page: ["HTML", "MARKDOWN"]
```

创建 single.markdown ，用于表示单页文章的 markdown 布局

如果你想为单一类型文章和页面创建 .md，比如blog，可以把文件放在 layouts\blog\single.markdown （不过hugo控制台可能会报警告，因为无法限制单一分区下输出文件，会提示其他页面找不到markdown布局文件，不影响使用）

layouts\single.markdown

```
# {{ .Title }}
{{ .RawContent }}
```

最后运行就可以看到输出结果了

![](./输出md文件.avif)

## 在llms.txt链接md格式文件

此时你会发现，有 llms.txt 文件，也有 MD 友好文件，但是 llms 指向的连接确是普通页面的 html。

我们需要修改llms.txt，把 `{{ .Permalink }}` 改写成 `{{ (.OutputFormats.Get "MARKDOWN").Permalink }}` ，来指向之前 outputFormats 设置的md格式

这里只修改分区下的链接做演示

assets\llms.go.txt

```
{{ with .Site.Title -}}
    # {{ . }}
{{- end }}

{{ with .Site.Params.Description -}}
> {{ . }}
{{- end }}

{{ range (where (sort ((.Site.GetPage "/").Pages) "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
    - [{{ .Title }}]({{ .Permalink }}): {{ .Description }}
{{ end -}}

{{/* Sections */}}
{{ range (where (sort ((.Site.GetPage "/").Sections) "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
{{ with .Title -}}
    ## {{ . }}
{{- end }}

{{ with .Description -}}
    > {{ . }}
{{- end }}

{{ range (where (sort .Pages "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
    {{ if .Title -}}
        - [{{ .Title }}]({{ (.OutputFormats.Get "MARKDOWN").Permalink }}){{ with .Description }}: {{ . }}{{ end }}
    {{- end }}
{{ end -}}

{{/* Sub-Sections */}}
{{ range (where (sort .Sections "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
{{ with .Title -}}
    ### {{ . }}
{{- end }}

{{ with .Description -}}
    > {{ . }}
{{- end }}

{{ range (where (sort .Pages "Weight" "asc" "Date" "desc" "Lastmod" "desc") "Params.sitemap_exclude" "ne" true) -}}
    {{ if .Title -}}
        - [{{ .Title }}]({{ .Permalink }}){{ with .Description }}: {{ . }}{{ end }}
    {{- end }}
{{ end }}
{{ end -}}

{{ end -}}
```

最后看看效果

![](./llms-md.avif)