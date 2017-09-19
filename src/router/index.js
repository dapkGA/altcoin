import Vue from 'vue'
import Router from 'vue-router'
import Newsfeed from '@/components/Newsfeed'
import Eth from '@/components/Eth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Newsfeed',
      component: Newsfeed
    },
    {
      path: '/eth',
      name: 'Eth',
      component: Eth
    }
  ]
})
