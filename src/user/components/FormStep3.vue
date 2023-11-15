<template>

    <div>

        <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="$user.formData.user_name" class="form-control" autocomplete="off">
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="$user.formData.password" class="form-control" autocomplete="off">
        </div>


    </div>

</template>


<script setup lang="ts">

import { userStore } from '..';

const $user = userStore()

</script>