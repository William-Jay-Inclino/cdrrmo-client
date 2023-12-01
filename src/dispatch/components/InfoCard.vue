<template>
    <div class="card shadow mb-4">
        <div 
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            :class="cardHeaderBg(dispatchedTeam)"
        >
            <h6 class="m-0 font-weight-bold">
                <span class="mr-1 text-white"> <b>Status:</b> </span>  
                <span :class="{[`badge-${CONST_DispatchStatus[dispatchedTeam.status].color}`]: true}" class="badge badge-pill text-white"> 
                    {{ CONST_DispatchStatus[dispatchedTeam.status].text }} 
                </span> 
            </h6>

            <a href="javascript:void(0)" class="text-decoration-none" @click="dispatchedTeam.isExpanded = !dispatchedTeam.isExpanded">
                <i 
                    :class="{'fa-angle-down': !dispatchedTeam.isExpanded, 'fa-angle-up': dispatchedTeam.isExpanded}"
                    class="fas fa-fw fa-2x pointer text-light"
                ></i>
            </a>

        </div>

        <div class="card-body">
            <div class="table-responsive" :class="{'tbl-expanded': dispatchedTeam.isExpanded}">
                <table class="table">
                    <thead>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.Team">
                            <th>Team dispatched</th>
                            <td>
                                {{ dispatchedTeam.team.name }}
                                <button @click="$dispatch.setTeamInfo(dispatchedTeam.team)" type="button" class="btn btn-light btn-sm" data-toggle="modal" data-target="#teamInfoModal">
                                    <i class="fas fa-fw fa-info-circle text-info"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.Dispatcher">
                            <th>Dispatcher</th>
                            <td> {{ dispatchedTeam.dispatcher.last_name + ', ' + dispatchedTeam.dispatcher.first_name }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.Location">
                            <th>Location</th>
                            <td> {{ dispatchedTeam.location }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.Emergency">
                            <th>Emergency type</th>
                            <td> {{ dispatchedTeam.emergency.name }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.Description">
                            <th>Description</th>
                            <td> {{ dispatchedTeam.description }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Hazard</th>
                            <td> {{ dispatchedTeam.hazard }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Number of people involved</th>
                            <td> {{ dispatchedTeam.num_people_involved }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.CallerName">
                            <th>Caller name</th>
                            <td> {{ dispatchedTeam.caller_name }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded || $dispatch.searchReference === SearchRefEnum.CallerNumber">
                            <th>Caller number</th>
                            <td> +639{{ dispatchedTeam.caller_number }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time of Call</th>
                            <td> {{ formatDate(new Date(dispatchedTeam.time_of_call)) }} </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time proceeding to scene</th>
                            <td>
                                <template v-if="dispatchedTeam.time_proceeding_scene"> 
                                    {{ formatDate(new Date(dispatchedTeam.time_proceeding_scene)) }} 
                                </template>
                                <template v-else-if="dispatchedTeam.is_cancelled">
                                    <span class="text-danger">
                                        {{ cancelledLabel }} 
                                    </span>
                                </template>
                                <template v-else>
                                    <button @click="setTime(dispatchedTeam, 'Time proceeding to scene')" class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-fw fa-clock"></i>
                                        <span> Set Time </span>
                                    </button>
                                </template>

                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time arrival at scene</th>
                            <td>
                                <template v-if="dispatchedTeam.time_arrival_scene"> 
                                    {{ formatDate(new Date(dispatchedTeam.time_arrival_scene)) }} 
                                </template>
                                <template v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> 
                                    <span class="text-danger">
                                        {{ cancelledLabel }} 
                                    </span> 
                                </template>
                                <template v-else>
                                    <button v-if="dispatchedTeam.time_proceeding_scene" @click="setTime(dispatchedTeam, 'Time arrival at scene')" class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-fw fa-clock"></i>
                                        <span> Set Time </span>
                                    </button>
                                </template>

                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time proceeding to hospital</th>
                            <td>
                                <template v-if="dispatchedTeam.time_proceeding_hospital"> 
                                    {{ formatDate(new Date(dispatchedTeam.time_proceeding_hospital)) }} 
                                </template>
                                <template v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> 
                                    <span class="text-danger">
                                        {{ cancelledLabel }} 
                                    </span>
                                </template>
                                <template v-else>
                                    <button v-if="dispatchedTeam.time_arrival_scene && !(dispatchedTeam.time_proceeding_base || dispatchedTeam.time_arrival_base)" @click="setTime(dispatchedTeam, 'Time proceeding to hospital')" class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-fw fa-clock"></i>
                                        <span> Set Time </span>
                                    </button>
                                </template>

                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time arrival at hospital</th>
                            <td>
                                <template v-if="dispatchedTeam.time_arrival_hospital"> 
                                    {{ formatDate(new Date(dispatchedTeam.time_arrival_hospital)) }} 
                                </template>
                                <template v-else-if="dispatchedTeam.is_cancelled" class="text-danger"> 
                                    <span class="text-danger">
                                        {{ cancelledLabel }} 
                                    </span> 
                                </template>
                                <template v-else>
                                    <button v-if="dispatchedTeam.time_proceeding_hospital" @click="setTime(dispatchedTeam, 'Time arrival at hospital')" class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-fw fa-clock"></i>
                                        <span> Set Time </span>
                                    </button>
                                </template>
                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time proceeding to base</th>
                            <td>
                                <template v-if="dispatchedTeam.time_proceeding_base">
                                    {{ formatDate(new Date(dispatchedTeam.time_proceeding_base)) }}
                                </template>
                                <template v-else-if="(dispatchedTeam.is_cancelled && dispatchedTeam.time_proceeding_scene) || dispatchedTeam.time_arrival_hospital">
                                    <button @click="setTime(dispatchedTeam, 'Time proceeding to base')" class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-fw fa-clock"></i>
                                        <span> Set Time </span>
                                    </button>
                                </template>
                                <template v-else-if="dispatchedTeam.is_cancelled">
                                    <span class="text-danger">{{ cancelledLabel }}</span>
                                </template>
                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
                            <th>Time arrival at base</th>
                            <td>
                                <template v-if="dispatchedTeam.time_arrival_base">
                                    {{ formatDate(new Date(dispatchedTeam.time_arrival_base)) }}
                                </template>
                                <template v-else-if="(dispatchedTeam.is_cancelled && dispatchedTeam.time_proceeding_base) || dispatchedTeam.time_proceeding_base">
                                    <button @click="setTime(dispatchedTeam, 'Time arrival at base')" class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-fw fa-clock"></i>
                                        <span> Set Time </span>
                                    </button>
                                </template>
                                <template v-else-if="dispatchedTeam.is_cancelled && !dispatchedTeam.time_proceeding_scene">
                                    <span class="text-danger">{{ cancelledLabel }}</span>
                                </template>
                            </td>
                        </tr>
                        <tr v-show="dispatchedTeam.isExpanded">
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

            <div v-else-if="!dispatchedTeam.time_arrival_base && (!dispatchedTeam.is_cancelled || dispatchedTeam.is_cancelled && dispatchedTeam.time_proceeding_scene)" class="row">
                <div class="col text-center">
                    <button @click="reassignDispatcher(dispatchedTeam)" class="btn btn-light text-info" data-toggle="modal" data-target="#reassignModalId">
                        Reassign Dispatcher
                    </button>
                </div>
                <div 
                    class="col text-center" 
                    v-if="dispatchedTeam.status === DispatchStatusEnum.Queue || 
                        dispatchedTeam.status === DispatchStatusEnum.ProceedingScene &&
                        !dispatchedTeam.is_cancelled
                    ">
                        <button @click="cancelService(dispatchedTeam)" class="btn btn-light text-danger">Cancel Service</button>
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

import { DispatchStatusEnum, IDispatch, SearchRefEnum } from '..';
import { CONST_DispatchStatus, formatDate } from '../../common';
import { dispatchStore } from '..';
import { ref } from 'vue';
import Swal from 'sweetalert2'

defineProps<{
    dispatchedTeam: IDispatch
}>()

const emit = defineEmits(['set-time', 'set-complete', 'cancel-service', 'on-reassign'])

const $dispatch = dispatchStore()

const cancelledLabel = ref('Service Cancelled')

const cardHeaderBg = (dispatchedTeam: IDispatch) => {

    if(dispatchedTeam.status === DispatchStatusEnum.ArrivedBase || dispatchedTeam.is_completed){
        return {'bg-success': true}
    }

    if(dispatchedTeam.status === DispatchStatusEnum.Queue){
        return {'bg-secondary': true}
    }

    return {'bg-danger': true}

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

const reassignDispatcher = (dispatchedTeam: IDispatch) => {
    emit('on-reassign', {dispatchedTeam})
}


</script>


<style scoped>

.tbl-expanded{
    height: 500px; 
    overflow-y: auto;
}

</style>