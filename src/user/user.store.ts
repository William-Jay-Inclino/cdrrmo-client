
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { DistinctUserTypeEnum, GenderEnum, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum, userService } from '.';
import { CONST_Gender, CONST_SubTypes, CONST_UserLevel, CONST_UserStatus, CONST_UserTypes, CONST_bloodTypes } from '../common/constants';
import { faker } from '@faker-js/faker';
import { getAge, isValidDate, isValidPhoneNumber } from '../common/helpers';
import { INa, naStore } from '../na';
import { ICSO, csoStore } from '../cso';
import { IPO, poStore } from '../po';
import { IBART, bartStore } from '../bart';

export const userStore = defineStore('user', () => {

    // ============================== START STATE ============================== 

    const _store = 'userStore: '

    const $na = naStore()
    const $cso = csoStore()
    const $po = poStore()
    const $bart = bartStore()

    const _formDataInitial: IUser = {
        id: '',
        user_name: '', // ok
        user_level: UserLevelEnum.Field_Operator, // ok
        password: '', // ok
        last_name: '', // ok
        first_name: '', // ok
        gender: GenderEnum.Male, // ok
        address: '', // ok
        // @ts-ignore
        birth_date: undefined, // ok
        contact_no: '', // ok
        blood_type: CONST_bloodTypes[0], // ok
        status: UserStatusEnum.Active, // ok
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

        isUsernameTaken: false,
        isInvalidContactNo: false,
    }

    const _formCurrentStepInitial = 1
    const _formUserTypeInitial = DistinctUserTypeEnum.LGU


    
    
    const _users = ref<IUser[]>([])
    const formData = ref<IUser>({..._formDataInitial})
    const formErrors = ref({..._formErrorsInitial})
    const formUserType = ref<DistinctUserTypeEnum>(_formUserTypeInitial)
    const formCurrentStep = ref(_formCurrentStepInitial)

    // ============================== END STATE ============================== 





    // ============================== START LIFECYCLE HOOKS ============================== 

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await userService.findAll()
        setUsers(items)
    })

    // ============================== END LIFECYCLE HOOKS ============================== 
    






    // ============================== START SETTERS ============================== 

    const setUsers = (items: IUser[]) => {
        console.log(_store + 'setUsers()', items)
        _users.value = items 
    }

    const setFormDataAuth = (payload: {username: string, password: string }) => {
        console.log('setFormDataAuth()', payload)
        formData.value.user_name = payload.username
        formData.value.password = payload.password
    }

    const setFormData = (payload: {data: IUser}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // ============================== END SETTERS ============================== 







    // ============================== START GETTERS ============================== 

    const formIsEditMode = computed( (): boolean => {
        if(formData.value.id && formData.value.id.trim() !== ''){
            return true 
        }
        return false 
    })

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

    const NAs = computed( (): INa[] => $na.nas)
    const CSOs = computed( (): ICSO[] => $cso.csos)
    const POs = computed( (): IPO[] => $po.pos)
    const BARTs = computed( (): IBART[] => $bart.barts)

    // ============================== END GETTERS ============================== 






    // ============================== START WATCHERS ============================== 

    watch(formCurrentStep, (val: number) => {
        console.log(_store + 'watching formCurrentStep...', val)
        if(val === 3){

            if(formData.value.user_name.trim() !== '') return 

            // only populate username if it's empty
            const username = (formData.value.first_name + '.' + formData.value.last_name).replace(/\s/g, '');
            const password = (username + faker.number.int({min: 100, max: 999})).replace(/\s/g, '');
            

            console.log('username', username)
            console.log('password', password)
            setFormDataAuth({username, password})
        }
    })
    
    // ============================== END WATCHERS ============================== 






    // ============================== START METHODS ============================== 

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const user = await userService.findOne(id)
        console.log('user', {...user})
        if(user){

            const d = new Date(user.birth_date)
            const formattedDate = d.toISOString().split('T')[0];

            // @ts-ignore
            user.birth_date = formattedDate

            if(
                user.type === UserTypeEnum.LGU_Casual ||
                user.type === UserTypeEnum.LGU_Job_Order ||
                user.type === UserTypeEnum.LGU_Regular 
            ){
                formUserType.value = DistinctUserTypeEnum.LGU
            }

            else if(
                user.type === UserTypeEnum.ACDV_BART || 
                user.type === UserTypeEnum.ACDV_CSO || 
                user.type === UserTypeEnum.ACDV_PO || 
                user.type === UserTypeEnum.ACDV_INDIVIDUAL  
            ){
                formUserType.value = DistinctUserTypeEnum.ACDV
            }

            else if(user.type === UserTypeEnum.National_Agency){
                formUserType.value = DistinctUserTypeEnum.National_Agency
            }

            setFormData({data: user})
        }
    }

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
        }else{
            if (!isValidPhoneNumber('63' + formData.value.contact_no)) {
                formErrors.value.isInvalidContactNo = true;
            }
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

    const isValidStep3 = async(): Promise<boolean> => {
        console.log(_store + 'isValidStep3()')

        formErrors.value.user_name = false 
        formErrors.value.isUsernameTaken = false

        if(formData.value.user_name.trim() === ''){
            formErrors.value.user_name = true 
            return false
        }

        const isUsernameTaken = await userService.isUsernameTaken(formData.value.user_name)

        if(isUsernameTaken) {
            formErrors.value.isUsernameTaken = true
            return false
        }

        formErrors.value.isUsernameTaken = false

        return true 
    }

    const saveUser = async(payload: IUser): Promise<IUser | null> => {
        console.log(_store + 'saveUser()', payload)

        payload.birth_date = new Date(payload.birth_date)

        if(payload.id.trim() !== ''){
            console.log(_store + 'updating')
            const updatedUser = await userService.update({id: payload.id, data: payload})
            console.log('updatedUser ', updatedUser)
            return updatedUser
        }

        const createdUser = await userService.create({data: payload})
        console.log('createdUser', createdUser)

        if(createdUser){
            _users.value.unshift(createdUser)
        }

        resetFormData()

        return createdUser
    }

    const resetFormData = () => {
        console.log(_store + 'resetFormData()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
        formCurrentStep.value = _formCurrentStepInitial
        formUserType.value = _formUserTypeInitial
    }



    // ============================== END METHODS ============================== 

  
    return {
        users,
        formData,
        formErrors,
        formCurrentStep,
        formUserType,
        formIsEditMode,
        NAs,
        POs,
        BARTs,
        CSOs,

        initUpdateFormData,
        setUsers,
        setFormDataAuth,
        isValidStep1,
        isValidStep3,
        saveUser,
        resetFormData,
    }
})



