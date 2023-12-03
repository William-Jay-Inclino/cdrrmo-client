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
              <div class="card-body p-5">
                <h2 class="card-title text-center mb-4 text-white">404 - Page Not Found</h2>
  
                <!-- Content -->
                <p class="text-white text-center">Sorry, the page you are looking for does not exist.</p>
  
                <!-- Go Back Button -->
                <button class="btn btn-primary w-100 mt-3" @click="goBack()">Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goBack = () => {
    router.back()
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
    margin-right: 0.5rem;
  }
  
  header h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 2px;
  }
  
  /* Main Content Styles */
  .main-content {
    position: relative;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    overflow: hidden;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  