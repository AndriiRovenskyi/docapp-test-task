<template>

    <table>
        <tr>

            <th>#Room</th>
            <th>Client</th>
            <th>Status</th>
            <th>Time appointment</th>
            <th>Waiting time</th>
            <th>Doctor</th>
            <th>Assistant</th>
        </tr>
        <tr v-for="room in rooms"  @click="goToRoom(room.appointment, room.code)">
            <td>Room {{room.code}} {{room.appointment.code}}</td>
            <td>{{room.appointment.first_name}} {{room.appointment.last_name}}</td>
            <td>{{room.status.title}}</td>
            <td>{{getFormatDate(room.appointment.start_time)}}</td>
            <td>({{room.waiting_time}})</td>
            <td>{{room.appointment.doctor_title}}</td>
            <td>{{room.appointment.assistant}}</td>
        </tr>
    </table>
</template>

<script>
    import axios from 'axios';
    import  {bus} from '../'

    export default {
        data() {
            return {
                rooms: null,

            }
        },
        mounted() {
            axios
                .get('api/rooms.json')
                .then(response => {
                    this.rooms = response.data;
                    setInterval(() => {
                        this.rooms = this.rooms.map(this.addWaitingTime)
                    })


                });
        },
        methods: {
            getFormatDate(date) {
                let newDate = date.split(':');
                let hours = newDate[0];
                let minutes = newDate[1];
                let newformat = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 && minutes > 0 ? '0' + minutes : minutes;
                return hours + ':' + minutes + ' ' + newformat;
            },
            addWaitingTime(room) {
                let time = Math.round((new Date().getTime() - room.update_time) / 1000);
                let seconds = time % 60;
                time = Math.round(time / 60);
                let minutes = time % 60;
                let hours = Math.round(time / 60);
                room.waiting_time = hours + ':' + minutes + ':' + seconds;
                return room;
            },
            goToRoom(appointment, code) {
                this.$router.push({ name: 'room'});
                this.$nextTick(() => {
                    bus.$emit('room', appointment, code);
                })
            }
        }
    }
</script>
