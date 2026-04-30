---
categories:
- 信息技术
- HTML
category: HTML
draft: false
published: 2021-01-19 23:13:22
slug: wordpress页脚显示页面加载时间的方法
tags: []
title: WordPress页脚显示页面加载时间的方法
updated: 2023-04-21 23:53:47
---

将下面的代码添加到当前主题的 **函数模板**(**functions.php**) 文件：

```
//显示页面查询次数、加载时间和内存占用 From WNAG.COM.CN
function performance( $visible = false ) {
	$stat = sprintf(  '本次加载耗时：%.3fs',
		timer_stop( 0, 3 )
	);
	echo $visible ? $stat : "<!-- {$stat} -->" ;
}
```

然后可以在需要显示的地方，使用下面的代码进行调用：

```
<?php if(function_exists('performance')) performance(true) ;?>
```

OK