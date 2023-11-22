import { DispatchStatusEnum } from ".."

export interface ICreateDispatchDto{
    dispatcher_id: string 
    emergency_id: string | null 
    team_id: string | null
    caller_name: string 
    caller_number: string 
    location: string 
    description: string
    num_people_involved: number 
    hazard: string 
    remarks: string 
    status: DispatchStatusEnum 
    time_of_call: Date | null
}