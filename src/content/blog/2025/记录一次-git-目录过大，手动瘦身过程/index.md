---
categories:
- 信息技术
- Git
category: Git
draft: false
published: 2025-11-10 22:11:08
slug: 记录一次-git-目录过大，手动瘦身过程
tags:
- git
- Github
- 清理
title: 记录一次.git 目录过大，手动瘦身过程
updated: 2025-11-11 09:12:21
---

某次不小心把大文件推送了Git，导致.git文件非常大， 每次打开都非常吃读写速度，哪怕后面把大文件删除了也无济于事。

如果是公司项目，强烈建议重新开一个git项目，开发记录是绝不能断的。

如果是个人小项目，可以尝试像我一样操作

## 强制打包松散对象

首先需要将所有松散对象打包，不会处理已有的打包文件，也不会删除任何冗余数据。

```
git repack -a -d
```

目的是把 `.git/objects/c0/`, `.git/objects/ff/` 等松散对象整合进 `.git/objects/pack`

## 找出最大的五个对象HAS

在所有打包的文件里找出最大的对象的has

```
find .git/objects/pack/ -name '*.idx' -print0 | xargs -0 git verify-pack -v | grep blob | sort -k 3 -n | tail -5
```

此时会返回以下格式，注意是倒序，**最下面**才是最大

```
5210cf42c6c3ffa52bb734cca5d3dfccee31647f blob   1693480 1654427 7025087
c0762d3fef3fd68b7331ba0e10b294d5465b415b blob   4239433 4171507 1081224
243724d2e06858f8164b7c88d96f303fe94ddfa7 blob   5660839 5581973 8679514
2cd28579e6e90a930fd2d102463ca64dbd6b2cd1 blob   43957617 43968302 69370204
8c9d7c8d2afb499f5fcf2542d73918f19aba1b33 blob   51288751 51296098 18074106
```

以我为例，拿出最大的两个对象HAS，大约分别是 51M 和 43M

| **SHA** | **类型** | **大小 (Bytes)** | **压缩大小** | **Offset** |
| --- | --- | --- | --- | --- |
| **8c9d7c8d2afb499f5fcf2542d73918f19aba1b33** | blob | **51288751** | 51296098 | 18074106 |
| **2cd28579e6e90a930fd2d102463ca64dbd6b2cd1** | blob | 43957617 | 43968302 | 69370204 |

## 查找最大的对象对应的文件名

现在，需要查找这个 SHA 对应的 文件名和路径，才能进行清理

```
git rev-list --objects --all | grep 上面的HAS
```

以我为例，返回了一个无损音乐文件，难怪这么大

```
git rev-list --objects --all | grep 8c9d7c8d2afb499f5fcf2542d73918f19aba1b33

8c9d7c8d2afb499f5fcf2542d73918f19aba1b33 assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac
```

获得关键字，也就是大文件当初的路径

```
assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac
```

## 重写历史并永久删除该文件

把获得的关键字，填入下面命令

```
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch "填写上面的关键字"' --prune-empty --tag-name-filter cat -- --all
```

以我为例，返回出现了错误，提示未提交

```
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch "assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac"' --prune-empty --tag-name-filter cat -- --all

WARNING: git-filter-branch has a glut of gotchas generating mangled history
         rewrites.  Hit Ctrl-C before proceeding to abort, then use an
         alternative filtering tool such as 'git filter-repo'
         (https://github.com/newren/git-filter-repo/) instead.  See the
         filter-branch manual page for more details; to squelch this warning,
         set FILTER_BRANCH_SQUELCH_WARNING=1.
Proceeding with filter-branch...

Cannot rewrite branches: You have unstaged changes.
```

由于我是在 window 通过 sshd 远程操作 Linux 的 git 目录，是 Git 对文件权限和换行符的处理方式不同所导致。

需要统一 Git 换行符设置和忽略权限变化：

```
git config --global core.autocrlf input

git config core.filemode false
```

重新执行后，正常返回

```
WARNING: git-filter-branch has a glut of gotchas generating mangled history
         rewrites.  Hit Ctrl-C before proceeding to abort, then use an
         alternative filtering tool such as 'git filter-repo'
         (https://github.com/newren/git-filter-repo/) instead.  See the
         filter-branch manual page for more details; to squelch this warning,
         set FILTER_BRANCH_SQUELCH_WARNING=1.
Proceeding with filter-branch...

Rewrite db082a52add5bd38ff10437aa868c51abeae51ff (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 4d9ba3536ed561213f3d63481ea24bf057abdf22 (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 18d94868655b0fd1cc91ce2e30257266fd766823 (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 51b4798cb31036aa981b023e89ac5bff1fb8fc94 (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 1c91e115ea6244ee07000eafcd5ba1848e8598f0 (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 772564597f60013210c6271831b3454ce78e90a1 (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 7952fa25ac9d80509dcef9f8e971b25b60ea929e (14/30) (1 seconds passed, remaining 1 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 7b1f68d63f85d6a81f377d441b80864dced8e596 (29/30) (1 seconds passed, remaining 0 predicted)    rm 'assets/audio/唐汉霄 - 再见深海 (微亮的瞬间).flac'
Rewrite 2ebdc75587e5efc5ad451913d489bc5e8b71b168 (29/30) (1 seconds passed, remaining 0 predicted)    
Ref 'refs/heads/main' was rewritten
Ref 'refs/remotes/origin/main' was rewritten
```

## 清理并回收空间

此时，本地.git文件夹并没有变小，还需要删除 `git filter-branch` 创建的备份，并运行垃圾回收，彻底清理本地 `.git` 目录中的旧大文件对象。

移除 git filter-branch 创建的备份引用

```
rm -rf .git/refs/original/
```

强制过期所有引用日志

```
git reflog expire --expire=now --all
```

执行垃圾回收，清理未引用的对象（这里执行完毕后git就已经缩小了）

```
git gc --prune=now
```

再次执行 GC，彻底压缩所有对象（会更慢，但更彻底）

```
git gc --aggressive --prune=now
```

完成后 `.git/objects/pack` 就是小小一个了，很可爱

## 强制推送到 GitHub

将本地干净、瘦身后的历史强制覆盖远程 GitHub 仓库。

强制推送所有分支

```
git push --force --all
```

强制推送所有标签（如果存在）

```
git push --force --tags
```

其他设备需要删除本地仓库并重新克隆，以避免冲突

完毕

![](./git.avif)