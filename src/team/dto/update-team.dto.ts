import { IUser } from "../../user"
import { TeamStatusEnum } from ".."

export interface IUpdateTeamDto{
    id?: string,
    team_leader?: IUser | null
    team_leader_id?: string
    name?: string 
    status?: TeamStatusEnum
}