<template>

    <div v-show="false">
        <div class="row">
            <div class="col">
                <div class="input-group">
                    <div class="custom-file">
                        <input :value="'certificate.src'" type="file" class="custom-file-input" id="inputGroupFile04">
                        <label class="custom-file-label" for="inputGroupFile04">Choose file </label>
                    </div>
                    <div class="input-group-append">
                        <button @click="() => console.log('onClickDelCert')" class="btn btn-outline-danger" type="button">
                            <i class="fas fa-fw fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button @click="() => console.log('onClickDelCert')" class="btn btn-light btn-sm">
                    <i class="fas fa-fw fa-plus text-primary"></i>
                </button>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">

// import { ICompCertificate } from '@/modules/training_skill';
// import { faker } from '@faker-js/faker';

// const emit = defineEmits(['add-cert', 'del-cert'])

// const props = defineProps<{
//     id: string,
//     certificates: ICompCertificate[],
//     show: boolean,
// }>()

// const onClickAddCert = () => {
//     console.log('onClickAddCert()')
//     emit('add-cert', {id: props.id, certificate: {id: faker.string.uuid(), src: ''} })
// }

// const onClickDelCert = (id: string) => {
//     console.log('onClickDelCert()')
//     emit('del-cert', {id: props.id, certificateId: id })
// }


</script>