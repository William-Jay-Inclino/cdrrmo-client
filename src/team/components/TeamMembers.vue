<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
            <h6 class="m-0 font-weight-bold"> Members </h6>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <td class="font-weight-bold"> Name </td>
                            <td class="pl-4 font-weight-bold"> Skills </td>
                            <td v-if="canManage" class="text-center">
                                <i class="fas fa-fw fa-cogs"></i>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in team.teamMembers">
                            <td class="align-middle"> {{ member.member.first_name + ' ' + member.member.last_name }} </td>
                            <td>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="skill in member.member.skills">
                                        {{ skill.TrainingSkill.name }}
                                        <!-- <button class="btn btn-light btn-sm">
                                            <i class="fas fa-fw fa-eye text-info"></i>
                                        </button> -->
                                    </li>
                                </ul>
                            </td>
                            <td v-if="canManage" class="align-middle text-center">
                                <button @click="onRemoveMember(member)" class="btn btn-light">
                                    <i class="fas fa-fw fa-trash text-danger"></i> 
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">

    import { ITeam, ITeamMember } from '..';
    
    defineProps<{
        team: ITeam
        canManage: boolean
    }>()

    const emit = defineEmits(['on-remove-member'])

    const onRemoveMember = (member: ITeamMember) => {
        emit('on-remove-member', member)
    }

    // const onClickAddMember = () => {
    //     isAdding.value = true 
    // }

    // const onCancelAddMember = () => {
    //     isAdding.value = false
    // }

</script>