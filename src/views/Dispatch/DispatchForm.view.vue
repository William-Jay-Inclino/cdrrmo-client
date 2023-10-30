<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-6">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Dispatch a Team!</h6>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Caller Name</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Caller Number</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Medical Description</label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Number of people involved</label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Hazard</label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Nature of Emergency</label>
                                <select class="form-control">
                                    <option v-for="emergency in $emergency.emergencies">
                                        {{ emergency.nature }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Team</label>
                                <select class="form-control">
                                    <option v-for="team in $team.teams">
                                        {{ team.team_name }}
                                    </option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary float-end">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import { emergencyStore } from '@/modules/emergency'
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
    import { teamStore } from '@/modules/team';

    const $emergency = emergencyStore()
    const emergencies = $emergency.getEmergencies()
    $emergency.setEmergencies(emergencies)

    const $team = teamStore()
    const teams = $team.getTeams()
    $team.setTeams(teams)

    const breadcrumbItems = ref([
        {
            text: 'Dispatch List',
            route: 'dispatch.route',
            isActive: false,
        },
        {
            text: 'Dispatch a Team',
            route: 'dispatchForm.route',
            isActive: true,
        }
    ])

</script>

