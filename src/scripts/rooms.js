import * as room from  './room';
import { app } from '../app'

export const showRooms = (rooms) => {
        let interval = setInterval(()=>{
            const table = document.createElement('table');
            rooms.forEach(el => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>Room ${el.code} (${el.appointment.code})</td>
                    <td>${el.appointment.first_name} ${el.appointment.last_name}</td>
                    <td>${el.status.title}</td>
                    <td>${getFormatDate(el.appointment.start_time)}</td>
                    <td>${getWaitingTime(el.update_time)}</td>
                    <td>${el.appointment.doctor_title}</td>
                    <td>${el.appointment.assistant}</td>
                  `;
                table.appendChild(tr);
                tr.addEventListener('click', event => {
                    clearInterval(interval);
                    room.showRoom(el.appointment, el.code);
                })
            })
            app.innerHTML = '';
            app.appendChild(table);
        }, 1000)
};

function getFormatDate(date) {
    let newDate = date.split(':');
    let hours = newDate[0];
    let minutes = newDate[1];
    let newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + newformat;
}

function getWaitingTime(date) {
    let time = Math.round((new Date().getTime() - date) / 1000);
    let seconds = time % 60;
    time = Math.round(time / 60);
    let minutes = time % 60;
    let hours = Math.round(time / 60);
    return hours + ':' + minutes + ':' + seconds;
}
