import { ITrainingSkill } from "@/training_skill"
import { DistinctUserTypeEnum, GenderEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from "."
import { DispatchStatusEnum } from "@/dispatch"

export interface IUser {
    user_id: string 
    last_name: string 
    first_name: string
    gender: GenderEnum 
    address: string 
    birth_date: Date 
    contact_no: string 
    blood_type: string 
    status: UserStatusEnum 
    dispatch_status: DispatchStatusEnum 
    user_name: string 
    password: string
    user_level: UserLevelEnum
    type: UserTypeEnum

    // LGU id / CSO id / PO id / BART id / NA id
    // if no subtype meaning individual
    sub_type_id?: string
     
    // end

    // set programmatically 
    age?: number
    userLevelText?: string 
    typeText?: string
    subTypeText?: string
    subSubTypeText?: string
    personnelSkills?: IPersonnelSkill[]

    statusObj?: {
        text: string,
        color: string,
    },
    dispatchStatusObj?: {
        text: string,
        color: string,
    },
    genderObj?: {
        text: string,
        color: string,
        icon: string,
    },
    
    distinctType?: DistinctUserTypeEnum,
}



export interface IPersonnelSkill{
    training_id: string 
    personnel_id: string // user_id
    certificates?: string[] // file src 
    
    // props that are set programmatically
    trainingSkill?: ITrainingSkill
}