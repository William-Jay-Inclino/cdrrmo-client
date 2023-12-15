
<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Inventory Item </h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>


        <div class="row justify-content-center">
            <div class="col-10">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Item History</h6>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body" v-if="item">
                        <div class="row">
                            <div class="col">
                                <h6> Serial Number: <b>{{ item.serial_number }}</b> </h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <h6> Item: <b>{{ item.name }}</b> </h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <h6> Current Quantity: <b>{{ item.quantity }}</b> </h6>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Date</th>
                                        <th>Remarks</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="i in item.StockMovement">
                                        <td :class="{[`text-${ CONST_ItemMovementType[i.movement_type].color}`]: true}"> {{ CONST_ItemMovementType[i.movement_type].text }} </td>
                                        <td> {{ i.quantity }} </td>
                                        <td> {{ moment(i.movement_date).format('YYYY-MM-DD') }} </td>
                                        <td> {{ i.remarks }} </td>
                                        <td> {{ i.user.last_name + ', ' + i.user.first_name }} </td>
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
    import { onMounted, ref } from 'vue';
    import { routeNames } from '../common';
    import Breadcrumbs from '../common/components/Breadcrumbs.vue'
    import { useRouter } from 'vue-router';
    import { IItem, itemService } from '.';
    import { CONST_ItemMovementType } from '../common'
    import moment from 'moment';
    
    const router = useRouter()

    const breadcrumbItems = ref([
        {
            text: 'Item List',
            route: routeNames.inventoryItem,
            isActive: false,
        },
        {
            text: 'Item History',
            route: routeNames.inventoryItemStockMovement,
            isActive: true,
        }
    ])
    
    const item = ref<IItem | null>(null)

    onMounted( async() => {
        const query = router.currentRoute.value.query

        if(query.id){
            item.value = await itemService.findOne(query.id as string)
        }

    })


</script>