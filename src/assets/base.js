export default {
  install (Vue) {
    Vue.prototype.$base = {}

    let doc = document.documentElement // 获取屏幕尺寸
    let baseWidth = 750 // 设计图基准尺寸
    let baseFontSize = 100 // 基准字体大小

    let getSize = () => {
      let pageWidth = doc.clientWidth
      let pageHeight = doc.clientHeight
      let fz = pageWidth / baseWidth * baseFontSize
      doc.style.fontSize = (fz > 50 ? 50 : fz) + 'px'
      Vue.prototype.$base.pageWidth = pageWidth
      Vue.prototype.$base.pageHeight = pageHeight
    }

    getSize()

    window.onresize = () => {
      getSize()
    }
  }
}
