---
categories:
- Docker
- 信息技术
cover: ''
date: '2024-07-02T14:31:15+08:00'
draft: false
slug: docker通过cloudflare-workers加速代理
tags:
- Cloudflare
- Docker
- 镜像加速
title: Docker通过Cloudflare workers加速代理
updated: '2025-12-17T19:19:47+08:00'
wp_id: 9706
---

最近阿里的镜像加速也废了，只好另辟蹊径，既然有域名，有cf，那就可以实现一下骚操作

## 要求

可用域名一枚

并且把**域名服务器**改为 **cloudflare**

## 效果

Docker镜像加速： <https://docker.krjojo.com>

或者手动输入测试速度

```
docker pull docker.krjojo.com/library/mysql:8.0
```

建议不要使用私人镜像加速，不稳定并且不可信，包括我的这个

当然子域名也不是非要docker，可以需改成别的

下面是教程

## 手动搭建 cloudflare workers

教程来源：<https://global.v2ex.com/t/1007922>

登录 <https://dash.cloudflare.com/>

左侧栏选择 Workers 和 Pages

![](./cf.avif)

点击右侧创建

![](./cf2.avif)

![](./cf3.avif)

填写名称并部署，我这里填docker，方便区分

![](./cf4.avif)

部署成功后，选择编辑代码

填写以下代码，注意修改自己域名，并点击右上角 **部署**

```
'use strict'

const hub_host = 'registry-1.docker.io'
const auth_url = 'https://auth.docker.io'
const workers_url = 'https://你的域名'
/**
 * static files (404.html, sw.js, conf.js)
 */

/** @type {RequestInit} */
const PREFLIGHT_INIT = {
    status: 204,
    headers: new Headers({
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
        'access-control-max-age': '1728000',
    }),
}

/**
 * @param {any} body
 * @param {number} status
 * @param {Object<string, string>} headers
 */
function makeRes(body, status = 200, headers = {}) {
    headers['access-control-allow-origin'] = '*'
    return new Response(body, {status, headers})
}

/**
 * @param {string} urlStr
 */
function newUrl(urlStr) {
    try {
        return new URL(urlStr)
    } catch (err) {
        return null
    }
}

addEventListener('fetch', e => {
    const ret = fetchHandler(e)
        .catch(err => makeRes('cfworker error:\n' + err.stack, 502))
    e.respondWith(ret)
})

/**
 * @param {FetchEvent} e
 */
async function fetchHandler(e) {
  const getReqHeader = (key) => e.request.headers.get(key);

  let url = new URL(e.request.url);

  if (url.pathname === '/token') {
      let token_parameter = {
        headers: {
        'Host': 'auth.docker.io',
        'User-Agent': getReqHeader("User-Agent"),
        'Accept': getReqHeader("Accept"),
        'Accept-Language': getReqHeader("Accept-Language"),
        'Accept-Encoding': getReqHeader("Accept-Encoding"),
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0'
        }
      };
      let token_url = auth_url + url.pathname + url.search
      return fetch(new Request(token_url, e.request), token_parameter)
  }

  url.hostname = hub_host;
  
  let parameter = {
    headers: {
      'Host': hub_host,
      'User-Agent': getReqHeader("User-Agent"),
      'Accept': getReqHeader("Accept"),
      'Accept-Language': getReqHeader("Accept-Language"),
      'Accept-Encoding': getReqHeader("Accept-Encoding"),
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0'
    },
    cacheTtl: 3600
  };

  if (e.request.headers.has("Authorization")) {
    parameter.headers.Authorization = getReqHeader("Authorization");
  }

  let original_response = await fetch(new Request(url, e.request), parameter)
  let original_response_clone = original_response.clone();
  let original_text = original_response_clone.body;
  let response_headers = original_response.headers;
  let new_response_headers = new Headers(response_headers);
  let status = original_response.status;

  if (new_response_headers.get("Www-Authenticate")) {
    let auth = new_response_headers.get("Www-Authenticate");
    let re = new RegExp(auth_url, 'g');
    new_response_headers.set("Www-Authenticate", response_headers.get("Www-Authenticate").replace(re, workers_url));
  }

  if (new_response_headers.get("Location")) {
    return httpHandler(e.request, new_response_headers.get("Location"))
  }

  let response = new Response(original_text, {
            status,
            headers: new_response_headers
        })
  return response;
  
}

/**
 * @param {Request} req
 * @param {string} pathname
 */
function httpHandler(req, pathname) {
    const reqHdrRaw = req.headers

    // preflight
    if (req.method === 'OPTIONS' &&
        reqHdrRaw.has('access-control-request-headers')
    ) {
        return new Response(null, PREFLIGHT_INIT)
    }

    let rawLen = ''

    const reqHdrNew = new Headers(reqHdrRaw)

    const refer = reqHdrNew.get('referer')

    let urlStr = pathname
    
    const urlObj = newUrl(urlStr)

    /** @type {RequestInit} */
    const reqInit = {
        method: req.method,
        headers: reqHdrNew,
        redirect: 'follow',
        body: req.body
    }
    return proxy(urlObj, reqInit, rawLen, 0)
}

/**
 *
 * @param {URL} urlObj
 * @param {RequestInit} reqInit
 */
async function proxy(urlObj, reqInit, rawLen) {
    const res = await fetch(urlObj.href, reqInit)
    const resHdrOld = res.headers
    const resHdrNew = new Headers(resHdrOld)

    // verify
    if (rawLen) {
        const newLen = resHdrOld.get('content-length') || ''
        const badLen = (rawLen !== newLen)

        if (badLen) {
            return makeRes(res.body, 400, {
                '--error': `bad len: ${newLen}, except: ${rawLen}`,
                'access-control-expose-headers': '--error',
            })
        }
    }
    const status = res.status
    resHdrNew.set('access-control-expose-headers', '*')
    resHdrNew.set('access-control-allow-origin', '*')
    resHdrNew.set('Cache-Control', 'max-age=1500')
    
    resHdrNew.delete('content-security-policy')
    resHdrNew.delete('content-security-policy-report-only')
    resHdrNew.delete('clear-site-data')

    return new Response(res.body, {
        status,
        headers: resHdrNew
    })
}
```

