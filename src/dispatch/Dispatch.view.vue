<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>
            <router-link :to="{name: 'dispatchForm.route'}">
                <button class="btn btn-primary" type="submit">Dispatch a Team</button>
            </router-link>
        </div>

        <div class="row justify-content-center" v-for="dispatchedTeam in $dispatch.dispatchedTeams">
            <div class="col-10">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-secondary">
                        <h6 class="m-0 font-weight-bold">
                            <span>Status: </span>  
                            <span :class="{[`text-bg-${dispatchedTeam.statusObj?.color}`]: true}" class="badge rounded-pill text-white"> 
                                {{ dispatchedTeam.statusObj?.text }} 
                            </span> 
                            <span class="text-white mr-2 ml-3" style="display: inline-block; transform: scale(1, 2);"> 
                                |
                            </span> 
                            <span>
                                Created on:
                            </span> 
                                {{ dispatchedTeam.time_dispatch }}
                        </h6>

                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">
                                    <i class="fas fa-fw fa-sync-alt text-primary"></i>
                                    <span class="ml-2">Update Details</span>
                                </a>
                                <div v-if="!dispatchedTeam.time_arrival_hospital" class="dropdown-divider"></div>
                                <a
                                    v-if="dispatchedTeam.status !== DispatchStatusEnum.Deck"
                                    class="dropdown-item"
                                    href="javascript:void(0)"
                                    @click="onShowDispatchStatusModal(dispatchedTeam)"
                                    data-toggle="modal"
                                    :data-target="`#${dispatchStatusModalId}`"
                                >
                                    <i class="fas fa-fw fa-check text-primary"></i>
                                    <span class="ml-2">Update Status</span>
                                </a>
                                <a
                                    @click="onProceedingHospital(dispatchedTeam)"
                                    v-if="dispatchedTeam.status === DispatchStatusEnum.Deck && !dispatchedTeam.time_proceeding_hospital"
                                    class="dropdown-item"
                                    href="#"
                                >
                                    <i class="fas fa-fw fa-ambulance text-primary"></i>
                                    <span class="ml-2">Proceeding to Hospital</span>
                                </a>
                                <a
                                    @click="onArrivedHospital(dispatchedTeam)"
                                    v-if="dispatchedTeam.time_proceeding_hospital && !dispatchedTeam.time_arrival_hospital"
                                    class="dropdown-item"
                                    href="#"
                                >
                                    <i class="fas fa-fw fa-hospital text-primary"></i>
                                    <span class="ml-2">Arrived in Hospital</span>
                                </a>
                                <!-- <a class="dropdown-item" href="#">Archive</a> -->
                            </div>
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th width="25%" colspan="2" style="text-align: center;">
                                            Team Dispatched
                                            <button @click="onShowTeamInfoModal(dispatchedTeam)" data-toggle="modal" :data-target="`#${teamInfoModalId}`" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-info-circle text-info"></i>
                                            </button>
                                        </th>
                                        <th width="18.75%">Nature of Emergency</th>
                                        <th width="18.75%">Dispatcher</th>
                                        <th width="18.75%">Location</th>
                                        <th width="18.75%">Number of People Involved</th>
                                    </tr>
                                    <tr>
                                        <th>Team Leader</th>
                                        <th>Team Name</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ dispatchedTeam.teamLeader?.first_name }} </td>
                                        <td> {{ dispatchedTeam.team?.team_name }} </td>
                                        <td> {{ dispatchedTeam.emergency?.nature }} </td>
                                        <td> {{ dispatchedTeam.dispatcher?.first_name }} </td>
                                        <td> {{ dispatchedTeam.location }} </td>
                                        <td> {{ dispatchedTeam.num_people_involved }} </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Caller Name</th>
                                        <th>Caller Number</th>
                                        <th width="18.75%">
                                            <!-- <i class="fas fa-fw fa-clock"></i> -->
                                            <span class="ml-2">Time Proceeding</span>
                                        </th>
                                        <th width="18.75%">
                                            <!-- <i class="fas fa-fw fa-clock"></i> -->
                                            <span class="ml-2">Time Arrival</span>
                                        </th>
                                        <th width="18.75%">
                                            <!-- <i class="fas fa-fw fa-clock"></i> -->
                                            <span class="ml-2">Time Proceeding Hospital</span>
                                        </th>
                                        <th width="18.75%">
                                            <!-- <i class="fas fa-fw fa-clock"></i> -->
                                            <span class="ml-2">Time Arrival Hospital</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ dispatchedTeam.caller_name }} </td>
                                        <td> {{ dispatchedTeam.caller_number }} </td>
                                        <td> {{ dispatchedTeam.time_proceeding }} </td>
                                        <td> {{ dispatchedTeam.time_arrival }} </td>
                                        <td> {{ dispatchedTeam.time_proceeding_hospital }} </td>
                                        <td> {{ dispatchedTeam.time_arrival_hospital }} </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th width="25%">Description</th>
                                        <th width="25%">Medical Description</th>
                                        <th width="25%">Hazard</th>
                                        <th width="25%">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ dispatchedTeam.description }} </td>
                                        <td> {{ dispatchedTeam.medical_description }} </td>
                                        <td> {{ dispatchedTeam.hazard }} </td>
                                        <td> {{ dispatchedTeam.remarks }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DispatchStatusModal v-show="showDispatchStatusModal" :id="dispatchStatusModalId" :dispatched-team="selectedDispatchedTeam" @update-status="onUpdateStatus"/>
        <TeamInfoModal :id="teamInfoModalId" v-if="selectedDispatchedTeam" :team-id="selectedDispatchedTeam.team_id" />
  </div>

</template>


<script setup lang="ts">
  
import { dispatchStore } from '.';
import DispatchStatusModal from './components/DispatchStatusModal.vue';
import TeamInfoModal from '../team/components/TeamInfo.vue';

import { ref } from 'vue';
import { DispatchStatusEnum, IDispatch } from './entities';

import { useToast } from "vue-toastification";

const toast = useToast();

const $dispatch = dispatchStore()

const showDispatchStatusModal = ref(false)
const dispatchStatusModalId = ref('dispatchStatusModal')

const showTeamInfoModal = ref(false)
const teamInfoModalId = ref('teamInfoModalId')

const selectedDispatchedTeam = ref<IDispatch>()


const onShowDispatchStatusModal = (dispatchedTeam: IDispatch) => {

    console.log('onShowDispatchStatusModal()', dispatchedTeam)
    showDispatchStatusModal.value = true 
    selectedDispatchedTeam.value = dispatchedTeam
}

const onShowTeamInfoModal = (dispatchedTeam: IDispatch) => {
    console.log('onShowDispatchStatusModal()', dispatchedTeam)
    showTeamInfoModal.value = true 
    selectedDispatchedTeam.value = dispatchedTeam

}

const onUpdateStatus = (data: {status: DispatchStatusEnum | undefined}) => {
    if(!data.status || !selectedDispatchedTeam.value) return 
    $dispatch.updateDispatchStatus({id: selectedDispatchedTeam.value.dispatch_id, status: data.status})

    toast.success("Status successfully updated!");
}

const onProceedingHospital = (dispatchedTeam: IDispatch) => {
    $dispatch.onProceedingHospital(dispatchedTeam)

    toast.success("Time proceeding to hospital recorded!");
}

const onArrivedHospital = (dispatchedTeam: IDispatch) => {
    $dispatch.onArrivedHospital(dispatchedTeam)

    toast.success("Time arrived in hospital recorded!");
}



</script>

@/common/types/types