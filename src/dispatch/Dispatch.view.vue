<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>

        </div>
        
        <!-- <div class="row mb-3">
            <div class="col-11">
                <router-link :to="{name: 'dispatchForm.route'}">
                    <button class="btn btn-primary float-end" type="submit">Dispatch a Team</button>
                </router-link>
            </div>
        </div> -->

        <div class="row">
            <div class="col-4" v-for="dispatchedTeam in $dispatch.dispatchedTeams">
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
                            <span><b class="mr-1">Time of Call:</b> <i>{{ formatDate(new Date(dispatchedTeam.time_of_call)) }}</i>  </span>  
                        </h6>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Team dispatched</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Dispatcher</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Location</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Emergency type</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Number of people involved</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Caller name</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Caller number</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Hazard</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Time proceeding to scene</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Time arrival at scene</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Time proceeding to hospital</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Time arrival at hospital</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Time proceeding to base</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Time arrival at base</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Remarks</th>
                                        <td></td>
                                    </tr>
                                </thead>
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
  
    import { CONST_DispatchStatus, formatDate } from '../common';
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
