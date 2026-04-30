---
categories:
- 信息技术
- Git
category: Git
draft: false
published: 2021-04-18 13:33:00
slug: gitlab与git与webhook与宝塔的结合
tags: []
title: GitLab与Git与Webhook与宝塔的结合
updated: 2025-12-17 19:11:58
---

安装git

生成密钥SSH-key

```
git config --global user.name "mingzi"
git config --global user.email "mingzi@qq.com"

#注意替换为自己注册的邮箱 
ssh-keygen -t rsa -C "你注册gitlab的邮箱"
#然后一路默认enter，即可生成密钥
```

gitlab添加SSH密钥  
  
复制id\_rsa.pub的内容到gitlab的ssh密钥中

测试Git与GitLGab是否畅通

```
ssh -T git@"你们公司或个人的gitLab域名" #如果出现Welcome说明成功，否则出错
```

宝塔安装webhook

填写Webhook执行脚本

```
#!/bin/bash
echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"
#判断宝塔WebHook参数是否存在
if [ ! -n "$1" ];
then 
          echo "param参数错误"
          echo "End"
          exit
fi
#git项目路径
gitPath="/www/wwwroot/web/$1"
#git 网址
gitHttp="http://git.xxxxx.com/web/$1.git"

echo "Web站点路径：$gitPath"

#判断项目路径是否存在
if [ -d "$gitPath" ]; then
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                git clone $gitHttp gittemp
                mv gittemp/.git .
                rm -rf gittemp
        fi
        #拉取最新的项目文件
        git reset --hard origin/master
        git pull
        #设置目录权限
        chown -R www:www $gitPath
        echo "End"
        exit
else
        echo "该项目路径不存在"
        echo "End"
        exit
fi
```

![](./宝塔hook.avif)

编辑完成后

查看当前调用的网址：（生成调用网址 后面参数 param 为 shell 命令的变量 $1）

进入gitee仓库选择管理的webhooks添加新的webhook （密码可以不填）

添加成功后点击测试查看请求结果