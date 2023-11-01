<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Personnel Module</h1>
        </div>

        <div class="row">
            <div class="col">
                <Breadcrumbs :items="breadcrumbItems"/>
            </div>
        </div>

        <div class="row justify-content-center" id="dispatchForm">
            <div class="col-5">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between text-bg-primary">
                        <h6 class="m-0 font-weight-bold">Add Personnel</h6>
                    </div>

                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">First Name</label>
                                    <input type="text" class="form-control">
                            </div>
                            <!-- <div class="form-group">
                                <label>Nature of Emergency</label>
                                <select class="form-control" v-model="$dispatch.formData.emergency_id">
                                    <option v-for="emergency in $dispatch.emergencies" :value="emergency.emergency_id" :key="emergency.emergency_id">
                                        {{ emergency.nature }}
                                    </option>
                                </select>
                            </div> -->
                            


                            <div class="justify-content-between">
                                <button @click="onCancel" class="btn btn-dark">Cancel</button>
                                <button type="submit" class="btn btn-primary float-end">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
  </div>

</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import Breadcrumbs from '@/components/Breadcrumbs.vue'
    import { routeNames } from '@/helpers/constants';
    import { useRouter } from 'vue-router';
    const router = useRouter()


    const breadcrumbItems = ref([
        {
            text: 'Personnel List',
            route: routeNames.users,
            isActive: false,
        },
        {
            text: 'Personnel Form',
            route: routeNames.userForm,
            isActive: true,
        }
    ])


    const onCancel = () => {
        router.push({name: routeNames.users})
    }



</script>


