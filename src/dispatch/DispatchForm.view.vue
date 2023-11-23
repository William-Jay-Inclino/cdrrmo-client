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
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label for="exampleInputEmail1">Caller Name</label>
                                                <input v-model="$dispatch.formData.caller_name" type="text" class="form-control">
                                            </div>
                                            <div class="col">
                                                <label>Contact Number</label>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="basic-addon1">+63</span>
                                                    <input
                                                    v-model="$dispatch.formData.caller_number"
                                                    type="text"
                                                    class="form-control"
                                                    aria-describedby="basic-addon1"
                                                    maxlength="10"
                                                    @input="() => $dispatch.formData.caller_number = $dispatch.formData.caller_number.replace(/\D/g, '')">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Location</label>
                                        <textarea v-model="$dispatch.formData.location" class="form-control" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea v-model="$dispatch.formData.description" class="form-control" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Number of people involved</label>
                                        <input v-model="$dispatch.formData.num_people_involved" type="number" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Hazard</label>
                                        <textarea v-model="$dispatch.formData.hazard" class="form-control" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label>Team</label>
                                        <v-select multiple :options="$dispatch.activeTeams" v-model="$dispatch.formTeams"></v-select>
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
    import { useRouter } from 'vue-router';
    import { routeNames } from '../common';

    // import { useToast } from "vue-toastification";

    // const toast = useToast();

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

    const onSubmit = () => {
        console.log('onSubmit()')
    }

    const onCancel = () => {
        $dispatch.resetFormData()
        router.push({name: routeNames.dispatch})
    }

</script>
