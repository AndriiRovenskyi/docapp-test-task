<template>
    <div class="form-list-container">
        <div>
            <input type="checkbox" v-model="selectAll.value" v-on:change="selectAll($event)">
            <span>{{selectAllBtn.title}}</span>
        </div>
        <div v-for="form in forms">
            <input type="checkbox" v-model="form.selected" v-on:change="selectForm($event, form)">
            <span>{{form.title}}</span>
        </div>
        <button class="btn" @click="$emit('selectForms', selectedForms)" :disabled="signBtn">Sign</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'FormsComponent',
        data() {
            return {
                forms: null,
                selectedForms: [],
                signBtn: true,
                showSelectedForms: true,
                selectAllBtn: {
                    title: 'Select all',
                    value: false
                }
            }
        },
        mounted() {
            axios
                .get('api/consent-forms.json').then( res => {
                    this.forms = res.data.map(el => {
                        el.selected = false;
                        return el;
                    });
                })
        },
        methods: {
            selectAll(event){
                this.signBtn = !event.target.checked;
                if(event.target.checked){
                    this.selectedForms = this.forms.map(el => { return { code: el.code, short_title:el.short_title}});
                    this.selectAllBtn.title = 'Deselect all forms';
                    this.forms.forEach(el => {
                        el.selected = true;
                        return el;
                    })
                }else{
                    this.selectedForms = [];
                    this.selectAllBtn.title = 'Select all forms';
                    this.forms.forEach(el => {
                        el.selected = false;
                        return el;
                    })
                }
            },
            selectForm(event, el){
                if(!this.selectedForms.find(form => form.code == el.code)){
                    this.selectedForms.push({ code: el.code, short_title:el.short_title});
                }else{
                    this.selectedForms = this.selectedForms.filter(form => form.code != el.code);
                }
                this.signBtn = this.selectedForms.length == 0;
            }
        }
    }
</script>
