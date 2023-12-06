<template>

    <div class="modal fade" id="addMemberModalId" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Add Team Member</h5>
                    <button @click="onCancel()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
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
                    <button @click="onCancel()" class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <button @click="onSubmit()" class="btn btn-success" type="button">Submit</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { IUser } from '../../user';
    import { teamStore } from '..';

    const emit = defineEmits(['add-member'])

    defineProps<{
        id: string
    }>()

    const $team = teamStore()

    const isMemberEmpty = ref(false)

    const member = ref<IUser | null>(null)
    


    const memberId = computed( () => {
        if(!member.value) return 
        return member.value.id
    })
    
    watch(memberId, (val) => {
        if(!val) return 
        isMemberEmpty.value = false 
    })

    const onSubmit = () => {
        console.log('onSubmit()')
        isMemberEmpty.value = false 

        if(!member.value){
            isMemberEmpty.value = true 
            return 
        }

        const payload = {...member.value}

        member.value = null

        emit('add-member', payload)
    }

    const onCancel = () => {
        member.value = null
    }

</script>