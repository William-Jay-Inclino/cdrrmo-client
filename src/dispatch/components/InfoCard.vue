<template>
    <div class="card shadow mb-4">
        <div 
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            :class="cardHeaderBg(dispatchedTeam)"
        >
            <h6 class="m-0 font-weight-bold">
                <span class="mr-1"> <b>Status:</b> </span>  
                <span :class="{[`text-bg-${CONST_DispatchStatus[dispatchedTeam.status].color}`]: true}" class="badge rounded-pill text-white"> 
                    {{ CONST_DispatchStatus[dispatchedTeam.status].text }} 
                </span> 
            </h6>

            <a href="javascript:void(0)" class="text-decoration-none">
                <i 
                    :class="{'fa-angle-down': !isExpanded, 'fa-angle-up': isExpanded}"
                    class="fas fa-fw fa-2x pointer text-light"
                ></i>
            </a>

        </div>

        <div class="card-body">
            <div class="table-responsive" :class="{'tbl-expanded': isExpanded}">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Team dispatched</th>
                            <td>
                                {{ dispatchedTeam.team.name }}
                                <button @click="$dispatch.setTeamInfo(dispatchedTeam.team)" type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#teamInfoModal">
                                    <i class="fas fa-fw fa-info-circle text-info"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Dispatcher</th>
                            <td> {{ dispatchedTeam.dispatcher.first_name + ' ' + dispatchedTeam.dispatcher.last_name }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Location</th>
                            <td> {{ dispatchedTeam.location }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Emergency type</th>
                            <td> {{ dispatchedTeam.emergency.name }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Description</th>
                            <td> {{ dispatchedTeam.description }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Hazard</th>
                            <td> {{ dispatchedTeam.hazard }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Number of people involved</th>
                            <td> {{ dispatchedTeam.num_people_involved }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Caller name</th>
                            <td> {{ dispatchedTeam.caller_name }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Caller number</th>
                            <td> {{ dispatchedTeam.caller_number }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time of Call</th>
                            <td> {{ formatDate(new Date(dispatchedTeam.time_of_call)) }} </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time proceeding to scene</th>
                            <td v-if="dispatchedTeam.time_proceeding_scene"> {{ formatDate(new Date(dispatchedTeam.time_proceeding_scene)) }} </td>
                            <td v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> {{ cancelledLabel }} </td>
                            <td v-else>
                                <button @click="setTime(dispatchedTeam, 'Time proceeding to scene')" class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time arrival at scene</th>
                            <td v-if="dispatchedTeam.time_arrival_scene"> {{ formatDate(new Date(dispatchedTeam.time_arrival_scene)) }} </td>
                            <td v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> {{ cancelledLabel }} </td>
                            <td v-else>
                                <button v-if="dispatchedTeam.time_proceeding_scene" @click="setTime(dispatchedTeam, 'Time arrival at scene')" class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time proceeding to hospital</th>
                            <td v-if="dispatchedTeam.time_proceeding_hospital"> {{ formatDate(new Date(dispatchedTeam.time_proceeding_hospital)) }} </td>
                            <td v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> {{ cancelledLabel }} </td>
                            <td v-else>
                                <button v-if="dispatchedTeam.time_arrival_scene && !(dispatchedTeam.time_proceeding_base || dispatchedTeam.time_arrival_base)" @click="setTime(dispatchedTeam, 'Time proceeding to hospital')" class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time arrival at hospital</th>
                            <td v-if="dispatchedTeam.time_arrival_hospital"> {{ formatDate(new Date(dispatchedTeam.time_arrival_hospital)) }} </td>
                            <td v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> {{ cancelledLabel }} </td>
                            <td v-else>
                                <button v-if="dispatchedTeam.time_proceeding_hospital" @click="setTime(dispatchedTeam, 'Time arrival at hospital')" class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time proceeding to base</th>
                            <td v-if="dispatchedTeam.time_proceeding_base"> {{ formatDate(new Date(dispatchedTeam.time_proceeding_base)) }} </td>
                            <td v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> {{ cancelledLabel }} </td>
                            <td v-else>
                                <button v-if="dispatchedTeam.time_arrival_hospital" @click="setTime(dispatchedTeam, 'Time proceeding to base')" class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time arrival at base</th>
                            <td v-if="dispatchedTeam.time_arrival_base"> {{ formatDate(new Date(dispatchedTeam.time_arrival_base)) }} </td>
                            <td v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> {{ cancelledLabel }} </td>
                            <td v-else>
                                <button v-if="dispatchedTeam.time_proceeding_base" @click="setTime(dispatchedTeam, 'Time arrival at base')" class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Remarks</th>
                            <td> {{ dispatchedTeam.remarks }} </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>

        <div class="card-footer justify-content-center">
            <div v-if="dispatchedTeam.is_completed" class="row">
                <div class="col text-center">
                    <button style="pointer-events: none;" class="btn btn-light text-success">Completed</button>
                </div>
            </div>

            <div v-else-if="!dispatchedTeam.time_arrival_base && !dispatchedTeam.is_cancelled" class="row">
                <div class="col text-center">
                    <button class="btn btn-primary">Reassign Dispatcher</button>
                </div>
                <div class="col text-center" v-if="dispatchedTeam.status === DispatchStatusEnum.Queue || dispatchedTeam.status === DispatchStatusEnum.ProceedingScene">
                    <button @click="cancelService(dispatchedTeam)" class="btn btn-danger">Cancel Service</button>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-6 mx-auto text-center">
                    <button @click="setComplete(dispatchedTeam)" class="btn btn-success">Set to complete</button>
                </div>
            </div>
            <!-- <button class="btn btn-success">Set to complete</button> -->
        </div>



    </div>
</template>



<script setup lang="ts">

import { DispatchStatusEnum, IDispatch } from '..';
import { CONST_DispatchStatus, formatDate } from '../../common';
import { dispatchStore } from '..';
import { computed, ref } from 'vue';

import Swal from 'sweetalert2'

defineProps<{
        dispatchedTeam: IDispatch
}>()
const emit = defineEmits(['set-time', 'set-complete', 'cancel-service'])

const $dispatch = dispatchStore()

const cancelledLabel = ref('Service Cancelled')


const isExpanded = computed( () => $dispatch.flags.expand)

const cardHeaderBg = (dispatchedTeam: IDispatch) => {

    if(
        dispatchedTeam.status === DispatchStatusEnum.ArrivedBase || 
        dispatchedTeam.is_cancelled || 
        dispatchedTeam.is_completed
    ){
        return {'text-bg-success': true}
    }

    if(dispatchedTeam.status === DispatchStatusEnum.Queue){
        return {'text-bg-secondary': true}
    }

    return {'text-bg-danger': true}

}

const setTime = (dispatchedTeam: IDispatch, field: any) => {

    Swal.fire({
        title: "Are you sure?",
        text: field + " will be recorded!",
        position: "top",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, record it!",
        reverseButtons: true,
        }).then( (result) => {
        if (result.isConfirmed) {
            emit('set-time', {dispatchedTeam, field})
        }
    });

}

const setComplete = (dispatchedTeam: IDispatch) => {
    console.log('setComplete()', dispatchedTeam)

    Swal.fire({
        title: "Are you sure?",
        text: "This operation will be set to completed!",
        position: "top",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, set it to completed!",
        reverseButtons: true,
        }).then( (result) => {
        if (result.isConfirmed) {
            emit('set-complete', {dispatchedTeam})
        }
    });

}

const cancelService = (dispatchedTeam: IDispatch) => {
    console.log('cancelService()', dispatchedTeam)

    Swal.fire({
        title: "Are you sure?",
        text: "This operation will be set to cancelled!",
        position: "top",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, set it to cancelled!",
        reverseButtons: true,
        }).then( (result) => {
        if (result.isConfirmed) {
            emit('cancel-service', {dispatchedTeam})
        }
    });
}


</script>


<style scoped>

.tbl-expanded{
    height: 500px; 
    overflow-y: auto;
}

</style>