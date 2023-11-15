
import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { GenderEnum, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum, userService } from '.';
import { DispatchStatusEnum } from '../dispatch';
import { CONST_Gender, CONST_SubTypes, CONST_UserLevel, CONST_UserStatus, CONST_UserTypes, CONST_bloodTypes } from '../common/constants';

export const userStore = defineStore('user', () => {

    const _store = 'userStore: '

    const _formDataInitial: IUser = {
        id: '',
        user_name: '',
        user_level: UserLevelEnum.Field_Operator,
        password: '',
        last_name: '',
        first_name: '',
        gender: GenderEnum.Male,
        address: '',
        birth_date: new Date(),
        contact_no: '',
        blood_type: CONST_bloodTypes[0],
        status: UserStatusEnum.Active,
        dispatch_status: DispatchStatusEnum.Queue,
        type: UserTypeEnum.LGU_Casual,

        bart_id: undefined,
        cso_id: undefined,
        po_id: undefined,
        na_id: undefined,

        skills: [],
    }

    
    // state
    const _users = ref<IUser[]>([])
    const formData = ref<IUser>({..._formDataInitial})

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await userService.findAll()
        setUsers(items)
    })
    
    // setters 

    const setUsers = (items: IUser[]) => {
        console.log(_store + 'setUsers()', items)
        _users.value = items 
    }

    const setFormDataAuth = (payload: {username: string, password: string }) => {
        console.log('setFormDataAuth()', payload)
        formData.value.user_name = payload.username
        formData.value.password = payload.password
    }

    // getters 

    const users = computed( () => {
        return _users.value.map(i => {
            i.age = getAge(new Date(i.birth_date))
            i.genderObj = CONST_Gender[i.gender]
            i.userLevelObj = CONST_UserLevel[i.user_level]
            i.userTypeObj = CONST_UserTypes[i.type]
            i.userSubTypeObj = CONST_SubTypes[i.type]
            i.statusObj = CONST_UserStatus[i.status]
            return i
        })
    })

    
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


    const getAge = (birthDate: Date): number => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
  
    return {
        users,
        formData,

        setUsers,
        setFormDataAuth,
        // getUsers,
        // addSkillInFormData,
        // removeSkillInFormData,
        // addCertificateInSkill,
        // delCertificateInSkill,
        // saveUser,
    }
})



