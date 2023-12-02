<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold">Team Info</h6>
        </div>
        <div class="card-body" v-if="team">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <td class="font-weight-bold">Team Status</td>
                            <td> 
                                <span :class="{[`badge-${CONST_TeamStatus[team.status].color}`]: true}" class="badge badge-pill text-white"> 
                                    {{ CONST_TeamStatus[team.status].text }} 
                                </span> 
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Team Name</td>
                            <td> {{ team.name }} </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Team Leader</td>
                            <td> {{ team.team_leader.last_name + ', ' + team.team_leader.first_name }} </td>
                        </tr>
                        <tr v-if="true">
                            <td :rowspan="team.team_leader.skills.length + 1" class="align-middle font-weight-bold">Skills</td>
                        </tr>
                        <tr v-for="skill in team.team_leader.skills">
                            <td>
                                {{ skill.TrainingSkill.name }}
                                <!-- <button class="btn btn-light btn-sm">
                                    <i class="fas fa-fw fa-eye text-info"></i>
                                </button> -->
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Personnel Type</td>
                            <td> {{ CONST_UserTypes[team.team_leader.type].text }} </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Personnel Subtype</td>
                            <td>  
                                <template v-if="isUserACDV(team.team_leader.type) || isUserLGU(team.team_leader.type)">
                                    {{ CONST_SubTypes[team.team_leader.type].text }}
                                </template>
                                <template v-else-if="team.team_leader.type === UserTypeEnum.National_Agency && team.team_leader.Na">
                                    {{ team.team_leader.Na.name }}
                                </template>
                            </td>
                        </tr>
                        <tr v-if="isUserACDV(team.team_leader.type)">
                            <td class="font-weight-bold">Personnel Sub-subtype</td>
                            <td v-if="team.team_leader.Bart">  
                                {{ team.team_leader.Bart.name }}
                            </td>
                            <td v-else-if="team.team_leader.Cso">  
                                {{ team.team_leader.Cso.name }}
                            </td>
                            <td v-else-if="team.team_leader.Po">  
                                {{ team.team_leader.Po.name }}
                            </td>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>


</template>


<script setup lang="ts">

    import { ITeam } from '..';
    import { CONST_TeamStatus, CONST_UserTypes, CONST_SubTypes, isUserACDV, isUserLGU } from '../../common';
    import { UserTypeEnum } from '../../user'
    
    defineProps<{
        team: ITeam
    }>()

</script>