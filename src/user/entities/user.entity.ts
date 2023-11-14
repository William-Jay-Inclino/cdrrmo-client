import { ITrainingSkill } from "../../training_skill"
import { GenderEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from "."
import { DispatchStatusEnum } from "@/dispatch"
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

    bart_id?: string
    cso_id?: string 
    po_id?: string 
    na_id?: string 

    Bart?: IBART
    Cso?: ICSO 
    Po?: IPO
    Na?: INa

    teamMembers?: ITeamMember[]
    teamLeader?: ITeam
    skills: IUserSkill[]
     
    // end

    // set programmatically 
    age?: number

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
    
    // distinctType?: DistinctUserTypeEnum,
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
