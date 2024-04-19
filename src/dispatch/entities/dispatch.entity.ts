import { IEmergency } from "../../emergency"
import { DispatchStatusEnum } from "../entities"
import { ITeam } from "../../team"
import { IUser } from "../../user"

export interface IDispatch{
    id: string 
    dispatcher_id: string // ok
    emergency_id: string // ok
    team_id: string // ok
    caller_name: string // ok
    caller_number: string // ok
    location: string // ok
    description: string // ok
    num_people_involved: number // ok
    hazard: string 
    time_of_call: Date // ok
    time_proceeding_scene: Date | null // ok
    time_arrival_scene: Date | null // ok
    time_proceeding_hospital: Date | null  // ok
    time_arrival_hospital: Date | null  // ok
    time_proceeding_base: Date | null // ok
    time_arrival_base: Date | null // ok
    remarks: string // ok
    status: DispatchStatusEnum // ok
    
    is_cancelled: boolean // ok
    is_completed: boolean // ok

    dispatcher: IUser
    emergency: IEmergency
    team: ITeam

    // set programmatically
    statusObj?: {
        id: DispatchStatusEnum,
        text: string,
        color: string,
    },

    isExpanded?: boolean
    isEditRemarks?: boolean

    created_at: string
}