---
categories:
- Deepin
- Linux
- 信息技术
cover: ''
date: '2024-05-10T12:16:56+08:00'
draft: false
slug: deepin-下安装-firefox
tags:
- Deepin
- Firefox
- Linux
title: Deepin 下安装 Firefox
updated: '2024-05-10T12:16:56+08:00'
wp_id: 9412
---

安装了deepin系统，应用商店里的firefox版本没有最新的，每次打开firefox浏览器就提示升级，但却又无法正常升级。这里可以自己升级官方最新的firefox。

我使用的firefox国际版，下载地址为：https://www.mozilla.org/zh-CN/firefox/new/。

删除旧版的firefox后，进入刚下载存放firefox的目录：

```
$ cd ~/Downloads
```

然后解压下载的文件包：

```
$ tar -xvf firefox-84.0.2.tar.bz2
```

再将解压后的文件夹移动了/opt/目录中去：

```
$ sudo mv firefox /opt/firefox
```

进入applications目录：

```
$ cd /usr/share/applications
```

增加firefox的Desktop链接：

```
$ sudo touch firefox.desktop
```

编辑firefox.desktop：

```
$ sudo vi firefox.desktop
```

写入以下内容保存即可：

```
[Desktop Entry]
Name=Firefox
Name[bg]=Firefox
Name[ca]=Firefox
Name[cs]=Firefox
Name[el]=Firefox
Name[es]=Firefox
Name[fa]=Firefox
Name[fi]=Firefox
Name[fr]=Firefox
Name[hu]=Firefox
Name[it]=Firefox
Name[ja]=Firefox
Name[ko]=Firefox
Name[nb]=Firefox
Name[nl]=Firefox
Name[nn]=Firefox
Name[no]=Firefox
Name[pl]=Firefox
Name[pt]=Firefox
Name[pt_BR]=Firefox
Name[ru]=Firefox
Name[sk]=Firefox
Name[sv]=Firefox
Comment=Browse the World Wide Web
Comment[bg]=Сърфиране в Мрежата
Comment[ca]=Navegueu per el web
Comment[cs]=Prohlížení stránek World Wide Webu
Comment[de]=Im Internet surfen
Comment[el]=Περιηγηθείτε στον παγκόσμιο ιστό
Comment[es]=Navegue por la web
Comment[fa]=صفحات شبکه جهانی اینترنت را مرور نمایید
Comment[fi]=Selaa Internetin WWW-sivuja
Comment[fr]=Navigue sur Internet
Comment[hu]=A világháló böngészése
Comment[it]=Esplora il web
Comment[ja]=ウェブを閲覧します
Comment[ko]=웹을 돌아 다닙니다
Comment[nb]=Surf på nettet
Comment[nl]=Verken het internet
Comment[nn]=Surf på nettet
Comment[no]=Surf på nettet
Comment[pl]=Przeglądanie stron WWW
Comment[pt]=Navegue na Internet
Comment[pt_BR]=Navegue na Internet
Comment[ru]=Обозреватель Всемирной Паутины
Comment[sk]=Prehliadanie internetu
Comment[sv]=Surfa på webben
GenericName=Web Browser
GenericName[bg]=Интернет браузър
GenericName[ca]=Navegador web
GenericName[cs]=Webový prohlížeč
GenericName[de]=Webbrowser
GenericName[el]=Περιηγητής ιστού
GenericName[es]=Navegador web
GenericName[fa]=مرورگر اینترنتی
GenericName[fi]=WWW-selain
GenericName[fr]=Navigateur Web
GenericName[hu]=Webböngésző
GenericName[it]=Browser Web
GenericName[ja]=ウェブ・ブラウザ
GenericName[ko]=웹 브라우저
GenericName[nb]=Nettleser
GenericName[nl]=Webbrowser
GenericName[nn]=Nettlesar
GenericName[no]=Nettleser
GenericName[pl]=Przeglądarka WWW
GenericName[pt]=Navegador Web
GenericName[pt_BR]=Navegador Web
GenericName[ru]=Интернет-браузер
GenericName[sk]=Internetový prehliadač
GenericName[sv]=Webbläsare
X-GNOME-FullName=Firefox Web Browser
X-GNOME-FullName[bg]=Интернет браузър (Firefox)
X-GNOME-FullName[ca]=Navegador web Firefox
X-GNOME-FullName[cs]=Firefox Webový prohlížeč
X-GNOME-FullName[el]=Περιηγήτης Ιστού Firefox
X-GNOME-FullName[es]=Navegador web Firefox
X-GNOME-FullName[fa]=مرورگر اینترنتی Firefox
X-GNOME-FullName[fi]=Firefox-selain
X-GNOME-FullName[fr]=Navigateur Web Firefox
X-GNOME-FullName[hu]=Firefox webböngésző
X-GNOME-FullName[it]=Firefox Browser Web
X-GNOME-FullName[ja]=Firefox ウェブ・ブラウザ
X-GNOME-FullName[ko]=Firefox 웹 브라우저
X-GNOME-FullName[nb]=Firefox Nettleser
X-GNOME-FullName[nl]=Firefox webbrowser
X-GNOME-FullName[nn]=Firefox Nettlesar
X-GNOME-FullName[no]=Firefox Nettleser
X-GNOME-FullName[pl]=Przeglądarka WWW Firefox
X-GNOME-FullName[pt]=Firefox Navegador Web
X-GNOME-FullName[pt_BR]=Navegador Web Firefox
X-GNOME-FullName[ru]=Интернет-браузер Firefox
X-GNOME-FullName[sk]=Internetový prehliadač Firefox
X-GNOME-FullName[sv]=Webbläsaren Firefox
Exec=/opt/firefox/firefox %u
Terminal=false
X-MultipleArgs=false
Type=Application
Icon=firefox
Categories=Network;WebBrowser;
MimeType=text/html;text/xml;application/xhtml+xml;application/xml;application/vnd.mozilla.xul+xml;application/rss+xml;application/rdf+xml;image/gif;image/jpeg;image/png;x-scheme-handler/http;x-scheme-handler/https;
StartupWMClass=Firefox
StartupNotify=true
```