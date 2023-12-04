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
                                    </div>

                                    <div class="form-group">
                                        <label>Current Password</label>
                                        <input type="password" v-model="currentPw" class="form-control">
                                        <small class="form-text text-danger" v-if="formErrors.currentPw"> {{ errorMsg }} </small>
                                    </div>

                                    <div class="form-group">
                                        <label>New Password</label>
                                        <input type="password" v-model="newPw" class="form-control">
                                        <small class="form-text text-danger" v-if="formErrors.newPw"> {{ errorMsg }} </small>
                                    </div>

                                    <div class="form-group">
                                        <label>Retype Password</label>
                                        <input type="password" v-model="retypePw" class="form-control">
                                        <small class="form-text text-danger" v-if="isPwMatched === false">
                                            Passwords do not match. Please make sure the passwords match.
                                        </small>
                                        <small class="form-text text-success" v-else-if="isPwMatched === true"> Passwords match! You're good to go. </small>
                                        <small class="form-text text-danger" v-else-if="formErrors.retypePw"> {{ errorMsg }} </small>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col">
                                <button :disabled="hasError || !isPwMatched" type="submit" class="btn btn-primary float-right">Update Password</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>



  </div>

</template>


<script setup lang="ts">

    import { computed, ref, watch } from 'vue';
    import { authService, authStore } from '.';
    import { useToast } from "vue-toastification";

    const $auth = authStore()

    const currentPw = ref('')
    const newPw = ref('')
    const retypePw = ref('')
    const toast = useToast();

    const errorMsg = ref('This field is required')

    const _formErrorsInitial = {
        currentPw: false,
        newPw: false,
        retypePw: false,
    }

    const formErrors = ref({..._formErrorsInitial})




    // computed 

    const username = computed( () => $auth.authUser?.user_name)

    const isPwMatched = computed( (): boolean | null => {
        if(newPw.value.trim() === '' || retypePw.value.trim() === ''){
            return null 
        }

        return newPw.value === retypePw.value

    })

    const hasError = computed( () => Object.values(formErrors.value).includes(true))


    // watchers

    watch(currentPw, (val) => {
        if(val.trim() !== '') formErrors.value.currentPw = false  
    })

    watch(newPw, (val) => {
        if(val.trim() !== '') formErrors.value.newPw = false  
    })

    watch(retypePw, (val) => {
        if(val.trim() !== '') formErrors.value.retypePw = false  
    })



    // methods

    const onSubmit = async() => {

        console.log('onSubmit()')

        console.log('submitting...') 

        const authUser = $auth.authUser?.id

        if(!authUser){
            console.error('authUser is undefined')
            return 
        }

        const passwordRenewed = await authService.renewPassword(authUser, {currentPassword: currentPw.value, newPassword: newPw.value})

        console.log('passwordRenewed', passwordRenewed)

        if(passwordRenewed === 400){
            toast.error('Current password is incorrect!')
            return 
        }

        if(passwordRenewed){
            toast.success('Password updated!')
            resetForm()
        }else{
            toast.error('Failed to update password!')
        }

    }


    const resetForm = () => {
        console.log('resetForm()')
        currentPw.value = ''
        newPw.value = ''
        retypePw.value = ''
        formErrors.value.currentPw = false
        formErrors.value.newPw = false
        formErrors.value.retypePw = false
    }
    

</script>
