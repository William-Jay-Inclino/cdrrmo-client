
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { DispatchStatusEnum, GenderEnum, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../types'
import { getEnumKey } from '../helpers/helpers';
import { useFakeData } from '../config';
import { app } from './app.store'
import { CONST_UserSubTypeText, CONST_UserTypeText } from '../helpers/constants';

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
            i.age = _getAge(i.birth_date)
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
                    i.subSubTypeText = _getSubType(i.type, i.sub_type_id)
                }
            }else{
                if(i.sub_type_id){
                    i.subTypeText = _getSubType(i.type, i.sub_type_id)
                }
            }

            return i
        })
    })
  
    return {
        users,
        setUsers,
    }
})


class User{

    getAllUsers() :IUser[]{
        console.log('getAllUsers()')
        
        if(useFakeData){
            return app.fakeUsers
        }

        // get from api TBA 

        return []

    }

}

export const userService = new User()


// methods

const _getAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const _getSubType = (userType: UserTypeEnum, subTypeId: string) :string => {

    console.log('_getSubType()', userType, subTypeId)

    if(userType === UserTypeEnum.ACDV_BART){
        const bart = app.fakeBarts.find(i => i.bart_id === subTypeId)
        if(!bart){
            console.error('bart not found')
            return ''
        }
        return bart.bart_name
    }

    if(userType === UserTypeEnum.ACDV_CSO){
        const cso = app.fakeCSOs.find(i => i.cso_id === subTypeId)
        if(!cso){
            console.error('cso not found')
            return ''
        }
        return cso.org_name
    }

    if(userType === UserTypeEnum.ACDV_PO){
        const po = app.fakePOs.find(i => i.po_id === subTypeId)
        if(!po){
            console.error('po not found')
            return ''
        }
        return po.po_name
    }

    if(userType === UserTypeEnum.National_Agency){
        const na = app.fakeNas.find(i => i.na_id === subTypeId)
        if(!na){
            console.error('na not found')
            return ''
        }
        return na.na_name
    }

    console.log('CONST_UserTypeText[userType]', CONST_UserTypeText[userType])

    return CONST_UserSubTypeText[userType]
}
