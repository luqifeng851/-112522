import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../components/Recommend'
import Search from '../components/Search'
import Rank from '../components/Rank'
import Singer from '../components/Singer/index.vue'
import Detail from '../components/Detail'

Vue.use(VueRouter)

const routes = [{
    path: '/recommend',
    name: 'a',
    component: Recommend,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  }, {
    path: '/rank',
    name: 'Rank',
    component: Rank,
  }, {
    path: '/singer',
    name: 'b',
    component: Singer,
    children: [{
      path: ":singermid",
      component: Detail
    }]
  }, {
    path: '/',
    redirect: '/recommend'
  }
]

const router = new VueRouter({
  routes
})

export default router
