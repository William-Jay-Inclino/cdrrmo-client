
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { GenderEnum, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum, userService } from '.';
import { CONST_Gender, CONST_SubTypes, CONST_UserLevel, CONST_UserStatus, CONST_UserTypes, CONST_bloodTypes } from '../common/constants';
import { faker } from '@faker-js/faker';
import { isValidDate } from '../common/helpers';

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
        // @ts-ignore
        birth_date: undefined,
        contact_no: '',
        blood_type: CONST_bloodTypes[0],
        status: UserStatusEnum.Active,
        type: UserTypeEnum.LGU_Casual,
        
        dispatch_status: undefined,
        bart_id: undefined,
        cso_id: undefined,
        po_id: undefined,
        na_id: undefined,

        skills: [],
    }
    
    const _formErrorsInitial = {
        user_name: false,
        user_level: false,
        password: false,
        last_name: false,
        first_name: false,
        gender: false,
        address: false,
        birth_date: false,
        contact_no: false,
        blood_type: false,
        status: false,
        type: false,

        bart: false,
        cso: false,
        po: false,
        na: false,
    }

    const formCurrentStep = ref(1)

    
    // state
    const _users = ref<IUser[]>([])
    const formData = ref<IUser>({..._formDataInitial})
    const formErrors = ref({..._formErrorsInitial})

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
            i.age = getAge(new Date(i.birth_date!))
            i.genderObj = CONST_Gender[i.gender]
            i.userLevelObj = CONST_UserLevel[i.user_level]
            i.userTypeObj = CONST_UserTypes[i.type]
            i.userSubTypeObj = CONST_SubTypes[i.type]
            i.statusObj = CONST_UserStatus[i.status]
            return i
        })
    })


    // watchers 

    watch(formCurrentStep, (val: number) => {
        console.log(_store + 'watching formCurrentStep...', val)
        if(val === 3){
            const username = formData.value.first_name + '.' + formData.value.last_name
            const password = username + faker.number.int({min: 100, max: 999})
            setFormDataAuth({username, password})
        }
    })
    

    const isValidStep1 = (): boolean => {
        console.log(_store + 'isValidStep1()')

        formErrors.value = {..._formErrorsInitial}

        if(!formData.value.user_level){
            formErrors.value.user_level = true
        }

        if(formData.value.last_name.trim() === ''){
            formErrors.value.last_name = true
        }

        if(formData.value.first_name.trim() === ''){
            formErrors.value.first_name = true
        }

        if(!formData.value.gender){
            formErrors.value.gender = true
        }

        if(formData.value.address.trim() === ''){
            formErrors.value.address = true
        }

        if(!(isValidDate(formData.value.birth_date))){
            formErrors.value.birth_date = true
        }

        if(formData.value.contact_no.trim() === ''){
            formErrors.value.contact_no = true
        }

        if(!formData.value.blood_type){
            formErrors.value.blood_type = true
        }

        if(!formData.value.status){
            formErrors.value.status = true
        }

        if(!formData.value.type){
            formErrors.value.type = true
        }


        if(formData.value.type === UserTypeEnum.National_Agency){


            if(!formData.value.na_id){
                formErrors.value.na = true
            }

        }

        const isACDV = 
        (
            formData.value.type === UserTypeEnum.ACDV_BART || 
            formData.value.type === UserTypeEnum.ACDV_CSO ||
            formData.value.type === UserTypeEnum.ACDV_INDIVIDUAL ||
            formData.value.type === UserTypeEnum.ACDV_PO
        )

        if(formData.value.type && isACDV){

            if(formData.value.type === UserTypeEnum.ACDV_BART){
                if(!formData.value.bart_id){
                    formErrors.value.bart = true
                }
            }

            if(formData.value.type === UserTypeEnum.ACDV_CSO){
                if(!formData.value.cso_id){
                    formErrors.value.cso = true
                }

            }

            if(formData.value.type === UserTypeEnum.ACDV_PO){
                if(!formData.value.po_id){
                    formErrors.value.po = true
                }
            }

        }


        const hasError = Object.values(formErrors.value).includes(true);

        if(hasError){
            return false 
        }

        return true 
    }

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
        formErrors,
        formCurrentStep,

        setUsers,
        setFormDataAuth,
        isValidStep1,
        // saveUser,
    }
})



