<template>

    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" >
                    <h5 class="modal-title">Add Team Member</h5>
                </div>
                <div class="modal-body">
                    <v-select :options="$team.usersWithoutTeam" v-model="member"></v-select>
                    <small class="form-text text-muted">   

                        <i> Note: Only individuals who are not assigned to any team are displayed. </i>

                    </small>
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
                    <button @click="onSubmit()" class="btn btn-success" type="button" :data-dismiss="submitted ? 'modal' : ''" >Submit</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { IUser } from '../../user';
    import { ITeam, teamStore } from '..';

    const emit = defineEmits(['add-member'])

    defineProps<{
        id: string
        team: ITeam
    }>()

    const $team = teamStore()

    const isMemberEmpty = ref(false)
    const submitted = ref(false)

    const member = ref<IUser | null>(null)
    


    const memberId = computed( () => {
        if(!member.value) return 
        return member.value.id
    })
    
    watch(memberId, (val) => {
        if(!val) return 
        isMemberEmpty.value = false 
    })

    // const isMemberExist = computed( (): boolean => {
    //     if(!member.value) return false

    //     const i = props.team.teamMembers.find(i => i.member_id === member.value?.id)

    //     if(i){
    //         return true
    //     }

    //     return false 
    // })

    const onSubmit = () => {
        console.log('onSubmit()')
        isMemberEmpty.value = false 

        if(!member.value){
            isMemberEmpty.value = true 
            return 
        }

        const payload = {...member.value}

        member.value = null

        submitted.value = true
        emit('add-member', payload)
    }

</script>