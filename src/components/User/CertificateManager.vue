<template>

    <div v-show="show">
        <div class="row" v-for="certificate in skill.certificates">
            <div class="col">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile04">
                        <label class="custom-file-label" for="inputGroupFile04">Choose file </label>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-danger" type="button">
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

import { ICompSkill } from '@/modules/training_skill';
import { faker } from '@faker-js/faker';

const emit = defineEmits(['add-cert'])

const props = defineProps<{
    skill: ICompSkill,
    show: boolean,
}>()


const onClickAddCert = () => {
    console.log('onClickAddCert()')
    emit('add-cert', {skill: props.skill, certificate: {id: faker.string.uuid(), src: ''} })
}


</script>