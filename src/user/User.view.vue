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
                        <router-link :to="{name: routeNames.userForm}">
                            <button class="btn btn-primary"> Add Personnel </button>
                        </router-link>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Age</th>
                                        <th>Contact #</th>
                                        <th>Blood Type</th>
                                        <th class="text-center">Gender</th>
                                        <th>Userlevel</th>
                                        <th>Type</th>
                                        <th>Subtype</th>
                                        <th>Sub-Subtype</th>
                                        <th class="text-center">Status</th>
                                        <!-- <th class="text-center">Dispatch Status</th> -->
                                        <th class="text-center">
                                            <i class="fas fa-fw fa-cogs"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in $userStore.users">
                                        <td> {{ user.first_name + ' ' + user.last_name }} </td>
                                        <td> {{ user.address }} </td>
                                        <td> {{ user.age }} </td>
                                        <td> {{ user.contact_no }} </td>
                                        <td> {{ user.blood_type }} </td>
                                        <td class="text-center">
                                            <i class="fas fa-fw" :class="{[`${user.genderObj?.icon}`]: true}" :style="{color: user.genderObj?.color}">

                                            </i>
                                        </td>
                                        <td> {{ user.userLevelObj?.text }} </td>
                                        <td> {{ user.userTypeObj?.text }} </td>

                                        <td v-if="user.Na"> {{ user.Na.name }} </td>
                                        <td v-else> {{ user.userSubTypeObj?.text }} </td>

                                        <td v-if="user.Bart"> {{ user.Bart.name }} </td>
                                        <td v-else-if="user.Cso"> {{ user.Cso.name }} </td>
                                        <td v-else-if="user.Po"> {{ user.Po.name }} </td>
                                        <td v-else></td>
                                        <td class="text-center"> 
                                            <span :class="{[`text-bg-${user.statusObj?.color}`]: true}" class="badge rounded-pill text-white"> 
                                                {{ user.statusObj?.text }} 
                                            </span> 
                                        </td>
                                        <!-- <td class="text-center"> 
                                            <span :class="{[`text-bg-${user.dispatchStatusObj?.color}`]: true}" class="badge rounded-pill text-white"> 
                                                {{ user.dispatchStatusObj?.text }} 
                                            </span> 
                                        </td> -->
                                        <td class="text-center">
                                            <div class="dropdown no-arrow">
                                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink">
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-fw fa-pencil-alt text-primary"></i>
                                                        <span class="ml-2">Update</span>
                                                    </a>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#">
                                                        <i class="fas fa-fw fa-eye text-info"></i>
                                                        <span class="ml-2">View Skills</span>
                                                    </a>
                                                    <div class="dropdown-divider"></div>
                                                    <!-- <a class="dropdown-item" href="#">
                                                        <i class="fas fa-fw fa-archive text-danger"></i>
                                                        <span class="ml-2">Archive</span>
                                                    </a> -->
                                                </div>
                                            </div>
                                        </td>
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
    
    import { userStore } from '.'
    import { routeNames } from '../common/constants'

    const $userStore = userStore()

    console.log('$userStore', $userStore)

</script>
