<template>

    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" >
                    <h5 class="modal-title">Add Team Member</h5>
                </div>
                <div class="modal-body">
                    <v-select :options="users" v-model="member"></v-select>
                    <small v-if="isMemberExist" class="form-text text-danger"> Personnel is already a member </small>
                    <small v-if="isMemberEmpty" class="form-text text-danger"> Select a personnel </small>
                    <div class="row mt-4">
                        <div class="col">
                            <div class="responsive" v-if="member">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Skills</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="skill in member.skills">
                                            <td> {{ skill.TrainingSkill.name }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <button @click="onSubmit()" class="btn btn-success" type="button" :data-dismiss="submitted ? 'modal' : ''" :disabled="isMemberExist">Submit</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { IUser, userStore } from '../../user';
    import { ITeam, teamStore } from '..';

    const props = defineProps<{
        id: string
        team: ITeam
    }>()

    const isMemberEmpty = ref(false)
    const submitted = ref(false)

    const emit = defineEmits(['add-member'])

    const $user = userStore()
    const $team = teamStore()

    const member = ref<IUser | null>(null)
    
    const memberId = computed( () => {
        if(!member.value) return 
        return member.value.id
    })


    watch(memberId, (val) => {
        if(!val) return 
        isMemberEmpty.value = false 
    })

    const users = computed( () => {
        return $user.users.map(user => {
            user.label = $team.getTeamLeaderLabel(user)
            return user
        })
    })

    const isMemberExist = computed( (): boolean => {
        if(!member.value) return false

        const i = props.team.teamMembers.find(i => i.member_id === member.value?.id)

        if(i){
            return true
        }

        return false 
    })

    const onSubmit = () => {
        console.log('onSubmit()')
        isMemberEmpty.value = false 

        if(!member.value){
            isMemberEmpty.value = true 
            return 
        }

        submitted.value = true
        emit('add-member', memberId.value)
    }

</script>