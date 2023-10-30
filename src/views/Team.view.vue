<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Team Module</h1>
        </div>

        <div class="row mb-3">
            <div class="col-10">
                <div class="float-end">
                    <button class="btn btn-primary" type="submit">Add Team</button>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Teams</h6>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Team leader</th>
                                        <th>Team Name</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="team of $team.teams">
                                        <td> {{ team.team_leader?.first_name }} </td>
                                        <td> {{ team.team_name }} </td>
                                        <td> {{ team.statusText }} </td>
                                        <td>
                                            <router-link :to="{name: 'members.route', params: {'id': team.team_id}}">
                                                <button type="button" class="btn btn-primary btn-sm">Members</button>
                                            </router-link>
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
    import { teamStore } from '../modules'

    const $team = teamStore()
    const teams = $team.getTeams()
    $team.setTeams(teams)


    /* 

    Note: if using fake data, if you refresh the page there will be new set of teams. Therefore team id param in url is irrelevant

    */

</script>
