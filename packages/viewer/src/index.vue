<template>
  <div class="v-viewer" v-show="isShow">
    <div class="v-viewer-options" v-if="hasOpts" @click="optsTap">
      <a href="javascript:;" class="v-viewer-btn" data-event="reset">还原</a>
      <a href="javascript:;" class="v-viewer-btn" data-event="bigger">放大</a>
      <a href="javascript:;" class="v-viewer-btn" data-event="smaller">缩小</a>
      <a href="javascript:;" class="v-viewer-btn" data-event="close">关闭</a>
    </div>
    <div class="v-viewer-content" ref="viewer">
      <div class="v-viewer-wrap" :style="{width: `${width * images.length}px`, transform: `translateX(${move}px)`}" :class="moving ? '' : 'transition'">
        <div class="v-viewer-images" :style="{width: `${width}px`}" :key="index" v-for="(img, index) in images">
          <img class="v-viewer-img" :style="{maxWidth: `${width}px`, maxHeight: `${height}px`}" :src="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'

const tempPinch = {
  x: 0,
  y: 0
}
const translate = {
  x: 0, y: 0
}
const tempTrans = {
  x: 0, y: 0
}
let tempScale = 1
let scale = 1
let taped = null
let temp = 0
let timer = null
let img = null
export default {
  name: 'v-viewers',
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    hasOpts: {
      type: Boolean,
      default: true
    },
    maxScale: {
      type: Number,
      default: 4
    },
    minScale: {
      type: Number,
      default: 1
    },
    range: {
      type: Number,
      default: 0.5
    },
  },
  data () {
    return {
      isShow: false,
      width: null,
      height: null,
      move: 0,
      moving: false,
      index: 0,
      img: null,
      imgs: []
    }
  },
  created () {
    this.getSize()
    window.addEventListener('resize', this.getSize, false)
  },
  mounted () {
    const mc = new Hammer.Manager(this.$refs.viewer)
    const Pan = new Hammer.Pan()
    const Pinch = new Hammer.Pinch()
    const Tap = new Hammer.Tap()
    mc.add([Tap, Pan, Pinch]);
    mc.on('panstart', this.panStart)
    mc.on('panmove', this.panMove)
    mc.on('panend', this.panEnd)
    mc.on('pinchstart', this.pinchStart)
    mc.on('pinchmove', this.pinchMove)
    mc.on('tap', this.tap)
  },
  methods: {
    optsTap (e) {
      e.preventDefault()
      e.target.dataset.event && this[e.target.dataset.event]()
    },
    stopBody (e) {
      e.preventDefault()
    },
    panStart () {
      temp = this.move
      tempTrans.x = translate.x
      tempTrans.y = translate.y
      timer = Date.now()
      this.moving = true
    },
    panMove (e) {
      if (scale > 1 && e.target.nodeName === 'IMG') {
        translate.x = tempTrans.x + (e.deltaX) / scale
        translate.y = tempTrans.y + (e.deltaY) / scale
        this.setTransform()
      } else {
        this.move = temp + e.deltaX
      }
    },
    panEnd (e) {
      const now = Date.now()
      this.move = temp + e.deltaX
      let index = this.index
      this.moving = false
      if (now - timer < 200 && Math.abs(temp - this.move) > this.width / 4) {
        index = this.getIndex(index)
      } else if (Math.abs(temp - this.move) > this.width / 2 && scale === 1) {
        index = this.getIndex(index)
      }
      if (this.index !== index) {
        this.reset()
        this.setIndex(index)
      }
      this.move = -index * this.width
    },
    pinchStart (e) {
      tempPinch.x = e.deltaX
      tempPinch.y = e.deltaY
      tempScale = scale
    },
    pinchMove (e) {
      e.preventDefault();
      scale = Math.min(Math.max(tempScale * e.scale, this.minScale), this.maxScale)
      if (scale === 1) {
        translate.x = 0
        translate.y = 0
      }
      this.setTransform()
    },
    setTransform () {
      const {x, y} = translate
      const transform = `scale(${scale}) translate(${x}px, ${y}px)`
      img.style.transform = transform
      img.style.webkitTransform = transform
    },
    tap () {
      if (taped) {
        clearTimeout(taped)
        this.doubleTap()
        taped = null
      } else {
        taped = setTimeout(() => {
          if (scale === 1) {
            this.close()
          }
          taped = null
        }, 300)
      }
    },
    doubleTap () {
      if (scale === 1) {
        scale = 2
      } else {
        this.reset()
      }
      this.setTransform()
    },
    open(index = 0) {
      document.body.addEventListener('touchstart', this.stopBody, false)
      this.imgs = this.$refs.viewer.getElementsByClassName('v-viewer-img')
      this.setIndex(index)
      this.move = -index * this.width
      this.isShow = true
    },
    close() {
      document.body.removeEventListener('touchstart', this.stopBody, false)
      this.reset()
      this.isShow = false
    },
    setIndex(index = 0) {
      this.index = index
      img = this.imgs[index]
    },
    bigger () {
      if (scale < this.maxScale) {
        scale = Math.min(scale + this.range, this.maxScale)
        this.setTransform()
      }
    },
    smaller () {
      if (scale > this.minScale) {
        scale = Math.max(scale - this.range, this.minScale)
        this.setTransform()
      }
    },
    reset() {
      scale = 1
      translate.x = 0
      translate.y = 0
      this.setTransform()
    },
    getSize () {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
    },
    getIndex (index) {
      if (temp > this.move) {
        index < this.images.length - 1 && index++
      } else {
        index > 0 && index--
      }
      return index
    },
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getSize, false)
    document.body.removeEventListener('touchstart', this.stopBody)
  }
}
</script>

<style lang="scss" scoped>
.v-viewer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  &-content {
    height: 100%;
  }
  &-wrap {
    height: 100%;
  }
  &-images {
    overflow: hidden;
    float: left;
    position: relative;
    height: 100%;
  }
  &-img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  &-options {
    top: 10px;
    right: 10px;
    position: absolute;
    z-index: 100;
  }
  &-btn {
    display: inline-block;
    padding: 20px 25px;
    line-height: 1;
    font-size: 28px;
    color: #fff;
    background: #999;
    margin: 0 3px;
    text-decoration: none;
  }
}
.transition {
  transition: .3s;
}
</style>
