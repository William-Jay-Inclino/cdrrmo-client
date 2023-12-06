import { TeamStatusEnum } from "."
import { IUser } from '../../user/entities'

export interface ITeam{
    id: string
    team_leader_id: string 
    name: string
    status:  TeamStatusEnum
    team_leader: IUser
    teamMembers: ITeamMember[]

    // props that are set programmatically
    statusText?: string
    statusObj?: {
        id: string,
        text: string,
        color: string,
    },

    label?: string
    isActivated?: boolean
}

export interface ITeamMember{
    id: string 
    team_id: string
    team: ITeam 
    member_id: string 
    member: IUser
}