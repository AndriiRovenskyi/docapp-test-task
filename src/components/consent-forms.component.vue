<template>
    <div>
{{selectedForms.length}}
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ConsentComponent',
        data() {
            return {
                currentForm: null,
            }
        },

        props: ['selectedForms'],
        watch: {
            selectedForms: (oldValue, newValue) => {
                debugger;
                this.currentForm = this.getDetails(this.newValue.code);
            }
        },
        created: {

        },
        methods: {
            getDetails(code){
                return axios
                    .get(`api/consent-form-details/${code}.json`).then(res => {
                        this.selectedForms = res;
                    })
            },
            selectForm(event, el){
                if(!this.selectedForms.find(form => form.code == el.code)){
                    this.selectedForms.push({ code: el.code, short_title:el.short_title});
                }else{
                    this.selectedForms = this.selectedForms.filter(form => form.code != el.code);
                }
                this.signBtn = this.selectedForms.length == 0;
            },
            openFormDetails(){
                debugger
            }
        }
    }
</script>
