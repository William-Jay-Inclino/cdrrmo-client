<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
            <h6 class="m-0 font-weight-bold">Team Info</h6>
        </div>
        <div class="card-body" v-if="false">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Team Status</th>
                            <td> {{ 'CONST_TeamStatusText[team.status]' }} </td>
                        </tr>
                        <tr>
                            <th>Team Name</th>
                            <td> {{ 'team.team_name' }} </td>
                        </tr>
                        <tr>
                            <th>Team Leader</th>
                            <td> {{ "teamLeader.first_name + ' ' + teamLeader.last_name" }} </td>
                        </tr>
                        <tr v-if="true">
                            <th :rowspan="1" class="align-middle">Skills</th>
                        </tr>
                        <tr>
                            <td>
                                {{ "skill.trainingSkill?.description" }}
                                <button class="btn btn-light btn-sm float-end">
                                    <i class="fas fa-fw fa-eye text-info"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th>Personnel Type</th>
                            <td> {{ 'personnelType' }} </td>
                        </tr>
                        <tr>
                            <th>Personnel Subtype</th>
                            <td> {{ 'personnelSubType' }} </td>
                        </tr>
                        <tr v-show="'personnelSubSubType'">
                            <th>Personnel Sub-subtype</th>
                            <td> {{ 'personnelSubSubType' }} </td>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>


</template>


<script setup lang="ts">

    // const props = defineProps<{
    //     teamId: string
    // }>()


</script>