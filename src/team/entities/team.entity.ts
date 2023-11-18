import { TeamStatusEnum } from "."
import { IUser, IUserSkill } from '../../user/entities'

export interface ITeam{
    team_id: string
    team_leader_id: string // user_id
    team_name: string
    status:  TeamStatusEnum

    // props that are set programmatically
    team_leader?: IUser
    statusText?: string
    statusObj?: {
        text: string,
        color: string,
    },
}

export interface ITeamMember{
    team_member_id: string 
    team_id: string 
    member_id: string // user_id

    // props that are set programmatically
    member: IUser,
    skills?: IUserSkill[]
}