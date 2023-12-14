<template>

    <div ref="myModal" class="modal fade" id="reassignModalId" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Reassign Dispatcher</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="dispatchedTeam">
                    <div class=" mb-3 row">
                        <div class="col">
                            <span>
                                Current Dispatcher: <b>{{ dispatchedTeam?.dispatcher.first_name + ' ' + dispatchedTeam?.dispatcher.last_name }}</b>
                            </span>
                        </div>
                    </div>
                    <small class="form-text text-muted">  <i> Reassign to: </i></small>
                    <v-select :options="dispatchers" v-model="selectedDispatcher"></v-select>
                    
                </div>
                <div class="modal-footer justify-content-between">
                    <button ref="cancelButton" class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <button :disabled="!selectedDispatcher" @click="onClickReassign()" class="btn btn-success" type="button" data-dismiss="modal">Reassign</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

    import { computed, ref } from 'vue';
    import { IUser } from '../../user';
    import { IDispatch } from '..';
    import { dispatchStore } from '..';

    const props = defineProps<{
        dispatchedTeam: IDispatch | null
    }>()

    const emit = defineEmits(['reassign-dispatcher'])

    const $dispatch = dispatchStore()
    const selectedDispatcher = ref<IUser | null>(null)

    const cancelButton = ref<HTMLButtonElement | null>(null)
    
    // don't include in the option the current dispatcher 
    const dispatchers = computed( () => {
        
        return $dispatch.dispatchers.filter(i => i.id !== props.dispatchedTeam?.dispatcher.id)

    })

    const onClickReassign = () => {

        if(!selectedDispatcher.value){
            console.error('selectedDispatcher is undefined')
            return 
        }

        const dispatcher = {...selectedDispatcher.value}

        selectedDispatcher.value = null

        emit('reassign-dispatcher', {dispatchedTeam: props.dispatchedTeam, dispatcher})

          // Check if cancelButton and its click method are available
        if (cancelButton.value && typeof cancelButton.value.click === 'function') {
            cancelButton.value.click()
        }
    }

</script>