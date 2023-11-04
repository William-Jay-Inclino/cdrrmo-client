<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
            <h6 class="m-0 font-weight-bold"> Members </h6>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Name </th>
                            <th class="pl-4"> Skills </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member, i in members">
                            <td class="align-middle"> {{ i + 1 }}. </td>
                            <td class="align-middle"> {{ member.member.first_name + ' ' + member.member.last_name }} </td>
                            <td>
                                <ul class="list-group list-group-flush">
                                    <li v-for="skill in member.skills" class="list-group-item">
                                        {{ skill.trainingSkill.description }}
                                        <button class="btn btn-light btn-sm float-end">
                                            <i class="fas fa-fw fa-eye text-info"></i>
                                        </button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
import { teamMemberService } from '@/modules/team_members';
import { ITeamMember } from '@/types/types';
import { ref, computed, watch, onMounted } from 'vue';


    const props = defineProps<{
        teamId: string
    }>()

    const members = ref<ITeamMember[]>()

    const teamId = computed( () => props.teamId)


    watch(teamId, async() => onUpdateTeamId(teamId.value))

    onMounted( () => {
        onUpdateTeamId(props.teamId)
    })

    const onUpdateTeamId = async(teamId: string) => {
        members.value = teamMemberService.getAllTeamMembers({teamId})
    }

</script>