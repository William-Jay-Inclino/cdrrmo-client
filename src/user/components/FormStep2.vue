<template>
    
    <div class="table-responsive" style="overflow-x: hidden;">

        <table class="table">
            <thead>
                <tr>
                    <th width="10%">Select</th>
                    <th width="45%">Skill</th>
                    <th width="45%">Certificate</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="skill in $trainingSkill.trainingSkills">
                    <td class="align-middle">
                        <button
                          @click="onClickSelectSkill(skill)"
                          class="btn btn-sm"
                          :class="{'btn-primary': isSkillExist(skill.id), 'btn-outline-primary': !(isSkillExist(skill.id))}">
                          <i
                          class="fas fa-fw fa-check"></i>
                          </button>
                    </td>
                    <td class="align-middle"> {{ skill.name }} </td>
                    <td>
                        <div class="input-group" v-show="isSkillExist(skill.id)">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" @change="handleFileChange($event, skill)">
                                <label class="custom-file-label"> {{ getFileName(skill) }} </label>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>


    </div>

</template>


<script setup lang="ts">
// import { ref } from 'vue';
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
        userSkill.image_url = ''
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

const handleFileChange = (event: Event, skill: ITrainingSkill) => {

    const indx = $user.formSkillCertificates.findIndex(i => i.training_skill_id === skill.id)

    if(indx !== -1){
        $user.formSkillCertificates.splice(indx, 1)
    }

    const target = event.target as HTMLInputElement;

    const file = (target.files as FileList)[0];

    $user.formSkillCertificates.push({
        training_skill_id: skill.id,
        file
    })

};

const getFileName = (skill: ITrainingSkill) => {

    const skillCert = $user.formSkillCertificates.find(i => i.training_skill_id === skill.id)
    if(skillCert){
        return skillCert.file.name
    }
    
    const userSkill = $user.formData.skills.find(i => i.training_skill_id === skill.id)

    if(!userSkill) return ''

    if(userSkill.image_url) return userSkill.image_url
    
}

</script>