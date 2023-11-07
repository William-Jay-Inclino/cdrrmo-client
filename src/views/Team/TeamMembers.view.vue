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
