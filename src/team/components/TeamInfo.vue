<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
            <h6 class="m-0 font-weight-bold">Team Info</h6>
        </div>
        <div class="card-body" v-if="team">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Team Status</th>
                            <td> 
                                <span :class="{[`badge-${CONST_TeamStatus[team.status].color}`]: true}" class="badge badge-pill text-white"> 
                                    {{ CONST_TeamStatus[team.status].text }} 
                                </span> 
                            </td>
                        </tr>
                        <tr>
                            <th>Team Name</th>
                            <td> {{ team.name }} </td>
                        </tr>
                        <tr>
                            <th>Team Leader</th>
                            <td> {{ team.team_leader.last_name + ', ' + team.team_leader.first_name }} </td>
                        </tr>
                        <tr v-if="true">
                            <th :rowspan="team.team_leader.skills.length + 1" class="align-middle">Skills</th>
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
                            <th>Personnel Type</th>
                            <td> {{ 'personnelType' }} </td>
                        </tr>
                        <tr>
                            <th>Personnel Subtype</th>
                            <td> {{ 'personnelSubType' }} </td>
                        </tr>
                        <tr v-show="'personnelSubSubType'">
                            <th>Personnel Sub-subtype</th>
                            <td> {{ 'personnelSubSubType' }} </td>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>


</template>


<script setup lang="ts">

    import { ITeam } from '..';
    import { CONST_TeamStatus } from '../../common';
    
    defineProps<{
        team: ITeam
    }>()

</script>