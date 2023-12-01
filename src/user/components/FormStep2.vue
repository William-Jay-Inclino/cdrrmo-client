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
                <tr v-for="skill in $trainingSkill.trainingSkills">
                    <td class="align-middle">
                        <button
                          @click="onClickSelectSkill(skill)"
                          class="btn btn-sm"
                          :class="{'btn-info': isSkillExist(skill.id), 'btn-outline-info': !(isSkillExist(skill.id))}">
                          <i
                          class="fas fa-fw fa-check"></i>
                          </button>
                    </td>
                    <td class="align-middle"> {{ skill.name }} </td>
                    <td class="text-center">
                        <CertificateManager
                            :skill-id="skill.id"
                            :show="isSkillExist(skill.id)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>


    </div>

</template>


<script setup lang="ts">
// import { ref } from 'vue';
import CertificateManager from './CertificateManager.vue'
import { IUserSkill, userStore } from '../';
import { ITrainingSkill, trainingSkillStore } from '../../training_skill';

const $user = userStore()
const $trainingSkill = trainingSkillStore()

const onClickSelectSkill = (skill: ITrainingSkill) => {

    console.log('onClickSelectSkill()', skill)

    const indx = $user.formData.skills.findIndex(i => i.training_skill_id === skill.id)

    // if skill not exist then insert
    if(indx === -1){
        const userSkill = {} as IUserSkill 
        userSkill.id = ''
        userSkill.user_id = ''
        userSkill.training_skill_id = skill.id
        userSkill.SkillCertificate = []
        $user.formData.skills.push(userSkill)
        return 
    }

    $user.formData.skills.splice(indx, 1)
    
}


const isSkillExist = (id: string): boolean => {
    const indx = $user.formData.skills.findIndex(i => i.training_skill_id === id)
    if(indx === -1){
        return false 
    }
    return true
}



</script>