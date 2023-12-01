import { ITrainingSkill } from "../../training_skill"
import { GenderEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from "."
import { DispatchStatusEnum } from "../../dispatch"
import { IBART } from "../../bart"
import { ICSO } from "../../cso"
import { IPO } from "../../po"
import { INa } from "../../na"
import { ITeam, ITeamMember } from "../../team"

export interface IUser {
    id: string
    user_name: string 
    user_level: UserLevelEnum
    password: string
    last_name: string 
    first_name: string
    gender: GenderEnum 
    address: string 
    birth_date: Date
    contact_no: string 
    blood_type: string 
    status: UserStatusEnum 
    dispatch_status?: DispatchStatusEnum 
    type: UserTypeEnum

    emergencyContacts?: IEmergencyContact[]

    bart_id?: string | null
    cso_id?: string | null 
    po_id?: string | null 
    na_id?: string | null 

    Bart?: IBART
    Cso?: ICSO 
    Po?: IPO
    Na?: INa

    teamMembers?: ITeamMember[]
    teamLeader?: ITeam
    skills: IUserSkill[]
    
     
    // end

    // set programmatically 
    fullName?: string,
    age?: number
    userLevelObj?: {
        id: UserLevelEnum,
        text: string,
        color: string,
    }
    userTypeObj?: {
        id: UserTypeEnum,
        text: string,
        color: string,
    }
    userSubTypeObj?: {
        id: UserTypeEnum,
        text: string,
        color: string,
    }
    statusObj?: {
        text: string,
        color: string,
    }
    dispatchStatusObj?: {
        text: string,
        color: string,
    }
    genderObj?: {
        text: string,
        color: string,
        icon: string,
    }

    // used in v-select
    label: string 
    
}

export interface IEmergencyContact{
    id: string
    user: IUser
    user_id: string
    name: string
    relationship: string
    mobile: string

    // set programmatically 
    errorName: boolean
    errorRelationship: boolean
    errorMobile: boolean 
    errorInvalidMobile: boolean
}


export interface IUserSkill{
    id: string 
    user: IUser 
    user_id: string 
    TrainingSkill: ITrainingSkill
    training_skill_id: string 
    SkillCertificate: ISkillCertificate[]
}


export interface ISkillCertificate{
    id: string 
    userSkill: IUserSkill
    user_skill_id: string 
    certificateUrl: string 
}
