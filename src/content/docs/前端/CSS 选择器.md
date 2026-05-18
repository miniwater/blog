# CSS 选择器

详细文档：

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has)

## :has()

匹配具有特定兄弟元素或内部包含特定元素

```html
<div class="has_d">
  <p class="has_p1">父级 判断父级有 has_d 类</p>
  <p class="has_p2">同级 判断下个同级是p元素</p>
  <p class="has_p3">子集 判断子集有 has_s 类<span class="has_s"></span></p>
</div>
<style>
.has_d:has(.has_p1) .has_p1{
  color:blue;
}
.has_p2:has(+ p){
  color:orange;
}
.has_p3:has(.has_s){
  color:red;
}
</style>
```

父级 判断父级有 has_d 类

同级 判断下个同级是p元素

子集 判断子集有 has_s 类

## :not()

匹配任何不是指定元素/选择器的元素。

```html
<div class="not_d">
  <p class="not_p1">判断当前元素没有 not_p2 类</p>
  <p class="not_p1 not_p2">这有 not_p2 类</p>
</div>
<div class="not_d">
  <span>判断 not_d 类子元素下没有 p 标签</span>
</div>
<style>
.not_p1:not(.not_p2){
  color:blue;
}
.not_d >:not(p){
  color:red;
}
</style>
```

判断当前元素没有 not_p2 类

这有 not_p2 类

判断 not_d 类子元素下没有 p 标签

## :is()

匹配选择器列表中的任何一个

权重最高

```css
article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  color: #333;
  margin-bottom: 1em;
}
 
article :is(h1, h2, h3, h4, h5, h6) {
  color: #333;
  margin-bottom: 1em;
}
```

## :where()

匹配选择器列表中的任何一个，除了权重，其他与:is() 一样

权重最低

```html
<div class="where_d">
  <p>这是蓝色</p>
</div>
 
<style>
/* 明确性：(0,1,1) */
:is(.where_d) p {
  color: blue; 
}
 
/* 明确性：(0,0,1) */
/* p {
 color: green; 
} */
 
/* 明确性：(0,0,1) */
:where(.where_d) p {
  color: red; 
}
</style>
```
