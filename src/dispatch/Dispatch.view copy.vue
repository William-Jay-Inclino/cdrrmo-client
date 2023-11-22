<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>

        </div>
        
        <div class="row mb-3">
            <div class="col-11">
                <router-link :to="{name: 'dispatchForm.route'}">
                    <button class="btn btn-primary float-end" type="submit">Dispatch a Team</button>
                </router-link>
            </div>
        </div>

        <div class="row justify-content-center" v-for="dispatchedTeam in $dispatch.dispatchedTeams">
            <div class="col-10">
                <div class="card shadow mb-4">
                    <div 
                        class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                        :class="cardHeaderBg(dispatchedTeam.status)"
                    >
                        <h6 class="m-0 font-weight-bold">
                            <span class="mr-3"> <b>Status:</b> </span>  
                            <span :class="{[`text-bg-${CONST_DispatchStatus[dispatchedTeam.status].color}`]: true}" class="badge rounded-pill text-white"> 
                                {{ CONST_DispatchStatus[dispatchedTeam.status].text }} 
                            </span> 
                        </h6>

                        <h6 class="m-0 font-weight-bold">
                            <span><b class="mr-3">Time of Call:</b> <i>{{ dispatchedTeam.time_of_call }}</i>  </span>  
                        </h6>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th width="16.66%">
                                            Team Dispatched
                                            <button data-toggle="modal" data-target="teamInfoModalId" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-info-circle text-info"></i>
                                            </button>
                                        </th>
                                        <th width="16.66%">Dispatcher</th>
                                        <th width="16.66%">Location</th>
                                        <th width="16.66%">Emergency Type</th>
                                        <th width="16.66%">Number of People Involved</th>
                                        <th colspan="2" width="33.32%" class="text-center">Caller</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ dispatchedTeam.team.name }} </td>
                                        <td> {{ dispatchedTeam.dispatcher.first_name + ' ' + dispatchedTeam.dispatcher.last_name }} </td>
                                        <td> {{ dispatchedTeam.location }} </td>
                                        <td> {{ dispatchedTeam.emergency.name }} </td>
                                        <td> {{ dispatchedTeam.num_people_involved }} </td>
                                        <td colspan="2" class="text-center"> {{ dispatchedTeam.caller_name + ' ' + dispatchedTeam.caller_number }} </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr class="table-info">
                                        <th width="16.66%">
                                            <i class="fas fa-fw fa-clock"></i>
                                            <span class="ml-2">Proceeding Scene</span>
                                        </th>
                                        <th width="16.66%">
                                            <i class="fas fa-fw fa-clock"></i>
                                            <span class="ml-2">Arrival Scene</span>
                                        </th>
                                        <th width="16.66%">
                                            <i class="fas fa-fw fa-clock"></i>
                                            <span class="ml-2">Proceeding Hospital</span>
                                        </th>
                                        <th width="16.66%">
                                            <i class="fas fa-fw fa-clock"></i>
                                            <span class="ml-2">Arrival Hospital</span>
                                        </th>
                                        <th width="16.66%">
                                            <i class="fas fa-fw fa-clock"></i>
                                            <span class="ml-2">Proceeding Base</span>
                                        </th>
                                        <th width="16.66%">
                                            <i class="fas fa-fw fa-clock"></i>
                                            <span class="ml-2">Arrival Base</span>
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
                                    <tr class="table-info">
                                        <th width="25%">Description</th>
                                        <th width="25%">Hazard</th>
                                        <th width="25%">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ dispatchedTeam.description }} </td>
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

        <!-- <DispatchStatusModal v-show="showDispatchStatusModal" :id="dispatchStatusModalId" :dispatched-team="selectedDispatchedTeam" @update-status="onUpdateStatus"/>
        <TeamInfoModal :id="teamInfoModalId" v-if="selectedDispatchedTeam" :team-id="selectedDispatchedTeam.team_id" /> -->
  </div>

</template>


<script setup lang="ts">
  
    import { CONST_DispatchStatus } from '../common';
import { DispatchStatusEnum, dispatchStore } from '.';


    const $dispatch = dispatchStore()

    $dispatch.init()

    const cardHeaderBg = (status: DispatchStatusEnum) => {

        if(status === DispatchStatusEnum.Queue){
            return {'text-bg-success': true}
        }

        return {'text-bg-danger': true}

    }


</script>
