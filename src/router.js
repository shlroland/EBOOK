import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/ebook'
  },
  {
    path: '/ebook',
    component: () => import('./views/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('./components/ebook/EbookReader.vue')
      }
    ]
  }
  ]
})
