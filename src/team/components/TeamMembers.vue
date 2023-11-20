<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
            <h6 class="m-0 font-weight-bold"> Manage Members </h6>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th class="pl-4"> Skills </th>
                            <th class="text-center">
                                <i class="fas fa-fw fa-cogs"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in team.teamMembers">
                            <td class="align-middle"> {{ member.member.first_name + ' ' + member.member.last_name }} </td>
                            <td>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="skill in member.member.skills">
                                        {{ skill.TrainingSkill.name }}
                                        <button class="btn btn-light btn-sm float-end">
                                            <i class="fas fa-fw fa-eye text-info"></i>
                                        </button>
                                    </li>
                                </ul>
                            </td>
                            <td class="align-middle text-center">
                                <button @click="onRemoveMember(member.id)" class="btn btn-light">
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

    import { ITeam } from '..';
    
    defineProps<{
        team: ITeam
    }>()

    const emit = defineEmits(['on-remove-member'])

    const onRemoveMember = (id: string) => {
        emit('on-remove-member', id)
    }

    // const onClickAddMember = () => {
    //     isAdding.value = true 
    // }

    // const onCancelAddMember = () => {
    //     isAdding.value = false
    // }

</script>