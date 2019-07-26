<template>
    <div>
        <h1>Register Route</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <input v-model="first" type="text" class="form-control" id="first"  placeholder="Fisrt Name">
            </div>
            <div class="form-group">
                <input v-model="last" type="text" class="form-control" id="last"  placeholder="Last Name">
            </div>
            <div class="form-group">
                <input v-model="username" type="text" class="form-control" id="username"  placeholder="Username">
            </div>
            <div class="form-group">
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Register</button>
            </div>
        </form>
    </div>
</template>

<script>

import * as auth from '../../services/AuthService'
import { Promise } from 'q';

    export default {
        name: 'register',
        data: function() {
            return {
                
                username: '',
                password: '',
                first: '',
                last: ''
            }
        },
        methods: {
            onSubmit: async function() {
                const user = {
                    username: this.username,
                    password: this.password,
                    first: this.first,
                    last: this.last
                }
                console.log("fdsfgdgsd");
                const registerPromise = auth.registerUser(user);
                const loginPromise = auth.login(user);
                await Promise.all([registerPromise, loginPromise]);
                this.$router.push({name: 'home'});
                
            }
        }
    }
</script>