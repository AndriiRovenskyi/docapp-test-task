// // Entry point for project
// require('./style/style.scss');
// import * as rooms from  './scripts/rooms';
// import * as http from './scripts/request';
// export const app = document.getElementById("app");


import Vue from 'vue'
import router from './router'
import App from './App'

export default (function () {
//   const init = () => {
//     http.request({url:'api/rooms.json'}).then( res => {
//       rooms.showRooms(JSON.parse(res));
//     }).catch(err => http.handleError(err));
//   }
//   init();
//   let btnBack = document.createElement('button');
//   btnBack.id = 'btn-back';
//   btnBack.innerHTML = '&larr; Back to table';
//   btnBack.addEventListener('click', () => {
//     init()
//   })
//   document.body.appendChild(btnBack);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
}());

