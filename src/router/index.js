import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home'
import Room from '../pages/room'

Vue.use(Router)

const routes = [
  {
    path: '',
    name:'home',
    component: Home
  },
  {
    path: '/room',
    name: 'room',
    component: Room,
  }
]

export default new Router({
  routes
})
