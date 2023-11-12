import { CONST_UserSubTypeText } from "../common/constants"
import { IUser, UserTypeEnum } from "."



class UserService{

    getAllUsers() :IUser[]{
        console.log('getAllUsers()')
        
        return []
    }

    async getUserById(user_id: string): Promise<IUser | null>{
        console.log('getUserById()', user_id)

        return null
    }

    async createUser(payload: IUser): Promise<IUser> {
        console.log('createUser()', payload)
        
        return payload
    }

    async updateUser(id: string, payload: IUser): Promise<IUser | null> {
        console.log('id', id)
        console.log('updateUser()', payload)
        return payload
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
        console.log('subTypeId', subTypeId)

        // if(userType === UserTypeEnum.ACDV_BART){
        //     const bart = appService.barts.find(i => i.id === subTypeId)
        //     if(!bart){
        //         console.error('bart not found')
        //         return ''
        //     }
        //     return bart.name
        // }
    
        // if(userType === UserTypeEnum.ACDV_CSO){
        //     const cso = appService.csos.find(i => i.id === subTypeId)
        //     if(!cso){
        //         console.error('cso not found')
        //         return ''
        //     }
        //     return cso.name
        // }
    
        // if(userType === UserTypeEnum.ACDV_PO){
        //     const po = appService.pos.find(i => i.id === subTypeId)
        //     if(!po){
        //         console.error('po not found')
        //         return ''
        //     }
        //     return po.name
        // }
    
        // if(userType === UserTypeEnum.National_Agency){
        //     const na = appService.nas.find(i => i.id === subTypeId)
        //     if(!na){
        //         console.error('na not found')
        //         return ''
        //     }
        //     return na.name
        // }
    
        return CONST_UserSubTypeText[userType]
    }

}

export const userService = new UserService()
