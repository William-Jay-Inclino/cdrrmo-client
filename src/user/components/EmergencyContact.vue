<template>
    <div>
        <div class="form-group">
            <div class="d-flex justify-content-between align-items-center">
                <label class="mr-2">Emergency Contact</label>
                <button @click="addEmergencyContact()" class="btn btn-outline-info btn-sm">
                    <i class="fas fa-fw fa-user-plus"></i>
                    <span class="ml-1">Add</span>
                </button>
            </div>

            <div class="responsive mt-3" v-show="$user.formData.emergencyContacts && $user.formData.emergencyContacts.length > 0">
                <table class="table">
                    <thead>
                        <th> Name </th>
                        <th> Relationship </th>
                        <th> Mobile </th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="i in $user.formData.emergencyContacts">
                            <td>
                                <input type="text" class="form-control" v-model="i.name">
                                <small class="form-text text-danger" v-if="i.errorName"> {{ errorMsg }} </small>
                            </td>
                            <td>
                                <input v-model="i.relationship" :id="'awesomeplete-' + i.id" class="form-control" :list="'mylist' + i.id">
                                <datalist :id="'mylist' + i.id">
                                    <option v-for="i in relationships" :key="i" :value="i"> {{ i }} </option>
                                </datalist>
                                <small class="form-text text-danger" v-if="i.errorRelationship"> {{ errorMsg }} </small>
                                
                            </td>
                            <td>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">+63</span>
                                    </div>
                                    <input
                                      type="text"
                                      class="form-control"
                                      v-model="i.mobile"
                                      maxlength="10"
                                      aria-describedby="basic-addon1"
                                      @input="() => i.mobile = i.mobile.replace(/\D/g, '')">
                                </div>
                                <small class="form-text text-danger" v-if="i.errorMobile"> {{ errorMsg }} </small>
                                <small class="form-text text-danger" v-else-if="i.errorInvalidMobile"> Invalid mobile number </small>
                            </td>
                            <td>
                                <button @click="removeEmergencyContact(i.id)" class="btn btn-light btn-sm">
                                    <i class="fas fa-fw fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>

    </div>
</template>
  
<script setup lang="ts">

import { relationships } from '../../common';
import { IEmergencyContact, userStore } from '..';
import { nextTick, ref } from 'vue';
import { faker } from '@faker-js/faker';
import Awesomplete from 'awesomplete';

const $user = userStore()
const errorMsg = 'This field is required'

const aweInstances = ref<{id: string, instance: any}[]>([])

const handleSelection = (selected: any, id: string) => {
    console.log('selected', selected)
    // Update the model and close the popup
    // emergencyContact.relationship = selected.text.value;

    const aweInstance = aweInstances.value.find(i => i.id === id)

    if(!aweInstance){
        console.error('instance not found in aweInstances', aweInstances)
        return 
    }

    if(!$user.formData.emergencyContacts){
        console.error('user.formData.emergencyContacts is undefined')
        return 
    }

    const ec = $user.formData.emergencyContacts.find(i => i.id === id)

    if(!ec){
        console.error('Emergency contact not found in $user.formData.emergencyContacts')
        return 
    }

    ec.relationship = selected.value

    aweInstance.instance.close()

    // @ts-ignore
    // awesomplete.close();
  };

const initAwesomeplete = (id: string) => {
    console.log('initAwesomeplete()')
    // @ts-ignore
    return new Awesomplete('#awesomeplete-'+id, 
    { 
        maxItems: 5, 
        minChars: 1,
        // @ts-ignore
        tabSelect: true,
        list: `#mylist${id}`,
        filter: Awesomplete.FILTER_CONTAINS,
        item: (text: string, input: string) => Awesomplete.ITEM(text, input),
        replace: (selected: any) => handleSelection(selected, id),
    });
}

const addEmergencyContact = async () => {
    console.log('addEmergencyContact()')
    if(!$user.formData.emergencyContacts) return 

    const i = {} as IEmergencyContact
    i.id = faker.string.uuid()
    i.name = ''
    i.relationship = ''
    i.mobile = ''
    i.errorInvalidMobile = false 
    i.errorMobile = false 
    i.errorName = false 
    i.errorRelationship = false
    $user.formData.emergencyContacts.push(i)

    await nextTick()

    const instance = initAwesomeplete(i.id)
    aweInstances.value.push({
        id: i.id,
        instance
    })
}

const removeEmergencyContact = (id: string) => {
    console.log('removeEmergencyContact()', id)
    if(!$user.formData.emergencyContacts) return 

    const indx = $user.formData.emergencyContacts.findIndex(i => i.id === id)

    if(indx === -1){
        console.error('contact not found in emergencyContacts')
        return 
    }

    $user.formData.emergencyContacts?.splice(indx, 1)

    const aweInstanceIndx = aweInstances.value.findIndex(i => i.id === id)

    if(aweInstanceIndx !== -1){
        aweInstances.value.splice(aweInstanceIndx, 1)
    }

}

</script>
  
  
<style>

    .awesomplete{
        width: 100%;
    }

</style>