<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Team Module</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Teams</h6>
                        <button class="btn btn-primary" type="submit">Add Team</button>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Team leader</th>
                                        <th>Team Name</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">
                                            <i class="fas fa-fw fa-cogs"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="team of $team.teams">
                                        <td> {{ team.team_leader?.first_name }} </td>
                                        <td> {{ team.team_name }} </td>
                                        <td class="text-center"> 
                                            <span :class="{[`text-bg-${team.statusObj?.color}`]: true}" class="badge rounded-pill text-white"> 
                                                {{ team.statusObj?.text }} 
                                            </span> 
                                        </td>
                                        <!-- <td>
                                            <router-link :to="{name: 'teamMembers.route', params: {'id': team.team_id}}">
                                                <button type="button" class="btn btn-primary btn-sm">Members</button>
                                            </router-link>
                                        </td> -->
                                        <td class="text-center">
                                            <div class="dropdown no-arrow">
                                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-fw fa-pencil-alt text-primary"></i>
                                                        <span class="ml-2">Update Info</span>
                                                    </a>
                                                    <div class="dropdown-divider"></div>
                                                    <router-link class="dropdown-item" :to="{name: 'teamMembers.route', params: {'id': team.team_id}}">
                                                        <i class="fas fa-fw fa-eye text-info"></i>
                                                        <span class="ml-2">View Members</span>
                                                    </router-link>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-fw fa-archive text-danger"></i>
                                                        <span class="ml-2">Archive</span>
                                                    </a>
                                                </div>
                                            </div>
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
    import { teamService, teamStore } from '@/modules/team'

    const teams = teamService.getAllTeams()

    const $team = teamStore()
    $team.setTeams(teams)

    /* 

    Note: if using fake data, if you refresh the page there will be new set of teams. Therefore team id param in url is irrelevant

    */

</script>
