import { DispatchStatusEnum } from "..";

export interface IUpdateDispatchDto {
    dispatcher_id?: string;
    emergency_id?: string | null;
    team_id?: string | null;
    caller_name?: string;
    caller_number?: string;
    location?: string;
    description?: string;
    num_people_involved?: number;
    hazard?: string;
    remarks?: string;
    status?: DispatchStatusEnum;
    time_of_call?: string;

    is_cancelled?: boolean
    is_completed?: boolean

    time_proceeding_scene?: string;
    time_arrival_scene?: string;
    time_proceeding_hospital?: string;
    time_arrival_hospital?: string;
    time_proceeding_base?: string;
    time_arrival_base?: string;

}