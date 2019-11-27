// Entry point for project
require('./style/style.scss');
import * as rooms from  './scripts/rooms';
import * as http from './scripts/request';
export const app = document.getElementById("app");

export default (function () {
  const init = () => {
    http.request({url:'api/rooms.json'}).then( res => {
      rooms.showRooms(JSON.parse(res));
    }).catch(err => http.handleError(err));
  }
  init();
  let btnBack = document.createElement('button');
  btnBack.id = 'btn-back';
  btnBack.innerHTML = '&larr; Back to table';
  btnBack.addEventListener('click', () => {
    init()
  })
  document.body.appendChild(btnBack);

}());