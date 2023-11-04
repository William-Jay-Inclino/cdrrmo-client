<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Emergencies</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Emergencies</h6>
                        <button class="btn btn-primary" type="submit">Add Emergency</button>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nature of Emergency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="emergency of $emergency.emergencies">
                                        <td> {{ emergency.nature }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>


<script setup lang="ts">
    import { emergencyStore, emergencyService } from '@/modules/emergency'

    const $emergency = emergencyStore()
    const emergencies = emergencyService.getAllEmergencies()
    $emergency.setEmergencies(emergencies)



</script>
