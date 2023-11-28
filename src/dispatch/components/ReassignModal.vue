<template>

    <div class="modal fade" id="reassignModalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Reassign Dispatcher</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <v-select :options="dispatchers" v-model="selectedDispatcher"></v-select>

                </div>
                <div class="modal-footer justify-content-between">
                    <button class="btn btn-dark" type="button" data-bs-dismiss="modal">Cancel</button>
                    <button @click="onClickReassign()" class="btn btn-success" type="button">Reassign</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

    const props = defineProps<{
        dispatcher: IUser | null
    }>()

    const emit = defineEmits(['reassign-dispatcher'])

    import { onMounted, ref } from 'vue';
    import { IUser, userService } from '../../user';

    const dispatchers = ref<IUser[]>([])
    const selectedDispatcher = ref<IUser | null>(null)
    

    onMounted( async() => {

        // get all dispatchers from api; add label property which is required in v-select; don't include in the option the current dispatcher 

        dispatchers.value = (await userService.findDispatchers())
        .map(i => {
            i.label = i.first_name + ' ' + i.last_name
            return i
        })
        .filter(i => i.id !== props.dispatcher?.id)
    })

    const onClickReassign = () => {

        const dispatcher = {...selectedDispatcher.value}

        selectedDispatcher.value = null

        emit('reassign-dispatcher', {dispatcher})
    }

</script>