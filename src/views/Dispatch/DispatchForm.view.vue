<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center" id="dispatchForm">
            <div class="col-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
                        <h6 class="m-0 font-weight-bold">Dispatch a Team!</h6>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="onSubmitForm">
                            <div class="form-group">
                                <label>Nature of Emergency</label>
                                <select class="form-control" v-model="$dispatch.formData.emergency_id">
                                    <option v-for="emergency in $dispatch.emergencies" :value="emergency.emergency_id" :key="emergency.emergency_id">
                                        {{ emergency.nature }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Team</label>
                                <select v-model="$dispatch.formData.team_id" class="form-control">
                                    <option v-for="team in $dispatch.teams" :value="team.team_id" :key="team.team_id">
                                        {{ team.team_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Caller Name</label>
                                <input v-model="$dispatch.formData.caller_name" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Caller Number</label>
                                <input v-model="$dispatch.formData.caller_number" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <textarea v-model="$dispatch.formData.location" class="form-control" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea v-model="$dispatch.formData.description" class="form-control" rows="3"></textarea>
                            </div>
                            <!-- <div class="form-group">
                                <label>Medical Description</label>
                                <textarea v-model="$dispatch.formData.medical_description" class="form-control" rows="3"></textarea>
                            </div> -->
                            <div class="form-group">
                                <label>Number of people involved</label>
                                <input v-model="$dispatch.formData.num_people_involved" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Hazard</label>
                                <textarea v-model="$dispatch.formData.hazard" class="form-control" rows="3"></textarea>
                            </div>

                            <div class="justify-content-between">
                                <button @click="onCancel" type="button" class="btn btn-dark">Cancel</button>
                                <button type="submit" class="btn btn-primary float-end">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-1">
                <div class="vertical-line"></div>
            </div>

            <div class="col-5">
                <div class="row">
                    <div class="col">
                        <TeamInfo :team-id="$dispatch.formData.team_id"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <TeamMembers :team-id="$dispatch.formData.team_id"/>
                    </div>
                </div>
            </div>
            
        </div>
  </div>

</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
    import { dispatchStore } from '@/modules/dispatch';
    import TeamInfo from '@/components/TeamInfo.vue'
    import TeamMembers from '@/components/TeamMembers.vue'
    import { useRouter } from 'vue-router';
    import { routeNames } from '@/helpers/constants';

    import { useToast } from "vue-toastification";

    const toast = useToast();

    const router = useRouter()

    const $dispatch = dispatchStore()

    const breadcrumbItems = ref([
        {
            text: 'Dispatch List',
            route: 'dispatch.route',
            isActive: false,
        },
        {
            text: 'Dispatch a Team',
            route: 'dispatchForm.route',
            isActive: true,
        }
    ])

    const onSubmitForm = async() => {
        console.log('onSubmitForm()')

        const dispatchData = {...$dispatch.formData}

        // validations here

        const dispatched = await $dispatch.saveDispatch(dispatchData)

        if(dispatched){
            router.push({name: routeNames.dispatch})
            toast.success("Dispatch Request Successfully Submitted!");

        }
    }

    const onCancel = () => {
        $dispatch.resetFormData()
        router.push({name: routeNames.dispatch})
    }


</script>


<style scoped>
  .vertical-line {
    width: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: #ccc;
    height: 100%; 
  }
</style>
