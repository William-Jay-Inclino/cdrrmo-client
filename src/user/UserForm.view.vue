<template>

    <div class="container-fluid mb-5">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Personnel Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-9 col-sm-12">
                <FormStepper @update-step="onUpdateStep" :current-step="currentStep" />
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-9 col-sm-12">

                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                <h6 class="m-0 font-weight-bold">{{ formHeader }}</h6>
                            </div>
        
                            <div class="card-body">
                                <Step1 v-show="currentStep === 1" />
                                <Step2 v-show="currentStep === 2" />
                                <Step3 v-if="currentStep === 3" />
                                <Step4  v-if="currentStep === 4" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col d-flex justify-content-between">
                        <button v-show="currentStep === 1" @click="onClickCancel" class="btn btn-dark">Cancel</button>
                        <button v-if="currentStep > 1" @click="onClickBack" class="btn btn-dark">Back</button>

                        <template v-if="currentStep < 4">
                        <button @click="onClickNext" class="btn btn-primary ml-auto">Next</button>
                        </template>

                        <template v-if="currentStep === 4">
                        <div class="ml-auto">
                            <div v-if="!$user.formIsEditMode">
                            <button @click="onSubmitForm(1)" class="btn btn-success">Submit and Add Again</button>
                            <button @click="onSubmitForm(2)" class="btn btn-primary ml-2">Submit and Finish</button>
                            </div>
                            <div v-else>
                            <button @click="onSubmitForm(2)" class="btn btn-primary ml-2">Update</button>
                            </div>
                        </div>
                        </template>
                    </div>
                </div>


            </div>
            
        </div>
  </div>

</template>


<script setup lang="ts">

    // ========================== START DEPENDENCIES ========================== 

    import { computed, onMounted, ref } from 'vue';
    import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    import { routeNames } from '../common/constants';
    import { useRouter, onBeforeRouteLeave } from 'vue-router';
    import FormStepper from './components/FormStepper.vue'
    import Step1 from './components/FormStep1.vue'
    import Step2 from './components/FormStep2.vue'
    import Step3 from './components/FormStep3.vue'
    import Step4 from './components/FormStep4.vue'
    import { userStore } from '.';
    import { useToast } from "vue-toastification";

    // ========================== END DEPENDENCIES ========================== 





    
    // ========================== START STATE ========================== 

    const toast = useToast();
    const router = useRouter()
    const $user = userStore()

    $user.initForm()

    const breadcrumbItems = ref([
        {
            text: 'Personnel List',
            route: routeNames.users,
            isActive: false,
        },
        {
            text: 'Personnel Form',
            route: routeNames.userForm,
            isActive: true,
        }
    ])

    // ========================== END STATE ========================== 





    
    // ========================== START LIFECYCLE HOOKS ========================== 
    
    onBeforeRouteLeave( (to: any, from: any, next: any) => {
        console.log('onBeforeRouteLeave()')
        console.log({to})
        console.log({from})
        $user.resetFormData()

        next()
    })

    onMounted( async() => {
        const query = router.currentRoute.value.query

        if(query.id){
            await $user.initUpdateFormData(query.id as string)
        }
    })




    // ========================== END LIFECYCLE HOOKS ========================== 






    // ========================== START COMPUTED ========================== 

    const currentStep = computed( () => $user.formCurrentStep)

    const formHeader = computed( () => {
        
        if(currentStep.value === 1) return 'Step 1 - Basic Information'
        if(currentStep.value === 2) return 'Step 2 - Training Skills'
        if(currentStep.value === 3) return 'Step 3 - Authentication'
        if(currentStep.value === 4) return 'Step 4 - Final Confirmation: Ready to Submit?'

    })

    // ========================== END COMPUTED ========================== 






    // ========================== START METHODS ========================== 
    const onClickCancel = () => {
        router.push({name: routeNames.users})
    }

    const onClickBack = () => {
        $user.formCurrentStep -= 1
    }

    const onClickNext = async() => {

        console.log('onClickNext()')
        console.log('currentStep.value', currentStep.value)

        if(currentStep.value === 1){
            if(!$user.isValidStep1()){
                return 
            }
        }

        if(currentStep.value === 3){
            if(!(await $user.isValidStep3())) {
                return 
            }
        }

        $user.formCurrentStep += 1
    }

    const onSubmitForm = async(action: number) => {
        console.log('onSubmitForm()', action)

        const userData = {...$user.formData}

        const savedUser = await $user.saveUser(userData)

        if(savedUser){

            $user.formCurrentStep = 1

            if(action === 2){

                router.push({name: routeNames.users})

            }

            const msg = $user.formIsEditMode ? 'updated!' : 'added!'
            toast.success("Personnel successfully " + msg);
        }else{
            toast.error("Failed to save Personnel!")
        }
    }

    const onUpdateStep = (step: number) => {
        console.log('onUpdateStep()', step)
        $user.formCurrentStep = step
    }

    // ========================== END METHODS ========================== 






</script>

