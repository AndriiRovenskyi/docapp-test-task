import * as http from "./request";

export const showDetailsForm = (code, patient) => {
    const container = document.getElementById('form-details-container'),
        ul = document.createElement('ul');
    container.innerHTML = '';
    if(!container) return
    http.request({url:`api/consent-form-details/${code}.json`}).then(form => {
        JSON.parse(form).forEach(el => {
            const li = document.createElement('li'),
                span = document.createElement('span');
            if(el.need_initials) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', event => {
                    const parent = event.target.parentNode,
                        initial = document.createElement('span');
                    initial.innerHTML = patient.first_name[0] + patient.last_name[0] + '  ';
                    parent.removeChild(event.target);
                    parent.prepend(initial)
                });
                li.appendChild(checkbox);
            }
            span.innerHTML = el.content;
            li.appendChild(span);
            ul.appendChild(li);
        });
        container.appendChild(ul);
    });
};