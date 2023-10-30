<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Personnel Module</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-11">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Personnels</h6>
                        <button class="btn btn-primary"> Add Personnel </button>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Age</th>
                                        <th>Contact #</th>
                                        <th>Status</th>
                                        <th>Dispatch Status</th>
                                        <th>Userlevel</th>
                                        <th>Type</th>
                                        <th>Subtype</th>
                                        <th>Sub-Subtype</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in $userStore.users">
                                        <td> {{ user.first_name }} </td>
                                        <td> {{ user.genderText }} </td>
                                        <td> {{ user.address }} </td>
                                        <td> {{ user.age }} </td>
                                        <td> {{ user.contact_no }} </td>
                                        <td> {{ user.statustext }} </td>
                                        <td> {{ user.dispatchStatusText }} </td>
                                        <td> {{ user.userLevelText }} </td>
                                        <td> {{ user.typeText }} </td>
                                        <td> {{ user.subTypeText }} </td>
                                        <td> {{ user.subSubTypeText }} </td>
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
    
    import { userStore } from '@/modules/user'

    const $userStore = userStore()
    const users = $userStore.getUsers()
    $userStore.setUsers(users)



</script>

../modules/user