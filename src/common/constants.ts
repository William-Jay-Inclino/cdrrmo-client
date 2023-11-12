import { DispatchStatusEnum } from "../dispatch";
import { TeamStatusEnum } from "../team";
import { DistinctUserTypeEnum, GenderEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from "../user";

export const routeNames = {
    dashboard: 'dashboard.route',
    users: 'users.route',
    userForm: 'userForm.route',
    dispatch: 'dispatch.route',
    dispatchForm: 'dispatchForm.route',
    teams: 'teams.route',
    teamMembers: 'teamMembers.route',
    barts: 'barts.route',
    csos: 'csos.route',
    nationalAgencies: 'nas.route',
    pos: 'pos.route',
    emergencies: 'emergencies.route',
    trainingSkills: 'trainingSkills.route',
}



export const CONST_bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const CONST_Gender = {
    [GenderEnum.Male]:{
        id: GenderEnum.Male,
        text: 'Male',
        color: '#0000FF', //blue
        icon: 'fa-mars'
    },
    [GenderEnum.Female]:{
        id: GenderEnum.Female,
        text: 'Female',
        color: '#FF00FF', // pink
        icon: 'fa-venus'
    }
}

export const CONST_UserStatus = {
    [UserStatusEnum.Active]: {
        id: UserStatusEnum.Active,
        text: 'Active',
        color: 'success'
    },
    [UserStatusEnum.Inactive]: {
        id: UserStatusEnum.Inactive,
        text: 'Inactive',
        color: 'danger'
    },
}

export const CONST_TeamStatus = {
    [TeamStatusEnum.Active]: {
        id: TeamStatusEnum.Active,
        text: 'Active',
        color: 'success'
    },
    [TeamStatusEnum.Dispatched]: {
        id: TeamStatusEnum.Dispatched,
        text: 'Dispatched',
        color: 'primary'
    },
}

export const CONST_DispatchStatus = {
    [DispatchStatusEnum.Queue]: {
        text: 'Queue',
        color: 'primary', 
    },
    [DispatchStatusEnum.Dispatched]: {
        text: 'Dispatched',
        color: 'info', 
    },
    [DispatchStatusEnum.Deck]: {
        text: 'Deck',
        color: 'success', 
    },
}

export const CONST_UserLevel = {
    [UserLevelEnum.Admin]: {
        id: UserLevelEnum.Admin,
        text: 'Admin',
        color: '', 
    },
    [UserLevelEnum.Dispatcher]: {
        id: UserLevelEnum.Dispatcher,
        text: 'Dispatcher',
        color: '', 
    },
    [UserLevelEnum.Team_Leader]: {
        id: UserLevelEnum.Team_Leader,
        text: 'Team Leader',
        color: '', 
    },
    [UserLevelEnum.Field_Operator]: {
        id: UserLevelEnum.Field_Operator,
        text: 'Field Operator',
        color: '', 
    },
}

export const CONST_UserTypes = {
    [UserTypeEnum.LGU_Regular]: {
        id: UserTypeEnum.LGU_Regular,
        text: 'LGU',
        color: '', 
    },
    [UserTypeEnum.LGU_Casual]: {
        id: UserTypeEnum.LGU_Casual,
        text: 'LGU',
        color: '', 
    },
    [UserTypeEnum.LGU_Job_Order]: {
        id: UserTypeEnum.LGU_Job_Order,
        text: 'LGU',
        color: '', 
    },
    [UserTypeEnum.ACDV_BART]: {
        id: UserTypeEnum.ACDV_BART,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.ACDV_CSO]: {
        id: UserTypeEnum.ACDV_CSO,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.ACDV_PO]: {
        id: UserTypeEnum.ACDV_PO,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.ACDV_INDIVIDUAL]: {
        id: UserTypeEnum.ACDV_INDIVIDUAL,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.National_Agency]: {
        id: UserTypeEnum.National_Agency,
        text: 'National Agency',
        color: '', 
    },
}

export const CONST_DistinctUserTypes = {
    [DistinctUserTypeEnum.LGU]: {
        id: DistinctUserTypeEnum.LGU,
        text: 'LGU',
        color: '', 
    },
    [DistinctUserTypeEnum.ACDV]: {
        id: DistinctUserTypeEnum.ACDV,
        text: 'ACDV',
        color: '', 
    },
    [DistinctUserTypeEnum.National_Agency]: {
        id: DistinctUserTypeEnum.National_Agency,
        text: 'National Agency',
        color: '', 
    },
}

export const CONST_SubTypes = {
    [UserTypeEnum.LGU_Regular]: {
        id: UserTypeEnum.LGU_Regular,
        text: 'Regular',
        color: '', 
    },
    [UserTypeEnum.LGU_Casual]: {
        id: UserTypeEnum.LGU_Casual,
        text: 'Casual',
        color: '', 
    },
    [UserTypeEnum.LGU_Job_Order]: {
        id: UserTypeEnum.LGU_Job_Order,
        text: 'Job Order',
        color: '', 
    },
    [UserTypeEnum.ACDV_BART]: {
        id: UserTypeEnum.ACDV_BART,
        text: 'BART',
        color: '', 
    },
    [UserTypeEnum.ACDV_CSO]: {
        id: UserTypeEnum.ACDV_CSO,
        text: 'CSO',
        color: '', 
    },
    [UserTypeEnum.ACDV_PO]: {
        id: UserTypeEnum.ACDV_PO,
        text: 'PO',
        color: '', 
    },
    [UserTypeEnum.ACDV_INDIVIDUAL]: {
        id: UserTypeEnum.ACDV_INDIVIDUAL,
        text: 'INDIVIDUAL',
        color: '', 
    },
    [UserTypeEnum.National_Agency]: {
        id: UserTypeEnum.National_Agency,
        text: '',
        color: '', 
    },
}

// =========================== CONSTANTS BELOW ARE USED IN FAKE DATA ONLY  =========================== 

export const CONST_UserlvlText = {
    [UserLevelEnum.Admin]: 'Admin',
    [UserLevelEnum.Dispatcher]: 'Dispatcher',
    [UserLevelEnum.Field_Operator]: 'Field Operator',
    [UserLevelEnum.Team_Leader]: 'Team Leader',
}

export const CONST_UserTypeText = {
    [UserTypeEnum.LGU_Regular]: 'LGU',
    [UserTypeEnum.LGU_Casual]: 'LGU',
    [UserTypeEnum.LGU_Job_Order]: 'LGU',
    [UserTypeEnum.ACDV_BART]: 'ACDV',
    [UserTypeEnum.ACDV_CSO]: 'ACDV',
    [UserTypeEnum.ACDV_PO]: 'ACDV',
    [UserTypeEnum.ACDV_INDIVIDUAL]: 'ACDV',
    [UserTypeEnum.National_Agency]: 'National Agency',
}

export const CONST_UserSubTypeText = {
    [UserTypeEnum.LGU_Regular]: 'Regular',
    [UserTypeEnum.LGU_Casual]: 'Casual',
    [UserTypeEnum.LGU_Job_Order]: 'Job Order',
    [UserTypeEnum.ACDV_BART]: 'BART',
    [UserTypeEnum.ACDV_CSO]: 'CSO',
    [UserTypeEnum.ACDV_PO]: 'PO',
    [UserTypeEnum.ACDV_INDIVIDUAL]: 'INDIVIDUAL',
    [UserTypeEnum.National_Agency]: '',
}

export const CONST_GenderText = {
    [GenderEnum.Male]: 'Male',
    [GenderEnum.Female]: 'Female',
}

export const CONST_TeamStatusText = {
    [TeamStatusEnum.Active]: 'Active',
    [TeamStatusEnum.Dispatched]: 'Dispatched',
}