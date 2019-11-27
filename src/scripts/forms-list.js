import * as http from "./request";
import * as forms from "./forms";
import { app } from '../app'

export const showFormList = (formList, patient) => {
    let selectedForms = [];
    const container = document.createElement('div'),
        selectAll = document.createElement('div'),
        selectAllCheckbox = document.createElement('input'),
        selectAllSpan = document.createElement('span'),
        signBtn = document.createElement('button');
    signBtn.innerHTML = 'Sign';
    signBtn.disabled = true;
    signBtn.addEventListener('click', () => {
        forms.showForms(selectedForms, patient);
    })
    selectAllSpan.innerHTML = 'Select all forms';
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.addEventListener('change', (event) => {
        signBtn.disabled = !event.target.checked;
        if(event.target.checked){
            selectedForms = formList.map(el => { return { code: el.code, short_title:el.short_title}});
            selectAllSpan.innerHTML = 'Deselect all forms';
            document.querySelectorAll('.form').forEach(el => el.checked = true);
        }else{
            selectedForms = [];
            selectAllSpan.innerHTML = 'Select all forms';
            document.querySelectorAll('.form').forEach(el => el.checked = false);
        }
    });
    selectAll.appendChild(selectAllCheckbox);
    selectAll.appendChild(selectAllSpan);
    container.appendChild(selectAll);
    formList.forEach(el => {
        const div = document.createElement('div'),
            checkbox = document.createElement('input'),
            span = document.createElement('span');
        span.innerHTML = el.title;
        checkbox.type = 'checkbox';
        checkbox.className = 'form';
        checkbox.addEventListener('change', () => {
            if(!selectedForms.find(form => form.code == el.code)){
                selectedForms.push({ code: el.code, short_title:el.short_title});
            }else{
                selectedForms = selectedForms.filter(form => form.code != el.code);
            }
            signBtn.disabled = selectedForms.length == 0;
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        container.appendChild(div);
        container.appendChild(signBtn);
    });
    app.appendChild(container);
}