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
            <div class="col-6">
                <FormStepper @update-step="onUpdateStep" :current-step="currentStep" />
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-5">

                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
                                <h6 class="m-0 font-weight-bold">Step 1 - Fill up Personnel Info</h6>
                            </div>
        
                            <div class="card-body">
                                <Step1 v-show="currentStep === 1" />
                                <Step2 v-show="currentStep === 2" />
                                <Step3 v-show="currentStep === 3" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col">
                        <div class="justify-content-between">
                            <button v-show="currentStep === 1" @click="onClickCancel" class="btn btn-dark">Cancel</button>
                            <button v-if="currentStep > 1" @click="onClickBack" class="btn btn-dark">Back</button>
                            <button v-if="currentStep < 3" @click="onClickNext" class="btn btn-primary float-end">Next</button>
                            <button v-if="currentStep === 3" @click="onSubmit" class="btn btn-primary float-end">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  </div>

</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
    import { routeNames } from '@/helpers/constants';
    import { useRouter } from 'vue-router';
    import FormStepper from '@/components/User/FormStepper.vue'
    import Step1 from '@/components/User/FormStep1.vue'
    import Step2 from '@/components/User/FormStep2.vue'
    import Step3 from '@/components/User/FormStep3.vue'

    const router = useRouter()

    const currentStep = ref(2)
    
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

    const onClickCancel = () => {
        router.push({name: routeNames.users})
    }

    const onClickBack = () => {
        currentStep.value -= 1
    }

    const onClickNext = () => {
        currentStep.value += 1
    }

    const onSubmit = () => {
        console.log('onSubmit()')
    }

    const onUpdateStep = (step: number) => {
        console.log('onUpdateStep()', step)
        currentStep.value = step
    }

</script>


