<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Team Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <!-- <Breadcrumbs :items="breadcrumbItems"/> -->
            </div>
        </div>

        <div class="row">
            <div class="col-1"></div>
            <div class="col-4">
                <!-- <TeamInfo :team-id="teamId"/> -->
            </div>
            <div class="col-6">
                <!-- <TeamMembers :team-id="teamId" :can-manage="true" @add-member="onTeamMemberAdded" @remove-member="onTeamMemberRemoved"/> -->
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
    // import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    // import { ref } from 'vue';
    // import { useRoute } from 'vue-router';
    // import { useToast } from "vue-toastification";

    // const toast = useToast();

    
    // const route = useRoute();

    // const $teamMember = teamMemberStore()
    // const teamId = route.params.id as string

    // $teamMember.setTeamId(teamId)

    // const members = $teamMember.getTeamMembers()
    // $teamMember.setTeamMembers(members)

    // const breadcrumbItems = ref([
    //     {
    //         text: 'Team List',
    //         route: 'teams.route',
    //         isActive: false,
    //     },
    //     {
    //         text: 'Members',
    //         route: 'teamMembers.route',
    //         isActive: true,
    //     }
    // ])

    // const onTeamMemberAdded = () => {
    //     console.log('onTeamMemberAdded()')
    //     toast.success("Team member successfully added!");
    // }

    // const onTeamMemberRemoved = () => {
    //     console.log('onTeamMemberRemoved()')
    //     toast.success("Team member successfully removed!");
    // }

</script>
