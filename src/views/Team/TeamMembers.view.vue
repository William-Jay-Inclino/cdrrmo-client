<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Team Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-10">
                <div class="float-end">
                    <!-- <button class="btn btn-primary" type="submit">Add Team</button> -->
                </div>
            </div>
        </div>

        <div class="row justify-content-center">

            <div class="col-2">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Team Info</h6>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Team Name</th>
                                        <td> {{ $teamMember.team?.team_name }} </td>
                                    </tr>
                                    <tr>
                                        <th>Team Leader</th>
                                        <td> {{ $teamMember.team?.team_leader?.first_name }} </td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td> {{ $teamMember.team?.statusText }} </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Team Members</h6>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Age</th>
                                        <th>Contact #</th>
                                        <th>Status</th>
                                        <th>Dispatch Status</th>
                                        <th>Userlevel</th>
                                        <th>Type</th>
                                        <th>Subtype</th>
                                        <th>Sub-Subtype</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="teamMember in $teamMember.teamMembers">
                                        <td> {{ teamMember.member.first_name }} </td>
                                        <td> {{ teamMember.member.genderText }} </td>
                                        <td> {{ teamMember.member.address }} </td>
                                        <td> {{ teamMember.member.age }} </td>
                                        <td> {{ teamMember.member.contact_no }} </td>
                                        <td> {{ teamMember.member.statustext }} </td>
                                        <td> {{ teamMember.member.dispatchStatusText }} </td>
                                        <td> {{ teamMember.member.userLevelText }} </td>
                                        <td> {{ teamMember.member.typeText }} </td>
                                        <td> {{ teamMember.member.subTypeText }} </td>
                                        <td> {{ teamMember.member.subSubTypeText }} </td>
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
    import { teamMemberStore } from '@/modules/team_members'
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();

    const $teamMember = teamMemberStore()
    const teamId = route.params.id as string

    $teamMember.setTeamId(teamId)

    const members = $teamMember.getTeamMembers()
    $teamMember.setTeamMembers(members)

    const breadcrumbItems = ref([
        {
            text: 'Team List',
            route: 'teams.route',
            isActive: false,
        },
        {
            text: 'Members',
            route: 'teamMembers.route',
            isActive: true,
        }
    ])

</script>
