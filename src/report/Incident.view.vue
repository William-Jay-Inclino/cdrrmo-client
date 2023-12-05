<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Incident Report </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">

                <Filter />
                <div class="float-right">
                    <button @click="onClickViewReport()" class="btn btn-primary" :disabled="$report.isDisabledReportBtn">View Report</button>
                    <button @click="onClickExportToCSV()" class="btn btn-success ml-2" :disabled="$report.isDisabledReportBtn">Export Data (CSV)</button>
                </div>

            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col">

                <Table v-for="item in items" :item="item"/>

            </div>

        </div>



  </div>

</template>


<script setup lang="ts">

    import { ref } from 'vue';
    import Filter from './components/Filter.vue';
    import Table from './components/Table.vue';

    import { reportStore } from './report.store';
    import { IncidentReport } from './entities';
    import Papa from 'papaparse';

    const $report = reportStore()

    const items = ref<IncidentReport[]>([])

    const onClickViewReport = async() => {
        console.log('onClickViewReport()')
        const data = {
            startDate: $report.startDate,
            endDate: $report.endDate,
        }
        items.value = await $report.getDispatchesByDate(data)
        console.log('items.value', items.value)
    }

    const onClickExportToCSV = async() => {
        console.log('onClickExportToCSV()')
        const data = {
            startDate: $report.startDate,
            endDate: $report.endDate,
        }
        const itemsToExport = await $report.getDispatchesByDate(data)
        console.log('itemsToExport', itemsToExport)

        // Convert data to CSV format
        const csvData = convertToCSV(itemsToExport);
        const csvString = Papa.unparse(csvData);

        console.log(csvString);

        downloadFile(csvString)
    }


    const downloadFile = (csv: string) => {
        // Create a Blob from the CSV data
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'incident_report.csv';
        link.style.display = 'none';

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }

    // Function to convert data to CSV format
    const convertToCSV = (data: IncidentReport[]) => {

        // Create headers for CSV
        const headers = [
            "Date",
            "Time of Call",
            "Description",
            "Emergency Type",
            "Location",
            "Team Dispatched",
            "Dispatcher",
            "Caller",
            "Involved Individuals",
            "Proceeding to scene",
            "Arrived at scene",
            "Proceeding to hospital",
            "Arrived at hospital",
            "Proceeding to Base",
            "Arrived at Base",
            "Status",
            "Remarks",
        ];

        // Create rows for CSV
        const rows = data.flatMap((day) => {
            if (day.data.length === 0) {
                // No record for the day
                return [[$report.formatDate(day.date)]];
            }

            return day.data.map((entry) => [
                $report.formatDate(day.date),
                $report.formatTime(entry.time_of_call),
                entry.description,
                entry.emergency.name,
                entry.location,
                entry.team.name,
                entry.dispatcher.last_name + ', ' + entry.dispatcher.first_name,
                entry.caller_name + ` (+63${entry.caller_number})`,
                entry.num_people_involved + ' individuals',
                $report.formatDispatchDate(entry.time_proceeding_scene),
                $report.formatDispatchDate(entry.time_arrival_scene),
                $report.formatDispatchDate(entry.time_proceeding_hospital),
                $report.formatDispatchDate(entry.time_arrival_hospital),
                $report.formatDispatchDate(entry.time_proceeding_base),
                $report.formatDispatchDate(entry.time_arrival_base),
                $report.getStatus(entry),
                entry.remarks,
            ]);
        });

        // Add headers as the first row
        rows.unshift(headers);

        return rows;
    };



</script>
