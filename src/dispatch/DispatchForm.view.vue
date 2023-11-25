<template>

    <div class="container-fluid mb-5">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center mt-2" id="dispatchForm">
            <div class="col-5">

                <form @submit.prevent="onSubmit">

                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
                                    <h6 class="m-0 font-weight-bold">Dispatch a Team</h6>
                                </div>
            
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Nature of Emergency</label>
                                        <select class="form-control" v-model="$dispatch.formData.emergency_id">
                                            <option v-for="emergency in $dispatch.emergencies" :value="emergency.id" :key="emergency.id">
                                                {{ emergency.name }}
                                            </option>
                                        </select>
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.emergency"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label for="exampleInputEmail1">Caller Name</label>
                                                <input v-model="$dispatch.formData.caller_name" type="text" class="form-control">
                                                <small class="form-text text-danger" v-if="$dispatch.formErrors.callerName"> {{ errorMsg }} </small>
                                            </div>
                                            <div class="col">
                                                <label>Contact Number</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" id="basic-addon1">+63</span>
                                                    <input
                                                    v-model="$dispatch.formData.caller_number"
                                                    type="text"
                                                    class="form-control"
                                                    aria-describedby="basic-addon1"
                                                    maxlength="10"
                                                    @input="() => $dispatch.formData.caller_number = $dispatch.formData.caller_number.replace(/\D/g, '')">
                                                </div>
                                                <small class="form-text text-danger" v-if="$dispatch.formErrors.callerNumber"> {{ errorMsg }} </small>
                                                <small class="form-text text-danger" v-else-if="$dispatch.formErrors.isInvalidContactNo"> Contact number is invalid </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Location</label>
                                        <textarea v-model="$dispatch.formData.location" class="form-control" rows="3"></textarea>
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.location"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea v-model="$dispatch.formData.description" class="form-control" rows="3"></textarea>
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.description"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Number of people involved</label>
                                        <input v-model="$dispatch.formData.num_people_involved" type="number" class="form-control">
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.numPeopleInvolved"> Invalid value </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Hazard</label>
                                        <textarea v-model="$dispatch.formData.hazard" class="form-control" rows="3"></textarea>
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.hazard"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Team</label>
                                        <v-select multiple :options="$dispatch.activeTeams" v-model="$dispatch.formTeams"></v-select>
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.team"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Time of Call</label>
                                        <input v-model="$dispatch.formData.time_of_call" type="datetime-local" class="form-control" pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}">
                                        <small class="form-text text-danger" v-if="$dispatch.formErrors.timeOfCall">
                                            Invalid date-time format. Please use the YYYY-MM-DDTHH:mm format
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="d-flex justify-content-between">
                                <button @click="onCancel" type="button" class="btn btn-dark">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
  </div>

</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    import { dispatchStore } from '.';
    import { onBeforeRouteLeave, useRouter } from 'vue-router';
    import { routeNames } from '../common';

    import { useToast } from "vue-toastification";

    const toast = useToast();

    const router = useRouter()
    const $dispatch = dispatchStore()

    $dispatch.initForm()

    const breadcrumbItems = ref([
        {
            text: 'Dispatch List',
            route: routeNames.dispatch,
            isActive: false,
        },
        {
            text: 'Dispatch a Team',
            route: routeNames.dispatchForm,
            isActive: true,
        }
    ])

    const errorMsg = ref('This field is required')

    
    onBeforeRouteLeave( (to: any, from: any, next: any) => {
        console.log('onBeforeRouteLeave()')
        console.log({to})
        console.log({from})
        $dispatch.resetFormData()

        next()
    })


    const onSubmit = async() => {
        console.log('onSubmit()')
        const submitted = await $dispatch.onSubmit({data: {...$dispatch.formData}})

        if(!submitted){
            toast.error('Failed to initiate dispatch!')
            return 
        }

        $dispatch.resetFormData()
        toast.success("Success! Dispatch initiated")
        router.push({name: routeNames.dispatch})

    }

    const onCancel = () => {
        $dispatch.resetFormData()
        router.push({name: routeNames.dispatch})
    }

</script>
