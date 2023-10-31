<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>
            <router-link :to="{name: 'dispatchForm.route'}">
                <button class="btn btn-primary" type="submit">Dispatch a Team</button>
            </router-link>
        </div>

        <div class="row justify-content-center">
            <div class="col-10">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Dispatch Label</h6>

                        <router-link :to="{name: 'dispatchForm.route'}">
                            <button class="btn btn-outline-primary" type="submit">Update</button>
                        </router-link>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body" v-for="dispatchedTeam in $dispatch.dispatchedTeams">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nature of Emergency</th>
                                        <th>Team Dispatched</th>
                                        <th>Location</th>
                                        <th>No. of people involved</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {{ dispatchedTeam.emergency_id }} </td>
                                        <td> {{ dispatchedTeam.team_id }} </td>
                                        <td> {{ dispatchedTeam.location }} </td>
                                        <td> {{ dispatchedTeam.num_people_involved }} </td>
                                        <td> {{ dispatchedTeam.status }} </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="2" style="text-align: center">Caller</th>
                                        <th colspan="5" style="text-align: center">Time</th>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Dispatch</th>
                                        <th>Proceeding</th>
                                        <th>Arrival</th>
                                        <th>Proceeding Hospital</th>
                                        <th>Arrival Hospital</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <table class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Medical Description</th>
                                        <th>Hazard</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>


<script setup lang="ts">
  
import { dispatchStore } from '@/modules/dispatch';

const $dispatch = dispatchStore()

</script>

