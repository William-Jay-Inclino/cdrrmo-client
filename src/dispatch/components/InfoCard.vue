<template>
    <div class="card shadow mb-4">
        <div 
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            :class="cardHeaderBg(dispatchedTeam.status)"
        >
            <h6 class="m-0 font-weight-bold">
                <span class="mr-1"> <b>Status:</b> </span>  
                <span :class="{[`text-bg-${CONST_DispatchStatus[dispatchedTeam.status].color}`]: true}" class="badge rounded-pill text-white"> 
                    {{ CONST_DispatchStatus[dispatchedTeam.status].text }} 
                </span> 
            </h6>

            <h6 class="m-0 font-weight-bold">
                <span class="mr-3"><b class="mr-1">Time of Call:</b> <i>{{ formatDate(new Date(dispatchedTeam.time_of_call)) }}</i>  </span>  
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
                                <button data-toggle="modal" data-target="teamInfoModalId" class="btn btn-light btn-sm">
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
                            <th>Time proceeding to scene</th>
                            <td v-if="dispatchedTeam.time_proceeding_scene"> {{ dispatchedTeam.time_proceeding_scene }} </td>
                            <td v-else>
                                <button class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time arrival at scene</th>
                            <td v-if="dispatchedTeam.time_arrival_scene"> {{ dispatchedTeam.time_arrival_scene }} </td>
                            <td v-else>
                                <button class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time proceeding to hospital</th>
                            <td v-if="dispatchedTeam.time_proceeding_hospital"> {{ dispatchedTeam.time_proceeding_hospital }} </td>
                            <td v-else>
                                <button class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time arrival at hospital</th>
                            <td v-if="dispatchedTeam.time_arrival_hospital"> {{ dispatchedTeam.time_arrival_hospital }} </td>
                            <td v-else>
                                <button class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time proceeding to base</th>
                            <td v-if="dispatchedTeam.time_proceeding_base"> {{ dispatchedTeam.time_proceeding_base }} </td>
                            <td v-else>
                                <button class="btn btn-outline-info btn-sm">
                                    <i class="fas fa-fw fa-clock"></i>
                                    <span> Set Time </span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isExpanded">
                            <th>Time arrival at base</th>
                            <td v-if="dispatchedTeam.time_arrival_hospital"> {{ dispatchedTeam.time_arrival_hospital }} </td>
                            <td v-else>
                                <button class="btn btn-outline-info btn-sm">
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
    </div>
</template>



<script setup lang="ts">

import { DispatchStatusEnum, IDispatch } from '..';
import { CONST_DispatchStatus, formatDate } from '../../common';
import { dispatchStore } from '..';
import { computed } from 'vue';

defineProps<{
        dispatchedTeam: IDispatch
}>()


const $dispatch = dispatchStore()


const isExpanded = computed( () => $dispatch.flags.expand)


const cardHeaderBg = (status: DispatchStatusEnum) => {

if(status === DispatchStatusEnum.Queue){
    return {'text-bg-success': true}
}

return {'text-bg-danger': true}

}

</script>


<style scoped>

.tbl-expanded{
    height: 500px; 
    overflow-y: auto;
}

</style>