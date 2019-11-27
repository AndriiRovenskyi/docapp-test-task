import * as room from  './room';
import { app } from '../app'

export const showRooms = (rooms) => {
        app.innerHTML = '';
        document.getElementById("btn-back").style.display = 'none';
        
        const table = document.createElement('table');
        table.innerHTML = `
                <tr>
                    <th>#Room</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Time appointment</th>
                    <th>Waiting time</th>
                    <th>Doctor</th>
                    <th>Assistant</th>
                </tr>
            `;
        rooms.forEach(el => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                    <td>Room ${el.code} (${el.appointment.code})</td>
                    <td>${el.appointment.first_name} ${el.appointment.last_name}</td>
                    <td>${el.status.title}</td>
                    <td>${getFormatDate(el.appointment.start_time)}</td>
                    <td id="${el.code}">(${getWaitingTime(el.update_time)})</td>
                    <td>${el.appointment.doctor_title}</td>
                    <td>${el.appointment.assistant}</td>
                  `;
            table.appendChild(tr);
                tr.addEventListener('click', event => {
                    clearInterval(interval);
                    room.showRoom(el.appointment, el.code);
                    document.getElementById("btn-back").style.display = 'block';
                })
        })
        app.innerHTML = '';
        app.appendChild(table);
        let interval = setInterval(()=>{
                rooms.forEach(el => {
                    document.getElementById(el.code).innerHTML = `(${getWaitingTime(el.update_time)})`;
                })
        }, 1000)
};

function getFormatDate(date) {
    let newDate = date.split(':');
    let hours = newDate[0];
    let minutes = newDate[1];
    let newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 && minutes > 0 ? '0' + minutes : minutes;
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
