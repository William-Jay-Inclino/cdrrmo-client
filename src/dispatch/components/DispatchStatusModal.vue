<template>

    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id"
        aria-hidden="true" v-if="dispatchedTeam">
        <div class="modal-dialog is-wider" role="document">
            <div class="modal-content">
                <div class="modal-header" :class="{'text-bg-success': dispatchedTeam.status === DispatchStatusEnum.Deck}">
                    <h5 v-if="dispatchedTeam.status !== DispatchStatusEnum.Deck" class="modal-title">Please Confirm</h5>
                    <h5 v-else class="modal-title">Status: {{ dispatchedTeam.statusObj?.text }}</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div v-if="dispatchedTeam.status !== DispatchStatusEnum.Deck">
                        Update status 
                        <span :class="{[`text-bg-${dispatchedTeam.statusObj?.color}`]: true}" class="badge rounded-pill text-white"> 
                            {{ dispatchedTeam.statusObj?.text }} 
                        </span> to
                        <span :class="{[`text-bg-${newStatus?.statusObj.color}`]: true}" class="badge rounded-pill text-white"> 
                            {{ newStatus?.statusObj.text }} 
                        </span>?
                    </div>

                    <div v-else>
                        Team arrived in the location!
                    </div>

                </div>
                <div class="modal-footer justify-content-between" v-if="dispatchedTeam.status !== DispatchStatusEnum.Deck">
                    <button class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <button @click="onUpdate" class="btn btn-primary" type="button" data-dismiss="modal">Update</button>
                </div>
                <div class="modal-footer" v-else>
                    <button class="btn btn-dark float-end" type="button" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { CONST_DispatchStatus } from '../../common/constants';
    import { DispatchStatusEnum, IDispatch } from '../entities';
    import { computed } from 'vue';

    const props = defineProps<{
        id: string
        dispatchedTeam: IDispatch | undefined
    }>()

    const emit = defineEmits<{
        (e: 'update-status', data: {status: DispatchStatusEnum | undefined}): void
    }>()

    const newStatus = computed( (): {status: DispatchStatusEnum, statusObj: {text: string, color: string}} | null => {
        if(props.dispatchedTeam?.status === DispatchStatusEnum.Queue){
            return {
                status: DispatchStatusEnum.Dispatched,
                statusObj: CONST_DispatchStatus[DispatchStatusEnum.Dispatched],
            } 
        }

        if(props.dispatchedTeam?.status === DispatchStatusEnum.Dispatched){
            return {
                status: DispatchStatusEnum.Deck,
                statusObj: CONST_DispatchStatus[DispatchStatusEnum.Deck],
            } 
        }

        return null
    })

    const onUpdate = () => {
        console.log('onUpdate()')
        emit('update-status', {status: newStatus.value?.status})
    }

</script>

<style scoped>
.is-wider {
    width: 80%; /* Adjust the width to your desired value */
}
</style>@/common/constants@/common/types/types