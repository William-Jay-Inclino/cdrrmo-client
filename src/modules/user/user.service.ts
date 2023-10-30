import { CONST_UserSubTypeText } from "../../helpers/constants"
import { IUser, UserTypeEnum } from "../../types"
import { appService } from "../"



class UserService{

    getAllUsers() :IUser[]{
        console.log('getAllUsers()')
        
        return appService.users
    }

    getAge(birthDate: Date) :number{
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    getSubType(userType: UserTypeEnum, subTypeId: string) :string {

        if(userType === UserTypeEnum.ACDV_BART){
            const bart = appService.barts.find(i => i.bart_id === subTypeId)
            if(!bart){
                console.error('bart not found')
                return ''
            }
            return bart.bart_name
        }
    
        if(userType === UserTypeEnum.ACDV_CSO){
            const cso = appService.csos.find(i => i.cso_id === subTypeId)
            if(!cso){
                console.error('cso not found')
                return ''
            }
            return cso.org_name
        }
    
        if(userType === UserTypeEnum.ACDV_PO){
            const po = appService.pos.find(i => i.po_id === subTypeId)
            if(!po){
                console.error('po not found')
                return ''
            }
            return po.po_name
        }
    
        if(userType === UserTypeEnum.National_Agency){
            const na = appService.nas.find(i => i.na_id === subTypeId)
            if(!na){
                console.error('na not found')
                return ''
            }
            return na.na_name
        }
    
        return CONST_UserSubTypeText[userType]
    }

}

export const userService = new UserService()
