<template>

    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header" >
                    <h5 class="modal-title">Team Details</h5>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <TeamInfo :team-id="teamId"/>
                        </div>
                        <div class="col">
                            <TeamMembers :team-id="teamId"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-dark float-end" type="button" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

    import TeamInfo from '@/components/TeamInfo.vue'
    import TeamMembers from '@/components/TeamMembers.vue'

    defineProps<{
        id: string
        teamId: string
    }>()


</script>