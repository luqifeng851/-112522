import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './style/reset.css'
import axios from "./utils/axios";
//引入过渡效果
import 'animate.css/animate.css'
// 引入 mint-ui 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//图片懒加载
import VueLazyload from 'vue-lazyload'
// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/favicon.ico',
  loading: '/favicon.ico',
  attempt: 1
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
