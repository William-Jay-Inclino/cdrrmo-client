
interface IUser {
    // start: values from db
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
    genderText?: string 
    statustext?: string 
    dispatchStatusText?: string 
    userLevelText?: string 
    typeText?: string
    subTypeText?: string
    subSubTypeText?: string
}

interface ITrainingSkill{
    training_id: string
    description: string
}

interface IPersonnelSkills{
    training_id: string 
    personnel_id: string // user_id
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
}

interface IEmergency{
    emergency_id: string
    nature: string 
}

// Civic Social Organization
interface ICSO{
    cso_id: string
    org_name: string
    description: string
}

// People's Organization
interface IPO{
    po_id: string
    po_name: string
    description: string
}

// Barangay Auxiliary Response Team
interface IBART{
    bart_id: string
    bart_name: string
    description: string
}

interface INationalAgency{
    na_id: string
    na_name: string
    description: string
}

interface IDispatch{
    dispatch_id: string 
    // date_time: Date
    caller_name: string // ok
    dispatcher_id: string // user_id 
    caller_number: string // ok
    location: string // ok
    emergency_id: string // ok
    description: string
    medical_description: string 
    num_people_involved: number // ok
    hazard: string 
    team_id: string // ok
    time_dispatch: Date // ok
    time_proceeding: Date | null // ok
    time_arrival: Date | null // ok
    time_proceeding_hospital: Date | null // ok
    time_arrival_hospital: Date | null // ok
    remarks: string
    status: DispatchStatusEnum
}

enum GenderEnum{
    Male = 1,
    Female = 2,
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
    Deck = 1,
    Queue = 2,
    Dispatched = 3,
}

enum UserLevelEnum{
    Admin = 1,
    Dispatcher = 2,
    Field_Operator = 3,
    Team_Leader = 4,
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

enum LGUEnum{
    Regular = '1',
    Casual = '2',
    Job_Order = '3',
}

// Accredited Community Disaster & Emergency Volunteer
enum ACDVEnum{ 
    CSO = 1, // Civic Social Organization
    PO = 2, // People's Organization
    BART = 3, // Barangay Auxiliary Response Team
    Individual = 4,
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
    LGUEnum,
    ACDVEnum
}