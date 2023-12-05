<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Personnel</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-11">
                <div class="card shadow mb-4">

                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <div class="row w-100 justify-content-between align-items-center">
                            <div class="col-6">
                            <Search />
                            </div>
                            <div class="col-6 text-right">
                            <router-link :to="{name: routeNames.userForm}">
                                <button class="btn btn-primary">Add Personnel</button>
                            </router-link>
                            </div>
                        </div>
                    </div>


                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="row mb-3">
                            <TablePerPage />
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>ID</th>
                                                <th>Address</th>
                                                <th>Age</th>
                                                <th>Contact #</th>
                                                <th class="text-center">Gender</th>
                                                <th>Userlevel</th>
                                                <th>Type</th>
                                                <th>Subtype</th>
                                                <th class="text-center">Status</th>
                                                <th class="text-center">
                                                    <i class="fas fa-fw fa-cogs"></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="user in $user.users">
                                                <td> {{ user.last_name + ', ' + user.first_name }} </td>
                                                <td> {{ user.user_id }} </td>
                                                <td> {{ user.address }} </td>
                                                <td> {{ user.age }} </td>
                                                <td> +63{{ user.contact_no }} </td>
                                                <td class="text-center">
                                                    <i class="fas fa-fw" :class="{[`${user.genderObj?.icon}`]: true}" :style="{color: user.genderObj?.color}">
        
                                                    </i>
                                                </td>
                                                <td> {{ user.userLevelObj?.text }} </td>
                                                <td> {{ user.userTypeObj?.text }} </td>
        
                                                <td v-if="user.Na"> {{ user.Na.name }} </td>
                                                <td v-else> {{ user.userSubTypeObj?.text }} </td>
        
                                                <td class="text-center"> 
                                                    <span :class="{[`badge-${user.statusObj?.color}`]: true}" class="badge badge-pill"> 
                                                        {{ user.statusObj?.text }} 
                                                    </span> 
                                                </td>
                                                <td class="d-flex justify-content-center">
                                                    <button @click="onClickUpdate(user)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                                    </button>
                                                    <!-- <button @click="onClickResetPw(user)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-lock text-warning"></i>
                                                    </button> -->
                                                </td>



                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <TablePagination class="float-right"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>


<script setup lang="ts">
    
import { IUser, userStore } from '.'
import { routeNames } from '../common/constants'
import { useRouter } from 'vue-router';
import Search from './components/Search.vue'
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'


const $user = userStore()
const router = useRouter()

$user.init()

console.log('$userStore', $user)

const onClickUpdate = (data: IUser) => {
    console.log('onClickUpdate()', data)
    router.push({name: routeNames.userForm, query: {id: data.id}})
}


</script>
