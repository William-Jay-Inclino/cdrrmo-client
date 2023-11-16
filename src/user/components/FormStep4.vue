<template>

    <div class="table-responsive">
        <table class="table">
            <tbody>
                <tr>
                    <th>User Name</th>
                    <td> {{ $user.formData.user_name }} </td>
                    <td></td>
                </tr>
                <tr v-if="!$user.formIsEditMode">
                    <th class="align-middle">Password</th>
                    <td>
                        <span v-if="!showPassword">
                            <i v-for="_ in 8" class="fas fa-fw fa-circle fa-xs"></i>
                        </span>
                        <span v-else>
                            {{ $user.formData.password }}
                        </span>
                        <button @click="showPassword = !showPassword" class="btn btn-outline-secondary btn-sm float-end" type="button">
                            <i class="fas fa-fw" :class="{'fa-eye': !showPassword, 'fa-eye-slash': showPassword}"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>First Name</th>
                    <td> {{ $user.formData.first_name }} </td>
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
                    <td> {{ CONST_UserTypes[$user.formData.type].text }} </td>
                </tr>
                <tr>
                    <th>Personnel Subtype</th>
                    <td v-if="$user.formData.type === UserTypeEnum.National_Agency"> {{ getNa($user.formData.na_id!) }} </td>
                    <td v-else> {{ CONST_SubTypes[$user.formData.type].text }} </td>
                </tr>
                <tr v-if="showSubSubType">
                    <th>Personnel Sub-subType</th>
                    <td v-if="$user.formData.type === UserTypeEnum.ACDV_BART"> {{ getBart($user.formData.bart_id!) }} </td>
                    <td v-if="$user.formData.type === UserTypeEnum.ACDV_CSO"> {{ getCso($user.formData.cso_id!) }} </td>
                    <td v-if="$user.formData.type === UserTypeEnum.ACDV_PO"> {{ getPo($user.formData.po_id!) }} </td>
                </tr>
                <tr v-if="$user.formData.skills.length > 0">
                    <th class="align-middle" :rowspan="$user.formData.skills.length + 1">Personnel Skills</th>
                </tr>
                <tr v-for="skill in $user.formData.skills">
                    <td>{{ getSkill(skill.training_skill_id) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script setup lang="ts">

import { CONST_Gender, CONST_UserLevel, CONST_UserStatus, CONST_SubTypes, CONST_UserTypes } from '../../common/constants';
import { UserTypeEnum, userStore } from '../../user';
import { computed, ref } from 'vue';
import { INa, naStore } from '../../na';
import { ICSO, csoStore } from '../../cso';
import { IPO, poStore } from '../../po';
import { IBART, bartStore } from '../../bart';
import { ITrainingSkill, trainingSkillStore } from '../../training_skill';

const $user = userStore()
const $na = naStore()
const $cso = csoStore()
const $po = poStore()
const $bart = bartStore()
const $trainingSkill = trainingSkillStore()

const showPassword = ref(false)

const NAs = computed( (): INa[] => $na.nas)
const CSOs = computed( (): ICSO[] => $cso.csos)
const POs = computed( (): IPO[] => $po.pos)
const BARTs = computed( (): IBART[] => $bart.barts)
const trainingSkills = computed( (): ITrainingSkill[] => $trainingSkill.trainingSkills )

const showSubSubType = computed( () => {
    return (
        $user.formData.type === UserTypeEnum.ACDV_BART || 
        $user.formData.type === UserTypeEnum.ACDV_CSO || 
        $user.formData.type === UserTypeEnum.ACDV_PO 
    )
})

const birthDate = computed ( () => {
    const dob = new Date($user.formData.birth_date);
    const dobArr = dob.toDateString().split(' ');
    const dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
    return dobFormat
})


const getBart = (id?: string) => {
    if(!id) return 
    const item = BARTs.value.find(i => i.id === id)

    if(!item){
        console.error('item not found')
        return 
    }

    return item.name

}

const getPo = (id?: string) => {
    if(!id) return 
    const item = POs.value.find(i => i.id === id)

    if(!item){
        console.error('item not found')
        return 
    }

    return item.name

}

const getCso = (id?: string) => {
    if(!id) return 
    const item = CSOs.value.find(i => i.id === id)

    if(!item){
        console.error('item not found')
        return 
    }

    return item.name

}

const getNa = (id?: string) => {
    if(!id) return 
    const item = NAs.value.find(i => i.id === id)

    if(!item){
        console.error('item not found')
        return 
    }

    return item.name

}

const getSkill = (id: string) => {
    if(!id) return 
    const item = trainingSkills.value.find(i => i.id === id)

    if(!item){
        console.error('item not found')
        return 
    }

    return item.name
}

</script>