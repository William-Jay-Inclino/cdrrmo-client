<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Team </h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-4">

                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary"> {{ action + ' ' + moduleLabel }} </h6>
                            </div>
                
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input v-model="$team.formData.name" type="text" class="form-control">
                                    <small class="form-text text-danger" v-if="$team.formErrors.name"> {{ errorMsg }} </small>
                                </div>
                                <div class="form-group">
                                    <label>Team Leader</label>
                                    <v-select :options="users" v-model="$team.formData.team_leader"></v-select>
                                    <div v-if="userIsAvailable !== null">
                                        <small v-if="userIsAvailable" class="form-text text-success"> Personnel is available </small>
                                        <small v-else class="form-text text-warning"><b> Personnel is already a team leader</b> </small>
                                    </div>
                                    <small class="form-text text-danger" v-if="$team.formErrors.teamLeader"> {{ errorMsg }} </small>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between">
                            <button @click="onCancel" type="button" class="btn btn-dark">Cancel</button>
                            <div>
                                <button @click="onSubmit(1)" type="button" class="btn btn-success">Submit & Finish</button>
                                <button @click="onSubmit(2)" type="button" class="btn btn-primary ml-2">Submit & Add Members</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>



  </div>

</template>


<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Breadcrumbs from '../common/components/Breadcrumbs.vue'
import { useToast } from "vue-toastification";
import { teamStore } from '.'
import { routeNames } from '../common';
import { IUser, userStore } from '../user';


const toast = useToast();
const $team = teamStore()
const $user = userStore()
const router = useRouter()

const moduleLabel = 'Team'
const errorMsg = ref('This field is required')
const userIsAvailable = ref<null | boolean>(null)

const breadcrumbItems = ref([
    {
        text: 'Team List',
        route: routeNames.teams,
        isActive: false,
    },
    {
        text: 'Team Form',
        route: routeNames.teamsForm,
        isActive: true,
    }
])

onMounted( async() => {
    const query = router.currentRoute.value.query

    if(query.id){
        // intialize update form / populate form 
        await $team.initUpdateFormData(query.id as string)
    }
})

const action = computed( () => $team.formData.id === '' ? 'Add' : 'Update')

const users = computed( () => {
    return $user.users.map(user => {
        user.label = $team.getTeamLeaderLabel(user)
        return user
    })
})

const selectedUser = computed( (): IUser | null => {
    if(!$team.formData.team_leader) return null 
    return $team.formData.team_leader
})

watch(selectedUser, (val) => {
    console.log('watching selectedUser', val)
    if(!val) return 

    $team.formErrors.teamLeader = false
    $team.formData.team_leader_id = val.id

    userIsAvailable.value = !$team.userIsTeamLead(val.id)

})

const onSubmit = async(action: number) => {
    console.log('onSubmit()')

    if(!userIsAvailable.value) return 

    console.log('submitting...')

    const submitted = await $team.onSubmit({data: {...$team.formData}})

    if(!submitted){
        toast.error('Failed to save ' + moduleLabel)
        return 
    }

    $team.resetFormData()

    toast.success(moduleLabel + ' successfully saved!')

    if(action === 1){
        router.push({name: routeNames.teams})
    }else{
        router.push({name: routeNames.teamMembers})
    }


}

const onCancel = () => {
    $team.resetFormData()
    router.push({name: routeNames.teams})
}

</script>



<style>
    @import "vue-select/dist/vue-select.css";
</style>