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
                        <tr v-for="member in members">
                            <td class="align-middle"> {{ member.member.first_name + ' ' + member.member.last_name }} </td>
                            <td>
                                <ul class="list-group list-group-flush">
                                    <li v-for="skill in member.skills" class="list-group-item">
                                        {{ skill.trainingSkill?.description }}
                                        <button class="btn btn-light btn-sm float-end">
                                            <i class="fas fa-fw fa-eye text-info"></i>
                                        </button>
                                    </li>
                                </ul>
                            </td>
                            <td class="align-middle text-center">
                                <button @click="onRemove(member)" class="btn btn-light">
                                    <i class="fas fa-fw fa-trash text-danger"></i> 
                                </button>
                            </td>
                        </tr>
                        <tr v-show="isAddingMember">
                            <td class="align-middle">
                                <select @change="onChangeSelectedUser()" v-model="selectedUser" class="form-control">
                                    <option :value="user" :key="user.user_id" v-for="user in users">
                                        {{ user.first_name + ' ' + user.last_name }}
                                    </option>
                                </select>
                                <small class="form-text text-danger" v-show="!selectedUser">Select Personnel</small>
                            </td>
                            <td>
                                <ul class="list-group list-group-flush">
                                    <li v-for="skill in personnelSkills" class="list-group-item">
                                        {{ skill.trainingSkill?.description }}
                                        <button class="btn btn-light btn-sm float-end">
                                            <i class="fas fa-fw fa-eye text-info"></i>
                                        </button>
                                    </li>
                                </ul>
                            </td>
                            <td class="text-center align-middle">
                                <button @click="onSave" v-if="isAddingMember" class="btn btn-success btn-sm" :class="{'disabled': !selectedUser}">
                                    <!-- <i class="fas fa-fw fa-check"></i>  -->
                                    <span>Save</span>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="4">
                                <button v-if="!isAddingMember" @click="onAdd" class="btn btn-outline-primary btn-sm btn-block">
                                    <i class="fas fa-fw fa-plus"></i>
                                </button>
                                <button @click="onCancel" v-else class="btn btn-outline-dark btn-sm btn-block">
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <toast :msgs="notifs.msgs"></toast>

    </div>

</template>


<script setup lang="ts">
import { teamMemberService } from '@/modules/team_members';
import { trainingSkillService } from '@/modules/training_skill';
import { userService } from '@/modules/user';
import { IPersonnelSkill, ITeamMember, IUser } from '@/types/types';
import { ref, computed, watch, onMounted } from 'vue';
import toast from '@/components/Toast.vue'
import { push as toastPush } from './Toast.vue';
import { faker } from '@faker-js/faker';

const notifs = ref({ msgs: [] });

const props = defineProps<{
    teamId: string
}>()

const members = ref<ITeamMember[]>()
const isAddingMember = ref(false)
const teamId = computed( () => props.teamId)

const _users = userService.getAllUsers()

const users = ref([..._users])

const selectedUser = ref<IUser>()
const personnelSkills = ref<IPersonnelSkill[]>([])

watch(teamId, async() => onUpdateTeamId(teamId.value))

onMounted( () => {
    onUpdateTeamId(props.teamId)
})

const onUpdateTeamId = async(teamId: string) => {
    members.value = teamMemberService.getAllTeamMembers({teamId})
}

const onRemove = (member: ITeamMember) => {
    console.log('onRemove()', member)

    if(!members.value) return 

    const indx = members.value?.findIndex(i => i.member_id === member.member_id)

    if(indx === -1){
        console.error('member not found')
        return 
    }

    members.value?.splice(indx, 1)

    pushNotifs('Member removed successfully!')
}

const onAdd = () => {
    isAddingMember.value = true
}

const onSave = () => {
    isAddingMember.value = false

    if(!selectedUser.value || !members.value) return 

    const member = {} as ITeamMember
    member.member = {...selectedUser.value}
    member.member_id = selectedUser.value.user_id
    member.skills = [...personnelSkills.value]
    member.team_id = teamId.value
    member.team_member_id = ''
    members.value.push(member)

    pushNotifs('Member added successfully!')

    reset()

}

const onCancel = () => {
    isAddingMember.value = false

    reset()
}

const onChangeSelectedUser = () => {
    console.log('onChangeSelectedUser()')

    if(!selectedUser.value) return 

    const skills = trainingSkillService.getPersonnelSkillsBy({personnel_id: selectedUser.value.user_id})
    if(skills){
        personnelSkills.value = skills
    }
}

const reset = () => {
    selectedUser.value = undefined 
    personnelSkills.value = []
    isAddingMember.value = false
}

const pushNotifs = (msg: string) => {
    const id = faker.string.uuid()
    toastPush(notifs.value.msgs, { id, msg });
}

</script>
