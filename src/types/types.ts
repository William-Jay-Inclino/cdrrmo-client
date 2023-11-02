
interface IUser {
    user_id: string
    last_name: string 
    first_name: string
    gender: GenderEnum 
    address: string 
    birth_date: Date 
    contact_no: string 
    blood_type: string 
    status: UserStatusEnum 
    dispatch_status: DispatchStatusEnum 
    user_name: string
    password: string
    user_level: UserLevelEnum
    type: UserTypeEnum

    // LGU id / CSO id / PO id / BART id / NA id
    // if no subtype meaning individual
    sub_type_id?: string
     
    // end

    // set programmatically 
    age?: number
    userLevelText?: string 
    typeText?: string
    subTypeText?: string
    subSubTypeText?: string
    personnelSkills?: IPersonnelSkills[]

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
    
    distinctType?: DistinctUserTypeEnum,
}

interface ITrainingSkill{
    training_id: string
    description: string
}

interface IPersonnelSkills{
    training_id: string 
    personnel_id: string // user_id
    certificates?: string[] // file src 
    
    // props that are set programmatically
    trainingSkill: ITrainingSkill
}

interface ITeam{
    team_id: string
    team_leader_id: string // user_id
    team_name: string
    status:  TeamStatusEnum

    // props that are set programmatically
    team_leader?: IUser
    statusText?: string
}

interface ITeamMember{
    team_member_id: string 
    team_id: string 
    member_id: string // user_id

    // props that are set programmatically
    member: IUser,
    skills?: IPersonnelSkills[]
}

interface IEmergency{
    emergency_id: string
    nature: string 
}

// Civic Social Organization
interface ICSO{
    id: string
    name: string
    description: string
}

// People's Organization
interface IPO{
    id: string
    name: string
    description: string
}

// Barangay Auxiliary Response Team
interface IBART{
    id: string
    name: string
    description: string
}

interface INationalAgency{
    id: string
    name: string
    description: string
}

interface IDispatch{
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

enum GenderEnum {
    Male = 1,
    Female = 2,
    filter
}

enum UserStatusEnum{
    Active = 1,
    Inactive = 2,
}

enum TeamStatusEnum{
    Active = 1,
    Dispatched = 2,
}

enum DispatchStatusEnum{
    Queue = 1,
    Dispatched = 2,
    Deck = 3,
}

enum UserLevelEnum{
    Admin = 1,
    Dispatcher = 2,
    Team_Leader = 3,
    Field_Operator = 4,
}   

enum UserTypeEnum{
    LGU_Regular = 11,
    LGU_Casual = 12,
    LGU_Job_Order = 13,
    ACDV_CSO = 21, 
    ACDV_PO = 22, 
    ACDV_BART = 23, 
    ACDV_INDIVIDUAL = 24, 
    National_Agency = 30,
}

enum DistinctUserTypeEnum{
    LGU = 1,
    ACDV = 2,
    National_Agency = 3,
}

export type{
    IUser,
    ITrainingSkill,
    IPersonnelSkills, 
    ITeam,
    ITeamMember,
    IEmergency,
    ICSO,
    IPO,
    IBART,
    INationalAgency,
    IDispatch,
}

export{
    GenderEnum,
    UserStatusEnum,
    TeamStatusEnum,
    DispatchStatusEnum,
    UserLevelEnum,
    UserTypeEnum,
    DistinctUserTypeEnum,
    // LGUEnum,
    // ACDVEnum
}