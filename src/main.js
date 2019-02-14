import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VViewer from '../packages/index'
import base from './assets/base'
Vue.use(VViewer)
Vue.use(base)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
