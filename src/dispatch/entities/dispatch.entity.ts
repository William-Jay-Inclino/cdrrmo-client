import { IEmergency } from "@/emergency"
import { DispatchStatusEnum } from "."
import { ITeam } from "@/team"
import { IUser } from "@/user"

export interface IDispatch{
    id: string 
    dispatcher_id: string 
    emergency_id: string 
    team_id: string
    caller_name: string 
    caller_number: string 
    location: string 
    description: string
    num_people_involved: number 
    hazard: string 
    time_of_call: Date
    time_proceeding: Date | null
    time_arrival: Date | null
    time_proceeding_hospital: Date | null 
    time_arrival_hospital: Date | null 
    time_back_to_base: Date | null 
    time_arrival_to_base: Date | null 
    remarks: string 
    status: DispatchStatusEnum 

    dispatcher: IUser
    emergency: IEmergency
    team: ITeam

    // set programmatically
    statusObj?: {
        id: DispatchStatusEnum,
        text: string,
        color: string,
    },
}