<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
            <h6 class="m-0 font-weight-bold">Team Info</h6>
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
                                {{ skill.trainingSkill.description }}
                                <button class="btn btn-light btn-sm float-end">
                                    <i class="fas fa-fw fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th>Personnel Type</th>
                            <td> {{ personnelType }} </td>
                        </tr>
                        <tr>
                            <th>Personnel Subtype</th>
                            <td> {{ personnelSubType }} </td>
                        </tr>
                        <tr v-show="personnelSubSubType">
                            <th>Personnel Sub-subtype</th>
                            <td> {{ personnelSubSubType }} </td>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>


</template>


<script setup lang="ts">
    import { CONST_TeamStatusText, CONST_UserSubTypeText, CONST_UserTypeText } from '@/helpers/constants';
    import { teamService } from '@/modules/team';
    import { teamMemberService } from '@/modules/team_members';
    import { trainingSkillService } from '@/modules/training_skill';
    import { userService } from '@/modules/user';
    import { IPersonnelSkills, ITeam, ITeamMember, UserTypeEnum } from '@/types/types';
    import { computed, onMounted, ref, watch } from 'vue';


    
    const dHeight = ref()

    const props = defineProps<{
        teamId: string
    }>()

    const team = ref<ITeam | null>()
    const teamLeaderSkills = ref<IPersonnelSkills[]>()
    const members = ref<ITeamMember[]>()

    const teamId = computed( () => props.teamId)


    const personnelType = computed( () => CONST_UserTypeText[teamLeader.value!.type])


    const personnelSubType = computed( () => {

        if(!teamLeader.value) return 

        const isACDV = (teamLeader.value.type === UserTypeEnum.ACDV_BART || teamLeader.value.type === UserTypeEnum.ACDV_CSO || teamLeader.value.type === UserTypeEnum.ACDV_INDIVIDUAL || teamLeader.value.type === UserTypeEnum.ACDV_PO) 

        if(isACDV){
            return CONST_UserSubTypeText[teamLeader.value!.type]
        }

        if(!teamLeader.value.sub_type_id) return 

        const subSubType = userService.getSubType(teamLeader.value.type, teamLeader.value.sub_type_id)
        
        return subSubType || ''

    })

    const personnelSubSubType = computed( () => {

        if(!teamLeader.value) return 

        const isACDV = (teamLeader.value.type === UserTypeEnum.ACDV_BART || teamLeader.value.type === UserTypeEnum.ACDV_CSO || teamLeader.value.type === UserTypeEnum.ACDV_INDIVIDUAL || teamLeader.value.type === UserTypeEnum.ACDV_PO) 

        if(!isACDV) return 

        if(!teamLeader.value.sub_type_id) return 

        const subSubType = userService.getSubType(teamLeader.value.type, teamLeader.value.sub_type_id)
        
        return subSubType || ''

    })

    const teamLeader = computed( () => team.value ? team.value.team_leader : null)

    watch(teamId, async() => onUpdateTeamId(teamId.value))
    
    
    onMounted( async() => {
        onUpdateTeamId(teamId.value)
        const dispatchForm = document.getElementById('dispatchForm') as HTMLDivElement
        dHeight.value = dispatchForm.clientHeight
    })

    const onUpdateTeamId = async(teamId: string) => {
        console.log('onUpdateTeamId()', teamId)
        team.value = await teamService.getTeamById(teamId)

        if(teamLeader.value){
            teamLeaderSkills.value = getPersonnelSkills(teamLeader.value.user_id)
        }

        members.value = teamMemberService.getAllTeamMembers({teamId})
    }

    const getPersonnelSkills = (personnelId: string): IPersonnelSkills[] => {
        const personnelSkills = trainingSkillService.getPersonnelSkillsBy({personnel_id: personnelId})

        if(personnelSkills){
            return personnelSkills
        }
        return []
    }


</script>