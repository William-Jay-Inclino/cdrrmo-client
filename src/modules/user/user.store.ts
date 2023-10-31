
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IUser, UserTypeEnum } from '@/types/types'
import { CONST_DispatchStatus, CONST_GenderText, CONST_UserStatusText, CONST_UserSubTypeText, CONST_UserTypeText, CONST_UserlvlText } from '@/helpers/constants';
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
            i.genderText = CONST_GenderText[i.gender]
            i.statustext = CONST_UserStatusText[i.status]
            i.dispatchStatusText = CONST_DispatchStatus[i.dispatch_status].text
            i.userLevelText = CONST_UserlvlText[i.user_level]

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



