<template>

    <div>

        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label>First Name</label>
                    <input v-model="$user.formData.first_name" type="text" class="form-control">
                </div>
                <div class="col">
                    <label>Last Name</label>
                    <input v-model="$user.formData.last_name" type="text" class="form-control">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <div class="row ml-5 mr-5">
                <div class="col ml-5 mr-5" v-for="gender of $user.genders">
                    <div class="d-grid gap-2">
                       <button
                            @click="onClickGender(gender.id)"
                            :class="{'btn-primary': gender.id === $user.formData.gender, 'btn-outline-primary': gender.id !== $user.formData.gender}"
                            class="btn"
                            type="button">
                            {{ gender.text }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea v-model="$user.formData.address" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label>Birth Date</label>
            <input v-model="$user.formData.birth_date" type="date" class="form-control">
        </div>
        <div class="form-group">
            <label>Contact Number</label>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">+639</span>
                <input v-model="$user.formData.contact_no" type="text" class="form-control" placeholder="###-###-###" aria-describedby="basic-addon1">
            </div>
        </div>
        <div class="form-group">
            <label>Blood Type</label>
            <select class="form-control" v-model="$user.formData.blood_type">
                <option :value="bloodType" :key="bloodType" v-for="bloodType in $user.bloodTypes">
                    {{ bloodType }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label>Status</label>
            <div class="row mr-5 ml-5">
                <div class="col mr-5 ml-5" v-for="status of $user.status">
                    <div class="d-grid gap-2">
                        <button
                            @click="onClickStatus(status.id)"
                            :class="{'btn-primary': status.id === $user.formData.status, 'btn-outline-primary': status.id !== $user.formData.status}"
                            class="btn"
                            type="button">
                            {{status.text}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>User Level</label>
            <select class="form-control" v-model="$user.formData.user_level">
                <option :value="userLvl.id" :key="userLvl.id" v-for="userLvl in $user.userLevels">
                    {{ userLvl.text }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label>Personnel Type</label>
            <select class="form-control" v-model="$user.formData.distinctType">
                <option :value="userType.id" :key="userType.id" v-for="userType in $user.userTypes">
                    {{ userType.text }}
                </option>
            </select>
        </div>

        <div class="form-group" v-show="showSubType">
            <label>Personnel Subtype</label>
            <select class="form-control" v-model="$user.formData.type">
                <option :value="userSubType.id" :key="userSubType.id" v-for="userSubType in $user.userSubTypes">
                    {{ userSubType.text }}
                </option>
            </select>
        </div>

        <div class="form-group" v-show="showSubSubType">
            <label> Personnel {{ subSubTypeText }} </label>
            <select class="form-control" v-model="$user.formData.sub_type_id">
                <option :value="userSubSubType.id" :key="userSubSubType.id" v-for="userSubSubType in $user.userSubSubTypes">
                    {{ userSubSubType.name }}
                </option>
            </select>
        </div>


    </div>

</template>


<script setup lang="ts">
    import { computed } from 'vue';
    import { userStore } from '@/modules/user'
    import { DistinctUserTypeEnum, GenderEnum, UserStatusEnum, UserTypeEnum } from '@/types/types'

    const $user = userStore()

    const showSubType = computed( (): boolean => {

        // @ts-ignore
        if($user.formData.distinctType === DistinctUserTypeEnum.National_Agency) return false

        return true 
    })

    const showSubSubType = computed( (): boolean => {

        // @ts-ignore
        if($user.formData.distinctType === DistinctUserTypeEnum.LGU){
            return false
        }
        if($user.formData.distinctType === DistinctUserTypeEnum.ACDV && $user.formData.type === UserTypeEnum.ACDV_INDIVIDUAL){
            return false
        }

        return true 
    })

    const subSubTypeText = computed( () => {
        if($user.formData.distinctType === DistinctUserTypeEnum.National_Agency){
            return 'Sub Type'
        }

        return 'Sub-subtype'
    })

    const onClickGender = (gender: GenderEnum) => {
        $user.formData.gender = gender
    }

    const onClickStatus = (status: UserStatusEnum) => {
        console.log('onClickStatus()', status)
        $user.formData.status = status
    }



</script>@/common/types/types