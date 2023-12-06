<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center">
            Select Start and End Date or Filter by: 
            <div class="btn-group btn-group-toggle ml-3" data-toggle="buttons">
                <label class="btn btn-outline-primary active">
                    <input @click="$report.onChangeFilter(IncidentReportEnum.CUSTOM)" type="radio" name="options" id="option1" autocomplete="off"> Custom
                </label>
                <label class="btn btn-outline-primary">
                    <input @click="$report.onChangeFilter(IncidentReportEnum.LAST_WEEK)" type="radio" name="options" id="option1" autocomplete="off"> Last week
                </label>
                <label class="btn btn-outline-primary">
                    <input @click="$report.onChangeFilter(IncidentReportEnum.THIS_WEEK)" type="radio" name="options" id="option2" autocomplete="off"> This week
                </label>
                <label class="btn btn-outline-primary">
                    <input @click="$report.onChangeFilter(IncidentReportEnum.LAST_MONTH)" type="radio" name="options" id="option3" autocomplete="off"> Last Month
                </label>
                <label class="btn btn-outline-primary">
                    <input @click="$report.onChangeFilter(IncidentReportEnum.THIS_MONTH)" type="radio" name="options" id="option3" autocomplete="off"> This Month
                </label>
            </div>
        </div>

        <div class="card-body">
            <div class="form-group">
                <label>Start Date</label>
                <input v-model="$report.startDate" type="date" class="form-control" :disabled="$report.isDisabledDates">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input v-model="$report.endDate" type="date" class="form-control" :disabled="$report.isDisabledDates">
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">

    import { reportStore } from '../report.store';
    import { IncidentReportEnum } from '../entities';

    const $report = reportStore()


</script>
