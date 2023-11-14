<template>
    
    <div class="table-responsive" style="overflow-x: hidden;">

        <table class="table">
            <thead>
                <tr>
                    <th width="10%">Select</th>
                    <th>Skill</th>
                    <th class="text-center">Certificates</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle">
                        <button
                          @click="() => console.log('onClickSelectSkill')"
                          class="btn btn-sm"
                          :class="{'btn-primary': true, 'btn-outline-primary': false}">
                          <i
                          class="fas fa-fw fa-check"></i>
                          </button>
                    </td>
                    <td class="align-middle"> {{ 'skill.description' }} </td>
                    <td class="text-center">
                        <CertificateManager
                            :id="'skill.training_id'"
                            :certificates="'skill.certificates'"
                            :show="'skill.selected'"
                            @add-cert="() => console.log('addCertificate')"
                            @del-cert="() => console.log('deleteCertificate')" 
                        />
                    </td>
                </tr>
            </tbody>
        </table>


    </div>

</template>


<!-- <script setup lang="ts">
import { trainingSkillService, ICompSkill, ICompCertificate } from '@/modules/training_skill';
import { ref } from 'vue';
import CertificateManager from '@/components/User/CertificateManager.vue'
import { userStore } from '@/modules/user';

const skills = ref<ICompSkill[]>([])

const $user = userStore()

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

    if(!$user.formData.personnelSkills){
        $user.formData.personnelSkills = []
    }

    
    if(skill.selected){
        skill.selected = false
        $user.removeSkillInFormData(skill.training_id)
    }else{
        skill.selected = true

        const certificates = skill.certificates.map(i => i.src)

        $user.addSkillInFormData({
            training_id: skill.training_id,
            personnel_id: $user.formData.user_id,
            certificates: certificates,
        })
    }

}


const addCertificate = (data: {id: string, certificate: ICompCertificate}) => {
    console.log('addCertificate()', data)

    const skill = skills.value.find(i => i.training_id === data.id)

    if(skill){
        skill.certificates.push(data.certificate)
        $user.addCertificateInSkill(skill.training_id, data.certificate.src)
    }

}

const deleteCertificate = (data: {id: string, certificateId: string}) => {
    console.log('deleteCertificate()', data)

    const skill = skills.value.find(i => i.training_id === data.id)

    if(!skill){
        console.error('skill is undefined')
        return 
    }

    const certIndx = skill.certificates.findIndex(i => i.id === data.certificateId)

    if(certIndx === -1){
        console.error('Certificate not found in skill')
        return 
    }

    $user.delCertificateInSkill(skill.training_id, skill.certificates[certIndx].src)
    skill.certificates.splice(certIndx, 1)
}



</script> -->