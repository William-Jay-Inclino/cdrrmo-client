<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
            <h6 class="m-0 font-weight-bold">Team Info</h6>
            <h6 class="m-0 font-weight-bold"> {{ team?.team_id }} </h6>
        </div>
        <div class="card-body" v-if="team && teamLeader">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Team Status</th>
                            <td> {{ CONST_TeamStatusText[team.status] }} </td>
                        </tr>
                        <tr>
                            <th>Team Name</th>
                            <td> {{ team.team_name }} </td>
                        </tr>
                        <tr>
                            <th>Team Leader</th>
                            <td> {{ teamLeader.first_name + ' ' + teamLeader.last_name }} </td>
                        </tr>
                        <tr v-if="teamLeaderSkills">
                            <th :rowspan="teamLeaderSkills!.length + 1" class="align-middle">Skills</th>
                        </tr>
                        <tr v-for="skill in teamLeaderSkills">
                            <td>
                                {{ skill.description }}
                                <button class="btn btn-light btn-sm float-end">
                                    <i class="fas fa-fw fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th>Personnel Type</th>
                            <td>ACDV</td>
                        </tr>
                        <tr>
                            <th>Personnel Subtype</th>
                            <td>ACDV</td>
                        </tr>
                        <tr>
                            <th>Personnel Sub-subtype</th>
                            <td>ACDV</td>
                        </tr>
                    </thead>
                </table>

                <hr>

                <h6 class="m-0 font-weight-bold mb-4">Members</h6>

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
                            <tr>
                                <td>1</td>
                                <td>Member 1</td>
                                <td>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cras justo odio</li>
                                        <li class="list-group-item">Dapibus ac facilisis in</li>
                                        <li class="list-group-item">Morbi leo risus</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Member 1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Member 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { CONST_TeamStatusText } from '@/helpers/constants';
    import { teamService } from '@/modules/team';
    import { trainingSkillService } from '@/modules/training_skill';
    import { userService } from '@/modules/user';
    import { ITeam, ITrainingSkill, IUser } from '@/types/types';
    import { computed, onMounted, ref, watch } from 'vue';


    const props = defineProps<{
        teamId: string
    }>()

    const team = ref<ITeam | null>()
    const teamLeader = ref<IUser | null>()
    const teamLeaderSkills = ref<ITrainingSkill[]>()

    const teamId = computed( () => props.teamId)

    watch(teamId, async() => onUpdateTeamId(teamId.value))
    
    const getTeam = async(teamId: string): Promise<ITeam | null> => {
        return await teamService.getTeamById(teamId)
    }
    const getTeamLeader = async(teamLeaderId: string): Promise<IUser | null> => {
        return await userService.getUserById(teamLeaderId)
    }
    const getTLSkills = async(personnelId: string): Promise<ITrainingSkill[]> => {
        const personnelSkills = await trainingSkillService.getPersonnelSkillsBy({personnel_id: personnelId})

        const skills: ITrainingSkill[] = []

        personnelSkills?.forEach( async(i) => {
            const skill = await trainingSkillService.getTrainingSkillById(i.training_id)
            if(skill){
                skills.push(skill)
            }
        })

        return skills 
    }
    
    onMounted( async() => {
        onUpdateTeamId(teamId.value)
    })

    const onUpdateTeamId = async(teamId: string) => {
        console.log('onUpdateTeamId()', teamId)
        team.value = await getTeam(teamId)
        if(team.value && team.value.team_leader_id){
            teamLeader.value = await getTeamLeader(team.value.team_leader_id)

        }

        if(teamLeader.value){
            teamLeaderSkills.value = await getTLSkills(teamLeader.value.user_id)
        }
    }


</script>