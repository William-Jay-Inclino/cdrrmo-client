<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800"> My Profile </h1>
        </div>

        <div v-if="me" class="row justify-content-center mt-5">
            <div class="col-8">

                <form>

                    <div class="row">
                        <div class="col">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-flex flex-row align-items-center card-header-with-bg">
                                    <img v-if="!me.image_url || me.image_url === ''" :src="config.baseUrl + 'images/avatar2.png'" class="img-thumbnail profile-image">
                                    <img data-toggle="modal" data-target="#imageModal" style="cursor: pointer;" v-else :src="config.uploads + me.image_url" class="img-thumbnail profile-image" @click="onClickImage(me.image_url)">
                                    <div class="ml-5">
                                        <h3 class="m-0 font-weight-bold pop-up-text">{{ me.first_name }}</h3>
                                        <h3 class="m-0 font-weight-bold ml-5 pop-up-text">{{ me.last_name }}</h3>
                                    </div>
                                </div>

                                <div class="card-body">

                                    <div class="row">
                                        <div class="col">

                                            <div class="row">

                                                <div class="col">
                                                    <div class="card shadow mb-4">
                                                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                                            <h6 class="m-0 font-weight-bold"> User Info </h6>
                                                        </div>
        
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                    <table class="table">
                                                                        <tr>
                                                                            <td class="font-weight-bold">Personnel ID</td>
                                                                            <td> {{ me.user_id }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">First Name</td>
                                                                            <td> {{ me.first_name }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Last Name</td>
                                                                            <td> {{ me.last_name }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Gender</td>
                                                                            <td> {{ CONST_Gender[me.gender].text }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Address</td>
                                                                            <td> {{ me.address }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Birth Date</td>
                                                                            <td> {{ birthDate }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Contact Number</td>
                                                                            <td> +63{{ me.contact_no }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Blood Type</td>
                                                                            <td> {{ me.blood_type }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Status</td>
                                                                            <td> {{ CONST_UserStatus[me.status].text }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">User Level</td>
                                                                            <td> {{ CONST_UserLevel[me.user_level].text }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="font-weight-bold">Personnel Type</td>
                                                                            <td> {{ CONST_UserTypes[me.type].text }} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Personnel Subtype</th>
                                                                            <td v-if="me.Na"> {{ me.Na.name }} </td>
                                                                            <td v-else> {{ CONST_SubTypes[me.type].text }} </td>
                                                                        </tr>
                                                                        <tr v-if="isUserACDV(me.type)">
                                                                            <td class="font-weight-bold">Personnel Sub-subtype</td>
                                                                            <td v-if="me.Bart"> {{ me.Bart.name }} </td>
                                                                            <td v-else-if="me.Po"> {{ me.Po.name }} </td>
                                                                            <td v-else-if="me.Cso"> {{ me.Cso.name }} </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div class="row">
                                                <div class="col">
                                                    <div class="card shadow mb-4">
                                                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                                            <h6 class="m-0 font-weight-bold"> Emergency Contact </h6>
                                                        </div>
                                            
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                <table class="table">
                                                                    <thead>
                                                                        <th>Name</th>
                                                                        <th>Relationship</th>
                                                                        <th>Mobile</th>
                                                                    </thead>
                                                                    <tr v-for="ec in me.emergencyContacts">
                                                                        <td> {{ ec.name }} </td>
                                                                        <td> {{ ec.relationship }} </td>
                                                                        <td> +63{{ ec.mobile }} </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                            
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div class="col">
                                            <div class="card shadow mb-4">
                                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                                                    <h6 class="m-0 font-weight-bold"> Trainings </h6>
                                                </div>


                                                <div class="card-body">
                                                    <div class="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <th>Description</th>
                                                                <th class="text-center">Certificates</th>
                                                            </thead>
                                                            <tr v-for="skill in me.skills">
                                                                <td class="align-middle"> {{ skill.TrainingSkill.name }} </td>
                                                                <td class="text-center">  
                                                                    <img style="cursor: pointer;" @click="onClickImage(skill.image_url)" data-toggle="modal" data-target="#imageModal" v-if="skill.image_url" :src="config.uploads + skill.image_url" class="img-thumbnail">
                                                                    <!-- <img :src="config.baseUrl + 'images/certificate.png'" class="img-thumbnail certificate-image"> -->
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                </form>

            </div>
        </div>

        <ImageModal :image_url="imageUrl"/>

  </div>

</template>


<script setup lang="ts">

    import { computed, onMounted, ref } from 'vue';
    import { authStore } from '.';
    import { IUser, userService } from '../user';
    import { CONST_Gender, CONST_UserLevel, CONST_UserStatus, CONST_UserTypes, CONST_SubTypes, isUserACDV } from '../common';
    import { config } from '../config';
    import ImageModal from '../user/components/ImageModal.vue'

    const $auth = authStore()

    const me = ref<IUser | null>(null)
    const imageUrl = ref<string | null>(null)

    onMounted( async() => {
        if($auth.authUser){
            me.value = await userService.findOne($auth.authUser.id)
        }
    })

    const birthDate = computed ( () => {
        if(!me.value) return 
        const dob = new Date(me.value.birth_date);
        const dobArr = dob.toDateString().split(' ');
        const dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
        return dobFormat
    })

    const onClickImage = (image: string) => {
        imageUrl.value = image
    }

</script>


<style scoped>

.profile-image {
  max-width: 300px;
  max-height: 300px; 
}

.certificate-image {
  max-width: 150px;
  max-height: 150px; 
}

.card-header-with-bg {
  position: relative;
}

.card-header-with-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(/images/ormoc_bg.png) center / cover no-repeat;
  filter: brightness(0.7);
}

.card-header-with-bg img {
  z-index: 1;
}

.card-header-with-bg div {
  z-index: 2;
  position: relative;
}

.pop-up-text {
  font-size: 3.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>