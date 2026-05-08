---
categories:
- PHP
- woocommerce
- WordPress
- 信息技术
cover: ''
date: 2024-03-31T10:37:23+08:00
draft: false
slug: wordpress中修改woocommerce结算页面去掉其它表单字段
tags:
- woocommerce
- WordPress
- 表单
title: Wordpress中修改woocommerce结算页面去掉其它表单字段
updated: 2024-03-31T10:39:17+08:00
wp_id: 8526
---

通过添加 `woocommerce_shared_settings` 过滤器，修改表单内容。

```
add_filter('woocommerce_shared_settings', function ($settings) {
  $settings['defaultFields']['email']['required'] = false;
  $settings['defaultFields']['email']['hidden'] = true;

  $settings['defaultFields']['last_name']['required'] = false;
  $settings['defaultFields']['last_name']['hidden'] = true;

  $settings['defaultFields']['company']['required'] = false;
  $settings['defaultFields']['company']['hidden'] = true;

  $settings['defaultFields']['country']['required'] = false;
  $settings['defaultFields']['country']['hidden'] = true;

  $settings['defaultFields']['city']['required'] = false;
  $settings['defaultFields']['city']['hidden'] = true;

  $settings['defaultFields']['state']['required'] = false;
  $settings['defaultFields']['state']['hidden'] = true;

  $settings['defaultFields']['postcode']['required'] = false;
  $settings['defaultFields']['postcode']['hidden'] = true;

  return $settings;
});
```

其中，参数 `$settings` 会返回woocommerce的完整配置信息

我们只需要关心 `$settings` 内部的数组 `defaultFields` 内容。

默认 `$settings['defaultFields']` 包含以下内容：

*格式是PHP关联数组，解析成json格式展示*

```
{
  "email": {
    "label": "電子郵件地址",
    "optionalLabel": "Email address (optional)",
    "required": true,
    "hidden": false,
    "autocomplete": "email",
    "autocapitalize": "none",
    "index": 0
  },
  "first_name": {
    "label": "名字",
    "optionalLabel": "名字 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "given-name",
    "autocapitalize": "sentences",
    "index": 10
  },
  "last_name": {
    "label": "姓氏",
    "optionalLabel": "姓氏 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "family-name",
    "autocapitalize": "sentences",
    "index": 20
  },
  "company": {
    "label": "公司",
    "optionalLabel": "公司 (選填)",
    "required": false,
    "hidden": false,
    "autocomplete": "organization",
    "autocapitalize": "sentences",
    "index": 30
  },
  "address_1": {
    "label": "地址",
    "optionalLabel": "地址 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "address-line1",
    "autocapitalize": "sentences",
    "index": 40
  },
  "address_2": {
    "label": "公寓、套房等",
    "optionalLabel": "公寓、套房等 (選填)",
    "required": false,
    "hidden": false,
    "autocomplete": "address-line2",
    "autocapitalize": "sentences",
    "index": 50
  },
  "country": {
    "label": "國家/地區",
    "optionalLabel": "國家/地區 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "country",
    "index": 50
  },
  "city": {
    "label": "城市",
    "optionalLabel": "城市 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "address-level2",
    "autocapitalize": "sentences",
    "index": 70
  },
  "state": {
    "label": "縣/市",
    "optionalLabel": "州/郡 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "address-level1",
    "autocapitalize": "sentences",
    "index": 80
  },
  "postcode": {
    "label": "郵遞區號",
    "optionalLabel": "郵遞區號 (選填)",
    "required": true,
    "hidden": false,
    "autocomplete": "postal-code",
    "autocapitalize": "characters",
    "index": 90
  },
  "phone": {
    "label": "聯絡電話",
    "optionalLabel": "電話 (選填)",
    "required": false,
    "hidden": false,
    "type": "tel",
    "autocomplete": "tel",
    "autocapitalize": "characters",
    "index": 100
  }
}
```

可以修改关键字可以影响表单显示效果

* label
* optionalLabel
* required
* hidden
* index

* 必填时文本内容
* 选填时文本内容
* true 必填 | false 选填
* true 隐藏 | false 显示
* 排序