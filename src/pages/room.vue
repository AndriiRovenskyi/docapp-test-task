<template>
    <div>
        <div v-if="appointment">
        <table>
            <tr>
                <th>Room code</th>
                <th>Start date</th>
                <th>Details</th>
                <th>Doctor</th>
            </tr>
           <tr>
               <td>Room {{code}}</td>
               <td>{{appointment.start_date}}</td>
               <td>HT: {{appointment.vital_signs.height_ft}}'{{appointment.vital_signs.height_in}}',WT {{appointment.vital_signs.weight}}lbs, BMI {{appointment.vital_signs.bmi}}</td>
               <td>{{getDoctorFullName(appointment)}}</td>
           </tr>
        </table>
            <FormsComponent @selectForms="selectForms"></FormsComponent>
            <div v-if="selectedForms.length > 0">
                <ConsentComponent v-bind:selectedForms="selectedForms"  v-bind:patient="{first_name: appointment.first_name, last_name: appointment.last_name}"></ConsentComponent>
            </div>
        </div>

        <router-link class="btn btn-back" to="/">&larr; Back to table</router-link>


    </div>
</template>

<script>
    import {bus} from '../'
    import FormsComponent from '../components/forms.component'
    import ConsentComponent from '../components/consent-forms.component'

    export default {
        data() {
            return {
                appointment: null,
                code: null,
                selectedForms: []
            }
        },
        components: {
            FormsComponent,
            ConsentComponent
        },
        created() {
            bus.$on('room', (appointment, code) => {
                this.appointment = appointment;
                this.code = code;
            });
        },
        methods: {
            getDoctorFullName(appointment) {
                let name = appointment.doctor_title + ', ' + this.calculateAge(new Date(appointment.birthday)) + ', ' + appointment.gender[0];
                if(!appointment.is_doctor){
                    name = name.replace('Dr', appointment.gender == 'Male' ? 'Mr' : 'Ms');
                }
                return name;
            },
            calculateAge(birthday) { // birthday is a date
                let ageDifMs = Date.now() - birthday.getTime();
                let ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            },
            selectForms(selectedFroms) {
                this.selectedForms = [...selectedFroms];
            }
        },
        beforeDestroy() {
            bus.$off('room');
        }
    }
</script>
