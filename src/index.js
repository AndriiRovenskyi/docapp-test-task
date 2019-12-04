import Vue from 'vue'
import router from './router'
import App from './App'
export const bus = new Vue();

import './style/style.scss'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')