参考：

![](./cf5.avif)

回到 **Workers 和 Pages** 页面，进入设置

在 **域和路由** 里添加自己域名，Cloudflare自动帮你处理https

（Cloudflare送的workers.dev子域名可以删除，本身访问困难，且与代码内填写的域名值不对，几乎无法使用）

![](./cf6.avif)

最后不要忘记在docker中设置镜像加速

```
{
  "registry-mirrors": ["https://docker.krjojo.com"]
}
```

## ~~通过 cloudflare-docker-proxy 项目代理~~

2024年10月18更新：

发现个问题，https://auth.docker.io 也被墙的话无法处理，具体表现为

```
 [internal] load metadata for docker.io/library/php:8.3.8-fpm-alpine
failed to solve: DeadlineExceeded: DeadlineExceeded: DeadlineExceeded: php:8.3.8-fpm-alpine: failed to resolve source metadata for docker.io/library/php:8.3.8-fpm-alpine: failed to authorize: DeadlineExceeded: failed to fetch anonymous token: Get "https://auth.docker.io/token?scope=repository%3Alibrary%2Fphp%3Apull&service=registry.docker.io": dial tcp 174.37.175.229:443: i/o timeout
#2 ERROR: failed to authorize: DeadlineExceeded: failed to fetch anonymous token: Get "https://auth.docker.io/token?scope=repository%3Alibrary%2Fphp%3Apull&service=registry.docker.io": dial tcp 174.37.175.229:443: i/o timeout
------
> [internal] load metadata for docker.io/library/php:8.3.8-fpm-alpine:
```

故淘汰此做法

打开 <https://github.com/ciiiii/cloudflare-docker-proxy> 项目

该项目本身的域名已经被污染，如果想要使用，需要把项目的域名改成自己的域名重新跑起来。

Fork 该项目，方便做下面修改

修改 `src/index.js` 文件，把文件里面的 `libcuda.so` **全部替换**成自己的**主域名**，主域名没有前缀，如 `krjojo.com`

src/index.js：

