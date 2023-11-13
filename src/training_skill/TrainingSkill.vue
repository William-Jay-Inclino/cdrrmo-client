<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Training Skills Module</h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">List of Training Skills</h6>
                        <router-link :to="{name: routeNames.trainingSkillsForm}">
                            <button class="btn btn-primary" type="submit">Add Training Skill</button>
                        </router-link>
                    </div>

                    <!-- Card Body -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th class="text-center">
                                            <i class="fas fa-fw fa-cogs"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item of $module.trainingSkills">
                                        <td> {{ item.name }} </td>
                                        <td class="text-center">
                                            <button @click="onClickUpdateIcon(item)" class="btn btn-light btn-sm">
                                                <i class="fas fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button data-toggle="modal" :data-target="`#${deleteModalId}`" @click="onShowDeleteModal(item.id)" class="btn btn-light btn-sm">
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

        <DeleteModal :id="deleteModalId" @on-delete="onDelete" @on-cancel="onCancelDelete"/>

  </div>

</template>


<script setup lang="ts">

import { useToast } from "vue-toastification";
import { ITrainingSkill, trainingSkillStore } from '.'
import { routeNames } from '../common/constants'
import DeleteModal from "../common/components/DeleteModal.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const toast = useToast();
const $module = trainingSkillStore()
const moduleLabel = 'Training skill'
const deleteModalId = ref('deleteModalId')
const idToDelete = ref('')
const router = useRouter()

const onShowDeleteModal = (id: string) => {
    console.log('onShowDeleteModal()')
    idToDelete.value = id
}

const onDelete = async() => {

    if(idToDelete.value.trim() === '') return 

    const removed = await $module.onDelete(idToDelete.value)

    if(removed){
        toast.success(moduleLabel + ' successfully deleted!')
    }else{
        toast.error('Failed to remove ' + moduleLabel)
    }

    idToDelete.value = ''
}

const onCancelDelete = () => {
    idToDelete.value = ''
}

const onClickUpdateIcon = (data: ITrainingSkill) => {
    router.push({name: routeNames.trainingSkillsForm, query: {id: data.id}})
}

</script>
