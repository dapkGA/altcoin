import Vue from 'vue'
import Router from 'vue-router'
import Newsfeed from '@/components/Newsfeed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Newsfeed',
      component: Newsfeed
    }
  ]
})
