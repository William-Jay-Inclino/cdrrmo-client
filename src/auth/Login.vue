<template>
    <div>
      <!-- Header -->
      <header class="bg-primary text-white text-center py-4">
        <h1 class="display-4">
          ORMOC CDRRMO INFORMATION MANAGEMENT SYSTEM
          <img :src="config.baseUrl + 'images/cdrrmo-v2/system-logo.png'" style="height: 2em">
        </h1>
      </header>

  
      <!-- Main content with background image and overlay -->
      <div :style="backgroundStyle" class="main-content">
        <div class="row mt-5 pt-5">
          <div class="col-lg-1 col-md-1"></div>
          <div class="col-lg-4 col-md-4 col-sm-10">
            <div class="card shadow">
              <div class="card-body p-5">
                <h2 class="card-title text-center mb-4">Login</h2>
  
                <!-- Form -->
                <form @submit.prevent="login">
                  <!-- Email input -->
                  <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" required autocomplete="username">
                  </div>
  
                  <!-- Password input -->
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required autocomplete="current-password">
                  </div>
  
                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary float-right">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  </template>
  
  <script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
    import { authService, authStore } from '.'; 
    import { routeNames } from '../common/constants'
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2'
    import { config } from '../config';

    const router = useRouter()
    const $auth = authStore()

    const isMobile = ref(window.innerWidth <= 768);
    const username = ref('');
    const password = ref('');

    onMounted(() => {
      // Check the screen size on component mount
      checkMobile();
      // Listen for window resize events to update the isMobile flag
      window.addEventListener('resize', checkMobile);
    });

    onBeforeUnmount(() => {
      // Remove the resize event listener to avoid memory leaks
      window.removeEventListener('resize', checkMobile);
    });
  
    const login = async() => {
      const userloggedIn = await $auth.login({username: username.value, password: password.value})

      if(userloggedIn){

        if(authService.isAdmin() || authService.isDispatcher()){
          Swal.fire({
              position: "top",
              title: "Logged in successfully!",
              text: "Welcome to Ormoc CDRRMO Information Management System!",
              icon: "success"
          });
        }

        if(authService.isAdmin()){
          router.push({name: routeNames.dispatch})
        }else if(authService.isDispatcher()){
          router.push({name: routeNames.dispatch})
        }else{
          Swal.fire({
              position: "top",
              title: "Unable to log in!",
              text: "Only admins and dispatchers can log in for now.",
              icon: "warning"
          });
        }

      }else{
        Swal.fire({
            position: "top",
            title: "Login Failed!",
            text: "The username or password you entered is incorrect. Please double-check your credentials and try again",
            icon: "error",
            footer: '<a href="#">If you continue to experience issues, contact support for assistance.</a>'
        });

        authService.logout()
      }
    };

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768; // Adjust the breakpoint as needed
    };

    const backgroundStyle = computed(() => {
      return {
        'background-image': isMobile.value
          ? 'none'
          : `url(${config.baseUrl}images/cdrrmo-v3/login-bg.jpg)`,
      };
    });


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
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    min-height: 100vh; /* Ensure the background covers the entire viewport height */
    overflow: hidden; /* Hide overflow content */
  }


  /* Define a class to hide the background image on mobile */
  .mobile-background {
    background-image: none;
  }
  
  </style>
  