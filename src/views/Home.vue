<template>
  <div class="home">
   <h1>{{msg}}</h1>
   <h3>mode 1</h3>
   <div class="images" v-viewers>
     <img src="@/assets/img/doge.jpeg" alt="好大一只狗">
     <img src="@/assets/img/doge.jpeg" alt="好大一只狗">
     <img src="@/assets/img/doge.jpeg" alt="好大一只狗">
     <img src="@/assets/img/doge.jpeg" alt="好大一只狗">
   </div>
   <h3>mode 2</h3>
   <div class="images">
     <!-- v-viewer:name来指定图片分组 -->
     <img src="@/assets/img/doge.jpeg" v-viewer:img1 alt="好大一只狗">
     <img src="@/assets/img/doge.jpeg" v-viewer:img1 alt="好大一只狗">
     <img src="@/assets/img/doge.jpeg" v-viewer:img2 alt="好大一只狗">
     <img src="@/assets/img/doge.jpeg" v-viewer:img2 alt="好大一只狗">
   </div>
   <h3>mode 3</h3>
   <div class="images" v-viewers:other data-images="https://dummyimage.com/600x2400/fff/000,https://dummyimage.com/1600x2400/fff/000,https://dummyimage.com/600x400/fff/000,https://dummyimage.com/1600x400/fff/000">
     点我 点我
   </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to AcViewer',
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
