<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Team </h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems" />
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-lg-6 col-md-8 col-sm-12">

                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                <h6 class="m-0 font-weight-bold"> {{ action + ' ' + moduleLabel }} </h6>
                            </div>

                            <div class="card-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input v-model="$team.formData.name" type="text" class="form-control">
                                    <small class="form-text text-danger" v-if="$team.formErrors.name"> {{ errorMsg }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label>Team Leader</label>
                                    <v-select :options="users" v-model="$team.formData.team_leader"></v-select>
                                    <small class="form-text text-muted">

                                        <i> - Only team leaders who are not assigned to any team are displayed. </i>

                                    </small>
                                    <small class="form-text text-muted">

                                        <i> - Can only update if status is Active </i>

                                    </small>
                                    <small class="form-text text-danger" v-if="$team.formErrors.teamLeader"> {{ errorMsg
                                        }} </small>
                                </div>
                                <div class="form-group" v-if="!$team.formIsEditMode">
                                    <label>Status</label>
                                    <div class="row">
                                        <div class="col">
                                            <div class="d-grid gap-2">
                                                <button
                                                    :class="{ 'btn-primary': $team.formData.status === TeamStatusEnum.Active, 'btn-outline-primary': $team.formData.status !== TeamStatusEnum.Active }"
                                                    class="btn btn-block" type="button"
                                                    @click="$team.formData.status = TeamStatusEnum.Active">
                                                    {{ CONST_TeamStatus[TeamStatusEnum.Active].text }}
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="d-grid gap-2">
                                                <button
                                                    :class="{ 'btn-primary': $team.formData.status === TeamStatusEnum.Inactive, 'btn-outline-primary': $team.formData.status !== TeamStatusEnum.Inactive }"
                                                    class="btn btn-block" type="button"
                                                    @click="$team.formData.status = TeamStatusEnum.Inactive">
                                                    {{ CONST_TeamStatus[TeamStatusEnum.Inactive].text }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <small class="form-text text-danger" v-if="$team.formErrors.status"> {{ errorMsg }}
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
                            <div>
                                <button @click="onSubmit(1)" type="button" class="btn btn-success">Submit &
                                    Finish</button>
                                <button v-if="!$team.formIsEditMode" @click="onSubmit(2)" type="button"
                                    class="btn btn-primary ml-2">Submit & Add Members</button>
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
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import Breadcrumbs from '../common/components/Breadcrumbs.vue'
import { useToast } from "vue-toastification";
import { TeamStatusEnum, teamStore } from '.'
import { routeNames } from '../common';
import { IUser, userService } from '../user';
import { CONST_TeamStatus } from '../common'

const toast = useToast();
const $team = teamStore()
const router = useRouter()

const moduleLabel = 'Team'
const errorMsg = ref('This field is required')

const _users = ref<IUser[]>([])

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


onBeforeRouteLeave((to: any, from: any, next: any) => {
    console.log('onBeforeRouteLeave()')
    console.log({ to })
    console.log({ from })
    $team.resetFormData()

    next()
})


onMounted(async () => {
    const query = router.currentRoute.value.query

    if (query.id) {
        // intialize update form / populate form 
        await $team.initForm(query.id as string)
    } else {
        await $team.initForm()
    }

    _users.value = await userService.findOrphanTeamLeaders()

})

const action = computed(() => $team.formData.id === '' ? 'Add' : 'Update')

const users = computed(() => {
    return _users.value.map(user => {
        user.label = $team.getTeamLeaderLabel(user)
        return user
    })
})

const selectedUser = computed((): IUser | null => {
    if (!$team.formData.team_leader) return null
    return $team.formData.team_leader
})

watch(selectedUser, (val) => {
    console.log('watching selectedUser', val)
    if (!val) return

    $team.formErrors.teamLeader = false
    $team.formData.team_leader_id = val.id


})

const onSubmit = async (action: number) => {
    console.log('onSubmit()')

    console.log('submitting...')

    const submitted = await $team.onSubmit({ data: { ...$team.formData } })

    if (!submitted) {
        toast.error('Failed to save ' + moduleLabel)
        return
    }

    $team.resetFormData()

    toast.success(moduleLabel + ' successfully saved!')

    if (action === 1) {
        router.push({ name: routeNames.teams })
    } else {
        router.push({ name: routeNames.teamManage, query: { id: submitted.id } })
    }


}

const onCancel = () => {
    $team.resetFormData()
    router.push({ name: routeNames.teams })
}

</script>
