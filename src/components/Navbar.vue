<template>

<header>
      <nav class="navbar navbar-expand-md custom-nav-bg navbar-light border-bottom shadow-sm">
        <router-link to="/" class="navbar-brand">
          <img class="nav-logo" alt="Vue logo" src="../assets/logo.png"/> Task Manager
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" data-toggle="collapse" data-target=".navbar-collapse" class="nav-link" exact>
                Home
              </router-link>           
            </li>
            <li v-if="$store.state.isLoggedIn" class="nav-item">
              <router-link to="/tasks" data-toggle="collapse" data-target=".navbar-collapse" class="nav-link">
                Tasks
              </router-link>
            </li>
            <li v-if="!$store.state.isLoggedIn" class="nav-item">
              <router-link to="/register" data-toggle="collapse" data-target=".navbar-collapse" class="nav-link">
                Register
              </router-link>
            </li>           
            <li v-if="!$store.state.isLoggedIn" class="nav-item">
              <router-link to="/login" data-toggle="collapse" data-target=".navbar-collapse" class="nav-link" >
                Sign in
              </router-link>
            </li>
            <li v-if="$store.state.isLoggedIn" class="nav-item">
              <a v-on:click.prevent="logout()" href="#" data-toggle="collapse" data-target=".navbar-collapse" class="nav-link" >
                Logout
              </a>
            </li>
            <li class="nav-item">
              <a href="#" data-toggle="collapse" data-target=".navbar-collapse" class="nav-link" >
                {{this.$store.state.username ? 
                this.$store.state.username : 'User'}}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

</template>


<script>
import * as auth from '../services/AuthService';

export default {
  name: 'Navbar',
  methods: {
    logout: function() {
      auth.logout();
      this.$router.push({ name: 'home'});
    }
  }
}

