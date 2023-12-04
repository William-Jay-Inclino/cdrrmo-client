<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Account Settings</h1>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-4">

                <form @submit.prevent="onSubmit">

                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                    <h6 class="m-0 font-weight-bold"> My Account </h6>
                                </div>
                    
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Username</label>
                                        <input type="text" class="form-control" :value="username" readonly>
                                        <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                                    </div>

                                    <div class="form-group">
                                        <label>Current Password</label>
                                        <input type="text" class="form-control">
                                        <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                                    </div>

                                    <div class="form-group">
                                        <label>New Password</label>
                                        <input type="text" class="form-control">
                                        <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                                    </div>

                                    <div class="form-group">
                                        <label>Retype Password</label>
                                        <input type="text" class="form-control">
                                        <!-- <small class="form-text text-danger"> {{ errorMsg }} </small> -->
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col">
                                <button type="submit" class="btn btn-primary float-right">Update Password</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>



  </div>

</template>


<script setup lang="ts">

    import { computed } from 'vue';
    import { authStore } from '.';

    const $auth = authStore()

    const username = computed( () => $auth.authUser?.user_name)

    const onSubmit = () => {

    }

</script>
