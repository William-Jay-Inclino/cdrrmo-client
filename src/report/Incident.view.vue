<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Incident Report </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">

                <Filter />

            </div>
        </div>

        <div class="row">
            <div class="col-10">
                <div class="float-right">
                    <button @click="onClickViewReport()" class="btn btn-primary" :disabled="$report.isDisabledReportBtn">View Report</button>
                    
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-5" v-show="showSummary">
            <div class="col-8">

                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        Filter Nature of Incident
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <button @click="onClickSelectAll()" type="button" class="btn btn-primary btn-sm">Select all</button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <v-select :options="emergencies" multiple v-model="filteredEmergencies"></v-select>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>


        <div class="row justify-content-center" v-show="showSummary">
            <div class="col-8">
                <Summary :items="filteredItems" :emergencies="filteredEmergencies" />
            </div>
        </div>

        <div class="row mt-5 mb-5 justify-content-center" v-show="!showDetails && showSummary">
            <div class="col-auto">
                <button @click="onClickShowDetails()" class="btn btn-primary">Show Details</button>
            </div>
        </div>

        <div class="row mt-5" v-show="showDetails">
            <div class="col">
                <button @click="onClickExportToCSV()" class="btn btn-success float-right" :disabled="$report.isDisabledReportBtn">Export Data (CSV)</button>
            </div>
        </div>

        <div class="row justify-content-center mt-3" v-show="showDetails">
            <div class="col">
                
                <Table v-for="item in filteredItems" :item="item"/>

            </div>

        </div>



  </div>

</template>


<script setup lang="ts">

    import { computed, onMounted, ref } from 'vue';
    import Filter from './components/Filter.vue';
    import Table from './components/Table.vue';
    import Summary from './components/Summary.vue'

    import { reportStore } from './report.store';
    import { IncidentReport } from './entities';
    import Papa from 'papaparse';
    import { IEmergency, emergencyService } from '../emergency';

    const $report = reportStore()

    const items = ref<IncidentReport[]>([])
    const showSummary = ref(false)
    const showDetails = ref(false)

    const emergencies = ref<IEmergency[]>([])
    const filteredEmergencies = ref<IEmergency[]>([])

    onMounted( async() => {
        const _emergencies = (await emergencyService.findAll()).map(i => {
            i.label = i.name
            return i
        })

        emergencies.value = _emergencies
        filteredEmergencies.value = _emergencies

    })

    const filteredItems = computed( (): IncidentReport[] => {

        // return items.value
        
        const newItems: IncidentReport[] = items.value

        const emergencyIds = filteredEmergencies.value.map(i => i.id)

        for(let item of newItems){
            item.data.filter(i => emergencyIds.includes(i.emergency_id))

        }

        return newItems


    })

    const onClickShowDetails = () => {
        showDetails.value = true
    }

    const onClickViewReport = async() => {
        console.log('onClickViewReport()')
        const data = {
            startDate: $report.startDate,
            endDate: $report.endDate,
        }
        items.value = await $report.getDispatchesByDate(data)

        showSummary.value = true
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

    const onClickSelectAll = () => {
        filteredEmergencies.value = [...emergencies.value]
    }

    const downloadFile = (csv: string) => {
        // Create a Blob from the CSV data
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'incident_report_details.csv';
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
            "Nature of Incident",
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
