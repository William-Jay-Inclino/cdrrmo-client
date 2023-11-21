<template>

    <!-- use <form> tag to remove console warning [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq)  -->
    <form>

        <div class="form-group">
            <label>User Name</label>
            <input type="text" v-model="$user.formData.user_name" class="form-control" autocomplete="off" :disabled="$user.formIsEditMode">
            <small class="form-text text-danger" v-if="$user.formErrors.user_name"> This field is required </small>
            <small class="form-text text-danger" v-if="$user.formErrors.isUsernameTaken"> Username already taken </small>
        </div>

        <div class="form-group" v-if="!$user.formIsEditMode">
            <label>Password</label>
            <div class="input-group">
                <input :type="showPassword ? 'text' : 'password'" v-model="$user.formData.password" class="form-control" autocomplete="off">
                <div class="input-group-append">
                    <button @click="togglePassword()" class="btn btn-outline-secondary btn-sm" type="button">
                        <i class="fas fa-fw" :class="{'fa-eye': !showPassword, 'fa-eye-slash': showPassword}"></i>
                    </button>
                </div>
            </div>
        </div>


    </form>

</template>


<script setup lang="ts">

import { ref } from 'vue';
import { userStore } from '..';

const $user = userStore()
const showPassword = ref(false)


const togglePassword = () => {
    showPassword.value = !showPassword.value
}

</script>