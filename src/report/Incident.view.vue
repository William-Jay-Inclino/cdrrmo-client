<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Incident Report </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        Select Start and End Date or Filter by: 
                        <div class="btn-group btn-group-toggle ml-3" data-toggle="buttons">
                            <label class="btn btn-outline-primary active">
                                <input @click="onChangeFilter(IncidentReportEnum.CUSTOM)" type="radio" name="options" id="option1" autocomplete="off"> Custom
                            </label>
                            <label class="btn btn-outline-primary">
                                <input @click="onChangeFilter(IncidentReportEnum.LAST_WEEK)" type="radio" name="options" id="option1" autocomplete="off"> Last week
                            </label>
                            <label class="btn btn-outline-primary">
                                <input @click="onChangeFilter(IncidentReportEnum.THIS_WEEK)" type="radio" name="options" id="option2" autocomplete="off"> This week
                            </label>
                            <label class="btn btn-outline-primary">
                                <input @click="onChangeFilter(IncidentReportEnum.LAST_MONTH)" type="radio" name="options" id="option3" autocomplete="off"> Last Month
                            </label>
                            <label class="btn btn-outline-primary">
                                <input @click="onChangeFilter(IncidentReportEnum.THIS_MONTH)" type="radio" name="options" id="option3" autocomplete="off"> This Month
                            </label>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                            <label>Start Date</label>
                            <input v-model="startDate" type="date" class="form-control" :disabled="filter !== IncidentReportEnum.CUSTOM">
                        </div>
                        <div class="form-group">
                            <label>End Date</label>
                            <input v-model="endDate" type="date" class="form-control" :disabled="filter !== IncidentReportEnum.CUSTOM">
                        </div>
                    </div>

                    <div class="card-footer">
                        <p class="text-muted"><i>Please note that the default start day of the week is set to Sunday</i></p>
                    </div>

                </div>

                <button @click=generateReport() class="btn btn-primary float-right">Generate Report</button>

            </div>
        </div>



  </div>

</template>


<script setup lang="ts">

    import { computed, ref } from 'vue';
    import { reportService } from '.';
    import { IncidentReportEnum } from './entities/enums.entity';
    import moment from 'moment';

    const startDate = ref('')
    const endDate = ref('')
    const filter = ref(IncidentReportEnum.CUSTOM)

    const today = ref(new Date());

    const generateReport = async() => {
        console.log('startDate', startDate.value)
        console.log('endDate', endDate.value)
        const res = await reportService.getDispatchesByDate({startDate: startDate.value, endDate: endDate.value})
        console.log('res', res)
    }

    const onChangeFilter = (_filter: IncidentReportEnum) => {
        console.log('onChangeFilter()', _filter)
        filter.value = _filter

        if(_filter === IncidentReportEnum.LAST_WEEK){
            startDate.value = lastWeekStartDate.value
            endDate.value = lastWeekEndDate.value
            return 
        }

        if(_filter === IncidentReportEnum.THIS_WEEK){
            startDate.value = thisWeekStartDate.value
            endDate.value = thisWeekEndDate.value
            return 
        }

        if(_filter === IncidentReportEnum.LAST_MONTH){
            startDate.value = lastMonthStartDate.value
            endDate.value = lastMonthEndDate.value
            return 
        }

        if(_filter === IncidentReportEnum.THIS_MONTH){
            startDate.value = thisMonthStartDate.value
            endDate.value = thisMonthEndDate.value
            return 
        }

    }

    const lastWeekStartDate = computed(() => {
        return moment(today.value).subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    });

    const lastWeekEndDate = computed(() => {
        return moment(today.value).subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
    });

    const thisWeekStartDate = computed(() => {
        return moment(today.value).startOf('week').format('YYYY-MM-DD');
    });

    const thisWeekEndDate = computed(() => {
        return moment(today.value).endOf('week').format('YYYY-MM-DD');
    });

    const lastMonthStartDate = computed(() => {
        return moment(today.value).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    });

    const lastMonthEndDate = computed(() => {
        return moment(today.value).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
    });

    const thisMonthStartDate = computed(() => {
        return moment(today.value).startOf('month').format('YYYY-MM-DD');
    });

    const thisMonthEndDate = computed(() => {
        return moment(today.value).endOf('month').format('YYYY-MM-DD');
    });





</script>
