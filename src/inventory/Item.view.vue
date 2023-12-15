
<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Item </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-10">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Item</h6>
                        <router-link :to="{name: routeNames.inventoryItemForm}">
                            <button class="btn btn-primary" type="button">Add Item</button>
                        </router-link>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Serial Number</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Cost</th>
                                        <th>Date Acquired</th>
                                        <th class="text-center">
                                            <i class="fas fa-fw fa-cogs"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item of $module.items">
                                        <td> {{ item.name }} </td>
                                        <td> {{ item.Category.name }} </td>
                                        <td> {{ item.serial_number }} </td>
                                        <td> {{ item.description }} </td>
                                        <td> {{ item.quantity }} </td>
                                        <td> {{ item.cost }} </td>
                                        <td> {{ formatDate(item.date_acquired) }} </td>
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
            </div>
        </div>


  </div>

</template>


<script setup lang="ts">

import { useToast } from "vue-toastification";
import { IItem, itemStore } from '.'
import { routeNames } from '../common'
import { useRouter } from 'vue-router';
import moment from "moment";

import Swal from 'sweetalert2'

const toast = useToast();
const $module = itemStore()
const router = useRouter()

const onDelete = async(item: IItem) => {

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

const onClickUpdateIcon = (data: IItem) => {
    router.push({name: routeNames.inventoryItemForm, query: {id: data.id}})
}

const formatDate = (date_acquired: string) => moment(date_acquired).format('YYYY-MM-DD')

</script>
