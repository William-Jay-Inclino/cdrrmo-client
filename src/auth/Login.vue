<template>
    <div>
      <!-- Header -->
      <header class="bg-primary text-white text-center py-4">
        <h1 class="display-4">
          ORMOC CDRRMO INFORMATION MANAGEMENT SYSTEM
          <i class="fas fa-shield-alt fa-lg"></i>
        </h1>
      </header>
  
      <!-- Main content with background image and overlay -->
      <div class="container-fluid main-content" style="background-image: url('images/ormoc_bg.png');">
        <div class="overlay"></div>
        <div class="row justify-content-center mt-5">
          <div class="col-md-4">
            <div class="card shadow" style="background-color: rgba(0, 0, 0, 0.5);">
              <!-- Use the sampled color values with reduced alpha channel (0.5 in this example) -->
              <div class="card-body p-5">
                <h2 class="card-title text-center mb-4 text-white">Login</h2>
  
                <!-- Form -->
                <form @submit.prevent="login">
                  <!-- Email input -->
                  <div class="mb-3">
                    <label for="username" class="form-label text-white">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" required autocomplete="username">
                  </div>
  
                  <!-- Password input -->
                  <div class="mb-3">
                    <label for="password" class="form-label text-white">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required autocomplete="current-password">
                  </div>
  
                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary w-25 float-right">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue';
    import { authStore } from '.'; 
    import { routeNames } from '../common/constants'
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2'

    const router = useRouter()
    const $auth = authStore()

    const username = ref('');
    const password = ref('');
  
    const login = async() => {
      const userloggedIn = await $auth.login({username: username.value, password: password.value})

      if(userloggedIn){
        Swal.fire({
          position: "top",
          title: "Logged in successfully!",
          text: "Welcome to Ormoc CDRRMO Information Management System!",
          icon: "success"
      });
        router.push({name: routeNames.dashboard})
      }
    };


  </script>
  
  <style scoped>
  /* Header Styles */
  header {
    color: white;
    text-align: center;
    padding: 1rem;
  }
  
  header i {
    margin-right: 0.5rem; /* Adjust margin as needed */
  }
  
  header h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 2px; /* Adjust letter spacing for a techy look */
  }
  
  /* Main Content Styles */
  .main-content {
    position: relative;
    background-size: cover;
    background-position: center;
    min-height: 100vh; /* Ensure the background covers the entire viewport height */
    overflow: hidden; /* Hide overflow content */
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha channel for transparency */
  }
  </style>
  