<template>
    <div class="form-container">
        <div>
            <div v-for="form in selectedForms" @click="getDetails(form.code)">
                {{form.short_title}}
            </div>
        </div>
        <div class="form-details-container">
            <ul>
                <li v-for="field in currentForm">
                    <div v-if="field.need_initials" class="form-details-prefix">
                        <input type="checkbox" v-if="!field.checked" @change="changeCheckbox(field)">
                        <span v-if="field.checked">{{patient.first_name[0] + patient.last_name[0]}}</span>
                    </div>
                    <span>{{field.content}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ConsentComponent',
        data() {
            return {
                currentForm: null,
                formsList: []
            }
        },

        props: ['selectedForms', 'patient'],
        watch: {
            selectedForms: {
                handler: function(oldValue, newValue) {
                    this.getDetails(oldValue[0].code);
                },
                deep: true
            },

        },
        created() {
           this.getDetails(this.selectedForms[0].code);
        },
        methods: {
            getDetails(code){
                return axios
                    .get(`api/consent-form-details/${code}.json`).then(res => {
                        this.currentForm = res.data;
                    })
            },
            changeCheckbox(field){
                field.checked = true;
                this.currentForm = Object.assign({}, this.currentForm)
            }

        }
    }
</script>
