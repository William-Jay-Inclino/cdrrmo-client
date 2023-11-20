<template>

    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Please Confirm</h5>
                    <button @click="onNo" class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body text-dark">Are you sure you want to delete?</div>
                <div class="modal-footer justify-content-between">
                    <button @click="onNo" class="btn btn-secondary" type="button" data-dismiss="modal">No</button>
                    <button @click="onYes" class="btn btn-danger" type="button" data-dismiss="modal">Yes</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">

const emit = defineEmits(['on-delete', 'on-cancel'])

defineProps<{
    id: string
}>()

const onYes = () => {
    emit('on-delete')
}

const onNo = () => {
    emit('on-cancel')
}

</script>