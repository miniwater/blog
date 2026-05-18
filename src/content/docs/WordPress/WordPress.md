# WordPress

## 预设用户角色

| 角色名称 (Role) | 适合对象 | 主要权限 (Capabilities) | 核心区别 |
| --- | --- | --- | --- |
| 管理员 (Administrator) | 网站所有者、站长 | ⚙️ 最高权限。 可以执行所有操作：安装/删除主题和插件、修改设置、管理所有内容和所有用户。 | 可以修改核心设置和管理所有用户。 |
| 编辑 (Editor) | 内容主管、内容经理 | 📝 可以管理（编辑、发布、删除）所有文章和页面，以及所有用户的评论。可以上传文件。 | 可以管理整个网站的所有内容，但不涉及核心设置。 |
| 作者 (Author) | 博客撰稿人 | ✍️ 可以撰写、编辑、发布和删除自己的文章。可以上传文件。 | 只能管理自己的文章，不能修改他人的内容或网站设置。 |
| 投稿者 (Contributor) | 临时撰稿人、客座作者 | 🖋️ 可以撰写和编辑自己的文章，但无法发布。文章需要等待更高级别角色（编辑或管理员）审核发布。 | 无法发布文章，无法上传文件（图片、视频等）。 |
| 订阅者 (Subscriber) | 普通注册用户 | 👤 只有最基本的权限：登录、查看内容、修改自己的个人资料（如密码、昵称）。 | 没有任何内容管理权限，仅作为注册会员的标识。 |

## 模板文件的命名规则

1. **Single Post Template**:
    - `single-{post-type}.php`：用于特定自定义文章类型的单篇文章。例如，`single-sentences.php` 会用于显示 `sentences` 自定义文章类型的单篇文章。
    - `single.php`：用于显示所有文章类型的单篇文章（除非有特定的 `single-{post-type}.php` 存在）。
2. **Archive Template**:
    - `archive-{post-type}.php`：用于显示特定自定义文章类型的归档页面。例如，`archive-sentences.php` 会用于显示 `sentences` 自定义文章类型的归档页面。
    - `archive.php`：用于显示所有文章类型的归档页面（除非有特定的 `archive-{post-type}.php` 存在）。
3. **Page Template**:
    - `page-{slug}.php`：用于显示特定页面。例如，`page-about.php` 会用于显示别名为 `about` 的页面。
    - `page-{ID}.php`：用于显示特定页面的模板，ID 为页面的唯一标识符。
    - `page.php`：用于显示所有页面（除非有特定的 `page-{slug}.php` 或 `page-{ID}.php` 存在）。
4. **Category Template**:
    - `category-{slug}.php`：用于显示特定分类的文章。例如，`category-news.php` 会用于显示别名为 `news` 的分类文章。
    - `category-{ID}.php`：用于显示特定分类ID的文章。
    - `category.php`：用于显示所有分类文章的模板。
5. **Tag Template**:
    - `tag-{slug}.php`：用于显示特定标签的文章。
    - `tag-{ID}.php`：用于显示特定标签ID的文章。
    - `tag.php`：用于显示所有标签文章的模板。
6. **Taxonomy Template**:
    - `taxonomy-{taxonomy}-{term}.php`：用于显示特定分类法和术语的文章。
    - `taxonomy-{taxonomy}.php`：用于显示特定分类法的文章。
    - `taxonomy.php`：用于显示所有分类法的模板。
7. **Author Template**:
    - `author-{nicename}.php`：用于显示特定作者的文章。
    - `author-{ID}.php`：用于显示特定作者ID的文章。
    - `author.php`：用于显示所有作者的文章。
8. **Date Template**:
    - `date.php`：用于按日期显示文章的模板。
9. **Search Template**:
    - `search.php`：用于显示搜索结果的模板。
10. **404 Template**:
    - `404.php`：用于显示404错误页面的模板。

### 加载顺序

##### 主页

- home.php
- index.php

##### 文章页面

- single-$posttype.php
- single.php
- index.php

##### 页面

- 自定义页面模板
- page-$slug.php
- page-$id.php
- page.php
- index.php

##### 分类页面

- category-$slug.php
- category-$id.php
- category.php
- archive.php
- index.php

##### 标签页面

- tag-$slug.php
- tag-$Id.php
- tag.php
- archive.php
- index.php

##### 作者页面

- author-$nickname.php
- author-$Id.php
- author.php
- archive.php
- index.php

##### 日期页面

- date.php
- archive.php
- index.php

##### 搜索页面

- search.php
- index.php

##### 404 页面

- 404.php
- index.php

##### 附件页面

- $mimetype.php
- attachment.php
- single.php
- index.php