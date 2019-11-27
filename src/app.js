// Entry point for project
import * as rooms from  './scripts/rooms';
import * as http from './scripts/request';
export const app = document.getElementById("app");

export default (function () {
  http.request({url:'api/rooms.json'}).then( res => {
      rooms.showRooms(JSON.parse(res));
  }).catch(err => http.handleError(err));
}());