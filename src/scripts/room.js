import * as http from "./request";
import * as formList from "./forms-list";
import { app } from '../app'

export const showRoom = (appointment, code) => {
    app.innerHTML = '';
    const div = document.createElement('table');
    div.innerHTML = `
    <tr>
                    <th>Room code</th>
                    <th>Start date</th>
                    <th>Details</th>
                    <th>Doctor</th>
    </tr>
    <tr>
        <td>Room ${code}</td>
        <td>${appointment.start_date}</td>
        <td>HT: ${appointment.vital_signs.height_ft}'${appointment.vital_signs.height_in}',WT ${appointment.vital_signs.weight}lbs, BMI ${appointment.vital_signs.bmi}</td>
        <td>${getDoctorFullName(appointment)}</td>
    </tr>    
      `
    app.appendChild(div);

    http.request({url:'api/consent-forms.json'}).then( res => {
        res = JSON.parse(res);
        formList.showFormList(res, {first_name: appointment.first_name, last_name: appointment.last_name});
    });
};


function getDoctorFullName(appointment) {
    let name = appointment.doctor_title + ', ' + calculateAge(new Date(appointment.birthday)) + ', ' + appointment.gender[0];
    if(!appointment.is_doctor){
        name = name.replace('Dr', appointment.gender == 'Male' ? 'Mr' : 'Ms');
    }
    return name;
}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}