import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './lang'
// import utils from './utils';
import './assets/styles/icon.css'
// import './assets/styles/global.scss'
// import './mock'
import './lazy'
import './utils/boost'
import './utils/create-api'
Vue.config.productionTip = false
// Vue.use(utils)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
