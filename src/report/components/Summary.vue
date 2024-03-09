<template>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center bg-dark text-white justify-content-between">
            <h6 class="m-0 font-weight-bold">Summary</h6>
            <button @click="onClickExportToCSV()" type="button" class="btn btn-success"> Export Data(CSV) </button>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <th> Nature of Incident </th>
                        <th class="text-center"> Total Incident </th>
                        <th class="text-center"> Individuals Involved </th>
                    </thead>
                    <tbody>
                        <tr v-for="item in summary">
                            <td> {{ item.name }} </td>
                            <td class="text-center"> {{ item.totalIncident }} </td>
                            <td class="text-center"> {{ item.totalIndividuals }} </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold"> Total </td>
                            <td class="font-weight-bold text-center"> {{ overallTotalIncidents }} </td>
                            <td class="font-weight-bold text-center"> {{ overallTotalIndividuals }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
    import { IncidentReport } from '../entities';
    import { IEmergency } from '../../emergency';
    import { computed } from 'vue';
    import Papa from 'papaparse';

    const props = defineProps<{
        items: IncidentReport[],
        emergencies: IEmergency[],
    }>()

    interface ISummary{
        name: string,
        totalIncident: number,
        totalIndividuals: number,
    }

    const summary = computed( () => {

        const data: ISummary[] = []

        for(let item of props.emergencies){
            const summary = {} as ISummary
            summary.name = item.name
            summary.totalIncident = getTotalIncidents(item)
            summary.totalIndividuals = getTotalIndividuals(item)
            data.push(summary)
        }

        return data

    })

    const overallTotalIncidents = computed(() => {
    return props.emergencies.reduce((acc, emergency) => acc + getTotalIncidents(emergency), 0);
    });

    const overallTotalIndividuals = computed(() => {
    return props.emergencies.reduce((acc, emergency) => acc + getTotalIndividuals(emergency), 0);
    });


    const getTotalIncidents = (emergency: IEmergency) => {

        let total = 0

        for(let item of props.items){
            const count = item.data.filter(i => i.emergency_id === emergency.id).length
            total += count
        }

        return total

    }

    const getTotalIndividuals = (emergency: IEmergency) => {

        console.log('getTotalIndividuals')

        let total = 0

        for(let item of props.items){
            const i = item.data.filter(i => i.emergency_id === emergency.id).reduce( (acc, curr) => acc + curr.num_people_involved, 0)
            total += i
        }

        return total

    }

    const onClickExportToCSV = async() => {

        // Convert data to CSV format
        const csvData = convertToCSV(summary.value);
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
        link.download = 'incident_report_summary.csv';
        link.style.display = 'none';

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }

    // Function to convert data to CSV format
    const convertToCSV = (data: ISummary[]) => {

        // Create headers for CSV
        const headers = [
            "Nature of Incident",
            "Total Incident",
            "Individuals Involved"
        ];

        const footer = [
            "Total",
            overallTotalIncidents.value,
            overallTotalIndividuals.value,
        ]

        // Create rows for CSV
        const rows = data.flatMap((i) => {
            
            return [ [i.name, i.totalIncident, i.totalIndividuals] ]

        });

        console.log('rows', rows)

        // Add headers as the first row
        // @ts-ignore
        rows.unshift(headers);
        rows.push(footer)

        return rows;
    };


</script>
