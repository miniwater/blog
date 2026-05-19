# Git

Github教程:

<https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git>

可视化管理工具

- sublime merge
- sourcetree

Github 项目点击键盘句号（ . ）可进入在线编辑

1. 工作目录 (Working Directory)
2. 暂存区 (Staging Area / Index)
3. 本地仓库 (Local Repository)

## 代理

设置 HTTP/HTTPS 代理

```shell
# 设置 HTTP 代理
git config --global http.proxy http://127.0.0.1:7890
 
# 设置 HTTPS 代理
git config --global https.proxy http://127.0.0.1:7890
```

仅针对 GitHub 设置

```shell
git config --global http.https://github.com.proxy http://127.0.0.1:7890
git config --global https.https://github.com.proxy http://127.0.0.1:7890
```

设置 SOCKS5 代理

```shell
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890
```

取消代理设置

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

查看代理

```shell
git config --global -l
 
# 或者
 
git config --global --get http.proxy
git config --global --get https.proxy
```

## 注册

查看配置信息

```shell
git config --list
```

配置用户信息

```shell
git config --global user.name "runoob"
git config --global user.email test@runoob.com
```

查询配置信息

```shell
git config user.name
```

## 创建和克隆

初始化

```shell
git init
```

克隆

```shell
git clone <repo> <directory>
 
git clone https://github.com/juliangarnier/anime.git
```

## 提交

提交到暂存区

```shell
git add .
```

可以通过 `git status` 查看现在的状态

提交到本地仓库

```shell
git commit -m "第一次提交"
```

## 撤销

撤销工作目录修改（旧版：`git checkout .`）

用暂存区的内容来覆盖工作区

```shell
git restore .
```

`git reset` 的三种模式

1. --soft：仅重置提交记录，保留暂存区和工作区的更改。
2. --mixed（默认模式）：重置提交记录和暂存区，但保留工作区的更改。
3. --hard：重置提交记录、暂存区和工作区，所有更改都会丢失。

撤销最后一次暂存区修改，保留工作目录中的修改

```shell
git reset HEAD
```

撤销最后一次暂存区修改，清空工作目录中的修改。（用版本库（HEAD）的内容来覆盖暂存区和工作区）

```shell
git reset --hard HEAD
```

撤销最后一次本地仓库修改，修改退回至暂存区

```shell
git reset --soft HEAD~1
```

撤销最后一次本地仓库修改，修改退回至工作目录

```shell
git reset --mixed HEAD~1
```

回退到一个特定的提交， `HEAD` 改成 `提交哈希值` 

通过 `git log` 查看到的提交 ID，例如 `a1b2c3d4。`

从暂存区恢复单个文件

```shell
git reset 00b6938c5057eccc0ee1ddd70698e0231770c26 -- src/example.txt
```

## 远程仓库

在Github上创建空的远程仓库

添加目标仓库地址

```shell
git remote add origin https://github.com/xxx/xxx.git
```

[由于Github在2021年8月13日取消了对密码身份验证的支持](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls)，从而转用[个人访问令牌创建](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)。

Github：Settings->Developer settings->Personal access token->Tokens(classic)

推送

```shell
git push -u origin "master"

git push
```

拉取

```shell
git pull
```

查看全部远程仓库

```shell
git remote -v
 
git remote show origin
```

删除仓库

```shell
git remote rm origin
 
git remote remove origin
```

修改远程仓库的 Push 和 Fetch URL

```shell
git remote set-url --push origin https://github.com/username/new-repo.git
git remote set-url --fetch origin https://github.com/username/old-repo.git
```

重命名远程仓库（默认书签名称 origin 改成 krjojo）

```shell
git remote rename origin krjojo
```

## 分支与合并

查看分支列表

```shell
git branch -a
```

创建和删除分支

```shell
git branch release
 
git branch -d release
```

切换分支

```shell
git switch 分支名称

git switch master
```

### git merge

合并分支（在 master 合并 release 分支）

release > master

```shell
git merge release
 
git merge --no-ff release
```

`git merge` 有两种主要的合并策略：

1. Fast-Forward (快进模式)
    - 默认行为的一种。如果 master 分支在 release 分支创建后没有任何新的提交，Git 会简单地将 master 分支的指针直接移动到 release 分支的最新提交上。这个过程非常快，因为它不创建新的合并提交，合并后的历史记录是一条直线，看不出曾经有过分支。
2. No-Fast-Forward (--no-ff) (非快进模式)
    - 使用 --no-ff 参数会强制 Git 创建一个合并提交。

### git rebase

变基

将功能分支上的所有提交“重新播放”到目标分支的最新提交之上，最终形成一条完全线性的提交历史。

不要对已经推送到公共仓库的分支进行 rebase，因为它会重写提交历史，给其他协作者带来麻烦。

合并分支（在 release 里合并到 master 分支）

release > master

```shell
git rebase master
```

### 冲突

使用 `git status` 查看哪些文件发生了冲突。

`<<<<<<< HEAD` 到 `=======` 之间是当前分支 (`master`) 的代码。

`=======` 到 `>>>>>>> release` 之间是你要合并进来的分支 (`release`) 的代码。

解决完所有文件的冲突后，使用 git add 命令表示完成。

### 中止合并

`merge`：`git merge --abort`

`rebase`：`git rebase --abort`

## Tag标签管理

### 轻量标签（Lightweight）

给哈希值命名，`git log` 查看哈希值

```shell
git tag v1.0-light
```

### 附注标签（Annotated）

存储在 Git 数据库中的完整对象，拥有自己的元数据。

- 包含标签的创建者、创建日期和电子邮件。
- 可以为标签添加一段说明文字（tagging message），解释这个标签的意义。
- 可以使用 GPG (GNU Privacy Guard) 进行数字签名，确保标签的真实性和完整性。

```shell
git tag -a <tag-name> -m "你的附注信息"
 
git tag -a v1.0
 
git tag -a v1.0 -m "Release version 1.0"
```

为过去的提交打标签

```shell
git tag -a v0.9 -m "This is the release for version 0.9" f8e5b8a
```

### 管理

列出所有标签

```shell
git tag
```

通配符进行筛选：

```shell
git tag -l "v1.*"
```

查看标签详情

```shell
git show v1.0
```

将标签推送到远程仓库（单个+全部）

```shell
git push origin v1.0
 
git push origin --tags
```

删除标签（本地+远程）

```shell
git tag -d v1.0
 
git push origin --delete v1.0
# 旧版 git push origin :refs/tags/v1.0
```

## 常用命令

当前状态

```shell
git status
```

比较暂存区和工作区差异

```shell
git diff
```

提交历史（`q`退出）

```shell
git log
```

## 常见问题

添加了.gitignore 但是不生效

```shell
git rm -r --cached .
git add .
```
