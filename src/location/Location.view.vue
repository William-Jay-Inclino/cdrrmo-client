<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Location </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <div class="row w-100 justify-content-between align-items-center">
                            <div class="col-6">
                            <Search />
                            </div>
                            <div class="col-6 text-right">
                            <router-link :to="{name: routeNames.locationForm}">
                                <button class="btn btn-primary">Add Location</button>
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
                                                <th>Location</th>
                                                <th width="10%" class="text-center">
                                                    <i class="fas fa-fw fa-cogs"></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item of $module.locations">
                                                <td> {{ item.name }} </td>
                                                <td class="text-center">
                                                    <button @click="onClickUpdateIcon(item)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                                    </button>
                                                    <button @click="onDelete(item)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-trash text-danger"></i>
                                                    </button>
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

import { useToast } from "vue-toastification";
import { ILocation, locationStore } from '.'
import { routeNames } from '../common/constants'
import { useRouter } from 'vue-router';
import Search from './components/Search.vue'
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'

import Swal from 'sweetalert2'

const toast = useToast();
const $module = locationStore()
const router = useRouter()

const onDelete = async(item: ILocation) => {

    Swal.fire({
        title: "Are you sure?",
        text: item.name + " will be removed!",
        position: "top",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e74a3b",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
        }).then( async(result) => {
        if (result.isConfirmed) {
            const removed = await $module.onDelete(item.id)

            if(removed){
                toast.success(item.name + ' successfully removed!')

            }else{
                toast.error('Failed to remove ' + item.name)
            }
        }
    });

}

const onClickUpdateIcon = (data: ILocation) => {
    router.push({name: routeNames.locationForm, query: {id: data.id}})
}

</script>
