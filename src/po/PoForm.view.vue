<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">PO (People's Organization) </h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-4">

                <form @submit.prevent="onSubmit">

                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary"> {{ action + ' ' + moduleLabel }} </h6>
                                </div>
                    
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input v-model="$module.formData.name" type="text" class="form-control">
                                        <small class="form-text text-danger" v-if="$module.formErrors.name"> {{ errorMsg }} </small>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea v-model="$module.formData.description" class="form-control" rows="3"></textarea>
                                        <small class="form-text text-danger" v-if="$module.formErrors.description"> {{ errorMsg }} </small>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col">
                            <div class="d-flex justify-content-between">
                                <button @click="onCancel" type="button" class="btn btn-dark">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit</button>
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
import { poStore } from '.'
import { routeNames } from '../common';

const toast = useToast();
const $module = poStore()
const router = useRouter()

const moduleLabel = 'Po'
const errorMsg = ref('This field is required')

const breadcrumbItems = ref([
    {
        text: 'PO List',
        route: routeNames.pos,
        isActive: false,
    },
    {
        text: 'PO Form',
        route: routeNames.posForm,
        isActive: true,
    }
])

onMounted( async() => {
    const query = router.currentRoute.value.query

    if(query.id){
        // intialize update form / populate form 
        await $module.initUpdateFormData(query.id as string)
    }
})

const action = computed( () => $module.formData.id === '' ? 'Add' : 'Update')

const onSubmit = async() => {
    console.log('onSubmit()')
    const submitted = await $module.onSubmit({data: {...$module.formData}})

    if(!submitted){
        toast.error('Failed to save ' + moduleLabel)
        return 
    }

    $module.resetFormData()
    toast.success(moduleLabel + ' successfully saved!')
    router.push({name: routeNames.pos})

}


const onCancel = () => {
    $module.resetFormData()
    router.push({name: routeNames.pos})
}

</script>
