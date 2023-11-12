
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { CONST_DispatchStatus, CONST_DistinctUserTypes, CONST_Gender, CONST_SubTypes, CONST_UserLevel, CONST_UserStatus, CONST_UserSubTypeText, CONST_UserTypeText, CONST_UserlvlText, CONST_bloodTypes } from '@/common/constants';
// import { userService } from './user.service'
// import { NAService } from '@/na';
// import { BARTService } from '@/bart';
// import { CSOService } from '@/cso';
// import { POService } from '@/po';
import { DistinctUserTypeEnum, GenderEnum, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '.';
import { DispatchStatusEnum } from '../dispatch';
import { CONST_bloodTypes } from '../common/constants';


export const userStore = defineStore('user', () => {

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
        sub_type_id: UserTypeEnum.LGU_Casual.toString(),
    
        distinctType: DistinctUserTypeEnum.LGU,
        personnelSkills: [],
    }
    
    // state
    const _users = ref<IUser[]>([])
    const formData = ref<IUser>({..._formDataInitial})
    
    // setters 

    const setUsers = (users: IUser[]) => {
        _users.value = users 
    }

    // getters 

    const users = computed( () => {

        return []
    })

    // const genders = computed( (): ISingleSelect[] => constantToSingleSelect(CONST_Gender))
    // const status = computed( (): ISingleSelect[] => constantToSingleSelect(CONST_UserStatus))
    // const userTypes = computed( (): ISingleSelect[] => constantToSingleSelect(CONST_DistinctUserTypes))
    // const userLevels = computed( (): ISingleSelect[] => {
    //     const items = constantToSingleSelect(CONST_UserLevel)
    //     return items
    //     // return items.filter(i => i.id !== UserLevelEnum.Admin)
    // })
    // const bloodTypes = computed( (): string[] => CONST_bloodTypes)

    // const userSubTypes = computed( (): ISingleSelect[] => {
    //     const items = constantToSingleSelect(CONST_SubTypes)

    //     // see reference types.ts -> UserTypeEnum
    //     if(formData.value.distinctType === DistinctUserTypeEnum.LGU){
    //         // LGU_Regular or LGU_Casual or LGU_Job_Order
    //         return items.filter(i => i.id > 10 && i.id < 20) 
    //     }
    //     else if(formData.value.distinctType === DistinctUserTypeEnum.ACDV){
    //         // ACDV_CSO or ACDV_PO or ACDV_BART or ACDV_INDIVIDUAL
    //         return items.filter(i => i.id > 20 && i.id < 30) 
    //     }
    //     else if(formData.value.distinctType === DistinctUserTypeEnum.National_Agency){
    //         // National_Agency
    //         return items.filter(i => i.id > 30 && i.id < 40) 
    //     }
       
    //     return []

    // })

    // const userSubSubTypes = computed( (): IPO[] | ICSO[] | IBART[] | INationalAgency[] | null => {

    //     if(!formData.value.type) return null

    //     if(formData.value.distinctType === DistinctUserTypeEnum.LGU) return []

    //     if(formData.value.distinctType === DistinctUserTypeEnum.National_Agency){
    //         return _nationalAgencies
    //     }

    //     if(formData.value.distinctType === DistinctUserTypeEnum.ACDV){

    //         if(formData.value.type === UserTypeEnum.ACDV_CSO){
    //             return _csos
    //         }

    //         if(formData.value.type === UserTypeEnum.ACDV_PO){
    //             return _pos
    //         }

    //         if(formData.value.type === UserTypeEnum.ACDV_BART){
    //             return _barts
    //         }

    //         if(formData.value.type === UserTypeEnum.ACDV_INDIVIDUAL){
    //             return []
    //         }
    //     }

    //     return []


    // }) 


    
    // const formDataType = computed( (): UserTypeEnum => formData.value.type)
    // const formDataDistinctType = computed( (): DistinctUserTypeEnum | undefined => formData.value.distinctType)

    // watch(formDataDistinctType, (val) => {
    //     if(!val) return 

    //     if(val === DistinctUserTypeEnum.LGU){
    //         formData.value.type = UserTypeEnum.LGU_Regular
    //     }
    //     else if(val === DistinctUserTypeEnum.ACDV){
    //         formData.value.type = UserTypeEnum.ACDV_CSO
    //     }
    //     else if(val === DistinctUserTypeEnum.National_Agency){
    //         formData.value.type = UserTypeEnum.National_Agency
    //     }
    // })

    // // update sub_type_id if LGU since it's not updated automatically in form
    // watch(formDataType, (val) => {
    //     if(!val) return 

    //     formData.value.sub_type_id = '' // reset

    //     if(formData.value.distinctType !== DistinctUserTypeEnum.LGU) return 

    //     console.log('watching formDataType...')

    //     if(val === UserTypeEnum.LGU_Casual){
    //         formData.value.sub_type_id = UserTypeEnum.LGU_Casual.toString()
    //     }
    //     else if(val === UserTypeEnum.LGU_Job_Order){
    //         formData.value.sub_type_id = UserTypeEnum.LGU_Job_Order.toString()
    //     }
    //     else if(val === UserTypeEnum.LGU_Regular){
    //         formData.value.sub_type_id = UserTypeEnum.LGU_Regular.toString()
    //     }
    // })

    // // methods
    // const getUsers = () => {
    //     return userService.getAllUsers()
    // }

    // const addSkillInFormData = (skill: IPersonnelSkill) => {
    //     console.log('addSkillInFormData()', skill)
    //     if(!formData.value.personnelSkills){
    //         formData.value.personnelSkills = []
    //     }
    //     formData.value.personnelSkills.push(skill)
    // }

    // const removeSkillInFormData = (training_id: string) => {

    //     if(!formData.value.personnelSkills) return 

    //     console.log('removeSkillInFormData()', training_id)

    //     const indx = formData.value.personnelSkills?.findIndex(i => i.training_id === training_id)

    //     if(indx === -1){
    //         console.error('training_id not found in formData.personnelSkills')
    //         return 
    //     }

    //     formData.value.personnelSkills.splice(indx, 1)
    // }

    // const addCertificateInSkill = (trainingId: string, src: string) => {
    //     if(!formData.value.personnelSkills) return 

    //     console.log('addCertificateInSkill()', trainingId, src)
    //     const skill = formData.value.personnelSkills.find(i => i.training_id === trainingId)

    //     if(!skill){
    //         console.error('skill not found in personelSkills')
    //         return 
    //     }

    //     if(!skill.certificates){
    //         skill.certificates = []
    //     }

    //     const isExist = skill.certificates.find(i => i === src)

    //     if(isExist){
    //         console.error('certificate already exist')
    //         return 
    //     }

    //     skill.certificates.push(src)

    // }

    // const delCertificateInSkill = (trainingId: string, src: string) => {
    //     if(!formData.value.personnelSkills) return 

    //     console.log('delCertificateInSkill()', trainingId, src)
    //     const skill = formData.value.personnelSkills.find(i => i.training_id === trainingId)

    //     if(!skill){
    //         console.error('skill not found in personelSkills')
    //         return 
    //     }

    //     if(!skill.certificates){
    //         console.error('skill.certificates is undefined')
    //         return 
    //     }

    //     const indx = skill.certificates.findIndex(i => i === src)

    //     if(indx === -1){
    //         console.error('certificate not found in skill.certificates')
    //         return 
    //     }

    //     skill.certificates.splice(indx, 1)

    // }

    // const saveUser = async(payload: IUser): Promise<IUser | null> => {
    //     console.log('saveUser()', payload)

    //     payload.birth_date = new Date(payload.birth_date)

    //     if(payload.user_id.trim() !== ''){
    //         console.log('update')
    //         const updatedUser = await userService.updateUser(payload.user_id, payload)
    //         console.log('updatedUser ', updatedUser)
    //         return updatedUser
    //     }

    //     const createdUser = await userService.createUser(payload)
    //     console.log('createdUser', createdUser)

    //     _users.value.unshift(createdUser)

    //     resetFormData()

    //     return createdUser
    // }

    // const resetFormData = () => {
    //     formData.value = {..._formDataInitial}
    // }
  
    return {
        users,
        formData,
        // genders,
        // status,
        // bloodTypes,
        // userLevels,
        // userTypes,
        // userSubTypes,
        // userSubSubTypes,

        setUsers,
        // getUsers,
        // addSkillInFormData,
        // removeSkillInFormData,
        // addCertificateInSkill,
        // delCertificateInSkill,
        // saveUser,
    }
})



