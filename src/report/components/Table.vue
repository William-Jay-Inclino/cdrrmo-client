<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center">
            <b> {{ $report.formatDate(item.date) }} </b>
        </div>

        <div class="card-body">
            <div v-if="item.data.length === 0">
                <span> No record </span>
            </div>
            <div v-else class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th> Time of Call </th>
                            <th> Description </th>
                            <th> Emergency Type </th>
                            <th> Location </th>
                            <th> Team Dispatched </th>
                            <th> Dispatcher </th>
                            <th> Caller </th>
                            <th> Involved Individuals </th>
                            <th> Proceeding to scene</th>
                            <th> Arrived at scene </th>
                            <th> Proceeding to hospital </th>
                            <th> Arrived at hospital </th>
                            <th> Proceeding to Base </th>
                            <th> Arrived at Base </th>
                            <th> Status </th>
                            <th> Remarks </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in item.data">
                            <td class="align-middle" style="white-space: nowrap;"> {{ $report.formatTime(i.time_of_call) }} </td>
                            <td class="align-middle"> {{ i.description }} </td>
                            <td class="align-middle"> {{ i.emergency.name }} </td>
                            <td class="align-middle"> {{ i.location }} </td>
                            <td class="align-middle"> {{ i.team.name }} </td>
                            <td class="align-middle"> {{ i.dispatcher.last_name + ', ' + i.dispatcher.first_name }} </td>
                            <td class="align-middle"> 
                                {{ i.caller_name }} <br>
                                {{ `(+63${i.caller_number})` }}
                            </td>
                            <td class="align-middle"> {{ i.num_people_involved }} individuals </td>
                            <td class="align-middle" style="white-space: nowrap;">
                                <template v-if="i.time_proceeding_scene">
                                    {{ $report.formatDispatchDate(i.time_proceeding_scene) }}
                                </template>
                            </td>
                            <td class="align-middle" style="white-space: nowrap;">
                                <template v-if="i.time_arrival_scene">
                                    {{ $report.formatDispatchDate(i.time_arrival_scene) }}
                                </template>
                            </td>
                            <td class="align-middle" style="white-space: nowrap;">
                                <template v-if="i.time_proceeding_hospital">
                                    {{ $report.formatDispatchDate(i.time_proceeding_hospital) }}
                                </template>
                            </td>
                            <td class="align-middle" style="white-space: nowrap;">
                                <template v-if="i.time_arrival_hospital">
                                    {{ $report.formatDispatchDate(i.time_arrival_hospital) }}
                                </template>
                            </td>
                            <td class="align-middle" style="white-space: nowrap;">
                                <template v-if="i.time_proceeding_base">
                                    {{ $report.formatDispatchDate(i.time_proceeding_base) }}
                                </template>
                            </td>
                            <td class="align-middle" style="white-space: nowrap;">
                                <template v-if="i.time_arrival_base">
                                    {{ $report.formatDispatchDate(i.time_arrival_base) }}
                                </template>
                            </td>
                            <td class="align-middle" :class="{'text-success': i.is_completed, 'text-danger': !i.is_completed}"> {{ $report.getStatus(i) }} </td>
                            <td class="align-middle"> {{ i.remarks }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>



</template>

<script setup lang="ts">
    import { IncidentReport } from '../entities';
    import { reportStore } from '../report.store';

    defineProps<{
        item: IncidentReport,
    }>()

    const $report = reportStore()

</script>

<style scoped>
th {
    white-space: nowrap;
}
</style>