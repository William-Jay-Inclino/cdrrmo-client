<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Team</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button data-toggle="modal" :data-target="`#${addMemberModalId}`" class="btn btn-primary float-end">
                    Add Member
                </button>
            </div>
            <div class="col-1"></div>
        </div>

        <div class="row mt-3">
            <div class="col-1"></div>
            <div class="col-4">
                <TeamInfo v-if="team" :team="team"/>
            </div>
            <div class="col-6">
                <TeamMembers v-if="team" :team="team" @on-remove-member="onRemoveMember"/>
            </div>
        </div>

        <AddMemberModal v-if="team" :id="addMemberModalId" :team="team" @add-member="onTeamMemberAdded"/>
    </div>

</template>


<script setup lang="ts">
    import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    import TeamInfo from './components/TeamInfo.vue'
    import TeamMembers from './components/TeamMembers.vue';
    import AddMemberModal from './components/AddMemberModal.vue';

    import Swal from 'sweetalert2'

    import { onMounted, ref } from 'vue';
    import { routeNames } from '../common';
    import { useRouter } from 'vue-router';
    import { ITeam, teamStore } from '.';
    import { useToast } from "vue-toastification";

    const toast = useToast();
    const router = useRouter()
    const $team = teamStore()

    const addMemberModalId = ref('addMemberModalId')
    const query = router.currentRoute.value.query
    const team = ref<ITeam | null>(null)
    const teamId = query.id

    const breadcrumbItems = ref([
        {
            text: 'Team List',
            route: routeNames.teams,
            isActive: false,
        },
        {
            text: 'Team Manage',
            route: routeNames.teamManage,
            isActive: true,
        }
    ])

    
    onMounted( async() => {
        team.value = await $team.getTeam(teamId as string)
    })

    const onTeamMemberAdded = async(member_id: string) => {
        console.log('onTeamMemberAdded()', member_id)

        if(!team.value) return 

        const addedMember = await $team.onAddMember({member_id: member_id, team_id: team.value.id})

        if(addedMember){
            toast.success("Team member successfully added!");
            team.value.teamMembers.unshift(addedMember)
        }else{
            toast.error('Failed to add team meber')
        }


    }

    const onRemoveMember = (id: string) => {
        console.log('onRemoveMember()', id)

        if(!team.value) return 

        Swal.fire({
            title: "Are you sure?",
            text: "Team member will be removed!",
            icon: "warning",
            position: "top",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then( async(result) => {
            if (result.isConfirmed) {
                const removed = await $team.onDeleteTeamMember(id)

                if(removed){
                    toast.success('Team member successfully removed!')

                    const members = team.value!.teamMembers

                    const indx = members.findIndex(i => i.id === id)

                    console.log('indx', indx)

                    if(indx !== -1){
                        members.splice(indx, 1)
                    }
                    

                }else{
                    toast.error('Failed to remove team member')
                }
            }
        });
    }


</script>
