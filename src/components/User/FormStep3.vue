<template>

    <div class="table-responsive">
        <table class="table">
            <tbody>
                <tr>
                    <th>First Name</th>
                    <td> {{ $user.formData.first_name }} </td>
                    <td></td>
                </tr>
                <tr>
                    <th>Last Name</th>
                    <td> {{ $user.formData.last_name }} </td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td> {{ CONST_Gender[$user.formData.gender].text }} </td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td> {{ $user.formData.address }} </td>
                </tr>
                <tr>
                    <th>Birth Date</th>
                    <td> {{ birthDate }} </td>
                </tr>
                <tr>
                    <th>Contact Number</th>
                    <td> +639{{ $user.formData.contact_no }} </td>
                </tr>
                <tr>
                    <th>Blood Type</th>
                    <td> {{ $user.formData.blood_type }} </td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td> {{ CONST_UserStatus[$user.formData.status].text }} </td>
                </tr>
                <tr>
                    <th>User Level</th>
                    <td> {{ CONST_UserLevel[$user.formData.user_level].text }} </td>
                </tr>
                <tr>
                    <th>Personnel Type</th>
                    <td> {{ CONST_DistinctUserTypes[$user.formData.distinctType!].text }} </td>
                </tr>
                <tr>
                    <th>Personnel Subtype</th>
                    <td> {{ CONST_SubTypes[$user.formData.type].text }} </td>
                </tr>
                <tr v-if="subSubType">
                    <th>Personnel Sub-subType</th>
                    <td> {{ subSubType }} </td>
                </tr>
                <tr v-if="$user.formData.personnelSkills">
                    <th class="align-middle" :rowspan="$user.formData.personnelSkills.length + 1">Personnel Skills</th>
                </tr>
                <tr v-for="skill in personnelSkills">
                    <td>{{ skill.label }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script setup lang="ts">

import { CONST_DistinctUserTypes, CONST_Gender, CONST_UserLevel, CONST_UserStatus, CONST_SubTypes } from '@/helpers/constants';
import { trainingSkillService } from '@/modules/training_skill';
import { userStore } from '@/modules/user';
import { computed } from 'vue';

const $user = userStore()

const skills = trainingSkillService.getAllTrainingSkills()

const subSubType = computed( () => {
    const x = $user.userSubSubTypes?.find(i => i.id === $user.formData.sub_type_id)
    if(x){
        return x.name
    }
    return null
})

const personnelSkills = computed( () => {
    const x: {id: string, label: string}[] = []

    $user.formData.personnelSkills?.forEach(i => {

        const j = skills.find(k => k.training_id === i.training_id)
        if(j){
            x.push({
                id: i.training_id,
                label: j.description,
            })
        }
    })

    return x

})

const birthDate = computed ( () => {
    const dob = new Date($user.formData.birth_date);
    const dobArr = dob.toDateString().split(' ');
    const dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
    return dobFormat
})

</script>