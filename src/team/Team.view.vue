<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Team </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Teams</h6>
                        <router-link :to="{name: routeNames.teamsForm}">
                            <button class="btn btn-primary" type="button">Add Team</button>
                        </router-link>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Team Leader</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">Activate / Deactivate</th>
                                        <th class="text-center">
                                            <i class="fas fa-fw fa-cogs"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item of $module.teams">
                                        <td> {{ item.name }} </td>
                                        <td> {{ item.team_leader.last_name + ', ' + item.team_leader.first_name}} </td>
                                        <td class="text-center"> 
                                            <span :class="{[`badge-${CONST_TeamStatus[item.status].color}`]: true}" class="badge badge-pill text-white"> 
                                                {{ CONST_TeamStatus[item.status].text }} 
                                            </span> 
                                        </td>
                                        <td class="text-center">
                                            <div v-if="item.status !== TeamStatusEnum.Dispatched" class="custom-control custom-switch">
                                                <input v-model="item.isActivated" @click="onStatusChange(item)" type="checkbox" class="custom-control-input" :id="'customSwitch_' + item.id">
                                                <label class="custom-control-label" :for="'customSwitch_' + item.id"></label>
                                            </div>

                                            <!-- <div v-if="item.status !== TeamStatusEnum.Dispatched" class="form-check form-switch ml-4">
                                                <input @click="onStatusChange(item)" style="cursor: pointer;" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="item.isActivated">
                                            </div> -->
                                        </td>
                                        <td class="text-center">
                                            <button @click="onClickUpdateIcon(item)" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button :disabled="item.status !== TeamStatusEnum.Inactive" @click="onDelete(item)" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-trash text-danger"></i>
                                            </button>
                                            <button @click="onClickManageTeam(item.id)" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-users text-info"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  </div>

</template>


<script setup lang="ts">

import { useToast } from "vue-toastification";
import { ITeam, teamStore, TeamStatusEnum } from '.'
import { routeNames, CONST_TeamStatus } from '../common/constants'
import { useRouter } from 'vue-router';

import Swal from 'sweetalert2'

const toast = useToast();
const $module = teamStore()
const router = useRouter()

$module.init()

const onDelete = async(team: ITeam) => {

    Swal.fire({
        title: "Are you sure?",
        text: team.name + " will be removed!",
        position: "top",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true, 
        }).then( async(result) => {
        if (result.isConfirmed) {
            const removed = await $module.onDelete(team.id)

            if(removed){
                toast.success(team.name + ' successfully removed!')

            }else{
                toast.error('Failed to remove ' + team.name)
            }
        }
    });

}

const onClickUpdateIcon = (data: ITeam) => {
    router.push({name: routeNames.teamsForm, query: {id: data.id}})
}

const onClickManageTeam = (id: string) => {
    console.log('onClickManageTeam()', id)
    router.push({name: routeNames.teamManage, query: {id: id}})
}

const onStatusChange = async(team: ITeam) => {
    console.log('onStatusChange()', team)
    if(team.status === TeamStatusEnum.Active){
        team.status = TeamStatusEnum.Inactive
        team.isActivated = false

        const data = {
            status: TeamStatusEnum.Inactive
        }
        const isUpdated = await $module.onUpdate({id: team.id, data})

        if(isUpdated){
            toast.success('Status Deactivated!')
        }else{
            toast.error('Failed to deactivate status')
            team.status = TeamStatusEnum.Active
            team.isActivated = true
        }

    }else if(team.status === TeamStatusEnum.Inactive){
        team.status = TeamStatusEnum.Active
        team.isActivated = true

        const data = {
            status: TeamStatusEnum.Active
        }
        const isUpdated = await $module.onUpdate({id: team.id, data})

        if(isUpdated){
            toast.success('Status Activated!')
        }else{
            toast.error('Failed to activate status')
            team.status = TeamStatusEnum.Inactive
            team.isActivated = false
        }
    }
}

</script>
