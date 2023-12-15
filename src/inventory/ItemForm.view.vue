<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> Item </h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-4">

                <form>

                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                    <h6 class="m-0 font-weight-bold"> {{ action + ' ' + moduleLabel }} </h6>
                                </div>
                    
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input v-model="$module.formData.name" type="text" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.name"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Category</label>
                                        <v-select :options="categories" v-model="$module.formCategory"></v-select>
                                        <small class="form-text text-danger" v-if="$module.formErrors.description"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea v-model="$module.formData.description" class="form-control" rows="3"></textarea>
                                        <small class="form-text text-danger" v-if="$module.formErrors.description"> {{ errorMsg }} </small>
                                    </div>
                                    <div v-if="!$module.formIsEditMode" class="form-group">
                                        <label>Initial Quantity</label>
                                        <input v-model="$module.formData.quantity" type="number" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.quantity"> {{ errorMsg }} </small>
                                        <small class="form-text text-danger" v-else-if="$module.formErrors.invalidQuantity"> Invalid Quantity </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Cost</label>
                                        <input v-model="$module.formData.cost" type="number" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.cost"> {{ errorMsg }} </small>
                                        <small class="form-text text-danger" v-else-if="$module.formErrors.invalidCost"> Invalid Cost </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Date Acquired</label>
                                        <input v-model="$module.formData.date_acquired" type="date" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.date_acquired"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Serial Number</label>
                                        <input v-model="$module.formData.serial_number" type="text" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.serial_number"> {{ errorMsg }} </small>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button @click="onCancel" type="button" class="btn btn-dark">Cancel</button>
                                </div>
                                <div>
                                    <button v-if="!$module.formIsEditMode" @click="onSubmit(1)" type="button" class="btn btn-success">Submit and Add Again</button>
                                    <button @click="onSubmit(2)" type="button" class="btn btn-primary ml-2">Submit and Finish</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </div>



  </div>

</template>


<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Breadcrumbs from '../common/components/Breadcrumbs.vue'
import { useToast } from "vue-toastification";
import { IItemCategory, itemCategoryService, itemStore } from '.'
import { routeNames } from '../common';

const toast = useToast();
const $module = itemStore()
const router = useRouter()

const moduleLabel = 'Item'
const errorMsg = ref('This field is required')

const breadcrumbItems = ref([
    {
        text: 'Item List',
        route: routeNames.inventoryItem,
        isActive: false,
    },
    {
        text: 'Item Form',
        route: routeNames.inventoryItemForm,
        isActive: true,
    }
])

const _categories = ref<IItemCategory[]>([])

onMounted( async() => {
    const query = router.currentRoute.value.query

    if(query.id){
        // intialize update form / populate form 
        await $module.initUpdateFormData(query.id as string)
    }

    _categories.value = await itemCategoryService.findAll()

})

const categories = computed( () => {
    return _categories.value.map(i => {
        i.label = i.name
        return i
    })
})

const action = computed( () => $module.formData.id === '' ? 'Add' : 'Update')

const onSubmit = async(action: number) => {
    console.log('onSubmit()')

    const submitted = await $module.onSubmit({data: {...$module.formData}})

    if(!submitted){
        toast.error('Failed to save ' + moduleLabel)
        return 
    }

    $module.resetFormData()
    toast.success(moduleLabel + ' successfully saved!')

    if(action === 2){
        router.push({name: routeNames.inventoryItem})
    }


}


const onCancel = () => {
    $module.resetFormData()
    router.push({name: routeNames.inventoryItem})
}

</script>
