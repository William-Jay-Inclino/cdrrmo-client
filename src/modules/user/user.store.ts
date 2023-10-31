
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { DispatchStatusEnum, GenderEnum, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '@/types/types'
import { getEnumKey } from '@/helpers/helpers';
import { CONST_UserSubTypeText, CONST_UserTypeText } from '@/helpers/constants';
import { userService } from './user.service'

export const userStore = defineStore('user', () => {
    
    // state
    const _users = ref<IUser[]>([])

    
    // setters 

    const setUsers = (users: IUser[]) => {
        _users.value = users 
    }

    // getters 

    const users = computed( () => {

        return _users.value.map(i => {
            i.age = userService.getAge(i.birth_date)
            i.genderText = getEnumKey({enumType: GenderEnum, enumVal: i.gender})
            i.statustext = getEnumKey({enumType: UserStatusEnum, enumVal: i.status})
            i.dispatchStatusText = getEnumKey({enumType: DispatchStatusEnum, enumVal: i.dispatch_status})
            i.userLevelText = getEnumKey({enumType: UserLevelEnum, enumVal: i.user_level})

            i.typeText = CONST_UserTypeText[i.type]
            
            // National Agency and LGU has no sub-subType

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

    // methods
    const getUsers = () => {
        return userService.getAllUsers()
    }
  
    return {
        users,
        setUsers,
        getUsers,
    }
})



