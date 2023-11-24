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
                <!-- <button type="button" data-toggle="modal" :data-target="`#${addMemberModalId}`" class="btn btn-primary float-end">
                    Add Member
                </button> -->
                <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#addMemberModalId">
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
                <TeamMembers v-if="team" :team="team" @on-remove-member="onRemoveMember" :can-manage="true"/>
            </div>
        </div>

        <AddMemberModal :id="addMemberModalId" @add-member="onTeamMemberAdded"/>
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
    import { ITeam, ITeamMember, teamStore } from '.';
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

    const onTeamMemberAdded = async(member: ITeamMember) => {
        console.log('onTeamMemberAdded()', member)

        if(!team.value) return 

        const addedMember = await $team.onAddMember({member_id: member.id, team_id: team.value.id})

        if(addedMember){
            toast.success("Team member successfully added!");
            team.value.teamMembers.unshift(addedMember)
        }else{
            toast.error('Failed to add team meber')
        }


    }

    const onRemoveMember = (member: ITeamMember) => {
        console.log('onRemoveMember()', member)

        if(!team.value) return 

        const fullName = member.member.first_name + ' ' + member.member.last_name

        Swal.fire({
            title: "Are you sure?",
            text: fullName + " will be removed!",
            icon: "warning",
            position: "top",
            showCancelButton: true,
            confirmButtonColor: "#e74a3b",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true, 
        }).then(async (result) => {
            if (result.isConfirmed) {
                const removed = await $team.onDeleteTeamMember(member);

                if (removed) {
                toast.success(fullName + " successfully removed!");

                const members = team.value!.teamMembers;

                const indx = members.findIndex((i) => i.id === member.id);

                console.log("indx", indx);

                if (indx !== -1) {
                    members.splice(indx, 1);
                }
                } else {
                toast.error("Failed to remove " + fullName);
                }
            }
        });

    }

</script>