```
const routes = {
  // production
  "docker.libcuda.so": dockerHub,
  "quay.libcuda.so": "https://quay.io",
  "gcr.libcuda.so": "https://gcr.io",
  "k8s-gcr.libcuda.so": "https://k8s.gcr.io",
  "k8s.libcuda.so": "https://registry.k8s.io",
  "ghcr.libcuda.so": "https://ghcr.io",
  "cloudsmith.libcuda.so": "https://docker.cloudsmith.io",
  "ecr.libcuda.so": "https://public.ecr.aws",

  // staging
  "docker-staging.libcuda.so": dockerHub,
};
```

修改后

```
const routes = {
  // production
  "docker.krjojo.com": dockerHub,
  "quay.krjojo.com": "https://quay.io",
  "gcr.krjojo.com": "https://gcr.io",
  "k8s-gcr.krjojo.com": "https://k8s.gcr.io",
  "k8s.krjojo.com": "https://registry.k8s.io",
  "ghcr.krjojo.com": "https://ghcr.io",
  "cloudsmith.krjojo.com": "https://docker.cloudsmith.io",
  "ecr.krjojo.com": "https://public.ecr.aws",

  // staging
  "docker-staging.krjojo.com": dockerHub,
};
```

修改 `README.md` 文件，把 `ciiiii` 替换成自己GitHub名称

目的是为了在readme中点击部署时，网址能正确指向我们Fork出来的项目，当然不改也没关系，用的时候调一下链接就好

README.md：

```
# cloudflare-docker-proxy

![deploy](https://github.com/ciiiii/cloudflare-docker-proxy/actions/workflows/deploy.yaml/badge.svg)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ciiiii/cloudflare-docker-proxy)

> If you're looking for proxy for helm, maybe you can try [cloudflare-helm-proxy](https://github.com/ciiiii/cloudflare-helm-proxy).

## Deploy

1. click the "Deploy With Workers" button
2. follow the instructions to fork and deploy
3. update routes as you requirement

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ciiiii/cloudflare-docker-proxy)
```

修改后

```
# cloudflare-docker-proxy

![deploy](https://github.com/ciiiii/cloudflare-docker-proxy/actions/workflows/deploy.yaml/badge.svg)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/miniwater/cloudflare-docker-proxy)

> If you're looking for proxy for helm, maybe you can try [cloudflare-helm-proxy](https://github.com/ciiiii/cloudflare-helm-proxy).

## Deploy

1. click the "Deploy With Workers" button
2. follow the instructions to fork and deploy
3. update routes as you requirement

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/miniwater/cloudflare-docker-proxy)
```

回到自己项目首页，点击『**Deploy with workers**』后，会自动跳转到授权、账号连接页面。

Cloudflare 授权中，

左边填写帐户 ID，在cf后台中点击自己域名后，在右侧下面 **API** 栏可以看到

右边填写API令牌，就在刚刚 **API** 栏的下面有个 [获取您的 API 令牌](https://dash.cloudflare.com/profile/api-tokens)，选择创建令牌，使用 **编辑 Cloudflare Workers** 模板，帐户资源选择自己账户，区域资源选择特定区域以及自己的域名，

一路继续并激活GitHub Actions

部署成功后点击中间的 Worker dash，选择 cloudflare-docker-proxy，设置，触发器

点击添加自定义域：`docker.你的域名.com`，例如 docker.krjojo.com

如果只需要docker镜像加速，那就到此为止就足够了

要是想激活完全体，还可以把全部都加上，下面是对应表格

|  |  |
| --- | --- |
| 自己域名 | 目标 |
| docker.krjojo.com | https://registry-1.docker.io |
| quay.krjojo.com | https://quay.io |
| gcr.krjojo.com | https://gcr.io |
| k8s-gcr.krjojo.com | https://k8s.gcr.io |
| k8s.krjojo.com | https://registry.k8s.io |
| ghcr.krjojo.com | https://ghcr.io |
| cloudsmith.krjojo.com | https://docker.cloudsmith.io |
| ecr.krjojo.com | https://public.ecr.aws |
| docker-staging.krjojo.com | https://registry-1.docker.io |

最后不要忘记在docker中设置镜像加速

```
{
	"registry-mirrors": [
		"https://docker.krjojo.com"
	]
}
```