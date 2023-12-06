<template>

    <div v-show="show">
        <div class="row" v-for="certificate in certificates">
            <div class="col">
                <div class="input-group">
                    <div class="custom-file">
                        <input :value="certificate.certificateUrl" type="file" class="custom-file-input" id="inputGroupFile04">
                        <label class="custom-file-label" for="inputGroupFile04">Choose file </label>
                    </div>
                    <div class="input-group-append">
                        <button @click="onClickDelCert(certificate.certificateUrl)" class="btn btn-outline-danger" type="button">
                            <i class="fas fa-fw fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button @click="onClickAddCert" class="btn btn-light btn-sm">
                    <i class="fas fa-fw fa-plus text-primary"></i>
                </button>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
import { computed } from 'vue';
import { ISkillCertificate, userStore } from '..';

const props = defineProps<{
    skillId: string,
    show: boolean,
}>()

const $user = userStore()

const certificates = computed( () => {
    const userSkill = $user.formData.skills.find(i => i.training_skill_id === props.skillId)

    if(userSkill){
        return userSkill.SkillCertificate
    }

    return []

})

const onClickAddCert = () => {
    console.log('onClickAddCert()')
    const userSkillIndx = $user.formData.skills.findIndex(i => i.training_skill_id === props.skillId)

    if(userSkillIndx === -1){
        console.error('user skill not found')
        return 
    }

    const userSkill = $user.formData.skills[userSkillIndx]
    const skillCert = {} as ISkillCertificate
    skillCert.id = ''
    skillCert.user_skill_id = ''
    skillCert.certificateUrl = ''
    userSkill.SkillCertificate.push(skillCert)

}

const onClickDelCert = (certificateUrl: string) => {
    console.log('onClickDelCert()', certificateUrl)

    const userSkillIndx = $user.formData.skills.findIndex(i => i.training_skill_id === props.skillId)

    if(userSkillIndx === -1){
        console.error('user skill not found')
        return 
    }

    const userSkill = $user.formData.skills[userSkillIndx]

    const skillCertIndx = userSkill.SkillCertificate.findIndex(i => i.certificateUrl === certificateUrl)

    if(skillCertIndx === -1){
        console.error('certificate not found')
        return 
    }

    userSkill.SkillCertificate.splice(skillCertIndx, 1)

}


</script>