import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// import utils from './utils';
import './assets/style/icon.css'
import './assets/style/global.scss'

Vue.config.productionTip = false
// Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
