<template>

    <div>

        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label>First Name</label>
                    <input v-model="$user.formData.first_name" type="text" class="form-control">
                    <small class="form-text text-danger" v-if="$user.formErrors.first_name"> {{ errorMsg }} </small>
                </div>
                <div class="col">
                    <label>Last Name</label>
                    <input v-model="$user.formData.last_name" type="text" class="form-control">
                    <small class="form-text text-danger" v-if="$user.formErrors.last_name"> {{ errorMsg }} </small>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <div class="row">
                <div class="col">
                    <div class="d-grid gap-2">
                        <button
                            :class="{'btn-primary': $user.formData.gender === GenderEnum.Male, 'btn-outline-primary': $user.formData.gender !== GenderEnum.Male}"
                            class="btn"
                            type="button"
                            @click="$user.formData.gender = GenderEnum.Male"
                        >
                            {{ CONST_Gender[GenderEnum.Male].text }}
                        </button>
                    </div>
                </div>
                <div class="col">
                    <div class="d-grid gap-2">
                        <button
                            :class="{'btn-primary': $user.formData.gender === GenderEnum.Female, 'btn-outline-primary': $user.formData.gender !== GenderEnum.Female}"
                            class="btn"
                            type="button"
                            @click="$user.formData.gender = GenderEnum.Female"
                        >
                            {{ CONST_Gender[GenderEnum.Female].text }}
                        </button>
                    </div>
                </div>
            </div>
            <small class="form-text text-danger" v-if="$user.formErrors.gender"> {{ errorMsg }} </small>
        </div>

        <div class="form-group">
            <label>Address</label>
            <textarea v-model="$user.formData.address" class="form-control" rows="3"></textarea>
            <small class="form-text text-danger" v-if="$user.formErrors.address"> {{ errorMsg }} </small>
        </div>
        <div class="form-group">
            <label>Birth Date</label>
            <input v-model="$user.formData.birth_date" type="date" class="form-control">
            <small class="form-text text-danger" v-if="$user.formErrors.birth_date"> {{ errorMsg }} </small>
        </div>
        <div class="form-group">
            <label>Contact Number</label>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">+63</span>
                <input
                  v-model="$user.formData.contact_no"
                  type="text"
                  class="form-control"
                  aria-describedby="basic-addon1"
                  maxlength="10"
                  @input="() => $user.formData.contact_no = $user.formData.contact_no.replace(/\D/g, '')">
            </div>
            <small class="form-text text-danger" v-if="$user.formErrors.contact_no"> {{ errorMsg }} </small>
            <small class="form-text text-danger" v-else-if="$user.formErrors.isInvalidContactNo"> Contact number is invalid </small>
        </div>
        <div class="form-group">
            <label>Blood Type</label>
            <select class="form-control" v-model="$user.formData.blood_type">
                <option :value="i" :key="i" v-for="i in bloodTypes">
                    {{ i }}
                </option>
            </select>
            <small class="form-text text-danger" v-if="$user.formErrors.blood_type"> {{ errorMsg }} </small>
        </div>

        <div class="form-group">
            <label>Status</label>
            <div class="row">
                <div class="col">
                    <div class="d-grid gap-2">
                        <button
                            :class="{'btn-primary': $user.formData.status === UserStatusEnum.Active, 'btn-outline-primary': $user.formData.status !== UserStatusEnum.Active}"
                            class="btn"
                            type="button"
                            @click="$user.formData.status = UserStatusEnum.Active"
                        >
                            {{ CONST_UserStatus[UserStatusEnum.Active].text }}
                        </button>
                    </div>
                </div>
                <div class="col">
                    <div class="d-grid gap-2">
                        <button
                            :class="{'btn-primary': $user.formData.status === UserStatusEnum.Inactive, 'btn-outline-primary': $user.formData.status !== UserStatusEnum.Inactive}"
                            class="btn"
                            type="button"
                            @click="$user.formData.status = UserStatusEnum.Inactive"
                        >
                        {{ CONST_UserStatus[UserStatusEnum.Inactive].text }}
                        </button>
                    </div>
                </div>
            </div>
            <small class="form-text text-danger" v-if="$user.formErrors.status"> {{ errorMsg }} </small>
        </div>


        <div class="form-group">
            <label>User Level</label>
            <select class="form-control" v-model="$user.formData.user_level">
                <option :value="i.id" :key="i.id" v-for="i in userLevels">
                    {{ i.text }}
                </option>
            </select>
            <small class="form-text text-danger" v-if="$user.formErrors.user_level"> {{ errorMsg }} </small>
        </div>

        <div class="form-group">
            <label>Personnel Type</label>
            <select class="form-control" v-model="userType">
                <option :value="i.id" :key="i.id" v-for="i in userTypes">
                    {{ i.text }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label>Personnel Subtype</label>

            <select class="form-control" v-model="$user.formData.type" v-if="userType === DistinctUserTypeEnum.LGU">
                <option v-for="i in LGUs" :key="i.id" :value="i.id"> {{ i.text }} </option>
            </select>

            <select class="form-control" v-model="$user.formData.type" v-else-if="userType === DistinctUserTypeEnum.ACDV">
                <option v-for="i in ACDVs" :key="i.id" :value="i.id"> {{ i.text }} </option>
            </select>

            <select class="form-control"  v-model="$user.formData.na_id" v-else-if="userType === DistinctUserTypeEnum.National_Agency">
                <option v-for="i in NAs" :key="i.id" :value="i.id"> {{ i.name }} </option>
            </select>

            <small class="form-text text-danger" v-if="$user.formErrors.type"> {{ errorMsg }} </small>
            <small class="form-text text-danger" v-if="$user.formErrors.na"> {{ errorMsg }} </small>

        </div>

        <div class="form-group" v-if="userType === DistinctUserTypeEnum.ACDV">
            <label v-if="$user.formData.type && $user.formData.type !== UserTypeEnum.ACDV_INDIVIDUAL"> Personnel Sub-subtype</label>
            <select v-model="$user.formData.bart_id" class="form-control" v-if="$user.formData.type === UserTypeEnum.ACDV_BART">
                <option :value="i.id" :key="i.id" v-for="i in BARTs"> {{ i.name }} </option>
            </select>
            <select v-model="$user.formData.po_id" class="form-control" v-if="$user.formData.type === UserTypeEnum.ACDV_PO">
                <option :value="i.id" :key="i.id" v-for="i in POs"> {{ i.name }} </option>
            </select>
            <select v-model="$user.formData.cso_id" class="form-control" v-if="$user.formData.type === UserTypeEnum.ACDV_CSO">
                <option :value="i.id" :key="i.id" v-for="i in CSOs"> {{ i.name }} </option>
            </select>

            <small class="form-text text-danger" v-if="$user.formErrors.bart"> {{ errorMsg }} </small>
            <small class="form-text text-danger" v-if="$user.formErrors.po"> {{ errorMsg }} </small>
            <small class="form-text text-danger" v-if="$user.formErrors.cso"> {{ errorMsg }} </small>
        </div>


    </div>

</template>


<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { UserLevelEnum, UserStatusEnum, userStore } from '../'
import { DistinctUserTypeEnum, UserTypeEnum, GenderEnum } from '../'
import { CONST_DistinctUserTypes, CONST_Gender, CONST_SubTypes, CONST_UserLevel, CONST_UserStatus, CONST_bloodTypes } from '../../common';
import { INa, naStore } from '../../na';
import { ICSO, csoStore } from '../../cso';
import { IPO, poStore } from '../../po';
import { IBART, bartStore } from '../../bart';

const $user = userStore()
const $na = naStore()
const $cso = csoStore()
const $po = poStore()
const $bart = bartStore()

const errorMsg = ref('This field is required')

const userTypes = ref([
    CONST_DistinctUserTypes[DistinctUserTypeEnum.LGU],
    CONST_DistinctUserTypes[DistinctUserTypeEnum.ACDV],
    CONST_DistinctUserTypes[DistinctUserTypeEnum.National_Agency]
])

const userLevels = ref([
    CONST_UserLevel[UserLevelEnum.Admin],
    CONST_UserLevel[UserLevelEnum.Dispatcher],
    CONST_UserLevel[UserLevelEnum.Field_Operator],
    CONST_UserLevel[UserLevelEnum.Team_Leader],
])

const userType = ref(userTypes.value[0].id)


const LGUs = computed( (): {id: UserTypeEnum, text: string, color: string}[] => {
    const arr = []
    arr.push(CONST_SubTypes[UserTypeEnum.LGU_Casual])
    arr.push(CONST_SubTypes[UserTypeEnum.LGU_Regular])
    arr.push(CONST_SubTypes[UserTypeEnum.LGU_Job_Order])
    return arr
})

const ACDVs = computed( (): {id: UserTypeEnum, text: string, color: string}[] => {
    const arr = []
    arr.push(CONST_SubTypes[UserTypeEnum.ACDV_BART])
    arr.push(CONST_SubTypes[UserTypeEnum.ACDV_CSO])
    arr.push(CONST_SubTypes[UserTypeEnum.ACDV_PO])
    arr.push(CONST_SubTypes[UserTypeEnum.ACDV_INDIVIDUAL])
    return arr
})

const NAs = computed( (): INa[] => $na.nas)
const CSOs = computed( (): ICSO[] => $cso.csos)
const POs = computed( (): IPO[] => $po.pos)
const BARTs = computed( (): IBART[] => $bart.barts)
const bloodTypes = computed( (): string[] => CONST_bloodTypes)

const subType = computed( () => $user.formData.type)


watch(userType, (val) => {
    console.log('val', val)
    if(!val) return 

    $user.formData.na_id = undefined

    if(val === DistinctUserTypeEnum.LGU){
        console.log('type is LGU')
        $user.formData.type = LGUs.value[0].id
        return 
    }

    if(val === DistinctUserTypeEnum.ACDV){
        console.log('type is ACDV')
        $user.formData.type = ACDVs.value[0].id
        return
    }

    if(val === DistinctUserTypeEnum.National_Agency){
        console.log('type is National_Agency')
        $user.formData.type = UserTypeEnum.National_Agency
        return 
    }

})

watch(subType, (val) => {
    if(!val) return 
    
    $user.formData.po_id = undefined
    $user.formData.cso_id = undefined
    $user.formData.bart_id = undefined

    // remove bart field error when subtype updates that is not national agency 
    if(val !== UserTypeEnum.National_Agency){
        $user.formErrors.na = false 
    }
    
})



</script>