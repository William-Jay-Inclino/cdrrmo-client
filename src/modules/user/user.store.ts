
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { DispatchStatusEnum, DistinctUserTypeEnum, GenderEnum, IBART, ICSO, INationalAgency, IPO, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '@/types/types'
import { CONST_DispatchStatus, CONST_DistinctUserTypes, CONST_Gender, CONST_SubTypes, CONST_UserLevel, CONST_UserStatus, CONST_UserSubTypeText, CONST_UserTypeText, CONST_UserlvlText, CONST_bloodTypes } from '@/helpers/constants';
import { userService } from './user.service'
import { ISingleSelect } from '@/types/forms';
import { constantToSingleSelect } from '@/helpers/helpers';
import { NAService } from '@/modules/national_agency';
import { BARTService } from '../bart';
import { CSOService } from '../cso';
import { POService } from '../po';


const _formDataInitial: IUser = {
    user_id: '',
    last_name: '', 
    first_name: '',
    gender: GenderEnum.Male, 
    address: '', 
    birth_date: new Date(), 
    contact_no: '',
    blood_type: CONST_bloodTypes[0], 
    status: UserStatusEnum.Active,
    dispatch_status: DispatchStatusEnum.Queue, 
    user_name: '',
    password: '',
    user_level: UserLevelEnum.Field_Operator,
    type: UserTypeEnum.LGU_Casual,
    sub_type_id: '',

    distinctType: DistinctUserTypeEnum.LGU,
}

const _nationalAgencies = NAService.getAllNAs()
const _csos = CSOService.getAllCSOs()
const _pos = POService.getAllPOs()
const _barts = BARTService.getAllBARTs()

export const userStore = defineStore('user', () => {
    
    // state
    const _users = ref<IUser[]>([])
    const formData = ref<IUser>({..._formDataInitial})
    
    // setters 

    const setUsers = (users: IUser[]) => {
        _users.value = users 
    }

    // getters 

    const users = computed( () => {

        return _users.value.map(i => {
            i.age = userService.getAge(i.birth_date)
            i.userLevelText = CONST_UserlvlText[i.user_level]

            i.typeText = CONST_UserTypeText[i.type]
            i.statusObj = CONST_UserStatus[i.status]
            i.dispatchStatusObj = CONST_DispatchStatus[i.dispatch_status]
            // @ts-ignore
            i.genderObj = CONST_Gender[i.gender]
            // National Agency and LGU has no sub-subType. Only ACDV

            const isACDV = (i.type === UserTypeEnum.ACDV_BART || i.type === UserTypeEnum.ACDV_CSO || i.type === UserTypeEnum.ACDV_INDIVIDUAL || i.type === UserTypeEnum.ACDV_PO) 

            if(isACDV){
                i.subTypeText = CONST_UserSubTypeText[i.type]
                if(i.sub_type_id){
                    i.subSubTypeText = userService.getSubType(i.type, i.sub_type_id)
                }
            }else{
                if(i.sub_type_id){
                    i.subTypeText = userService.getSubType(i.type, i.sub_type_id)
                }
            }

            return i
        })
    })

    const genders = computed( (): ISingleSelect[] => constantToSingleSelect(CONST_Gender))
    const status = computed( (): ISingleSelect[] => constantToSingleSelect(CONST_UserStatus))
    const userTypes = computed( (): ISingleSelect[] => constantToSingleSelect(CONST_DistinctUserTypes))
    const userLevels = computed( (): ISingleSelect[] => {
        const items = constantToSingleSelect(CONST_UserLevel)
        return items.filter(i => i.id !== UserLevelEnum.Admin)
    })
    const bloodTypes = computed( (): string[] => CONST_bloodTypes)

    const userSubTypes = computed( (): ISingleSelect[] => {
        const items = constantToSingleSelect(CONST_SubTypes)

        // see reference types.ts -> UserTypeEnum
        if(formData.value.distinctType === DistinctUserTypeEnum.LGU){
            // LGU_Regular or LGU_Casual or LGU_Job_Order
            return items.filter(i => i.id > 10 && i.id < 20) 
        }
        else if(formData.value.distinctType === DistinctUserTypeEnum.ACDV){
            // ACDV_CSO or ACDV_PO or ACDV_BART or ACDV_INDIVIDUAL
            return items.filter(i => i.id > 20 && i.id < 30) 
        }
        else if(formData.value.distinctType === DistinctUserTypeEnum.National_Agency){
            // National_Agency
            return items.filter(i => i.id > 30 && i.id < 40) 
        }
       
        return []

    })

    const userSubSubTypes = computed( (): IPO[] | ICSO[] | IBART[] | INationalAgency[] | null => {

        if(!formData.value.type) return null

        if(formData.value.distinctType === DistinctUserTypeEnum.LGU) return []

        if(formData.value.distinctType === DistinctUserTypeEnum.National_Agency){
            return _nationalAgencies
        }

        if(formData.value.distinctType === DistinctUserTypeEnum.ACDV){

            if(formData.value.type === UserTypeEnum.ACDV_CSO){
                return _csos
            }

            if(formData.value.type === UserTypeEnum.ACDV_PO){
                return _pos
            }

            if(formData.value.type === UserTypeEnum.ACDV_BART){
                return _barts
            }

            if(formData.value.type === UserTypeEnum.ACDV_INDIVIDUAL){
                return []
            }
        }

        return []


    }) 

    // methods
    const getUsers = () => {
        return userService.getAllUsers()
    }


  
    return {
        users,
        formData,
        genders,
        status,
        bloodTypes,
        userLevels,
        userTypes,
        userSubTypes,
        userSubSubTypes,

        setUsers,
        getUsers,
    }
})



