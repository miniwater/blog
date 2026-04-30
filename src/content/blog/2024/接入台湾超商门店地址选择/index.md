---
categories:
- 信息技术
- PHP
category: PHP
draft: false
published: 2024-10-13 22:17:23
slug: 接入台湾超商门店地址选择
tags:
- 台湾
- 7-ELEVEn
- 7-11
- SevenEleven
- Lavaral
- 全家Family Mart
- Family Mart
- 地图
- 收件
title: 接入台湾超商门店地址选择
updated: 2024-10-13 22:19:51
---

### 前言

最近遇到这样一个场景，需要让台湾客户选择离他最近的超商（如7-Eleven，FamilyMart）门店并记录下来，方便客户寄收件。

考虑到数据的准确性与直观性，排除了爬取各大超商所有门店的信息至本地的方式，而采用对接第三方网站<https://emap.pcsc.com.tw/emap.aspx>的方式。

尴尬的是没有官方文档，经过一番折腾后成功调用，记录下来。

### 接入台湾超商门店地址选择

#### 1.业务页cvs\_select view配置第三方超商地图所需参数

```
let requestData = {
    eshopid: eshopid,
    showtype: 1,
    tempvar: getRandomStr(),
    url: ''
}
```

eshopid是第三方超商地图网站分配给本站的开发者id。  
showtype 1表示，用户新选择一个超商地址。2表示选择之前就有传入默认值给第三方，这时必须同时再传门店的storeid。  
tempvar 是一个随机数，用来标识本次独一无二的请求。  
url 是第三方回调本站的方法，需用post方式接收参数。

#### 2.cvs\_select页blank打开本服务器的一个空白页cvs\_submit view

```
let cvsSubmitPage = window.open('', '_blank');
```

#### 3.在cvs\_select view中把参数插入cvs\_submit view中，并POST传参数给第三方超商地图

```
if (cvsSubmitPage) {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://emap.presco.com.tw/c2cemap.ashx');
    for (let k in requestData) {
        if (requestData.hasOwnProperty(k)) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = k;
            input.value = requestData[k];
            form.appendChild(input);
        }
    }
    cvsSubmitPage.onload = () => {
        cvsSubmitPage.document.body.appendChild(form);
        form.submit();
    }
}
```

并且提前设置好，最终的回调需要做的业务逻辑

```
window.openerCallback = function (cvsResp) {
    if (cvsResp) {
        cvsDom.innerHTML = cvsResp.storeaddress;
    }
}
```

#### 4.客户在第三方超商地图选择地图完成，之后回调本服务器的回调方法cvs\_callback url

这个过程是非连续的，应该会有时限，不过几乎不可能超时，除非客户在第三方停几个小时。

#### 5.cvs\_callback url方法获取第三方的回调参数之后，打印在该方法对应的空白页cvs\_callback view中，利用window.opener回调业务页cvs\_select view事先写好的全局方法openerCallback

先看PHP Controller获取主要参数

```
public function cvs_callback()
{
    $storename = $_POST['storename'];
    $storeid = $_POST['storeid'];
    $storeaddress = $_POST['storeaddress'];
    return $this->render('demo.cvs_callback', array(
        'cvsResp' => array(
            'storename' => $storename,
            'storeid' => $storeid,
            'storeaddress' => $storeaddress,
        ),
    ), false);
}
```

获取POST参数时，建议不要去获取tempvar，本人测试中发现未知错误，这个参数是我们自己生成的，没有必要去获取。

回调页面拿到相应参数后，使用winodw.opener调用父页面cvs\_select的方法（因为cvs\_submit,第三方,cvs\_callback都是直接跳转的，相当于一脉相传，都是cvs\_select的子页面）,并在使用完之后自动关闭。

```
let cvsResp = <? php echo json_encode($cvsResp);?>;
if (window.opener && window.opener.openerCallback) {
    window.opener.openerCallback(cvsResp);
    window.close();
}
```

### 注意

1.本功能第三方跳转功能只能在外网调试，毕竟外网无法回调你的内网

2.本业务的所有页面cvs\_select,cvs\_submit,cvs\_callback都需要在同一个三级域名并且相同的http协议。

3.应该允许外网请求cvs\_callback，出于安全考量，一般的请求都有csrf\_taken的验证过程，这时cvs\_callback应该开放这个限制。比如Lavaral是在app\Http\Middleware\VerifyCsrfToken.php开放。

```
class VerifyCsrfToken extends BaseVerifier
{
  protected $except = [
    '/demo/cvs/cvs_callback',
  ];
}
```