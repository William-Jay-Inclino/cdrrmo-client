<template>

    <div class="modal fade" id="teamInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Team Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <TeamInfo v-if="team" :team="team"/>
                        </div>
                        <div class="col">
                            <TeamMembers v-if="team" :team="team" :can-manage="canManage"/>
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <!-- <button v-if="canManage" type="button" class="btn btn-primary">Save changes</button> -->
            </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

    import { ITeam } from '..';
    import TeamInfo from '../components/TeamInfo.vue'
    import TeamMembers from '../components/TeamMembers.vue'

    defineProps<{
        team: ITeam | null
        canManage: boolean
    }>()


</script>