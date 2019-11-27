import * as http from "./request";
import * as formDetails from "./form-details";
import {app} from '../app'

export const showForms = (forms, patient) => {
    let container = document.getElementById('form-container'),
        formDetailsContainer = document.createElement('div')
    formDetailsContainer.id = 'form-details-container';
    if(!container){
        container = document.createElement('div');
        container.id = 'form-container';
    }else{
        container.innerHTML = '';
    }
    forms.forEach(el => {
        const tab = document.createElement('div');
        tab.innerHTML = `
                <span>${el.short_title}</span>
            `;
        tab.addEventListener('click', (event) => {
            event.target.className = 'active';
            formDetails.showDetailsForm(el.code, patient);
        });
        container.appendChild(tab);
    });
    container.appendChild(formDetailsContainer);
    app.appendChild(container);
    formDetails.showDetailsForm(forms[0].code, patient);

}