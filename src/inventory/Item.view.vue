
<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Inventory Item </h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-10">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center">
                        <div class="row w-100 justify-content-between align-items-center">
                            <div class="col-6">
                            <Search />
                            </div>
                            <div class="col-6 text-right">
                            <router-link :to="{name: routeNames.inventoryItemForm}">
                                <button class="btn btn-primary">Add Item</button>
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
                                                <th>Serial Number</th>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th colspan="3" class="text-center">Quantity</th>
                                                <th>Total Cost</th>
                                                <th>Date Acquired</th>
                                                <th class="text-center">
                                                    <i class="fas fa-fw fa-cogs"></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item of $module.items">
                                                <td> {{ item.name }} </td>
                                                <td> {{ item.serial_number }} </td>
                                                <td> {{ item.Category.name }} </td>
                                                <td> {{ item.description }} </td>
                                                <td>
                                                    <button @click="onClickStockInOutModal(item, MovementTypeEnum.StockOut)" data-toggle="modal" data-target="#stockInOutModal" class="btn btn-light btn-sm float-right">
                                                        <i class="fas fa-fw fa-minus text-danger"></i>
                                                    </button>
                                                </td>
                                                <td class="text-center"> {{ item.quantity }} </td>
                                                <td>
                                                    <button @click="onClickStockInOutModal(item, MovementTypeEnum.StockIn)" data-toggle="modal" data-target="#stockInOutModal" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-plus text-success"></i>
                                                    </button>
                                                </td>
                                                <td> {{ item.cost }} </td>
                                                <td> {{ formatDate(item.date_acquired) }} </td>
                                                <td class="text-center">
                                                    <button @click="onClickItemHistory(item)" class="btn btn-light btn-sm">
                                                        <i class="fas fa-fw fa-calendar-alt text-primary"></i>
                                                    </button>
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

        <stock-in-out-modal :item="selectedItem" :mode="movementType"/>

  </div>

</template>


<script setup lang="ts">

import { useToast } from "vue-toastification";
import { IItem, MovementTypeEnum, itemStore } from '.'
import { routeNames } from '../common'
import { useRouter } from 'vue-router';
import moment from "moment";
import StockInOutModal from "./components/StockInOutModal.vue";
import Search from './components/Search.vue'
import TablePagination from './components/TablePagination.vue'
import TablePerPage from './components/TableSelectPerPage.vue'

import Swal from 'sweetalert2'
import { ref } from "vue";

const toast = useToast();
const $module = itemStore()
const router = useRouter()

const selectedItem = ref<IItem | null>(null)
const movementType = ref<MovementTypeEnum>(MovementTypeEnum.StockIn)

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

const onClickStockInOutModal = (item: IItem, mode: MovementTypeEnum) => {
    console.log('onClickStockInOutModal()', item)
    selectedItem.value = item
    movementType.value = mode
}

const onClickItemHistory = (item: IItem) => {
    router.push({name: routeNames.inventoryItemStockMovement, query: {id: item.id}})
}

const formatDate = (date_acquired: string) => moment(date_acquired).format('YYYY-MM-DD')

</script>
