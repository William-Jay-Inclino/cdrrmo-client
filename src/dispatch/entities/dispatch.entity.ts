import { IEmergency } from "@/emergency"
import { DispatchStatusEnum } from "."
import { ITeam } from "@/team"
import { IUser } from "@/user"

export interface IDispatch{
    dispatch_id: string 
    // date_time: Date
    caller_name: string 
    dispatcher_id: string // user_id
    caller_number: string 
    location: string 
    emergency_id: string
    description: string
    medical_description: string 
    num_people_involved: number 
    hazard: string 
    team_id: string
    time_dispatch: Date 
    time_proceeding: Date | null
    time_arrival: Date | null
    time_proceeding_hospital: Date | null 
    time_arrival_hospital: Date | null 
    remarks: string 
    status: DispatchStatusEnum 

    // set programmatically
    statusObj?: {
        text: string,
        color: string,
    },
    emergency?: IEmergency
    team?: ITeam
    teamLeader?: IUser 
    dispatcher?: IUser
}