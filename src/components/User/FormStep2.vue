<template>
    
    <div class="table-responsive">

        <table class="table">
            <thead>
                <tr>
                    <th width="10%">Select</th>
                    <th>Skill</th>
                    <th class="text-center">Certificates</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="skill in skills">
                    <td>
                        <button
                          @click="onClickSelectSkill(skill)"
                          class="btn btn-sm"
                          :class="{'btn-primary': skill.selected, 'btn-outline-primary': !skill.selected}">
                          <i
                          class="fas fa-fw fa-check"></i>
                          </button>
                    </td>
                    <td> {{ skill.description }} </td>
                    <td class="text-center">
                        <CertificateManager :skill="skill" :show="skill.selected" @add-cert="addCertificate"/>
                    </td>
                </tr>
            </tbody>
        </table>


    </div>

</template>


<script setup lang="ts">
import { trainingSkillService, ICompSkill, ICompCertificate } from '@/modules/training_skill';
import { ref } from 'vue';
import CertificateManager from '@/components/User/CertificateManager.vue'



const skills = ref<ICompSkill[]>([])

init()

function init(){
    const _trainingSkills = trainingSkillService.getAllTrainingSkills()

    const newTrainingSkills: ICompSkill[] = []

    for(let i of _trainingSkills){
        newTrainingSkills.push({
            training_id: i.training_id,
            description: i.description,
            selected: false,
            certificates: []
        })
    }

    skills.value = newTrainingSkills
} 


const onClickSelectSkill = (skill: ICompSkill) => {

    console.log('onClickSelectSkill()', skill)

    skill.selected = !skill.selected 

}


const addCertificate = (data: {skill: ICompSkill, certificate: ICompCertificate}) => {
    console.log('addCertificate()', data)

    const skill = skills.value.find(i => i.training_id = data.skill.training_id)

    if(skill){
        skill.certificates.push(data.certificate)
    }

}



</script>