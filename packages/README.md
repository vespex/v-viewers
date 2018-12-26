# 组件使用说明
```
// 整体注册
<div class="images" v-viewers>
  <img src="xxxx">
  <img src="xxxx">
  <img src="xxxx">
  <img src="xxxx">
</div>
// 分组注册
<div class="images">
  <!-- 格式：v-viewer:name，用name来区分图片分组 -->
  <img src="xxxx" v-viewer:img1>
  <img src="xxxx" v-viewer:img1>
  <img src="xxxx" v-viewer:img2>
  <img src="xxxx" v-viewer:img2>
</div>
// data属性注册
<div class="images" v-viewers:other data-images="xxxx,xxxx"></div>
```